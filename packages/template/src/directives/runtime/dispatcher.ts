/**
 * RuntimeObserverDispatcher —— engine 级共享 MutationObserver 分发器（ADR-0003 决策 7）。
 *
 * 取代此前每条 runtime 指令各自建 observer 的做法（如 loading.ts 旧版的 static initialize）：
 * 在 `engine.el` 上建**单一** MutationObserver，attributeFilter 为全部 runtime 指令属性名的并集，
 * 把 childList 增/删与 attributes 变化路由到对应指令类的 `mounted`/`unmounted`/`attrChanged`，
 * 并广播 `directive/<name>/{mounted|unmounted|attr-changed}` 事件。
 *
 * **实例化工厂沿用** runtime 标准模式：`new Cls(engine, undefined, info)` + `inst.el = el` + `inst.mounted()`
 * （见 base.ts 构造函数；Runtime 实例无 scope/binding）。
 *
 * **仅处理 `DirectiveKind.Runtime`**（Hybrid 当前不存在，按 YAGNI 暂不处理，留扩展口）。
 *
 * **已知限制（与旧 loading observer 一致，刻意保留）**：attributeFilter 只含裸属性 `x-<name>`，
 * 故修饰符形式（如 `x-loading.screen`）的运行时**值变化**不触发 attrChanged；其增/删仍生效。
 */
import type { AutoTemplateEngine } from "../../engine";
import { DirectiveKind, AutoTemplateDirectiveBase, type RuntimeDirective } from "../base";
import { getDirectives } from "../utils/getDirectives";

/** runtime 指令注册条目：类引用 + 裸属性名 + 匹配属性变体的正则 */
interface RuntimeEntry {
    Cls: typeof AutoTemplateDirectiveBase;
    /** 裸属性名 `x-<name>`，用于 attributeFilter 与 hasAttribute 判定 */
    attr: string;
    /** 匹配 `x-<name>` 及修饰符形式 `x-<name>.<mod>`，`.` 边界避免误匹配 `x-<name>-state` */
    attrRe: RegExp;
}

export class RuntimeObserverDispatcher {
    readonly engine: AutoTemplateEngine<any>;
    /** name → 注册条目 */
    private registry = new Map<string, RuntimeEntry>();
    /** name → (el → 实例)；一个元素可挂多个 runtime 指令 */
    private instances = new Map<string, Map<HTMLElement, AutoTemplateDirectiveBase>>();
    private mo: MutationObserver | undefined;
    /**
     * slot 盲区根集合（ADR-0006 决策 8）：x-slot 宿主登记于此。
     * 盲区内子树的 runtime 指令（如 child engine 写入的 x-loading）由 child engine 自身 dispatcher
     * 负责，父 dispatcher 对其**致盲**——避免父/子双 dispatcher 抢管同一节点、重复 mount。
     */
    private slotRoots = new Set<HTMLElement>();

    constructor(engine: AutoTemplateEngine<any>) {
        this.engine = engine;
    }

    /**
     * 启动：枚举 engine.directives 中 `kind===Runtime` 的类建 registry，连 observer，初始扫描。
     *
     * 须在 `initializeAll()`（含各指令的 injectStyles 等 FOUC 防御副作用）**之后**调用——
     * 初始扫描会同步触发首次 mounted → mountOverlay，依赖样式已注入。
     */
    start(): void {
        for (const [name, Cls] of this.engine.directives) {
            if (Cls.kind === DirectiveKind.Runtime) this._register(name, Cls);
        }
        this._buildObserver();
        // 初始扫描：编译产物中已存在的静态 runtime 指令元素（同步触发 mounted，首屏立即可见）
        for (const [el, names] of this.collectEls(this.engine.el)) {
            for (const name of names) this.mount(el, name);
        }
    }

    /** 晚注册的 runtime 指令（DirectiveManager.set 触发）：入 registry → 重建 observer → 重扫该属性 */
    onDirectiveRegistered(name: string, Cls: typeof AutoTemplateDirectiveBase): void {
        if (this.registry.has(name)) return;
        this._register(name, Cls);
        this._buildObserver();
        for (const [el, names] of this.collectEls(this.engine.el)) {
            if (names.includes(name)) this.mount(el, name);
        }
    }

    private _register(name: string, Cls: typeof AutoTemplateDirectiveBase): void {
        const attr = `x-${name}`;
        this.registry.set(name, { Cls, attr, attrRe: new RegExp(`^x-${name}(\\.|$)`) });
    }

    /**
     * 登记 slot 盲区根（x-slot 宿主）。盲区内子树不参与本 dispatcher 的 mount/attr 派发。
     * 由 SlotDirective.created() 调用；对称地在 destroy() 经 removeSlotRoot 注销。
     */
    addSlotRoot(el: HTMLElement): void {
        this.slotRoots.add(el);
    }

    /** 注销 slot 盲区根（SlotDirective.destroy() 调用）。 */
    removeSlotRoot(el: HTMLElement): void {
        this.slotRoots.delete(el);
    }

    /**
     * 元素是否落在任一 slot 盲区的**严格后代**子树内（不含盲区根本身）。
     * 无盲区时短路返回 false（热路径零开销）。用于 collectEls / _handle 过滤掉 child engine 管辖的子树。
     *
     * **不含盲区根本身**：slot 宿主自身的 runtime 指令（如 fetch 期间 x-slot 添加的 `x-loading`）
     * 仍归本 dispatcher 管理与 mount；仅其**子树**（child engine 编译产物）致盲，避免双 dispatcher 抢管。
     */
    private _inSlotRoot(el: HTMLElement): boolean {
        if (this.slotRoots.size === 0) return false;
        for (const root of this.slotRoots) {
            if (root !== el && root.contains(el)) return true;
        }
        return false;
    }

    /** （重建）共享 observer：attributeFilter 为全部 runtime 裸属性并集 */
    private _buildObserver(): void {
        this.mo?.disconnect();
        if (this.registry.size === 0) {
            this.mo = undefined;
            return;
        }
        const attributeFilter = [...this.registry.values()].map((r) => r.attr);
        this.mo = new MutationObserver((muts) => this._handle(muts));
        this.mo.observe(this.engine.el, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter,
            attributeOldValue: true,
        });
    }

    /**
     * 收集 root（含自身）子树下、挂有任何 runtime 指令属性的元素 → 该元素命中的指令名列表。
     *
     * querySelectorAll 无法匹配任意修饰符前缀，故遍历属性名对各 attrRe 做测试（同旧 loading 实现）。
     */
    collectEls(root: HTMLElement): Map<HTMLElement, string[]> {
        const out = new Map<HTMLElement, string[]>();
        const visit = (el: HTMLElement) => {
            if (this._inSlotRoot(el)) return; // slot 盲区：child engine 管辖，本 dispatcher 致盲
            const names = new Set<string>();
            for (const attrName of el.getAttributeNames()) {
                for (const [name, reg] of this.registry) {
                    if (reg.attrRe.test(attrName)) {
                        names.add(name);
                        break;
                    }
                }
            }
            if (names.size) out.set(el, [...names]);
        };
        visit(root);
        root.querySelectorAll("*").forEach((n) => {
            if (n instanceof HTMLElement) visit(n);
        });
        return out;
    }

    /** 挂载实例（已存在则跳过）：实例化 → 注入 el → mounted → 广播 */
    mount(el: HTMLElement, name: string): void {
        let byEl = this.instances.get(name);
        if (byEl?.has(el)) return;
        const info = getDirectives(el).find((d) => d.name === name);
        if (!info) return; // 属性被识别但解析无该指令（理论不会）
        const entry = this.registry.get(name);
        if (!entry) return;
        const inst = new entry.Cls(this.engine, undefined, info);
        inst.el = el;
        if (!byEl) {
            byEl = new Map();
            this.instances.set(name, byEl);
        }
        byEl.set(el, inst);
        inst.mounted();
        this.engine.emit(`directive/${name}/mounted` as any, { name, el });
    }

    /** 卸载实例（不存在则跳过）：unmounted → 删 → 广播 */
    unmount(el: HTMLElement, name: string): void {
        const byEl = this.instances.get(name);
        const inst = byEl?.get(el);
        if (!inst) return;
        byEl!.delete(el);
        inst.unmounted();
        this.engine.emit(`directive/${name}/unmounted` as any, { name, el });
    }

    /** 属性值变化：attrChanged（保留实例状态如 delay 定时器）→ 广播 */
    private attrChange(el: HTMLElement, name: string, newVal: string, oldVal: string): void {
        const inst = this.instances.get(name)?.get(el);
        if (!inst) return;
        (inst as RuntimeDirective).attrChanged?.(newVal, oldVal);
        this.engine.emit(`directive/${name}/attr-changed` as any, { name, el, newVal, oldVal });
    }

    /** observer 回调：childList 增/删 → collectEls 逐指令 mount/unmount；attributes → 三态路由 */
    private _handle(muts: MutationRecord[]): void {
        for (const mut of muts) {
            if (mut.type === "childList") {
                mut.addedNodes.forEach((n) => {
                    if (n instanceof HTMLElement)
                        for (const [el, names] of this.collectEls(n)) for (const name of names) this.mount(el, name);
                });
                mut.removedNodes.forEach((n) => {
                    if (n instanceof HTMLElement)
                        for (const [el, names] of this.collectEls(n)) for (const name of names) this.unmount(el, name);
                });
            } else if (mut.type === "attributes" && mut.attributeName) {
                
                const el = mut.target;
                if (!(el instanceof HTMLElement)) continue;
                if (this._inSlotRoot(el)) continue; // slot 盲区：属性变化交 child engine dispatcher
                // 定位该属性所属的 runtime 指令（attrRe 命中即止；属性名唯一归属一个指令）
                for (const [name, reg] of this.registry) {
                    if (reg.attrRe.test(mut.attributeName)) {
                        this._attrThreeState(el, name, reg.attr, mut.oldValue ?? "");
                        break;
                    }
                }
            }
        }
    }

    /** 属性三态：新增属性→mount / 删除属性→unmount / 值变→attrChange（同旧 loading observer 语义） */
    private _attrThreeState(el: HTMLElement, name: string, attr: string, oldVal: string): void {
        const has = el.hasAttribute(attr);
        const existed = this.instances.get(name)?.has(el) ?? false;
        if (has && !existed) this.mount(el, name);
        else if (!has && existed) this.unmount(el, name);
        else if (has && existed) {
            const newVal = el.getAttribute(attr) ?? "";
            if (newVal !== oldVal) this.attrChange(el, name, newVal, oldVal);
        }
    }

    /** engine.destroy 调用：断开 observer + 全实例 unmounted + 清空（不移除全局共享样式，KISS） */
    dispose(): void {
        this.mo?.disconnect();
        this.mo = undefined;
        for (const byEl of this.instances.values()) {
            for (const inst of byEl.values()) {
                try {
                    inst.unmounted();
                } catch (e: any) {
                    this.engine.logger.error(e);
                }
            }
            byEl.clear();
        }
        this.instances.clear();
    }
}

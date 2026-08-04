import { AutoTemplateDirectiveBase } from "../base";
import { toJson } from "really-relaxed-json";

/**
 * x-data：数据指令（非结构指令）。在所在 scope 注入上下文数据，供后代与同级表达式读取。
 *
 * ```html
 * <div x-data="{a:1}">
 *   <span x-text="a"></span>
 * </div>
 * ```
 *
 * **两种模式**：
 *
 * - **默认**（`x-data="{a:1}"`）：数据写入 `scope.dataScope`（私有层），经 `getScopeContext`
 *   与 localScope 同级叠加暴露。**非响应式**——值变更由 MutationObserver 捕获后触发
 *   `scope.refresh()` 全量重算子树。
 * - **attach**（`x-data.attach="{a:1}"`）：数据**直接合并进全局 AutoStore 根键**（`store.state.a=1`），
 *   借响应式自动更新订阅者，无需 refresh。元素销毁时按 CAS 删除自己写入的键（见下）。
 *
 * **渲染属性保留**：渲染结果元素上保留原始 `x-data="..."` 源串，使运行时 `setAttribute` 可动态更新。
 *
 * **值解析**：用 really-relaxed-json（`toJson` → `JSON.parse`），值必须是普通对象 `{...}`；
 * 解析失败**静默处理——仅打印日志**，按空对象继续，不中断编译。
 *
 * **嵌套覆盖**：父子元素的 dataScope 经 `getScopeContext` 的 parent 链层叠，子覆盖父同名键。
 * 父级运行时变更经 parent 链 Proxy 实时委托传播到后代。
 *
 * **与 x-for 共存**：x-data 不占 `ownsChildren`，与 x-for 自由共存；容器 x-data 经 parent 链
 * 自动透传进各 item scope（item.parent 指向容器 scope）。
 *
 * **运行时更新**：`el.setAttribute("x-data","{a:2}")` → MutationObserver 触发 → 重新解析 →
 * 默认模式原地同步 dataScope（含删除消失的键）+ refresh；attach 模式 CAS 重写 store。
 *
 * **优先级 = 200**（最高，> x-for 100）：保证 `created()` 最先执行，在兄弟指令 `watch()` 缓存
 * `_scopeView` 之前把数据注入 dataScope / store，使首渲即读到正确数据。
 */
export class DataDirective extends AutoTemplateDirectiveBase {
    static override readonly priority = 200;
    static override readonly singleton = true;

    /** 监听渲染元素 x-data 属性变化（运行时 setAttribute 更新的唯一入口） */
    private observer: MutationObserver | null = null;
    /** attach 模式：本指令写入 store 的键 → 末值快照。destroy 时按 CAS 删除，避免误删后写者数据 */
    private attachedKeys: Map<string, any> | null = null;

    private get attachMode(): boolean {
        return !!this.modifiers?.includes("attach");
    }

    /**
     * 原始属性名（含修饰符）：`x-data` 或 `x-data.attach`。
     * 由 `info.name + modifiers` 重构——渲染属性保留与 MutationObserver 监听均以此为准，
     * 保证运行时 setAttribute 改的属性名与首渲一致（修饰符不丢）。
     */
    private get rawAttrName(): string {
        const mods = this.modifiers && this.modifiers.length > 0 ? `.${this.modifiers.join(".")}` : "";
        return `x-${this.info.name}${mods}`;
    }

    override created() {
        const attr = this.rawAttrName;
        // 1. 自恢复渲染属性（保原始源串，供运行时 setAttribute 与 observer 读取）
        if (this.el && this.value != null) {
            this.el.setAttribute(attr, String(this.value));
        }
        // 2. 首次注入（initial=true：不 refresh，首渲由各指令 compile() 完成）
        this.applyData(String(this.value ?? ""), true);
        // 3. 挂 MutationObserver：仅监听本指令属性；初始 setAttribute 在 observe 之前，不会自触发
        if (this.el) {
            this.observer = new MutationObserver((mutations) => {
                for (const m of mutations) {
                    if (m.type === "attributes" && m.attributeName === attr) {
                        this.applyData(this.el?.getAttribute(attr) ?? "", false);
                        break;
                    }
                }
            });
            this.observer.observe(this.el, { attributes: true, attributeFilter: [attr] });
        }
    }

    /**
     * 解析值并按模式注入。
     *
     * @param raw     x-data 原始源串
     * @param initial true=首次（created，不 refresh，首渲交给 compile）；false=运行时变更（默认模式需 refresh）
     */
    private applyData(raw: string, initial: boolean) {
        const data = this.parse(raw);
        if (this.attachMode) {
            // attach：写入 store 即响应式，订阅者自动更新，任何时刻都无需 refresh
            this.applyAttach(data);
        } else {
            this.applyLocal(data);
            if (!initial) this.binding.refresh();
        }
    }

    /**
     * 解析宽松 JSON 为普通对象。
     *
     * 失败 / 非对象（数组、标量、null）→ **静默**：仅打印日志，返回空对象，不中断编译。
     * 值是 JSON 字面量（非表达式）：`{a:1+1}` 不做求值。
     */
    private parse(raw: string): Record<string, any> {
        const trimmed = raw.trim();
        if (!trimmed) return {};
        try {
            const parsed: unknown = JSON.parse(toJson(trimmed));
            if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
                this.engine.logger.error(`x-data: 值必须解析为对象，实际得到 ${JSON.stringify(parsed)}`);
                return {};
            }
            return parsed as Record<string, any>;
        } catch (e: any) {
            this.engine.logger.error(`x-data: 解析 "${raw}" 失败: ${e?.message ?? e}`);
            return {};
        }
    }

    /**
     * 默认模式：把数据**原地同步**进 `scope.dataScope`（永不换引用——`_scopeView` Proxy 闭包绑定）。
     *
     * 先删除新数据中已不存在的旧键，再 `Object.assign` 写入/更新。原地改 + delete 对缓存的
     * Proxy 透明可见，故父级运行时变更能经 parent 链传播到后代缓存的视图。
     */
    private applyLocal(data: Record<string, any>) {
        const scope = this.binding;
        if (!scope.dataScope) scope.dataScope = {};
        const ds = scope.dataScope;
        for (const k of Object.keys(ds)) {
            if (!Object.prototype.hasOwnProperty.call(data, k)) delete ds[k];
        }
        Object.assign(ds, data);
    }

    /**
     * attach 模式：CAS 写入全局 AutoStore 根键。
     *
     * - 先 CAS 删除"新数据中已消失、且当前值仍为自己末值"的旧键（被后写者覆盖过的键不误删）；
     * - 再写入/更新新键，键已存在且非自己之前写入时 warn 覆盖；
     * - 登记键→末值，供 destroy 与后续 CAS 判定。
     */
    private applyAttach(data: Record<string, any>) {
        const state = this.engine.store.state as Record<string, any>;
        if (!this.attachedKeys) this.attachedKeys = new Map();
        // 1. CAS 删除消失键
        for (const [k, v] of this.attachedKeys) {
            if (!Object.prototype.hasOwnProperty.call(data, k)) {
                if (state[k] === v) delete state[k];
                this.attachedKeys.delete(k);
            }
        }
        // 2. 写入/更新
        for (const [k, v] of Object.entries(data)) {
            if (
                Object.prototype.hasOwnProperty.call(state, k) &&
                !this.attachedKeys.has(k)
            ) {
                this.engine.logger.warn(`x-data.attach: 键 "${k}" 已存在于 store，覆盖写入`);
            }
            state[k] = v; // 新键自动建响应式代理；已有键触发 set notify
            this.attachedKeys.set(k, v);
        }
    }

    override destroy() {
        this.observer?.disconnect();
        this.observer = null;
        // attach 模式：CAS 删除自己写过、且当前值仍为自己末值的键（被后写者覆盖过的键保留）
        if (this.attachedKeys && this.attachMode) {
            const state = this.engine.store.state as Record<string, any>;
            for (const [k, v] of this.attachedKeys) {
                if (state[k] === v) delete state[k];
            }
            this.attachedKeys.clear();
        }
    }
}

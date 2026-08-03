/**
 * 模板编译器
 *
 * 基于 transformElement 深度优先重建模板树：对每个含指令的元素，浅克隆（保留
 * 普通属性）、移除指令属性、创建 AutoTemplateScope 并执行其指令生命周期。
 *
 * **浅克隆是安全的**：transformElement 命中 transformer 后会用返回的新元素替换原节点，
 * 并继续递归**原节点的子节点**挂到新元素下——因此子树会被完整重建（等价深克隆，
 * 但允许每个子节点各自走 transformer 处理）。
 *
 * 编译期通过 templateScopeMap 建立 scope 父子关系（向上查找最近指令祖先），
 * 并让子作用域继承父的 localScope（供 x-for 注入的 item/index 向下传递到嵌套子元素）。
 */
import { AutoTemplateScope } from "../scope";
import { removeDirectives } from "../directives/utils/removeDirectives";
import type { AutoTemplateEngine } from "../engine";
import { transformElement, type NodeTransformer, type OwnsChildrenResult } from "../utils/transformElement";
import { hasDirectives } from "../directives/utils/hasDirectives";

export class AutoTemplateCompiler {
    readonly engine: AutoTemplateEngine;
    /** 编译期：原树模板元素 → scope 映射，用于建立 scope 父子关系与 localScope 继承 */
    private templateScopeMap = new WeakMap<HTMLElement, AutoTemplateScope>();

    constructor(engine: AutoTemplateEngine<any>) {
        this.engine = engine;
    }

    private _getTransformers(): NodeTransformer<HTMLElement>[] {
        return [
            [
                (node: Node) => node instanceof HTMLElement,
                (current: HTMLElement) => this.compileElement(current),
            ],
        ];
    }

    /**
     * 编译整棵模板，返回重建后的根元素（已移除指令属性、各元素挂载 scope）。
     * 每次 compile 重建 templateScopeMap（编译期临时结构）。
     */
    compile(): HTMLElement {
        this.templateScopeMap = new WeakMap();
        return transformElement(this.engine.template, this._getTransformers(), this.engine.context);
    }

    /**
     * 编译单个模板元素（transformElement 回调）。
     *
     * - 无指令：原样返回，transformElement 会默认浅克隆并递归子节点；
     * - 有指令：浅克隆 + 移除指令属性 + 建 scope + 建立 parent 关系 + 继承 localScope + 执行指令。
     * - 含结构指令（ownsChildren，如 x-for / eager x-if）：返回 `ownsChildren` 信号，
     *   让 transformElement 跳过该元素子节点的自动递归——子节点由指令自行编译，
     *   避免"正常通道编译一次 + 指令克隆再编译"的双重冲突。
     *
     * 同元素出现多个结构指令（如 `x-for` + eager `x-if`）会在 `_resolveOwnership` 中抛错。
     */
    compileElement(template: HTMLElement): HTMLElement | OwnsChildrenResult {
        if (!hasDirectives(template)) {
            // 必须浅克隆：transformElement 用 live NodeList 遍历原节点子节点并挂到返回的新节点下，
            // 若返回原节点，appendChild 会写回原节点自身、其 childNodes 持续增长，导致 live 遍历无限循环。
            return template.cloneNode(false) as HTMLElement;
        }
        const el = template.cloneNode(false) as HTMLElement;
        removeDirectives(el);
        const scope = new AutoTemplateScope(this.engine, el, template);
        this._linkParent(template, scope);
        this.templateScopeMap.set(template, scope);
        this.engine.scopes.set(new WeakRef(el), scope);
        // 冲突检测先于 compile：让 x-for + eager x-if 同元素在跑任何指令生命周期前即失败
        const ownsChildren = this._resolveOwnership(scope);
        scope.compile();
        // 结构指令占有子树：返回 ownsChildren 信号，跳过子节点自动递归（由指令自行编译）。
        if (ownsChildren) {
            return { node: el, ownsChildren: true };
        }
        return el;
    }

    /**
     * 判定某 scope 是否被结构指令占有子树（ownsChildren），并检测冲突。
     *
     * 任意指令类的静态 `ownsChildren(info)` 返回 true 即视为占有。同元素出现多个占有者
     * （当前仅 `x-for` + eager `x-if`）语义互斥——前者重复子树、后者条件销毁子树——直接抛错，
     * 提示改用 `x-show`/`x-if.keep`（仅切 display，不占子树）或外层包裹。
     */
    private _resolveOwnership(scope: AutoTemplateScope): boolean {
        const owners = scope.directives.filter((d) => {
            const cls = this.engine.directives.get(d.info.name);
            return !!cls?.ownsChildren?.(d.info);
        });
        if (owners.length > 1) {
            throw new Error(
                "[x-if/x-for 冲突] x-if 的条件销毁语义与 x-for 的列表渲染不能作用于同一元素。\n" +
                    "若需控制整个列表显隐，请改用：\n" +
                    '  • x-show="<expr>"     （= x-if.keep：保留子树与 watcher，仅切 display）\n' +
                    '  • x-if.keep="<expr>"  （同上）\n' +
                    '或用外层包裹：<div x-if="<expr>"><ul x-for="…">…</ul></div>',
            );
        }
        return owners.length === 1;
    }

    /**
     * 编译某模板的全部子节点并挂到指定父元素，返回已编译节点列表。
     *
     * 共享给结构指令（eager x-if 编译/重建子树）：元素子节点走完整 `compileElement` 管线
     * （建 scope、`_linkParent` 链接到父作用域），文本/注释节点直接深克隆。
     * 调用方负责在销毁时按返回的节点列表精确移除（避免误删兄弟指令如 x-text 写入的内容）。
     */
    compileSubtree(parentEl: HTMLElement, templateEl: HTMLElement): Node[] {
        const nodes: Node[] = [];
        for (const child of Array.from(templateEl.childNodes)) {
            const compiled =
                child instanceof HTMLElement
                    ? transformElement(child, this._getTransformers(), this.engine.context)
                    : child.cloneNode(true);
            parentEl.appendChild(compiled);
            nodes.push(compiled);
        }
        return nodes;
    }

    /**
     * 供 x-for 编译单个列表项的模板。
     *
     * 手动建根 scope 并注入 localScope（item/index），再用 transformElement
     * 递归编译其子节点（嵌套 scope 经 _linkParent 挂为本 scope 子代并继承 localScope）。
     *
     * @param itemTemplate 单个项的模板元素（x-for 子模板的克隆）
     * @param parentScope  x-for 所在 scope，项 scope 挂为其子（删项时递归销毁）
     * @param localScope   注入该项的局部变量（{ item, index }）
     * @param reuseEl      复用既有项根 DOM 节点（移动复用场景）；缺省则克隆模板。
     *                     复用时保留项根节点身份（保住项根本身的焦点/属性），但其子树 DOM 会被
     *                     清空重建（旧 scope 已销毁）→ 子节点焦点丢失，彻底保留需 core 对象身份订阅。
     */
    compileChild(
        itemTemplate: HTMLElement,
        parentScope: AutoTemplateScope,
        localScope: Record<string, any>,
        reuseEl?: HTMLElement,
    ): { el: HTMLElement; scope: AutoTemplateScope } {
        const el = reuseEl ?? (itemTemplate.cloneNode(false) as HTMLElement);
        if (!reuseEl) removeDirectives(el);
        // reuseEl：旧 scope 已 destroy，其子树 DOM 残留在 el 上，须清空后重建，否则 compileSubtree
        // 的 appendChild 会导致子节点重复。
        if (reuseEl) {
            while (el.firstChild) el.removeChild(el.firstChild);
        }
        const scope = new AutoTemplateScope(this.engine, el, itemTemplate);
        scope.localScope = localScope;
        parentScope.addChild(scope);
        this.templateScopeMap.set(itemTemplate, scope);
        this.engine.scopes.set(new WeakRef(el), scope);
        // 项根本身若是结构指令（嵌套 x-for，如 <ul x-for="row"><li x-for="cell">），
        // 其子节点由该内层结构指令在 render 时自行克隆编译，此处跳过手动编译以免双重冲突。
        if (!this._resolveOwnership(scope)) {
            this.compileSubtree(el, itemTemplate);
        }
        scope.compile();
        return { el, scope };
    }

    /**
     * 向上查找最近的已注册指令祖先 scope，把 scope 挂为其子，
     * 并继承祖先的 localScope（让 item/index 向嵌套子元素传递）。
     */
    private _linkParent(template: HTMLElement, scope: AutoTemplateScope): void {
        let p: HTMLElement | null = template.parentElement;
        while (p) {
            const parentScope = this.templateScopeMap.get(p);
            if (parentScope) {
                parentScope.addChild(scope);
                if (parentScope.localScope) scope.localScope = parentScope.localScope;
                return;
            }
            p = p.parentElement;
        }
    }
}

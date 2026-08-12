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
import { SCOPES_KEY } from "../engine";
import { removeDirectives } from "../directives/utils/removeDirectives";
import { isDirectiveAttr } from "../directives/utils/isDirectiveAttr";
import { DirectiveKind } from "../directives/base";
import { ModelDirective } from "../directives/presets/model";
import type { AutoDirectiveInfo } from "../directives/types";
import type { AutoTemplateEngine } from "../engine";
import {
    transformElement,
    type NodeTransformer,
    type OwnsChildrenResult,
} from "../utils/transformElement";
import { buildAction } from "../utils/buildAction";
import { hasDirectives } from "../directives/utils/hasDirectives";
import { hasMustache, isRawTextElement, parseInterpolation, synthAttrExpr } from "./mustache";

/**
 * 元素是否含插值（需建 scope 的判据之一）。
 *
 * 探测两处 `{{`：**直接文本子节点**（文本插值）与**自身非指令属性值**（属性插值）。
 * 均非递归、O(直接子节点/属性数)，绝不退化成 O(n²)。raw-text 元素（SCRIPT/STYLE）
 * 一律不插值（见 ADR-0004 决策 7）。
 */
function hasInterpolation(el: HTMLElement): boolean {
    if (isRawTextElement(el)) return false;
    for (let i = 0; i < el.childNodes.length; i++) {
        const child = el.childNodes[i];
        if (child && child.nodeType === Node.TEXT_NODE && hasMustache(child.nodeValue)) return true;
    }
    for (let i = 0; i < el.attributes.length; i++) {
        const attr = el.attributes[i];
        if (attr && !isDirectiveAttr(attr.name) && hasMustache(attr.value)) return true;
    }
    return false;
}

export class AutoTemplateCompiler {
    readonly engine: AutoTemplateEngine;
    /** 编译期：原树模板元素 → scope 映射，用于建立 scope 父子关系与 localScope 继承 */
    private templateScopeMap = new WeakMap<HTMLElement, AutoTemplateScope>();

    constructor(engine: AutoTemplateEngine<any>) {
        this.engine = engine;
    }

    private _getTransformers(): NodeTransformer<HTMLElement>[] {
        return [
            // 前置：<script type="actions"> 提取为局部 action 后剪枝（普通 script 原样保留）
            [
                (node: Node) => node instanceof HTMLScriptElement && node.type === "actions",
                (script: HTMLElement) => this._extractScriptActions(script as HTMLScriptElement),
            ],
            // 前置：x-block 命名模板块——收集冻结快照到最近祖先 scope.blocks 后剪枝（不进结果 DOM）。
            // 须排在 HTMLElement 通用规则（compileElement）之前，first-match-wins 命中后不再走通用编译，
            // 故 x-block 元素不建 scope、不实例化其上其他指令（同元素 x-text 等随块冻结，ADR-0021）。
            [
                (node: Node) => node instanceof HTMLElement && node.hasAttribute("x-block"),
                (blockEl: HTMLElement) => this._collectBlock(blockEl),
            ],
            // 文本节点插值：含 {{}} 的文本节点拆分 + 注册。scope 经父元素查 templateScopeMap
            // （父元素在自身 walk 前已建 scope，含插值的 directive-less 元素亦由 hasInterpolation
            // 触发建 scope）。无 scope（raw-text 父等）则原样克隆。见 ADR-0004 决策 1/4。
            [
                (node: Node) =>
                    node.nodeType === Node.TEXT_NODE && hasMustache((node as Text).nodeValue),
                (node: Node) => {
                    const parent = node.parentElement;
                    const scope = parent ? this.templateScopeMap.get(parent) : undefined;
                    if (!scope) return node.cloneNode(true);
                    return this.compileTextNode(node as Text, scope);
                },
            ],
            [
                (node: Node) => node instanceof HTMLElement,
                (current: HTMLElement) => this.compileElement(current),
            ],
        ];
    }

    /**
     * 收集 x-block 命名模板块（ADR-0021）。
     *
     * 编译期前置 transformer 命中 x-block 元素时调用：把该元素**深克隆**为冻结快照（根默认注入
     * `x-scope` 确保块根无论有无指令都是 scope 锚点），按名存入**最近祖先 scope** 的 `blocks`，
     * 然后返回 `null` 剪枝——块元素及其子树**不进结果 DOM、不建 scope、不实例化指令**。
     *
     * 消费者（x-loading/x-empty/x-error…）经 `scope.getBlock(name)` 沿 parent 链就近取用本快照
     * （到顶兜底全局块），clone 后编译渲染、替换其默认 UI（块兜底）。详见 ADR-0021。
     *
     * @param blockEl 原树中的 x-block 元素（只读编译输入，仅读取其属性与结构）
     * @returns 固定 `null`（剪枝，x-block 永不进结果 DOM）
     */
    private _collectBlock(blockEl: HTMLElement): null {
        const name = (blockEl.getAttribute("x-block") ?? "").trim() || "default";
        // 沿原树向上找最近祖先 scope（与 _linkParent 同构：跨中间无 scope 的纯 div）。
        // walk 是 DFS，祖先元素已先 transform，若建了 scope 必已 templateScopeMap.set。
        let owner: AutoTemplateScope | undefined;
        let p: HTMLElement | null = blockEl.parentElement;
        while (p) {
            owner = this.templateScopeMap.get(p);
            if (owner) break;
            p = p.parentElement;
        }
        if (!owner) {
            // 无归属：编译期 warn + 丢弃（不进 blocks、不进 DOM）。与引擎静默处理冗余/异常属性的风格一致。
            this.engine.logger.warn(
                `x-block: 块 "${name}" 未找到任何祖先 scope，无法归属。请在祖先元素上声明 x-scope（或任意指令）使其建 scope。`,
            );
            return null;
        }
        // default 唯一性：仅约束直接归属本 scope 的 default（第二个直接归属 default 抛错）。
        // 其他块名自由、可沿链同名覆盖；沿 parent 链的 default 覆盖由 getBlock 就近原则处理（不在此校验）。
        if (
            name === "default" &&
            owner.blocks &&
            Object.prototype.hasOwnProperty.call(owner.blocks, "default")
        ) {
            throw new Error(
                `[x-block 冲突] 同一 scope 下只能有一个 default 块（直接归属）。第二个 default 块出现在已声明 default 的 scope 内。\n` +
                    "如需覆盖祖先的 default，请在更内层的 scope 上声明（沿 parent 链就近覆盖）。",
            );
        }
        // 冻结快照：深克隆、保留指令属性（块被消费渲染时才编译）。
        // 不注入 x-scope——「block 总是创建 scope」由块消费编译路径（compileChild 无条件 new AutoTemplateScope）
        // 内禀保证，与根上是否有 x-scope 属性无关。注入 x-scope 冗余且污染块模板，已作废（ADR-0021 决策 7 修订）。
        const snapshot = blockEl.cloneNode(true) as HTMLElement;
        if (!owner.blocks) owner.blocks = {};
        owner.blocks[name] = snapshot;
        return null;
    }

    /**
     * 编译含 `{{}}` 的文本节点（文本插值，ADR-0004 决策 1/3）。
     *
     * 拆为「字面量段 + 表达式段」，每表达式段一个 text node + 一个 `scope.watch`；
     * 返回由段 text node 组成的 `DocumentFragment`（调用方 appendChild 搬入父）。
     *
     * **x-text / 非 compile 的 x-html 在场 → 返回 null（剪枝）**：x-text 整体覆写 textContent，
     * 若插值已建段 text node + watcher，首次 compile 后段 node 被清空成游离节点、watcher 仍订阅 →
     * 孤儿 watcher 泄漏。故编译期剪枝该文本节点（非「建了让 x-text 覆盖」）。见 ADR-0004 决策 5。
     *
     * **x-html.compile 例外（ADR-0017）**：compile 模式把注入内容作为子模板编译，其顶层文本插值
     * 应正常编译（由 recompileSubtree 注入），故 compile 模式的 html 指令不触发剪枝——宿主原生
     * 子节点反正被注入内容覆盖，无孤儿 watcher 风险。
     *
     * @returns DocumentFragment（段 text node 集合）；x-text / 非 compile 的 x-html 在场返回 null（剪枝）
     */
    private compileTextNode(node: Text, scope: AutoTemplateScope): DocumentFragment | null {
        if (
            scope.directives.some(
                (d) =>
                    d.info.name === "text" || (d.info.name === "html" && !d.info.options?.compile),
            )
        ) {
            return null;
        }
        const segments = parseInterpolation(node.nodeValue ?? "");
        const frag = document.createDocumentFragment();
        if (!segments) {
            // 无 {{}}（filter 已筛，兜底）：原样克隆
            frag.appendChild(node.cloneNode(true));
            return frag;
        }
        for (const seg of segments) {
            if ("literal" in seg) {
                frag.appendChild(document.createTextNode(seg.literal));
            } else {
                const segNode = document.createTextNode("");
                const initial = scope.watch(seg.expr, ({ value }) => {
                    segNode.nodeValue = value == null ? "" : String(value);
                });
                segNode.nodeValue = initial == null ? "" : String(initial);
                frag.appendChild(segNode);
            }
        }
        return frag;
    }

    /**
     * 属性插值 desugar（ADR-0004 决策 9-12）。
     *
     * 扫描 `el` 的非指令属性，对值含 `{{}}` 者：① 同属性已有显式 bind → 抛错（互斥）；
     * ② `removeAttribute` 移除原生平属性（防字面 `{{}}` 泄漏 DOM）；③ 合成表达式；
     * ④ 实例化 `BindDirective` 复用其五路 patch 分派（class diff / style / property /
     * boolean / 普通）。watcher 经 `scope.watch` 自动入 `scope.watchers`/`_updates`，
     * destroy/refresh 自动，无需手动登记。
     */
    private _compileAttrInterpolation(el: HTMLElement, scope: AutoTemplateScope): void {
        const targets: Array<{ name: string; value: string }> = [];
        for (let i = 0; i < el.attributes.length; i++) {
            const attr = el.attributes[i];
            if (attr && !isDirectiveAttr(attr.name) && hasMustache(attr.value)) {
                targets.push({ name: attr.name, value: attr.value });
            }
        }
        for (const { name, value } of targets) {
            // 冲突检测：同属性已有显式 bind（:name / x-bind:name / x-class 等）
            const conflict = scope.directives.some(
                (d) => d.info.name === "bind" && d.info.attr === name,
            );
            if (conflict) {
                throw new Error(
                    `[插值冲突] 属性 "${name}" 已有显式绑定（:${name}/x-bind:${name}），与插值 ${name}="${value}" 互斥。\n` +
                        `请二选一：用插值 ${name}="${value}"，或显式 :${name}="<expr>"。`,
                );
            }
            const synthExpr = synthAttrExpr(value);
            el.removeAttribute(name);
            const BindCls = this.engine.directives.get("bind");
            if (!BindCls) {
                this.engine.logger.warn(`属性插值：未注册 bind 指令，跳过 ${name}="${value}"`);
                continue;
            }
            const info: AutoDirectiveInfo = { name: "bind", attr: name, value: synthExpr };
            const bind = new BindCls(this.engine, scope, info);
            bind.created();
        }
    }

    /**
     * x-model 元数据自动注入（ADR-0020）：含 x-model 的元素从 configManager schema 合成隐式 `@` 绑定。
     *
     * 与 `_compileAttrInterpolation` 并列，在 scope.compile() 后调用。合成知识封装在
     * `ModelDirective.synthesizeSchemaBindings` 静态方法（compiler 只管调用时机）。合成实体是
     * 标准 BindDirective 实例（复用 ADR-0019 全部能力）。无 x-model 的元素直接跳过。
     */
    private _synthesizeModelSchemaBindings(el: HTMLElement, scope: AutoTemplateScope): void {
        const modelDirective = scope.directives.find((d) => d instanceof ModelDirective);
        if (!modelDirective) return;
        ModelDirective.synthesizeSchemaBindings(this.engine, scope, el, modelDirective.info);
    }

    /**
     * 提取 `<script type="actions">` 内容为 action 并注册（注入目标由 `global` 标志决定）：
     * - 默认（无 global）：**局部 action** → 注入最近祖先 scope.actions（buildAction local=true，只 DOM 冒泡）。
     * - `global` 标志（`<script type="actions" global>`）：**全局 action** → 注入 engine.actions
     *   （Proxy set trap 自动 buildAction 包装，双发总线+DOM），供任意 scope 经 getAction 终点查到。
     *
     * 内容须为对象字面量（如 `{ pay(v){...}, submit(){...} }`），经 new Function 求值得对象。
     * 求值失败或非对象记日志；局部模式找不到祖先 scope 则忽略。返回 null 表示剪枝——script 不进渲染 DOM。
     * 普通 `<script>`（无 type 或其他 type）不匹配此 transformer，经 transformElement 默认路径原样保留。
     */
    private _extractScriptActions(script: HTMLScriptElement): null {
        const text = script.textContent?.trim();
        if (!text) return null;
        let parsed: Record<string, (...args: any[]) => any>;
        try {
            const result = new Function(`return (${text})`)();
            if (!result || typeof result !== "object") {
                this.engine.logger.error(`<script type="actions"> 内容须为对象字面量`);
                return null;
            }
            parsed = result;
        } catch (e: any) {
            this.engine.logger.error(`<script type="actions"> 解析失败: ${e?.message ?? e}`);
            return null;
        }
        // global 标志（`<script type="actions" global>`）：声明全局 action，注入 engine.actions
        // （actions Proxy 的 set trap 自动 buildAction 包装，local=false 双发总线+DOM），供任意 scope
        // 经 getAction 终点查到；不依赖最近祖先 scope，可在模板任意位置声明。
        if (script.hasAttribute("global")) {
            for (const [k, fn] of Object.entries(parsed)) {
                if (typeof fn === "function") this.engine.actions[k] = fn;
            }
            return null;
        }
        const scope = this._findNearestScope(script);
        if (scope) {
            // 默认局部 action：buildAction local=true，只 DOM 冒泡、不进总线（ADR-0012 避免同名串扰）；
            // 祖先聚合经 DOM action:<name> 冒泡隔离作用域
            const wrapped: Record<string, (...args: any[]) => any> = {};
            for (const [k, fn] of Object.entries(parsed)) {
                wrapped[k] =
                    typeof fn === "function"
                        ? buildAction(
                              (type, payload) => this.engine.emit(type as any, payload),
                              k,
                              fn,
                              true,
                          )
                        : fn;
            }
            scope.actions = { ...scope.actions, ...wrapped };
        }
        return null;
    }

    /**
     * 沿 parentElement 向上查找最近的已注册 scope（templateScopeMap）。
     * 与 `_linkParent` 查找逻辑一致，用于把 script action 挂到最近祖先作用域。
     */
    private _findNearestScope(el: HTMLElement): AutoTemplateScope | undefined {
        let p: HTMLElement | null = el.parentElement;
        while (p) {
            const scope = this.templateScopeMap.get(p);
            if (scope) return scope;
            p = p.parentElement;
        }
        return undefined;
    }

    /**
     * 编译整棵模板，返回重建后的根元素（已移除指令属性、各元素挂载 scope）。
     * 每次 compile 重建 templateScopeMap（编译期临时结构）。
     */
    compile(): HTMLElement {
        this.templateScopeMap = new WeakMap();
        return transformElement(this.engine.template, this._getTransformers());
    }

    /**
     * 正向桥：模板元素 → scope（ADR-0002 决策 2）。
     *
     * 供 `engine.patch` 经 selector（对 `engine.template` querySelector）定位 patch 目标的 scope，
     * 再取 `scope.el` 得运行元素。仅含指令或 `{{}}` 插值的元素（有 scope）能命中；
     * 纯静态裸元素返回 undefined（需挂 `x-patch` 哨兵建 scope）。
     */
    getScopeByTemplate(templateEl: HTMLElement): AutoTemplateScope | undefined {
        return this.templateScopeMap.get(templateEl);
    }

    /**
     * 单条指令是否占有子树（ownsChildren）的纯判定谓词。
     *
     * 查指令类的静态 `ownsChildren(info)`。提取为谓词后，`scopeOwnsChildren`（boolean 查询）
     * 与 `_resolveOwnership`（需计数以检测多 owner 冲突）共用同一真相源。
     */
    private _ownsChildrenDirective(d: { info: AutoDirectiveInfo }): boolean {
        const cls = this.engine.directives.get(d.info.name);
        return !!cls?.ownsChildren?.(d.info);
    }

    /**
     * scope 是否被任意结构指令（ownsChildren）占有子树——纯判定，不抛错。
     *
     * 供 `engine.patch` 的动态区域守卫（ADR-0002 决策 5）：patch 目标自身或祖先链上有
     * ownsChildren 指令（x-for / eager x-if / x-slot）即处于动态区域，正向桥不可靠，拒绝。
     */
    scopeOwnsChildren(scope: AutoTemplateScope): boolean {
        return scope.directives.some((d) => this._ownsChildrenDirective(d));
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
        // 含插值（文本/属性）但无指令的元素也需建 scope（隐式指令，ADR-0004 决策 2）。
        if (!hasDirectives(template) && !hasInterpolation(template)) {
            // 必须浅克隆：transformElement 用 live NodeList 遍历原节点子节点并挂到返回的新节点下，
            // 若返回原节点，appendChild 会写回原节点自身、其 childNodes 持续增长，导致 live 遍历无限循环。
            return template.cloneNode(false) as HTMLElement;
        }
        const el = template.cloneNode(false) as HTMLElement;
        removeDirectives(el, "x-", this._runtimeKeepAttr());
        const scope = new AutoTemplateScope(this.engine, el, template);
        this._linkParent(template, scope);
        this.templateScopeMap.set(template, scope);
        this.engine.scopes.set(new WeakRef(el), scope);
        // 冲突检测先于 compile：让 x-for + eager x-if 同元素在跑任何指令生命周期前即失败
        const ownsChildren = this._resolveOwnership(scope);
        scope.compile();
        // 属性插值 desugar（compile 后；合成 bind 独立注册，复用 BindDirective 五路分派）
        this._compileAttrInterpolation(el, scope);
        // x-model 元数据自动注入（ADR-0020）：含 x-model 的元素从 schema 合成隐式 @ 绑定
        this._synthesizeModelSchemaBindings(el, scope);
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
     * 提示改用 `x-show`/`x-if.keepalive`（均不占子树）或外层包裹。
     */
    private _resolveOwnership(scope: AutoTemplateScope): boolean {
        const owners = scope.directives.filter((d) => this._ownsChildrenDirective(d));
        if (owners.length > 1) {
            throw new Error(
                "[x-if/x-for 冲突] x-if 的条件存在性（detach）与 x-for 的列表渲染不能作用于同一元素。\n" +
                    "若需控制整个列表显隐，请改用（均不占子树，可与 x-for 共存）：\n" +
                    '  • x-show="<expr>"      （display:none，宿主永留 DOM）\n' +
                    '  • x-if.keepalive="<expr>"   （detach 宿主，保活子树与 watcher）\n' +
                    '或用外层包裹：<div x-if="<expr>"><ul x-for="…">…</ul></div>',
            );
        }
        return owners.length === 1;
    }

    /**
     * 构建 removeDirectives 的 keepAttr 谓词：保留 Runtime/Hybrid 指令属性。
     *
     * 这些指令的属性须留在结果 DOM 上（供 static initialize 建立的 MutationObserver 检测、
     * 允许 DOM API 改值/删除），故编译期不剥除。Compile 指令属性照常剥除。
     *
     * 匹配规则：对每个 Runtime/Hybrid 指令名 `n`，保留 `x-${n}` 与 `x-${n}.*`（含修饰符形式，
     * 如 `x-loading.screen`）。`.` 边界避免 `x-loading` 误匹配 `x-loading-state`。
     * 仅考虑 `x-` 长前缀（Runtime 指令无 `@`/`:` 快捷形式）。
     */
    private _runtimeKeepAttr(): (attrName: string) => boolean {
        const names: string[] = [];
        for (const [name, cls] of this.engine.directives) {
            if (cls.kind === DirectiveKind.Runtime || cls.kind === DirectiveKind.Hybrid) {
                names.push(name);
            }
        }
        return (attrName: string) =>
            names.some((n) => attrName === `x-${n}` || attrName.startsWith(`x-${n}.`));
    }

    /**
     * 编译单个子节点（compileSubtree / compileChildNodes 共用的单节点逻辑）。
     *
     * - **HTMLElement → `transformElement`**（递归子节点 + 文本插值，建 scope / 合成 scope）
     * - **含 `{{}}` 文本节点 → `compileTextNode`**（插值拆分，返回 DocumentFragment 或 null 剪枝）
     * - 其余文本/注释 → `cloneNode(true)`
     *
     * **铁律：HTMLElement 必须走 `transformElement`（递归），不可用 `compileElement`**——后者只浅克隆，
     * 会丢失整棵子树与插值（patch 替换自身的关键正确性保证）。
     *
     * @param scope 顶层文本插值节点注册 watcher 所用 scope（其父元素 scope）
     * @returns 编译后节点 / DocumentFragment（多段插值）/ null（剪枝）
     */
    private compileOneChild(child: Node, scope: AutoTemplateScope | null): Node | null {
        if (child instanceof HTMLElement) {
            return transformElement(child, this._getTransformers());
        }
        if (child.nodeType === Node.TEXT_NODE && hasMustache((child as Text).nodeValue)) {
            // 顶层文本插值需 scope 注册 watcher；无 scope（patch 替换到无祖先 scope 的根级）则原样克隆
            return scope ? this.compileTextNode(child as Text, scope) : child.cloneNode(true);
        }
        return child.cloneNode(true);
    }

    /**
     * 编译一组节点并返回运行节点列表（**不挂载**，挂载由调用方处理）。
     *
     * 供 `engine.patch` 替换自身：updater 返回的 `string`/`Node` 经解析为 templateNodes，
     * 本方法编译它们（HTMLElement 走 `transformElement` 递归、文本插值走 `compileTextNode`），
     * `DocumentFragment` 展开成实际子节点，收集为 runtimeNodes 供调用方 `replaceWith`。
     *
     * @param nodes  待编译的模板节点（通常来自 `parseHtmlFragment` 或 updater 返回的 Node）
     * @param scope  顶层文本插值节点的注册 scope（替换后挂父下，用父 scope）
     */
    compileChildNodes(nodes: Node[], scope: AutoTemplateScope | null): Node[] {
        const result: Node[] = [];
        for (const child of nodes) {
            const compiled = this.compileOneChild(child, scope);
            if (compiled == null) continue;
            if (compiled instanceof DocumentFragment) {
                result.push(...Array.from(compiled.childNodes));
            } else {
                result.push(compiled);
            }
        }
        return result;
    }

    /**
     * 编译某模板的全部子节点并挂到指定父元素，返回已编译节点列表。
     *
     * 共享给结构指令（eager x-if 编译/重建子树 / x-for 项 / engine.data 重建子树 / `engine.patch`
     * 子树重建）：单节点编译委托 `compileOneChild`，挂载用 `appendChild`。`compileTextNode` 可能
     * 返回 `DocumentFragment`（多段插值）或 `null`（x-text 在场剪枝）：fragment 搬入父后展开成实际
     * 子节点入 `nodes`（供 if.ts 精确移除）；null 跳过（剪枝）。
     *
     * @param scope 子树根的 scope，供直接文本子节点插值注册（项 scope / x-if scope 等）
     */
    compileSubtree(
        parentEl: HTMLElement,
        templateEl: HTMLElement,
        scope: AutoTemplateScope,
    ): ChildNode[] {
        const nodes: ChildNode[] = [];
        for (const child of Array.from(templateEl.childNodes)) {
            const compiled = this.compileOneChild(child, scope);
            if (compiled == null) continue; // 剪枝（如 x-text 在场的插值文本）
            if (compiled instanceof DocumentFragment) {
                // fragment：搬入父后展开成实际子节点入 nodes（供调用方精确移除）
                const moved = Array.from(compiled.childNodes);
                parentEl.appendChild(compiled);
                nodes.push(...moved);
            } else {
                // 非 fragment：HTMLElement/Text/Comment 等均为 ChildNode（可被调用方 remove）
                parentEl.appendChild(compiled);
                nodes.push(compiled as ChildNode);
            }
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
        parentScope: AutoTemplateScope | null,
        localScope: Record<string, any>,
        reuseEl?: HTMLElement,
        /**
         * 编译前注入块根的**响应式** dataScope（仿 DataDirective.applyLocal）。
         *
         * 与 localScope（普通对象、非响应式）并列：在 `scope.compile()` 之前把数据写入
         * `store.state._scopes[scope.id]` 并令 `scope.dataScope` 指向它。块内指令 watch 首次求值时，
         * `getScopeContext` 的 `_scopeView` 缓存即建成含 dataScope 层的 Proxy，`collectDependencies`
         * 收集到 `_scopes.<id>.<field>` 精准路径——后续 `Object.assign` 进该响应式代理即字段级细粒度更新。
         *
         * 供 x-loading 等消费者把 config 注入块（ADR-0021 决策 12-c）。无此参则不注入 dataScope。
         */
        initialData?: Record<string, any>,
    ): { el: HTMLElement; scope: AutoTemplateScope } {
        const el = reuseEl ?? (itemTemplate.cloneNode(false) as HTMLElement);
        if (!reuseEl) removeDirectives(el, "x-", this._runtimeKeepAttr());
        // reuseEl：旧 scope 已 destroy，其子树 DOM 残留在 el 上，须清空后重建，否则 compileSubtree
        // 的 appendChild 会导致子节点重复。
        if (reuseEl) {
            while (el.firstChild) el.removeChild(el.firstChild);
        }
        const scope = new AutoTemplateScope(this.engine, el, itemTemplate);
        scope.localScope = localScope;
        // 编译前注入响应式 dataScope（须早于 scope.compile()——各指令 watch 在 compile 内建立，
        // 首次求值的 getScopeContext 缓存须含 dataScope 层，否则 collectDependencies 收不到精准路径）
        if (initialData) {
            const scopes = (this.engine.store.state as Record<string, any>)[SCOPES_KEY] as Record<
                string,
                any
            >;
            if (!scopes[scope.id]) scopes[scope.id] = {};
            // dataScope 收敛为局部非空引用：scope.dataScope 字段可为 null（未注入时），
            // 此处守卫内必已初始化，用局部变量避免 Object.assign 接收 null 的类型错误。
            const dataScope = scopes[scope.id];
            scope.dataScope = dataScope;
            Object.assign(dataScope, initialData);
        }
        // parentScope 可空（rootless 块编译，如 x-loading 宿主无 scope 的动态插入场景）：跳过父子挂接，
        // 块 scope 独立（无祖先继承），仅靠 initialData 注入的 dataScope 提供上下文。
        parentScope?.addChild(scope);
        this.templateScopeMap.set(itemTemplate, scope);
        this.engine.scopes.set(new WeakRef(el), scope);
        // 项根本身若是结构指令（嵌套 x-for，如 <ul x-for="row"><li x-for="cell">），
        // 其子节点由该内层结构指令在 render 时自行克隆编译，此处跳过手动编译以免双重冲突。
        if (!this._resolveOwnership(scope)) {
            this.compileSubtree(el, itemTemplate, scope);
        }
        scope.compile();
        // 项根属性插值 desugar（项根不走 compileElement，须在此补；复用 BindDirective）
        this._compileAttrInterpolation(el, scope);
        // x-model 元数据自动注入（ADR-0020）：项根含 x-model 时同样合成
        this._synthesizeModelSchemaBindings(el, scope);
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

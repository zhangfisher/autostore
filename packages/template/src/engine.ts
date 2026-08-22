import type { AutoTemplateEngineEvents, AutoTemplateEngineOptions } from "./types";
import type { ComponentDef } from "./directives/component-def";
import { DirectiveManager } from "./directives/manager";
import { AutoTemplateCompiler } from "./compile/compiler";
import { AutoStore, FastEvent, isAutoStore } from "autostore";
import type { AutoTemplateScope } from "./scope";
import { UpdateScheduler } from "./scheduler";
import { RuntimeObserverDispatcher } from "./directives/runtime/dispatcher";
import { parseHtmlFragment } from "./utils/transformElement";
import { buildAction } from "./utils/buildAction";
import { recompileSubtree } from "./utils/recompileSubtree";
import { buildComponentDef } from "./compile/collect";
import { fetchHtml } from "./utils/fetchHtml";

/**
 * 框架保留键：x-data 默认模式的私有响应式数据域在 store.state 下的容器键。
 *
 * engine 初始化自动注入 store.state[SCOPES_KEY] = {}（不存在时）。每个 x-data scope 的
 * 数据存于 store.state[SCOPES_KEY][scope.id]，借 store 响应式自动更新订阅者
 * （collectDependencies 收集 `_scopes.<id>.<field>` 精准路径，实现字段级细粒度更新）。
 *
 * **保留键**：用户 state 树不得使用 "_scopes" 命名，否则将被 engine 覆盖/冲突。
 */
export const SCOPES_KEY = "_scopes";

/**
 * AutoStore Template 渲染引擎核心类
 *
 * 以外部传入的 `AutoStore` 实例为响应式数据源，编译声明式模板并挂载到 DOM；
 * 状态变化时由各指令自行订阅、经 `scheduler` 微任务合并后做细粒度 patch。
 *
 * 生命周期：`compile`(编译挂载) → `stop`/`start`(暂停/恢复) → `destroy`(彻底清理)。
 *
 * @example
 * ```html
 * <div id="app">
 *   <span x-text="user.name"></span>
 * </div>
 * ```
 *
 * ```typescript
 * const store = new AutoStore({ user: { name: "zhang" } });
 * const app = new AutoTemplateEngine(document.getElementById("app")!, store);
 * // 改 state 即自动更新 DOM
 * store.state.user.name = "li";
 * app.destroy();
 * ```
 */
export class AutoTemplateEngine<
    State extends Record<string, any> = Record<string, any>,
> extends FastEvent.FastLiteEvent<AutoTemplateEngineEvents> {
    /** 挂载容器（编译产物替换其子节点，容器本身保留） */
    readonly el: HTMLElement;
    /** 响应式数据源：外部传入的 AutoStore 实例（借用）或裸状态自建的 store（拥有，见 _ownsStore）。ADR-0009 */
    readonly store: AutoStore<State>;
    /** engine 是否拥有 store（裸状态自建路径）。destroy 时仅当拥有才回收 store（ADR-0009 决策 2）。 */
    private _ownsStore = false;

    /**
     * 重写基类 accessor：基类 options 是 getter，子类不得用实例属性遮蔽（TS2610），
     * 故以 getter 重写，返回合并类型（协变兼容基类 FastLiteEventOptions）。
     * 构造完成前 _fullOptions 未就绪时回退 super.options，规避基类构造期虚分派读到 undefined。
     */
    override get options(): AutoTemplateEngineOptions<State> {
        return super.options as AutoTemplateEngineOptions<State>;
    }
    readonly compiler: AutoTemplateCompiler;
    readonly directives: DirectiveManager;
    /** 微任务更新调度器（同 tick 多次变更合并为一次 patch） */
    readonly scheduler: UpdateScheduler;
    /** runtime 指令共享 observer 分发器（ADR-0003 决策 7）：单一 MutationObserver + 事件广播 */
    readonly dispatcher: RuntimeObserverDispatcher;
    /** 原始模板（深克隆根元素，保留指令属性作为编译只读输入） */
    readonly template: HTMLElement;
    /** 每个渲染元素对应的 Scope（销毁时遍历清理其 watcher） */
    readonly scopes = new Map<WeakRef<Node>, AutoTemplateScope>();
    /**
     * 整个 engine 响应式数据驱动的核心：直接暴露 `store.state`（响应式根状态）。
     * 作为 scope 聚合视图（getContext）的根 fallback、模板表达式求值的最终数据源。
     */
    get state() {
        return this.store.state;
    }
    /** 是否已编译并挂载 */
    private pending = false;

    /**
     * @param el       挂载根元素（必须是 HTMLElement）
     * @param store    响应式数据源：AutoStore 实例（借用，engine 不销毁）或裸状态对象（engine 自动
     *                 `new AutoStore(state, options.storeOptions)` 并拥有、destroy 时销毁）。ADR-0009
     * @param options  配置选项（`storeOptions` 仅裸状态路径消费）
     * @throws {Error} el 非 HTMLElement
     */
    constructor(
        el: HTMLElement,
        store: AutoStore<State> | State,
        options?: Partial<AutoTemplateEngineOptions<State>>,
    ) {
        super({ autostart: true, debug: false, actions: {}, ...options });
        if (!(el instanceof HTMLElement)) {
            throw new Error("Root element must be an HTMLElement");
        }
        this.el = el;
        // 数据源分流（ADR-0009）：AutoStore 实例直接借用；裸状态自建 store（_ownsStore 标记，destroy 时回收）。
        // null/undefined/非对象静默走自建路径，core 的 state||{} 兜成空 store（不抛错，ADR-0009 决策 5）。
        if (isAutoStore(store)) {
            this.store = store;
            this._ownsStore = false;
        } else {
            this.store = new AutoStore(store as State, options?.storeOptions);
            this._ownsStore = true;
        }
        // 注入框架保留键 _scopes（x-data 私有响应式域容器）；1 engine 1 store 约定下由 engine 负责
        this._ensureScopesState();
        // 注册时自动包装：构造时传入的 options.actions 一次性包装
        // （运行时 `engine.actions[name] = fn` 经 actions Proxy 的 set trap 包装、
        // `<script type="actions">` 经 compiler 包装，三入口统一走 buildAction）
        const _initActions = this.options.actions!;
        for (const _k of Object.keys(_initActions)) {
            if (typeof _initActions[_k] === "function") {
                _initActions[_k] = buildAction(
                    (type, payload) => this.emit(type as any, payload),
                    _k,
                    _initActions[_k] as any,
                ) as any;
            }
        }
        this.template = el.cloneNode(true) as HTMLElement;

        this.scheduler = new UpdateScheduler(this);
        this.compiler = new AutoTemplateCompiler(this);
        this.directives = new DirectiveManager(this);
        this.dispatcher = new RuntimeObserverDispatcher(this);
        if (this.options.autostart) {
            this.compile();
        }
        // 类级初始化：对所有注册指令类（不分 kind）调用 static initialize(engine)。
        // 须在 autostart compile 之后——runtime 指令的 initialize 会扫描已挂载的编译产物建 observer、
        // 注入全局样式等。autostart=false 时编译产物尚未挂载，observer 连接后由 start() 的
        // replaceChildren 触发 add 回调，照样生效。
        this.directives.initializeAll();
        // 启动 runtime 指令共享 observer 分发器：须在 initializeAll（含 injectStyles 等 FOUC 防御）
        // 之后、engine/ready 之前——初始扫描会同步触发首次 mounted，依赖样式已注入。
        this.dispatcher.start();
        this.emit("engine/ready", { el: this.el }, true);
    }

    get logger() {
        return this.store.logger;
    }

    /**
     * 全局事件 action 表（来自 options.actions），作为 scope.getAction 查找链的终点。
     *
     * 返回 Proxy：**赋值即自动包装**——`engine.actions.save = fn` 时 fn 经 buildAction 包装
     * （获得 `actions/<name>/*` 生命周期广播）后写入底层 options.actions；读取、遍历、getAction
     * 均透明（get 默认转发底层）。故 action 注册即追踪，无需手动包装。
     */
    get actions(): Record<string, (...args: any[]) => any> {
        if (this._actionsProxy) return this._actionsProxy;
        const target = this.options.actions!;
        this._actionsProxy = new Proxy(target, {
            set: (t, key: string, value: any) => {
                t[key] =
                    typeof value === "function"
                        ? (buildAction(
                              (type, payload) => this.emit(type as any, payload),
                              key,
                              value,
                          ) as any)
                        : value;
                return true;
            },
        });
        return this._actionsProxy;
    }

    private _createStore() {}

    /** actions 代理（set 时自动 buildAction 包装，懒构造） */
    private _actionsProxy: Record<string, (...args: any[]) => any> | null = null;
    /**
     * 全局组件懒预编译缓存（ADR-0022 承接 ADR-0021 决策 11）：key=组件名，value=预编译根元素
     * （已自动包装、含 `x-component`、未编译、保留指令属性、**不注入 x-scope**）。首次 `getComponent`
     * 命中全局时解析 `options.components[name]` 字符串入参并写入此 Map，后续命中直接 `cloneNode(true)`。
     * 生命周期随 engine（destroy 自动回收）。记录 null 表示该名全局组件解析失败/不存在，已查明
     * 「视为未命中」，避免重复解析尝试。
     */
    private _globalComponentCache = new Map<string, HTMLElement | null>();
    /**
     * 全局组件 def 缓存（ADR-0022 决策二/四）：key=组件名，value=ComponentDef
     * （由 `_resolveGlobalComponent` 懒预编译时建：解析字符串 → 包装根 → 提取 `<script setup>`/`<style>` → 组装 def）。
     * 与 `_globalComponentCache`（HTMLElement 快照）并行——后者服务于 x-loading 等只需 DOM 的消费者，
     * 本表服务于 x-use 等需要组件元数据（setup/hooks/styles）的消费者。同条目二缓存同源（一次预编译产出）。
     */
    private _globalComponentDefCache = new Map<string, ComponentDef | null>();
    /**
     * 组件定义表（ADR-0022 决策二-1、决策七）：key=组件冻结快照根元素，value=ComponentDef。
     *
     * compiler `_collectComponent` 命中 x-component 时建 def，以快照根为 key 存入此表。
     * `getComponent(name)` 返回 HTMLElement 快照（保持 x-loading 等消费者契约不变），x-use 实例化时
     * 经快照根反查本表取 def（setup/hooks/styles/parent/components）。定义 scope 链（嵌套私有子组件）经
     * `def.parent` / `def.components` 表达，与此表正交。WeakMap：scope 回收后 def 自动释放。
     */
    private _componentDefs = new WeakMap<HTMLElement, ComponentDef>();
    /**
     * x-import url 缓存（ADR-0022 决策六-3）：key=url，value=解析出的 HTMLElement 根数组
     * （fetched HTML 里的各 `<div x-component>` 顶级元素）。重复引用同一 url 命中缓存，免重复 fetch。
     * 循环 import 检测：fetch 中记录 url 到 `_importingUrls`，命中即 warn + 中断该链。
     */
    private _importUrlCache = new Map<string, HTMLElement[]>();
    /** 正在 fetch 的 url 集合（循环 import 检测，ADR-0022 决策六-4） */
    private _importingUrls = new Set<string>();

    // buildAction 已提炼至 utils/buildAction.ts（ADR-0010，双通道广播）；三入口——构造函数
    // options.actions 扫描、actions Proxy 的 set trap、compiler 提取 `<script type="actions">`
    // ——均经该 utils 函数包装（emit 经 `(t,p)=>this.emit(t as any,p)` 适配）。engine 不再暴露
    // 公有 buildAction API（原为内部实现细节被误暴露）。

    /**
     * 确保 store.state[SCOPES_KEY] 存在（x-data 私有响应式域容器）。
     *
     * 1 engine 1 store 约定下由 engine 负责注入：不存在则建空对象（core 自动建响应式代理），
     * 已存在（用户预设/复用）则沿用。仅赋值一次；后续 x-data scope 向其写入 [id] 条目，
     * 永不整体替换该容器（DataDirective 同守"只 Object.assign 进 _scopes[id]、不整体替换"铁律）。
     */
    private _ensureScopesState() {
        const state = this.store.state as Record<string, any>;
        if (!Object.prototype.hasOwnProperty.call(state, SCOPES_KEY)) {
            state[SCOPES_KEY] = {};
        }
    }

    /**
     * 编译模板并把产物挂载到 `el`。
     *
     * compiler 基于 `template`（只读）重建一棵移除指令属性的新元素树，
     * 随后用 `el.replaceChildren(root)` 替换容器子节点——使产物进入文档，
     * watcher 才能作用在可见 DOM 上。
     */
    compile() {
        this.emit("engine/compile/before", { root: this.template });
        const root = this.compiler.compile();
        // 挂载编译产物的子节点（而非 root 本身）：engine.template 是 el 的深克隆（含外层容器），
        // 编译后的 root 是该容器的重建；取其子节点挂回 el，避免容器内多套一层容器克隆。
        this.el.replaceChildren(...Array.from(root.childNodes));
        this.pending = true;
        // 同步消化编译期排队的首次渲染：某些指令（如 x-for）的首次渲染依赖元素已挂载，
        // 在 created 中只能 schedule 到 microtask；此处 el 已挂载，立即 flush 使初始 DOM 同步可见。
        // 用 flushAll 持续消化 x-for 嵌套带来的级联首次渲染，使 mount 返回时各层级 DOM 均已就绪。
        this.scheduler.flushAll();
        this.emit("engine/compile/after", { root });
        return this;
    }

    /**
     * 启动引擎：尚未编译时编译挂载；已启动则幂等返回。
     */
    start() {
        if (!this.pending) {
            this.compile();
        }
        return this;
    }

    /**
     * 停止引擎：移除挂载的 DOM 并标记停止（不销毁订阅，可再次 `start`）。
     */
    stop() {
        this.el.replaceChildren();
        this.pending = false;
        return this;
    }

    /**
     * 运行时更新/创建数据（替代已废除的 x-data setAttribute 监听）。
     *
     * `data(el, data)` 合并进 el 对应 scope 的私有响应式域 `_scopes[scope.id]`：
     * - **scope 已有 data**（模板有 x-data）→ `Object.assign` 合并，路径订阅自动驱动更新
     *   （主路径，不动 DOM、不重订阅）。
     * - **scope 无 data**（el 原无 x-data）→ 新建 data + 失效本 scope 视图 + destroy 子树 +
     *   重新编译子树（A 方案：子树 DOM 重建）。因 watcher 的 `collectDependencies` 仅 created 跑一次，
     *   不覆盖新出现的 data，只能重建让子树重新订阅。
     *
     * 不支持 global 模式（x-data.global 仍由模板属性驱动；运行时改全局请直接操作 `store.state`）。
     *
     * @param el   渲染后的元素（须为 engine 注册的 scope.el）
     * @param data 要合并的普通对象（合并语义：只增改、不删已有键）
     */
    data(el: HTMLElement, data: Record<string, any>) {
        const scope = this.findScopeByEl(el);
        if (!scope) {
            this.logger.warn(`engine.data: 元素未找到对应 scope，已忽略`);
            return;
        }
        if (scope._data) {
            // 主路径：合并 → 路径订阅自动驱动
            Object.assign(scope._data as Record<string, any>, data);
            this.emit("scope/data-updated", { id: scope.id, data });
            return;
        }
        // 无 data（el 原无 x-data）：新建 + 重建子树（A）
        const scopes = (this.store.state as Record<string, any>)[SCOPES_KEY] as Record<string, any>;
        if (!scopes[scope.id]) scopes[scope.id] = {};
        scope._data = scopes[scope.id];
        Object.assign(scope._data as Record<string, any>, data);
        // 失效本 scope 缓存视图（含新 data 层），子树重建后新子 scope 经 parent 链取到新视图
        scope.invalidateScopeView();
        recompileSubtree(scope, el);
        this.emit("scope/data-updated", { id: scope.id, data });
    }

    /**
     * 按 el 反查 scope，再沿 parent 链就近查找命名组件，到顶兜底全局组件（ADR-0022 决策五，承接 ADR-0021 决策 5/9）。
     *
     * 供 **Runtime 指令**（如 x-loading，无 binding/scope）消费 x-component：编译期元素建过 scope
     * 的才能被反查到（el 经 `engine.scopes` WeakRef 遍历 deref 比对，O(n)、低频可接受）。
     * Compile/Hybrid 消费指令应直接用 `this.binding.getComponent(name)`，避免 O(n) 遍历。
     *
     * 消费者协议：命中则用组件替换默认 UI，未命中回退默认实现（组件兜底）。详见 ADR-0022。
     *
     * @param el   消费指令的宿主元素（须是建过 scope 的元素，否则反查不到）
     * @param name 组件名（消费者约定名，自由命名）
     * @returns 组件冻结快照 HTMLElement，或 undefined（el 无 scope / 链+全局均无该名组件）
     */
    getComponent(el: HTMLElement, name: string): HTMLElement | undefined {
        const scope = this.findScopeByEl(el);
        return scope?.getComponent(name);
    }

    /**
     * 全局组件兜底解析（ADR-0022 承接 ADR-0021 决策 9/10/11）：`scope.getComponent` 到顶后委托本方法。
     *
     * 懒预编译：首次访问某全局组件时，把 `options.components[name]` 字符串入参解析为 DOM，按自动包装规则
     * （决策 10）规范化为「恰好一个带 `x-component` 的根元素」，存入 `_globalComponentCache`；后续命中直接
     * 返回缓存（消费者自管 `cloneNode(true)`）。解析失败/不存在 → 记 null 缓存 + 返回 undefined
     * （视为未命中，由消费者回退默认实现；记 null 避免重复解析尝试）。
     *
     * **不注入 x-scope**（决策 7 修订：scope 由消费编译路径 compileChild 内禀保证）。
     * **不回写 options.components**（不突变用户输入）。**运行时突变 options.components 不失效缓存**
     * （构造期配置语义，与 actions/sanitizer 等同纪律）。
     *
     * @param name 全局组件名
     * @returns 预编译根元素（未编译、含 x-component），或 undefined（无此全局组件/解析失败）
     */
    _resolveGlobalComponent(name: string): HTMLElement | undefined {
        if (this._globalComponentCache.has(name)) {
            return this._globalComponentCache.get(name) ?? undefined;
        }
        const components = this.options.components;
        const raw = components?.[name];
        if (typeof raw !== "string" || raw.trim() === "") {
            // 非字符串 / 空串 → 记 null（视为未命中），避免重复判定
            this._globalComponentCache.set(name, null);
            this._globalComponentDefCache.set(name, null);
            return undefined;
        }
        let root: HTMLElement | null = null;
        try {
            root = this._wrapGlobalComponent(raw, name);
        } catch (e: any) {
            this.logger.warn(`全局组件 "${name}" 解析失败，视为未命中: ${e?.message ?? e}`);
            this._globalComponentCache.set(name, null);
            this._globalComponentDefCache.set(name, null);
            return undefined;
        }
        if (!root) {
            this.logger.warn(`全局组件 "${name}" 解析为空，视为未命中`);
            this._globalComponentCache.set(name, null);
            this._globalComponentDefCache.set(name, null);
            return undefined;
        }
        // 组装组件定义：提取 <script setup>/<style>、求值合并 setup、克隆洁净快照（剥离 script/style）。
        // 全局组件的 def 元数据与快照同源——一次预编译同时产出 _globalComponentCache（快照）与
        // _globalComponentDefCache（def），供 x-loading（取快照）与 x-use（取 def）分别消费。
        const def = buildComponentDef(root, name, (msg) => this.logger.warn(msg));
        this._globalComponentCache.set(name, def.snapshot);
        this._globalComponentDefCache.set(name, def);
        return def.snapshot;
    }

    /**
     * 全局组件自动包装（ADR-0022 承接 ADR-0021 决策 10）：把字符串入参规范化为「恰好一个带 `x-component` 的根元素」。
     *
     * 规则（仅全局组件字符串入参适用；局部组件入参已是 DOM）：
     * | 输入形态 | 包装结果 |
     * |---|---|
     * | 单顶级元素、无 `x-component` | 根打本 key 名（`x-component="name"`） |
     * | 单顶级元素、**已含** `x-component` | 尊重原值不重命名 |
     * | 多顶级节点 / 元素+文本混排 | 包一层 `<div x-component="name">` |
     * | 纯文本无元素 | 包成 `<div x-component="name">文本` |
     *
     * 包装标签固定 `<div>`（YAGNI，不开放配置）。**不注入 x-scope**（决策 7 修订）。
     *
     * @param html  全局组件字符串入参（已 trim 非空）
     * @param name  全局组件名（单根无 x-component 时用作根标签名）
     * @returns 规范化后的根元素；解析为空返回 null
     */
    private _wrapGlobalComponent(html: string, name: string): HTMLElement | null {
        const frag = parseHtmlFragment(html);
        if (!frag) return null;
        // 取顶级元素节点（忽略顶级文本/注释以判定"单根元素"）
        const elementChildren = Array.from(frag.children);
        const hasTextNode = Array.from(frag.childNodes).some(
            (n) => n.nodeType === Node.TEXT_NODE && (n.nodeValue ?? "").trim() !== "",
        );
        if (elementChildren.length === 1 && !hasTextNode) {
            // 单顶级元素：已含 x-component 则尊重原值，否则打本 key 名
            const root = elementChildren[0] as HTMLElement;
            if (!root.hasAttribute("x-component")) {
                root.setAttribute("x-component", name);
            }
            return root;
        }
        // 多顶级元素 / 元素+文本混排 / 纯文本：包一层 div
        const wrap = document.createElement("div");
        wrap.setAttribute("x-component", name);
        wrap.appendChild(frag);
        return wrap;
    }

    /**
     * 动态 patch：修改模板片段并增量同步到运行树（ADR-0002）。
     *
     * 开发者在 `updater` 回调里就地修改 `engine.template` 的某个 scope 子树（回调入参即命中的
     * 模板元素），本方法据 `updater` 返回值决定重建范围，**只动 patch 目标子树，保留其余运行态**
     * （焦点/滚动/未提交输入）。selector 对 `engine.template` querySelector；命中须为 scope
     * （含指令或 `{{}}` 插值的元素；纯静态裸元素需挂 `x-scope` 哨兵）。
     *
     * **返回四态**（判定用 `===`/`typeof`，`undefined != null` 严格区分）：
     * - `void`/`undefined` 或 `=== templateEl` → **子树重建**（复用 `recompileSubtree`）
     * - 新 `Node`（`!== templateEl`）→ **替换自身**
     * - `string`（HTML）→ **替换自身**（`<template>` 解析，可多节点，空串=删除）
     * - `null` → **删除自身**
     *
     * **动态区域守卫**：patch 目标自身或祖先链含 ownsChildren 结构指令（x-for / eager x-if /
     * x-slot）→ 拒绝（运行侧结构非同构，正向桥不可靠）。
     *
     * updater 抛错则记日志、不重建；patch 后同步 `flushAll`，返回时 DOM 已更新。dispatcher 经
     * MutationObserver 自动处理新/旧节点的 runtime 指令 mount/unmount，patch 不直接操作。
     *
     * @param selector 对 `engine.template` 的 CSS 选择器（命中的须为 scope 元素）
     * @param updater  接收命中的模板元素，就地修改；返回值决定重建语义
     */
    patch(
        selector: string,
        updater: (templateEl: HTMLElement) => Node | string | null | undefined,
    ): this {
        const hit = this.template.querySelector(selector);
        if (!hit || !(hit instanceof HTMLElement)) {
            this.logger.warn(`engine.patch: selector "${selector}" 未命中模板元素`);
            return this;
        }
        const T = hit;
        if (this._isInDynamicRegion(T)) {
            this.logger.warn(`engine.patch: "${selector}" 处于动态区域（x-for/x-if/x-slot），拒绝`);
            return this;
        }
        const scope = this.compiler.getScopeByTemplate(T);
        if (!scope) {
            this.logger.warn(
                `engine.patch: "${selector}" 非 scope 元素（无指令/插值），需挂 x-scope`,
            );
            return this;
        }
        const el = scope.el;
        if (!el) {
            this.logger.warn(`engine.patch: "${selector}" 的 scope 已失效（运行元素被回收）`);
            return this;
        }
        this.emit("engine/patch/before", { selector, el });
        let R: Node | string | null | undefined;
        try {
            R = updater(T);
        } catch (e: any) {
            this.logger.error(`engine.patch updater 抛错，不重建: ${e?.message ?? e}`);
            return this;
        }
        if (R === null) {
            this._deleteSelf(scope, T, el);
        } else if (R === undefined || R === T) {
            recompileSubtree(scope, el);
        } else if (typeof R === "string") {
            const frag = parseHtmlFragment(R);
            const nodes = frag ? Array.from(frag.childNodes) : [];
            if (nodes.length === 0) {
                this._deleteSelf(scope, T, el);
            } else {
                this._replaceSelf(scope, T, el, nodes);
            }
        } else if (R instanceof Node) {
            this._replaceSelf(scope, T, el, [R]);
        } else {
            this.logger.warn(`engine.patch: updater 返回了非法类型（${typeof R}），已忽略`);
            return this;
        }
        this.scheduler.flushAll();
        this.emit("engine/patch/after", { selector });
        return this;
    }

    /**
     * 遍历 scopes 查找 `scope.el === el` 的 scope。
     *
     * engine.scopes 以 WeakRef 为 key，无法直接 get(el)，只能遍历 values 做 deref 比较（O(n)）。
     * 低频 API（engine.data / 块消费编译），O(n) 可接受。
     *
     * 公开供 Runtime 指令（如 x-loading）消费 x-component 时取得宿主 scope 作组件编译的 parentScope
     * （Runtime 指令无 binding，需经 el 反查）。Compile/Hybrid 指令直接用 `this.binding`。
     * 亦用于 `engine.getComponent` 的全局组件兜底（`scope.getComponent` 到顶委托 `engine._resolveGlobalComponent`）。
     */
    findScopeByEl(el: HTMLElement): AutoTemplateScope | undefined {
        for (const scope of this.scopes.values()) {
            if (scope.el === el) return scope;
        }
        return undefined;
    }

    /**
     * 注册组件定义（ADR-0022 决策二-1）。compiler `_collectComponent` 建好 def 后调用，以快照根为 key 存入。
     */
    registerComponentDef(def: ComponentDef): void {
        this._componentDefs.set(def.snapshot, def);
    }

    /**
     * 经组件冻结快照根反查组件定义（ADR-0022）。
     *
     * `getComponent(name)` 返回 HTMLElement 快照（保持 x-loading 等消费者契约不变）；x-use 实例化时
     * 经快照反查本方法取 def（setup/hooks/styles/parent/components）以注入组件语义。
     * 局部组件经 `_componentDefs`（WeakMap）；全局组件经 `_globalComponentDefCache`。
     */
    getComponentDef(snapshot: HTMLElement): ComponentDef | undefined {
        return this._componentDefs.get(snapshot);
    }

    /**
     * 取全局组件定义（ADR-0022 决策二-1）。`_resolveGlobalComponent` 预编译时同步建 def 并缓存。
     * 供 x-use 实例化全局组件时取 setup/hooks/styles。
     */
    getGlobalComponentDef(name: string): ComponentDef | undefined {
        return this._globalComponentDefCache.get(name) ?? undefined;
    }

    /**
     * 从远程 url 加载组件定义并注册（ADR-0022 决策六，供 x-import）。
     *
     * - fetch url（经 `fetchHtml`，复用 x-slot fetch 逻辑）→ 解析 HTML 得 `<div x-component>` 顶级元素；
     * - 按 url 缓存解析结果（重复引用免重复 fetch）；循环 import 检测（url 在途 → warn + 中断）；
     * - 各 x-component 元素经 `buildComponentDef` 提取 `<script setup>`/`<style>` + 组装 def；
     * - 注册：global=true → 全局（`options.components` 懒预编译路径，写入 options + 清缓存让其重解析）；
     *   global=false → 作用域（挂 ownerScope.components）；
     * - 注册后广播 `component/registered`，供 pending 的 x-use 重新实例化；
     * - 失败 warn + 视为未注册（不阻断其余组件）。
     *
     * @param url        远程组件 HTML url
     * @param ownerScope 作用域注册的目标 scope（global=false 时挂此；global=true 时忽略）
     * @param global     是否注册为全局组件（.global 修饰符）
     * @returns 已注册的组件名数组（空数组=无组件/失败）
     */
    async importComponentsFromUrl(
        url: string,
        ownerScope: AutoTemplateScope | null,
        global: boolean,
    ): Promise<string[]> {
        // 循环 import 检测（决策六-4）
        if (this._importingUrls.has(url)) {
            this.logger.warn(`x-import: 检测到循环引用 "${url}"，已中断该导入链。`);
            return [];
        }
        // url 缓存命中：直接复用解析结果
        let elements: HTMLElement[];
        if (this._importUrlCache.has(url)) {
            elements = this._importUrlCache.get(url)!;
        } else {
            this._importingUrls.add(url);
            let html: string;
            try {
                html = await fetchHtml(url);
            } catch (e: any) {
                this.logger.warn(`x-import: 加载 "${url}" 失败: ${e?.message ?? e}`);
                this._importingUrls.delete(url);
                return [];
            }
            this._importingUrls.delete(url);
            const frag = parseHtmlFragment(html);
            if (!frag) {
                this.logger.warn(`x-import: "${url}" 解析为空，无组件可注册。`);
                return [];
            }
            elements = Array.from(frag.children).filter(
                (n): n is HTMLElement => n instanceof HTMLElement && n.hasAttribute("x-component"),
            );
            this._importUrlCache.set(url, elements);
        }
        // 注册各组件
        const registered: string[] = [];
        for (const el of elements) {
            const name = (el.getAttribute("x-component") ?? "").trim() || "default";
            const def = buildComponentDef(el, name, (msg) => this.logger.warn(msg));
            this.registerComponentDef(def);
            if (global) {
                // 全局：写入 options.components（字符串形态），清全局缓存让其重新懒预编译
                // 注：def.snapshot 是剥离了 script/style 的洁净 DOM，序列化为 HTML 存入 options
                if (!this.options.components) this.options.components = {};
                this.options.components[name] = def.snapshot.outerHTML;
                this._globalComponentCache.delete(name);
                this._globalComponentDefCache.set(name, def);
            } else if (ownerScope) {
                // 作用域：挂 ownerScope.components
                if (!ownerScope.components) ownerScope.components = {};
                ownerScope.components[name] = def.snapshot;
            }
            registered.push(name);
            this.emit("component/registered", { name, global });
        }
        return registered;
    }

    /**
     * patch 替换自身：用 `templateNodes` 替换 T（模板侧 + 运行侧），destroy 旧 scope、编译新节点。
     *
     * 顺序（经评审验证）：① 模板侧先 replaceWith（新节点进 engine.template，`compileElement` 的
     * `_linkParent` 能沿新祖先链找到父 scope）→ ② destroy 旧 scope（watcher 立即 off，降低新旧
     * scope 瞬时重叠）→ ③ 编译 templateNodes 建新 scope → ④ 运行侧 replaceWith。
     *
     * @param scope         T 对应的旧 scope
     * @param T             模板侧被替换元素
     * @param el            运行侧被替换元素（scope.el）
     * @param templateNodes 替换 T 的新模板节点（来自 parseHtmlFragment 或 updater 返回的 Node）
     */
    private _replaceSelf(
        scope: AutoTemplateScope,
        T: HTMLElement,
        el: HTMLElement,
        templateNodes: Node[],
    ) {
        // ① 模板侧先替换：templateNodes 进 engine.template，后续 _linkParent 沿新祖先链生效
        T.replaceWith(...templateNodes);
        // ② destroy 旧 scope（从 parent.children 移除 + 递归 off watcher + 指令 destroy）
        scope.destroy();
        // ③ 编译新节点建新 scope（HTMLElement 走 transformElement 递归 + 文本插值）
        let runtimeNodes: Node[];
        try {
            runtimeNodes = this.compiler.compileChildNodes(templateNodes, scope.parent);
        } catch (e: any) {
            this.logger.error(
                `engine.patch 编译失败，模板已变更但运行树可能未同步: ${e?.message ?? e}`,
            );
            return;
        }
        // ④ 运行侧替换；dispatcher 检测 add → runtime 指令 mounted（自动）
        el.replaceWith(...runtimeNodes);
    }

    /**
     * patch 删除自身：destroy scope + 模板/运行双侧移除（`null` 与空串共用同一路径）。
     *
     * dispatcher 检测 el remove → runtime 指令 unmounted（自动）。
     */
    private _deleteSelf(scope: AutoTemplateScope, T: HTMLElement, el: HTMLElement) {
        scope.destroy();
        T.remove();
        el.remove();
    }

    /**
     * 动态区域判定：T 自身或祖先链上有 ownsChildren 结构指令（x-for / eager x-if / x-slot）。
     *
     * 这些区域的运行侧结构由指令运行时生成，与模板非同构，正向桥不可靠——patch 落入即拒绝。
     * 沿 templateScopeMap 上溯，O(树深)。
     */
    private _isInDynamicRegion(T: HTMLElement): boolean {
        let p: HTMLElement | null = T;
        while (p) {
            const scope = this.compiler.getScopeByTemplate(p);
            if (scope && this.compiler.scopeOwnsChildren(scope)) return true;
            p = p.parentElement;
        }
        return false;
    }

    /**
     * 彻底销毁引擎：清空调度队列、销毁所有 scope（off watcher + 删 computed）、
     * 移除挂载 DOM。
     *
     * **store 销毁纪律（ADR-0009 决策 2）**：仅当 engine 自建 store（第二参为裸状态、`_ownsStore=true`）
     * 才调 `store.destroy()` 回收其 computedObjects / 事件订阅 / Proxy 等 core 资源；
     * 外部传入的 store 是共享资源，**绝不销毁**（否则解绑用户在别处挂的订阅、清空其 computed 对象）。
     */
    destroy(): void {
        this.emit("engine/destroy/before");
        // 类级销毁：对所有已 initialize 的指令类调用 static dispose(engine)。
        this.directives.disposeAll();
        // 断开 runtime 共享 observer + 卸载全部 live 实例（先于 DOM 清理，避免拆 DOM 时空转回调）
        this.dispatcher.dispose();
        this.scheduler.clear();
        for (const scope of this.scopes.values()) {
            scope.destroy();
        }
        this.scopes.clear();
        this.el.replaceChildren();
        this.pending = false;
        // 仅自建 store（裸状态路径）才销毁；外部 store 是共享资源，绝不销毁（ADR-0009 决策 2）
        if (this._ownsStore) {
            this.store.destroy();
        }
        this.emit("engine/destroy/after");
    }
}

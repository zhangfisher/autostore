import type { AutoTemplateEngineEvents, AutoTemplateEngineOptions } from "./types";
import { DirectiveManager } from "./directives/manager";
import { AutoTemplateCompiler } from "./compile/compiler";
import { AutoStore, FastEvent } from "autostore";
import type { AutoTemplateScope } from "./scope";
import { UpdateScheduler } from "./scheduler";
import { RuntimeObserverDispatcher } from "./directives/runtime/dispatcher";
import { parseHtmlFragment } from "./utils/transformElement";

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
    /** 外部传入的响应式数据源（引擎不创建、销毁时也不碰） */
    readonly store: AutoStore<State>;

    /**
     * 重写基类 accessor：基类 options 是 getter，子类不得用实例属性遮蔽（TS2610），
     * 故以 getter 重写，返回合并类型（协变兼容基类 FastLiteEventOptions）。
     * 构造完成前 _fullOptions 未就绪时回退 super.options，规避基类构造期虚分派读到 undefined。
     */
    override get options(): AutoTemplateEngineOptions {
        return super.options as AutoTemplateEngineOptions;
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
     * 作为 scope 聚合视图（getScopeContext）的根 fallback、模板表达式求值的最终数据源。
     */
    get state() {
        return this.store.state;
    }
    /** 是否已编译并挂载 */
    private pending = false;

    /**
     * @param el       挂载根元素（必须是 HTMLElement）
     * @param store    外部 AutoStore 实例（响应式数据源）
     * @param options  配置选项
     * @throws {Error} el 非 HTMLElement / store 非 AutoStore 实例
     */
    constructor(el: HTMLElement, store: AutoStore<State>, options?: Partial<AutoTemplateEngineOptions>) {
        super({ autostart: true, debug: false, actions: {}, ...options });
        if (!(el instanceof HTMLElement)) {
            throw new Error("Root element must be an HTMLElement");
        }
        if (!store || !(store instanceof AutoStore)) {
            throw new Error("store must be an AutoStore instance");
        }
        this.el = el;
        this.store = store;
        // 注入框架保留键 _scopes（x-data 私有响应式域容器）；1 engine 1 store 约定下由 engine 负责
        this._ensureScopesState();
        // 注册时自动包装：构造时传入的 options.actions 一次性包装
        // （运行时 `engine.actions[name] = fn` 经 actions Proxy 的 set trap 包装、
        // `<script type="actions">` 经 compiler 包装，三入口统一走 buildAction）
        const _initActions = this.options.actions!;
        for (const _k of Object.keys(_initActions)) {
            if (typeof _initActions[_k] === "function") {
                _initActions[_k] = this.buildAction(_k, _initActions[_k] as any) as any;
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

    /** actions 代理（set 时自动 buildAction 包装，懒构造） */
    private _actionsProxy: Record<string, (...args: any[]) => any> | null = null;

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
                t[key] = typeof value === "function" ? (this.buildAction(key, value) as any) : value;
                return true;
            },
        });
        return this._actionsProxy;
    }

    /**
     * 把一个 action 包装为**广播生命周期事件**的版本。
     *
     * 仅当 action 返回 thenable（Promise）时广播 `actions/<name>/{pending,resolved,rejected}`；
     * 同步 action（含同步抛错）行为完全不变（透传给 x-on 求值器的现有 try/catch）。
     *
     * **命名**：action 函数名入事件路径（每个 action 独立命名空间），payload 亦带 name 方便通配订阅。
     * 通配订阅（见 types 的 action 通配契约）可抓任意 action 的开始 / 成功 / 失败：全局 loading、错误 toast。
     *
     * **注册时自动包装**（一般无需手动调用）：`engine.actions[name] = fn`（Proxy set）、
     * `<script type="actions">` 提取（compiler）、构造时 `options.actions`（构造函数扫描）三入口
     * 均自动调用本方法。包装后的函数被 x-on 调用时 `this` 仍为 OnEvalContext（透传 this 与 args）。
     *
     * **reject 处理**：async reject 经内部 `then(_, onRejected)` 消费并广播 `rejected`，故经 x-on
     * 触发的 async action **不再产生 unhandled rejection**；直接 `await engine.actions[name]()`
     * 的调用者仍会收到 reject（原 Promise 状态不变）。
     *
     * **防双重包装**：已包装的函数（`__buildActionWrapped` 标记）直接返回，避免三入口重叠时
     * `buildAction(buildAction(fn))` 双重广播。
     *
     * @param name   action 函数名（入事件路径 `actions/<name>/...` + payload.name）
     * @param action 原始 action 函数（this/args 透传）
     * @returns 包装后的函数（同签名）
     */
    buildAction<A extends (...args: any[]) => any>(name: string, action: A): A {
        if ((action as any).__buildActionWrapped) return action;
        const engine = this;
        const wrapped = function (this: unknown, ...args: Parameters<A>) {
            const result = action.apply(this, args);
            // 仅 thenable 才进入生命周期广播（同步 action 无生命周期意义，原样返回）
            if (result && typeof (result as any).then === "function") {
                engine.emit(`actions/${name}/pending` as any, { name });
                (result as Promise<any>).then(
                    (value) => engine.emit(`actions/${name}/resolved` as any, { name, result: value }),
                    (error) => engine.emit(`actions/${name}/rejected` as any, { name, error }),
                );
            }
            return result;
        } as A;
        (wrapped as any).__buildActionWrapped = true;
        return wrapped;
    }

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
     * - **scope 已有 dataScope**（模板有 x-data）→ `Object.assign` 合并，路径订阅自动驱动更新
     *   （主路径，不动 DOM、不重订阅）。
     * - **scope 无 dataScope**（el 原无 x-data）→ 新建 dataScope + 失效本 scope 视图 + destroy 子树 +
     *   重新编译子树（A 方案：子树 DOM 重建）。因 watcher 的 `collectDependencies` 仅 created 跑一次，
     *   不覆盖新出现的 dataScope，只能重建让子树重新订阅。
     *
     * 不支持 global 模式（x-data.global 仍由模板属性驱动；运行时改全局请直接操作 `store.state`）。
     *
     * @param el   渲染后的元素（须为 engine 注册的 scope.el）
     * @param data 要合并的普通对象（合并语义：只增改、不删已有键）
     */
    data(el: HTMLElement, data: Record<string, any>) {
        const scope = this._findScopeByEl(el);
        if (!scope) {
            this.logger.warn(`engine.data: 元素未找到对应 scope，已忽略`);
            return;
        }
        if (scope.dataScope) {
            // 主路径：合并 → 路径订阅自动驱动
            Object.assign(scope.dataScope as Record<string, any>, data);
            this.emit("scope/data-updated", { id: scope.id, data });
            return;
        }
        // 无 dataScope（el 原无 x-data）：新建 + 重建子树（A）
        const scopes = (this.store.state as Record<string, any>)[SCOPES_KEY] as Record<string, any>;
        if (!scopes[scope.id]) scopes[scope.id] = {};
        scope.dataScope = scopes[scope.id];
        Object.assign(scope.dataScope as Record<string, any>, data);
        // 失效本 scope 缓存视图（含新 dataScope 层），子树重建后新子 scope 经 parent 链取到新视图
        scope.invalidateScopeView();
        this._recompileSubtree(scope, el);
        this.emit("scope/data-updated", { id: scope.id, data });
    }

    /**
     * 动态 patch：修改模板片段并增量同步到运行树（ADR-0002）。
     *
     * 开发者在 `updater` 回调里就地修改 `engine.template` 的某个 scope 子树（回调入参即命中的
     * 模板元素），本方法据 `updater` 返回值决定重建范围，**只动 patch 目标子树，保留其余运行态**
     * （焦点/滚动/未提交输入）。selector 对 `engine.template` querySelector；命中须为 scope
     * （含指令或 `{{}}` 插值的元素；纯静态裸元素需挂 `x-patch` 哨兵）。
     *
     * **返回四态**（判定用 `===`/`typeof`，`undefined != null` 严格区分）：
     * - `void`/`undefined` 或 `=== templateEl` → **子树重建**（复用 `_recompileSubtree`）
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
    patch(selector: string, updater: (templateEl: HTMLElement) => Node | string | null | undefined): this {
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
            this.logger.warn(`engine.patch: "${selector}" 非 scope 元素（无指令/插值），需挂 x-patch`);
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
            this._recompileSubtree(scope, el);
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
     * engine.data 是低频 API，O(n) 可接受。
     */
    private _findScopeByEl(el: HTMLElement): AutoTemplateScope | undefined {
        for (const scope of this.scopes.values()) {
            if (scope.el === el) return scope;
        }
        return undefined;
    }

    /**
     * 重建 scope 的子树（A 方案：DOM 重建）。
     *
     * 销毁旧子 scope（off watcher + 递归）→ 清空 el 子 DOM → 用 `scope.template` 重新编译子节点
     * （建新 scope + created 订阅 + compile 首渲）。用于 `engine.data` 在"dataScope 从无到有"后，
     * 让子树 watcher 重新 `collectDependencies`（订阅新 dataScope 路径）。
     */
    private _recompileSubtree(scope: AutoTemplateScope, el: HTMLElement) {
        // 1. 销毁旧子 scope（递归 off watcher；destroy 不删 DOM，下面统一清）
        for (const child of scope.children) child.destroy();
        scope.children.clear();
        // 2. 清空 el 的子 DOM（旧渲染节点）
        el.replaceChildren();
        // 3. 用原始模板重新编译子节点挂到 el（建新 scope + created 订阅 + compile 首渲）
        const template = scope.template;
        if (template) {
            this.compiler.compileSubtree(el, template, scope);
            // 消化编译期 schedule 的首次渲染（如嵌套 x-for）
            this.scheduler.flushAll();
        }
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
    private _replaceSelf(scope: AutoTemplateScope, T: HTMLElement, el: HTMLElement, templateNodes: Node[]) {
        // ① 模板侧先替换：templateNodes 进 engine.template，后续 _linkParent 沿新祖先链生效
        T.replaceWith(...templateNodes);
        // ② destroy 旧 scope（从 parent.children 移除 + 递归 off watcher + 指令 destroy）
        scope.destroy();
        // ③ 编译新节点建新 scope（HTMLElement 走 transformElement 递归 + 文本插值）
        let runtimeNodes: Node[];
        try {
            runtimeNodes = this.compiler.compileChildNodes(templateNodes, scope.parent);
        } catch (e: any) {
            this.logger.error(`engine.patch 编译失败，模板已变更但运行树可能未同步: ${e?.message ?? e}`);
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
     * **关键约束**：`store` 为外部共享资源，**绝不调用 `store.destroy()`**，
     * 否则会解绑用户在别处挂的订阅、清空其 computed 对象。
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
        this.emit("engine/destroy/after");
    }
}

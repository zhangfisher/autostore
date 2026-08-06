import type { AutoTemplateEngineEvents, AutoTemplateEngineOptions } from "./types";
import { DirectiveManager } from "./directives/manager";
import { AutoTemplateCompiler } from "./compile/compiler";
import { AutoStore, FastEvent } from "autostore";
import type { AutoTemplateScope } from "./scope";
import { UpdateScheduler } from "./scheduler";

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
    private started = false;

    /**
     * @param el       挂载根元素（必须是 HTMLElement）
     * @param store    外部 AutoStore 实例（响应式数据源）
     * @param options  配置选项
     * @throws {Error} el 非 HTMLElement / store 非 AutoStore 实例
     */
    constructor(el: HTMLElement, store: AutoStore<State>, options?: AutoTemplateEngineOptions) {
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
        this.template = el.cloneNode(true) as HTMLElement;

        this.scheduler = new UpdateScheduler();
        this.compiler = new AutoTemplateCompiler(this);
        this.directives = new DirectiveManager(this);
        if (this.options.autostart) {
            this.compile();
        }
        // 类级初始化：对所有注册指令类（不分 kind）调用 static initialize(engine)。
        // 须在 autostart compile 之后——runtime 指令的 initialize 会扫描已挂载的编译产物建 observer、
        // 注入全局样式等。autostart=false 时编译产物尚未挂载，observer 连接后由 start() 的
        // replaceChildren 触发 add 回调，照样生效。
        this.directives.initializeAll();
    }

    get logger() {
        return this.store.logger;
    }

    /**
     * 全局事件 action 表（来自 options.actions），作为 scope.getAction 查找链的终点。
     */
    get actions(): Record<string, (...args: any[]) => any> {
        return this.options.actions!;
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
        const root = this.compiler.compile();
        // 挂载编译产物的子节点（而非 root 本身）：engine.template 是 el 的深克隆（含外层容器），
        // 编译后的 root 是该容器的重建；取其子节点挂回 el，避免容器内多套一层容器克隆。
        this.el.replaceChildren(...Array.from(root.childNodes));
        this.started = true;
        // 同步消化编译期排队的首次渲染：某些指令（如 x-for）的首次渲染依赖元素已挂载，
        // 在 created 中只能 schedule 到 microtask；此处 el 已挂载，立即 flush 使初始 DOM 同步可见。
        // 用 flushAll 持续消化 x-for 嵌套带来的级联首次渲染，使 mount 返回时各层级 DOM 均已就绪。
        this.scheduler.flushAll();
        return this;
    }

    /**
     * 启动引擎：尚未编译时编译挂载；已启动则幂等返回。
     */
    start() {
        if (!this.started) {
            this.compile();
        }
        return this;
    }

    /**
     * 停止引擎：移除挂载的 DOM 并标记停止（不销毁订阅，可再次 `start`）。
     */
    stop() {
        this.el.replaceChildren();
        this.started = false;
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
            this.compiler.compileSubtree(el, template);
            // 消化编译期 schedule 的首次渲染（如嵌套 x-for）
            this.scheduler.flushAll();
        }
    }

    /**
     * 彻底销毁引擎：清空调度队列、销毁所有 scope（off watcher + 删 computed）、
     * 移除挂载 DOM。
     *
     * **关键约束**：`store` 为外部共享资源，**绝不调用 `store.destroy()`**，
     * 否则会解绑用户在别处挂的订阅、清空其 computed 对象。
     */
    destroy(): void {
        // 类级销毁：对所有已 initialize 的指令类调用 static dispose(engine)——断开 runtime 指令的
        // observer、销毁全部 live 实例。先于 scope/DOM 清理，避免 observer 在 DOM 拆除期间空转回调。
        this.directives.disposeAll();
        this.scheduler.clear();
        for (const scope of this.scopes.values()) {
            scope.destroy();
        }
        this.scopes.clear();
        this.el.replaceChildren();
        this.started = false;
    }
}

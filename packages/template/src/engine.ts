import type { AutoTemplateEngineOptions } from "./types";
import { DirectiveManager } from "./directives/manager";
import { AutoTemplateCompiler } from "./compile/compiler";
import { AutoStore } from "autostore";
import type { AutoTemplateScope } from "./scope";
import { createStackedContext } from "./context";
import { UpdateScheduler } from "./scheduler";

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
export class AutoTemplateEngine<State extends Record<string, any> = Record<string, any>> {
    /** 挂载容器（编译产物替换其子节点，容器本身保留） */
    readonly el: HTMLElement;
    /** 外部传入的响应式数据源（引擎不创建、销毁时也不碰） */
    readonly store: AutoStore<State>;
    readonly options: Required<AutoTemplateEngineOptions>;
    readonly compiler: AutoTemplateCompiler;
    readonly directives: DirectiveManager;
    /** 微任务更新调度器（同 tick 多次变更合并为一次 patch） */
    readonly scheduler: UpdateScheduler;
    /** 原始模板（深克隆根元素，保留指令属性作为编译只读输入） */
    readonly template: HTMLElement;
    /** 每个渲染元素对应的 Scope（销毁时遍历清理其 watcher） */
    readonly scopes = new Map<WeakRef<Node>, AutoTemplateScope>();
    /** 编译期作用域栈聚合视图（含 `$push/$pop` 供 x-for 注入局部作用域） */
    readonly context;
    /** 是否已编译并挂载 */
    private started = false;

    /**
     * @param el       挂载根元素（必须是 HTMLElement）
     * @param store    外部 AutoStore 实例（响应式数据源）
     * @param options  配置选项
     * @throws {Error} el 非 HTMLElement / store 非 AutoStore 实例
     */
    constructor(el: HTMLElement, store: AutoStore<State>, options?: AutoTemplateEngineOptions) {
        if (!(el instanceof HTMLElement)) {
            throw new Error("Root element must be an HTMLElement");
        }
        if (!store || !(store instanceof AutoStore)) {
            throw new Error("store must be an AutoStore instance");
        }
        this.el = el;
        this.store = store;
        this.template = el.cloneNode(true) as HTMLElement;
        this.options = Object.assign({ autostart: true, debug: false }, options) as Required<
            AutoTemplateEngineOptions
        >;
        this.scheduler = new UpdateScheduler();
        this.compiler = new AutoTemplateCompiler(this);
        this.directives = new DirectiveManager(this);
        this.context = createStackedContext(this.store);
        if (this.options.autostart) {
            this.compile();
        }
    }

    get logger() {
        return this.store.logger;
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
     * 彻底销毁引擎：清空调度队列、销毁所有 scope（off watcher + 删 computed）、
     * 移除挂载 DOM。
     *
     * **关键约束**：`store` 为外部共享资源，**绝不调用 `store.destroy()`**，
     * 否则会解绑用户在别处挂的订阅、清空其 computed 对象。
     */
    destroy(): void {
        this.scheduler.clear();
        for (const scope of this.scopes.values()) {
            scope.destroy();
        }
        this.scopes.clear();
        this.el.replaceChildren();
        this.started = false;
    }
}

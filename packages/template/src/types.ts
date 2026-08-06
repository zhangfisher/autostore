import type { AutoStore, FastEvent } from "autostore";

/**
 * AutoStore 任意类型
 */
export type AnyAutoStore = AutoStore<any, any>;

/**
 * 指令接口
 *
 * 所有指令必须实现此接口，提供名称、优先级和生命周期方法。
 */
export interface Directive {
    /**
     * 指令名称
     *
     * @example 'text', 'html', 'if', 'for'
     */
    name: string;

    /**
     * 执行优先级
     *
     * 数字越大优先级越高，执行顺序越靠前。
     *
     * 典型优先级顺序：
     * - x-for: 100 (最高，需要先创建子元素)
     * - x-if: 80 (高，需要先决定是否渲染)
     * - x-bind, x-on: 50 (中)
     * - x-text, x-html, x-visible: 20 (低)
     */
    priority: number;

    /**
     * 初始化方法
     *
     * 当指令首次绑定到元素时调用。
     *
     * @param el - 绑定的 DOM 元素
     * @param binding - 指令绑定信息
     * @param store - AutoStore 实例
     * @returns 清理函数，可选的，用于在元素移除或指令销毁时清理资源
     */
    init(el: HTMLElement, binding: DirectiveBinding, store: AnyAutoStore): void | (() => void);

    /**
     * 更新方法（可选）
     *
     * 当依赖的状态变化时调用。
     * 如果指令不需要动态更新，可以不实现此方法。
     *
     * @param el - 绑定的 DOM 元素
     * @param binding - 指令绑定信息
     * @param store - AutoStore 实例
     */
    update?(el: HTMLElement, binding: DirectiveBinding, store: AnyAutoStore): void;

    /**
     * 销毁方法（可选）
     *
     * 当元素从 DOM 中移除或引擎销毁时调用。
     * 用于清理定时器、事件监听器等资源。
     *
     * @param el - 绑定的 DOM 元素
     */
    destroy?(el: HTMLElement): void;
}

/**
 * 指令绑定信息
 *
 * 包含指令在元素上的所有绑定数据。
 */
export interface DirectiveBinding {
    /**
     * 指令名称
     *
     * @example 'text', 'html', 'if'
     */
    directive: string;

    /**
     * 表达式字符串
     */
    expression: string;

    /**
     * 绑定的 DOM 元素
     */
    element: HTMLElement;
}

/**
 * 渲染选项
 *
 * 传递给 AutoTemplate 构造函数的配置选项。
 */
export interface AutoTemplateEngineOptions extends FastEvent.FastLiteEventOptions {
    /**
     * 是否启用调试模式
     *
     * @default false
     */
    debug?: boolean;
    /**
     *
     * 初始化时马上是否开始编译模板并生效
     *
     * true: 马上编译模板并生效
     * false: 需要后续调用compile方法进行编译
     */
    autostart?: boolean;
    /**
     * 全局事件 action 函数表。
     *
     * `@click="name"` / `@click="name(args)"` 命中时，以 OnEvalContext 为 this 调用。
     * 作为 scope.getAction 查找链的终点；模板内 `<script type="js/actions">` 注入的
     * 局部 action 优先级更高（沿 scope parent 链先命中）。
     *
     * @default {}
     */
    actions?: Record<string, (...args: any[]) => any>;
    /**
     * 自定义 HTML 消毒器（x-html 默认消费，见 ADR-0005 决策 4）。
     *
     * 默认为内置极简 `sanitizeHtml`（剥 `<script>` / `on*` 事件属性 / 危险协议 URL，
     * 非无懈可击——mutation XSS / foreign content 等边角向量不在覆盖范围）。
     * 高安全场景注入 DOMPurify：
     * `new AutoTemplateEngine(el, store, { sanitizer: DOMPurify.sanitize })`。
     * x-html 的 `.raw` 修饰符会整体跳过此 sanitizer（原样写入 innerHTML）。
     *
     * @default 内置极简 sanitizeHtml（utils/sanitize.ts）
     */
    sanitizer?: (html: string) => string;
}

/**
 * AutoTemplateEngine 事件契约（信号面，见 ADR-0003）。
 *
 * 分层命名（`/` 分隔）+ 通配符订阅：消费者可精确订阅，亦可经 `*`/`**` 订阅一批同类。
 * 事件只承载**离散信号**——值留 `store.state`（数据面），控制流留命令调用（控制面）。
 *
 * emit 一律经 `engine.broadcast()`（listenerCount 短路，无订阅≈零成本）。
 */
export interface AutoTemplateEngineEvents {
    // ── engine/** 引擎生命周期 ──────────────────────────────
    /** 引擎初始化完成（retain：晚订阅者补拿） */
    "engine/ready": { el: HTMLElement };
    /** 编译前（payload.cancel 可被监听者置 true 否决） */
    "engine/compile/before": { root: HTMLElement; cancel?: boolean };
    /** 编译后 */
    "engine/compile/after": { root: HTMLElement };
    /** 销毁前 */
    "engine/destroy/before": void;
    /** 销毁后 */
    "engine/destroy/after": void;

    // ── scope/** scope 通道生命周期（id = scope.id，按 payload 过滤） ──
    /** scope 创建 */
    "scope/created": { id: number; el: HTMLElement; template: HTMLElement };
    /** scope 编译完成（全部指令 created+compile 跑完） */
    "scope/compiled": { id: number };
    /** scope 销毁 */
    "scope/destroyed": { id: number };
    /** engine.data() 更新了某 scope 的数据 */
    "scope/data-updated": { id: number; data: Record<string, any> };

    // ── directive/** 指令生命周期（<name> 占位，跨主体通配） ──
    // scope 通道（Compile/Hybrid）：带 scope.id
    /** 指令 created（scope 通道） */
    "directive/*/created": { name: string; id: number };
    /** 指令 compile（scope 通道） */
    "directive/*/compiled": { name: string; id: number };
    /** 指令 destroy（scope 通道） */
    "directive/*/destroyed": { name: string; id: number };
    // observer 通道（Runtime/Hybrid）：带 el，无 scope.id
    /** 指令 mounted（observer 通道） */
    "directive/*/mounted": { name: string; el: HTMLElement };
    /** 指令 unmounted（observer 通道） */
    "directive/*/unmounted": { name: string; el: HTMLElement };
    /** 指令属性值变化（observer 通道） */
    "directive/*/attr-changed": { name: string; el: HTMLElement; newVal: string; oldVal?: string };

    // ── patch/** 动态 patch（ADR-0002，本期占位） ──────────
    /** patch 前 */
    "patch/before": { id: number; templateEl: HTMLElement };
    /** patch 后 */
    "patch/after": { id: number };

    // ── render/** 调度 flush（热路径，broadcast 门控） ──────
    /** flush 前 */
    "render/flush/before": void;
    /** flush 后 */
    "render/flush/after": void;
}

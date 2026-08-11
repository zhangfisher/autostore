/**
 * x-on 事件指令的类型契约。
 *
 * 修饰符统一为 descriptor：`{ name, type, apply }`，`type` 作判别字段区分三种本质不同的形状：
 * - **option**: 合并进 `addEventListener` 第 3 参（once/capture/passive）
 * - **guard**:  handler 内判断事件，返回 false 阻止业务（self/ctrl/按键/鼠标/exact）
 * - **wrapper**: 包装 handler（debounce）
 *
 * OnDirective 主逻辑据 `type` 分派：option 合并 options、guard 组成 AND 链、wrapper 由外向内包裹。
 */

import type { AnyAutoStore } from "autostore";
import type { AutoTemplateScope } from "../../../scope";

/** addEventListener 第 3 参的子集（option 类修饰符可产出的字段） */
export type EventListenerOptionsSubset = Pick<
    AddEventListenerOptions,
    "once" | "capture" | "passive"
>;

/**
 * 修饰符运行时上下文（apply 入参）。
 */
export interface ModifierRuntime {
    /** 触发元素（供 self 等需元素引用的守卫） */
    el: HTMLElement;
    /** 本修饰符段名（对应 options 的键），如 "debounce" / "ctrl" */
    name: string;
    /**
     * 当前指令的完整选项（含解析期注入的 modifier 开关，ADR-0007）。
     * 供 exact 判断"声明的系统键"（options 键集合）、debounce 取时长（options.debounce）等。
     */
    options: Record<string, any>;
    /** 事件名（attr，如 "click" / "keydown"），供 left/right 按事件类型分派 */
    event: string;
}

/** wrapper 清理句柄：destroy 时调用 cancel 清理资源（如 debounce timer） */
export interface CleanupHandle {
    cancel?: () => void;
}

/** option 类修饰符：返回合并进 addEventListener 第 3 参的字段 */
export type OptionModifierDesc = {
    name: string;
    type: "option";
    apply: (rt: ModifierRuntime) => EventListenerOptionsSubset;
};

/** guard 类修饰符：返回 false 阻止业务 handler；true/undefined 放行 */
export type GuardModifierDesc = {
    name: string;
    type: "guard";
    apply: (event: Event, rt: ModifierRuntime) => boolean;
};

/** wrapper 类修饰符：包装 next 返回新 handler；可写 cleanup.cancel 注册清理。
 *
 * `next` 与返回的 handler 均可返回任意值（`any`）——管道透传 business 的返回值，供依赖它的
 * wrapper（如 `.feedback` 捕获 async action 的 Promise）使用。`order`（默认 0，越大越内层）
 * 控制 wrapper 包裹顺序：OnDirective 按 order **降序** apply（大者先 apply、居内层，更靠近
 * business），依赖返回值的 wrapper 声明大 order 固定最内层。见 ADR-0008。 */
export type WrapperModifierDesc = {
    name: string;
    type: "wrapper";
    /** 包裹顺序（默认 0，越大越靠近 business 内层）；.feedback 声明 Infinity 固定最内层以拿原始返回值 */
    order?: number;
    apply: (
        next: (event: Event) => any,
        rt: ModifierRuntime,
        cleanup: CleanupHandle,
    ) => (event: Event) => any;
};

/** 修饰符描述符判别联合（按 type 收窄 apply 形状） */
export type ModifierDesc = OptionModifierDesc | GuardModifierDesc | WrapperModifierDesc;

/**
 * Action 求值上下文：作为 action 的 `this`，同时表达式内经 `with(scope)` 可见。
 *
 * 命中 engine.actions 或 scope 局部 action 时，以本对象为 `this` 调用；
 * `$event` 亦作为表达式求值器的形参注入。
 */
export interface AutoTemplateActionContext {
    /** 触发元素 */
    el: HTMLElement;
    /** 原生事件对象 */
    $event: Event;
    /**
     * 数据聚合视图（scope.getScopeContext()）：localScope + dataScope + 全局 state 拍平的视图。
     * **可读可写**：读 `this.data.xxx` 取所有可见数据；写 x-data 字段经 set 陷阱透传到响应式
     * dataScope（= store.state._scopes[id]，触发细粒度更新）。localScope 为普通对象，写入不响应式。
     */
    data: any;
    /**
     * 当前 AutoTemplateScope 实例：提供 `dataScope` / `getDataScope()` / `engine` / `parent` 等，
     * 供 action 做深层访问与写入（区别于只读的 `data` 聚合视图）。
     */
    scope: AutoTemplateScope;
    /** AutoStore 实例 */
    store: AnyAutoStore;
    state: Record<string, any>;
    /** 引擎实例 */
    engine: any;
    /**
     * 指令配置的只读聚合视图（createDirectiveOptions 代理，ADR-0007）。
     *
     * 读取时按两层 fallback：指令选项（含解析期注入的 modifier 开关）→ 宿主选项（x-options）。
     * action 经 `this.$options.xxx` 读取配置；只读，写入静默失败（配置静态）。
     */
    $options: Record<string, any>;
}

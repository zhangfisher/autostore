import type { AutoStore } from "autostore";

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
export interface AutoTemplateEngineOptions {
    /**
     * 是否启用调试模式
     *
     * @default false
     */
    debug?: boolean;
}

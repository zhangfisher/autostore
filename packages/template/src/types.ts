import type { AutoStore } from '@autostorejs/core';

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
  init(
    el: HTMLElement,
    binding: DirectiveBinding,
    store: AutoStore
  ): void | (() => void);

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
  update?(
    el: HTMLElement,
    binding: DirectiveBinding,
    store: AutoStore
  ): void;

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
   *
   * 从 HTML 属性值中提取的原始表达式。
   *
   * @example 'user.name', 'isActive', 'item of items'
   */
  expression: string;

  /**
   * 绑定的 DOM 元素
   */
  element: HTMLElement;

  /**
   * 解析后的表达式
   *
   * 初始为 null，在 Phase 2 表达式系统实现后会被填充。
   * 包含依赖路径和求值函数。
   */
  parsed: ParsedExpression | null;
}

/**
 * 解析后的表达式
 *
 * 在 Phase 2 实现，此处预留接口。
 */
export interface ParsedExpression {
  /**
   * 依赖的状态路径列表
   *
   * @example ['user', 'name'], ['items']
   */
  dependencies: string[];

  /**
   * 求值函数
   *
   * 根据给定的作用域求值表达式。
   *
   * @param scope - 包含状态值的作用域对象
   * @returns 表达式的求值结果
   */
  evaluate(scope: any): any;
}

/**
 * 渲染选项
 *
 * 传递给 AutoTemplate 构造函数的配置选项。
 */
export interface RenderOptions {
  /**
   * 是否启用调试模式
   *
   * 启用后会通过 AutoStore 的 log 方法输出详细的日志信息。
   *
   * @default false
   */
  debug?: boolean;
}

/**
 * AutoStore Template - 响应式模板渲染引擎
 *
 * 专为 AutoStore 状态管理库设计的声明式模板渲染引擎。
 * 提供类似 Alpine.js 的语法糖，通过 HTML 属性指令直接绑定状态到 DOM。
 *
 * @packageDocumentation
 */

// 导出核心类
export { AutoTemplate } from './AutoTemplate';

// 导出类型定义（DEV-01: TypeScript 类型支持）
export type {
  Directive,
  DirectiveBinding,
  ParsedExpression,
  RenderOptions,
} from './types';

// 重新导出指令注册表，用于自定义指令注册
export { DirectiveRegistry } from './DirectiveRegistry';

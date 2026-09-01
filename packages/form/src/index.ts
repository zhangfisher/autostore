import "./widgets";
import "./groups";
export * from "./components";
export * from "./form";
export * from "./groups";
export * from "./field";
export * from "./types";
export * from "./widgets";

// 显式保证各 widget 文件内的 declare module "autostore"（AutoStoreWidgets 键表合并）
// 进入包的类型链：不依赖 d.ts 隐式合并（ADR-0004）
export type { AutoFieldInputOptions } from "./widgets/input";

// 导出 asyncpro 异步计算功能
export { asyncComputed } from '@autostorejs/plugins/asyncpro';
export { AsyncFieldHandler } from './utils/asyncFieldHandler';

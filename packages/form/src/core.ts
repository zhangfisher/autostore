/**
 * core 入口（按需引入的最小前置，ADR-0005）
 *
 * 入口图显式覆盖表单框架的全部公共部分：
 * - form / field / components / groups / types（表单框架与基类）
 * - utils / controllers / registerIcons（widget 重复消费的公共模块与图标库）
 * - widgets/input（唯一隐式默认 widget：schema.widget 未声明时取 input，
 *   属于 core 契约的一部分，不随 core 发货会把静默失败埋给用户）
 *
 * 上述模块经 esbuild code splitting 物理归入 core chunk，
 * widget 入口自动 import-from-core，公共代码全仓单份。
 */
import "./groups";
export * from "./components";
export * from "./form";
export * from "./groups";
export * from "./field";
export * from "./types";
// 图标库注册（文档承诺的公开 API，见 docs/zh/form/guide/icons.md）
export { registerIcons } from "./utils/registerIcons";

// 默认 widget：副作用注册 auto-field-input
import "./widgets/input";

// 显式保证 input 的 declare module "autostore"（AutoStoreWidgets 键表合并）
// 进入包的类型链：不依赖 d.ts 隐式合并（ADR-0004）
export type { AutoFieldInputOptions } from "./widgets/input";

// 导出 asyncpro 异步计算功能
export { asyncComputed } from "@autostorejs/plugins/asyncpro";
export { AsyncFieldHandler } from "./utils/asyncFieldHandler";

// ADR-0006：重导出 autostore 全量 API。
// ./core 出口与 core.global.js（IIFE，捆绑副本）与主入口行为对齐；
// ESM 形态下 autostore 保持 external，不引入第二副本。
export * from "autostore";
// star-star 同名冲突消歧（与 index.ts 同理，form 版本显式优先）
export type { MutableRecord } from "./types";

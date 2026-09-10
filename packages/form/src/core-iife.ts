/**
 * core IIFE 专用入口（仅 tsup 第 3 项使用）
 *
 * 为什么需要独立入口：IIFE 是闭包，bundle 内部的 lit 模块无法被
 * widget IIFE 以全局变量取到。此入口把 lit 系命名空间显式 re-export
 * 到产物 exports 上，tsup 的 globalName 使其以
 * AutoFormCoreExports.litXxx 形式暴露，尾部脚本再汇集到 window.AutoFormCore。
 */
export * from "./core";

// lit 系命名空间（与 scripts/build-widget-iife.ts 的 LIT_GLOBALS 键一一对应）
import * as lit from "lit";
import * as litDecorators from "lit/decorators.js";
import * as litContext from "@lit/context";
import * as litDirectivesRepeat from "lit/directives/repeat.js";
import * as litDirectivesWhen from "lit/directives/when.js";
import * as litDirectivesIfDefined from "lit/directives/if-defined.js";
import * as litDirectivesStyleMap from "lit/directives/style-map.js";
import * as litDirectivesClassMap from "lit/directives/class-map.js";
import * as litDirectivesUnsafeHTML from "lit/directives/unsafe-html.js";

// widget IIFE 消费的包内公共模块（保证与 core 同一份实例）。
// 必须以命名空间形态导出：widget 侧经 esbuild cjs 桥（module.exports = bare）
// 做 interop 属性复制，裸类/函数成员的 named import 会取不到——
// 命名空间的属性复制后成员可达（ADR-0005 潜伏缺陷的修复，见 ADR-0006）
import * as Field from "./field";
import * as FieldDropdown from "./field/dropdown";
import * as UtilsTag from "./utils/tag";
import * as ControllersAsyncState from "./controllers/asyncState";
import * as Controllers from "./controllers";
import * as UtilsRenderWidget from "./utils/renderWidget";
import * as UtilsGetInputValue from "./utils/getInputValue";
import * as FormVars from "./form/vars";

// autostore 运行时命名空间（ADR-0006）：widget IIFE 经
// __core.AutoStoreNS 桥接取用，与 core.global.js 捆绑副本同源
import * as AutoStoreNS from "autostore";

export {
    lit,
    litDecorators,
    litContext,
    litDirectivesRepeat,
    litDirectivesWhen,
    litDirectivesIfDefined,
    litDirectivesStyleMap,
    litDirectivesClassMap,
    litDirectivesUnsafeHTML,
    // AutoField/AutoForm/registerIcons 及 autostore 平铺 API 经 export * from "./core" 已在 exports 上
    Field,
    FieldDropdown,
    UtilsTag,
    ControllersAsyncState,
    Controllers,
    UtilsRenderWidget,
    UtilsGetInputValue,
    FormVars,
    AutoStoreNS,
};

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

// widget IIFE 消费的包内公共模块（保证与 core 同一份实例）
import { AutoDropdownField } from "./field/dropdown";
import { tag } from "./utils/tag";
import { AsyncOptionState } from "./controllers/asyncState";
import * as Controllers from "./controllers";
import { renderWidget } from "./utils/renderWidget";
import { getInputValue } from "./utils/getInputValue";
import { vars } from "./form/vars";

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
    // AutoField/AutoForm/registerIcons 经 export * from "./core" 已在 exports 上
    AutoDropdownField,
    tag,
    AsyncOptionState,
    Controllers,
    renderWidget,
    getInputValue,
    vars,
};

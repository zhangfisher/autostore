export * from "./bind";
export * from "./data";
export * from "./on";
export * from "./for";
export * from "./html";
export * from "./model";
export * from "./switch";
export * from "./table";
export * from "./teleport";
export * from "./text";
export * from "./transition";
export * from "./tree";
export * from "./if";
export * from "./loading";
export * from "./slot";

import type { AutoTemplateDirectiveBase } from "../base";
import { TextDirective } from "./text";
import { HtmlDirective } from "./html";
import { IfDirective } from "./if";
import { ForDirective } from "./for";
import { DataDirective } from "./data";
import { BindDirective } from "./bind";
import { OnDirective } from "./on";
import { LoadingDirective } from "./loading";
import { SlotDirective } from "./slot";

/**
 * 预设指令映射：指令名 → 指令类。
 *
 * 显式映射，避免依赖类的 `Function.name`。当前注册核心闭环指令（text/html/if/for/data/bind/on/loading/slot）；
 * `x-class` / `x-style` 经 getDirectives 解析期归一化为 `bind+class` / `bind+style`，无独立指令类。
 */
export const presetDirectives: Record<string, typeof AutoTemplateDirectiveBase> = {
    text: TextDirective,
    html: HtmlDirective,
    if: IfDirective,
    for: ForDirective,
    data: DataDirective,
    bind: BindDirective,
    on: OnDirective,
    loading: LoadingDirective,
    slot: SlotDirective,
};

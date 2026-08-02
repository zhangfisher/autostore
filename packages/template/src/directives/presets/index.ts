export * from "./bind";
export * from "./class";
export * from "./style";
export * from "./event";
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

import type { AutoTemplateDirectiveBase } from "../base";
import { TextDirective } from "./text";
import { IfDirective } from "./if";
import { ForDirective } from "./for";

/**
 * 预设指令映射：指令名 → 指令类。
 *
 * 显式映射，避免依赖类的 `Function.name`。当前注册核心闭环指令（text/if/for）；
 * 其余指令（bind/class/style/...）保持现状，后续按需补全到此处。
 */
export const presetDirectives: Record<string, typeof AutoTemplateDirectiveBase> = {
    text: TextDirective,
    if: IfDirective,
    for: ForDirective,
};

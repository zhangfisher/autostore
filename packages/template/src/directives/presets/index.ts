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
export * from "./show";
export * from "./loading";
export * from "./slot";
export * from "./patch";
export * from "./scope";
export * from "./block";

import type { AutoTemplateDirectiveBase } from "../base";
import { TextDirective } from "./text";
import { HtmlDirective } from "./html";
import { IfDirective } from "./if";
import { ShowDirective } from "./show";
import { ForDirective } from "./for";
import { DataDirective } from "./data";
import { BindDirective } from "./bind";
import { OnDirective } from "./on";
import { LoadingDirective } from "./loading";
import { SlotDirective } from "./slot";
import { PatchDirective } from "./patch";
import { ModelDirective } from "./model";
import { ScopeDirective } from "./scope";
import { BlockDirective } from "./block";

/**
 * 预设指令映射：指令名 → 指令类。
 *
 * 显式映射，避免依赖类的 `Function.name`。注册核心闭环指令（text/html/if/show/for/data/bind/on/loading/slot）
 * + `patch`（哨兵指令，ADR-0002 决策 6，让纯静态裸元素成为 `engine.patch` 锚点）
 * + `scope`/`block`（ADR-0021：x-scope 结构占位、x-block 命名模板块供体）。
 * `x-class` / `x-style` 经 getDirectives 解析期归一化为 `bind+class` / `bind+style`，无独立指令类。
 * `x-block` 经 compiler 前置 transformer 拦截、永不被实例化，注册仅为合法可发现名位。
 */
export const presetDirectives: Record<string, typeof AutoTemplateDirectiveBase> = {
    text: TextDirective,
    html: HtmlDirective,
    if: IfDirective,
    show: ShowDirective,
    for: ForDirective,
    data: DataDirective,
    bind: BindDirective,
    on: OnDirective,
    model: ModelDirective,
    loading: LoadingDirective,
    slot: SlotDirective,
    patch: PatchDirective,
    scope: ScopeDirective,
    block: BlockDirective,
};

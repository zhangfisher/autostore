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
export * from "./scope";
export * from "./component";
export * from "./use";
export * from "./import";

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
import { ModelDirective } from "./model";
import { ScopeDirective } from "./scope";
import { ComponentDirective } from "./component";
import { UseDirective } from "./use";
import { ImportDirective } from "./import";

/**
 * 预设指令映射：指令名 → 指令类。
 *
 * 显式映射，避免依赖类的 `Function.name`。注册核心闭环指令（text/html/if/show/for/data/bind/on/loading/slot）
 * + `scope`/`component`（ADR-0022：x-scope 结构占位、x-component 命名组件供体，承接 ADR-0021）
 * + `use`（ADR-0022：x-use 组件实例化指令）
 * + `import`（ADR-0022：x-import 远程组件加载指令）。
 * `x-class` / `x-style` 经 getDirectives 解析期归一化为 `bind+class` / `bind+style`，无独立指令类。
 * `x-component` 经 compiler 前置 transformer 拦截、永不被实例化，注册仅为合法可发现名位。
 * 
 * 注意：原 `x-patch` 指令已移除，因为 `x-scope` 指令可以完全替代其功能。
 * `x-scope` 同样是零副作用的 no-op 指令，能让纯静态元素建 scope 进入正向桥，
 * 从而被 `engine.patch` 定位。详见 ADR-0021 和 scope.ts 注释。
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
    scope: ScopeDirective,
    component: ComponentDirective,
    use: UseDirective,
    import: ImportDirective,
};

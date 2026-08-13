import { AutoTemplateDirectiveBase } from "../base";

/**
 * x-patch：哨兵指令（ADR-0002 决策 6）。
 *
 * **零副作用 no-op Compile 指令**——唯一作用是让原本「无指令、无 `{{}}` 插值」的纯静态裸元素
 * 在编译期建 scope（`compileElement` 对 `hasDirectives(t) || hasInterpolation(t)` 为真者建 scope），
 * 从而进入正向桥 `templateScopeMap`、成为 `engine.patch(selector, updater)` 可定位的锚点。
 *
 * 不建 `_scopes[id]` 数据域、不注入 `data`、不订阅、不渲染——比 `x-data="{}"` 更轻、
 * 更语义化（后者声明响应式数据域，空域纯占位）。命名与 `engine.patch` 同名，心智一致。
 *
 * 含指令或 `{{}}` 插值的元素已自动有 scope（合成 scope，ADR-0004），**不需**挂 x-patch；
 * x-patch 仅服务「纯静态容器想当 patch 锚」这一场景。
 */
export class PatchDirective extends AutoTemplateDirectiveBase {}

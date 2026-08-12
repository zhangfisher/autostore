import { AutoTemplateDirectiveBase } from "../base";

/**
 * x-block：命名模板块标记（ADR-0021）。
 *
 * **声明性资源，非渲染指令**——本身不建 scope、不订阅、不渲染、甚至**不被实例化**。
 * compiler 的前置 transformer（见 `compiler._collectBlock`）在 `compileElement` 之前即拦截
 * `x-block` 元素：深克隆为冻结快照 → 挂最近祖先 scope 的 `blocks` → 剪枝（不进结果 DOM）。
 * 因 first-match-wins，本指令类**永不会被 `createDirectives` 实例化**——它只是注册表里的
 * 一等名位，让 `x-block` 成为合法可发现的指令名（文档/类型友好），并为未来在块根挂指令
 * 生命周期留落点。
 *
 * 消费者（x-loading/x-empty/x-error…）经 `scope.getBlock(name)` 取用快照（到顶兜底全局块），clone + 编译渲染、
 * 替换内置 UI。详见 ADR-0021。
 *
 * 无值 `x-block` 取名 `default`；有值 `x-block="loading"` 取名 `loading`。命名自由，引擎不预定义
 * UI 态名册（跨指令供体协议）。`default` 唯一性约束直接归属本 scope。
 */
export class BlockDirective extends AutoTemplateDirectiveBase {}

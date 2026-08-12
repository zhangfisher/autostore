import { AutoTemplateDirectiveBase } from "../base";

/**
 * x-scope：结构占位指令（ADR-0021）。
 *
 * **零副作用 no-op Compile 指令**——唯一作用是让「无其他指令、无 `{{}}` 插值」的纯容器元素
 * 在编译期建 `AutoTemplateScope`（`compileElement` 对 `hasDirectives(t) || hasInterpolation(t)`
 * 为真者建 scope）。填补纯容器不建 scope 的缺口，达成两件事：
 *
 * 1. **为后代 x-block 提供归属锚点**——x-block 收集时向上找最近 scope 挂 `blocks`，若无 x-scope
 *    （也无其他指令祖先），块无处归属 → 编译期 warn 丢弃。x-scope 让任意 `<div>` 都能当块容器。
 * 2. **截断后代 scope 链**——后代 scope 经 `_linkParent` 向上找最近 scope 作父，若无 x-scope，
 *    后代 parent 会落到更远的祖先（跳过中间纯容器），localScope 继承链可能越过预期。x-scope
 *    在此插入确定的 scope 边界。
 *
 * 与 [PatchDirective](./patch.ts)（x-patch）同为零副作用占位，但定位不同：
 * - **x-patch**：让纯静态裸元素成为 `engine.patch` 锚点（动态 patch 可定位）。
 * - **x-scope**：为纯容器提供 scope 锚点（x-block 归属 + scope 链边界）。
 *
 * **不建数据域**（`_scopes[id]`）、不注入 dataScope、不订阅、不渲染——与 [DataDirective](./data.ts)
 * （x-data，数据注入）职责正交。元素已有其他指令（本就建 scope）时，x-scope 冗余但**静默无副作用**
 * （同元素 scope 只建一次，x-scope 不叠加、不报错）。
 *
 * 优先级 = 200（与 x-data 同级，最高档）：保证 x-scope 锚点 scope 在兄弟指令前建立，使同元素
 * 其他指令能正确经 `_linkParent` 找到此 scope 作父。
 */
export class ScopeDirective extends AutoTemplateDirectiveBase {
    static override readonly priority = 200;
}

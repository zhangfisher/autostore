# viewer 特性提炼：autostore-viewer.ts 拆分为 features/ 特性控制器

主文件 1483 行单类混十个关注点，按特性提炼至 `src/features/`，一特性一文件一控制器。**渲染不拆**：`_renderNode` 等读几乎所有宿主状态（mode/schema/图标/编辑态/布局属性），拆出等于传整面状态，render 是组件本体表意层而非附着特性，留在壳（收敛后约 730 行：属性声明 + 渲染 + 生命周期编排 + 宿主接口委托）。**utils/（跨特性纯函数）、widgets/（可注册扩展点）、styles.ts、types.ts 原位不动**——features/ 只收组件内特性。

## 机制：ReactiveController（弃回调注入先例与 mixin）

既有三先例（Editable 7 位置回调、ActionsHost 纯函数、IconsRegistry 3 回调）在 8 特性规模下，壳构造区退化为巨型接线板。过半特性带生命周期清理（绑定重试与 cm-ready 轮询、ResizeObserver、document 监听、toast 定时、长按计时、symbol 注入队列），controller 的 `hostConnected`/`hostDisconnected` 恰好消化——原 `disconnectedCallback` 的 30 行手动清理 dispersing 进各自控制器。mixin 弃用：类线性叠加顺序敏感、多特性 `this` 类型地狱。为控边界，每特性声明窄 `XxxHost` 接口约束自身可触达的宿主成员，依赖方向单一（特性→接口←壳）；控制器生命周期回调内禁跨特性调用，跨特性编排（watch 分流、模式切换收敛、树重建后重测列宽）留壳。

**版本事实（lit@3.3.3 / @lit/reactive-element@2.1.2）**：`hostUpdated?(): void` **不携带 changedProperties**（运行时分发 `t.hostUpdated?.()` 零参，dispatch 点在基类 `_$AE`，壳重写 `updated()` 不调 super 不吞回调）；依赖变更门控的列宽重测因此留壳 `updated()`。`renderRoot` 在基类 `connectedCallback` 内先于 `hostConnected` 创建，但首帧渲染未发生——事件委托挂载仍循旧例在 `firstUpdated`。

## 特性清单

八控制器 + 一改造：**icons**（注册链持有、slot 提取、动态 symbol 构造与注入、hasIcon/requestIcons）/ **tree**（构建、增量更新、路径定位、类型检测、entrys 入口吞并与前缀剥离；无生命周期行为，纯协作者不作控制器注册）/ **store**（WeakRef 注册表查找、绑定重试、watch+observer 订阅、cm-ready 就绪轮询，含 state/schema 读取访问面；watch 回调整体转交宿主 `onStateOperate` 编排）/ **label-width**（探针批量测宽、rAF 合并、隐藏容器重试、ResizeObserver；变更门控留壳）/ **edit-delegate**（edit 常驻根委托、inlineErrors、控件值提取）/ **press-edit**（长按 1s 手势、6px 手抖容忍、click 抑制）/ **toast** / **menus**（dropdown 开合态）。既有模块 `editable.ts`/`edit-plan.ts`/`actions.ts`/`icons-registry.ts` 随迁 features/；`icons.ts` 改名 `builtin-icons.ts`（其内容本就是内置词汇表，控制器门面占短名）。

## Editable 的 controller 化

7 位置回调收敛为单一 `EditableHost` 接口（成员同名同义），类体逻辑不动；编辑聚焦管理（`_focusedEditPath`——仅路径变化时聚焦/全选，防错误条重渲染抢焦点）自壳 `updated()` 移入其 `hostUpdated`。树节点 `_treeNodes`/`_entryInvalid` 仍为壳 `@state`（树控制器经 `TreeHost` 读写）：赋值驱动更新的传播语义原样保留，updated() 门控（含 `changedProperties.has('_treeNodes')`）零改动。

## 行为保持边界与验证

可观察行为严格不变；结构性改动仅限接线方式（控制器化 + 接口化），任何逻辑行不动；ADR 锚点注释随代码原样搬。验证：91 项单测全绿 + 双产物构建（rolldown ESM/IIFE）+ 真时间 CDP 冒烟（examples/verify-refactor.html + cdp-run.ts 驱动器：列宽测量/watch 增量/click-edit/edit 常驻委托/entrys 九链路）。无头验证注意：`--virtual-time-budget` 下 rAF 迟挂载期不触发（列宽测量走 rAF，迟挂载组件测不到）；须 CDP 真时间轮询驱动。

## 验证附记：grid=2 锚定断言按旧半应用态校准（非本次回归）

`examples/verify-final.html` 的垂直线锚定断言在提炼版下 FAIL（期望 207 实测 213）。取证结论：提炼版的列宽测量值（156px）与渲染布局**逐项精确吻合 CSS 公式**（`::before` 宽 = 8+24+4+24+6+KW+6−1em；子行 value 起点 = 8+12+58+(KW−12)+6；垂直线右缘 = value 起点 − 1em，即 styles.ts 注释声明的设计契约）；而该断言的期望公式编码 gap=21px，仅在 keyWidth 半应用（label 未吃深度补偿）的过渡态成立——旧代码同环境 3/4 轮测量完全不写入（塌缩态），1/4 轮侥幸命中过渡态通过。断言本身按过渡态校准，未随本次改动调整（如需可按「gap=1em=16px」重校准，另行决策）。

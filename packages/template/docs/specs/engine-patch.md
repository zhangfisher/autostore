# Spec:engine.patch — 模板增量编译

> **Triage**:`ready-for-agent`(issue tracker / `gh` CLI 当前未配置,本 spec 暂存为 repo 文件;待发布通道就绪,可创建为 issue 并应用 `ready-for-agent` 标签)
> **关联**:[ADR-0002](../adr/0002-dynamic-patch.md)、[glossary](../glossary.md)、ADR-0001/0003/0004/0006

## Problem Statement

AutoStore Template 引擎支持**初始化全量编译**与**值层面细粒度更新**(各指令自行订阅 + 微任务合并 patch),但缺少**运行时动态修改模板结构**(插入/删除/替换含指令或插值的片段)的能力。

全量重编译会重建整棵运行树,**丢失未改动子树的运行态**:输入焦点、滚动位置、未提交的表单值、第三方 widget 注入的状态。开发者需要一种方式,在运行时向已渲染的界面动态注入/修改/移除**响应式**模板片段,且只更新受影响的部分——而非整树抖动。

## Solution

为 `AutoTemplateEngine` 提供 **`engine.patch(selector, updater)`**——一个回调式的**模板增量编译**入口。开发者通过 CSS selector 定位模板中的某个 scope 元素,在 `updater` 回调里就地修改该元素的模板子树;引擎据 `updater` 返回值(四态)增量重建对应子树,**保留其余运行态**。

`engine.template` 是**唯一事实源**(单向):patch 只经修改模板触发增量同步,**不提供**运行树→模板的反向桥。

## User Stories

1. 作为模板开发者,我想在运行时向某个容器插入新的响应式片段,以便动态构建界面而不丢失其余部分的运行态(焦点/滚动)。
2. 作为模板开发者,我想通过返回 HTML 字符串替换某个区块,以便用一段新模板整体替换旧内容。
3. 作为模板开发者,我想通过返回新 DOM 节点替换某个区块,以便用编程构造的节点替换。
4. 作为模板开发者,我想删除某个区块(返回 `null` 或空串),以便运行时移除不再需要的内容。
5. 作为模板开发者,我想就地修改容器的子节点(不返回 / 返回同引用)并触发子树重编译,以便批量改动子内容。
6. 作为模板开发者,我想 patch 后新插入的绑定(`x-text` / `{{}}`)仍然响应状态变化,以便动态内容保持响应式。
7. 作为模板开发者,我想在含 `{{}}` 插值的裸元素上直接 patch(无需额外指令),以便任何已渲染的响应式区块都能动态更新。
8. 作为模板开发者,我想用一个轻量的哨兵指令(`x-patch`)把纯静态裸元素变成可 patch 的锚点,以便在无指令无插值的容器上也能 patch,而不引入空的响应式数据域。
9. 作为模板开发者,我想用 CSS selector 命中 patch 目标,而不需要手动拿到模板元素引用,以便 API 简洁。
10. 作为模板开发者,我想 patch 操作原子地完成「定位 + 改 + 同步」,以便不会漏调或传错元素。
11. 作为模板开发者,我想 patch 同步完成(调用返回时 DOM 已更新),以便后续代码立即看到结果。
12. 作为模板开发者,我想在 patch 误用(选中裸元素 / 命中动态区域)时得到清晰的警告而非静默错误,以便快速定位问题。
13. 作为模板开发者,我想 patch 操作广播事件(`engine/patch/before|after`),以便监听/调试动态更新。
14. 作为模板开发者,我想 patch 插入的含 runtime 指令(如 `x-loading`)的节点自动被引擎管理(mount/unmount),以便动态内容与静态内容行为一致。
15. 作为模板开发者,我想 patch 不破坏兄弟子树的响应式订阅,以便局部更新不影响其他部分。
16. 作为模板开发者,我想在 updater 抛错时引擎记录日志且不重建,以便单个错误不破坏引擎状态。
17. 作为引擎维护者,我想 patch 复用现有的子树重建管线和正向桥,以便实现简洁、行为与 `engine.data` 一致。
18. 作为引擎维护者,我想 patch 在动态区域(`x-for` / `x-if` / `x-slot` 内)被拒绝,以便避免运行树与模板非同构导致的不可靠行为。
19. 作为引擎维护者,我想 patch 的边界与指令通道划分自洽(只服务 scope 通道,runtime 指令由 dispatcher 自治),以便职责清晰、无遗漏。
20. 作为引擎维护者,我想 patch 的设计有 ADR 记录(ADR-0002)+ 领域词汇(glossary),以便未来维护者理解决策脉络与术语。

## Implementation Decisions

- **事实源方向**:`engine.template` 为唯一只读事实源;运行树是派生、一次性产物。patch 只经修改模板触发增量同步,不提供「运行树 → 模板」反向桥(`inspectTemplate` 砍除)。单向数据流。
- **API 契约**:`patch(selector, updater): this`。`selector` 对 `engine.template` `querySelector`(命中须为 scope 元素);`updater` 接收命中的模板元素、就地修改,返回值决定重建语义;末尾同步 `flushAll`;返回 `this`(链式)。
- **返回四态**(判定用严格 `===` / `typeof`,`undefined` 与 `null` 分离):
  - `void`/`undefined` 或 `=== templateEl` → **子树重建**(destroy 子 scope + 重编译子节点,scope 自身不动)
  - 新 `Node`(`!== templateEl`)→ **替换自身**
  - `string`(HTML)→ **替换自身**(`<template>` 解析,可多节点;空串 = 删除)
  - `null` → **删除自身**
- **patch 边界 = 有 scope 的元素**:含指令(Compile/Hybrid)**或**含 `{{}}` 插值(合成 scope,ADR-0004)的元素。纯 Runtime 指令(`x-loading`)不建 scope,但其 observer 通道(ADR-0003)本就响应原生 DOM 变更,不需 patch。**纯静态裸元素**(无指令无插值)需哨兵指令 `x-patch`。
- **哨兵指令 `x-patch`**:零副作用 no-op Compile 指令,唯一作用是让裸元素建 scope 成为 patch 锚——等效 `x-data="{}"` 但**不建私有响应式域**(`_scopes[id]`)、更轻、更语义化。
- **正向桥**:「模板元素 → scope」复用编译期 `templateScopeMap`(实例字段,半持久化),经新增的公共访问方法查询。**无需新建 WeakMap、无需改全量编译的重置逻辑**(patch 走子树编译,不触发全量;全量重置后整树重建立即重填 map,一致)。
- **子树重建**:复用现有「destroy 子 scope → 清空 DOM → 重编译子节点 → flushAll」管线(与 `engine.data` 子树重建同构)。
- **替换自身顺序**(经评审验证):① 模板侧先替换(新节点进入模板树,`_linkParent` 沿新祖先链生效)→ ② destroy 旧 scope → ③ 编译新节点建新 scope → ④ 运行侧替换。
- **删除自身**:`scope.destroy()` + 模板/运行双侧移除(`null` 与空串共用同一内部路径)。
- **动态区域守卫**:patch 目标自身或祖先链含 `ownsChildren` 结构指令(`x-for` / eager `x-if` / `x-slot`)→ 拒绝(warn),因运行侧结构由指令运行时生成、与模板非同构、正向桥不可靠。
- **ownsChildren 判定提取**:把「某 scope 是否含 ownsChildren 指令」的**纯判定**从冲突检测(多 owner 抛错)中提取为公共方法,动态区域守卫与冲突检测共用同一真相源。
- **编译节点列表**:提取单节点编译为共享方法——HTMLElement 必须走深度优先 `transformElement` 递归(含文本插值),**不可**走单元素浅编译(否则丢失整棵子树与插值);含 `{{}}` 文本走插值拆分。子树重建与 patch 替换自身共用。
- **dispatcher 透明**:patch 插入/删除节点时,runtime 指令的 mount/unmount 由 `RuntimeObserverDispatcher`(ADR-0003)的 MutationObserver 自动处理,patch 不直接操作 dispatcher。
- **事件**:patch 发 `engine/patch/before|after` 广播(对齐 `compile`/`data`,经门控 `broadcast`,无订阅零成本)。
- **错误处理**:updater 抛错 → 记 error 日志、不重建;updater 返回非法类型 → warn 忽略;编译失败 → 记 error、运行树可能未同步(未定义状态,文档声明)。
- **HTML 字符串安全**:v1 **不经 sanitizer**(开发者控制,与 `engine.template` 同源风险);sanitizer 集成留 fast-follow。

## Testing Decisions

- **好测试的标准**:只测 patch 的**外部可观察行为**(运行树 DOM 结果、响应式更新、事件广播、误用守卫),**不测**内部方法(`getScopeByTemplate`/`scopeOwnsChildren`/`compileChildNodes`)的实现细节——它们经 patch 的外部行为完整覆盖。
- **seam**:**单一 engine 级 seam**。`mount(html, state)` 构造引擎 → `engine.patch(selector, updater)` → `toEqualHTML` 断言运行树;响应式用例配合 `nextTick`;事件用例 `on` + 断言回调。与所有现有指令测试(`x-text`/`x-if`/`x-for`/`x-slot`)同构。零新 seam。
- **被测面**:`AutoTemplateEngine.patch`(公开 API),经引擎级用例覆盖内部 compiler/scope/dispatcher 协作。
- **prior art**:`x-text.test.ts`(绑定 + 响应式)、`e2e.test.ts`(scheduler/destroy)、`x-slot.test.ts`(结构指令 + 生命周期)、`core-scopes-contract.test.ts`(响应式契约)。复用 helpers 的 `mount`/`nextTick`、setup 的 `toEqualHTML` matcher、format 的归一。
- **覆盖矩阵**:四态(子树重建 / 替换 Node / 替换字符串单节点 / 替换字符串多节点 / 删除 `null` / 空串 = 删除)+ 边界(纯静态裸元素拒绝、含插值裸元素可 patch、动态区域 `x-for` 拒绝、updater 抛错不重建)+ 哨兵(`x-patch`)+ 响应式(patch 后改 state 更新)+ 兄弟子树运行态保留 + 事件广播。

## Out of Scope

- 运行树 → 模板反向桥(`inspectTemplate` / `queryTemplate(sel, true)`)——已砍(单向架构)。
- 隐式 MutationObserver 监听 `engine.template`(自动触发 patch)——不采用(显式 patch 更可预测)。
- patch 返回的 HTML 字符串经 `engine.options.sanitizer` 消毒——fast-follow(参 ADR-0005/0006 待决)。
- `engine.scopes` 的 WeakRef entry 在 destroy 后主动清理——既存特性(`_recompileSubtree` 同样未清),本次不修。
- 零副作用的具名哨兵指令变体(如 `x-scope` / `x-ref`)——用 `x-patch`,不新增其他。
- 跨 scope 批量 patch(一次 patch 多个独立 scope)——多次 `patch` 调用即可。
- patch 运行树元素(非模板元素)入参——不支持(入参是 selector,对模板空间)。
- 全量重编译的运行态保留——全量 `compile()` 仍整树重建;patch 是增量补充,不替代全量。

## Further Notes

- 设计经多轮 `/grill-with-docs` 评审定稿,记录于 **ADR-0002**(动态 patch 机制)+ **glossary**(事实源方向 / 正向桥 / 补丁单元 / 动态区域 / `x-patch` 等术语)。
- 与 **ADR-0001**(指令类别 / 通道划分)、**ADR-0003**(事件总线 / `RuntimeObserverDispatcher`)、**ADR-0004**(响应式插值 / 合成 scope)、**ADR-0006**(`x-slot`,其威胁模型已把 `engine.patch` 列为 T2 结构重建机制之一)协同。
- **已实现并验证**:16 个 patch 用例 + 415 全量回归通过;template 包类型检查干净(core 包错误为既有技术债,与本特性无关)。
- **发布通道状态**:`gh` CLI 未安装、无 token、无 `setup-matt-pocock-skills` 配置,故本 spec 暂存为 repo 文件而非 issue。待 issue tracker 就绪,可据本文件创建 issue 并应用 `ready-for-agent` 标签。

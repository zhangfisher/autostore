# ADR-0003：事件总线（信号面）与分层事件契约

- **状态**：Accepted（Round 3）｜⚠️ **部分废弃（2026-08-07）**：task 域（决策 3.2/3.5）未被采用——x-on async action 改用 `actions/<name>/*`、x-slot 用 x-loading 覆盖层，task 域零消费者已移除。事件总线其余（engine/scope/directive/patch/render 域 + RuntimeObserverDispatcher + broadcast→emit）仍有效。见 glossary「task 域已废弃」。
- **日期**：2026-08-06
- **关联**：[glossary.md](../glossary.md)、[ADR-0001](0001-directive-kind-system.md)、[ADR-0002](0002-dynamic-patch.md)

## 背景

`AutoTemplateEngine` 已 `extends FastEvent.FastLiteEvent<AutoTemplateEngineEvents>`（`engine.ts:44`），但事件契约 `AutoTemplateEngineEvents` 是**空接口**（`types.ts:125`），全库**零处** `emit/on` 调用——基类已接好，事件能力**完全未启用**。这是一片绿地，无历史包袱。

引擎目前已具备**两条通讯平面**：

- **数据面**：响应式 `store.state`——单一事实源，承载所有**值**（x-data 的 `_scopes`、x-for 的 item、computed 结果）。
- **控制面**：直接命令调用——`compile`/`scope.refresh()`/`scheduler.schedule()`/`compiler.compileChild()`，承载**确定性控制流**。

缺的是第三条——**信号面**：离散事件的通知/协调/可观测。需求来自三处：

1. **可观测性**：devtools 集成（仓库已有 `packages/devtools`）、日志、测试断言、宿主框架感知。
2. **扩展契约**：自定义指令/插件需要稳定的内部事件 API 作为挂钩点。
3. **指令解耦协调**：广播给**未知监听者**——如全局 loading 监听任意异步开始/结束、外部感知 x-if 状态。这是引入事件总线的**最大增殖点**。

**能力边界（FastLiteEvent）**：保留 `on/once/onAny/emit/emitAsync` + 通配符 `*`/`**` + `retain` + `count`/`tag`/`flags` + `ignoreErrors` + `transform`；**刻意砍掉** executor（仅同步顺序）/ pipe / hook / `FastEventScope` / meta / context / `waitFor` / `prepend`（见 `node_modules/.../fastevent/dist/liteEvent.d.ts` 类注释与 `docs/zh/guide/use/liteevent.md`）。

**为何不上完整 FastEvent（打包）**：`packages/core/src/index.ts:14` 是 `export * as FastEvent from "fastevent/lite"`——core 只把 **lite 构建**打进自身产物图；`AutoStore` 自身亦 `extends FastLiteEvent`（`store/store.ts:89`）。template 若 `import "fastevent"`（full），会把**完整 FastEvent 构建额外塞进 template 自己的 bundle**（core 图中无 full 代码可复用），代价直接落在 template 消费者头上。core 选 Lite 的打包理由，对 template 同样成立。

## 决策

### 1. 引入「信号面」——与数据面/控制面正交的第三平面

事件总线承载**离散信号**，不承载值、不承载控制流确定性。三平面职责正交：

| 平面 | 承载 | 机制 | 何时用 |
|---|---|---|---|
| **数据面** | 值（状态） | `store.state` 响应式 | 任何"数据是什么" |
| **控制面** | 确定性控制流 | 直接命令调用 | 任何"按序做什么" |
| **信号面**（新） | 离散事件通知 | `FastLiteEvent` | "发生了什么"的广播/观察/协调 |

### 2. 留 FastLiteEvent，不上 Full

理由见【背景】打包段。整套设计**完全落在 Lite 原语内**——"优雅 + 可扩展"由三件事补足，均**不依赖** Full 的 hook/executor：

1. **订阅优雅** ← 分层命名 + 通配符（决策 3）。
2. **流水线可插拔** ← mutable-payload + `emit` 返回 `R[]`（决策 5）。
3. **确定性** ← engine 始终是编排者，事件只 fan-out（决策 5）。

### 3. 事件命名分层契约

通配符硬约束（来自 `liteEvent.d.ts` + 通配符文档）：`*` 匹配**恰好一个**路径段；`**` **仅作末尾段**可靠（文档仅示例尾段 `**`，中间 `**` 优先级语义不可靠，本契约强制 `**` 仅叶子）；优先级 精确 > 单层 `*` > 多层 `**`；`onAny` ≡ `on('**')`。

#### 3.1 四条不变量（让通配可信）

| 不变量 | 内容 | 存在理由 |
|---|---|---|
| **I1 动词固定深度** | 每个域内"动作动词"恒在同一深度 | 让 `<域>/*/<动词>` 成立——无需中间 `**` |
| **I2 受控动词词表** | 跨指令/跨源共用一组动词；自定事件只能**扩词表**、不另起深度 | 让 `<域>/*/<动词>` 跨主体语义一致 |
| **I3 主体在固定槽** | 命名空间类域把"主体"（指令名/异步源）恒放 segment[2] | 让 `<域>/<主体>/*` 与 `<域>/*/<动词>` **同时**可用 |
| **I4 阶段后缀** | 流水线门的 `before`/`after` 恒在叶子 | 保 `<域>/<stage>/*` 抓全阶段 |

> I1 与"`**` 仅末尾"**互相成就**：动词深度固定 → 永不需中间 `**` → 通配优先级永远可预测。

#### 3.2 域 × 形状 × 深度

| 域 | 形状 | 深度 | 主体槽 | 动词 / 阶段词表 |
|---|---|---|---|---|
| `engine` | `engine/<stage>/<phase>` ＋少数 `engine/<verb>` | 3(2) | — | stage:`init`/`compile`/`destroy`/`start`/`stop`；phase:`before`/`after` |
| `scope` | `scope/<verb>` | 2 | —（按 `payload.id` 过滤） | `created`/`compiled`/`destroyed`/`data-updated` |
| `directive` | `directive/<name>/<verb>[/<sub>]` | 3(+) | **name @ seg2** | 见 3.3 动词词表 |
| `task` | `task/<source>/<verb>` | 3 | **source @ seg2** | `started`/`ended`/`resolved`/`rejected`/`progressed` |
| `patch` | `patch/<verb>` | 2 | —（payload 带 scope） | `before`/`after` |
| `render` | `render/flush/<phase>` | 3 | — | `before`/`after` |

#### 3.3 动词词表（受控，跨指令共享）

```
observer 通道（RuntimeDirective，见 ADR-0001）: mounted | unmounted | attr-changed
scope 通道（base.ts 钩子）                    : created | compiled | destroyed
指令自定（登记制扩词表）                       : x-for  → rendered / item-added / item-removed
                                                x-data → ready / resolved
```

动词词表**镜像 ADR-0001 的两条通道**：`mounted/unmounted/attr-changed` 属 observer 通道，`created/compiled/destroyed` 属 scope 通道。Hybrid 指令两组都发——`directive/*/mounted` 与 `directive/*/created` 天然分通道订阅。所有动词一律**过去时/状态形容词**，禁命令式。

#### 3.4 通配契约（cheatsheet——证明方案达成"按需订阅 / 通配订阅一批"）

| 订阅模式 | 匹配 | 价值 |
|---|---|---|
| `directive/loading/**` | loading 指令全部事件 | 单指令调试 |
| `directive/loading/*` | loading 指令直接动词 | 单指令动作集 |
| **`directive/*/mounted`** | 任意指令挂载（observer 通道） | ★ dispatcher 广播 / devtools 高亮 |
| **`directive/*/created`** | 任意指令创建（scope 通道） | ★ 全局初始化观察 |
| `directive/**` | 所有指令事件 | devtools 事件流 |
| **`task/*/started`** | 任意任务开始 | ★ 全局 loading 指示器 |
| `task/x-data/**` | 仅 x-data 的异步 | 局部 loading |
| `engine/compile/*` | 编译前/后 | 编译性能计量 |
| `scope/**` | 所有 scope 事件 | devtools scope 树 |
| `**`（= `onAny`） | 全部 | 全量日志/录制回放 |

★ 标模式 = 单层 `*` 落在主体槽 + 动词固定深度，是"通配订阅一批同类"的全部秘诀。

> **命名空间用指令注册名**（`getDirectives` 的 `info.name` / `presetDirectives` 的 key），非 DOM 属性名：x-loading 指令的事件是 `directive/loading/**`（非 `directive/x-loading/**`）。

#### 3.5 `task/**` = 转发 + 归一化层（非全量插桩）

`task/**` 把散落在各处的异步操作统一成一条可订阅的流，使"全局 loading / 错误 toast / 进度 / Suspense / devtools 异步检查器"等**跨源协调**成为可能（解耦的"广播给未知监听者"）。其实现分两类：

| 异步源 | 归属 | 实现 |
|---|---|---|
| 异步 computed | store 层 | **转发** store 已发的 `observer:run`/`done`/`error`/`cancel`（`store/types.ts:378-396`）→ `task/computed/started`/`ended` |
| x-data 异步初值 / x-on async action / action 内 fetch | 模板原生 | **新插桩** emit `task/<source>/started`/`ended` |

故 `task/**` 的本质是**对异构异步源的转发 + 归一化**：把 store 的 `:` 分隔事件与模板原生异步，统一到 `/` 层级命名空间，供消费者一处订阅。这也把 Q6 的插桩成本压到只剩模板原生源。

**纪律**：每个异步操作有且仅有一个 source 身份——若 x-data 异步初值由异步 computed 实现，其异步经 `observer:*` 转发即可，x-data 不得再发 `task/x-data/started`（否则双计）。

### 4. 事件类型契约（填充空接口）

```ts
// types.ts —— 取代 `export interface AutoTemplateEngineEvents {}`
export interface AutoTemplateEngineEvents {
    // engine/**（engine/ready、engine/init/after 用 retain）
    "engine/ready": { el: HTMLElement };
    "engine/compile/before": { root: HTMLElement; cancel?: boolean };
    "engine/compile/after": { root: HTMLElement };
    "engine/destroy/before": void;
    "engine/destroy/after": void;
    // scope/**
    "scope/created": { id: number; el: HTMLElement; template: HTMLElement };
    "scope/compiled": { id: number };
    "scope/destroyed": { id: number };
    "scope/data-updated": { id: number; data: Record<string, any> };
    // directive/**（<name> 是指令名；payload 带 el/scope 引用）
    "directive/*/mounted": { name: string; el: HTMLElement };
    "directive/*/unmounted": { name: string; el: HTMLElement };
    "directive/*/attr-changed": { name: string; el: HTMLElement; newVal: string; oldVal?: string };
    // task/**
    "task/*/started": { source: string; promise?: Promise<any> };
    "task/*/ended": { source: string; result?: any; error?: any };
    // patch/**
    "patch/before": { id: number; templateEl: HTMLElement };
    "patch/after": { id: number };
}
```

> 类型层 `*` 由 FastLiteEvent 的通配类型推导（`ReplaceWildcard`）支持；运行时仍按 3.4 契约匹配。

### 5. 事件作"声明式监督层"叠加于控制面：消除样板，不取代命令式核心

事件总线对控制面的作用分两类，须严格区分：

- **消除横切样板（✅ 简化）**：runtime observer 管理（→ 决策 7 共享 dispatcher，如 `loading.ts:170-265` 的 ~90 行通用样板移入 dispatcher）、指令生命周期广播（→ 基类自动 emit，零 per-指令样板）、异步协调（→ 决策 3.5 `task/**`）、横切关注（日志/devtools/计量，声明式订阅替代散落 inline）。
- **不取代命令式核心（❌ 事件化=加间接层、丢清晰度）**：编译 DFS 核心（`compileElement`/`_linkParent`/`_resolveOwnership`）、反应式数据流（`scope.watch`/`getScopeContext`/parent 链——store 已是优雅解，事件是值传播的错误抽象）、`scheduler`（已极简）、请求-响应查找（`getAction`/`getDataScope`——需返回值的链上查询，事件是广播非查询）。

**基类自动 emit**：`AutoTemplateDirectiveBase` 在 `created`/`compile`/`destroy`/`mounted`/`unmounted`/`attrChanged` 内自动 emit `directive/<name>/<verb>`（决策 3.3 词表），使每个指令零样板可观测。编排权仍留 engine（控制序列），事件是生命周期的**声明式监督旁路**。

可插拔流水线（mutable-payload 探针）仍成立——每个扩展点 = **可变 payload 的 emit**：

```ts
compile() {
  const ctx = { root: this.template, cancel: false };
  this.emit('engine/compile/before', ctx);          // 监听器可 ctx.cancel=true 否决
  if (ctx.cancel) return this;
  // ...DFS 编译，每元素：
  const ec = { template, scope: undefined, skip: false };
  this.emit('engine/compile/before-element', ec);   // 监听器可注入 ec.scope / ec.skip
  if (!ec.skip) { /* compileElement 建 scope、runDirectives */ }
  this.emit('engine/compile/after-element', { template, scope, el });
  this.emit('engine/compile/after', { root: ctx.root });
}
```

- `emit` 同步顺序执行 + 返回 `R[]` + `ignoreErrors:true`（单监听器抛错不中断）→ 同步编译期可插拔**不需要** Full 的 `onBeforeExecuteListener` hook。
- 监听器通过**突变 payload**（`before-*` 的 payload 是可变协商对象）或**返回哨兵**参与。
- **失去什么**：无全局单一 pre-hook、无声明式 executor。但编译期是同步一次性流程，本用不上。

### 6. retain 纪律：态信号 retain / 流信号 plain（解决解耦竞态）

指令解耦最大的坑是**隐式顺序竞态**：`runDirectives` 按 priority 跑（`scope.ts:396`），若 A(priority 高) 在 `created()` emit `ready`、B(priority 低) 在自己 `created()` 才 `on`——**A 先发 B 后订，B 错过**。`retain` 是解药，但要分两类用对：

| 信号性质 | 例子 | 用法 |
|---|---|---|
| **态信号**（一次性、表"当前是否就绪"） | `engine/ready`、`directive/x-data/ready` | **`retain=true`** emit；晚订者立即补拿，无竞态 |
| **流信号**（可重复、表"发生了"） | `task/*/started`、`directive/x-for/item-added` | **plain emit**；retain 会只留最后一条，反错 |

> **铁律：态信号 retain，流信号 plain。** 没有它，跨指令事件必有偶发丢消息。

### 7. engine 级 RuntimeObserverDispatcher（补 ADR-0001 的债）

当前 runtime 指令**各自建 observer**（`loading.ts:210/238`），无集中分发点。引入 engine 级共享分发器：

```
RuntimeObserverDispatcher（engine 持有；engine.el 上单一 MutationObserver）
  config: { childList, subtree, attributes, attributeFilter:[所有 runtime 指令属性] }
  路由：变更属性名 → 对应指令类 → mounted/unmounted/attrChanged
  广播：每次路由同步 emit('directive/<name>/mounted'|'unmounted'|'attr-changed', {el,newVal,oldVal})
  晚注册：DirectiveManager.set(runtime) → 重建 attributeFilter + 重扫 [x-xxx]
```

替代 `loading.ts` 的 per-directive observer。前缀 `directive/<name>/`（`<name>` 为指令注册名）天然隔离，外部 `on('directive/loading/**')` 精确订阅、`on('directive/**')` 全局观察。**顺带落地 ADR-0001【实现注记】"单一共享 observer"的未竟事项**。

### 8. 热路径门控

协调信号（`task/**`、`directive/**/mounted`）大多**非每帧**（按用户动作/DOM 变更触发），可接受 `emit` 遍历成本。唯 `render/flush` 是每帧——**仅当 `options.debug` 或存在 `render/**` 订阅时 emit**：engine 包一层 `on/once`（FastLiteEvent 无 add-hook，需自维护）维护"活跃事件类型"集合做短路。

## 被否决的方案

- **切换完整 FastEvent**：bundle（core 只再导出 lite，full 代码不入 core 图，template 直连会额外打进自身 bundle）；与全栈 Lite 一致性冲突（AutoStore 自身 extends Lite）；90% 野心 Lite 已覆盖。详见【背景】。
- **用事件替代 `store.state` 数据流**：制造双事实源，直接违反 [ADR-0002] 决策 1 的"事实源方向"纪律（template 为唯一事实源、无反向桥）。值必须留在 `store.state`。
- **事件重写编译流水线核心顺序**：失确定性；流水线强数据耦合（scope 按引用透传、`created` 必须先于 `compile`）；FastLiteEvent **无 `prepend`**，无法保证某监听器先跑；fire-and-collect 与"按引用透传+突变 scope"不匹配。事件只作 before/after 探针（决策 5）。
- **用 `FastEventScope` 做命名空间隔离**：重（额外监听器树）；层级名 + 通配符（`directive/<name>/**`）已足够实现指令级隔离。
- **scope 按 id 入路径（`scope/<id>/<verb>`）**：id 是数字+瞬态，入路径噪音大；`scope/*/<verb>` 因 id 无规律而无意义。改扁平 + payload.id 过滤（见【待决】G1）。

## 后果

- ✅ 启用一条与数据面/控制面正交的信号面，解锁可观测性 / 扩展契约 / 指令解耦三类能力。
- ✅ 分层命名契约让"精确订阅 / 通配订阅一批"同时好用（决策 3.4 cheatsheet 证明）。
- ✅ 全部落在 FastLiteEvent 原语内，零新依赖、零 bundle 增量、与全栈一致。
- ✅ RuntimeObserverDispatcher 顺带补齐 ADR-0001 的"单一共享 observer"。
- ⚠️ 信号面须守"态信号 retain / 流信号 plain"铁律（决策 6）——违反必生偶发丢消息 bug。
- ⚠️ 引入 RuntimeObserverDispatcher 需重写 `loading.ts:165-262` 的 observer 逻辑（x-loading 为近期特性，commit `f5b1e5b`）——非零重构工作量（见【待决】Q8）。
- ⚠️ 热路径 `render/flush` 须门控，否则每帧 `emit` 遍历成性能负担（决策 8）。

## 待决

- ~~**G1 scope 域形状**~~ → **已决（Round 2）**：扁平 `scope/<verb>`，id 走 payload。理由：scope.id 是静态自增、无规律无意义，消费者无从得知具体 id；入路径只噪音化且 `scope/*/<verb>` 无意义。
- ~~**G2 `task` source 轴**~~ → **已决（Round 3）**：加轴 `task/<source>/<verb>`（task 域设计本隐含 source 维，源受控 `x-data`/`x-on`/`computed`/`user`）。
- ~~**G3 流水线门阶段位置**~~ → **已决（Round 2）**：后缀 `engine/compile/before`（深 3）。保 `engine/compile/*` 抓一门两阶段、域层级完整。
- ~~**G4 动词词表治理**~~ → **已决（Round 3）**：共享动词锁定 + 自定动词登记制（常量 `DIRECTIVE_VERBS` + glossary），禁止自造同义词击穿 `directive/*/<动词>` 一致性。
- ~~**Q6 `task/**` 源插桩范围**~~ → **已决（Round 3）**：computed 经 store `observer:*` 转发（零插桩）；模板原生源**最小集** = ① x-data 异步初值 ② x-on async action；action 内手写 fetch 列为**可选/二期**（不强制）。可后续按需扩源。
- ~~**Q8 dispatcher 迁移**~~ → **已决（Round 3）**：**第一期纳入** RuntimeObserverDispatcher（含 `loading.ts:170-265` 迁移）——它是控制面简化的主杠杆，不做则只增观测、不简化代码。
- **实现期 smoke test**：中间 `**`（如 `directive/**/destroyed`）在 FastLiteEvent 运行时的实际匹配行为需实测确认；本契约已强制"仅末尾 `**`"规避。

## 实现注记（非架构决策，落地时遵循）

- **接线点**：`engine/ready`(retain) 在 `engine.ts:106` `initializeAll()` 后；`engine/compile/*` 在 `engine.ts:141` `compile()`；`engine/destroy/*` 在 `engine.ts:251`；`scope/*` 在 `scope.ts:61`(构造)/`396`(runDirectives)/`409`(destroy)；`scope/data-updated` 在 `engine.ts:188`；`patch/*` 在 `engine.ts:229` `_recompileSubtree`；`render/flush/*` 在 `scheduler.ts:45`（门控）。
- **emit guard**：高频事件（`scope/created`、`render/flush`）emit 前查"活跃事件类型"集合短路；集合由 engine 包裹的 `on/once/onAny` 维护（FastLiteEvent 无 add-hook）。
- **payload 只读约定**：除决策 5 的 `before-*` 可变协商 payload 外，其余事件 payload 视为**只读快照**——监听者不得借 payload 可变引用开后门写状态（写状态走 `store.state`）。

# ADR-0010：action DOM 冒泡事件 + phase 修饰符（祖先聚合后代 action）

- **状态**：Accepted
- **日期**：2026-08-08
- **关联**：[ADR-0003](0003-engine-event-bus.md)（actions 域 / 信号面）、[ADR-0007](0007-directive-options-and-modifiers.md)（修饰符系统）、[ADR-0008](0008-x-on-feedback-modifier.md)（feedback）、[x-on-action.md](../specs/x-on-action.md)

## 背景

ADR-0003 的 `actions/<name>/{pending,resolved,rejected}` 经 `engine.emit` 在信号面**全局广播**，payload **不带 el**（防 DOM 引用泄漏），按 action name 订阅（`actions/submit/pending`）。ADR-0008 的 feedback 因「全局广播串扰（同名 action 多元素同时亮）+ payload 无 el 无法按元素过滤 + 同步 action 不广播」而改用**返回值捕获**，绕开了元素级反馈——但遗留了一个总线的**结构性盲区**：

> **祖先聚合后代 action**——`<form>` 想感知其后代 `<button>` 触发的 `submit` action 生命周期（如「任一 submit 在跑则 form 显 submitting」）。

总线广播**无 DOM 层级概念**，无法表达「仅 form 子树内的 action」；feedback 声明在触发元素上、且各元素独立状态机，无法做祖先级 OR 聚合。需求（来自 `/grill-with-docs` 会话）：让 action 生命周期可被祖先**声明式**监听。

## 决策

### 1. 双通道并存（**非**替代）

`buildAction` 在 thenable 分支**同时**：

- `engine.emit("actions/<name>/{pending,resolved,rejected}")` —— **总线**，全局消费者，吃通配符 `actions/*/pending`；
- `triggerEl.dispatchEvent(new CustomEvent("action:<name>", { bubbles:true, composed:true }))` —— **DOM 冒泡事件**，祖先聚合。

两者正交：总线管全局、DOM 管 DOM 层级。`buildAction` 双发，是这两个维度天然存在的代价。

### 2. detail 不带 el/scope —— 冒泡路径即作用域

```
detail = { name, phase, result? | error? }
```

- **冒泡路径 = 作用域**：事件能冒泡到祖先，就自动等价「这次 action 发生在该祖先作用域内」。无需 detail 带 scope。
- **`event.target` = 触发元素**：DOM 事件天然带 target。无需 detail 带 el。
- 由此**规避 ADR-0008 否决的「payload 带 el」**——el 在 `event.target`，不在 payload；不持 DOM 引用的只有 `name`(字符串)、`phase`(字符串)、`result`/`error`(业务值)。

### 3. 复用 x-on，零新指令

`<form @action:submit="onSubmit">` 与 `<form @click="onClick">` **完全同构**。可行性已验证：

- `getDirectives` 的 `@` 前缀分支按 `.` 切分（`splitHeadAndModifiers`），冒号**保留在 head** → `attr="action:submit"`；
- `el.addEventListener("action:submit", ...)` —— DOM 接受任意字符串事件名（含冒号）。

form 因挂了 `@action:submit` 自动成为 scope（x-on 是 Compile 指令），无需额外 `x-data`。

### 4. phase 修饰符 `.pending`/`.resolved`/`.rejected` = guard 类型

与 `.left`/`.right`/`.middle`（鼠标键）**同构**——都是「互斥事件维度、按当前值过滤、单选使用」的 guard：

```ts
// modifiers/pending.ts（resolved/rejected 同构）
export default {
    name: "pending",
    type: "guard",
    apply: (e: Event, _rt: ModifierRuntime) => (e as any)?.detail?.phase === "pending",
} as GuardModifierDesc;
```

- 复用现有 guard **AND 链**，OnDirective 分桶逻辑**零改动**；
- 多 phase 需求挂多个 listener（`@action:submit.pending` + `@action:submit.resolved`，x-on `singleton=false` 支持同元素多实例），各自由 guard 过滤；
- 裸 `@action:submit`（无 phase 修饰符）= 听所有 phase，handler 读 `e.detail.phase` 区分；
- 对非 `action:` 事件误用 phase（如 `@click.pending`）→ `event.detail` 无 `phase` → guard 返回 false → 静默失效（与 `.left` 对非 mouse 事件返回 false 一致）。

### 5. dispatch 源 + 命令式不对称

- **dispatch 源 = 触发元素**（`OnEvalContext.el`）。`buildAction` 的 `wrapped` 内 `this = OnEvalContext`，闭包捕获 `const triggerEl = (this as any)?.el`，`then` 回调用该闭包变量 dispatch。
  - ADR-0008 当年称「then 回调拿不到 el」，是因 feedback 走返回值捕获**不需要** el，非技术不可行；现在需要了，闭包即可。
- **命令式不对称**：经 `@click="submit"` 触发 → 有 OnEvalContext、有 el、**双发**；命令式直调 `engine.actions.save()` → `this` 非 ctx、**无 el、只走总线、不发 DOM 事件**。这是 DOM 事件本质决定的（无 DOM 上下文则无冒泡），文档化即可。
- **async 跨 `scope.destroy`**（submit 跑一半 form 被卸载）：`triggerEl` detach → resolved 时已不在文档树 → dispatchEvent 不冒泡到任何监听者 → **天然安全停止**（比总线「engine 活着就一直广播到全局」反而更干净）。

### 6. `buildAction` 提炼到 `utils/buildAction.ts`

- 签名：`buildAction(emit: (type, payload) => void, name: string, action: A): A`，`emit` 由调用点绑 `engine.emit`；
- **撤出 engine 公有 API，直接删（非 deprecate）**：`engine.buildAction` 本就是「注册时自动包装、一般无需手动调用」的内部实现细节被误暴露为公有 API，`@autostorejs/template` 是内部活跃包、无外部消费者证据；
- 三调用点（engine 构造函数 / `actions` Proxy 的 set trap / `compiler.ts` 提取 `<script type="actions">`）改调 utils。

## 三通道正交关系（核心心智模型）

| 通道 | 机制 | 层级 | 典型场景 |
|------|------|------|----------|
| **feedback**（ADR-0008） | handler 返回值捕获 | 元素级、自带状态机 | 「这个按钮点击后自己闪 pending/resolved 类」 |
| **总线**（ADR-0003） | `engine.emit` 全局广播 | 全局、吃通配符 | 全局 loading 条 / 错误 toast / 可观测埋点 |
| **DOM 冒泡**（本 ADR） | `action:<name>` CustomEvent | DOM 层级、冒泡 | `<form>` 聚合内部各 `submit` |

三者正交并存，各占一个维度。

## 被否决的方案

- **DOM 事件替代总线**：DOM 事件名是字符串全匹配，**不支持「任意 name」通配订阅**——「任一 action 进入 pending」无法用一个 listener 表达，全局 loading/toast 失去 `actions/*/pending`。否决，改并存。
- **detail 带 el/scope**：撞 ADR-0008 明确否决的「事件 payload 带 el + 按 el 过滤」（违反 ADR-0003「payload 不带 el」防泄漏）。否决，靠 `event.target` / 冒泡路径表达。
- **phase 新增 `filter` 修饰符类 + OR 组合**：现有 `.left`/`.right`/`.middle` 已是 guard 单选先例（`.left.right` 本就 AND 永远 false），引入 filter 类是为单一场景过度设计（YAGNI）。否决，phase 归 guard、单选，多 phase 挂多 listener。
- **feedback 改回订阅事件**：feedback 的返回值捕获对同步 action（不广播）与「精确到本次触发」有独立价值。否决，feedback 留（ADR-0008 不推翻）。
- **`buildAction` 保留薄转发 + `@deprecated`**：对一个本不该公开的内部方法做 deprecate 是冗余仪式（YAGNI）。否决，直接删。

## 后果

- ✅ **祖先聚合后代 action**：`<form @action:submit>` 一行声明，容器级协调，模板即文档。
- ✅ **action 生命周期成为 DOM 一等公民**：`x-on` 免费覆盖，与 `@click` 同构，零新指令。
- ✅ **总线（全局）与 DOM（层级）正交并存**：通配符与冒泡各取所长。
- ✅ **phase 修饰符零系统改动**：复用 guard，与鼠标键同构。
- ⚠️ **双发**：action 生命周期广播两次（总线 + DOM）——两维度正交的天然代价；`buildAction` 内部 `then` 同时 `emit` + `dispatchEvent`。
- ⚠️ **命令式 vs 声明式不对称**：直调 `engine.actions[name]()` 不发 DOM 事件，须在 x-on-action.md 文档化。
- ⚠️ **`buildAction` 移出公有 API**：破坏性变更（内部包，无外部消费者）；三调用点改 utils。

## 实现注记（非架构决策，落地时遵循）

- **`utils/buildAction.ts`**：导出 `buildAction(emit, name, action)`；`wrapped` 内 `const triggerEl = (this as any)?.el`（仅 OnEvalContext 有 el），thenable 分支双发——`emit("actions/<name>/pending", {name})` + `triggerEl?.dispatchEvent(new CustomEvent("action:<name>", {bubbles:true, composed:true, detail:{name, phase:"pending"}}))`；resolved/rejected 同理（detail 带 `result`/`error`）。保留 `__buildActionWrapped` 防双重包装。`triggerEl` 为空（命令式直调）时跳过 dispatch、只 emit。
- **三个 phase guard**：`modifiers/pending.ts` / `resolved.ts` / `rejected.ts`（或单文件导出三 descriptor），`apply: (e) => e?.detail?.phase === "<name>"`，注册进 `MODIFIERS`。
- **engine.ts**：移除 `buildAction` 公有方法 + JSDoc；构造函数、`actions` Proxy set trap 改调 `buildAction(this.emit.bind(this), ...)`（emit 经 `FastLiteEvent` 的 `emit`，注意通配事件名转型）。
- **`compiler.ts:183`**：`this.engine.buildAction(k, fn)` → `buildAction(this.engine.emit.bind(this.engine), k, fn)`。
- **测试**：`buildAction.test.ts` 现有总线断言保留；新增 DOM 事件断言——`el.dispatchEvent` 冒泡到祖先、`event.detail.phase`、phase 修饰符过滤（pending 命中 / rejected 短路）、命令式直调不冒泡。CustomEvent 不依赖 MutationObserver，无 happy-dom flake（区别于 ADR-0008）。
- **文档**：`x-on-action.md` 增「action: DOM 冒泡事件 + phase 修饰符」小节指向本 ADR，并注明命令式不对称；`glossary.md` 增 `action:` DOM 事件 / phase 修饰符 / 祖先聚合条目，`actions` 域条目补双发并存注记。

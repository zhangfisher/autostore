# ADR-0012：局部 action 只 DOM 冒泡（不进总线，隔离同名串扰）

- **状态**：Accepted
- **日期**：2026-08-08
- **关联**：[ADR-0003](0003-engine-event-bus.md)（actions 域）、[ADR-0010](0010-action-dom-bubble-event.md)（DOM 冒泡事件）、[ADR-0011](0011-sync-action-lifecycle.md)（同步统一广播）

## 背景

ADR-0003 的总线 `actions/<name>/<verb>` 是**全局广播**，action name 入事件路径。全局 action（`engine.actions`）与局部 action（`scope.actions`，`<script type="actions">`）均经 `buildAction` 包装、按 name 进总线。

**隐患**：多个 scope 各有同名局部 action（如两个 `x-data` 块各有 `save`），均广播 `actions/save/resolved`——全局消费者 `engine.on("actions/save/resolved")` 收到所有 scope 的 save，**无法区分来源**（串扰）。这是 ADR-0008 feedback 否决「全局事件订阅」的同类问题，但 feedback 是元素级（用返回值捕获绕开），这里是全局/祖先消费者的总线订阅，无法绕开。

ADR-0010 引入的 DOM 冒泡 `action:<name>` **无此冲突**——冒泡天然隔离作用域（scope A 的事件到不了 scope B 祖先）。

## 决策

### 局部 action 只走 DOM 冒泡，不进总线

利用 ADR-0010 双通道做职责划分：

- **全局 action**（`engine.actions`）：双发（总线 + DOM 冒泡）—— 现状不变。
- **局部 action**（`scope.actions`）：**只 DOM 冒泡**，不 emit 总线。

依据：总线是全局通道，局部 action 进总线是语义错配（局部 = 不全局广播）；DOM 冒泡天然作用域隔离，承载局部 action 的祖先聚合。

### 实现

`buildAction` 加 `local` 标志（第 4 参，默认 `false`）：

- `local=false`（全局）：`broadcast` 同时 emit 总线 + dispatchEvent DOM。
- `local=true`（局部）：`broadcast` 跳过 emit、只 dispatchEvent DOM。

三入口：engine 构造函数 + `actions` Proxy 默认全局（`local=false`）；compiler 的 `<script type="actions">` 提取传 `local=true`。

### global 标志：模板内声明全局 action

`<script type="actions" global>` 声明**全局 action**——注入 `engine.actions`（经 actions Proxy 的 set trap 自动 `buildAction` 包装，`local=false` 双发总线+DOM），供任意 scope 经 `getAction` 终点查到。区别于默认的 `<script type="actions">`（局部，注入 `scope.actions`，只 DOM 冒泡）。

`global` 标志让模板能在任意位置声明全局 action（不依赖最近祖先 scope），与 `options.actions` / 运行时 `engine.actions[k]=fn` 三入口统一走全局包装。

| 声明方式 | 注入目标 | 通道 |
|---------|---------|------|
| `<script type="actions">` | `scope.actions`（局部） | 只 DOM 冒泡 |
| `<script type="actions" global>` | `engine.actions`（全局） | 总线 + DOM 双发 |

## 效果

- **总线** `actions/<name>/*`：只全局 action → name 唯一，**无同名冲突**。
- **DOM** `action:<name>`：所有 action（全局+局部）经 x-on 触发时冒泡 → `engine.el` 监听收所有、祖先监听收子树内。
- **全局消费者**（loading/toast/埋点）订阅总线：只收全局 action，不被局部 action 干扰。
- **局部 action 反馈**：祖先聚合（`<form @action:save>`）或 `engine.el` 监听 DOM。

## 权衡

- 局部 action 失去总线可见性（`engine.on("actions/save/*")` 不再收局部 save）——这是 **bug fix**（串扰本就是隐患），迁移用 DOM 通道。
- 局部 action 命令式直调（组件内 `scope.getAction("save")()`）：无 `triggerEl` → 既无总线也无 DOM = 静默。可接受（组件内部调用，自知结果）。

## 后果

- ✅ **根除**局部 action 同名总线串扰。
- ✅ 总线/DOM 通道职责清晰：总线=全局、DOM=作用域。
- ✅ 修复 ADR-0008 feedback 的潜在串扰源（全局消费者不再被局部 action 干扰）。
- ⚠️ **破坏性**：局部 action 不再进总线（依赖总线监听局部 action 的代码迁移到 DOM 通道）。
- ⚠️ 现有测试反转：原「局部 action 进总线」→「局部 action 只 DOM 冒泡」。

## 被否决的方案

- **payload 带 `scopeId`**：消费者仍收所有同名 action、手动过滤；通配订阅 `actions/*/pending` 串扰依旧。治标不治本。
- **事件名带 scopeId 命名空间**（`actions/save@<id>/...`）：复杂化层级、违背「name 入路径」简洁性。
- **局部 action 也进总线但带 scope 标识**：未根治通配串扰，且 payload 携带 scope 信息增加耦合。

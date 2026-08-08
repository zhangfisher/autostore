# ADR-0011：同步 action 统一广播 lifecycle（同步/异步一致）

- **状态**：Accepted
- **日期**：2026-08-08
- **关联**：[ADR-0003](0003-engine-event-bus.md)（actions 域）、[ADR-0008](0008-x-on-feedback-modifier.md)（feedback）、[ADR-0010](0010-action-dom-bubble-event.md)（DOM 冒泡事件）

## 背景

ADR-0003 原「仅 async action（返回 thenable）广播 lifecycle；同步 action 透明不广播」。该假设贯穿 actions 域设计，并被 ADR-0008 feedback 用作「同步 action 失效」的论据之一。

需求：同步与 async action **行为一致**，均触发 `pending`/`resolved`/`rejected`，使消费者（埋点、日志、统一处理）不必区分同步异步。

## 决策

### 1. buildAction 统一广播（去 thenable 门控）

`utils/buildAction` 不再 `if (thenable)` 门控——所有 action 均广播完整 lifecycle：

- `pending` 在 `action.apply` **之前**（=「开始执行」）；
- `resolved`（成功返回）/ `rejected`（抛错）在完成时。

同步 action 同 tick 内 pending→resolved（或抛错 pending→rejected）；异步经 `then`。

### 2. 同步抛错：broadcast rejected + rethrow

同步 action 抛错时，`buildAction` 先 broadcast `rejected`，再 **rethrow** 保持错误传播：

- 经 x-on 触发：rethrow 的错误被 `eval.ts` 的 try/catch 捕获记日志（行为同现状）；
- 命令式直调：调用者仍收到错误。

async reject 仍经内部 `then(_, onRejected)` 消费（消除 unhandled rejection）。两者**互斥**——async 函数体 throw 被包装为 rejected promise，不走同步 catch。

### 3. pending 时序统一为 apply 前

原 async 的 pending 在 apply 后；统一为 **apply 前**（与同步一致，pending = 开始执行）。现有测试不检查该时序，无破坏。

## feedback 衍生问题（已知限制，待决）

ADR-0008 feedback 用**返回值捕获**驱动状态机，对同步 action 现状静默（`if (!ret.then) return ret`）。本 ADR 让同步 action 也广播 lifecycle 后，feedback 是否响应同步 action 存在**技术障碍**：

feedback 的返回值捕获**拿不到同步抛错**——`eval.ts` 的 action try/catch 吞掉错误返回 undefined，feedback 无法区分「同步成功返回 undefined」与「同步抛错」。若强行让 feedback 响应同步 action（一律 `settle(resolved)`），**同步抛错会错误显示成功**（误导）。

正确让 feedback 响应同步 action（含失败检测）需重构 x-on **错误流**：让错误从 `eval.ts` 冒泡经 wrapper 链（feedback `try/catch` 检测）+ `OnDirective` 兜底记日志。这是架构级改动，**另行评估**（见「待决」）。

在 feedback 重构前，同步 action 的 lifecycle 反馈经 ADR-0010 的全局/祖先事件覆盖：`<form @action:save.rejected>`、总线 `actions/save/rejected`、DOM 冒泡 `action:save`（phase=rejected）。

## 被否决的方案

- **保持仅 async 广播**：与「同步异步一致」诉求冲突。否决。
- **feedback 一律响应同步 action（不检测失败）**：同步抛错错误显示 resolved（成功），误导用户。否决，feedback 同步分支暂保持静默，待错误流重构。

## 后果

- ✅ **同步/异步 action lifecycle 完全一致**（事件层面）：消费者不再区分。
- ✅ **同步 action 可观测性**：埋点/logging 统一覆盖同步操作。
- ✅ **同步抛错可被捕获**：全局/祖先 `rejected` 事件 + DOM 冒泡。
- ⚠️ **事件量增加**：同步 action 也广播 pending+resolved（同步操作无加载窗口，pending 瞬时，对加载态 UI 无意义；价值在终态与可观测）。
- ⚠️ **feedback 对同步 action 仍静默**（返回值捕获限制），待错误流重构（待决）。
- ⚠️ **现有测试反转**：「同步 action 透明不广播」→「同步也广播 pending+resolved」。

## 待决

feedback 响应同步 action（含失败检测）需 x-on **错误流重构**（`eval.ts` 重抛 + wrapper 链透传 + `OnDirective` 兜底记日志）。评估后另起 ADR。

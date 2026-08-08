# ADR-0013：feedback 同步/异步一致（错误流冒泡）

- **状态**：Accepted
- **日期**：2026-08-08
- **关联**：[ADR-0008](0008-x-on-feedback-modifier.md)（feedback）、[ADR-0011](0011-sync-action-lifecycle.md)（同步统一广播）、[ADR-0010](0010-action-dom-bubble-event.md)（DOM 冒泡）

## 背景

ADR-0011 让同步 action 也广播 lifecycle，但 feedback（ADR-0008 返回值捕获）对同步 action 仍**静默**——根因：`eval.ts` 的 action try/catch **吞掉同步抛错**返回 undefined，feedback 无法区分「同步成功返回 undefined」与「同步抛错」。强行响应会把同步抛错误显示为 resolved（成功），误导。

这是 ADR-0011 记录的局限 2：feedback 同步静默与「同步/异步一致」诉求冲突，增加开发者心智负担。

## 决策

### 1. 同步抛错冒泡到 feedback（eval.ts 不吞）

`eval.ts` action catch 保留 `logger.error`，但改为 **rethrow**（不再 `return undefined` 吞错）。错误冒泡经 guardWrapped → wrapper 链 → feedback。

### 2. feedback 统一状态机（同步/异步一致）

feedback.apply 返回的 handler 统一处理：

- **同步成功**（next 返回非 thenable）：`settle(resolved)`——直接终态，无 pending。
- **同步抛错**（next throw）：catch → `settle(rejected)` → 吞（不 rethrow，eval 已 logger）。
- **async**（next 返回 thenable）：`enter(pending 常驻)` + `then(settle resolved/rejected)`。

**终态一致**（resolved/rejected 对同步异步都有意义——「已成功/已失败」），**pending 仅 async**（同步瞬时完成，无加载窗口，强加 pending 会瞬时闪烁、无意义）。这是**语义一致**，非机械一致。

### 3. 兜底防 uncaught（无 .feedback 时）

eval.ts rethrow 后错误冒泡。有 `.feedback` 时 feedback catch 吞；**无 .feedback 时**需兜底防浏览器 uncaught：

- **OnDirective finalHandler**：包 try/catch 吞（同步栈兜底）。
- **debounce setTimeout**：回调 try/catch 吞（异步栈兜底——setTimeout 脱离 finalHandler 同步栈）。

两处兜底**仅吞错**（eval.ts 已 logger），不重复 logger。

## 错误链路

**有 .feedback**（同步抛错）：
```
action throw → buildAction catch（broadcast rejected + rethrow，ADR-0011）
  → eval.ts catch（logger + rethrow，ADR-0013）
  → guardWrapped（透传）→ feedback catch（settle rejected + 吞）
```

**无 .feedback**（同步抛错）：
```
action throw → buildAction（broadcast rejected + rethrow）→ eval.ts（logger + rethrow）
  → guardWrapped → finalHandler safeHandler catch（吞）  [无 debounce]
  → 或 debounce setTimeout catch（吞）  [有 debounce]
```

## 后果

- ✅ **feedback 同步/异步一致**：开发者写 `.feedback`，无论 action 同步异步都得到终态反馈（成功绿/失败红），减少心智负担。
- ✅ 消除局限 2（ADR-0011 记录的 feedback 同步静默）。
- ✅ 错误仍 logger（eval.ts）+ 不 uncaught（兜底吞）。
- ⚠️ 同步 action 也触发 feedback 终态类（resolved/rejected）——所有 `.feedback` 同步 action 都闪终态。属一致性的代价（用户主动写 `.feedback` 即要反馈）。
- ⚠️ OnDirective + debounce 增加防御性 try/catch（吞错兜底）。
- ⚠️ 现有测试反转：「同步 action 静默」→「同步成功 resolved」+「同步抛错 rejected」。

## 被否决的方案

- **feedback 监听 buildAction 的 DOM `action:<name>` rejected 事件**：feedback 拿不到 action name（`rt` 无 name 字段），无法 `addEventListener` 具体事件；DOM 不支持通配监听。否决。
- **eval.ts catch 后用 sentinel 返回值标记错误**：破坏返回值透传语义（feedback 捕获 async promise）。否决。
- **feedback catch 后 rethrow（不吞）**：无 `.feedback` 时仍需兜底，且 debounce setTimeout 内 rethrow 会 uncaught。否决，改吞 + 兜底。

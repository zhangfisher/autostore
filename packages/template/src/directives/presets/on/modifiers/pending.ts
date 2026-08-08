import { createPhaseGuard } from "./_phase";

/**
 * `.pending`：phase 修饰符（ADR-0010），`@action:submit.pending` 仅在 action 进入 pending
 * 阶段触发 handler。与 `.left` / `.right`（鼠标键）同构——互斥事件维度的 guard、单选使用
 * （多 phase 靠挂多个 listener，`x-on` `singleton=false`）。对非 `action:` 事件静默失效。
 * 见 `modifiers/_phase.ts`。
 */
export default createPhaseGuard("pending");

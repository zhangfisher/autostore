import { createPhaseGuard } from "./_phase";

/**
 * `.rejected`：phase 修饰符（ADR-0010），`@action:submit.rejected` 仅在 action reject
 * 失败后触发 handler。与 `.left` / `.right`（鼠标键）同构——互斥事件维度的 guard、单选使用。
 * 对非 `action:` 事件静默失效。见 `modifiers/_phase.ts`。
 */
export default createPhaseGuard("rejected");

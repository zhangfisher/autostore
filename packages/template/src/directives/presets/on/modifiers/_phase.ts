/**
 * phase 修饰符共享守卫工厂（ADR-0010）。
 *
 * `.pending` / `.resolved` / `.rejected` 经此工厂产出 GuardModifierDesc，过滤 `action:<name>`
 * DOM 冒泡事件的 `detail.phase`。与 `_guards.ts` 的按键/鼠标守卫工厂并列（同模式 DRY 基石）。
 */
import type { GuardModifierDesc } from "../types";

/**
 * phase 守卫工厂：匹配 `action:<name>` 事件的 `detail.phase`。
 *
 * 仅 `action:<name>` 事件（buildAction dispatch，见 ADR-0010）携带 `detail.phase`；
 * 其他事件无此字段 → 返回 false（静默失效，与按键守卫对非 key 事件行为一致）。
 *
 * @param phase "pending" | "resolved" | "rejected"
 */
export function createPhaseGuard(phase: string): GuardModifierDesc {
    return {
        name: phase,
        type: "guard",
        apply: (e) => (e as any)?.detail?.phase === phase,
    };
}

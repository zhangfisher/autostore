import { SYS_KEYS } from "./_guards";
import type { GuardModifierDesc } from "../types";

/**
 * `.exact`：精确控制系统修饰符的组合。
 *
 * - 单独 `.exact`：无任何系统修饰符按下时才触发
 * - `.ctrl.exact`：仅 Ctrl（不能同时按 Alt/Shift/Meta）
 * - `.ctrl.shift.exact`：必须恰好 Ctrl+Shift
 *
 * 判定：当前按下的系统键集合 === 显式声明的系统键集合（集合相等）。
 * 非 `.exact` 时，系统修饰符（ctrl/alt/shift/meta）为"包含"语义——按下即触发、不排斥其他。
 */
export default {
    name: "exact",
    type: "guard",
    apply: (e, rt) => {
        const ke = e as KeyboardEvent;
        const pressed = SYS_KEYS.filter((k) => ke[`${k}Key`]);
        const declared = SYS_KEYS.filter((k) => rt.modifiers.includes(k));
        return pressed.length === declared.length && declared.every((k) => pressed.includes(k));
    },
} as GuardModifierDesc;

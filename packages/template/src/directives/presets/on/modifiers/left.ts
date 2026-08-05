import { KEY_EVENTS, MOUSE_EVENTS, createKeyAliasGuard, createMouseButtonGuard } from "./_guards";
import type { GuardModifierDesc } from "../types";

const asKey = createKeyAliasGuard("left");
const asMouse = createMouseButtonGuard("left");

/**
 * `.left` 双义（按事件类型自动消歧，无需用户区分）：
 * - mouse 事件（mousedown/mouseup/click/contextmenu）→ 鼠标左键（e.button===0）
 * - key 事件（keydown/keyup/keypress）→ 方向键 ←（e.key==="ArrowLeft"）
 * - 其他事件类型不支持，返回 false
 */
export default {
    name: "left",
    type: "guard",
    apply: (e, rt) => {
        if (MOUSE_EVENTS.has(rt.event)) return asMouse.apply(e, rt);
        if (KEY_EVENTS.has(rt.event)) return asKey.apply(e, rt);
        return false;
    },
} as GuardModifierDesc;

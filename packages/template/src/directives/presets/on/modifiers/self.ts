import type { GuardModifierDesc } from "../types";

/** `.self`：仅当 event.target 就是绑定元素本身时触发（不响应子元素冒泡上来的事件） */
export default {
    name: "self",
    type: "guard",
    apply: (e, rt) => e.target === rt.el,
} as GuardModifierDesc;

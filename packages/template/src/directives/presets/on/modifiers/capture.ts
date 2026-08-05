import type { ModifierDesc } from "../types";

/** `.capture`：在捕获阶段触发事件（映射 addEventListener 的 capture:true） */
export default {
    name: "capture",
    type: "option",
    apply: () => ({ capture: true }),
} as ModifierDesc;

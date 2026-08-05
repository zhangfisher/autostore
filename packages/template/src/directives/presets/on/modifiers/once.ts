import type { ModifierDesc } from "../types";

/** `.once`：监听器触发一次后自动退订（映射 addEventListener 的 once:true） */
export default { name: "once", type: "option", apply: () => ({ once: true }) } as ModifierDesc;

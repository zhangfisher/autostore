import type { ModifierDesc } from "../types";

/** `.passive`：声明不会 preventDefault，浏览器可立即执行默认行为（如滚动），以防阻塞 */
export default {
    name: "passive",
    type: "option",
    apply: () => ({ passive: true }),
} as ModifierDesc;

import { createMouseButtonGuard } from "./_guards";

/** `.middle`：鼠标中键（e.button===1）。仅在 mouse 事件场景有意义 */
export default createMouseButtonGuard("middle");

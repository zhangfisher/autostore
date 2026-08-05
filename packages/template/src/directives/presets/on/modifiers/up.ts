import { createKeyAliasGuard } from "./_guards";

/** `.up`：仅在 key 为 ArrowUp（方向键 ↑）时触发 */
export default createKeyAliasGuard("up");

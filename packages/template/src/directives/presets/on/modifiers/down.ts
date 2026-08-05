import { createKeyAliasGuard } from "./_guards";

/** `.down`：仅在 key 为 ArrowDown（方向键 ↓）时触发 */
export default createKeyAliasGuard("down");

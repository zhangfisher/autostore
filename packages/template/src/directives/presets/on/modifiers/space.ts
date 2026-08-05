import { createKeyAliasGuard } from "./_guards";

/** `.space`：仅在 key 为空格（" "）时触发 */
export default createKeyAliasGuard("space");

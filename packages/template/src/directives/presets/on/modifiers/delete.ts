import { createKeyAliasGuard } from "./_guards";

/** `.delete`：key 为 Delete 或 Backspace 时触发 */
export default createKeyAliasGuard("delete");

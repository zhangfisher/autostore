import { createSystemGuard } from "./_guards";

/** `.alt`：Alt 键按下时触发（包含语义；精确组合用 `.exact`） */
export default createSystemGuard("alt");

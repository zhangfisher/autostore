import { createSystemGuard } from "./_guards";

/** `.meta`：Meta 键（Mac 为 Command，Win 为 Win 键）按下时触发（包含语义；精确组合用 `.exact`） */
export default createSystemGuard("meta");

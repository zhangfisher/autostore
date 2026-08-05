import { createSystemGuard } from "./_guards";

/** `.shift`：Shift 键按下时触发（包含语义；精确组合用 `.exact`） */
export default createSystemGuard("shift");

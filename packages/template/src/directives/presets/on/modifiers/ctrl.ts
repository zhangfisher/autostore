import { createSystemGuard } from "./_guards";

/** `.ctrl`：Ctrl 键按下时触发（包含语义，可同时按其他键；精确组合用 `.exact`） */
export default createSystemGuard("ctrl");

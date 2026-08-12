import { GLOBAL_CONFIG_MANAGER } from "../consts";
import type { ConfigManager } from "../schema/manager";

/**
 * 取全局默认 ConfigManager（单例，挂 globalThis[GLOBAL_CONFIG_MANAGER]）。
 *
 * **ConfigManager 延迟 require**：不从顶部 `import`，而在函数体内 `require`。
 * 原因——core 源码入口图（`index.ts` export *）的 ESM 求值时序下，顶部值导入 `ConfigManager`
 * 会令 `schema/manager.ts` 在 `store/store.ts` 的 `class AutoStore` 声明完成前被求值，
 * 触发 `manager.ts` 顶层 `class ConfigManager extends AutoStore` 的 TDZ
 * （`Cannot access 'AutoStore' before initialization`）。延迟到函数调用时才 require，
 * 调用时整张图早已初始化完毕，安全。仅源码直吃场景（bun test）需要此处理；
 * 发布态 dist（tsup bundle 单文件、无跨模块 live-binding 时序）无此问题。
 */
export function getDefaultConfigManager(): ConfigManager | null {
    if (globalThis[GLOBAL_CONFIG_MANAGER]) {
        return globalThis[GLOBAL_CONFIG_MANAGER];
    } else {
        // 延迟 require：打断顶层求值时序导致的 AutoStore TDZ
        // const { ConfigManager } = require("../schema/manager");
        // return new ConfigManager(localConfigSource);
        return null;
    }
}

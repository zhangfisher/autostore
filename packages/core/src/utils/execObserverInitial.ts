import type { AnyAutoStore } from "../types";

/**
 * 执行 onObserverInitial hook（自动适配单函数或数组）。
 *
 * 使用 every 语义：所有 hook 返回 true 或 void 视为通过；
 * 只要任一 hook 返回 false，立即短路并返回 false。
 * 单个 hook 抛错仅 logger.error 记录，并视为通过（不阻断，与现有 try/catch 行为一致）。
 *
 * 用于在同步的 Proxy get 拦截器中立即决定是否创建观察对象——
 * 因此**不能用**返回 Promise 的 safeExecHooks。
 *
 * @returns 全部通过返回 undefined；任一返回 false 则返回 false。
 */
export function execObserverInitial(
    store: AnyAutoStore,
    path: string[],
    value: any,
    parent: any,
): false | undefined {
    const hooks = (store.options as unknown as Record<string, unknown>)?.onObserverInitial;
    if (hooks == null) return undefined;
    const arr = Array.isArray(hooks) ? hooks : [hooks as any];
    // every 在首个 false 自动短路；hook.call(store, ...) 保证 this 指向 store
    const allPassed = arr.every((hook: any) => {
        try {
            return hook.call(store, path, value, parent) !== false;
        } catch (e: any) {
            store.logger.error(`onObserverInitial error: ${e.message}`);
            return true;
        }
    });
    return allPassed ? undefined : false;
}

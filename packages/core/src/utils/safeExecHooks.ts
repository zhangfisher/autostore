import { AnyAutoStore } from "../types";

/**
 * 安全执行所有 hooks，忽略所有错误，不返回任何值。
 *
 * - 单个 hook 抛出的同步/异步异常都会被吞掉，不会中断其他 hook 的执行
 * - 既不向上抛出错误，也不收集返回值
 *
 * @param hooks  单个 hook 函数或 hook 函数数组
 * @param args   传递给每个 hook 的参数
 */
export function safeExecHooks(
    this: AnyAutoStore,
    hooks: ((...args: any[]) => any) | ((...args: any[]) => any)[],
    args: any[] = [],
): Promise<void> | void {
    // 规范化 hooks 为数组
    const hookArray = Array.isArray(hooks) ? hooks : [hooks];

    if (hookArray.length === 0) {
        return;
    }

    // 安全执行单个 hook：吞掉所有错误，确保单个 hook 的异常不影响其他 hook
    const executeHook = async (hook: (...args: any[]) => any): Promise<void> => {
        try {
            const result = hook.call(this, ...args);
            // 兼容同步 hook 与异步 hook
            if (result instanceof Promise) {
                await result;
            }
        } catch (e: any) {
            this.logger.error(e);
        }
    };
    // 并行执行所有 hooks
    return Promise.all(hookArray.map(executeHook))
        .then(() => undefined)
        .catch(() => {});
}

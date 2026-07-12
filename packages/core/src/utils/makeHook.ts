import { safeExecHooks } from "./safeExecHooks";
import type { AnyAutoStore } from "../types";
import type { AutoStoreHooks } from "../store/types";

/**
 * 为指定 hook 字段创建一个安全执行器。
 *
 * 执行器被调用时，从 store.options 读取对应 hook（自动适配单函数或数组），
 * 通过 safeExecHooks 安全执行：hook 的 this 绑定为 store，单个 hook 抛出的
 * 同步/异步异常会被吞掉（仅 logger.error），不影响其他 hook。
 *
 * 注意：不适用于 onObserverInitial——该 hook 的返回值需被消费且需同步决策，
 * 请改用 {@link execObserverInitial}。
 *
 * @param store  store 实例
 * @param name   hook 字段名（onComputedCreated / onObserverCreated 等）
 * @returns      调用时执行对应 hook 的函数，返回 Promise<void> | void
 */
export function makeHook<S extends AnyAutoStore>(
    store: S,
    name: keyof AutoStoreHooks<any>,
) {
    return (...args: any[]): Promise<void> | void => {
        // 每次调用时实时读取，保证拿到最新的 hook 配置
        const hooks = (store.options as unknown as Record<string, unknown>)?.[name];
        if (hooks == null) return;
        return safeExecHooks.call(
            store,
            hooks as ((...args: any[]) => any) | ((...args: any[]) => any)[],
            args,
        );
    };
}

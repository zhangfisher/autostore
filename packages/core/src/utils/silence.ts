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
export function silence<T extends (...args: any[]) => any>(
    this: AnyAutoStore,
    fn: T,
    fallbackValue?: ReturnType<T>,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
    return (...args: Parameters<T>): ReturnType<T> | undefined => {
        try {
            return fn.call(this, ...args);
        } catch (e: any) {
            this.logger.error(e);
            return fallbackValue;
        }
    };
}

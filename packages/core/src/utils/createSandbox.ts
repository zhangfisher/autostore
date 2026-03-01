/**
 * 创建沙箱的选项
 */
export interface CreateSandboxOptions {
    /**
     * 错误处理回调
     * @param error - 捕获的错误对象
     * @param code - 出错的代码字符串
     * @returns 如果返回值，将代替函数的返回值；如果不返回，则继续抛出错误
     */
    onError?: (error: Error, code: string) => any;

    /**
     * 禁用的全局变量列表
     *
     * 这些变量将以 `undefined` 值传递给沙箱函数，防止 code 中访问它们
     *
     * @example
     * ```ts
     * const sandbox = createSandbox(
     *   { x: 1 },
     *   { disabledGlobals: ['window', 'document', 'fetch'] }
     * )
     * sandbox('window') // undefined
     * sandbox('fetch("/api")') // TypeError: fetch is not a function
     * ```
     */
    disabledGlobals?: string[];
}

/**
 * 创建一个安全的沙箱执行环境
 *
 * @example
 * ```ts
 * // 基本用法
 * safeEval = createSandbox({
 *      a: 1,
 *      b: 2
 * })
 *
 * safeEval("a+b")  === 3
 *
 * // 使用错误处理
 * const safeEval = createSandbox(
 *   { x: 1 },
 *   {
 *     onError: (error, code) => {
 *       console.error(`执行代码 "${code}" 时出错:`, error.message);
 *       return 0; // 返回默认值
 *     }
 *   }
 * )
 * safeEval("undefinedVar") // 返回 0，不会抛出错误
 * ```
 *
 * @param context - 沙箱可用的上下文变量
 * @param options - 沙箱配置选项
 * @returns 执行代码的函数
 */
export function createSandbox(context: Record<string, any>, options?: CreateSandboxOptions) {
    // 获取 context 的所有键作为函数参数名
    const keys = Object.keys(context);
    // 获取对应的值
    const values = Object.values(context);
    const disabledGlobals = options?.disabledGlobals || ['alert', 'window', 'document'];
    // 处理禁用的全局变量
    // 将它们作为参数传递 undefined 值，从而遮蔽全局作用域中的同名变量
    // 但要排除已经在 context 中定义的变量（context 优先级更高）
    if (disabledGlobals && disabledGlobals.length > 0) {
        const contextKeysSet = new Set(keys);
        // 过滤掉已在 context 中的变量名
        const globalsToDisable = disabledGlobals.filter((name) => !contextKeysSet.has(name));

        if (globalsToDisable.length > 0) {
            // 将禁用的全局变量名添加到参数列表
            keys.push(...globalsToDisable);
            // 为每个禁用的变量添加 undefined 值
            values.push(...new Array(globalsToDisable.length).fill(undefined));
        }
    }

    // 使用 new Function 创建沙箱函数
    // 参数名为 context 的键 + 禁用的全局变量名（不在 context 中的），函数体为用户提供的 code
    return (code: string) => {
        try {
            // 创建函数: new Function('a', 'b', 'window', 'document', 'return a+b')
            const fn = new Function(...keys, `return ${code}`);
            // 传入 context 的值 + undefined（用于禁用的全局变量）
            return fn(...values);
        } catch (error) {
            // 如果有 onError 回调，调用它
            if (options?.onError) {
                const fallback = options.onError(error as Error, code);
                // 如果 onError 返回了值，使用该值作为结果
                if (fallback !== undefined) {
                    return fallback;
                }
            }
            // 否则重新抛出错误
            throw error;
        }
    };
}

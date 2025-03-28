/**
 * 封装一个函数，支持防抖功能。
 * 第一次调用会立即执行，之后的调用会在延迟时间后执行，
 * 如果在延迟时间内再次调用，会重置延迟时间。
 * 
 * @template T 原函数类型
 * @param fn 需要防抖的函数
 * @param delay 防抖延迟时间（毫秒）
 * @returns 包装后的防抖函数，类型与原函数相同
 * 
 * @example
 * const debouncedFn = debounce((value: string) => {
 *   console.log(value)
 * }, 300)
 * 
 * // 第一次调用会立即执行
 * debouncedFn('test1') // 立即打印 'test1'
 * 
 * // 300ms内的多次调用会被合并为一次
 * debouncedFn('test2')
 * debouncedFn('test3') // 300ms后打印 'test3'
 */
export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number
): T {
    let timerId: ReturnType<typeof setTimeout>
    let isFirstCall = true

    return ((...args: Parameters<T>) => {
        if (isFirstCall) {
            // 首次调用立即执行
            isFirstCall = false
            fn(...args)
        } else {
            // 清除之前的定时器
            clearTimeout(timerId)
            // 设置新的定时器
            timerId = setTimeout(() => {
                fn(...args)
            }, delay)
        }
    }) as T
}
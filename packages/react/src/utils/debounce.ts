/**
 * 
 * 
 * 封装一个函数，支持防抖功能
 * 
 * @param fn 需要防抖的函数
 * @param delay 防抖延迟时间
 * 
 * 
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
    let timerId: ReturnType<typeof setTimeout>;
    let isFirstCall = true;
    return ((...args: Parameters<T>) => {
        if (isFirstCall) {
            isFirstCall = false;
            fn(...args); // 首次调用立即执行
        } else {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                fn(...args);
            }, delay);
        }
    }) as T;
}
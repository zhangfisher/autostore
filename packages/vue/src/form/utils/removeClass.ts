/**
 * 移除元素上的指定类名。
 * @param el - 要操作的 DOM 元素。
 * @param classs - 要移除的类名，多个类名以空格分隔。
 * @returns 无返回值。
 */
export function removeClass(el: any, classs: string) {
    if (!el) return
    try {
        if (el.classList) {
            el.classList.remove(...classs.split(/\s+/))
        }
    } catch {}
}
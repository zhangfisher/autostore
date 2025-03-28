/**
 * 断言函数
 * @param value 要断言的值
 * @param help 断言失败时的错误信息
 * @returns 如果断言成功返回true
 * @throws 如果断言失败抛出错误
 */
export function assert(value: any, help: string): value is true {
    if (!value) {
        throw new Error(help)
    }
    return true
}
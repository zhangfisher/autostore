/**
 * 判断输入是否是一个 PromiseLike 对象（thenable）
 * 符合 Promises/A+ 规范的 thenable 检测
 * @param val 待检测的值
 * @returns 是否为 PromiseLike 对象
 */
export function isPromiseLike(val: any): val is PromiseLike<any> {
  return !!val && typeof val === 'object' && typeof val.then === 'function';
}

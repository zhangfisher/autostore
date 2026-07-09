

/**
 * 判断是否是一个异步函数
 * @param fn 
 */
export function isAsyncFunction(fn:any){
    return fn.constructor.name === 'AsyncFunction'
}
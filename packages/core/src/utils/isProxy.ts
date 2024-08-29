/**
 * 返回一个对象是否是代理对象
 * 
 * @example
 * const obj = {}
 * const pobj = new Proxy(obj,{...})
 * 
 * isProxy(obj) // => false
 * isProxy(pobj) // => true
 * 
 * @param obj 
 */
export function isProxy(obj:any){
    return typeof obj === 'object' && obj !== null && !('__isProxy' in obj);
}
/**
 *  判定两个值是否相等
 * 
 *  如果两个值都是对象，则判断两个对象是否相等
 * 如果两个值都是数组，则判断两个数组的值是否相等
 * 
 */

export function isPathEq(a:string[],b:string[]):boolean{
    if(a.length!==b.length) return false
    return a.every((item,index)=>item===b[index])
}

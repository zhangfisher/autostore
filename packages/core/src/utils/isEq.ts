/**
 *  判定两个值是否相等
 * 
 *  如果两个值都是对象，则判断两个对象是否相等
 * 如果两个值都是数组，则判断两个数组的值是否相等
 * 
 */

export function isEq(a:any,b:any):boolean{
    if(a===b) return true
    if(a===null || b===null) return false
    if(typeof a !== typeof b) return false
    if(typeof a === 'object'){
        if(Array.isArray(a) && Array.isArray(b)){
            if(a.length!==b.length) return false
            return a.every((item,index)=>isEq(item,b[index]))
        }else if(!Array.isArray(a) && !Array.isArray(b)){
            let keys = Object.keys(a)
            if(keys.length!==Object.keys(b).length) return false
            return keys.every(key=>isEq(a[key],b[key]))
        }else{
            return false
        }
    }
    return false
}

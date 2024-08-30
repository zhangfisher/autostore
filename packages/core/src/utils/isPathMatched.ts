/**
 *  判定两个路径是否匹配
 * 
 *  @description
 * 
 *  - 判定两个路径是否匹配，即两个路径是否相等
 *  - 支持通配置符比较，*代表任意字符
 *     如 isPathMatched(['a','b','c'],['a','*','c']) = true
 *  
 * 
 *  @example
 * 
 * isPathMatched(['a','b','c','d','e','f'],['a','b','c','d','e','f']) = true
 * isPathMatched(['a','b','c','d','e','f'],['a','b','c','d','e','f']) = true
 *  
 * 
 */

import { isPathEq } from "./isPathEq"

export function isPathMatched(basePath:string[],path:string[]):boolean{
    let isMatched = isPathEq(basePath,path) 
    if(isMatched) return true
    if(basePath.length!==path.length) return false
    return basePath.every((item,index)=>{
        if(item==='*') return true
        return item===path[index]
    })
}

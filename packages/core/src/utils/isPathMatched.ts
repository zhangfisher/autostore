/**
 *  判定两个路径是否匹配
 * 
 *  @description
 * 
 *  - 判定两个路径是否匹配，即两个路径是否相等
 *  - 支持通配置符比较，*代表任意字符
 *     如 isPathMatched(['a','b','c'],['a','*','c']) = true
 * 
 *  - 支持通配置符比较，**代表任意字符,但**只能出现在最后
 *     如 isPathMatched(['a','b','c'],['a','**']) = true
 *        isPathMatched(['a','b','x','y','z'],['a','**']) = true
 *      isPathMatched(['m','b','x','y','z'],['a','**']) = false
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

export function isPathMatched(path:string[],pattern:string[]):boolean{
    let isMatched = isPathEq(path,pattern) 
    if(isMatched) return true    
    if(pattern[pattern.length-1]==='**'){
        pattern.splice(pattern.length-1,0,...Array.from<string>({length:path.length-pattern.length}).fill("*"))
    }
    if(path.length!==pattern.length) return false
    return pattern.every((item,index)=>{
        if(item==='*') return true
        return item===path[index]
    })
}

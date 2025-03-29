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

import { PATH_DELIMITER } from "../consts";
import { isPathEq } from "./isPathEq"


export function isPathMatched(path:string | string[],pattern:string | string[]):boolean{
    const arrayPath = Array.isArray(path) ? path : path.split(PATH_DELIMITER)
    const arrayPattern = Array.isArray(pattern) ? pattern : (pattern==='' ? [] : pattern.split(PATH_DELIMITER))
    if(arrayPattern.length===0) return true
    let isMatched = isPathEq(arrayPath,arrayPattern) 
    if(isMatched) return true    
    if(arrayPattern[arrayPattern.length-1]==='**'){
        arrayPattern[arrayPattern.length-1]="*"
        arrayPattern.splice(arrayPattern.length-1,0,...Array.from<string>({length:arrayPath.length-arrayPattern.length}).fill("*"))
    }
    if(arrayPath.length!==arrayPattern.length) return false
    return arrayPattern.every((item,index)=>{
        if(item==='*' || item==='**') return true
        return item===arrayPath[index]
    })
}

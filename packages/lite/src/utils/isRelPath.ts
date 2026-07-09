/**
 *  判定一个路径是否是相对路径
 * 
 * 当path满足以下条件时代表是相对路径
 * 
 * - 以./开头
 * - 以../开头
 * - ==CURRENT,或==PARENT 或SELF或
 * 
 */

import type { ObserverScope } from "../observer";

export function isRelPath(path: ObserverScope): boolean {
    const p = Array.isArray(path) ? path[0] : path
    if (p.startsWith('./')) return true
    if (p.startsWith('../')) return true
    if (['CURRENT', 'PARENT', 'SELF'].includes(p)) return true
    return false
}   

import type { ObserverDepends } from "../observer";
import { getFullValuePath } from "./getFullValuePath";

/**
 * 
 * 返回相对curPath的依赖的绝对路径
 * 
 * 如果当前路径是以#开头，则说明是动态创建的响应式对象、
 * 即attached=false，此时无法计算相关路径
 * 
 */
export function calcDependPaths(curPath:string[] | undefined,deps:ObserverDepends | undefined):string[][] {
    if(!deps) return []
    return deps.map(dep=>getFullValuePath(curPath,dep)).filter(path=>path!==undefined)
}

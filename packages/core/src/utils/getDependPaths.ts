import { ComputedDepends } from "../computed/types";
import { getFullValuePath } from "./getFullValuePath";

/**
 * 
 * 返回相对curPath的依赖的绝对路径
 * 
 * 
 */
export function getDependPaths(curPath:string[] | undefined,deps:ComputedDepends | undefined):string[][] {
    if(!deps) return []
    return deps.map(dep=>getFullValuePath(curPath,dep)).filter(path=>path!==undefined)
}

import { ComputedDepends } from "../computed/types";
import { getFullValuePath } from "./getFullValuePath";

/**
 * 
 * 返回相对curPath的依赖的绝对路径
 * 
 * 
 */
export function getDependPaths(curPath:string[],deps:ComputedDepends | undefined):string[][] | undefined{
    if(!deps) return 
    return deps.map(dep=>getFullValuePath(curPath,dep))
}

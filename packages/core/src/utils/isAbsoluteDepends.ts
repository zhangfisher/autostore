/**
 *  判断是否是绝对依赖
 */

import type { ComputedDepends } from "../computed";


export function isAbsoluteDepends(depends: ComputedDepends) {
    return depends.some(dep => {
        if(typeof(dep) === 'string') {
            if(dep.startsWith("./") || dep.startsWith("../") || dep.startsWith("@")) {
                return false;
            }else if(['CURRENT','ROOT','SELF','PARENT'].includes(dep)){
                return false;
            }else{
                return true;
            }
        }else{
            return true;
        }
    });
}
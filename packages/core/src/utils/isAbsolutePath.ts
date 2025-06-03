/**
 *  判断是否是绝对依赖
 * 
 * 
 */

import type { ComputedDepends } from "../computed";


export function isAbsolutePath(depends: ComputedDepends | undefined) {
    if (!depends) return false;
    return depends.some(dep => {
        if (typeof (dep) === 'string') {
            if (dep.startsWith("./") || dep.startsWith("../") || dep.startsWith("@")) {
                return false;
            } else if (['CURRENT', 'SELF', 'PARENT'].includes(dep)) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    });
}
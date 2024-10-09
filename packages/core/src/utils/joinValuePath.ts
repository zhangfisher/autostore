import { PATH_DELIMITER } from "../consts"

/**
 * 将路径数组合并成字符串，使用_作为连接符
 * 
 * @param paths 
 * @returns 
 */
export function joinValuePath(paths?:(string | string[])[]):string{
    return (paths || ['ROOT']).map((p)=>{
        return Array.isArray(p) ? p.join(".") : p
    }).join(PATH_DELIMITER)
}
 
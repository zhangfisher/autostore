/**
 *  判断一个路径destPath是否包含另一个路径basePath判断
 * @param basePath 
 * @param destPath 
 */
export function pathStartsWith(basePath:string[],destPath:string[]){
    if(basePath.length>destPath.length) return false
    return basePath.every((p,i)=>{
        return p===destPath[i]
    })
}
 
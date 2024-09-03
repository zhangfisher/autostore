import { OBJECT_PATH_DELIMITER } from "../consts";
import { joinValuePath } from "../utils/joinValuePath";
import { WatchDepends,WatchDependParams } from "./types";



/**
 * 
 * 在指定on参数时，取值可以是
 * - 动态侦听  (path:string[],value:any)=>boolean
 * - 静态侦听  指定要侦听的路径
 *      string | (string,string[])[]
 *   如果是string，则使用OBJECT_PATH_DELIMITER分割成数组
 *   最后形式是string[][]
 * 
 * 本函数用来将on参数标准化为一个函数(path:string[])=>boolean
 * 
 * 
 * @param on 
 * @returns 
 */
export function normalizedWatchFilter(on:WatchDependParams=[]): WatchDepends{
    if(typeof on === 'function'){
        return on
    }else if(typeof(on)==='string'){
        return (path:string[])=>joinValuePath(path)== joinValuePath(on.split(OBJECT_PATH_DELIMITER))
    }else if(Array.isArray(on)){
        if(on.length===0) return ()=>true
        return (path:string[])=>{
            return on.map(item=>
                typeof(item) === 'string' ? 
                    item.split(OBJECT_PATH_DELIMITER) 
                    : (Array.isArray(item) ? item : [String(item)])
                ).some(item=>joinValuePath(path)==joinValuePath(item))
        }
    }else{
        return ()=>false
    }
}
 
import { getMapVal } from "./getMapVal";
import { isMap } from "./isMap";


/**
 * 返回指定路径是否存在
 */
export function pathIsExists(obj: any, keyPath: string[] | undefined): any {
    if(!keyPath) return false
    if(keyPath.length === 0) return false
    let val;
    let parent = obj;
    for(let i=0;i<keyPath.length;i++){
      const key = keyPath[i]
      let exists:boolean = false
      if(isMap(parent)){
        exists = parent.has(key)
        if(!exists) return false
        val = getMapVal(parent,key)
      }else{
        exists = key in parent
        if(!exists) return false
        val = parent[key]
      } 
      parent = val
    }
    return true
  }


 
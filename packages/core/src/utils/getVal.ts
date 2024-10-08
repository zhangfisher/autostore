import { getMapVal } from "./getMapVal";
import { isMap } from "./isMap";

export function getVal(obj: any, keyPath: string[] | undefined): any {
    if(!keyPath) return obj
    if(keyPath.length === 0) return obj
    let val;
    let parent = obj;
    keyPath.forEach((key) => { 
      if(isMap(parent)){
        val = getMapVal(parent, key)
      }else{
        if(key in parent){
          val = parent[key]
        }else{
          throw new Error(`invalid state path: ${keyPath.join(".")}`)
        }        
      } 
      parent = val     
    });
    return val;
  }


 
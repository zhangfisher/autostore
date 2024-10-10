import { getMapVal } from "./getMapVal";
import { isMap } from "./isMap";

export function getVal(obj: any, keyPath: string[] | undefined,defaultValue?:any): any {
    if(!keyPath) return obj
    if(keyPath.length === 0) return obj
    let val;
    let parent = obj;

    for (let i = 0; i < keyPath.length; i++) {
      const key = keyPath[i];
      if (isMap(parent)) {
        val = getMapVal(parent, key);
      } else {
        if (key in parent) {
          val = parent[key];
        }else {
          if(defaultValue!==undefined){
            return defaultValue
          }else{
            throw new Error(`invalid state path: ${keyPath.join(".")}`);
          }
        }
      }
      parent = val;
    }


    return val;
  }

 
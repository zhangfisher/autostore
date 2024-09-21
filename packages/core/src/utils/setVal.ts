import { getMapVal } from "./getMapVal";
import { isMap } from "./isMap"

export function setVal(obj: any, keyPath: string[], val: any) {
    let parent = obj;
    const lastIdx = keyPath.length - 1;
    for (let idx = 0; idx < keyPath.length; idx++) {
      const key = keyPath[idx];
      if (idx === lastIdx) {
          parent[key] = val;
          return;
      }
      const subVal = parent[key];
      parent = subVal;
  }
}




      // const isMapObj = isMap(parent);
      // if (idx === lastIdx) {
      //   isMapObj ? parent.set(key, val) : (parent[key] = val);
      //   return;
      // }
      // const subVal = isMapObj ? getMapVal(parent, key) : parent[key];
      // parent = subVal; 
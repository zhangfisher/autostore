import { getMapVal } from "./getMapVal";
import { isMap } from "./isMap"

export function setVal(obj: any, keyPath: string[], val: any) {
    let parent = obj;
    const lastIdx = keyPath.length - 1;
    keyPath.forEach((key, idx) => {
      const isMapObj = isMap(parent);
      if (idx === lastIdx) {
        isMapObj ? parent.set(key, val) : (parent[key] = val);
        return;
      }
      const subVal = isMapObj ? getMapVal(parent, key) : parent[key];
      parent = subVal; 
    });
}


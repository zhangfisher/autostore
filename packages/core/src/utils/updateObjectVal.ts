import { isMap } from "./isMap";

/**
 * 
 * 用于更新对象的值
 * 采用Object.assign()的方式更新对象的值
 * 
 * 
 * @param obj 
 * @param keyPath 
 * @param val 
 */
export function updateObjectVal(obj: any, keyPath: string[], val: object) {
    let parent = obj;
    const lastIdx = keyPath.length - 1;
    keyPath.forEach((key, idx) => {
        const isMapObj = isMap(parent);
        if (idx === lastIdx) {
            let oldVal:any = isMapObj ? parent.get(key) : parent[key];
            if(typeof(oldVal) === 'object'){
                Object.assign(oldVal,val)
            }
            return;
        }
        if (isMapObj) {
            if (!parent.has(key)) {
                parent.set(key, {});
            }
            parent = parent.get(key);
        } else {
            if (!(key in parent)) {
                parent[key] = {};
            }
            parent = parent[key];
        }
    });
  }
  
import { isAsyncComputedValue } from "./isAsyncComputedValue";

/**
 * 设置对象中指定路径的值。
 *
 * toAsyncValue的作用是
 * 当keyPath指向的是一个AsyncComputedValue时，
 *  将val更新.value属性上
 *
 *
 * @param {any} obj - 要设置值的对象。
 * @param {string[]} path - 表示路径的键数组。
 * @param {any} value - 要设置的值。
 * @param {boolean} toAsyncValue - 当keyPath是AsyncComputedValue时，是否更新到.value值。
 */
export function setVal(obj: any, path: string[], value: any, toAsyncValue?: boolean) {
    if (!path || !obj || path.length === 0) {
        return obj;
    }

    const keys = path;

    let current: any = obj;
    const curPath: string[] = [];

    const update = (cur: any, key: any, newValue: any) => {
        if (toAsyncValue) {
            if (isAsyncComputedValue(cur[key])) {
                cur[key].value = newValue;
            } else {
                cur[key] = newValue;
            }
        } else {
            cur[key] = newValue;
        }
    };

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        curPath.push(key);
        if (current) {
            if (Array.isArray(current)) {
                const index = parseInt(key, 10);
                if (Number.isNaN(index) || index < 0 ) {
                    throw new Error(`setVal: invalid array index ${curPath.join(".")}`);
                } else {
                    if (i === keys.length - 1) {
                        update(current, index, value);
                    } else {
                        current = current[index];
                    }
                }
            } else if (current instanceof Map || current instanceof WeakMap) {
                if (i === keys.length - 1) {                    
                    current.set(key as any, value);
                }else{
                    if(!current.has(key as any)) {
                        current.set(key as any, {});
                    }
                    current = current.get(key as any);
                }
            } else if (typeof current === "object" && key in current) {
                if (i === keys.length - 1) {
                    update(current, key, value);
                } else {
                    current = current[key];
                }
            } else {
                current[key] = i === keys.length - 1 ? value : {};
                current = current[key];
            }
        } else { // 如果当前对象不存在，则创建
            current[key] = i === keys.length - 1 ? value : {};
            current = current[key];
        }
    }
    return obj;
}

// export function setVal(obj: any, keyPath: string[], value: any,toAsyncValue?:boolean) {
//   let current = obj;
//   const lastIdx = keyPath.length - 1;
//   if(keyPath.length===0){   // 更新到了根节点
//       Object.assign(obj,value)
//   }else{
//     for(let i=0;i<keyPath.length;i++){
//       let key = keyPath[i]
//       if(current){
//           const isMapObj = isMap(current);
//           if (i === lastIdx) {
//             // 当keyPath是AsyncComputedValue时，是否更新到.value值。
//             if(toAsyncValue===true){
//               const curValue = isMapObj ? getMapVal(current, key) : current[key];
//               if(isAsyncComputedValue(curValue)){
//                   current = curValue;
//                   key='value'
//               }
//             }
//             isMapObj ? current.set(key, value) : (current[key] = value);
//             return;
//           }
//           const subVal = isMapObj ? getMapVal(current, key) : current[key];
//           current = subVal;

//       }else{
//         current[key] = i===keyPath.length -1 ? value : {}
//         current = current[key];
//       }

//     }
//   }
// }

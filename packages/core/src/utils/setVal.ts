import { getMapVal } from "./getMapVal";
import { isAsyncComputedValue } from "./isAsyncComputedValue";
import { isMap } from "./isMap"


/**
 * 设置对象中指定路径的值。
 *
 * toAsyncValue的作用是
 * 当keyPath指向的是一个AsyncComputedValue时，
 *  将val更新.value属性上
 * 
 * 
 * @param {any} obj - 要设置值的对象。
 * @param {string[]} keyPath - 表示路径的键数组。
 * @param {any} val - 要设置的值。
 * @param {boolean} toAsyncValue - 当keyPath是AsyncComputedValue时，是否更新到.value值。
 */
export function setVal(obj: any, keyPath: string[], val: any,toAsyncValue?:boolean) {
    let parent = obj;
    const lastIdx = keyPath.length - 1;
    if(keyPath.length===0){   // 更新到了根节点
        Object.assign(obj,val)
    }else{
      for(let i=0;i<keyPath.length;i++){
        let key = keyPath[i]
        const isMapObj = isMap(parent);
        if (i === lastIdx) {
          // 当keyPath是AsyncComputedValue时，是否更新到.value值。
          if(toAsyncValue===true){
            const curValue = isMapObj ? getMapVal(parent, key) : parent[key];
            if(isAsyncComputedValue(curValue)){
                parent = curValue;     
                key='value'
            }      
          }
          isMapObj ? parent.set(key, val) : (parent[key] = val);
          return;
        }
        const subVal = isMapObj ? getMapVal(parent, key) : parent[key];
        parent = subVal; 

      }
    }
} 
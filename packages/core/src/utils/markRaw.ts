import { SKIP_PROXY_FLAG } from "../consts";


/**
 * 标记一个对象为非响应式，不创建响应式代理
 * 
 * @param obj 
 * @returns 
 */
export function markRaw(obj: any) {
    try{ 
        obj[SKIP_PROXY_FLAG] = true
    }catch{}
    return obj;
}
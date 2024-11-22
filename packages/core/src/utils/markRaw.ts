import { SKIP_PROXY_FLAG } from "../consts";

export type RawObject<T> = T & {
    [SKIP_PROXY_FLAG]: true
}

/**
 * 标记一个对象为非响应式，不创建响应式代理
 * 
 * @param obj 
 * @returns 
 */
export function markRaw<T=any>(obj: T):RawObject<T>{
    try{ 
        // @ts-ignore
        obj[SKIP_PROXY_FLAG] = true
    }catch{}
    return obj as RawObject<T>
}
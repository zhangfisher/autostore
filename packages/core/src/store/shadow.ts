/**
 * 
 * 基于现有的store创建一个shadowStore
 * 
 * shadowStore的所有computed,watch均基于store
 * 
 * 
 * const shadowStore = store.createShadow({
 *     a:computed((state:any)=>state.a+1))
 * }
 * 
 * shadowStore.a
 * 
 * 
 */

import { AutoStore } from "./store";
import { PATH_DELIMITER } from '../consts';
import type { Dict } from "../types"
import { AutoStoreOptions } from "./types";

export function createShadow<T extends Dict>(store: AutoStore<any>, shadowObject: T, options?: AutoStoreOptions<T>): AutoStore<T> {
    const shadowStore = new AutoStore(shadowObject, Object.assign({}, options, {
        getRootScope: () => store.state,
        getShadowStore: () => store
    }))
    // 将操作转到到shadowStore
    store.watch((operate) => {
        shadowStore.operates.emit(operate.path.join(PATH_DELIMITER), operate)
    })
    return shadowStore
}
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
import { isRelPath } from "../utils";
import { ObserverDescriptor } from "../observer/types";

export function createShadow<T extends Dict>(store: AutoStore<any>, shadowObject: T, options?: AutoStoreOptions<T>): AutoStore<T> {
    const shadowStore = new AutoStore(shadowObject, Object.assign({}, options, {
        id: `${store.id}_shadow`,
        getRootScope: () => store.state,
        getShadowStore: () => store,
        debug: store.options.debug,
        onObserverBeforeCreate: (descriptor: ObserverDescriptor<any, any, any>) => {
            //除非显式指定scope，并且scope不能是CURRENT
            // 因为动态创建的observer不能是CURRENT，也不能是相对路径
            const scope = descriptor.options.scope
            if (!scope || isRelPath(scope)) {
                descriptor.options.scope = 'ROOT'
            }
        }
    })) as AutoStore<T>

    // 将操作转到到shadowStore
    store.watch((operate) => {
        shadowStore.operates.emit(operate.path.join(PATH_DELIMITER), operate)
    })
    return shadowStore
}
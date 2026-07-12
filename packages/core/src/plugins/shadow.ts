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

import { PATH_DELIMITER } from "../consts";
import type { AnyAutoStore, Dict } from "../types";
import { isRelPath } from "../utils";
import type { ObserverDescriptor } from "../observer/types";
import { AutoStoreOptions } from "../store/types";
import { AutoStore } from "../store";

export function shadow(store: AnyAutoStore) {
    store.shadow = function <T extends Dict>(state: T, options?: AutoStoreOptions<T>) {
        const shadowStore = new AutoStore(
            state,
            Object.assign({}, options, {
                id: `${store.id}_shadow`,
                getRootScope: () => store.state,
                getShadowStore: () => store,
                debug: store.options.debug,
                shadow: true,
                onObserverBeforeCreate: (descriptor: ObserverDescriptor<any, any, any>) => {
                    //除非显式指定scope，并且scope不能是CURRENT
                    // 因为动态创建的observer不能是CURRENT，也不能是相对路径
                    const scope = descriptor.options.scope;
                    if (!scope || isRelPath(scope)) {
                        descriptor.options.scope = "ROOT";
                    }
                },
            }),
        ) as AutoStore<T>;

        // 将操作转到到shadowStore
        store.watch((operate) => {
            operate.shadow = true;
            shadowStore.operates.emit(operate.path.join(PATH_DELIMITER), operate);
        });
    };
}

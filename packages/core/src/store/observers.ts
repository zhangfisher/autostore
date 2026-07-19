import { ComputedObject } from "../computed/computedObject";
import { AsyncLiteComputedObject } from "../computed/async";
import { SyncComputedObject } from "../computed/sync";
import { AnyObserverDescriptor, AnyObserverObject, ObserverContext } from "../observer/types";
import { AnyAutoStore } from "../types";
import { joinPath } from "../utils/joinPath";
import { WatchObject } from "../watch/watchObject";
// import { AsyncComputedObject } from "../computed/async";
// import { ComputedDescriptor } from "../computed/types";

export type ObserverObjectBuilder = (
    store: AnyAutoStore,
    descriptor: AnyObserverDescriptor,
    context?: ObserverContext,
) => AnyObserverObject | undefined;

export const observers: Record<string, any> = {
    sync: (store: AnyAutoStore, descriptor: AnyObserverDescriptor, context: ObserverContext) => {
        const computedObj = new SyncComputedObject(
            store,
            descriptor,
            context,
        ) as unknown as ComputedObject;
        store.computedObjects.set(computedObj.id, computedObj);
        return computedObj;
    },
    async: (store: AnyAutoStore, descriptor: AnyObserverDescriptor, context: ObserverContext) => {
        const computedObj = new AsyncLiteComputedObject(
            store,
            descriptor,
            context,
        ) as unknown as ComputedObject;
        store.computedObjects.set(computedObj.id, computedObj);
        return computedObj;
    },
    watch: (store: AnyAutoStore, descriptor: AnyObserverDescriptor, context: ObserverContext) => {
        const watchObj = new WatchObject(store, descriptor, context);
        store.watchObjects.set(watchObj.id, watchObj);
        return watchObj;
    },
    schema: (store: AnyAutoStore, descriptor: AnyObserverDescriptor, context: ObserverContext) => {
        if (store.options.configManager) {
            const { path, value } = context;
            const val = store.configManager.add(store, path, value);
            store.configurabled.add(joinPath(path));
            return {
                initial: val,
            };
        } else {
            return {
                initial: descriptor.getter(),
            };
        }
    },
};

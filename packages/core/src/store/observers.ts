import { AsyncComputedObject } from "../computed/async";
import { ComputedObject } from "../computed/computedObject";
import { AsyncLiteComputedObject } from "../computed/liteAsync";
import { SyncComputedObject } from "../computed/sync";
import { ComputedDescriptor } from "../computed/types";
import { AnyObserverDescriptor } from "../observer/types";
import { AnyAutoStore } from "../types";
import { WatchObject } from "../watch/watchObject";

export const observers: Record<string, any> = {
    sync: (store: AnyAutoStore, descriptor: AnyObserverDescriptor, context: any) => {
        const computedObj = new SyncComputedObject(
            store,
            descriptor,
            context,
        ) as unknown as ComputedObject;
        store.computedObjects.set(computedObj.id, computedObj);
        return computedObj;
    },
    async: (store: AnyAutoStore, descriptor: AnyObserverDescriptor, context: any) => {
        const computedObj = new AsyncLiteComputedObject(
            store,
            descriptor,
            context,
        ) as unknown as ComputedObject;
        store.computedObjects.set(computedObj.id, computedObj);
        return computedObj;
    },
    asyncpro: (store: AnyAutoStore, descriptor: AnyObserverDescriptor, context: any) => {
        const computedObj = new AsyncComputedObject(
            store,
            descriptor as ComputedDescriptor,
            context,
        ) as unknown as ComputedObject;
        store.computedObjects.set(computedObj.id, computedObj);
        return computedObj;
    },
    watch: (store: AnyAutoStore, descriptor: AnyObserverDescriptor, context: any) => {
        const watchObj = new WatchObject(store, descriptor, context);
        store.watchObjects.set(watchObj.id, watchObj);
        return watchObj;
    },
};

import { ComputedObject } from "../computed/computedObject";
import { AsyncComputedObject } from "../computed/async";
import { SyncComputedObject } from "../computed/sync";
import { AnyObserverDescriptor, AnyObserverObject, ObserverContext } from "../observer/types";
import { AnyAutoStore } from "../types";
import { addConfigueableItem } from "../schema/utils";

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
        const computedObj = new AsyncComputedObject(
            store,
            descriptor,
            context,
        ) as unknown as ComputedObject;
        store.computedObjects.set(computedObj.id, computedObj);
        return computedObj;
    },
    schema: (store: AnyAutoStore, descriptor: AnyObserverDescriptor, context: ObserverContext) => {
        if (typeof store.options.configManager === 'object') {
            return {
                initial:addConfigueableItem(store,descriptor,context),
            };
        } else {
            // 自动指定配置管理器
            // configManager继承自AutoStore,实例化AutoStore时会导致循环依赖问题
            // 所以需要先将configurable项先存入临时
            const configManager = store.options.configManager
            const isConfigSource:boolean=typeof(configManager)==='object' && 'load' in configManager
            if(configManager===true || isConfigSource){
                // @ts-expect-error                
                if(!store._tmp_schemas){
                    // @ts-expect-error
                    store._tmp_schemas=[]
                }
                // @ts-expect-error
                store._tmp_schemas.push([descriptor,context])
            }
            return {
                initial: descriptor.getter(),
            };
        }
    },
};
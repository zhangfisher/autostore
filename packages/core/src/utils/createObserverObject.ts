import { AsyncComputedObject } from "../computed/async"
import { computed } from "../computed/computed"
import { SyncComputedObject } from "../computed/sync"
import type { AutoStore } from "../store/store"
import { Dict, ObserverBuilder } from "../types"
import { WatchObject } from "../watch/watchObject"
import { isObserverDescriptor } from "./isObserverDescriptor"
import { isObserverDescriptorBuilder } from "./isObserverDescriptorBuilder"

export function createObserverObject<State extends Dict,Value=any,Scope=any>(
    store:AutoStore<State>,
    builder:ObserverBuilder<State>
):AsyncComputedObject<Value,Scope> | SyncComputedObject<Value,Scope> | WatchObject<Value> | undefined  {
    const descriptor = isObserverDescriptorBuilder(builder) ?  builder() :  builder
    if(isObserverDescriptor(descriptor)){
        descriptor.options.objectify = false // 不保存到computedObjects
        if(descriptor.type==='computed'){
            return store.computedObjects.create(descriptor as any)
        }else if(descriptor.type==='watch'){
            return store.watchObjects.create(descriptor as any)
        }
    }else{
        const builder = computed(descriptor as any)
        const descr = builder()
        descr.options.objectify = false
        return store.computedObjects.create(descr)
    }          
}

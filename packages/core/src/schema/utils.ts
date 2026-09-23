import { AnyObserverDescriptor, ObserverContext } from "../observer";
import type { AutoStore } from "../store";
import { AnyAutoStore } from "../types";
import { joinPath } from "../utils/joinPath";

export function getErrorTips(this: AutoStore<any>, errorTips: any, path: string, newValue: any, oldValue: any) {
	if (errorTips) {
		if (typeof errorTips === "function") {
			return errorTips.call(this, path, newValue, oldValue);
		} else {
			return errorTips;
		}
	}
	return `invalid value on path: ${path}`;
}

export function getDataType(value: any) {
	return Array.isArray(value)
		? "array"
		: value === null
			? "any"
			: value === undefined
				? "any"
				: value instanceof Date
					? "date"
					: typeof value;
}

export function addConfigueableItem(store: AnyAutoStore, descriptor: AnyObserverDescriptor, context: ObserverContext){
    const { path, value } = context;
    const val = store.configManager.add(store, path, value);
    store.configurabled.add(joinPath(path));
    return val
}

export function createSelfConfigManager(store:AnyAutoStore){
    // @ts-ignore
    if(store.options.configManager===true && store._tmp_schemas){
        store.options.configKey='';
        // @ts-ignore
        (store._tmp_schemas  as [AnyObserverDescriptor,ObserverContext][]).forEach(([descriptor,context])=>{
            addConfigueableItem(store,descriptor,context)
        })
        // @ts-ignore
        delete store._tmp_schemas
    }    
}

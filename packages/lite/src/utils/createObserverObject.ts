import type { AsyncComputedObject } from "../computed/async";
import { computed } from "../computed/computed";
import type { SyncComputedObject } from "../computed/sync";
import type { ObserverBuilder } from "../observer/types";
import type { AutoStore } from "../store/store";
import type { Dict } from "../types";
import type { WatchObject } from "../watch/watchObject";
import { isObserverDescriptor } from "./isObserverDescriptor";
import { isObserverDescriptorBuilder } from "./isObserverDescriptorBuilder";

export function createObserverObject<State extends Dict, Value = any, Scope = any>(
	store: AutoStore<State>,
	builder: ObserverBuilder<State>,
	options?: Dict,
): AsyncComputedObject<Value, Scope> | SyncComputedObject<Value, Scope> | WatchObject<Value> | undefined {
	const descriptor = isObserverDescriptorBuilder(builder) ? builder() : builder;
	if (isObserverDescriptor(descriptor)) {
		descriptor.options.objectify = false; // 不保存到computedObjects
		Object.assign(descriptor.options, options);
		if (descriptor.type === "computed") {
			return store.computedObjects.create(descriptor as any);
		} else if (descriptor.type === "watch") {
			return store.watchObjects.create(descriptor as any);
		}
	} else if (typeof descriptor === "function") {
		const builder = computed(descriptor as any);
		const descr = builder();
		descr.options.objectify = false;
		Object.assign(descr.options, options);
		return store.computedObjects.create(descr);
	}
}

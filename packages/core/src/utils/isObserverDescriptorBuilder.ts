import { OBSERVER_DESCRIPTOR_BUILDER_FLAG } from "../consts";
import type { ObserverDescriptorBuilder } from "../observer/types";

export function isObserverDescriptorBuilder(value: any): value is ObserverDescriptorBuilder {
	return typeof value === "function" && value[OBSERVER_DESCRIPTOR_BUILDER_FLAG] === true;
}

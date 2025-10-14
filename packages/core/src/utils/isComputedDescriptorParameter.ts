import type { ComputedDescriptorParameter } from "../computed/types";
import { isObserverDescriptor } from "./isObserverDescriptor";
import { isObserverDescriptorBuilder } from "./isObserverDescriptorBuilder";

export function isComputedDescriptorParameter(val: any): val is ComputedDescriptorParameter {
	return isObserverDescriptor(val) || isObserverDescriptorBuilder(val);
}

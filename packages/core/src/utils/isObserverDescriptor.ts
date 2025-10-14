/** biome-ignore-all lint/suspicious/noPrototypeBuiltins: <noPrototypeBuiltins> */
import type { ObserverDescriptor } from "../observer/types";

export function isObserverDescriptor(obj: any): obj is ObserverDescriptor<any, any, any> {
	return (
		typeof obj === "object" &&
		obj.hasOwnProperty("type") &&
		typeof obj.type === "string" &&
		obj.hasOwnProperty("getter") &&
		typeof obj.getter === "function" &&
		obj.hasOwnProperty("options") &&
		typeof obj.options === "object"
	);
}

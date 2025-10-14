import type { AsyncComputedValue } from "../computed/types";
import { ASYNC_COMPUTED_VALUE } from "../consts";

export function isAsyncComputedValue(value: any): value is AsyncComputedValue {
	return (
		value &&
		typeof value === "object" &&
		// biome-ignore lint/suspicious/noPrototypeBuiltins: <noPrototypeBuiltins>
		value.hasOwnProperty(ASYNC_COMPUTED_VALUE)
	);
}

// biome-ignore lint/complexity/noBannedTypes: <noBannedTypes>
export function isFunction(value: any): value is Function {
	if (!value) return false;
	return typeof value === "function";
}

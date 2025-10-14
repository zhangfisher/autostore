import { PATH_DELIMITER } from "../consts";
import { getMapVal } from "./getMapVal";
import { isMap } from "./isMap";

export function getVal(obj: any, keyPath: string | string[] | undefined, defaultValue?: any): any {
	if (!keyPath) return obj;
	if (keyPath.length === 0) return obj;
	const paths: string[] = Array.isArray(keyPath) ? keyPath : keyPath.split(PATH_DELIMITER);
	// biome-ignore lint/suspicious/noImplicitAnyLet: <noImplicitAnyLet>
	let val;
	let parent = obj;

	for (let i = 0; i < paths.length; i++) {
		const key = paths[i];
		if (isMap(parent)) {
			val = getMapVal(parent, key);
		} else {
			if (key in parent) {
				val = parent[key];
			} else {
				return defaultValue;
			}
		}
		parent = val;
	}
	return val;
}

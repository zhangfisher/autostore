/**
 * 深度遍历对象
 *
 * 对遍历对象的每一个属性值调用fn，如果是对象和数组，则会进行递归遍历
 *
 *
 *
 * @param obj
 * @param fn  ({value:any,key:string[],parent:object})=>void
 */

import type { Dict } from "../types";
import { isRaw } from "./isRaw";

export type ForEachObjectCallback<T extends Dict> = (params: {
	key: string;
	value: any;
	path: string[];
	parent: T;
}) => void;
export function forEachObject<T extends Dict>(obj: T, callback?: ForEachObjectCallback<T>) {
	function _forEachObject(obj: T, key: string[]) {
		for (const k in obj) {
			const value = obj[k];
			if (typeof callback === "function") {
				callback({ value, key: k, parent: obj, path: key.concat(k) });
			}
			if (typeof value === "object" && !isRaw(value)) {
				_forEachObject(value, key.concat(k));
			}
		}
	}
	_forEachObject(obj, []);
}

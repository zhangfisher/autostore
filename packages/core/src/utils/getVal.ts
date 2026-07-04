import { PATH_DELIMITER } from "../consts";
import { getMapVal } from "./getMapVal";
import { isMap } from "./isMap";

/**
 * 根据路径从对象中安全地读取深层属性值。
 *
 * 支持以点号分隔的字符串路径（如 `"a.b.c"`）或路径段数组（如 `["a","b","c"]`），
 * 依次深入访问目标对象。当任一路径段在当前层级不存在时，立即返回 `defaultValue`，
 * 避免抛出读取 `undefined` 属性导致的异常。
 *
 * 路径中遇到 `Map` 实例时，会自动通过 `getMapVal` 按 key 读取；
 * 数组同样按索引（数字字符串）访问。
 *
 * @param obj - 待读取的目标对象。
 * @param keyPath - 属性路径，支持点号分隔字符串、路径段数组或空值；
 *                  为空（`undefined` / `null` / `""` / `[]`）时直接返回 `obj`。
 * @param defaultValue - 路径不存在时返回的默认值，缺省时为 `undefined`。
 * @returns 路径对应的值；若路径任一段不存在则返回 `defaultValue`。
 *
 * @example
 * ```ts
 * const obj = { a: { b: { c: 1 } }, list: [10, 20, 30] };
 * getVal(obj, 'a.b.c');            // 1
 * getVal(obj, ['a', 'b', 'c']);    // 1
 * getVal(obj, 'a.list.0');         // 10（数组成员访问）
 * getVal(obj, 'a.list.5', '默认'); // '默认'（越界返回默认值）
 * getVal(obj, 'a.x', '默认');      // '默认'
 * ```
 */
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

/**
 * 判断输入是否为有效的对象路径。
 *
 * @description
 * - 以 `.` 作为路径分隔符（`.` 在正则中需转义）
 * - 路径结构必须合法：非空、不以 `.` 开头或结尾、不含连续的 `..`
 * - 由于对象 key 允许任意字符，除 `.` 外的其他字符（含连字符、空格、中文、符号等）均视为合法段字符
 * - 非字符串输入一律返回 false
 *
 * @example
 * isStatePath('user.name')     // true
 * isStatePath('user-name')     // true（连字符是合法 key 字符）
 * isStatePath('items.0.name')  // true
 * isStatePath('')              // false
 * isStatePath('.user')         // false
 * isStatePath('user..name')    // false
 * isStatePath(null)            // false
 *
 * @param input 待检测的值
 * @returns 是否为有效的对象路径
 */
const STATE_PATH_RE = /^[^.]+(?:\.[^.]+)*$/;

export function isStatePath(input: unknown): input is string {
	if (typeof input !== "string") return false;
	return STATE_PATH_RE.test(input);
}

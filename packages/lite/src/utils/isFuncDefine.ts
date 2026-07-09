/**
 * 在schema中，如果值是一个字符串，且以```function```开头，则认为是函数定义
 *
 * @param str
 * @returns
 */
export function isFuncDefine(val: any): val is string {
	return typeof val === "string" && val.startsWith("```") && val.endsWith("```");
}

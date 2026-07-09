export function isNumber(value: any): value is number {
	// 使用Number.isNaN来检查NaN，因为parseInt(value)可能返回NaN，但Number.isNaN(parseInt(value))会准确地检查是否为NaN
	return (
		// biome-ignore lint/correctness/useParseIntRadix: <useParseIntRadix>
		typeof value === "number" || (typeof value === "string" && !Number.isNaN(parseInt(value)))
	);
}

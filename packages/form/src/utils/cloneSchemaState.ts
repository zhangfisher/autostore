/**
 * 深拷贝状态定义对象，用于 AutoForm 内部创建 AutoStore
 *
 * 为什么不用 structuredClone：
 * - 状态定义中的 configurable()/computed() 是函数，structuredClone 遇函数抛 DataCloneError
 * - AutoStore 建立响应式时会原位消费 builder（替换为初始值），
 *   直接传入外部持有的原始对象会把它"用掉"，导致后续重建拿到 0 个 schema
 *
 * 拷贝规则：
 * - 普通对象/数组：递归拷贝
 * - 函数（schema/computed/watch builder 等）：保留引用，原样传递
 * - 原始值：直接返回
 */
export function cloneSchemaState<T>(obj: T): T {
	if (Array.isArray(obj)) {
		return obj.map((item) => cloneSchemaState(item)) as unknown as T;
	}
	if (obj !== null && typeof obj === "object") {
		const result: Record<string, any> = {};
		for (const key of Object.keys(obj as Record<string, any>)) {
			result[key] = cloneSchemaState((obj as Record<string, any>)[key]);
		}
		return result as unknown as T;
	}
	// 原始值与函数：保留引用
	return obj;
}

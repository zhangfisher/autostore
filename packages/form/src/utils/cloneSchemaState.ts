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
 * - schema builder（configurable()）：重建为新 builder，闭包内的 options 深拷贝——
 *   ConfigManager.add 会原位写入 default/value/errorMessage 等字段，多个表单共享
 *   同一 builder 时闭包 options 被首个表单消费污染，后续表单构造直接抛错（0 schema）
 * - 其他函数（computed/watch builder 等）：保留引用，原样传递
 * - 原始值：直接返回
 */
import { OBSERVER_TYPE_FLAG } from "autostore";

export function cloneSchemaState<T>(obj: T): T {
	if (Array.isArray(obj)) {
		return obj.map((item) => cloneSchemaState(item)) as unknown as T;
	}
	if (typeof obj === "function") {
		// 仅 schema builder 需要隔离闭包状态；其余函数（computed/watch 等）无原位写入，保留引用
		if ((obj as any)[OBSERVER_TYPE_FLAG] === "schema") {
			const original = obj as any;
			const cloned = (...args: any[]) => {
				const descriptor = original(...args);
				if (descriptor && typeof descriptor === "object") {
					return {
						...descriptor,
						options: cloneSchemaState(descriptor.options),
					};
				}
				return descriptor;
			};
			cloned[OBSERVER_TYPE_FLAG] = "schema";
			return cloned as unknown as T;
		}
		return obj;
	}
	if (obj !== null && typeof obj === "object") {
		const result: Record<string, any> = {};
		for (const key of Object.keys(obj as Record<string, any>)) {
			result[key] = cloneSchemaState((obj as Record<string, any>)[key]);
		}
		return result as unknown as T;
	}
	// 原始值：直接返回
	return obj;
}

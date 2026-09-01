/**
 * Schema 访问抽象层
 *
 * 提供统一的 Schema 数据访问接口，直接使用 ConfigManager 的标准机制
 */

import { type AutoStore, type Dict, type AutoStoreStateSchema, getVal } from 'autostore';

export class SchemaAccessor {
	constructor(private store: AutoStore<Dict>) {}

	/**
	 * 获取指定路径的完整 schema 键（带 configKey 前缀）
	 * @param fieldPath 字段路径数组，如 ['order', 'price']
	 * @returns 完整的 schema 键，如 'app.order.price'
	 */
	getFullPath(fieldPath: string[]): string {
		const configKey = this.store.options.configKey || '';
		return configKey ? `${configKey}.${fieldPath.join('.')}` : fieldPath.join('.');
	}

	/**
	 * 从 configManager.state 获取 schema 配置
	 * @param fieldPath 字段路径数组
	 * @returns Schema 配置或 undefined
	 */
	getSchema(fieldPath: string[]): AutoStoreStateSchema | undefined {
		const fullPath = this.getFullPath(fieldPath);
		// configManager.state[fullPath] 存的就是 schema options 本身
		return this.store.configManager?.state[fullPath] as AutoStoreStateSchema | undefined;
	}

	/**
	 * 获取所有相关的 schemas（带 configKey 前缀过滤）
	 * @returns 过滤后的 schemas 对象，键为相对路径
	 */
	getAllSchemas(): Record<string, AutoStoreStateSchema> {
		console.log('[SchemaAccessor] 开始获取 schemas');
		console.log('[SchemaAccessor] store.id:', this.store.id);
		console.log('[SchemaAccessor] store.configKey:', (this.store as any).configKey);
		console.log('[SchemaAccessor] store.options.configKey:', this.store.options.configKey);

		const configManager = this.store.configManager;
		if (!configManager) {
			console.warn('[SchemaAccessor] configManager 不存在！');
			return {};
		}

		// 使用 store.configKey getter 来获取实际的 configKey
		const configKey = (this.store as any).configKey || '';
		const keyPrefix = configKey ? `${configKey}.` : '';

		console.log('[SchemaAccessor] 实际 configKey:', configKey);
		console.log('[SchemaAccessor] keyPrefix:', keyPrefix);
		console.log('[SchemaAccessor] configManager.state keys:', Object.keys(configManager.state));

		const schemas: Record<string, AutoStoreStateSchema> = {};
		Object.entries(configManager.state).forEach(([key, schema]) => {
			if (key.startsWith(keyPrefix)) {
				const relativeKey = key.substring(keyPrefix.length);
				// configManager.state[key] 存的就是 schema options 本身
				// （ConfigManager.add 中 this.state[joinPath(configKey)] = descriptor.options）
				schemas[relativeKey] = schema as AutoStoreStateSchema;
				console.log(`[SchemaAccessor] ✅ 匹配: ${key} → ${relativeKey}`);
			}
		});

		console.log('[SchemaAccessor] 最终 schemas:', schemas);
		return schemas;
	}

	/**
	 * 获取字段值（直接从 store.state 获取）
	 * @param fieldPath 字段路径数组
	 * @returns 字段当前值
	 */
	getFieldValue(fieldPath: string[]): any {
		// 直接从 store.state 获取当前值
		return getVal(this.store.state, fieldPath);
	}

	/**
	 * 设置字段值（通过 schema.value 代理）
	 * @param fieldPath 字段路径数组
	 * @param value 要设置的值
	 */
	setFieldValue(fieldPath: string[], value: any): void {
		const fullPath = this.getFullPath(fieldPath);
		const schema = this.store.configManager?.state[fullPath];
		if (schema && schema.value !== undefined) {
			schema.value = value; // 触发代理，自动更新 store.state
		}
	}

	/**
	 * 检查字段路径是否有效
	 * @param fieldPath 字段路径数组
	 * @returns 是否存在对应的 schema
	 */
	hasSchema(fieldPath: string[]): boolean {
		return !!this.getSchema(fieldPath);
	}

	/**
	 * 获取验证错误信息
	 * @param fieldPath 字段路径数组
	 * @returns 错误信息字符串
	 */
	getFieldError(fieldPath: string[]): string | undefined {
		const fullPath = this.getFullPath(fieldPath);
		const configManager = this.store.configManager;
		return configManager?.errors[fullPath];
	}
}
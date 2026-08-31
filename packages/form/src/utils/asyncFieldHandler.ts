/**
 * 异步字段处理器
 *
 * 提供异步计算字段的支持和工具函数
 */

import { type AutoStore, type Dict } from 'autostore';
import { asyncComputed } from '@autostorejs/plugins/asyncpro';

export class AsyncFieldHandler {
	/**
	 * 创建异步计算字段
	 * @param store AutoStore 实例
	 * @param fieldPath 字段路径数组
	 * @param asyncFn 异步计算函数
	 * @param dependencies 依赖项路径数组
	 * @param options asyncComputed 配置选项
	 */
	static createAsyncComputedField<T>(
		store: AutoStore<Dict>,
		fieldPath: string[],
		asyncFn: (scope: any) => Promise<T>,
		dependencies: string[],
		options?: any
	) {
		// 创建 asyncComputed descriptor
		const descriptor = asyncComputed(asyncFn, dependencies, options || {
			timeout: 8000,
			retry: 2
		});

		// 注册到 configManager
		const fullPath = fieldPath.join('.');
		store.configManager?.add(store, fullPath, descriptor as any);

		// 返回 descriptor 用于后续使用
		return descriptor;
	}

	/**
	 * 订阅异步值变化（简化版本）
	 * @param asyncValue 异步计算值
	 * @param callback 值变化回调
	 */
	static subscribeToAsyncValue<T>(
		asyncValue: any,
		callback: (value: T) => void
	): () => void {
		// 触发异步计算
		asyncValue.run();

		// 简单的轮询检查（实际项目中应使用 AutoStore 的 watch 机制）
		let completed = false;
		const watcher = setInterval(() => {
			if (!asyncValue.loading && !completed) {
				if (!asyncValue.error) {
					callback(asyncValue.value);
					completed = true;
				}
				clearInterval(watcher);
			}
		}, 100);

		return () => {
			clearInterval(watcher);
			asyncValue.cancel?.();
		};
	}

	/**
	 * 获取异步状态的显示信息
	 * @param asyncValue 异步计算值
	 */
	static getAsyncState<T>(asyncValue: any): {
		loading: boolean;
		progress: number;
		error?: Error;
		value?: T;
	} {
		return {
			loading: asyncValue.loading || false,
			progress: asyncValue.progress || 0,
			error: asyncValue.error,
			value: asyncValue.value
		};
	}

	/**
	 * 为字段创建带进度条的异步计算
	 */
	static createProgressiveAsyncField<T>(
		store: AutoStore<Dict>,
		fieldPath: string[],
		asyncFn: (scope: any, helpers: any) => Promise<T>,
		dependencies: string[]
	) {
		const descriptor = asyncComputed(
			asyncFn,
			dependencies,
			{
				timeout: [10000, 100], // 10秒超时，100ms倒计时间隔
				retry: [3, 1000],      // 3次重试，1秒间隔
				immediate: true        // 立即执行
			}
		);

		const fullPath = fieldPath.join('.');
		store.configManager?.add(store, fullPath, descriptor as any);

		return descriptor;
	}
}
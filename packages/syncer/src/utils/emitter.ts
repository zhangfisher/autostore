import mitt, { Emitter } from 'mitt';

/**
 * 小型事件发射器
 * 基于 mitt 实现，提供类型安全的事件系统
 *
 * @example
 * ```ts
 * type Events = {
 *   'user:login': { id: string; name: string }
 *   'user:logout': void
 * }
 *
 * const emitter = new SmallEventEmitter<Events>()
 *
 * // 监听事件并获取取消订阅函数
 * const subscription = emitter.on('user:login', (data) => {
 *   console.log(data.id, data.name)
 * })
 *
 * // 触发事件
 * emitter.emit('user:login', { id: '1', name: 'zhang' })
 *
 * // 取消订阅
 * subscription.off()
 * ```
 */
export class EventEmitter<Events extends Record<string, any> = Record<string, any>> {
	/** 私有的 mitt 实例 */
	#mitt: Emitter<Events>;

	constructor() {
		this.#mitt = mitt<Events>();
	}

	/**
	 * 监听事件
	 * @param type - 事件名称
	 * @param handler - 事件处理函数
	 * @returns 取消订阅的函数
	 */
	on<K extends keyof Events>(
		type: K,
		handler: (event: Events[K]) => void,
	): { off: () => void } {
		this.#mitt.on(type, handler);
		return {
			off: () => this.#mitt.off(type, handler),
		};
	}

	/**
	 * 移除事件监听
	 * @param type - 事件名称
	 * @param handler - 事件处理函数
	 */
	off<K extends keyof Events>(
		type: K,
		handler: (event: Events[K]) => void,
	): void {
		this.#mitt.off(type, handler);
	}

	/**
	 * 触发事件
	 * @param type - 事件名称
	 * @param event - 事件数据
	 */
	emit<K extends keyof Events>(type: K, event: Events[K]): void {
		this.#mitt.emit(type, event);
	}

	/**
	 * 监听所有事件
	 * @param handler - 事件处理函数
	 * @returns 取消订阅的函数
	 */
	onAny(handler: (type: keyof Events, event: any) => void): { off: () => void } {
		this.#mitt.on('*', handler as any);
		return {
			off: () => this.#mitt.off('*', handler as any),
		};
	}

	/**
	 * 移除所有事件监听
	 */
	clear(): void {
		this.#mitt.all.clear();
	}

	/**
	 * 获取所有事件监听器（用于调试）
	 */
	get all() {
		return this.#mitt.all;
	}
}

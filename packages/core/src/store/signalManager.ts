/**
 * SignalManager - 路径到 Signal 的映射管理器
 *
 * 这个类负责将 AutoStore 的路径系统映射到 alien-signals 的 Signal 系统，
 * 实现混合架构的核心适配逻辑。
 */

import { signal, type Signal } from 'alien-signals';
import type { AutoStore } from './store';

/**
 * 路径信号包装器
 */
interface PathSignalWrapper<T = any> {
    signal: Signal<T>;
    path: string[];
    pathKey: string;
    isActive: boolean;
}

/**
 * Signal 管理器配置选项
 */
export interface SignalManagerOptions {
    delimiter?: string;
    debug?: boolean;
}

/**
 * Signal 管理器类
 *
 * 负责管理 AutoStore 路径与 alien-signals Signal 之间的映射关系，
 * 提供高效的依赖追踪和更新机制。
 */
export class SignalManager {
    private pathSignals = new Map<string, PathSignalWrapper>();
    private delimiter: string;
    private debug: boolean;
    private store: AutoStore<any>;

    constructor(store: AutoStore<any>, options: SignalManagerOptions = {}) {
        this.store = store;
        this.delimiter = options.delimiter || '.';
        this.debug = options.debug || false;
    }

    /**
     * 获取或创建路径对应的 Signal
     *
     * @param path - 状态路径，如 ['user', 'name']
     * @param initialValue - 初始值（可选）
     * @returns Signal 实例
     */
    getSignal<T = any>(path: string[], initialValue?: T): Signal<T> {
        const pathKey = this.getPathKey(path);

        if (!this.pathSignals.has(pathKey)) {
            if (false && this.debug) { // 暂时关闭详细日志
                console.log(`[SignalManager] Creating signal for path: ${pathKey}`);
            }

            const newSignal = signal(initialValue);
            const wrapper: PathSignalWrapper<T> = {
                signal: newSignal,
                path,
                pathKey,
                isActive: true
            };

            this.pathSignals.set(pathKey, wrapper);
            return newSignal;
        }

        return this.pathSignals.get(pathKey)!.signal as Signal<T>;
    }

    /**
     * 检查路径是否已有对应的 Signal
     *
     * @param path - 状态路径
     * @returns 是否存在 Signal
     */
    hasSignal(path: string[]): boolean {
        const pathKey = this.getPathKey(path);
        return this.pathSignals.has(pathKey);
    }

    /**
     * 设置 Signal 的值并触发更新
     *
     * @param path - 状态路径
     * @param value - 新值
     */
    setSignalValue<T = any>(path: string[], value: T): void {
        const pathKey = this.getPathKey(path);
        const wrapper = this.pathSignals.get(pathKey);

        if (wrapper && wrapper.isActive) {
            if (false && this.debug) { // 暂时关闭详细日志
                console.log(`[SignalManager] Setting signal value: ${pathKey} =`, value);
            }
            wrapper.signal.value = value;
        } else {
            // 如果 Signal 不存在，创建新的 Signal
            const newSignal = this.getSignal<T>(path, value);
            newSignal.value = value;
        }
    }

    /**
     * 获取 Signal 的当前值
     *
     * @param path - 状态路径
     * @returns 当前值，如果 Signal 不存在则返回 undefined
     */
    getSignalValue<T = any>(path: string[]): T | undefined {
        const pathKey = this.getPathKey(path);
        const wrapper = this.pathSignals.get(pathKey);

        if (wrapper && wrapper.isActive) {
            return wrapper.signal.value as T;
        }

        return undefined;
    }

    /**
     * 删除路径对应的 Signal
     *
     * @param path - 状态路径
     */
    deleteSignal(path: string[]): void {
        const pathKey = this.getPathKey(path);
        const wrapper = this.pathSignals.get(pathKey);

        if (wrapper) {
            wrapper.isActive = false;
            this.pathSignals.delete(pathKey);

            if (this.debug) {
                console.log(`[SignalManager] Deleted signal: ${pathKey}`);
            }
        }
    }

    /**
     * 批量删除路径对应的 Signals
     *
     * @param paths - 状态路径数组
     */
    deleteSignals(paths: string[][]): void {
        paths.forEach(path => this.deleteSignal(path));
    }

    /**
     * 清理所有不活跃的 Signals
     */
    cleanup(): void {
        const toDelete: string[] = [];

        this.pathSignals.forEach((wrapper, pathKey) => {
            if (!wrapper.isActive) {
                toDelete.push(pathKey);
            }
        });

        toDelete.forEach(pathKey => {
            this.pathSignals.delete(pathKey);
        });

        if (this.debug && toDelete.length > 0) {
            console.log(`[SignalManager] Cleaned up ${toDelete.length} signals`);
        }
    }

    /**
     * 获取所有活跃的 Signals 数量
     */
    getActiveSignalCount(): number {
        let count = 0;
        this.pathSignals.forEach(wrapper => {
            if (wrapper.isActive) count++;
        });
        return count;
    }

    /**
     * 获取所有 Signals 的信息（用于调试）
     */
    getAllSignalsInfo(): Array<{ pathKey: string; path: string[]; value: any }> {
        const info: Array<{ pathKey: string; path: string[]; value: any }> = [];

        this.pathSignals.forEach(wrapper => {
            if (wrapper.isActive) {
                info.push({
                    pathKey: wrapper.pathKey,
                    path: wrapper.path,
                    value: wrapper.signal.value
                });
            }
        });

        return info;
    }

    /**
     * 将路径数组转换为路径键
     *
     * @param path - 状态路径
     * @returns 路径键字符串
     */
    private getPathKey(path: string[]): string {
        return path.join(this.delimiter);
    }

    /**
     * 销毁管理器，清理所有资源
     */
    destroy(): void {
        if (this.debug) {
            console.log('[SignalManager] Destroying signal manager');
        }

        this.pathSignals.clear();
    }
}
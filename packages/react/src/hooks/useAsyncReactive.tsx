import {
    type AsyncComputedValue,
    getComputedType,
    isAsyncComputedValue,
    type Dict,
    type Watcher,
} from 'autostore';
import type { ReactAutoStore } from '../store';
import { useEffect, useState } from 'react';
import { getValueBySelector } from '../utils/getValueBySelector';
import { wrapAsyncComputedValue } from '../utils/wrapAsyncComputedValue';
import type { UseAsyncReactiveType } from './types';

/**
 *
 *  访问异步计算属性hook
 *
 * @example
 *
 * 如果输入路径所指向的状态是一个异步计算属性
 *
 * 例如："book.orders"是一个异步计算属性，则此值是book.orders== { value,loading,timeout, run, cancel,.....}
 *
 * const { value,loading,timeout,.... } = useAsyncReactive("book.orders")
 *
 * @description
 *
 * 同时支持两种异步计算属性：
 *
 * - 高级异步计算(asyncComputed声明)：状态值本身就是AsyncComputedValue对象，直接返回
 * - 简单异步计算(computed(async...)声明)：计算结果原位写入（标量值），
 *   此时会包装为一个AsyncComputedValue形态的对象返回，loading/error通过
 *   observer/${id}/run|done|error事件驱动更新
 *
 */
export function createUseAsyncReactive<State extends Dict>(store: ReactAutoStore<State>) {
    return function () {
        const args = arguments;
        const selector =
            args.length >= 1 &&
            (Array.isArray(args[0]) || typeof args[0] === 'string' || typeof args[0] === 'function')
                ? args[0]
                : undefined;

        // selector指向的路径对应的计算对象（简单异步时用于同步运行状态与绑定run/cancel）
        const computedObj =
            typeof selector === 'string' || Array.isArray(selector)
                ? store.computedObjects.find(selector)
                : undefined;

        const computedType =
            typeof selector === 'string' || (Array.isArray(selector) && selector.length > 0)
                ? getComputedType(store, selector)
                : 'none';

        const [result, setResult] = useState<AsyncComputedValue>(() => {
            const val = getValueBySelector(store, selector);
            if (isAsyncComputedValue(val)) {
                return val;
            } else {
                // 简单异步计算：结果原位写入，包装为AsyncComputedValue形态（同步当前loading/error）
                return wrapAsyncComputedValue(val, computedObj);
            }
        });

        // 注意：
        // - 高级异步计算属性(含asyncpro插件)的状态值是AsyncComputedValue对象，需要监听其所有子属性(.*)
        // - 简单异步计算属性的结果原位写入，直接监听该路径即可
        const deps = store.useDeps(selector, computedType === 'async' ? 'all' : 'none');

        useEffect(() => {
            const watchers: Watcher[] = [];
            watchers.push(
                store.watch(deps, () => {
                    const val = getValueBySelector(store, selector);
                    // 高级异步：浅拷贝生成新引用触发重渲染；简单异步：包装并同步运行状态
                    setResult(
                        isAsyncComputedValue(val)
                            ? { ...val }
                            : wrapAsyncComputedValue(val, computedObj),
                    );
                }),
            );
            // 简单异步计算：通过observer事件驱动loading/error更新
            if (computedType === 'lite-async' && computedObj) {
                watchers.push(
                    store.on(`observer/${computedObj.id}/run`, () => {
                        setResult((prev: any) => ({ ...prev, loading: true }));
                    }),
                );
                watchers.push(
                    store.on(`observer/${computedObj.id}/done`, ({ value }: any) => {
                        setResult((prev: any) => ({
                            ...prev,
                            loading: false,
                            error: null,
                            value,
                        }));
                    }),
                );
                watchers.push(
                    store.on(`observer/${computedObj.id}/error`, ({ error }: any) => {
                        setResult((prev: any) => ({ ...prev, loading: false, error }));
                    }),
                );
            }
            return () => {
                watchers.forEach((w) => w.off());
            };
        }, [deps]);

        /**
         * 订阅前若首次计算已在飞行中（immediate的setTimeout(0)先于useEffect），
         * 首帧loading会丢失，此处在订阅时校正一次
         */
        useEffect(() => {
            if (computedType === 'lite-async' && computedObj?.running) {
                setResult((prev: any) =>
                    prev.loading === true ? prev : { ...prev, loading: true },
                );
            }
        }, []);

        return result;
    } as unknown as UseAsyncReactiveType<State>;
}

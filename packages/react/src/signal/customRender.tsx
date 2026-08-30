import {
    type AsyncComputedValue,
    type Dict,
    getComputedType,
    isAsyncComputedValue,
    PATH_DELIMITER,
    type Watcher,
} from 'autostore';
import type { ReactAutoStore } from '../store';
import React, { type ComponentType, useEffect, useState } from 'react';
import { getValueBySelector } from '../utils/getValueBySelector';
import { wrapAsyncComputedValue } from '../utils/wrapAsyncComputedValue';
import type { SignalComponentOptions, SignalComponentRender } from './types';
import { useErrorBoundary } from './errorBoundary';

/**
 *
 * 通过渲染函数创建一个信号组件
 *
 *
 *
 * @example
 *
 * import { createStore } from "@autostorejs/react"
 *
 * const { state, $ } = createStore({
 *    order:{
 *      price: 100,
 *      count:1,
 *      total: computed(async (user)=>{
 *          return user.price + ' ' + user.count
 *      },["price","count"])
 *    }
 * })
 *
 * @example
 *
 *   指定字符串路径，然后自定义渲染函数
 *   $(({value,timeout,loading})=>{
 *      return <div>{value}</div>
 *   },"order.total")
 *   需要注意的是，只有当order.total是一个异步计算属性时，才会有timeout,loading属性
 *
 *
 *
 */
export function createCustomRender<State extends Dict>(
    store: ReactAutoStore<State>,
    render: SignalComponentRender,
    path: string,
    options: SignalComponentOptions,
) {
    return React.memo(
        () => {
            const deps = store.useDeps(path as any, 'none');
            // 简单异步(lite)：error通过observer事件流写入render参数({...,error})，
            // 不走ErrorBoundary替换整个组件；高级异步/同步才启用ErrorBoundary
            const computedType = getComputedType(store, path);
            const [error, setError, ErrorBoundary] = useErrorBoundary(
                store,
                deps,
                computedType === 'lite-async' ? undefined : path,
                options,
            );
            const rawValue = getValueBySelector(store, path, false, setError);
            // 高级异步：状态值本身就是AsyncComputedValue对象；
            // 简单异步(lite)：计算结果原位写入（标量），需要包装为AsyncComputedValue形态供render统一消费
            const isAsync: boolean = isAsyncComputedValue(rawValue);
            const isLiteAsync = !isAsync && computedType === 'lite-async';

            const [value, setValue] = useState<AsyncComputedValue>(() => {
                if (isAsync) return rawValue as AsyncComputedValue;
                // 简单异步：包装时从计算对象同步loading/error
                if (isLiteAsync) {
                    return wrapAsyncComputedValue(
                        rawValue,
                        store.computedObjects.find(path),
                    );
                }
                return { value: rawValue } as AsyncComputedValue;
            });

            useEffect(() => {
                const watchers: Watcher[] = [];
                if (isAsync) {
                    // 高级异步：监听AsyncComputedValue对象的所有子属性变化
                    const watcher = store.watch(
                        `${Array.isArray(path) ? path.join(PATH_DELIMITER) : path}.*`,
                        ({ path: keypath, value: newValue }) => {
                            setValue((prev: any) => ({
                                ...prev,
                                [keypath[keypath.length - 1]]: newValue,
                            }));
                        },
                    );
                    watchers.push(watcher);
                } else if (isLiteAsync) {
                    // 简单异步：结果原位写入，直接监听该路径的值变化
                    watchers.push(
                        store.watch(deps, () => {
                            setValue(
                                wrapAsyncComputedValue(
                                    getValueBySelector(store, path, false, setError),
                                    store.computedObjects.find(path),
                                ),
                            );
                        }),
                    );
                    // loading/error不在值上，仅存在于observer事件流中，需要单独订阅
                    const computedObj = store.computedObjects.find(path);
                    if (computedObj) {
                        watchers.push(
                            store.on(`observer/${computedObj.id}/run`, () => {
                                setValue((prev: any) => ({ ...prev, loading: true }));
                            }),
                        );
                        watchers.push(
                            store.on(`observer/${computedObj.id}/done`, ({ value: doneValue }: any) => {
                                setValue((prev: any) => ({
                                    ...prev,
                                    loading: false,
                                    error: null,
                                    value: doneValue,
                                }));
                            }),
                        );
                        watchers.push(
                            store.on(`observer/${computedObj.id}/error`, ({ error: err }: any) => {
                                setValue((prev: any) => ({ ...prev, loading: false, error: err }));
                            }),
                        );
                        // 订阅前若首次计算已在飞行中(immediate的setTimeout(0)先于useEffect)，
                        // run事件已错过，此处从计算对象同步一次，避免首帧loading丢失
                        if (computedObj.running) {
                            setValue((prev: any) =>
                                prev.loading === true ? prev : { ...prev, loading: true },
                            );
                        }
                    }
                } else {
                    // 普通状态或同步计算：监听值变化（保持{value}包装形态）
                    const watcher = store.watch(deps, () => {
                        setValue({
                            value: getValueBySelector(store, path, false, setError),
                        } as AsyncComputedValue);
                    });
                    watchers.push(watcher);
                }
                return () => {
                    watchers.forEach((w) => w.off());
                };
            }, [deps]);

            return <>{error ? <ErrorBoundary error={error} /> : render(value)}</>;
        },
        () => true,
    );
}

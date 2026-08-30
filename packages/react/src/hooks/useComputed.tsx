/**
 *
 *  在组件中创建计算属性
 *
 * const { value,loading,error } = useComputed((state)=>state.order.price*state.order.count)
 *
 *
 *
 */
import {
    type AsyncComputedValue,
    type ComputedOptions,
    type Dict,
    type Watcher,
} from 'autostore';
import type { ReactAutoStore } from '../store';
import type { UseComputedType } from './types';
import { useEffect, useState } from 'react';
import { wrapAsyncComputedValue } from '../utils/wrapAsyncComputedValue';

export function createUseComputed<State extends Dict>(store: ReactAutoStore<State>) {
    return ((params: any, computedOptions?: ComputedOptions) => {
        const computedObj = store.useComputedObject(params, computedOptions);
        const [value, setValue] = useState<AsyncComputedValue<any>>(() => {
            if (!computedObj) return wrapAsyncComputedValue(undefined);
            return computedObj.async
                ? wrapAsyncComputedValue(computedObj.value)
                : wrapAsyncComputedValue(computedObj.value, computedObj);
        });
        useEffect(() => {
            const watchers: Watcher[] = [];
            if (computedObj) {
                // 值变化：高级异步浅拷贝；简单异步包装时同步运行状态
                watchers.push(
                    computedObj.watch(() => {
                        setValue(
                            computedObj.async
                                ? wrapAsyncComputedValue(computedObj.value)
                                : wrapAsyncComputedValue(computedObj.value, computedObj),
                        );
                    }),
                );
                // 简单异步(游离对象)：loading/error不在值上，仅存在于observer事件流中，需要单独订阅
                if (computedObj.async && (computedObj as any).lite) {
                    watchers.push(
                        store.on(`observer/${computedObj.id}/run`, () => {
                            setValue((prev: any) => ({ ...prev, loading: true }));
                        }),
                    );
                    watchers.push(
                        store.on(`observer/${computedObj.id}/done`, ({ value }: any) => {
                            setValue((prev: any) => ({
                                ...prev,
                                loading: false,
                                error: null,
                                value,
                            }));
                        }),
                    );
                    watchers.push(
                        store.on(`observer/${computedObj.id}/error`, ({ error }: any) => {
                            setValue((prev: any) => ({ ...prev, loading: false, error }));
                        }),
                    );
                }
            }
            return () => {
                watchers.forEach((w) => w.off());
            };
        }, [computedObj]);
        return value;
    }) as UseComputedType<State>;
}

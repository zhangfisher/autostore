import {
    isPathEq,
    type AsyncComputedGetter,
    type AsyncComputedObject,
    type AsyncComputedValue,
    computed,
    type ComputedGetter,
    type Dict,
    isObserverDescriptor,
    isObserverDescriptorBuilder,
    type ObserverDescriptorBuilder,
    type SyncComputedObject,
    type Watcher,
    type WatchObject,
} from 'autostore';
import type { ReactAutoStore } from '../store';
import React, { type ComponentType, useEffect, useState } from 'react';
import { wrapAsyncComputedValue } from '../utils/wrapAsyncComputedValue';
import type { SignalComponentOptions, SignalComponentRender } from './types';

/**
 *
 * 动态创建计算属性，然后渲染信号组件
 *
 * @exam
 *  *  - 指定一个计算同步的getter函数
 *
 *   $(({loading,timeout,value,retry,.....})=>{
 *      return <div>{value}</div></div>
 *   },(state)=>state.order.total)
 *
 *  *  - 指定一个异步计算的getter函数
 *
 *   $(({loading,timeout,value,retry,.....})=>{
 *      return <div>{value}</div></div>
 *   },async (state)=>state.order.total)
 *
 *
 *  - 动态同步计算组件
 *
 *   以上创建的信号组件均基于静态的依赖路径，当依赖变化时，重新计算
 *   也可以动态创建一个计算组件，也就是在动态创建一个计算属性
 *
 *   $(({loading,timeout,value,retry,.....})=>{
 *      return <div>{value}</div></div>
 *   },()=>computed(getter,depends,options))
 *
 *  - 动态异步计算组件
 *
 *   就如何创建异步计算属性一样
 *
 *   $(({value})=>{
 *      return <div>{value}</div></div>
 *   },()=>watch(getter,depends,options)))
 *
 *
 *  关于异步计算的渲染优化
 * 1. 在运行前value.loading=true，触发一次渲染
 * 2. 在运行后value.loading=false,value.value=newvValue，触发两次事件导致2次渲染，如何优化成一次？
 *      - 在run getter内部使用.update(fn,batch:true)来更新计算属性的数据，会触发
 *
 *          batch事件，只需要侦听batch事件即可，当batch事件发生时，只触发一次渲染 *
 *      - 但是如果直接调用state.asyncobj.value更新值，则也会触发渲染
 *
 *
 *
 */
/**
 * 从 builder/getter 参数解析出 observer descriptor
 *
 * 支持的输入形态：
 * - builder 直传：computed(...)/asyncComputed(...)/watch(...) 的返回值（带 OBSERVER_TYPE_FLAG）
 * - 外层函数包裹：() => computed(...) / () => asyncComputed(...)，调用后得到 builder 或直接得到 descriptor
 * - 裸 getter 函数：直接返回，由调用方走 computed() 包装
 */
function resolveDescriptor(
    builder: ObserverDescriptorBuilder | ComputedGetter<any> | AsyncComputedGetter<any>,
) {
    // builder 直传：调用一次得到 descriptor
    if (isObserverDescriptorBuilder(builder)) return (builder as any)();
    // 包裹函数形态：() => computed(...) 恒为0参数，调用后得到 builder（computed 包裹）或 descriptor（asyncpro 等）
    // 注意：裸 getter (scope)=>... 至少有1个参数，绝不能在此调用，
    // 否则会以 scope=undefined 执行用户getter，访问scope.xxx时崩溃
    if (typeof builder === 'function' && builder.length === 0) {
        const unwrapped = (builder as any)();
        if (isObserverDescriptorBuilder(unwrapped)) return unwrapped();
        if (isObserverDescriptor(unwrapped)) return unwrapped;
        // 调用结果是裸值说明是零参getter，回落到裸getter处理（多执行的一次无scope访问，无副作用）
    }
    return builder;
}

export function createDynamicRender<State extends Dict>(
    store: ReactAutoStore<State>,
    render: SignalComponentRender,
    builder: ObserverDescriptorBuilder | ComputedGetter<any> | AsyncComputedGetter<any>,
    options: SignalComponentOptions,
) {
    // @ts-ignore
    const ErrorBoundary: ComponentType<{ error: any }> =
        options.errorBoundary || store.options.signalErrorBoundary;
    return React.memo(
        () => {
            const [error, setError] = useState<any>(null);

            const descriptor = resolveDescriptor(builder);

            // 创建一个计算对象
            const [observerObj] = useState(() => {
                try {
                    if (isObserverDescriptor(descriptor)) {
                        descriptor.options.objectify = false; // 不保存到computedObjects
                        // 计算属性的type是 sync/async/asyncpro（computed()/asyncComputed() 生成的描述符），
                        // 均路由到 computedObjects.create
                        if (
                            ['computed', 'sync', 'async', 'asyncpro'].includes(descriptor.type)
                        ) {
                            return store.computedObjects.create(descriptor as any);
                        } else if (descriptor.type === 'watch') {
                            return store.watchObjects.create(descriptor as any);
                        }
                    } else {
                        const builder = computed(descriptor as any);
                        const descr = builder();
                        descr.options.objectify = false;
                        return store.computedObjects.create(descr);
                    }
                } catch (e) {
                    setError(e);
                    return null;
                }
            });
            const [value, setValue] = useState<AsyncComputedValue>(() => {
                if (!observerObj) return { value: '' } as AsyncComputedValue;
                if (!observerObj.async) return { value: observerObj.value } as AsyncComputedValue;
                // 简单异步(lite)：结果原位写入是标量，无loading/error字段，
                // 此处包装为AsyncComputedValue形态并同步运行状态
                if ((observerObj as any).lite) {
                    return wrapAsyncComputedValue(observerObj.value, observerObj as any);
                }
                // 高级异步：值本身就是AsyncComputedValue对象，浅拷贝生成新引用
                return { ...(observerObj.value as AsyncComputedValue) };
            });

            useEffect(() => {
                // @ts-ignore
                let watcher: Watcher = { off: () => {} };
                const watchers: Watcher[] = [];
                if (observerObj) {
                    // 异步游离对象订阅observer生命周期事件：
                    // - 简单异步(lite)：loading/error不在值上，仅存在于事件流中，必须订阅
                    // - 高级异步(asyncpro)：游离时updateComputedValue直接emit到operates总线，
                    //   与obj.watch监听的observer/updated顶层事件不匹配，也需要事件流兜底
                    if (observerObj.async && !(observerObj as any).associated) {
                        watchers.push(
                            store.on(`observer/${observerObj.id}/run`, () => {
                                setValue((prev: any) => ({ ...prev, loading: true }));
                            }),
                        );
                        watchers.push(
                            store.on(`observer/${observerObj.id}/done`, ({ value: newValue }: any) => {
                                setValue((prev: any) => ({
                                    ...prev,
                                    loading: false,
                                    error: null,
                                    value: newValue,
                                }));
                            }),
                        );
                        watchers.push(
                            store.on(`observer/${observerObj.id}/error`, ({ error: err }: any) => {
                                setValue((prev: any) => ({ ...prev, loading: false, error: err }));
                            }),
                        );
                        // 订阅前若首次计算已在飞行中(immediate的setTimeout(0)先于useEffect)，
                        // run事件已错过，此处从计算对象同步一次，避免首帧loading丢失
                        if (observerObj.running) {
                            setValue((prev: any) =>
                                prev.loading === true ? prev : { ...prev, loading: true },
                            );
                        }
                    }
                    watcher = observerObj.watch(
                        (operate) => {
                            /** 什么要设置reply=true?
                             *  因为异步计算属性的getter运行时会使用批量更新模式，因为一次基本的会触发多次更新事件
                             *  执行前：
                             *    - set loading=false
                             *  执行后:
                             *  - set value=xxx
                             *  - set loading=false
                             *
                             *  然后在batch更新模式下，会分别触发
                             *    - set value=xxx        operate.reply=true
                             *    - set loading=false    operate.reply=true
                             *    - set obj={value.loading,.....}  batch事件
                             *
                             * 这样就最少会触发3次事件，为了避免这种情况，在batchUpdate时会设置operate.reply=true
                             *
                             * 这样在渲染时就只需要忽略掉replay=true的事件，只侦听batch事件即可
                             *
                             *
                             * 如果计算对象的值是通过state.computedItem.value=xxxx而触发的变化事件，则该事件的reply!=true，这样就会触发事件，也可以得到正确的渲染
                             *
                             */
                            if (operate.reply) return;
                            try {
                                // 计算对象的type是 sync/async/asyncpro（'computed'是旧类型名，保留兼容）
                                if (
                                    ['computed', 'sync', 'async', 'asyncpro'].includes(
                                        observerObj.type,
                                    )
                                ) {
                                    if (observerObj.async) {
                                        const asyncObj =
                                            observerObj as unknown as AsyncComputedObject;
                                        if (
                                            isPathEq(operate.path, asyncObj.path) ||
                                            isPathEq(operate.path.slice(0, -1), asyncObj.path)
                                        ) {
                                            // 简单异步(lite)：值是原位标量，包装为AsyncComputedValue形态；
                                            // 高级异步：值本身就是AsyncComputedValue对象，浅拷贝
                                            if ((asyncObj as any).lite) {
                                                setValue(
                                                    wrapAsyncComputedValue(asyncObj.value, asyncObj),
                                                );
                                            } else {
                                                setValue({ ...asyncObj.value });
                                            }
                                        }
                                    } else {
                                        // @ts-ignore
                                        setValue({
                                            value: (observerObj as unknown as SyncComputedObject)
                                                .value,
                                        });
                                    }
                                } else if (observerObj.type === 'watch') {
                                    // @ts-ignore
                                    setValue({
                                        value: (observerObj as unknown as WatchObject).value,
                                    });
                                }
                            } catch (e) {
                                setError(e);
                            }
                        },
                        { operates: 'write' },
                    );
                }
                return () => {
                    watcher.off();
                    watchers.forEach((w) => w.off());
                };
            }, [descriptor]);

            return <>{error ? <ErrorBoundary error={error} /> : render(value)}</>;
        },
        () => true,
    );
}

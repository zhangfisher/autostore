import {
    getComputedType,
    isAsyncComputed,
    isAsyncComputedValue,
    isPlainObject,
    PATH_DELIMITER,
    setVal,
    Watcher,
    type Dict,
} from 'autostore';
import type { ReactAutoStore } from '../store';
import { useCallback, useEffect, useState } from 'react';
import { getValueBySelector } from '../utils/getValueBySelector';
import { UseReactiveExtras, UseReactiveType } from './types';

/**
 *
 *  访问状态数据的hook
 *
 * @example
 *
 * const [price,setPrice ] = useReactive<number>("order.price")
 * const [price,setPrice ] = useReactive<number>(['order','price'])
 *
 * const [fullName,setFullname ] = useReactive<number>(
 *  (state)=>state.firstName+state.lastName,
 *  (value,state)=>{
 *   const [ firstName,lastName ] = value.split(' ')
 *   state.firstName = firstName
 *   state.lastName = lastName
 * })
 *
 * 如果指定的是异步计算,支持加载状态
 * const [price,setPrice,{error,loading}] =  useReactive<number>("order.price")
 *
 * @example
 *
 * 如果输入路径所指向的状态是一个异步计算属性
 *
 * 例如："book.orders"是一个异步计算属性，则此值是book.orders== { value,loading,timeout, run, cancel,.....}
 *
 * useReactive("book.orders")会自动添加'value'，然后侦听获取到book.orders.value的值
 *
 * const [ value, setValue ] = useReactive("book.orders")
 *
 * 一般情况下，这时调用setValue是不建议的，因为异步计算属性是由所依赖的状态数据变化后自动重新计算的
 * 直接更新book.oreder.value，就相当于跳过了计算逻辑，所以直接更新是没有意义的。
 *
 * 但是在某些情况下，比如想为该计算属性提供一个初始值，或者在异步计算时，想先提供一个乐观的值，然后等计算完成后再更新，这些先更新，然后再计算也是可行的。
 * 如果要重新计算，则可以通过run()方法重新计算
 *
 *
 *
 */
export function createUseReactive<State extends Dict>(store: ReactAutoStore<State>) {
    return function () {
        const args = arguments;
        const selector =
            args.length >= 1 &&
            (Array.isArray(args[0]) || typeof args[0] === 'string' || typeof args[0] === 'function')
                ? args[0]
                : undefined;
        const setter = args.length === 2 && typeof args[1] === 'function' ? args[1] : undefined;

        // 是否是异步计算
        const isAsync: boolean =
            args.length === 2 &&
            (typeof selector === 'string' || Array.isArray(selector)) &&
            typeof args[1] === 'boolean'
                ? args[1]
                : false;

        const [value, setValue] = useState(() =>
            getValueBySelector(store, selector, isAsync !== true),
        );

        // 第3个返回值：异步计算的运行状态（loading/error），高级异步计算时还包括响应式的retry/timeout/progress
        const [extras, setExtras] = useState<UseReactiveExtras>(() => ({
            loading: false,
            error: null,
            retry: 0,
            timeout: 0,
            progress: 0,
        }));

        // 注意，如果输入的计算属性是一个异步计算属性，则会自动添加后缀'value'
        const deps = store.useDeps(selector, isAsync === true ? 'all' : 'value');

        useEffect(() => {
            let watcher: Watcher;
            if (deps.length === 0) {
                // 监听整个状态
                watcher = store.watch(({ reply }) => {
                    if (reply) return; // 针对批量操作时的优化
                    setValue({ ...store.state });
                });
            } else {
                watcher = store.watch(deps, () => {
                    // 与初值保持一致：form-1（未声明 async）解包 AsyncComputedValue 取标量值
                    const val = getValueBySelector(store, selector, isAsync !== true);
                    setValue(isPlainObject(val) ? { ...val } : Array.isArray(val) ? [...val] : val);
                });
            }
            return () => watcher.off();
        }, [deps]);
        // 处理异步计算属性的加载中和错误信息
        useEffect(() => {
            const watchers: Watcher[] = [];
            // 当selector是路径且路径指向的是异步计算时才启用Loading
            if (typeof selector === 'string' || (Array.isArray(selector) && selector.length > 0)) {
                const type = getComputedType(store, selector);
                const path = Array.isArray(selector) ? selector.join(PATH_DELIMITER) : selector;
                // 高级异步(asyncComputed声明)的状态值是AsyncComputedValue对象，自带loading用于显示加载状态
                if (type === 'async') {
                    // 高级异步的loading/error/retry/timeout/progress是状态树上的响应式子属性
                    // 监听该路径自身+一级后代(depth=1)，任一变化时从状态树读取最新值生成新的extras触发重渲染
                    const syncExtras = () => {
                        const current = getValueBySelector(store, selector, false);
                        if (!isAsyncComputedValue(current)) return;
                        setExtras((prev) => {
                            const next = {
                                loading: current.loading,
                                error: current.error ?? null,
                                retry: current.retry,
                                timeout: current.timeout,
                                progress: current.progress,
                            };
                            // 值未变化时保持引用不变，避免无意义的重渲染
                            return prev.loading === next.loading &&
                                prev.error === next.error &&
                                prev.retry === next.retry &&
                                prev.timeout === next.timeout &&
                                prev.progress === next.progress
                                ? prev
                                : next;
                        });
                    };
                    watchers.push(store.watch(path, syncExtras, { depth: 1 }));
                    // 订阅前同步一次，避免首帧状态丢失
                    syncExtras();
                } else if (type === 'lite-async') {
                    // 简单异步计算(computed(async...)声明)的结果原位写入，无loading状态
                    // 通过observer生命周期事件驱动loading/error
                    const computedObj = store.computedObjects.find(path);
                    if (computedObj) {
                        watchers.push(
                            store.on(`observer/${computedObj.id}/run`, () => {
                                setExtras((prev) => ({ ...prev, loading: true, error: null }));
                            }),
                        );
                        watchers.push(
                            store.on(`observer/${computedObj.id}/error`, ({ error }: any) => {
                                setExtras((prev) => ({ ...prev, loading: false, error }));
                            }),
                        );
                        watchers.push(
                            store.on(`observer/${computedObj.id}/done`, () => {
                                setExtras((prev) => ({ ...prev, loading: false }));
                            }),
                        );
                        // 订阅前若首次计算已在飞行中(immediate的setTimeout(0)先于useEffect)，
                        // run事件已错过，此处从计算对象同步一次，避免首帧loading丢失
                        if (computedObj.running || computedObj.error) {
                            const running = computedObj.running === true;
                            const error = (computedObj.error ?? null) as Error | null;
                            setExtras((prev) =>
                                prev.loading === running && prev.error === error
                                    ? prev
                                    : { ...prev, loading: running, error },
                            );
                        }
                    }
                }
            }
            return () => {
                watchers.forEach((w) => w.off());
            };
        }, [selector]);

        const updateValue = useCallback(
            (value: any) => {
                if (selector) {
                    if (typeof selector === 'function' && setter) {
                        store.update((state) => setter(value, state));
                    } else {
                        const isAsync = isAsyncComputed(store, selector);
                        // 如果是异步计算才会更新loading状态
                        if (isAsync) {
                            setExtras((prev) => ({ ...prev, loading: true }));
                        }
                        store.update((state) =>
                            setVal(
                                state,
                                Array.isArray(selector) ? selector : selector.split(PATH_DELIMITER),
                                value,
                            ),
                        );
                    }
                } else if (typeof value === 'function') {
                    store.update((state) => value(state), { batch: true });
                }
            },
            [selector],
        );
        return [value, updateValue, extras];
    } as UseReactiveType<State>;
}

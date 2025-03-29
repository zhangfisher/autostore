import { AsyncComputedValue, isAsyncComputedValue, isPlainObject, type Dict } from "autostore";
import type { VueAutoStore } from '../store';
import { ref, watch } from 'vue';
import { getValueBySelector } from '../utils/getValueBySelector';
import { UseAsyncStateType } from './types';

/**
 * 访问异步计算属性hook
 * 
 * @example 
 * 
 * 如果输入路径所指向的状态是一个异步计算属性
 * 
 * 例如："book.orders"是一个异步计算属性，则此值是book.orders == { value,loading,timeout, run, cancel,.....}
 * 
 * const { value, loading, timeout, .... } = useAsyncState("book.orders") 
 */
export function createUseAsyncState<State extends Dict>(store: VueAutoStore<State>) {
    return (function () {
        const args = arguments;
        const selector = args.length >= 1 && (Array.isArray(args[0]) || typeof (args[0]) === 'string' || typeof (args[0]) === 'function') ? args[0] : undefined;
        
        // 创建响应式的结果对象
        const result = ref<AsyncComputedValue>((() => {
            const val = getValueBySelector(store, selector);
            if (isAsyncComputedValue(val)) {
                return val;
            } else {
                return {
                    value: val,
                    loading: false,
                    retry: 0,
                    error: null,
                    timeout: 0,
                    progress: 0,
                    run: () => { },
                    cancel: () => { }
                };
            }
        })());

        // 注意，如果输入的计算属性是一个异步计算属性，则会自动添加后缀'value'
        const deps = store.useDeps(selector, 'all');

        // 使用Vue的watch API监听依赖变化
        watch(() => deps.map(dep => {
            const val = getValueBySelector(store, dep);
            return isPlainObject(val) ? { ...val } : Array.isArray(val) ? [...val] : val;
        }), () => {
            const val = getValueBySelector(store, selector);
            result.value = isPlainObject(val) ? { ...val } : Array.isArray(val) ? [...val] : val;
        }, {
            deep: true,
            immediate: true
        });

        return result;
    }) as unknown as UseAsyncStateType<State>
}
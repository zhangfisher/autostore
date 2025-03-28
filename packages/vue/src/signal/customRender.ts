import { AsyncComputedValue, Dict, isAsyncComputedValue, PATH_DELIMITER } from "autostore"
import type { VueAutoStore } from "../store"
import { defineComponent, ref, computed, onMounted, onUnmounted, h } from "vue"
import { getValueBySelector } from "../utils/getValueBySelector"
import type { SignalComponentOptions, SignalComponentRender } from "./types"

/**
 * 通过渲染函数创建一个信号组件
 * 
 * @example
 * 
 * import { createStore } from "@autostorejs/vue"  
 * 
 * const { state, $ } = createStore({
 *    order: {
 *      price: 100,
 *      count: 1,
 *      total: computed(async (user) => {
 *          return user.price + ' ' + user.count
 *      }, ["price", "count"])
 *    }
 * })
 * 
 * @example
 * 
 * 指定字符串路径，然后自定义渲染函数
 * $(({ value, timeout, loading }) => {
 *    return h('div', {}, value)
 * }, "order.total")
 * 
 * 需要注意的是，只有当order.total是一个异步计算属性时，才会有timeout,loading属性
 */
export function createCustomRender<State extends Dict>(
    store: VueAutoStore<State>,
    render: SignalComponentRender,
    path: string,
    options: SignalComponentOptions
) {
    return defineComponent({
        name: 'CustomRender',
        setup() {
            const ErrorBoundary = options.errorBoundary || store.options.signalErrorBoundary
            const error = ref<any>(null)
            const value = ref(getValueBySelector(store, path, false, (err) => error.value = err))
            const isAsync = isAsyncComputedValue(value.value)

            // 计算渲染参数
            const renderArgs = computed<AsyncComputedValue>(() => {
                return isAsync ? value.value : { value: value.value } as AsyncComputedValue
            })

            // 收集依赖
            const deps = store.useDeps(path as any, 'none')

            // 监听变化
            let unwatch: (() => void) | undefined

            onMounted(() => {
                const watchPath = isAsync ? 
                    `${Array.isArray(path) ? path.join(PATH_DELIMITER) : path}.*` : 
                    deps

                unwatch = store.watch(watchPath, ({ path: keypath, value: newValue }) => {
                    if (isAsync) {
                        // 更新异步值的特定属性
                        value.value = {
                            ...value.value,
                            [keypath[keypath.length - 1]]: newValue
                        }
                    } else {
                        // 更新同步值
                        value.value = getValueBySelector(
                            store, 
                            path, 
                            false, 
                            (err) => error.value = err
                        )
                    }
                })
            })

            onUnmounted(() => {
                unwatch?.()
            })

            // 渲染函数
            return () => {
                if (error.value) {
                    return ErrorBoundary ? h(ErrorBoundary, { error: error.value }) : null
                }
                return render(renderArgs.value)
            }
        }
    })
}
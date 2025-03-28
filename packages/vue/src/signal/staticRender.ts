import { Dict, ObjectKeyPaths } from "autostore"
import type { VueAutoStore } from "../store"
import { defineComponent, ref, watch, h, onMounted, onUnmounted } from "vue"
import { getValueBySelector } from "../utils/getValueBySelector"
import { SignalComponentOptions } from "./types"
import { StateGetter } from "../hooks/types"

/**
 * 根据输入的状态数据路径，创建一个信号组件
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
 * 生成一个只包括指定路径值的VNode
 * 
 * $("order.price")
 * 
 * @example
 * 
 * 生成一个由多个计算状态组成的VNode,当依赖变化时自动更新
 * 
 * $((state) => {
 *    return `${state.order.price}, ${state.lastName}`
 * })
 * 
 * @example
 * 
 * 如果创建的信号组件指向的是一个异步计算属性，则会自动添加后缀'value'
 * 
 * $("order.total") ==== $("order.total.value") 
 * 因为order.total是一个异步计算属性，在状态数据中的值是一个AsyncComputedValue对象，真正的计算结果在value属性中
 */
export function createStaticRender<State extends Dict>(
    store: VueAutoStore<State>,
    selector: ObjectKeyPaths<State> | StateGetter<State>,
    options: SignalComponentOptions
) {
    return defineComponent({
        name: 'StaticRender',
        setup() {
            const ErrorBoundary = options.errorBoundary || store.options.signalErrorBoundary
            const error = ref<any>(null)
            const value = ref(getValueBySelector(store, selector, true, (err) => error.value = err))

            // 收集依赖的路径
            const deps = store.useDeps(selector as any)

            // 监听依赖变化
            let unwatch: (() => void) | undefined

            onMounted(() => {
                unwatch = store.watch(deps, () => {
                    value.value = getValueBySelector(store, selector, true, (err) => error.value = err)
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

                const renderValue = typeof value.value === 'boolean' ? String(value.value) : value.value
                return renderValue != null ? h('span', {}, renderValue) : null
            }
        }
    })
}
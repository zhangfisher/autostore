import { isPathEq, AsyncComputedGetter, AsyncComputedObject, AsyncComputedValue, computed, ComputedGetter, Dict, isObserverDescriptor, isObserverDescriptorBuilder, ObserverDescriptorBuilder, SyncComputedObject, Watcher, WatchObject } from "autostore"
import type { VueAutoStore } from "../store"
import { defineComponent, ref, onMounted, onUnmounted, h } from "vue"
import type { SignalComponentOptions, SignalComponentRender } from "./types"

/**
 * 动态创建计算属性，然后渲染信号组件
 * 
 * @example
 * - 指定一个计算同步的getter函数
 *   
 *   $(({ loading, timeout, value, retry, ..... }) => {
 *      return h('div', {}, value)
 *   }, (state) => state.order.total)
 * 
 * - 指定一个异步计算的getter函数
 *   
 *   $(({ loading, timeout, value, retry, ..... }) => {
 *      return h('div', {}, value)
 *   }, async (state) => state.order.total)
 * 
 * - 动态同步计算组件
 *   
 *   $(({ loading, timeout, value, retry, ..... }) => {
 *      return h('div', {}, value)
 *   }, () => computed(getter, depends, options))
 * 
 * - 动态异步计算组件
 *   
 *   $(({ value }) => {
 *      return h('div', {}, value)
 *   }, () => watch(getter, depends, options))
 */
export function createDynamicRender<State extends Dict>(
    store: VueAutoStore<State>,
    render: SignalComponentRender,
    builder: ObserverDescriptorBuilder | ComputedGetter<any> | AsyncComputedGetter<any>,
    options: SignalComponentOptions
) {
    return defineComponent({
        name: 'DynamicRender',
        setup() {
            const ErrorBoundary = options.errorBoundary || store.options.signalErrorBoundary
            const error = ref<any>(null)
            const value = ref<AsyncComputedValue>({ value: '' })

            // 创建观察者对象
            let observerObj: any = null
            try {
                const descriptor = isObserverDescriptorBuilder(builder) ? builder() : builder

                if (isObserverDescriptor(descriptor)) {
                    descriptor.options.objectify = false // 不保存到computedObjects
                    if (descriptor.type === 'computed') {
                        observerObj = store.computedObjects.create(descriptor as any)
                    } else if (descriptor.type === 'watch') {
                        observerObj = store.watchObjects.create(descriptor as any)
                    }
                } else {
                    const computedBuilder = computed(descriptor as any)
                    const descr = computedBuilder()
                    descr.options.objectify = false
                    observerObj = store.computedObjects.create(descr)
                }

                // 设置初始值
                if (observerObj) {
                    value.value = observerObj.async ? observerObj.value : { value: observerObj.value }
                }
            } catch (e) {
                error.value = e
            }

            // 监听变化
            let watcher: Watcher | undefined

            onMounted(() => {
                if (!observerObj) return

                watcher = observerObj.watch((operate: any) => {
                    // 忽略批量更新中的中间状态
                    if (operate.reply) return

                    try {
                        if (observerObj.type === 'computed') {
                            if (observerObj.async) {
                                const asyncObj = observerObj as unknown as AsyncComputedObject
                                if (isPathEq(operate.path, asyncObj.path) || 
                                    isPathEq(operate.path.slice(0, -1), asyncObj.path)) {
                                    value.value = { ...asyncObj.value }
                                }
                            } else {
                                value.value = {
                                    value: (observerObj as unknown as SyncComputedObject).value
                                }
                            }
                        } else if (observerObj.type === 'watch') {
                            value.value = {
                                value: (observerObj as unknown as WatchObject).value
                            }
                        }
                    } catch (e) {
                        error.value = e
                    }
                }, { operates: 'write' })
            })

            onUnmounted(() => {
                watcher?.off()
            })

            // 渲染函数
            return () => {
                if (error.value) {
                    return ErrorBoundary ? h(ErrorBoundary, { error: error.value }) : null
                }
                return render(value.value)
            }
        }
    })
}
/**
 * 创建一个自动管理的store
 * 
 * @example
 * 
 * const MyComponent = () => {
 * 
 * const store = useStore({
 *      price: 1,
 *      count: 2,
 *      total: (order) => order.price * order.count
 * })
 * 
 * }
 */

import { Dict, AutoStoreOptions } from "autostore"
import { VueAutoStore } from "../store"
import { ref, onUnmounted } from "vue"

export function useStore<State extends Dict>(define: State, options?: AutoStoreOptions<State>) {
    // 使用Vue的ref创建响应式引用
    const storeRef = ref<VueAutoStore<State>>()

    if (!storeRef.value) {
        storeRef.value = new VueAutoStore<State>(define, options)
    }

    // 在组件卸载时自动销毁store
    onUnmounted(() => {
        storeRef.value?.destroy()
        storeRef.value = undefined
    })

    return storeRef.value
}
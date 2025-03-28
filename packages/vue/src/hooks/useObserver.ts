import { createObserverObject, Dict, ObserverBuilder, ObserverObject } from "autostore"
import { ref, onUnmounted } from "vue"
import { VueAutoStore } from "../store"
import { UseObserverObjectType } from "./types"

export function createUseObserverObject<State extends Dict>(store: VueAutoStore<State>) {
    return (function<Value>(params: ObserverBuilder, options?: Dict) {
        if (!params) return undefined

        // 使用Vue的ref来保持对象引用
        const observerRef = ref<ObserverObject<Value>>()

        if (!observerRef.value) {
            observerRef.value = createObserverObject(store, params, options) as ObserverObject<Value>
        }

        // 在组件卸载时清理
        onUnmounted(() => {
            observerRef.value?.detach()
            observerRef.value = undefined
        })

        return observerRef.value
    }) as UseObserverObjectType<State>
}
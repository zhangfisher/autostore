/**
 * 在组件中创建计算属性
 * 
 * const { value, loading, error } = useComputed((state) => state.order.price * state.order.count)
 */
import { AsyncComputedValue, ComputedOptions, createAsyncComptuedValue, Dict } from "autostore"
import { VueAutoStore } from "../store"
import { UseComputedType } from "./types"
import { ref, watch } from "vue"

export function createUseComputed<State extends Dict>(store: VueAutoStore<State>) {
    return ((params: any, computedOptions?: ComputedOptions) => {
        const computedObj = store.useComputedObject(params, computedOptions)
        const value = ref<AsyncComputedValue<any>>(
            computedObj?.async ? computedObj.value : createAsyncComptuedValue(computedObj?.value)
        )

        if (computedObj) {
            // 使用Vue的watch API监听计算属性的变化
            watch(() => computedObj.value, (newValue) => {
                value.value = computedObj?.async ? newValue : createAsyncComptuedValue(newValue)
            }, {
                deep: true,
                immediate: true
            })
        }

        return value
    }) as UseComputedType<State>
}
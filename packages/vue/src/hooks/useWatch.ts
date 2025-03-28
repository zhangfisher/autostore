import { ref, watch, onUnmounted } from "vue"
import { Dict, isFunction } from "autostore"
import type { VueAutoStore } from "../store"
import { UseWatchOptions, UseWatchType } from "./types"

/**
 * 侦听store状态的变化，当组件销毁时自动取消侦听
 * 
 * const { useWatch } = createStore({...})
 * 
 * store.useWatch("order.price", (operate) => {...})
 * store.useWatch(["order.price", "order.count"], (operate) => {...})
 * store.useWatch("order.price", (operate) => {...}, {operates: ['add']})
 * 
 * @returns 
 */
export function createUseWatch<State extends Dict>(store: VueAutoStore<State>) {
    return ((...args: any[]) => {
        const deps = isFunction(args[0]) ? undefined : args[0]
        const getter = isFunction(args[0]) ? args[0] : undefined
        const options = Object.assign({},
            (args.length == 3 ? args[2] : (
                (args.length == 2 && isFunction(args[0])) ? args[1] : undefined
            ))
        ) as UseWatchOptions<any>

        const value = ref(options?.initial)
        let setValue = (newValue: any) => {
            value.value = newValue
        }

        const executeGetter = async (operate: any) => {
            const result = await Promise.resolve(getter(operate))
            if (result !== undefined) {
                setValue(result)
            }
        }

        // 创建监听器
        const stopWatch = deps 
            ? store.watch(deps, (operate) => executeGetter(operate), options)
            : store.watch((operate) => executeGetter(operate), options)

        // 监听store重置
        const stopResetListener = store.on("reset", () => {
            setTimeout(() => setValue(options?.initial), 0)
        })

        // 组件卸载时清理
        onUnmounted(() => {
            stopWatch?.()
            stopResetListener?.()
        })

        return [value, setValue]
    }) as UseWatchType<State>
}
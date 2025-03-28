import { getDepends, noRepeat, type Dict } from "autostore"
import type { VueAutoStore } from "../store"
import { ref } from "vue"

export type UseDepsOptions = {
    /**
     * 当依赖是一个异步计算属性时，是否展开进行依赖收集
     * - none: 不展开
     * - value: 自动添加.value作为依赖
     * - all: 添加.*作为依赖
     */
    extendAsync: 'none' | 'value' | 'all'
    /**
     * 如果useDeps的参数是一个数组，如useDeps(["a.b","b.c"])
     * 则依赖是否进行合并
     * 
     * - true: 合并并去重
     * - false: 不合并，分别返回每个数组的依赖，
     *     
     * 假设a的依赖是x,y,b的依赖是x,m,n
     * useDeps(["a","b"]) === [ [['x'],['y]], [['x'],['m'],['n']] ]
     */
    mergeArrayDeps?: boolean
}

/**
 * 创建一个函数钩子，该函数钩子用于返回指定路径的依赖
 * 
 * @description
 * 
 * - 输入一个字符串路径，转换为路径数组
 * useDeps("order.price") == [["order","price"]]
 * 
 * - 输入一个函数，执行该函数并收集依赖
 * useDeps((state)=>state.order.price * state.order.count)) == [["order","price"],["order","count"]]
 * 
 * - 输入一个数组，里面是函数或字符串或字符串数组，对函数并收集依赖
 * useDeps([
 *     (state)=>state.order.price * state.order.count))
 *     "user.name",
 * ])
 * == [["order","price"],["order","count"],['user','name']]
 * 
 * 针对异步计算属性
 * 
 * useDeps("order.total")  如果order.total是一个异步计算属性
 * 由于此时order.total是一个AsyncComputedValue对象，真正的计算结果在order.total.value属性中
 * 所以自动添加返回的是[["order","total","value"]]  
 * 这样当watch时就可以监听到异步计算属性的变化
 */
export function createUseDeps<State extends Dict>(store: VueAutoStore<State>) {
    return function(selector: any, extendAsync: 'none' | 'value' | 'all' = 'none') {
        // 使用ref创建响应式引用
        const deps = ref(() => {
            if (Array.isArray(selector)) {
                const deps: string[][] = []
                selector.forEach((item) => {
                    deps.push(...getDepends(item, store, extendAsync))
                })
                return deps
            } else {
                return getDepends(selector, store, extendAsync)
            }
        })

        // 返回去重后的依赖数组
        return noRepeat(deps.value)
    }
}
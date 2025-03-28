/**
 * 用于创建信号组件
 */

import { Dict, isPlainObject } from "autostore"
import { VueAutoStore } from "../store"
import { h } from "vue"
import { createStaticRender } from "./staticRender"
import { createCustomRender } from "./customRender"
import { createDynamicRender } from "./dynamicRender"
import type { SignalComponentType } from "./types"

/**
 * 创建一个响应式的组件，当数据发生变化时，组件会自动更新
 * 
 * @example
 * 
 * import { createStore } from "@autostorejs/vue"
 * 
 * const { state, $ } = createStore({
 *      firstName: 'zhang',
 *      lastName: 'san',
 *      fullName: (user) => {
 *          return user.firstName + ' ' + user.lastName
 *      }
 * })
 * 
 * @example
 * 
 * 生成一个只包括指定路径值的VNode
 * 
 * $("firstName")
 * 
 * @example
 * 
 * 生成一个由多个计算状态组成的VNode,当依赖变化时自动更新
 * 
 * $((state) => {
 *    return state.firstName + state.lastName
 * })
 * 
 * @example
 * 
 * 同步计算组件， $(render, getter, options)
 * 
 * getter是一个计算函数，当依赖变化时，重新执行getter来获取数据，
 * 然后作为props传递给render进行重新渲染
 * 
 * 当组件内部依赖的a,b变化时，自动重新渲染
 * $((value) => {
 *    return h('div', {}, state.a + state.b)
 * }, (scope) => {
 *    return scope.a + scope.b
 * }, computedOptions)
 * 
 * @example
 * 
 * 异步计算组件
 * 
 * 当依赖变化时，重新执行getter来获取数据，然后重新渲染组件
 * 
 * $(({ loading, timeout, value, retry, ..... }) => {
 *    return loading ? h('div', {}, 'loading...') : h('div', {}, value)
 * }, () => computed(getter, depends, options))
 */
export function createSignalComponent<State extends Dict>(store: VueAutoStore<State>) {
    return (function() {
        const args = arguments

        // 检查参数类型，决定使用哪种渲染器
        const selector = args.length >= 1 
            && (typeof(args[0]) === 'string' || typeof(args[0]) === 'function')
            && (!args[1] || isPlainObject(args[1]))
            ? args[0]
            : undefined

        const render = args.length >= 2
            && typeof(args[0]) === 'function'
            && (typeof(args[1]) === 'string' || Array.isArray(args[1]) || typeof(args[1]) === 'function')
            ? args[0]
            : undefined

        const getterOrBuilder = args.length >= 2
            && typeof(args[1]) === 'function'
            ? args[1]
            : undefined

        const renderPath = args.length >= 2
            && typeof(args[0]) === 'function'
            && (typeof(args[1]) === 'string')
            ? args[1]
            : undefined

        const options = Object.assign(
            {},
            args.length > 1 && isPlainObject(args[args.length - 1])
                ? args[args.length - 1]
                : undefined
        )

        // 根据参数类型选择合适的渲染器
        if (selector) {
            // 静态渲染
            const StaticComponent = createStaticRender(store, selector, options)
            return h(StaticComponent)
        } else if (renderPath) {
            // 自定义渲染
            const CustomComponent = createCustomRender(store, render, renderPath, options)
            return h(CustomComponent)
        } else if (getterOrBuilder) {
            // 动态渲染
            const DynamicComponent = createDynamicRender(store, render, getterOrBuilder, options)
            return h(DynamicComponent)
        }

        // 默认返回空组件
        return h('div')
    }) as SignalComponentType<State>
}

// 导出类型
export * from './types'

// 导出渲染器
export { createStaticRender } from './staticRender'
export { createCustomRender } from './customRender'
export { createDynamicRender } from './dynamicRender'
import { h } from "vue"
import { AutoStore, Dict, AutoStoreOptions } from "autostore"
import { createUseState } from "./hooks/useState"
import { createUseDeps } from "./hooks/useDeps"
import { createSignalComponent } from "./signal"
import type { SignalComponentType } from "./signal/types"
import { createUseField } from './form/useField'
import { UseDepsType, UseStateType, UseWatchType, UseReactiveType, UseComputedObjectType, UseAsyncStateType, UseAsyncReactiveType, UseComputedType, UseObserverObjectType } from './hooks/types'
import { UseFieldType, UseFieldsType } from "./form/types"
import { createUseWatch } from './hooks/useWatch'
import { createUseFields } from './form/useFields'
import { createUseComputed } from "./hooks/useComputed"
import { createUseAsyncState } from "./hooks/useAsyncState"
import { createUseComputedObject } from "./hooks/useComputedObject"
import { createUseObserverObject } from "./hooks/useObserver"

export class VueAutoStore<State extends Dict> extends AutoStore<State> {
    useState: UseStateType<State>
    useAsyncState: UseAsyncStateType<State>
    useAsyncReactive: UseAsyncReactiveType<State>
    useDeps: UseDepsType<State>
    $: SignalComponentType<State>
    signal: SignalComponentType<State>
    useWatch: UseWatchType<State>
    useField: UseFieldType<State>
    useFields: UseFieldsType<State>
    useReactive: UseReactiveType<State>
    useObserverObject: UseObserverObjectType<State>
    useComputedObject: UseComputedObjectType<State>
    useComputed: UseComputedType<State>

    constructor(initial: State, options?: AutoStoreOptions<State>) {
        super(initial, Object.assign({
            // 默认错误边界组件
            signalErrorBoundary: {
                props: ['error'],
                render() {
                    return h('div', { class: 'error' }, 'ERROR')
                }
            },
            resetable: true
        }, options))

        // 绑定所有方法
        this.signal = this.$ = createSignalComponent(this).bind(this)
        this.useState = createUseState(this).bind(this)
        this.useReactive = this.useState
        this.useAsyncState = createUseAsyncState(this).bind(this)
        this.useAsyncReactive = this.useAsyncState
        this.useDeps = createUseDeps(this).bind(this)
        this.useWatch = createUseWatch(this).bind(this)
        this.useField = createUseField(this).bind(this)
        this.useFields = createUseFields(this).bind(this)
        this.useObserverObject = createUseObserverObject(this).bind(this)
        this.useComputedObject = createUseComputedObject(this).bind(this)
        this.useComputed = createUseComputed(this).bind(this)
        this.reset = this.reset.bind(this)
    }
}

/**
 * 创建一个Vue自动存储实例
 * @param initial 初始状态
 * @param options 配置选项
 * @returns VueAutoStore实例
 */
export function createStore<State extends Dict>(initial: State, options?: AutoStoreOptions<State>) {
    return new VueAutoStore<State>(initial, options)
}
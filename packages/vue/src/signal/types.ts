import { ComputedState, Dict, ObserverDescriptorBuilder, AsyncComputedValue, ComputedGetter, AsyncComputedGetter, ObjectKeyPaths } from "autostore"
import { Component, VNode } from "vue"
import { StateGetter } from "../hooks/types"

export type SignalComponentOptions = {
    /**
     * 指定一个错误边界组件，当组件渲染出错时，会调用此组件
     * 
     * @example
     * 
     * <div>{{ $("xxx.xxx", { errorBoundary: (error) => {...} }) }}</div>
     * 
     */
    errorBoundary?: Component<{ error: any }>
}

export type SignalComponentRenderArgs<Value = any> = AsyncComputedValue<Value>

export type SignalComponentRender<Value = any> = (value: SignalComponentRenderArgs<Value>) => VNode | VNode[] | string | number | boolean | null | undefined
export type SignalComponentGetter<State extends Dict = Dict, Value = any> = StateGetter<State, Value>

export interface SignalComponentType<State extends Dict> {
    // 使用路径选择器
    (selector: ObjectKeyPaths<ComputedState<State>>, options?: SignalComponentOptions): VNode | VNode[]
    
    // 使用状态函数
    (selector: (state: ComputedState<State>) => VNode | VNode[], options?: SignalComponentOptions): VNode | VNode[]
    
    // 自定义渲染 - 异步计算
    <Value = any>(
        render: SignalComponentRender<Value>,
        getter: AsyncComputedGetter<Value, ComputedState<State>>,
        options?: SignalComponentOptions
    ): VNode | VNode[]
    
    // 自定义渲染 - 同步计算
    <Value = any>(
        render: SignalComponentRender<Value>,
        getter: ComputedGetter<Value, ComputedState<State>>,
        options?: SignalComponentOptions
    ): VNode | VNode[]
    
    // 自定义渲染 - 使用构建器
    <Value = any, Scope = any>(
        render: SignalComponentRender<Value>,
        builder: ObserverDescriptorBuilder<string, Value, Scope>,
        options?: SignalComponentOptions
    ): VNode | VNode[]
    
    // 自定义渲染 - 使用路径
    <Value = any>(
        render: SignalComponentRender<Value>,
        path: string | string[],
        options?: SignalComponentOptions
    ): VNode | VNode[]
}
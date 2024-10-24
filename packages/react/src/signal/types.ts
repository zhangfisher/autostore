import { ComputedState, Dict, ObserverDescriptorBuilder, AsyncComputedValue, ComputedGetter, AsyncComputedGetter} from "autostore";
import React from "react";
import { ComponentType } from "react";


export type SignalComponentOptions={
    /**
     * 指定一个错误边界组件，当组件渲染出错时，会调用此组件
     * 
     * @example
     * 
     * <div>{$("xxx.xxx",{errorBoundary:(error)=>{...}})}
     * 
     */
    errorBoundary?:ComponentType<{error:any}>
}



export type SignalComponentRenderArgs<Value=any> = AsyncComputedValue<Value>

export type SignalComponentRender<Value=any> =(value:SignalComponentRenderArgs<Value>)=>React.ReactNode
export type SignalComponentGetter<State extends Dict = Dict,Value=any> = (state:ComputedState<State>)=>Value 

export interface SignalComponentType<State extends Dict>{
    (selector: string,options?:SignalComponentOptions):React.ReactNode
    (selector: (state:ComputedState<State>)=>React.ReactNode,options?:SignalComponentOptions):React.ReactNode
    <Value=any>(render:SignalComponentRender<Value>,getter:AsyncComputedGetter<Value,ComputedState<State>>,options?:SignalComponentOptions):React.ReactNode
    <Value=any>(render:SignalComponentRender<Value>,getter: ComputedGetter<Value,ComputedState<State>>,options?:SignalComponentOptions):React.ReactNode
    <Value=any, Scope=any >(render:SignalComponentRender<Value>,builder: ObserverDescriptorBuilder<string,Value,Scope>,options?:SignalComponentOptions):React.ReactNode;
    <Value=any>(render:SignalComponentRender<Value>,path:string | string[],options?:SignalComponentOptions):React.ReactNode
}

 
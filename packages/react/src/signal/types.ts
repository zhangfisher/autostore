import { ComputedState, Dict, ObserverDescriptorBuilder, AsyncComputedValue, ComputedGetter, AsyncComputedGetter} from "autostore";
import React from "react";

export type SignalComponentRenderArgs<Value=any> = AsyncComputedValue<Value>

export type SignalComponentRender<Value=any> =(value:SignalComponentRenderArgs<Value>)=>React.ReactNode
export type SignalComponentGetter<State extends Dict = Dict,Value=any> = (state:State)=>Value 

export interface SignalComponentType<State extends Dict>{
    (selector: string):React.ReactNode
    <Value=any>(selector: (state:ComputedState<State>)=>Value):React.ReactNode
    <Value=any>(render:SignalComponentRender,path:string | string[]):React.ReactNode
    <Value=any, Scope=any >(render:SignalComponentRender,getter:AsyncComputedGetter<Value,Scope>):React.ReactNode
    <Value=any, Scope=any >(render:SignalComponentRender,getter:ComputedGetter<Value,Scope>):React.ReactNode
    <Value=any, Scope=any >(render:SignalComponentRender,builder: ObserverDescriptorBuilder<string,Value,Scope>):React.ReactNode;
}


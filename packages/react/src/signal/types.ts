import { ComputedState, Dict, IComputedDescriptorBuilder, AsyncComputedValue} from "@autostorejs/core";
import React from "react";

export type SignalComponentRenderArgs<Value=any> = AsyncComputedValue<Value>

export type SignalComponentRender<Value=any> =(value:SignalComponentRenderArgs<Value>)=>React.ReactNode
export type SignalComponentGetter<State extends Dict = Dict,Value=any> = (state:State)=>Value
export type SignalComponentComputedCreator<Value=any, Scope=any> = IComputedDescriptorBuilder<string,Value,Scope>

export interface SignalComponentType<State extends Dict>{
    (selector: string):React.ReactNode
    <Value=any>(selector: (state:ComputedState<State>)=>Value):React.ReactNode
    <Value=any>(render:SignalComponentRender,path:string | string[]):React.ReactNode
    <Value=any>(render:SignalComponentRender,getter:SignalComponentGetter<State,Value>):React.ReactNode
    <Value=any, Scope=any >(render:SignalComponentRender,builder:SignalComponentComputedCreator<Value,Scope>):React.ReactNode;
}


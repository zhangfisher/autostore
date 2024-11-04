import { AsyncComputedGetter, AsyncComputedObject, AsyncComputedValue, ComputedDescriptorBuilder, ComputedGetter, ComputedOptions, ComputedState, Dict, ExtendAsyncOptions, SyncComputedObject, WatchListener, WatchListenerOptions } from "autostore"
import { ObserverBuilder } from '../../../core/src/types';
 
export type StateGetter<State extends Dict,Value=any> =  (state:ComputedState<State>)=>Value

// ********** useDeps ********** 

export interface UseDepsType<State extends Dict>{
    (selector: string | StateGetter<State>,extendAsync?:ExtendAsyncOptions):string[][]
    (selector: (string | string[] | StateGetter<State>)[],extendAsync?:ExtendAsyncOptions):string[][]
 }

// ********** useState **********  


export type UseStateResult<Value,State extends Dict>=[Value extends Dict ? ComputedState<Value> : Value,(value:Value | ((state:ComputedState<State>)=>void))=>void]
export type UseStateGetter<Value,State extends Dict>= (state:ComputedState<State>)=>Value
export type UseStateSetter<SetValue,State extends Dict>= (value:SetValue,state:ComputedState<State>)=>void
export type UseStateComposeResult<Value,SetValue,State extends Dict>=[Value extends Dict ? ComputedState<Value> : Value,(value:SetValue | ((state:ComputedState<State>)=>void))=>void]

export interface UseStateType<State extends Dict> {
    <Value=any>(selector: string): UseStateResult<Value,State>
    <Value=any>(selector: string[]): UseStateResult<Value,State>
    <Value=any>(selector: string,async:boolean): UseStateResult<AsyncComputedValue<Value>,State>
    <Value=any>(selector: string[],async:boolean): UseStateResult<AsyncComputedValue<Value>,State>
    <Value=any,SetValue=any>(getter: UseStateGetter<Value,State>,setter?:UseStateSetter<SetValue,State>): UseStateComposeResult<Value,SetValue,State>
    (): UseStateResult<State,State>
}

// ********** useReactive **********  
export type UseReactiveResult<Value,State extends Dict>=UseStateResult<Value,State>
export type UseReactiveGetter<Value,State extends Dict>= UseStateGetter<Value,State>
export type UseReactiveSetter<SetValue,State extends Dict>=UseStateSetter<SetValue,State>
export type UseReactiveComposeResult<Value,SetValue,State extends Dict>=UseStateResult<Value,State>

export interface UseReactiveType<State extends Dict> {
    <Value=any>(selector: string): UseReactiveResult<Value,State>
    <Value=any>(selector: string[]): UseReactiveResult<Value,State>
    <Value=any>(selector: string,async:boolean): UseReactiveResult<AsyncComputedValue<Value>,State>
    <Value=any>(selector: string[],async:boolean): UseReactiveResult<AsyncComputedValue<Value>,State>
    <Value=any,SetValue=any>(getter: UseReactiveGetter<Value,State>,setter?:UseReactiveSetter<SetValue,State>): UseStateComposeResult<Value,SetValue,State>
    (): UseReactiveResult<State,State>
}

// ********** useAsyncState **********  

export interface UseAsyncStateType{
    <Value=any>(selector: string): AsyncComputedValue<Value>
    <Value=any>(selector: string[]): AsyncComputedValue<Value>
}

// ********** useAsyncReactive **********  

export type UseAsyncReactiveType = UseAsyncStateType

//  ********** useWatch **********
   
export interface UseWatchType {
    <Value>(selector: string,listener:WatchListener<Value>,options?:WatchListenerOptions): void
    <Value>(selector: string[],listener:WatchListener<Value>,options?:WatchListenerOptions): void  
}



// ********** useComputed **********
export interface UseComputedType<State extends Dict>{
    <Value=any,Scope=any>(getter:ComputedGetter<Value,Scope>,computedOptions?:ComputedOptions<Value,Scope>):SyncComputedObject<Value,Scope> | undefined
    <Value=any,Scope=any>(getter: AsyncComputedGetter<Value,Scope>,computedOptions?:ComputedOptions<Value,Scope> ):AsyncComputedObject<Value,Scope> | undefined
    <Value=any,Scope=any>(builder:ComputedDescriptorBuilder<Value,Scope>,computedOptions?:ComputedOptions<Value,Scope>):SyncComputedObject<Value,Scope> | AsyncComputedObject<Value,Scope> | undefined
    <Value=any,Scope=any>(args:any,computedOptions?:ComputedOptions<Value,Scope>):SyncComputedObject<Value,Scope> | AsyncComputedObject<Value,Scope> | undefined
} 
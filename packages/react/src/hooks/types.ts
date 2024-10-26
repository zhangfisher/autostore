import { AsyncComputedValue, ComputedState, Dict, ExtendAsyncOptions, WatchListener, WatchListenerOptions } from "autostore"
 
// ********** useDeps ********** 

export interface UseDepsType<State extends Dict>{
    (selector: string,extendAsync?:ExtendAsyncOptions):string[][]
    (selector: string[],extendAsync?:ExtendAsyncOptions):string[][]
    (selector: (state:ComputedState<State>)=>any,extendAsync?:ExtendAsyncOptions):string[][]
    (selector:any,extendAsync?:ExtendAsyncOptions):string[][] 
 }



// ********** useState **********  


export type UseStateResult<Value,State extends Dict>=[Value extends Dict ? ComputedState<Value> : Value,(value:Value | ((state:ComputedState<State>)=>void))=>void]
export type UseStateGetter<Value,State extends Dict>= (state:ComputedState<State>)=>Value
export type UseStateSetter<SetValue,State extends Dict>= (value:SetValue,state:ComputedState<State>)=>void


export interface UseStateType<State extends Dict> {
    <Value=any>(selector: string): UseStateResult<Value,State>
    <Value=any>(selector: string[]): UseStateResult<Value,State>
    <Value=any>(selector: string,async:boolean): UseStateResult<AsyncComputedValue<Value>,State>
    <Value=any>(selector: string[],async:boolean): UseStateResult<AsyncComputedValue<Value>,State>
    <Value=any,SetValue=any>(getter: UseStateGetter<Value,State>,setter?:UseStateSetter<SetValue,State>): UseStateResult<Value,State>
    (): UseStateResult<State,State>
}

// ********** useReactive **********  
export type UseReactiveResult<Value,State extends Dict>=UseStateResult<Value,State>
export type UseReactiveGetter<Value,State extends Dict>= UseStateGetter<Value,State>
export type UseReactiveSetter<SetValue,State extends Dict>=UseStateSetter<SetValue,State>
export interface UseReactiveType<State extends Dict> {
    <Value=any>(selector: string): UseReactiveResult<Value,State>
    <Value=any>(selector: string[]): UseReactiveResult<Value,State>
    <Value=any>(selector: string,async:boolean): UseReactiveResult<AsyncComputedValue<Value>,State>
    <Value=any>(selector: string[],async:boolean): UseReactiveResult<AsyncComputedValue<Value>,State>
    <Value=any,SetValue=any>(getter: UseReactiveGetter<Value,State>,setter?:UseReactiveSetter<SetValue,State>): UseReactiveResult<Value,State>
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


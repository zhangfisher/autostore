import { AsyncComputedValue, ComputedState, Dict, ExtendAsyncOptions, WatchListener, WatchListenerOptions } from "autostore"
 
// ********** useDeps ********** 

export interface UseDepsType<State extends Dict>{
    (selector: string,extendAsync?:ExtendAsyncOptions):string[][]
    (selector: string[],extendAsync?:ExtendAsyncOptions):string[][]
    (selector: (state:ComputedState<State>)=>any,extendAsync?:ExtendAsyncOptions):string[][]
    (selector:any,extendAsync?:ExtendAsyncOptions):string[][] 
 }



// ********** useState **********  


export type UseStateResult<Value>=[Value,React.Dispatch<React.SetStateAction<Value>>]

export type UseStateGetter<Value,State extends Dict>= (state:ComputedState<State>)=>Value
export type UseStateSetter<SetValue,State extends Dict>= (value:SetValue,state:ComputedState<State>)=>void


export interface UseStateType<State extends Dict> {
    <Value=any>(selector: string): UseStateResult<Value>
    <Value=any>(selector: string[]): UseStateResult<Value>
    <Value=any>(selector: string,async:boolean): UseStateResult<AsyncComputedValue<Value>>
    <Value=any>(selector: string[],async:boolean): UseStateResult<AsyncComputedValue<Value>>
    <Value=any,SetValue=any>(getter: UseStateGetter<Value,State>,setter?:UseStateSetter<SetValue,State>): UseStateResult<Value>
    (): UseStateResult<ComputedState<State>>
}

// ********** useReactive **********  
export type UseReactiveResult<Value>=UseStateResult<Value>

export type UseReactiveGetter<Value,State extends Dict>= UseStateGetter<Value,State>

export type UseReactiveSetter<SetValue,State extends Dict>=UseStateSetter<SetValue,State>


export interface UseReactiveType<State extends Dict> {
    <Value=any>(selector: string): UseReactiveResult<Value>
    <Value=any>(selector: string[]): UseReactiveResult<Value>
    <Value=any>(selector: string,async:boolean): UseReactiveResult<AsyncComputedValue<Value>>
    <Value=any>(selector: string[],async:boolean): UseReactiveResult<AsyncComputedValue<Value>>
    <Value=any,SetValue=any>(getter: UseReactiveGetter<Value,State>,setter?:UseReactiveSetter<SetValue,State>): UseReactiveResult<Value>
    (): UseStateResult<ComputedState<State>>
}

// ********** useAsyncState **********  

export interface UseAsyncStateType{
    <Value>(selector: string): AsyncComputedValue<Value>
    <Value>(selector: string[]): AsyncComputedValue<Value>
}

// ********** useAsyncReactive **********  

export type UseAsyncReactiveType = UseAsyncStateType

//  ********** useWatch **********
   
export interface UseWatchType {
    <Value>(selector: string,listener:WatchListener<Value>,options?:WatchListenerOptions): void
    <Value>(selector: string[],listener:WatchListener<Value>,options?:WatchListenerOptions): void  
}


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

export type UseStateGetter<Value,State extends Record<string, any>>= (state:ComputedState<State>)=>Value
export type UseStateSetter<SetValue,State extends Record<string, any>>= (value:SetValue,state:ComputedState<State>)=>void


export interface UseStateType<State extends Dict> {
    <Value>(selector: string): UseStateResult<Value>
    <Value>(selector: string[]): UseStateResult<Value>
    <Value>(selector: string,async:boolean): UseStateResult<AsyncComputedValue<Value>>
    <Value>(selector: string[],async:boolean): UseStateResult<AsyncComputedValue<Value>>
    <Value,SetValue>(getter: UseStateGetter<Value,State>,setter?:UseStateSetter<SetValue,State>): UseStateResult<Value>
    (): [State,UseStateGetter<void,State>,]
}

// ********** useAsyncState **********  

export interface UseAsyncStateType{
    <Value>(selector: string): AsyncComputedValue<Value>
    <Value>(selector: string[]): AsyncComputedValue<Value>
}

//  ********** useWatch **********
   
export interface UseWatchType {
    <Value>(selector: string,listener:WatchListener<Value>,options?:WatchListenerOptions): void
    <Value>(selector: string[],listener:WatchListener<Value>,options?:WatchListenerOptions): void  
}


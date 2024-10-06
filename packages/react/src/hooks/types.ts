import { ComputedState, Dict, WatchListener, WatchListenerOptions } from "@autostorejs/core"

// ********** useDeps ********** 

export interface UseDepsType<State extends Dict>{
    (selector: string,extendAsync?:boolean):string[][]
    (selector: string[],extendAsync?:boolean):string[][]
    (selector: (state:ComputedState<State>)=>any,extendAsync?:boolean):string[][]
    (selector:any,extendAsync?:boolean):string[][] 
 }


 
// ********** useInput **********  

 export type UseInputBindings<Value> = Value extends Dict ? Record<keyof Value,{
    value:any
    onChange:(e:any)=>void
}> : Value

export type UseInputOptions={
     
}

export type UseInputGetter<Value,State extends Record<string, any>>= (state:ComputedState<State>)=>Value
export type UseInputSetter<Value,State extends Record<string, any>>= (input:Value,state:ComputedState<State>)=>void

export interface UseInputType<State extends Dict> {
    (): UseInputBindings<ComputedState<State>>
    <Value>(selector: string,options?:UseInputOptions): UseInputBindings<Value>
    <Value>(selector: string[],options?:UseInputOptions): UseInputBindings<Value>
    <Value>(getter: UseInputGetter<Value,State>,setter:UseInputSetter<Value,State>,options?:UseInputOptions):UseInputBindings<Value>
}


// ********** useState **********  


export type UseStateResult<Value>=[Value,React.Dispatch<React.SetStateAction<Value>>]

export type UseStateGetter<Value,State extends Record<string, any>>= (state:ComputedState<State>)=>Value
export type UseStateSetter<SetValue,State extends Record<string, any>>= (value:SetValue,state:ComputedState<State>)=>void


export interface UseStateType<State extends Dict> {
    <Value>(selector: string): UseStateResult<Value>
    <Value>(selector: string[]): UseStateResult<Value>
    <Value,SetValue>(getter: UseStateGetter<Value,State>,setter?:UseStateSetter<SetValue,State>): UseStateResult<Value>
    (): [State,UseStateGetter<void,State>,]
}





//  ********** useWatch **********
   
export interface UseWatchType {
    <Value>(selector: string,listener:WatchListener<Value>,options?:WatchListenerOptions): void
    <Value>(selector: string[],listener:WatchListener<Value>,options?:WatchListenerOptions): void  
}



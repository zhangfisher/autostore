import { ComputedState, Dict } from "@autostorejs/core"

// ********** useDeps ********** 

export interface UseDepsType<State extends Dict>{
    (selector: string,extendAsync?:boolean):string[][]
    (selector: string[],extendAsync?:boolean):string[][]
    (selector: (state:ComputedState<State>)=>any,extendAsync?:boolean):string[][]
    (selector:any,extendAsync?:boolean):string[][] 
 }


 
// ********** useInput **********  

 export type UseInputBindings<Value,State extends Dict> = Value extends Dict ? Record<keyof State,{
    value:any
    onChange:(e:any)=>void
}> : Value

export type UseInputOptions<Value>={
    transfrom?:(input:Value,state:Dict)=>void
}

export type UseInputGetter<Value,State extends Record<string, any>>= (state:ComputedState<State>)=>Value

export interface UseInputType<State extends Dict> {
    (): UseInputBindings<State,State>
    <Value>(selector: string,options?:UseInputOptions<Value>): UseInputBindings<Value,State>
    <Value>(selector: string[],options?:UseInputOptions<Value>): UseInputBindings<Value,State>
    <Value>(getter: UseInputGetter<Value,State>,options?:UseInputOptions<Value>):UseInputBindings<Value,State>
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


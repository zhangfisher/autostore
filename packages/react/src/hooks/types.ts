import { AsyncComputedValue, ComputedState, Dict, ExtendAsyncOptions, WatchListener, WatchListenerOptions } from "autostore"
import { InputBindings } from "../form"
import { debounce } from '../utils/debounce';

// ********** useDeps ********** 

export interface UseDepsType<State extends Dict>{
    (selector: string,extendAsync?:ExtendAsyncOptions):string[][]
    (selector: string[],extendAsync?:ExtendAsyncOptions):string[][]
    (selector: (state:ComputedState<State>)=>any,extendAsync?:ExtendAsyncOptions):string[][]
    (selector:any,extendAsync?:ExtendAsyncOptions):string[][] 
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


// ********** useBindings **********  

 
 
export type FormBindingsState<T extends Dict> = {
    [K in keyof T]: T[K] extends Dict ? FormBindingsState<T[K]> 
                                        : ( T[K] extends any[] ? FormBindingsState<T[K]> 
                                            : Required<InputBindings<T[K]>>
                                        )
};

 
export interface UseFormBindingsType<State extends Dict> {
    (entry?: string,options?:WatchListenerOptions): FormBindingsState<ComputedState<State>> 
}



// ********** useForm **********  

export type UseFormResult={
    ref: React.RefObject<HTMLFormElement>  
}

export type UseFormOptions={
    debounce?:number            // 启用防抖
    validate?:(path:string[],value:any)=>boolean
}

export interface UseFormType {
    (entry?: string | string[],options?:UseFormOptions): UseFormResult
}


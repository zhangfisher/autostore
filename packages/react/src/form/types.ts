import { ComputedState, Dict } from "@autostorejs/core"

export type InputBindings<Value=any>={ 
    onChange?:(value:Value)=>void 
}
export type InputBindingsOptions = {
    debounce?:number 
}

export interface InputBindingsType<State extends Dict>{
    <Value=any>(selector: string):InputBindings<Value>
    <Value=any>(getter: (state:ComputedState<State>)=>Value,setter:(value:Value)=>void):InputBindings<Value>
}


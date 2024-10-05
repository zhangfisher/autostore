import { ComputedState, Dict } from "@autostorejs/core"

export type FormBindings<Value=any>={
    value:Value
    onChange:(value:Value)=>void
}


export interface FormInputBinder<State extends Dict>{
    <Value=any>(selector: string):FormBindings<Value>
    <Value=any>(getter: (state:ComputedState<State>)=>Value,setter:(value:Value)=>void):FormBindings<Value>
}


import { AutoStore, Dict, AutoStoreOptions } from "autostore";
import { createUseState } from "./hooks/useState";
import { createUseDeps } from "./hooks/useDeps";
import { createSignalComponent } from "./signal";
import type { SignalComponentType } from "./signal/types";
import { createInputBinding } from './form/bind';
import { InputBindingsType } from './form/types';
import { createUseField } from './form/useField';
import { UseDepsType,  UseStateType, UseWatchType, UseAsyncStateType } from './hooks/types';
import { UseInputType, UseFormBindingsType } from "./form/types"
import { createUseWatch } from './hooks/useWatch';
import { createUseBindings } from './form/useBindings';

export class ReactAutoStore<State extends Dict> extends AutoStore<State>{
    useState       : UseStateType<State>
    useAsyncState  : UseAsyncStateType
    useDeps        : UseDepsType<State>
    $              : SignalComponentType<State>
    signal         : SignalComponentType<State>
    bind           : InputBindingsType
    useField       : UseInputType<State>
    useWatch       : UseWatchType
    useBindings    : UseFormBindingsType<State>
    constructor(initial: State,options?:AutoStoreOptions<State>){
        super(initial,Object.assign({
            signalErrorBoundary : ()=><>ERROR</>
        },options))
        this.signal = this.$ = createSignalComponent(this).bind(this)
        this.useState = createUseState(this).bind(this)
        this.useAsyncState = (selector:any)=>this.useState(selector,true)[0]
        this.useDeps = createUseDeps(this).bind(this)
        this.useField = createUseField(this).bind(this)
        this.bind = createInputBinding(this).bind(this)
        this.useWatch = createUseWatch(this).bind(this)  
        this.useBindings = createUseBindings(this).bind(this)
    }  
} 

export function createStore<State extends Dict>(initial: State,options?:AutoStoreOptions<State>){
    return new ReactAutoStore<State>(initial,options);
}
 
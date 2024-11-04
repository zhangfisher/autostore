import React from "react";
import { AutoStore, Dict, AutoStoreOptions } from "autostore";
import { createUseState } from "./hooks/useState";
import { createUseDeps } from "./hooks/useDeps";
import { createSignalComponent } from "./signal";
import type { SignalComponentType } from "./signal/types";
import { createInputBinding } from './form/bind';
import { InputBindingsType } from './form/types';
import { createUseField } from './form/useField';
import { UseDepsType,  UseStateType, UseWatchType, UseReactiveType, UseComputedType } from './hooks/types';
import { UseFieldType, UseFieldsType } from "./form/types"
import { createUseWatch } from './hooks/useWatch';
import { createUseFields } from './form/useFields';
import { createUseComputed } from "./hooks/useComputed";

export class ReactAutoStore<State extends Dict > extends AutoStore<State>{
    useState        : UseStateType<State>
    useAsyncState   
    useDeps         : UseDepsType<State>
    $               : SignalComponentType<State>
    signal          : SignalComponentType<State>
    useWatch        : UseWatchType
    bind            : InputBindingsType
    useField        : UseFieldType<State>
    useFields       : UseFieldsType<State>
    useReactive     : UseReactiveType<State>
    useAsyncReactive
    useComputed     : UseComputedType<State> 
    constructor(initial: State,options?:AutoStoreOptions<State>){
        super(initial,Object.assign({
            signalErrorBoundary : ()=><>ERROR</>
        },options))
        this.signal           = this.$ = createSignalComponent(this).bind(this)
        this.useState         = createUseState(this).bind(this)
        this.useAsyncState    = (selector:any)=>this.useState<State>(selector,true)[0]
        this.useDeps          = createUseDeps(this).bind(this)
        this.useWatch         = createUseWatch(this).bind(this)  
        this.bind             = createInputBinding(this).bind(this)
        this.useField         = createUseField(this).bind(this)
        this.useFields        = createUseFields(this).bind(this)
        this.useReactive      = this.useState
        this.useAsyncReactive = this.useAsyncState.bind(this)
        this.useComputed      = createUseComputed(this).bind(this) 
        this.reset            = this.reset.bind(this)
    }  
} 

export function createStore<State extends Dict>(initial: State,options?:AutoStoreOptions<State>){
    return new ReactAutoStore<State>(initial,options);
}
 
 
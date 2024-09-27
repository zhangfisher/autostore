import { AutoStore, Dict, AutoStoreOptions } from '@autostorejs/core';
import { createUseState, UseStateType } from "./hooks/useState";
import { createUseDeps, UseDepsType } from "./hooks/useDeps";
import { createSignalComponent } from "./signal";
import type { SignalComponentType } from "./signal/types";

export class ReactAutoStore<State extends Dict> extends AutoStore<State>{
    useState:UseStateType<State>
    useDeps:UseDepsType<State>
    $:SignalComponentType<State>
    signal:SignalComponentType<State>
    constructor(initial: State,options?:AutoStoreOptions<State>){
        super(initial,options)
        this.signal = this.$ = createSignalComponent(this).bind(this)
        this.useState = createUseState(this).bind(this)
        this.useDeps = createUseDeps(this).bind(this)
    } 
} 

export function createStore<State extends Dict>(initial: State,options?:AutoStoreOptions<State>){
    return new ReactAutoStore<State>(initial,options);
}
 
import { AutoStore, Dict, AutoStoreOptions } from '@autostorejs/core';
import { createUseState } from "./hooks/useState";
import { createUseDeps } from "./hooks/useDeps";
import { createSignalComponent } from "./signal";
import type { SignalComponentType } from "./signal/types";
import { createInputBinding } from './form/input';
import { InputBindingsType } from './form/types';
import { createUseInput } from './hooks/useInput';
import { UseDepsType, UseInputType, UseStateType, UseWatchType } from './hooks/types';
import { createUseWatch } from './hooks/useWatch';

export class ReactAutoStore<State extends Dict> extends AutoStore<State>{
    useState:UseStateType<State>
    useDeps:UseDepsType<State>
    $:SignalComponentType<State>
    signal:SignalComponentType<State>
    bind:InputBindingsType
    useInput:UseInputType<State>
    useWatch:UseWatchType
    constructor(initial: State,options?:AutoStoreOptions<State>){
        super(initial,options)
        this.signal = this.$ = createSignalComponent(this).bind(this)
        this.useState = createUseState(this).bind(this)
        this.useDeps = createUseDeps(this).bind(this)
        this.useInput = createUseInput(this).bind(this)
        this.bind = createInputBinding(this).bind(this)
        this.useWatch = createUseWatch(this).bind(this)
    } 
} 

export function createStore<State extends Dict>(initial: State,options?:AutoStoreOptions<State>){
    return new ReactAutoStore<State>(initial,options);
}
 
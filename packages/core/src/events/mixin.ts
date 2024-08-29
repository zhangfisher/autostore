import mitt, { Emitter } from "mitt";
import { Dict } from "../types";
import type { AutoStore } from "../store";
import { StoreEvents } from "./types";

/**
 * 
 * 为Store提供事件功能
 * 
 */
export class EventMixin<State extends Dict>{
    protected _emitter:Emitter<StoreEvents> = mitt()
    get on(){ return this._emitter.on.bind(this) }
    get off(){ return this._emitter.off.bind(this) }
    get emit(){ return this._emitter.emit.bind(this) }    
    once<T extends keyof StoreEvents>(this:AutoStore<State>, event: T, handler: (payload:StoreEvents[T]) => void) {
        const phandler =(payload:StoreEvents[T]) => {
            try{
                handler(payload)
            }finally{            
                this._emitter.off(event,phandler)
            }
        }
        this._emitter.on(event,phandler)
    }

}
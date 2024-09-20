import mitt, { Emitter, EventType } from "mitt";

export type EventListener<T> = (event:T)=>void

export class EventEmitter<Events extends Record<EventType, unknown>>{    
    private _emitter:Emitter<Events> = mitt()
    on<T extends keyof Events>(event: T, listener: EventListener<Events[T]>){         
        this._emitter.on(event,listener)
        return {
            off:()=>this._emitter.off(event,listener)
        }
    }
    once<T extends keyof Events>(event: T, listener: EventListener<Events[T]>) {
        const plistener =(e:Events[T]) => {
            try{
                listener(e)
            }finally{            
                this._emitter.off(event,plistener)
            }
        }
        return this.on(event,plistener)
    }
    off<T extends keyof Events>(event: T, listener?: EventListener<Events[T]> | undefined){ 
        this._emitter.off<T>(event,listener) 
    }
    emit<T extends keyof Events>(event:T,payload:Events[T]){ 
        return this._emitter.emit(event,payload)
    }    
    offAll(){
        this._emitter.all.clear()
    }
}

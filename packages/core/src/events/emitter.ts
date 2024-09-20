import mitt, { Emitter, EventType, Handler } from "mitt";


export class EventEmitter<Events extends Record<EventType, unknown>>{    
    private _emitter:Emitter<Events> = mitt()
    on(type: keyof Events, handler: Handler<Events[keyof Events]>){         
        this._emitter.on(type,handler)
        return {
            off:()=>this._emitter.off(type,handler)
        }
    }
    once(type: keyof Events, handler: Handler<Events[keyof Events]>) {
        const plistener =(event:Events[keyof Events]) => {
            try{
                handler(event)
            }finally{            
                this._emitter.off(type,plistener)
            }
        }
        return this.on(type,plistener)
    }
    off(type: keyof Events, handler?: Handler<Events[keyof Events]> | undefined){ 
        this._emitter.off<keyof Events>(type,handler) 
    }
    emit(type: keyof Events,event:Events[keyof Events]){ 
        return this._emitter.emit(type,event)
    }    
    offAll(){
        this._emitter.all.clear()
    }
}

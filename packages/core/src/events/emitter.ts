import mitt, { Emitter, EventType } from "mitt";

export type EventListener<T> = (data:T)=>void

export class EventEmitter<Events extends Record<EventType, unknown>>{    
    private _emitter:Emitter<Events> = mitt()
    on<T extends keyof Events>(event: T, listener: EventListener<Events[T]>){         
        this._emitter.on(event,listener)
        return {
            off:()=>this._emitter.off(event,listener)
        }
    }
    once<T extends keyof Events>(event: T, listener: EventListener<Events[T]>) {
        const plistener =(data:Events[T]) => {
            try{
                listener(data)
            }finally{            
                this._emitter.off(event,plistener)
            }
        }
        return this.on(event,plistener)
    }
    off<T extends keyof Events>(event: T, listener?: EventListener<Events[T]> | undefined){ 
        this._emitter.off<T>(event,listener) 
    }
    emit<T extends keyof Events>(event:T,data:Events[T]){ 
        return this._emitter.emit(event,data)
    }    
    offAll(){
        this._emitter.all.clear()
    }
    onAny(listener:EventListener<any>){
        const plistener = (_:any,data:any)=>{            
            listener(data)
        }
        this._emitter.on('*',plistener)
        return {
            off:()=>this._emitter.off('*',plistener)
        }
    }
    /**
     * 等待某个事件触发
     * 
     * 可以指定超时时间
     */
    async wait<T extends keyof Events>(event:T,timeout?:number){
        return new Promise<Events[typeof event]>((resolve,reject)=>{
            const {off} = this.once(event,(data)=>{
                clearTimeout(timer)
                resolve(data)
            })
            const timer = timeout && setTimeout(()=>{
                off()
                reject(new Error('timeout'))
            },timeout)
        })
    }
}

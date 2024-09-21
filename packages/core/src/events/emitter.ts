import mitt, { Emitter, EventType } from "mitt";
import { PATH_DELIMITER } from "../consts";

export type EventHandler<T> = (data:T)=>void
export type EventListener = { off:()=>void }

const Delimiter = PATH_DELIMITER


/**
 * 判断事件是否匹配指定的通配符
 * 
 * @description
 * 
 * - * 代表一个分割区间内的任意字符
 * - **  代表任意字符
 * 
 * isEventMatched("a","*") == true
 * isEventMatched("a.b","*") == false
 * isEventMatched("a.b","a.*") == true
 * isEventMatched("a.b.c","a.*") == false
 * isEventMatched("a.b.c","a.*.*") == true
 * isEventMatched("a.b.c","a.*.c") == true
 * isEventMatched("a.b.c","a.*.d") == false
 * isEventMatched("a.b.c","**") == true
 * 
 * @param event 
 * @param pattern 
 * @returns 
 */
export function isEventMatched(event:string,pattern:string){
    if(!pattern) return true
    if(pattern==='**') return true    
    const eventParts = event.split(Delimiter)
    const patternParts = pattern.split(Delimiter)
    if(eventParts.length !== patternParts.length) return false
    for(let i=0;i<patternParts.length;i++){
        if(patternParts[i] === '*') continue
        if(patternParts[i] !== eventParts[i]) return false
    }
    return true
}

export class EventEmitter<Events extends Record<EventType, unknown>>{    
    private _emitter:Emitter<Events> = mitt()
    get listeners(){ return this._emitter.all }
    /**
     * 订阅事件
     * 
     * @description
     * 
     * 支持简单的通配符订阅， *代表一个分割区间内的任意字符，**代表任意字符
     * 
     * @param event 
     * @param handler 
     * @returns 
     */
    on<T extends keyof Events>(event: T, handler: EventHandler<Events[T]>):EventListener{
        if(String(event).includes('*')){  // 订阅时包含了通配符     
            this._emitter.on('*',(type,data)=>{
                if(isEventMatched(type as string,event as any)){
                    handler(data as any)
                }
            })
        }else{
            this._emitter.on(event,handler)
        }        
        return {
            off:()=>this._emitter.off(event,handler)
        }
    }
    once<T extends keyof Events>(event: T, handler: EventHandler<Events[T]>) :EventListener{
        const plistener =(data:Events[T]) => {
            try{
                handler(data)
            }finally{            
                this._emitter.off(event,plistener)
            }
        }
        return this.on(event,plistener)
    }
    off<T extends keyof Events>(event: T, handler?: EventHandler<Events[T]> | undefined){ 
        this._emitter.off<T>(event,handler) 
    }
    emit<T extends keyof Events>(event:T,data:Events[T]){ 
        return this._emitter.emit(event,data)
    }    
    offAll(){
        this._emitter.all.clear()
    }
    onAny(handler:EventHandler<any>){
        const plistener = (_:any,data:any)=>{            
            handler(data)
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
            const { off } = this.once(event,(data)=>{
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

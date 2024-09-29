import mitt, { Emitter, EventType } from "mitt";
import { PATH_DELIMITER } from "../consts";

export type EventHandler<T> = (event:T)=>void
export type AnyEventHandler<T extends Record<string, unknown>> = (event: T[keyof T], type: keyof T) => void;
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
     * @param type 
     * @param handler 
     * @returns 
     */
    on<T extends keyof Events>(type: T, handler: EventHandler<Events[T]>):EventListener{
        if(String(type).includes('*')){  // 订阅时包含了通配符     
            this._emitter.on('*',(eventtype,event)=>{
                if(isEventMatched(eventtype as string,type as any)){
                    handler(event as Events[T])
                }
            })
        }else{
            this._emitter.on(type,handler)
        }        
        return {
            off:()=>this._emitter.off(type,handler)
        }
    }
    once<T extends keyof Events>(type: T, handler: EventHandler<Events[T]>) :EventListener{
        const plistener =(data:Events[T]) => {
            try{
                handler(data)
            }finally{            
                this._emitter.off(type,plistener)
            }
        }
        return this.on(type,plistener)
    }
    off<T extends keyof Events>(type: T, handler?: EventHandler<Events[T]> | undefined){ 
        this._emitter.off<T>(type,handler) 
    }
    emit<T extends keyof Events>(type:T,event:Events[T]){ 
        return this._emitter.emit(type,event)
    }    
    offAll(){
        this._emitter.all.clear()
    }
    /**
     * 订阅所有事件
     * 
     * @description
     * 
     * @param handler 
     * @param before  将事件处理器添加到事件处理器列表的前面
     * @returns 
     */
    onAny(handler:AnyEventHandler<Events>){ 
        const phandler = (type:any,event:any)=>{
            handler(event,type)
        }
        this._emitter.on('*',phandler) 
        return {
            off:()=>this._emitter.off('*',phandler)
        }
    }
    /**
     * 等待某个事件触发
     * 
     * @example
     * 
     * - 等待computed:done事件触发
     * const event = await wait("computed:done")
     * - 等待满足条件的事件触发
     * const event = await wait((event)=>{
     *    return false 继续等待
     *    return other  返回不再等待
     * })
     * 
     * 可以指定超时时间
     */
    wait<T extends keyof Events >(filter:(type:T,event:Events[T])=>boolean | undefined | void,timeout?:number):Promise<Events[T]>
    wait<T extends keyof Events>(type:T,timeout?:number):Promise<Events[T]>
    wait<T extends keyof Events>():Promise<Events[T]>{
        const firstType = typeof(arguments[0]) 
        const eventType = firstType==='string' ? arguments[0] : undefined
        const timeout = arguments[1] || 0
        const filter = firstType==='function' ? firstType : undefined
        let timeId:any 
        return new Promise<any>((resolve,reject)=>{
            let listener:EventListener 
            if(eventType){
                listener= this.once(eventType,(event)=>{
                    clearTimeout(timeId)
                    resolve(event)
                })
            }else if(typeof(filter)==='function'){
                listener= this.onAny((event,type)=>{                    
                    const r= (filter as any)(type,event)
                    if(r!==false){
                        listener.off()
                        clearTimeout(timeId)                                                       
                        resolve(event)
                    }               
                })
            }            
            if(timeout >0 ){
                timeId = setTimeout(()=>{
                    listener.off()
                    reject(new Error('timeout'))
                },timeout)
            }            
        })
    }
}

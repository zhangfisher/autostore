import { PATH_DELIMITER } from "../consts";

const Delimiter = PATH_DELIMITER

export type EventHandler<T,P> = (payload:P,type:T)=>void
export type EventListener = { off:()=>void }
export type EventHandlerList = Array<EventHandler<any,any>>; 

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
 * @param type 
 * @param pattern 
 * @returns 
 */
export function isEventMatched(type:string,pattern:string){
    if(!pattern) return true
    if(pattern==='**') return true    
    const eventParts = type.split(Delimiter)
    const patternParts = pattern.split(Delimiter)
    if(eventParts.length !== patternParts.length) return false
    for(let i=0;i<patternParts.length;i++){
        if(patternParts[i] === '*') continue
        if(patternParts[i] !== eventParts[i]) return false
    }
    return true
}

type EventDefines = {
    [key:string]:any    
}

export class EventEmitter<Events extends EventDefines>{     
    private _listeners = new Map< keyof Events,EventHandlerList>()
    
    get listeners(){ return this._listeners }

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
    
    on<T extends keyof Events>(type: T, handler: EventHandler<T,Events[T]>,prepend ?:boolean):EventListener
    on<P=any>(type: '**', handler: EventHandler<keyof Events,P>,prepend ?:boolean):EventListener
    on():EventListener{
        const type = arguments[0]
        const handler = arguments[1]
        const prepend = arguments[2]
        let phandler = handler
        // 当订阅时包含了通配符时，就需要订阅所有事件，然后在事件触发时判断是否匹配
        if(type==='**'){
            this.addHandler("*",phandler,prepend)
        }else if(String(type).includes('*')){  
            phandler = (payload:any,etype:any)=>{
                if(isEventMatched(etype as string,type as any)){
                    handler(payload,etype)
                }
            }
            this.addHandler("*",phandler,prepend)
        }else{
            this.addHandler(type,phandler,prepend)
        }               
        return {
            off:()=>this.off(type,phandler)
        }
    } 
    /**
     * 向指定类型的事件添加事件处理程序。
     * @template T - 事件类型的键，必须是 Events 接口中的一个键。
     * @param { keyof Events} type - 事件类型，必须是 Events 接口中的一个键。
     * @param {EventHandler<Events[T]>} handler - 事件处理程序函数，它接受一个参数，该参数的类型是 Events 接口中对应 type 键的值的类型。
     * @param {boolean} [prepend=false] - 可选参数，如果为 true，则将处理程序添加到列表的开头，否则添加到末尾。这会影响事件的触发顺序。
     */
    private addHandler<T extends  keyof Events>(type:  keyof Events, handler: EventHandler<T,Events[T]>,prepend ?:boolean){
        const handlers: EventHandlerList | undefined = this._listeners.get(type);        
        if (handlers) {
            if(prepend){
                handlers.unshift(handler) 
            }else{
                handlers.push(handler);
            }            
        } else {
            this._listeners!.set(type, [handler]);
        }
    }

    once<T extends  keyof Events>(type: T, handler: EventHandler<T,Events[T]>) :EventListener{
        const plistener = (payload:Events[T],type:T) => {
            try{
                handler(payload,type as T)
            }finally{            
                this.off(type,plistener)
            }
        }  
        return this.on<T>(type,plistener)
    }

    off<T extends  keyof Events>(type: T, handler?: EventHandler<T,Events[T]> | undefined){ 
        if(String(type).includes("*")) type="*" as any
        const handlers: EventHandlerList | undefined = this._listeners.get(type);
        if (handlers) {
            if (handler) {
                handlers.splice(handlers.indexOf(handler) >>> 0, 1);
            } else {
                this._listeners.set(type, []);
            }
        }
    }  
    offAll(){
        this._listeners.clear()
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
    onAny(handler:EventHandler<string,any>){ 
        return this.on('**',handler) 
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
    wait<T extends  keyof Events >(filter:(type:T,payload:Events[T])=>boolean | undefined | void,timeout?:number):Promise<Events[T]>
    wait<T extends  keyof Events>(type:T,timeout?:number):Promise<Events[T]>
    wait<T extends  keyof Events>():Promise<Events[T]>{
        const firstArgType = typeof(arguments[0]) 
        const eventType = firstArgType==='string' ? arguments[0] : undefined
        const timeout = arguments[1] || 0
        const filter = firstArgType==='function' ? firstArgType : undefined
        let timeId:any 
        return new Promise<any>((resolve,reject)=>{
            let listener:EventListener 
            if(eventType){
                listener= this.once(eventType,(payload)=>{
                    clearTimeout(timeId)
                    resolve(payload)
                })
            }else if(typeof(filter)==='function'){
                listener= this.onAny((payload,type)=>{                    
                    const r= (filter as any)(type,payload)
                    if(r!==false){
                        listener.off()
                        clearTimeout(timeId)                                                       
                        resolve(payload)
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
    emit<T extends keyof Events>(type:T,payload:Events[T]){ 
        let handlers = this._listeners.get('*');
        if (handlers) {
            handlers.slice()
                .map((handler) => {
                    handler(payload,type );
                })
        }
        handlers = this._listeners.get(type);
        if (handlers) {
            handlers.slice().map((handler) => {
                handler(payload,type);
            })
        }
    }
    /**
     * 
     * 构建一个事件作用域，在该作用域内的事件都会被添加指定的前缀
     * 
     * const scope = emitter.scope("prefix")
     * 
     * scope.on("*",(payload,type)=>{...type===event }) == emitter.on("prefix.*",(payload,type)=>{ type==="prefix.event"}) })
     * scope.on("event",(payload,type)=>{...type===event }) == emitter.on("prefix.event",(payload,type)=>{ type==="prefix.event"}) })
     * scope.emit("event") == emitter.emit("prefix.event")
     * scope.off("event") == emitter.off("prefix.event")
     * scope.wait("event") == emitter.wait("prefix.event")
     * 
     * @param prefix 
     * @returns 
     */
    scope(prefix:string){
        const self = this
        const scope = new Proxy(this,{
            get(target,key,receiver){
                const value = Reflect.get(target,key,receiver)
                if(key==='on' || key==='once'){
                    return (type:string,handler: EventHandler<any,any>,prepend ?:boolean)=>{
                        return (value as any).call(scope,`${prefix}${PATH_DELIMITER}${type}`,
                            (payload:any,type:string)=>{
                                handler(payload,type.slice(prefix.length+1))
                            },
                            prepend)
                    }
                }else if(key==='off'){
                    return (type:string)=>(value as any).call(scope,`${prefix}${PATH_DELIMITER}${type}`)
                }else if(key==='emit'){
                    return (type:string,payload:any)=>(value as any).call(scope,`${prefix}${PATH_DELIMITER}${type}`,payload)
                }else if(key==='wait'){
                    return (...args:any[])=>{
                        if(typeof(args[0])==='string'){
                            args[0] = `${prefix}${PATH_DELIMITER}${args[0]}` as string
                            (value as any).call(scope,...args)
                        }else if(typeof(args[0])==='function'){
                            const filter = args[0]
                            args[0] = (type:string,payload:any)=>{
                                if(type.startsWith(prefix)){
                                    filter(type.slice(prefix.length+1),payload)
                                }
                            }
                            (value as any).call(scope,...args)
                        }                        
                    }
                }else if(key ==='offAll'){
                    return ()=>{ // 移除所有以prefix.开头的事件                       
                        for( let [type] of self._listeners.entries()){
                            if(type ==='*') continue
                            if(typeof(type)==='string' && type.startsWith(`${prefix}.`)){
                                self._listeners.delete(type)
                            }
                        }
                    }
                }else if(key ==='onAny'){
                    return (handler:EventHandler<string,any>)=>{
                        return self.on(`${prefix}${PATH_DELIMITER}**`,handler)
                    }
                }else if(key ==='scope'){
                    return undefined
                }
                return value
            }
        })
        return scope
    }


}
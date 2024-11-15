/**
 * 
 * 为EventEmitter创建一个独立的事件域
 * 
 * 在该事件域内，所有的事件名称都会被添加一个前缀
 * 
 * - 侦听器可以通过on,once,off,emit等方法操作事件
 * - 触发事件名称都会被添加前缀
 * - 侦听到的事件名称也会被去掉前缀
 * 
 * 
 */
import { PATH_DELIMITER } from '../consts';
import { EventEmitter, EventHandler } from './emitter';
import { EventDefines } from './types';



export function createEventEmitterScope<Events extends EventDefines>(emitter:EventEmitter<Events>, prefix:string){
        const scope = new Proxy(emitter,{
            get(target,key,receiver){
                if(key==='on'){
                    return (type:string,handler: EventHandler<any,any>,prepend ?:boolean)=>{
                        return emitter.on(`${prefix}${PATH_DELIMITER}${type}`,
                            (payload:any,type:string)=>handler(payload,type.slice(prefix.length+1)),prepend)
                    }
                }else if(key==='once'){
                    return (type:string,handler: EventHandler<any,any>)=>{
                        return emitter.once(`${prefix}${PATH_DELIMITER}${type}`,
                            (payload:any,type:string)=>{
                                handler(payload,type.slice(prefix.length+1))
                            })
                    }
                }else if(key==='off'){
                    return (type:string,handler: any)=>emitter.off(`${prefix}${PATH_DELIMITER}${type}`,handler)
                }else if(key==='emit'){
                    return (type:string,payload:any)=>emitter.emit(`${prefix}${PATH_DELIMITER}${type}`,payload)
                }else if(key==='wait'){
                    return async (...args:any[])=>{
                        if(typeof(args[0])==='string'){
                            args[0] = `${prefix}${PATH_DELIMITER}${args[0]}` as string
                            // @ts-ignore
                            return emitter.wait(...args)
                        }else if(typeof(args[0])==='function'){
                            const filter = args[0]
                            args[0] = (type:string,payload:any)=>{
                                if(type.startsWith(prefix)){
                                    filter(type.slice(prefix.length+1),payload)
                                }
                            }
                            // @ts-ignore
                            return emitter.wait(...args)
                        }                        
                    }
                }else if(key ==='offAll'){
                    return ()=>{ // 移除所有以prefix.开头的事件                       
                        for( let [type] of emitter.listeners.entries()){
                            if(type ==='*') continue
                            if(typeof(type)==='string' && type.startsWith(`${prefix}.`)){
                                emitter.listeners.delete(type)
                            }
                        }
                    }
                }else if(key ==='onAny'){
                    return (handler:EventHandler<string,any>)=>{
                        return emitter.on(`${prefix}${PATH_DELIMITER}**`,(payload:any,type:string)=>{
                            handler(payload,type.slice(prefix.length+1))
                        })
                    }
                }else if(key ==='scope'){
                    return (subPrefix:string)=>{ // 递归创建作用域
                        return createEventEmitterScope(emitter,`${prefix}${PATH_DELIMITER}${subPrefix}`)
                    }
                }
                return Reflect.get(target,key,receiver)
            }
        })
        return scope
}
import type { StateOperate, StateOperateType } from "../store/types"
import type { WatchObject } from "./watchObject"
import type { EventListener } from "../events/emitter"
import { ObserverDescriptor, ObserverDescriptorBuilder, ObserverOptions } from "../observer/types"

export type WatchListener<Value=any,Parent=any> = (operate:StateOperate<Value,Parent>)=>void

export type WatchListenerOptions = {
    once?    : boolean                                      // 只侦听一次后自动移除
    operates?: '*' | 'read' | 'write' | StateOperateType[]     // 只侦听的操作类型
    filter?  : (args:StateOperate)=>boolean           // 过滤器
}
export type Watcher = EventListener


export type WatchDependFilter<Value=any> = (path:string[],value:Value)=>boolean     

  

export interface WatchOptions<Value=any> extends ObserverOptions<Value>  { 
    async?  : false                        
    filter : WatchDependFilter<Value>     
}

export type WatchScope<Value=any> = {
  path : string[],
  value: Value
}

export type WatchGetter<Value=any,DependValue= any> = (
    scope: {path:string[],value:DependValue},
    watchObject : WatchObject<Value>
)=>Exclude<Value,Promise<any>> //| undefined

export type WatchDescriptor<Value=any, DependValue=any> = ObserverDescriptor<
  'watch',
  Value,
  WatchScope<DependValue>,
  WatchGetter<Value,DependValue>,
  WatchOptions<Value>
>

/**
 * @template Value  监听函数的返回值类型
 * @template Scope 监听函数的第一个参数的类型
 */
export type WatchDescriptorBuilder<Value = any,DependValue=any>
  = ObserverDescriptorBuilder<'watch',Value,WatchScope<DependValue>,WatchDescriptor<Value,DependValue>>




import type { FlexEventSubscriber } from "flex-tools/events/flexEvent"
import type { StateOperateParams, StateOperates } from "../store/types"
import type { WatchObject } from "./watchObject"
import type { IDescriptor, IDescriptorBuilder, IDescriptorOptions } from "../descriptor"


export type WatchListener<T=any,P=any> = (args:StateOperateParams<T,P>)=>void
export type WatchListenerOptions = {
    once?    : boolean                                  // 只侦听一次后自动移除
    operates?: StateOperates[]                          // 只侦听的操作类型
    filter?  : (event:StateOperateParams)=>boolean      // 过滤器
}
export type Watcher = FlexEventSubscriber



export type WatchDepends<T=any> = (path:string[],value:T)=>boolean
export type WatchDependParams<T=any> = string | (string | string[])[] | WatchDepends<T>
 

export interface WatchOptions<Value=any,DependValue= any> extends IDescriptorOptions<Value,DependValue>{ 
    async?:false             // watch只能是同步
    depends?:WatchDepends<DependValue>
}

export type WatchScope<Value=any> = {
  path : string[],
  value: Value
}

export type WatchGetter<Value=any,DependValue= any> = (
    scope:{path:string[],value:DependValue},
    args:WatchObject<Value>
)=>Exclude<any,Promise<any>> | undefined

export type WatchDescriptor<Value=any, Scope extends WatchScope=WatchScope> = IDescriptor<
  'watch',
  Value,
  Scope,
  WatchGetter<Value,Scope>,
  WatchOptions<Value>
>

/**
 * @template Value  监听函数的返回值类型
 * @template Scope 监听函数的第一个参数的类型
 */
export type WatchDescriptorBuilder<Value = any,Scope extends WatchScope=WatchScope>
  = IDescriptorBuilder<WatchDescriptor<Value,Scope>> 




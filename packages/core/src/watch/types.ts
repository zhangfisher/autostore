import type { FlexEventSubscriber } from "flex-tools/events/flexEvent"
import type { StateOperateParams, StateOperates } from "../store/types"
import type { WatchObject } from "./watchObject"
import { COMPUTED_DESCRIPTOR_FLAG } from "../consts"
import { Dict } from "../types"


export type WatchListener<T=any,P=any> = (args:StateOperateParams<T,P>)=>void
export type WatchListenerOptions = {
    once?    : boolean                                  // 只侦听一次后自动移除
    operates?: StateOperates[]                          // 只侦听的操作类型
    filter?  : (event:StateOperateParams)=>boolean      // 过滤器
}
export type Watcher = FlexEventSubscriber



export type WatchDepends<T=any> = (path:string[],value:T)=>boolean
export type WatchDependParams<T=any> = string | (string | string[])[] | WatchDepends<T>



/**
 * selfPath=当前watch函数所在的位置
 * fromPath=watch函数侦听的位置，即发生变化的源路径
 */
export type WatchGetterArgs<Result=any> = {
  getSelfValue: ()=>Result ,
  selfPath    : string[],
  fromPath    : string[],
  getCache    : ()=>Dict,
  object      : WatchObject<any>
}

export type WatchGetter<Value=any, Result=Value> = (path:string[],value:Value,args:WatchGetterArgs)=>(Exclude<Result,Promise<any>> | undefined)

export type WatchDescriptor<Value=any, Result=Value> = {
    type   : 'watch',           
    getter : WatchGetter<Value,Result>;
    options  : WatchOptions<Result>;                  
  }

export interface WatchDescriptorBuilder<Value = any,Result=Value> {
  ():WatchDescriptor<Value,Result>; 
  [COMPUTED_DESCRIPTOR_FLAG]     : true 
} 



export interface WatchOptions<R=any>{ 
    id?       : string                         
    depends?  : WatchDepends                  // 依赖
    initial?  : R,                            // 初始值
    group?    : string                        // 用来对表单内的watch进行分组，以便能按组进行enable或disable或其他操作
    enable?   : boolean                       // 启用或禁用watch，默认为true
    objectify?: boolean
}
 
import type { FlexEventSubscriber } from "flex-tools/dist/events/flexEvent"
import type { StateOperateParams, StateOperates } from "../store/types"


export type WatchListener<T=any,P=any> = (args:StateOperateParams<T,P>)=>void
export type WatchOptions = {
    once?    : boolean                              // 只侦听一次后自动移除
    operates?: StateOperates[]                      // 只侦听的操作类型
    filter?  : (event:StateOperateParams)=>boolean  // 过滤器
}
export type Watcher = FlexEventSubscriber

import { ComputedObject } from "../computed/computedObject";
import type { AutoStore } from "../store";
import type { WatchObject } from "../watch/watchObject";

export type StoreEvents = {
    'load'              : AutoStore<any>;                               // 响应对象创建后
    'unload'            : AutoStore<any>                                // 响应对象销毁后
    'reset'             : AutoStore<any>                                // 对象重置后
    'computed:created'  : ComputedObject                                // 当计算对象创建时
    'computed:done'     : {id:string,path:string[],value:any,computedObject:ComputedObject}           // 当计算函数执行成功后
    'computed:error'    : {id:string,path:string[],error:any,computedObject:ComputedObject}           // 当计算函数执行出错时
    'computed:cancel'   : {id:string,path:string[],reason:'timeout' | 'abort' | 'reentry' | 'error',computedObject:ComputedObject}       // 当计算函数被取消时
    'watch:created'     : WatchObject
    'watch:done'        : {value:any,watchObject:WatchObject}
    'watch:error'       : {error:any,watchObject:WatchObject}
};
 
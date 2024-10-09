import { ComputedObject } from "../computed/computedObject"
import { ComputedScope  } from "../computed/types"
import { ObserverType } from "../observer/types"
import { Dict } from "../types"
import type { AutoStore } from "./store"

export type BatchChangeEvent= '__batch_update__'
export type StateChangeEvents = Record<string,StateOperate>

export type StateOperateType = 'get' | 'set' | 'delete'                   // 用于对象
                            | 'insert' | 'update' | 'remove'           // 用于数组  
                            | 'batch'                                  // 批量操作

export type StateOperate<Value=any,Parent=any> = {
    type       : StateOperateType,
    path       : string[],
    value      : Value,
    indexs?    : number[],               // 数组操作时，操作的索引，如[1,2]表示操作了数组的第1个和第2个元素
    oldValue?  : Value,
    parentPath?: string[],
    parent?    : Parent,    
    /**
     * 是否是批量操作时的回放事件
     */
    reply?     : boolean               
}
 

export interface AutoStoreOptions<State extends Dict> {
    /**
     * 提供一个id，用于标识当前store
     */
    id?:string

    /**
     * 是否启用调试模式
     * @description
     * 
     * 调试模式下会在控制台输出一些日志信息
     * 
     */
    debug?:boolean 

    /**
     *  是否马上创建动态对象
     * 
     * 
     * @description
     * 
     * 默认情况下，计算函数仅在第一次读取时执行,
     * 如果lazy=true时，则延迟创建计算对象
     * 
     * @default true
     * 
    */
    lazy?: boolean 
    /**
      * 是否启用计算
      * 
      * @description
      * 
      * 当enableComputed=false时，会创建计算属性，但不会执行计算函数
      * 可以通过enableComputed方法启用
      * 
      * 相当于全局计算总开关
      * 
      *       
      * 
    */
    enableComputed?:boolean
    
    /**
     * 获取计算函数的根scope
     * 
     * @description
     * 
     * 计算函数在获取scope时调用，允许修改其根scope
     * 
     * 默认指向的是当前根对象，此处可以修改其指向
     * 
     * 比如,return  state.fields，代表计算函数的根指向state.fields
     * 这样在指定依赖时，如depends="count"，则会自动转换为state.fields.count
     * 
     */
    getRootScope?:(state:State,options:{observerType:ObserverType, valuePath:string[] | undefined}) => any

    /**
     * 
     * 为所有动态值对象提供默认的scope参数
     *    
     * @description
     * 默认情况下，所有computedObject,watchObject的scope参数均为CURRENT
     * 可以通过此参数来为所有的computedObject,watchObject提供默认的scope参数
     * 比如让所有的computedObject,watchObject的默认scope参数均为ROOT 
     * 
     */
    scope?: ComputedScope
    /**
     * 当启用debug=true时用来输出日志信息
     * 
     * @param message 
     * @param level 
     * @returns 
     */
    log?:(message:any,level?:'log' | 'error' | 'warn')=>void  
    
    /**
     * 
     * 当创建计算属性时调用
     * 
     * @description
     * 
     * 允许在此对计算对象进行一些处理，比如重新封装getter函数，或者直接修改ComputedOptions
     * 
     * @example
     * 
     * createStore({...},{
     *  onCreateComputed(computedObject){
     *      const oldGetter = computedObject.getter
     *      computedObject.getter = function(){
     *          do something
     *          return oldGetter.call(this,...arguments) 
     *      }
     *  }
     * })  
     * @param this 
     * @param computedObject 
     * @returns 
     */
    onComputedCreated?:(this:AutoStore<State>,computedObject:ComputedObject)=> void
    
    /**
     * 当每一次计算完成后调用
     * @param this 
     * @param computedObject 
     * @returns 
     */
    onComputedDone?:(this:AutoStore<State>,args:{id:string,path:string[],value:any,computedObject:ComputedObject})=> void

    /**
     * 当计算出错时调用
     * @param this 
     * @param error 
     * @param computedObject 
     * @returns 
     */    
    onComputedError?:(this:AutoStore<State>,args:{id:string,path:string[],error:Error,computedObject:ComputedObject})=> void
    /**
     * 当每一次计算对象被取消时调用
     * 仅在异步计算时有效
     * @param this 
     * @param computedObject 
     * @returns 
     */
    onComputedCancel?:(this:AutoStore<State>,args:{id:string,path:string[],reason:'timeout' | 'abort' | 'reentry' | 'error',computedObject:ComputedObject<any>})=> void

}




export type UpdateOptions = {
    /**
     * 执行批量更新操作，期间不会触发事件，等更新函数执行后再触发batch事件
     *  =false 不执行批量更新操作
     *  =true  执行批量更新操作，批量更新事件名称为__batch_update__
     *  <string> 执行批量更新操作，批量更新事件名称为指定的字符串
     */
    batch?:boolean | string,         
    silent?:boolean,        // 执行更新操作时，静默，不会触发任何事件
    peep?:boolean           // 执行更新操作时，不会触发GET事件
    /**
     * 在批量更新结束后，会自动回放update(()=>{...})之间的所有操作事件
     * 然后再触发一个__batch_update__事件
     * 
     * @description
     * 
     * =true 默认会回放所有操作事件
     * =false 不会回放操作事件,仅会触发__batch_update__事件
     */
    reply?:boolean
}


export type StateTracker= {
    stop:()=>void,
    start(isStop?:(operate:StateOperate)=>boolean):Promise<StateOperate[]>
}
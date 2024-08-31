/**
 * 
 * 创建一个响应式对象
 * 
 * @example
 * const state = createState({
 *      firstName: 'John',
 *      lastName: 'Doe'
 *      age: 30
 *      address: [
 *          {city: 'New York', street: 'Wall Street'},
 *          {city: 'Los Angeles', street: 'Hollywood Blvd'}
 *          {city: 'San Francisco', street: 'Golden Gate'}
 *      ],
 *      job: {
 *          title: 'Software Engineer',
 *          company: 'Google'
 *          salary: 100000
 *      }    
 * })
 * 
 * 侦听读取
 * state.on({
 *      type,               // 操作，取值: get,set,delete,insert
 *      path,               // 发生变化的路径，如：job.title，或者address.0.city
 *      value,              // 变化后的值
 *      oldValue,           // 变化前的值
 *      parentPath          // 发生变化的父路径
 *      parent              // 发生变化的父对象值
 * }=>{
 *  console.log(type, path, value, oldValue, parentPath, parent)
 * })
 * 
 * state.firstName = "Li"          // set firstName
 * console.log(signal.address[0].city)  // get address.0.city
 * 
 * state.on("address",({value})=>{
 * 
 * 
 * 侦听数组操作
 * state.on("对象路径，如job.title",({value})=>{ *      
 * })
 * 
 * state.on("computed:created")    内置事件
 * 
 * state.watch("job.title",({value})=>{})
 * state.watch(({value})=>{
 * 
 * })
 * 
 */
 
import { ComputedObjects } from "../computed/computedObjects"; 
import { FlexEvent } from "flex-tools/events/flexEvent"
import { assignObject } from "flex-tools/object/assignObject"
import { StateOperateParams, StateOperates } from "./types";
import type { Dict } from "../types";
import { log, LogLevel, LogMessageArgs } from "../utils/log"; 
import { getId } from "../utils/getId";  
import { ComputedObject } from "../computed/computedObject";
import { DynamicValueContext, DynamicValueDescriptor, DynamicValueScope, DynamicValueType } from "../dynamic";
import { isRaw } from "../utils/isRaw";
import { hookArrayMethods } from "./hookArray";
import { SyncComputedObject } from "../computed/sync";
import { ComputedDescriptor } from "../computed/types";
import { Watcher, WatchListener, WatchOptions } from "../watch/types";
import { createDynamicValueDescriptor } from "../dynamic/utils";
import mitt, { Emitter } from "mitt";
import { StoreEvents } from "../events/types";
import { getVal } from "../utils";
import { OBJECT_PATH_DELIMITER } from "../consts";
import { createReactiveObject, ReactiveNotifyParams } from "./reactive";

export type AutoStoreOptions<State extends Dict> = {
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
     * 如果immediate=true时，则在创建Store时遍历对象触发对读操作从而马上创建计算对象
     * 
     * @default false
     * 
    */
    immediate?: boolean 
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
     * 
     * 
     * @param keyPath 
     * @param getter 
     * @param options 
     * @returns 
     */
    onCreateComputed?:(this:AutoStore<State>,computedObject:ComputedObject)=> void 
    
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
    getRootScope?:(state:State,options:{dynamicType:DynamicValueType, valuePath:string[]}) => any

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
    scope?: DynamicValueScope
    /**
     * 当启用debug=true时用来输出日志信息
     * 
     * @param message 
     * @param level 
     * @returns 
     */
    log?:(message:any,level?:'log' | 'error' | 'warn')=>void  
}


type StateNotifier = (type:StateOperates, path: string[], indexs:number[] , value: any, oldValue: any, parentPath: string[], parent: any)=>void

export class AutoStore<State extends Dict>{
    private _data: State;
    public computedObjects: ComputedObjects<State>  
    protected _changesets:FlexEvent<StateOperateParams> = new FlexEvent<StateOperateParams>({wildcard:true,delimiter:"."})    
    private _options: Required<AutoStoreOptions<State>>
    private _batching = false           // 当执行批量更新时为true
    private _peeping:boolean = false
    constructor(state: State,options?:AutoStoreOptions<State>) { 
        this._options = assignObject({
            id       : getId(),
            debug    : false,
            immediate: false,
            log,
            enableComputed:true,
        },options) as Required<AutoStoreOptions<State>>        
        this.computedObjects = new ComputedObjects(this)
        this._data = createReactiveObject(state,{
            notify:this.notice.bind(this),
            createDynamicValueObject:this.createDynamicValueObject.bind(this)
        })
    }
    get id(){return this._options.id}
    get state() {return this._data;  }
    get changesets(){return this._changesets}    
    get options(){return this._options}
    log(message:LogMessageArgs,level?:LogLevel){if(this._options.debug) this.options.log(message,level)} 
    /**
     * 
     * 当状态读写时调用此方法触发事件
     * type:StateOperates, path: string[], indexs:number[] , value: any, oldValue: any, parentPath: string[], parent: any
     */
    private notice(params:ReactiveNotifyParams) {          
        if(this._peeping && params.type=='get') return    // 偷看时不触发事件
        this.changesets.emit(params.path.join('.'),params)       
    } 
    // ************* Computed **************/
    /**
     * 
     * 创建一个计算属性对象
     * 
     * 当data中的成员是一个函数时，会自动创建一个计算属性对象
     * 
     * 
     */
    private createComputed(valueContext:DynamicValueContext,descriptor:DynamicValueDescriptor){
        if(descriptor.options.async){
        }else{
            const computedObj = new SyncComputedObject<State>(this,valueContext,descriptor as ComputedDescriptor)                
            return computedObj.initial 
        }       
    }  
    // ************* Watch **************/
    /**
     * 监视数据变化，并在变化时执行指定的监听器函数。
     * 
     * @example
     * 
     * - 侦听所有的数据变化
     *  
     * const unwatch = state.watch(({type,path,value,oldValue,parentPath,parent})=>{})
     * 
     * - 侦听指定路径的数据变化
     * 
     * const unwatch = state.watch("job.title",({type,path,value,oldValue,parentPath,parent})=>{})
     * 
     * - 侦听多个路径的数据变化
     * 
     * const unwatch = state.watch(["job.title","job.salary"],({type,path,value,oldValue,parentPath,parent})=>{})
     * 
     * - 侦听通配符路径的数据变化
     * 
     * const unwatch = state.watch("job.*",({type,path,value,oldValue,parentPath,parent})=>{})
     * 
     * 
     * 
     * @param {string|string[]} keyPaths - 要监视的数据路径，可以是单个字符串或字符串数组。
     * @param {WatchListener} listener - 当监视的数据路径变化时执行的回调函数。
     * @param {WatchOptions} [options] - 可选参数，用于配置监视行为。
     * @returns {Watcher} - 返回一个表示监听器的数字标识符，用来取消监听。
     */    
    watch(listener:WatchListener,options?:WatchOptions):Watcher
    watch(keyPaths:string | (string|string[])[],listener:WatchListener,options?:WatchOptions):Watcher
    watch():Watcher{
        const isWatchAll = typeof(arguments[0])==='function'
        const listener = isWatchAll ? arguments[0] : arguments[1]

        const createSubscribe =(operates:StateOperates[],filter:WatchOptions['filter'])=>(event:StateOperateParams)=>{
            if(operates && Array.isArray(operates) && operates.length>0 ){     // 指定操作类型                
                if(!operates.includes(event.type)) return
            }
            if(typeof(filter)==='function' && !filter(event)) return
            listener.call(this,event)                    
        }        
        if(isWatchAll){ // 侦听全部
            const {once,operates,filter} = Object.assign({once:false,operates:[]},arguments[1])  as Required<WatchOptions>
            const subscribeMethod = once ? this.changesets.once : this.changesets.on
            return subscribeMethod.call(this.changesets,"**",createSubscribe(operates,filter),{objectify:true}) as Watcher
        }else{ // 只侦听指定路径
            const delimiter = this.changesets.delimiter as string
            const keyPaths = arguments[0] as string | (string|string[])[]
            const paths:string[] = Array.isArray(keyPaths) ? 
                keyPaths.map(v=>typeof(v)==='string'? v:v.join(delimiter)) : [keyPaths]
            const {once,operates,filter} = Object.assign({once:false,operates:[]},arguments[2])  as Required<WatchOptions>
            const subscribeMethod = once ? this.changesets.once : this.changesets.on           
            const subscribers:string[]=[]
            const unSubscribe = ()=>{
                subscribers.forEach(subscriber=>this.changesets.off(subscriber))
            }
            paths.forEach(path=>{
                subscribers.push(subscribeMethod.call(this.changesets,path,createSubscribe(operates,filter)) as string)
            })
            return {off:unSubscribe}
        }        
    }

    // ************* Dynamic **************

    /**
     * 
     * 创建动态值对象
     * 
     * @param path 
     * @param value 
     * @param parentPath 
     * @param parent 
     * @returns 
     */    

    private createDynamicValueObject(path:string[],value:any,parentPath:string[],parent:any){
        const descriptor = createDynamicValueDescriptor(value)
        const dynamicValueCtx = { path,value,parentPath,parent }
        if(descriptor){
            if(descriptor.type==='computed'){                
                return this.createComputed(dynamicValueCtx,descriptor)
            }

        }else{
            return value
        }        
    }
    // **************** EventEmitter ***********
    private _emitter:Emitter<StoreEvents> = mitt()
    get on(){ return this._emitter.on.bind(this) }
    get off(){ return this._emitter.off.bind(this) }
    get emit(){ return this._emitter.emit.bind(this) }    
    once<T extends keyof StoreEvents>(this:AutoStore<State>, event: T, handler: (payload:StoreEvents[T]) => void) {
        const phandler =(payload:StoreEvents[T]) => {
            try{
                handler(payload)
            }finally{            
                this._emitter.off(event,phandler)
            }
        }
        this._emitter.on(event,phandler)
    }

    // **************** 普通方法 ***********

    /**
     * 
     * 更新状态并且不触发事件
     * 
     * @description
     * 
     * 正常情况下可以通过store.state.xxx.xxx='xxxx'来更新状态，同时会触发事件
     * 
     * 而通过store.update(fn)来更新则不会触发更新事件
     * 
     * @example
     * 
     * - 只能是同步函数
     * store.update((state)=>{
     *      state.xxx.xxx='111'        
     * })
     * 
     * 
     * - 不支持异步函数
     * store.update(async (state)=>{
     *      state.xxx.xxx='111'        
     *      await fetch('xxxx')
     *      state.xxx.xxx='222'
     * })
     * 
     * 
     * @param fn   更新方法，在此方法内部进行更新操作
     */
    update(fn:(state:State)=>{}){
        if(typeof(fn)==='function'){                        
            this._batching=true
            try{
                fn(this.state)
            }finally{
                this._batching=false
            }            
        }else{
            throw new Error("update method must provide a function argument")
        }
    }
    /**
     * 
     * 读取指定路径的状态值并且不触发事件，即偷看
     * 
     * 
     */
    peep(path:string | string[]){
        this._peeping=true
        try{
            return getVal(this.state,Array.isArray(path) ? path : path.split(OBJECT_PATH_DELIMITER))
        }finally{
            this._peeping =false
        }         
    }

}



export function createStore<State extends Dict>(initial: State,options?:AutoStoreOptions<State>){
    return new AutoStore<State>(initial,options);
}

/**
 * 
 * 创建一个虚拟对象，实现
 * 
 * 当在代理对象上进行任意键值的读取操作时，会触发回调函数
 * 
 * - 该对象具有任意的键值对，可以是任意的嵌套对象
 * - 读取操作包括：get, set, delete, insert
 * - 支持通过泛型State提供类型
 * - 支持嵌套对象，包括数组成员的读写操作
 * 
 * const state = createShadowObject(({path,operate,value})=>{
 *  
 * })
 * 
 * state.a.b=1  触发 {path:["a","b"],operate:"set",value:1}
 * state.orders[0].price=100 触发 {path:["orders",0,"price"],operate:"set",value:100}
 * state.job.title 触发 {path:["job","title"],operate:"get"}
 * - state嵌套成员不需要真实存在，只是触发读写操作回调
 * 
 */
function createShadowObject<State extends object>(callback:(operates:{path:string[],operate:'set',value:any}[])=>void){


}
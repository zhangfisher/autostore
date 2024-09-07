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
import { SyncComputedObject } from "../computed/sync";
import { ComputedContext, ComputedDescriptor, ComputedScope, ComputedState, ComputedType } from "../computed/types";
import { WatchDescriptor, Watcher, WatchListener, WatchListenerOptions } from "../watch/types";
import mitt, { Emitter } from "mitt";
import { StoreEvents } from "../events/types";
import { getVal, setVal } from "../utils";
import { OBJECT_PATH_DELIMITER } from "../consts";
import { createReactiveObject, ReactiveNotifyParams } from "./reactive";
import { getComputedDescriptor } from "../computed/utils";
import { forEachObject } from "../utils/forEachObject";
import { AsyncComputedObject } from "../computed/async";
 
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
    getRootScope?:(state:State,options:{computedType:ComputedType, valuePath:string[]}) => any

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
    onComputedCancel?:(this:AutoStore<State>,args:{id:string,path:string[],reason:'timeout' | 'abort',computedObject:ComputedObject})=> void

}

 
export class AutoStore<State extends Dict>{
    private _data: ComputedState<State>;
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
        this.computedObjects = new ComputedObjects<State>(this)
        this._data = createReactiveObject(state,{
            notify:this.notify.bind(this),
            createComputedObject:this.createComputedObject.bind(this)
        })  
        // 马上遍历对象触发读操作，以便创建计算对象
        if(this.options.immediate) forEachObject(this._data)
    }
    get id(){return this._options.id}
    get state() {return this._data;  }
    get changesets(){return this._changesets}    
    get options(){return this._options}
    log(message:LogMessageArgs,level?:LogLevel){if(this._options.debug) this.options.log(message,level)} 

    private subscribeCallback(){
        if(this._options.onComputedCreated) this.on("computed:created",this._options.onComputedCreated.bind(this))
        if(this._options.onComputedDone) this.on("computed:done",this._options.onComputedDone.bind(this))
        if(this._options.onComputedError) this.on("computed:error",this._options.onComputedError.bind(this))

    }

    /**
     * 
     * 当状态读写时调用此方法触发事件
     * type:StateOperates, path: string[], indexs:number[] , value: any, oldValue: any, parentPath: string[], parent: any
     */
    private notify(params:ReactiveNotifyParams) {          
        if(this._peeping && params.type=='get') return    // 偷看时不触发事件
        if(this._batching) return
        this.changesets.emit(params.path.join('.'),params)       
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
     * @param {WatchListenerOptions} listener - 当监视的数据路径变化时执行的回调函数。
     * @param {WatchOptions} [options] - 可选参数，用于配置监视行为。
     * @returns {Watcher} - 返回一个表示监听器的数字标识符，用来取消监听。
     */    
    watch(listener:WatchListener,options?:WatchListenerOptions):Watcher
    watch(keyPaths:string | (string|string[])[],listener:WatchListener,options?:WatchListenerOptions):Watcher
    watch():Watcher{
        const isWatchAll = typeof(arguments[0])==='function' 
        const listener = isWatchAll ? arguments[0] : arguments[1]

        const createSubscribe = (operates:StateOperates[],filter:WatchListenerOptions['filter'])=>(event:StateOperateParams)=>{
            if(operates && Array.isArray(operates) && operates.length>0 ){     // 指定操作类型                
                if(!operates.includes(event.type)) return
            }else{  //  没定指定操作类型，默认只侦听除了get操作外的更新操作
                if(event.type==='get') return
            }
            if(typeof(filter)==='function' && !filter(event)) return
            listener.call(this,event)                    
        }        

        if(isWatchAll){ // 侦听全部
            const {once,operates,filter} = Object.assign({once:false,operates:['set','delete','insert','remove','update']},arguments[1])  as Required<WatchListenerOptions>
            const subscribeMethod = once ? this.changesets.once : this.changesets.on
            return subscribeMethod.call(this.changesets,"**",createSubscribe(operates,filter),{objectify:true}) as Watcher
        }else{ // 只侦听指定路径
            const delimiter = this.changesets.delimiter as string
            const keyPaths = arguments[0] as string | (string|string[])[]
            const paths:string[] = Array.isArray(keyPaths) ? 
                keyPaths.map(v=>typeof(v)==='string'? v:v.join(delimiter)) : [keyPaths]
            const {once,operates,filter} = Object.assign({once:false,operates:['set','delete','insert','remove','update']},arguments[2])  as Required<WatchListenerOptions>
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

    // ************* Computed ************** 
    /**
     * @description 创建计算属性对象
     * 
     * 
     */
    private createComputed(computedContext:ComputedContext,descriptor:ComputedDescriptor){
        let computedObj:ComputedObject | undefined
        if(descriptor.options.async){ // 异步计算
            computedObj= (new AsyncComputedObject(this, computedContext, descriptor as ComputedDescriptor)) as unknown as ComputedObject
        }else{ // 同步计算
            computedObj = (new SyncComputedObject(this, computedContext, descriptor as ComputedDescriptor)) as unknown as ComputedObject
        }    
        if(computedObj){
            this.update((state)=>{
                setVal(state,computedContext.path,computedObj.initial)
            })      
            this.computedObjects.set(computedObj.id,computedObj)
            this.emit("computed:created",computedObj)
            return computedObj.initial  
        }   
    }  

    /**
     * 创建侦听对象
     * @param computedContext 
     * @param descriptor 
     */
    private createWatch(computedContext:ComputedContext,descriptor:WatchDescriptor){
        computedContext
        descriptor
        // const watchObj = createWatch(this,computedContext,descriptor)
        // this.computedObjects.set(watchObj.id,watchObj)
        // this.emit("watch:created",watchObj)
        // return watch
    }

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

    private createComputedObject(path:string[],value:any,parentPath:string[],parent:any){
        const descriptor = getComputedDescriptor(value)
        const computedCtx = { path,value,parentPath,parent }
        if(descriptor){
            if(descriptor.type==='computed'){                
                return this.createComputed(computedCtx,descriptor)
            }else if(descriptor.type==='watch'){                
                return this.createWatch(computedCtx,descriptor)
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
     * -  不支持异步函数
     * store.update(async (state)=>{
     *      state.xxx.xxx='111'        
     *      await fetch('xxxx')
     *      state.xxx.xxx='222'
     * })
     * 
     * 
     * @param fn   更新方法，在此方法内部进行更新操作
     */
    update(fn:(state:ComputedState<State>)=>void){
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
 
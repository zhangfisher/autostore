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
import { assignObject } from "flex-tools/object/assignObject"
import { StateOperateParams } from "./types";
import type { Dict } from "../types";
import { log, LogLevel, LogMessageArgs } from "../utils/log"; 
import { getId } from "../utils/getId";  
import { ComputedObject } from "../computed/computedObject";
import { SyncComputedObject } from "../computed/sync";
import { ComputedContext, ComputedDescriptor, ComputedScope, ComputedType } from "../computed/types";
import { WatchDescriptor, Watcher, WatchListener, WatchListenerOptions } from "../watch/types";
import { StoreEvents } from "../events/types";
import { getVal } from "../utils";
import { PATH_DELIMITER } from "../consts";
import { createReactiveObject } from "./reactive";
import { getComputedDescriptor } from "../computed/utils";
import { forEachObject } from "../utils/forEachObject";
import { AsyncComputedObject } from "../computed/async";
import { WatchObjects } from "../watch/watchObjects"; 
import { WatchObject } from "../watch/watchObject";
import type { ComputedState } from "../descriptor";
import { noRepeat } from "../utils/noRepeat";
import { EventEmitter } from "../events";


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
    getRootScope?:(state:State,options:{computedType:ComputedType, valuePath:string[] | undefined}) => any

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

 
export class AutoStore<State extends Dict> extends EventEmitter<StoreEvents>{
    private _data: ComputedState<State>;
    public computedObjects: ComputedObjects<State>  
    public watchObjects: WatchObjects<State>      
    protected _changesets = new EventEmitter()  // FlexEvent<StateOperateParams> = new FlexEvent<StateOperateParams>({wildcard:true,delimiter:"."})    // 依赖变更事件触发器
    private _options: Required<AutoStoreOptions<State>>
    private _silenting = false                          // 是否静默更新，不触发事件
    private _batching = false                           // 是否批量更新中
    private _batchOperates:StateOperateParams[] = []    // 暂存批量操作
    private _peeping:boolean = false
    constructor(state: State,options?:AutoStoreOptions<State>) { 
        super()
        this._options = assignObject({
            id       : getId(),
            debug    : false,
            immediate: false,            
            enableComputed:true,
            log,
        },options) as Required<AutoStoreOptions<State>>        
        this.computedObjects = new ComputedObjects<State>(this)
        this.watchObjects  =  new WatchObjects<State>(this)
        this.subscribeCallbacks()
        this._data = createReactiveObject(state,{
            notify:this.notify.bind(this),
            createComputedObject:this.createComputedObject.bind(this)
        })  
        this.emit("created",this)
        // 马上遍历对象触发读操作，以便创建计算对象
        if(this.options.immediate) forEachObject(this._data)            
    }
    get id(){return this._options.id}
    get state() {return this._data;  }
    get changesets(){return this._changesets}    
    get options(){return this._options}
    log(message:LogMessageArgs,level?:LogLevel){if(this._options.debug) this.options.log(message,level)} 

    private subscribeCallbacks(){
        if(this._options.onComputedCreated) this.on("computed:created",this._options.onComputedCreated.bind(this))
        if(this._options.onComputedDone) this.on("computed:done",this._options.onComputedDone.bind(this))
        if(this._options.onComputedError) this.on("computed:error",this._options.onComputedError.bind(this))
        if(this._options.onComputedCancel) this.on("computed:cancel",this._options.onComputedCancel.bind(this))
    }

    /**
     * 
     * 当状态读写时调用此方法触发事件
     * type:StateOperates, path: string[], indexs:number[] , value: any, oldValue: any, parentPath: string[], parent: any
     */
    private notify(params:StateOperateParams) {          
        if(this._peeping && params.type=='get') return    // 偷看时不触发事件
        if(this._silenting) return
        if(this._batching){
            this._batchOperates.push(params)
        }
        this.changesets.emit(params.path.join(PATH_DELIMITER),params)       
    } 

    // ************* Watch **************/
    /**
     * 监视数据变化，并在变化时执行指定的监听器函数。
     * 
     * @example
     * 
     * - 侦听所有的数据变化
     *  
     * const watcher = state.watch(({type,path,value,oldValue,parentPath,parent})=>{})
     * watcher.off() 取消侦听
     * 
     * - 侦听指定路径的数据变化
     * 
     * const watcher = state.watch("job.title",({type,path,value,oldValue,parentPath,parent})=>{})
     * watcher.off() 取消侦听
     * 
     * - 侦听多个路径的数据变化
     * 
     * const watcher = state.watch(["job.title","job.salary"],({type,path,value,oldValue,parentPath,parent})=>{})
     * watcher.off() 取消侦听
     * 
     * - 侦听通配符路径的数据变化
     * 
     * const watcher = state.watch("job.*",({type,path,value,oldValue,parentPath,parent})=>{})
     * watcher.off() 取消侦听
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

        const createListener = (operates:WatchListenerOptions['operates'],filter:WatchListenerOptions['filter'])=>(event:StateOperateParams)=>{
            if(operates && Array.isArray(operates) && operates.length>0 ){     // 指定操作类型                
                if(!operates.includes(event.type)) return
            }else if(operates==='write'){
                if(event.type==='get') return//  没定指定操作类型，默认只侦听除了get操作外的更新操作
            }else if(operates ==='read'){
                if(event.type!=='get') return
            }
            if(typeof(filter)==='function' && !filter(event)) return
            listener.call(this,event)                    
        }        

        if(isWatchAll){ // 侦听全部
            const {once,operates,filter} = Object.assign({once:false,operates:'write'},arguments[1])  as Required<WatchListenerOptions>
            const subscribeMethod = once ? this.changesets.once : this.changesets.on
            const listener = createListener(operates,filter)
            return this.changesets.onAny.call(listener) as Watcher
        }else{ // 只侦听指定路径
            const keyPaths = arguments[0] as string | (string|string[])[]
            const paths:string[] = Array.isArray(keyPaths) ? 
                keyPaths.map(v=>typeof(v)==='string'? v : v.join(PATH_DELIMITER)) : [keyPaths]
            const {once,operates,filter} = Object.assign({once:false,operates:'write'},arguments[2])  as Required<WatchListenerOptions>
            const subscribeMethod = once ? this.changesets.once : this.changesets.on           
            const subscribers:string[]=[]
            const unSubscribe = ()=>{
                subscribers.forEach(subscriber=>this.changesets.off(subscriber))
            }
            paths.forEach(path=>{
                subscribers.push(subscribeMethod.call(this.changesets,path,createListener(operates,filter)) as string)
            })
            return {off:unSubscribe}
        }        
    }

    // ************* Computed ************** 
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
                const computedObj =  this._createComputed(descriptor,computedCtx)
                return computedObj?.initial
            }else if(descriptor.type==='watch'){                
                const watchObj =  this._createWatch(descriptor,computedCtx)
                return watchObj?.initial
            }
        }else{
            return value
        }        
    }
    /**
     * @description 创建计算属性对象 
     * 
     */
    _createComputed(descriptor:ComputedDescriptor,computedContext?:ComputedContext){
        let computedObj:ComputedObject | undefined
        if(descriptor.options.async){ // 异步计算
            computedObj= (new AsyncComputedObject(this, descriptor as ComputedDescriptor, computedContext)) as unknown as ComputedObject
        }else{ // 同步计算
            computedObj = (new SyncComputedObject(this, descriptor as ComputedDescriptor, computedContext)) as unknown as ComputedObject
        }    
        if(computedObj){            
            computedObj.silentUpdate(computedObj.initial)               // 更新不会触发事件
            if(computedObj.options.objectify){
                this.computedObjects.set(computedObj.id,computedObj)
            }            
            this.emit("computed:created",computedObj)
        }   
        return computedObj  
    }  

    /**
     * 创建侦听对象
     * @param computedContext 
     * @param descriptor 
     */
    _createWatch(descriptor:WatchDescriptor,computedContext?:ComputedContext){ 
        const watchObj = new WatchObject(this,descriptor,computedContext)
        if(descriptor.options.objectify){
            this.watchObjects.set(watchObj.id,watchObj)
        }
        this.emit("watch:created",watchObj)
        return watchObj
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
    silentUpdate(fn:(state:ComputedState<State>)=>void){
        this.update(fn,{silent:true})
    }
    batchUpdate(fn:(state:ComputedState<State>)=>void){
        this.update(fn,{batch:true})
    }
    /**
     * 更新状态值
     * 
     * @description
     * 
     * 在指定函数内部更新状态值，更新完成后触发事件
     * 
     * 注意不支持批量异步更新，如
     * 
     * update(async (state)=>{  
     *      state.a=1
     *      await delay()
     *      state.b=2
     * })
     * 
     * 
     * @throws {Error} 如果 `fn` 不是一个函数，则抛出错误
     * 
     * @example
     * 
     * - 更新状态，并且在更新后触发批量变更事件
     * update((state)=>{
     *  state.a=xxx
     *  state.b=xxx
     * })
     * 
     * 将函数执行后再一次性触发a,b的变更事件$batchUpdate事件
     * 
     * this.changesets.on('$batchUpdate',({
     *      type, == 'batch'    批量更新事件
     *      operates []         更新操作参数
     * })=>{
     * 
     * 
     * 
     * @example
     * - 更新状态，并且每一次更新均会触发变更事件
     * update((state)=>{
     *  state.xxx=xxx
     * },{
     *  batch:false       不批量更新
     * })
     * 
     * @example
     * - 静默更新，更新过程中不会触发变更事件
     *   update((state)=>{
     *      state.xxx=xxx
     *   },{
     *     silent:true
     *   })
     * 
     * @param {function(ComputedState<State>): void} fn - 用于更新状态的函数
     * @param {Object} [options] - 可选参数
     * @param {boolean} [options.batch=true] - 是否批量更新，默认为 true，变更事件在更新完成后触发
     * @param {boolean} [options.silent=false] - 是否静默更新，默认为 false
     */
    update(fn:(state:ComputedState<State>)=>void,options?:{batch?:boolean,silent?:boolean}){
        const {batch=true,silent=false} = Object.assign({},options)
        if(typeof(fn)==='function'){                        
            if(silent) this._silenting=true
            if(batch) this._batching = true
            try{
                fn(this.state)
            }finally{
                this._silenting = false
                this._batching = false
                if(this._batchOperates.length>0){
                    this._batchOperates.forEach(operate=>this.notify(operate))
                    this.notify({type:'batch',path:[],value:undefined,opertaes:this._batchOperates})
                    this._batchOperates = []
                }
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
            return getVal(this.state,Array.isArray(path) ? path : path.split(PATH_DELIMITER))
        }finally{
            this._peeping =false
        }         
    }
    /**
     * 执行同步函数，并且收集依赖
     * 
     * @example
     * 
     * - 执行函数，并且收集依赖，返回依赖路径
     * const deps = store.collectDeps(()=>{
     *      store.state.xxx.xxx
     * })
     * 
     * - 只收集函数内部的read操作
     * 
     * const deps = store.collectDeps(()=>{
     *     store.state.xxx.xxx
     * },'read')
     * 
     * @param fn 
     */
    collectDeps(fn:Function,operates:WatchListenerOptions['operates'] = '*'):string[][]{
        let dependencies:string[][] = []       
        const watcher = this.watch((event)=>{      
            dependencies.push(event.path)            
        },{operates})   
        // 第一次运行getter函数，如果函数内部有get操作，会触发上面的watcher事件，从而收集依赖
        try{
            fn()   
            // 依赖收集完成后就结束侦听
            watcher.off()  
        }catch{
        }finally{
            watcher.off()
        }
        return noRepeat(dependencies)      // 去重 
    }

    /**
     * 
     * 当store销毁时调用，用来取消一些订阅
     * 
     */
    destroy(){
        this.offAll()
        this._changesets.offAll()
        this.watchObjects.clear()
        this.computedObjects.clear()        
    }

}



export function createStore<State extends Dict>(initial: State,options?:AutoStoreOptions<State>){
    return new AutoStore<State>(initial,options);
}
 
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
import type { AutoStoreOptions, StateChangeEvents, StateOperate, StateTracker, StoreSyncer, StoreSyncOptions, UpdateOptions } from "./types";
import type { Dict } from "../types";
import { log, LogLevel, LogMessageArgs } from "../utils/log"; 
import { getId } from "../utils/getId";  
import { ComputedObject } from "../computed/computedObject";
import { SyncComputedObject } from "../computed/sync";
import { ComputedContext, ComputedDescriptor, } from "../computed/types";
import { WatchDescriptor, Watcher, WatchListener, WatchListenerOptions } from "../watch/types";
import { StoreEvents } from "../events/types";
import { forEachObject, getSnapshot, getVal, isAsyncComputedValue, isFunction, isPlainObject, pathStartsWith, setVal } from "../utils";
import { BATCH_UPDATE_EVENT, CYCLE_OPERATE_FLAG, PATH_DELIMITER } from "../consts";
import { createReactiveObject } from "./reactive";
import { AsyncComputedObject } from "../computed/async";
import { WatchObjects } from "../watch/watchObjects"; 
import { WatchObject } from "../watch/watchObject";
import type { ComputedState } from "../types";
import { noRepeat } from "../utils/noRepeat";
import { EventEmitter, EventListener } from "../events"; 
import { isPromise } from "../utils/isPromise";
import { getObserverDescriptor } from "../utils/getObserverDescriptor"
import { isMatchOperates } from "../utils/isMatchOperates";
import { ObjectKeyPaths, GetTypeByPath } from '../types';
import { getValueByPath } from "../utils/getValueByPath";
import { SchemaManager } from "../schema"; 

export class AutoStore<State extends Dict> extends EventEmitter<StoreEvents>{
    private _data: ComputedState<State>;
    public computedObjects: ComputedObjects<State>  
    public watchObjects: WatchObjects<State>      
    protected _operates = new EventEmitter<StateChangeEvents>()         // 依赖变更事件触发器
    private _options: Required<AutoStoreOptions<State>>
    private _silenting = false                                          // 是否静默更新，不触发事件
    private _batching = false                                           // 是否批量更新中
    private _batchOperates:StateOperate[] = []                          // 暂存批量操作
    private _updateFlags:number | symbol | undefined                    // 额外的更新标识
    private _peeping:boolean = false 
    private _updatedState?:Dict                                         // 脏状态数据，当启用resetable时用来保存上一次的状态数据 
    private _updatedWatcher:Watcher | undefined                         // 脏状态侦听器
    private _schemas: SchemaManager<State> | undefined                  
    constructor(state?: State,options?:AutoStoreOptions<State>) { 
        super()
        this._options = assignObject({
            id            : getId(),
            debug         : false,
            lazy          : false,            
            enableComputed: true,
            reentry       : true, 
            resetable     : false,
            log, 
        },options) as Required<AutoStoreOptions<State>>        
        this.computedObjects = new ComputedObjects<State>(this)
        this.watchObjects  =  new WatchObjects<State>(this)
        this.subscribeCallbacks()
        this._data = createReactiveObject.call(this as any,state || {},{
            notify:this._notify.bind(this),
            createComputedObject:this.createObserverObject.bind(this)
        }) as ComputedState<State>
        
        this.getSnap             = this.getSnap.bind(this)
        this.watch               = this.watch.bind(this)
        this.update              = this.update.bind(this)
        this.peep                = this.peep.bind(this)
        this.silentUpdate        = this.silentUpdate.bind(this)
        this.batchUpdate         = this.batchUpdate.bind(this)
        this.trace               = this.trace.bind(this)
        this.collectDependencies = this.collectDependencies.bind(this)

        this.installExtends()                     
        if(!this._options.lazy) forEachObject(this._data)       
        if(this._options.resetable) this.resetable = true     
        // @ts-ignore
        if(this._options.debug && typeof(globalThis.__AUTOSTORE_DEVTOOLS__) === 'object') {                    
            // @ts-ignore
            globalThis.__AUTOSTORE_DEVTOOLS__.add(this)
        }
        this.emit("load",this)     
    }
    get id(){return this._options.id} 
    get state() {return this._data;  }
    get operates(){return this._operates}    
    get options(){return this._options}
    get silenting(){return this._silenting}
    get batching(){return this._batching}
    get peeping(){return this._peeping} 
    get resetable(){return this._options.resetable}
    get schemas(){
        if(!this._schemas){
            this._schemas = new SchemaManager<State>(this)
        } 
        return this._schemas 
    }
    set resetable(value:boolean){
        if(value){
            if(this._updatedWatcher) return 
            this._updatedState = {}
            this._updatedWatcher = this.watch(({path,oldValue})=>{
                if(path.length===0) return              
                const pathKey = path.join(PATH_DELIMITER)
                if(!pathKey.startsWith("#") && !(pathKey in this._updatedState!)){
                    this._updatedState![pathKey] = oldValue
                }
            },{operates:'write'})

        }else{
            if(this._updatedWatcher){
                this._updatedWatcher.off()
                this._updatedWatcher = undefined
            }
            this._updatedState = {}
        }
        this._options.resetable = value
    }
    /**
     * 重置store恢复到状态的原始状态
     * 
     * @description
     * 
     * 当启用resetable=true选项时，可以调用此方法将store恢复到初始状态
     *   
     */
    reset(entry?:string){
        if(this._options.resetable && this._updatedState){
            try{
                this.batchUpdate(state=>{
                    const prefix = entry ? `${entry}${PATH_DELIMITER}` : ''                    
                    Object.entries(this._updatedState!).forEach(([key,value])=>{
                        if(key.startsWith(prefix)){
                            setVal(state,key.split(PATH_DELIMITER),value)
                        }                        
                    })
                })  
            }finally{               
                this.emit("reset",entry)
            }          
        }else{
            this.log("resetable option is not enabled","warn")
        }
    }

    log(message:LogMessageArgs,level?:LogLevel){
        if(this._options.debug){
            this.options.log.call(this,message,level)
        } 
    }
    private installExtends(){
        const exts = globalThis.__AUTOSTORE_EXTENDS__
        if(Array.isArray(exts)){
            exts.forEach(ext=>typeof(ext)==="function" && ext(this))
        }
    }
    private subscribeCallbacks(){
        if(this._options.onComputedCreated) this.on("computed:created",this._options.onComputedCreated.bind(this))
        if(this._options.onComputedDone) this.on("computed:done",this._options.onComputedDone.bind(this))
        if(this._options.onComputedError) this.on("computed:error",this._options.onComputedError.bind(this))
        if(this._options.onComputedCancel) this.on("computed:cancel",this._options.onComputedCancel.bind(this))
    }
    /**
     * 
     * 当状态读写时调用此方法触发事件
     * 
     * @description
     * 
     * 本方法是一个内部方法，用于在状态读写时触发事件，不推荐直接调用
     * 
     * type:StateOperates, path: string[], indexs:number[] , value: any, oldValue: any, parentPath: string[], parent: any
     */
    _notify(params:StateOperate) {          
        if(this._peeping && params.type==='get') return    // 偷看时不触发事件
        if(this._batching){
            this._batchOperates.push(params)
        }
        if(this._silenting) return        
        params.flags = this._updateFlags
        this.operates.emit(params.path.join(PATH_DELIMITER),params)       
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
     * - 使用通配符
     * const watcher = state.watch(["job.*"],(operate)=>{})  job子路径
     * const watcher = state.watch(["job.**"],(operate)=>{}) job下的所有路径
     * 
     * 
     * @param {string|string[]} keyPaths - 要监视的数据路径，可以是单个字符串或字符串数组。
     * @param {WatchListenerOptions} listener - 当监视的数据路径变化时执行的回调函数。
     * @param {WatchOptions} [options] - 可选参数，用于配置监视行为。
     * @returns {Watcher} - 返回一个表示监听器的数字标识符，用来取消监听。
     */    
    watch(listener:WatchListener,options?:WatchListenerOptions):Watcher
    watch(paths:'*' | string | (string|string[])[],listener:WatchListener,options?:WatchListenerOptions):Watcher
    watch():Watcher{
        const isWatchAll = typeof(arguments[0])==='function' || ['*','**'].includes(arguments[0]) || (Array.isArray(arguments[0]) && arguments[0].length===0 )
        const listener = typeof(arguments[0])==='function' ? arguments[0] : arguments[1]
        const options = arguments.length >=2 && typeof(arguments[arguments.length-1])==='object' ? arguments[arguments.length-1] : undefined


        const createEventHandler = (operates:WatchListenerOptions['operates'],filter:WatchListenerOptions['filter'])=>{
            return (operate:StateOperate)=>{                            
                if(!isMatchOperates(operate,operates)) return
                if(typeof(filter)==='function' && !filter(operate)) return
                // 在侦听函数内部如果涉及到状态的读写操作，会触发新的侦听事件，这样很容易会导致无限循环
                // 比如我们watch(()=>{console.log(state.a)},{operates:'*'})，由于在侦听函数内部读取了state.a的值，会触发新的get侦听事件
                // 然后又被侦听函数捕获，从而就变成无限循环
                // 为了避免这种情况，需要避免所有读操作，即get操作, _peeping=true表示正在偷看，不触发get事件
                // 如果在侦听函数内部使用写操作，如watch(()=>{state.a=1},{operates:'*'})
                // 当执行state.a=1时，也就是会触发新的set事件，但是在第二次执行state.a=1时，由于值没有变化，不会触发set事件,也就不会造成无限循环
                try{
                    this._peeping = true
                    // 如果是批量操作，则需要过滤一下，比如operates=write，批量操作变化所有
                    if(operate.type==='batch'){                        
                        const ops = (operate.value as StateOperate[]).filter(op=>isMatchOperates(op,operates))
                        if(ops.length>0){
                            operate.value = ops
                        }
                    }
                    listener(operate)
                }finally{
                    this._peeping = false
                }
            }        
        }
        if(isWatchAll){ // 侦听全部
            const {operates,filter} = Object.assign({once:false,operates:'write'},options)  as Required<WatchListenerOptions>
            const handler = createEventHandler(operates,filter)
            return this.operates.onAny(handler) 
        }else{ // 只侦听指定路径
            const keyPaths = arguments[0] as string | (string|string[])[]
            const paths:string[] = Array.isArray(keyPaths) ? keyPaths.map(v=>typeof(v)==='string'? v : v.join(PATH_DELIMITER)) : [keyPaths]
            const {once,operates,filter} = Object.assign({once:false,operates:'write'},options) as Required<WatchListenerOptions>
            const subscribeMethod = once ? this.operates.once.bind(this.operates) : this.operates.on.bind(this.operates)
            const listeners:EventListener[]=[]
            const handler = createEventHandler(operates,filter)
            paths.forEach(path=>{                
                listeners.push(subscribeMethod.call(this,path,handler as any))
            })
            return {off:()=>listeners.forEach(subscriber=>subscriber.off())}
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

    private createObserverObject(path:string[],value:any,parentPath:string[],parent:any){
        const descriptor = getObserverDescriptor(value)
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
            // 更新不会触发事件
            computedObj.silentUpdate(computedObj.initial)               
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
        this.watchObjects.set(watchObj.id,watchObj)
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
     * 正常情况下可以通过store.state.xxx.xxx='xxxx'来更新状态，同时会触发事件，通过侦听事件可以用来实现
     * 计算属性的重新计算
     * 
     * 静默更新时则指不会触发事件,也因此不会触发计算属性的重新计算,
     * 
     * 因此，可能会干扰正常的计算依赖情况，所以只在特殊情况下使用, 比如初始化
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
     * - 批量更新
     * update((state)=>{
     *  state.a=xxx
     *  state.b=xxx
     * },{
     *      batch:true           事件名称默认为__batch_update__
     *      batch:"批量更新事件名称"， 
     * ]}) 
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
     * @param {function(ComputedState<State>): void} fn - 用于更新状态的函数,只能是同步函数
     * @param {Object} [options] - 可选参数
     * @param {boolean} [options.batch=true] -  是否批量更新，=false 不批量更新，=true 批量更新，批量更新事件名称为__batch_update__，=<批量更新事件名称> 指定一个字符串
     * @param {boolean} [options.silent=false] - 是否静默更新不触发事件，默认为 false
     * @param {boolean} [options.peep=false] - 是否偷看，即读取状态值但不触发事件，默认为 false
     * @param {boolean} [options.reply=false] - 当更新完成回放所有依赖的变化事件，默认为true，即回放所有依赖的变化事件，=false 不回放依赖的变化事件
     *  比如update(state=>{
     *      
     *  })
     */
    update(fn:(state:ComputedState<State>)=>void,options?:UpdateOptions){
        const {batch=false,reply=true,silent=false,peep=false,flags} = Object.assign({},options)        
        if(typeof(fn)==='function'){                        
            this._updateFlags = flags
            if(silent) this._silenting=true
            if(batch) {
                this._batching = true
                this._silenting = true       // 批量时肯定是静默更新的
            }
            if(peep) this._peeping = true
            try{
                const r = fn(this.state)
                if(batch && isPromise(r)) throw new Error("Batch update method can't be async function")
            }finally{
                this._silenting = false
                this._batching = false
                this._peeping = false
                this._updateFlags = 0
                this.replyBatchOperates(reply,batch)                
            }            
        }else{
            throw new Error("update method must provide a function argument")
        }
    }
    /**
     * 
     * 回放批量操作
     * 
     */
    private replyBatchOperates(reply:boolean,batch:boolean|string){
        if(this._batchOperates.length>0){
            const opts =  [...this._batchOperates]
            this._batchOperates=[]
            // 先分别触发每一个操作事件,这样一些依赖于单个操作的事件可以先触发
            reply && opts.forEach(operate=>{
                operate.reply = true
                this._notify(operate)
            })
            // 然后再触发批量更新事件
            try{          
                const batchEvent = batch===true ? BATCH_UPDATE_EVENT : String(batch)
                this.operates.emit(batchEvent,{type:'batch',path:[batchEvent],value:opts})
            }finally{
                this._batchOperates = []
            }
        }
    }
    /**
     * 
     * 读取指定路径的状态值并且不触发事件，即偷看
     * 
     * @example
     * 
     * peep(["a","b"])
     * peep("a.b")
     * peep(state=>state.a.b)
     * 
     */
    peep<Value=any>(getter:(state:State)=>Value):Value
    peep<
        PATH extends ObjectKeyPaths<ComputedState<State>> = ObjectKeyPaths<ComputedState<State>>,
        VALUE extends GetTypeByPath<ComputedState<State>,PATH> = GetTypeByPath<ComputedState<State>,PATH>,
    >(path:PATH):VALUE
    peep<Value=any>(path:string[]):Value
    peep(){
        const getter = typeof(arguments[0])==='function' ? 
            ()=>arguments[0](this.state) 
            : ()=> getVal(this.state,Array.isArray(arguments[0]) ? arguments[0] : arguments[0].split(PATH_DELIMITER))
        this._peeping=true
        try{
            return getter()
        }finally{
            this._peeping =false
        }         
    }
    /**
     * 跟踪函数内部的操作，返回依赖路径
     * 
     * @example
     * 
     * - 执行函数，并且收集依赖，返回依赖路径
     * const deps = store.collectDependencies(()=>{
     *      store.state.xxx.xxx
     * })     
     * @example
     * - 只收集函数内部的read操作
     * 
     * const deps = store.collectDependencies(()=>{
     *     store.state.xxx.xxx
     * },'read')
     *
     *
     * @example
     * 
     * @param fn 
     */
    collectDependencies(fn: Function,operates:WatchListenerOptions['operates'] = '*'):string[][]{
        let dependencies:string[][] = []       
        const watcher = this.watch((event)=>{      
            dependencies.push(event.path)            
        },{operates})           
        try{
            fn() // 运行函数，如果函数读写操作，会触发上面的watcher事件，从而收集依赖
        }finally{
            watcher.off()
        }
        return noRepeat(dependencies)     
    } 
    /**
     *  跟踪函数内部的操作
     * 
     * 主要用于调试，跟踪函数内部的操作
     * 
     * 比如我们想要知道执行一个state.xxx=1时，会触发哪些操作，可以通过此方法来跟踪 
     * 
     * 注意： 本方法主要用于调试，不要在生产环境中使用
     * 
     * @example
     * 
     * - 跟踪同步函数内部的操作
     *   trace((state)=>{
     *      state.xxx.xxx = 1
     *   },(operate)=>{
     *      console.log(operate)
     *   })     
     * 
     * - 跟踪异步函数内部的操作??? 
     * 
     *  注意：
     *  由于无法控制异步上下文，特别是在同时运行多个异步trace函数时，不同的trace函数可能会相互干扰，无法区分。
     *  因此，异步函数的跟踪难以实现，只能用在调试时且只运行单个异步trace函数时使用
     * 
     *  const store= new AutoStore({
     *      price:10,
     *      count:2,
     *      total: async (state)=>{
     *          await delay(1000)
     *          return state.price * state.count
     *      }
     *  })
     * 
     *  
     *  
     *  const fn = async ()=>{
     *     await fetch('xxxx')
     *     store.state.price = 20
     *     store.state.count= 3
     * }
     * 我们想要知道fn执行时会触发哪些操作，可以通过trace来跟踪
     * const ops = await trace(fn).start()
     * 
     * 
     *  我们可以看到，fn执行时，只有显式的对price和count，但是由于total是异步计算属性，所以也会触发total的变化。
     *  因此也应该被跟踪，但是由于其是异步计算属性，所以不会被跟踪。
     * 因此需要显式的提供一个abort参数来结束包括异步的跟踪过程
     * 
     * 
     * stateTracker.stop()  // 取消跟踪
     * const operates = await stateTracker.start((operate)=>{
     *       return operate.type=='set' && path[0]==='total'
     * })  // 开始跟踪
     * 
     * 
     * @param fn 
     * @param operates 
     * @returns 
     */
    trace(fn: ()=>any,operates:WatchListenerOptions['operates']='*'):StateTracker { 
        let watcher:Watcher 
        return {
            stop:()=>watcher && watcher.off(),
            start:async (isStop?:(operate:StateOperate)=>boolean)=>{
                const ops:StateOperate[] = []
                return new Promise((resolve)=>{
                    watcher = this.watch((operate)=>{       
                        ops.push(operate)         
                         if(isStop && isStop(operate)){
                            watcher.off()
                            resolve(ops)
                        }
                    },{operates})   
                    Promise.resolve(fn()).finally(()=>{
                        if(typeof(isStop)!=='function'){
                            watcher.off()
                            resolve(ops)
                        }
                    })
                })
            }
        }
    } 
    /**
     * 
     * 当store销毁时调用，用来取消一些订阅
     * 
     */
    destroy(){
        this.offAll()
        this._operates.offAll()
        this.watchObjects.clear()
        this.computedObjects.clear()  
        this.emit("unload",this)      
    }
    /**
     * 
     * 返回当前状态的快照数据
     *  @param options.entry  - 指定要获取的路径，如果不指定则返回整个状态数据
     *  @param reserveAsync - 默认false,是否保留异步对象。
     *      异步对象的值是一个AsyncComputedValue对象。=true时会保留。=false时会只返回value值
     *  @returns 
     */
    getSnap<Entry extends string>(options?: {entry?: Entry,reserveAsync?: boolean }){
        const { reserveAsync,entry } =Object.assign({reserveAsync:true},options)        
        return (getSnapshot(entry ? getVal(this._data,entry) : this._data,reserveAsync)) as GetTypeByPath<ComputedState<State>,Entry>
    } 

    /**
     * 克隆当前 store 的一个子状态树,创建新的 store 实例
     * @param options 配置选项
     * @param options.entry 子状态树的路径
     * @param options.sync 是否同步更新到父 store,默认为 true
     * @returns 新的 store 实例
     * @throws 当 entry 路径对应的值不是普通对象时抛出错误
     * @example
     * const store = new AutoStore({ foo: { bar: 1 } })
     * const subStore = store.clone({ entry: 'foo' }) 
     */
    clone<Entry extends string, CloneState extends Record<string, any> = GetTypeByPath<State, Entry>>(
        options?: AutoStoreOptions<State> & { entry?: Entry, sync?: 'none' | StoreSyncOptions['direction'] }
    ){
        const { sync, entry } = Object.assign({ sync: 'both' }, this._options, options)
        const state = getValueByPath(this.getSnap() ,entry) as CloneState
        if(!isPlainObject(state)){
            throw new Error(`The entry path must be an object, but got ${typeof(state)}`)
        }
        const clonedOptions = Object.assign({}, this._options, options) as unknown as AutoStoreOptions<CloneState>
        const clonedStore = new AutoStore<CloneState>(state,clonedOptions)

        if(sync!=='none'){
            this.sync(clonedStore,{
                from:entry,
                immediate:false,
                direction: sync
            })
        }         
        return clonedStore
    }
    /**
     * 同步两个Store，使用两个Store的状态数据同步
     * 
     * const store1 = new AutoStore({ a: {
     *     x:1, y:2, z:3
     * }})
     * 
     * const store2 = new AutoStore({ b: {
     *    x:2, y:3, z:4
     * }})
     * 
     * store1.sync(store2,{
     *  from:'a',
     *  to:'b'
     * })   ----> store1的a对象的值会同步到store2的b对象上
     * 
     * @param toStore 
     * @param entry 
     */
    sync(toStore:AutoStore<any>,options?:StoreSyncOptions):StoreSyncer{
        const { from,to,filter,immediate,direction='both',pathMap  } = Object.assign({
            immediate: true,
            direction: 'both'
        },options) as StoreSyncOptions
        const fromEntry = from ? from.split(PATH_DELIMITER) : []
        const toEntry = to ? to.split(PATH_DELIMITER) : []

        const watchers: Watcher[] = []

        const mapPath = (path:string[],value:any,dir: 'from' | 'to' = 'from'):string[] | undefined=>{      
            return pathMap && isFunction((pathMap as any)[dir]) ? (pathMap as any)[dir](path,value) : path
        }

        const applyToStore = (store:AutoStore<any>,relPath:string[],operate:StateOperate)=>{
            const {type,value,flags,indexs} = operate
            const silent = flags===CYCLE_OPERATE_FLAG 
            if(flags === CYCLE_OPERATE_FLAG) return 
            if(type==='set' || type==='update'){
                store.update(state=>{
                    if(isAsyncComputedValue(getVal(state,relPath))){
                        setVal(state,relPath.concat('value'),value)
                    }else{
                        setVal(state,relPath,value)
                    }
                },{flags:CYCLE_OPERATE_FLAG,silent})
            }else if(type==='delete'){
                store.update(state=>{
                    setVal(state,relPath,undefined)
                },{flags:CYCLE_OPERATE_FLAG,silent})
            }else if(type==='insert'){
                store.update(state=>{                    
                    const arr = getVal(state,operate.parentPath)
                    if(indexs) arr.splice(indexs[0],0,...value)
                },{flags:CYCLE_OPERATE_FLAG,silent})
            }else if(type==='remove'){ 
                store.update(state=>{
                    const arr = getVal(state,relPath)                    
                    if(indexs){
                        arr.splice(indexs[0],indexs.length)
                    }
                },{flags:CYCLE_OPERATE_FLAG,silent})
            }
        }
        // 马上进行一次全同步
        if(immediate){            
            const fromEntryValue = this.getSnap({entry:fromEntry.join(PATH_DELIMITER)}) as any
            // 当指定了映射关系时，需要通过进行遍历来执行全同步
            if(pathMap){
                forEachObject(fromEntryValue,({value,path})=>{                    
                    const toPath = mapPath(path,value, 'to')                    
                    if(toPath){
                        const toValue = Array.isArray(value) ? [] : 
                            ((typeof(value)==='object') ? {} : value)
                        applyToStore(toStore,[...toEntry,...toPath],{
                            type:'set',
                            path:toPath,
                            value:toValue
                        })
                    }
                })
            }else{// 没有指定映射关系时，可以简单进行Object.assign，会更加高效
                const toPath = toEntry
                if(typeof(fromEntryValue)==='object'){
                    toStore.update((state)=>{                   
                        const toEntryValue = getVal(state,toPath,undefined)
                        if(toEntryValue===undefined){
                            setVal(state,toPath,fromEntryValue)
                        }else{
                            if(Array.isArray(fromEntryValue)){
                                if(Array.isArray(toEntryValue)){
                                    toEntryValue.splice(0,toEntryValue.length,...fromEntryValue)
                                }else{
                                    setVal(state,toPath,fromEntryValue)
                                }
                            }else{
                                Object.assign(toEntryValue,fromEntryValue)
                            }
                        }                    
                    },{silent:true})
                }else{
                    toStore.update((state)=>{
                        setVal(state,toPath,fromEntryValue)    
                    },{silent:true})                
                }
            }
        }

        const syncer ={
            on:()=>{
                if(watchers.length > 0) return 
                // from
                if(['both','farward'].includes(direction)){
                    watchers.push(this.watch('*', (operate)=>{   
                        if(operate.flags === CYCLE_OPERATE_FLAG) return 
                        if(!pathStartsWith(fromEntry,operate.path)) return 
                        if(isFunction(filter) && filter.call(this,operate)===false) return
                        const mappedPath = mapPath(operate.path,operate.value,'to')
                        if(mappedPath===undefined) return 
                        operate.path = mappedPath
                        const toPath = [...toEntry,...operate.path.slice(fromEntry.length)]
                        operate.path = [...toEntry,...operate.path.slice(fromEntry.length)]
                        if(operate.parentPath) operate.parentPath = [...toEntry,...operate.parentPath.slice(fromEntry.length)]
                        applyToStore(toStore,toPath,operate) 
                    },{ operates:"write" }))
                }
                // to
                if(['both','backward'].includes(direction)){
                    watchers.push(toStore.watch('*',(operate)=>{   
                        if(!pathStartsWith(toEntry,operate.path)) return 
                        if(operate.flags === CYCLE_OPERATE_FLAG) return 
                        const mappedPath = mapPath(operate.path,operate.value,'from')
                        if(mappedPath===undefined) return 
                        operate.path = mappedPath
                        const fromPath = [...fromEntry,...operate.path.slice(toEntry.length)]
                        operate.path = [...fromEntry,...operate.path]
                        if(operate.parentPath) operate.parentPath = [...fromEntry,...operate.parentPath.slice(fromEntry.length)]
                        applyToStore(this,fromPath,operate) 
                    },{ operates:"write" }))
                }
            },
            off: ()=>{
                watchers.forEach(watcher=>watcher.off())
                watchers.splice(0,watchers.length)
            }
        }
        syncer.on()
        return syncer
    } 
}
 
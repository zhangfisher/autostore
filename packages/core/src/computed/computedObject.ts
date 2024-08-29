/**
 * 
 * 
 * 
 */
import { StateExtendContext } from "../extend"
import type { AutoStore } from "../store/store"
import { getVal } from "../utils"
import { getComputedId } from "../utils/getComputedId"
import { ComputedDescriptor, RequiredComputedOptions } from "./types"

 

export class ComputedObject<Scope=any,Value=any>{
    context:StateExtendContext
    descriptor:Required<ComputedDescriptor<Scope,Value>>
    constructor(public store:AutoStore<any>,context:StateExtendContext,descriptor:ComputedDescriptor<Scope,Value>){
        this.descriptor = descriptor        
        this.context = context    
        this.options.id = getComputedId(context.path,this.options)
        this.executeComputedHooks() 
        this.onInitial()   
    } 
    get options(){ return this.descriptor.options as unknown as RequiredComputedOptions<Scope,Value> }
    get id(){return this.options.id }
    get enable(){ return this.options.enable  }
    get group(){return this.options.group}
    set enable(value:boolean){ this.options.enable = value }
    get async(){return this.options.async}
    get depends(){return this.options.depends}   
    get value(){ return getVal(this.store.state,this.context.path) as unknown as Value}       
    get path(){ return this.context.path }
    get getter(){ return this.descriptor.getter}
    set getter(value){ this.descriptor.getter = value }

    /**
     * 
     * 执行在Store中的onCreateComputed钩子中执行
     * 
     * @description
     * 
     * store.options.onCreateComputed的设计目的是为了在创建计算属性时可以进行拦截进行一些处理
     * 比如：
     * 
     * - 重新封装getter函数，或者直接修改ComputedOptions
     * - 修改计算属性对象的scope或参数等     * 
     * - 不同于store.on("computed:created")时对所有的计算属性进行处理，onCreateComputed是在创建计算属性时执行，是同步的可以马上生效
     * 
     */
    private executeComputedHooks(){
        const { onCreateComputed } = this.store.options
        typeof onCreateComputed === "function" && onCreateComputed.call(this.store,this)
    }
    /**
     * 初始化时调用
     */
    onInitial(){

    }
    /**
     * 当计算属性的依赖变化时调用,执行计算
     * 
     */
    onComputed(){

    }

    /**
     * 手动触发计算属性getter函数的重新执行，重新计算计算属性的值
     * 
     * @description
     * 
     * 
     * 
     * 
     */
    run(){
        this.descriptor.getter
    }
}
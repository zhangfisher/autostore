/**
 * 
 * 
 * 观察者对象
 * 
 * 
 * 
 * 
 */


import { PATH_DELIMITER } from "../consts"; 
import { AutoStore } from "../store/store"; 
import { getVal } from "../utils/getVal";
import { joinValuePath } from "../utils/joinValuePath"; 
import { setVal } from "../utils/setVal";
import { getId } from "../utils/getId"; 
import {  StoreEvents } from "../events"; 
import { ObserverDescriptor, ObserverOptions } from "./types";
import { ComputedContext } from "../computed/types";
import { StateOperateParams, UpdateOptions } from "../store/types";
import {  Watcher, WatchListenerOptions } from "../watch/types";
import { calcDependPaths } from "../utils/calcDependPaths";



export type ReactiveObjectOptipons<Value=any> = {
    id?     : string
    path?   : string[]
    enable? : boolean
    group?  : string
    initial?: Value
}


export type IDescriptorEvents<Value=any> = {
    change:Value
}

export class ObserverObject<
    Value=any, 
    Options extends ObserverOptions<Value>= ObserverOptions<Value>>{    
    private _path:string[]  
    private _id:string = ""
    private _initial:Value | undefined
    private _value:Value | undefined
    private _associated:boolean = false             // 是否已经关联到状态对象    
    private _attached:boolean = false           
    private _getter:any
    private _depends: string[][] = []
    private _options: Required<Options> 
    private _subscribers:Watcher[] = []              // 保存订阅者的ID
    /**
     *  构造函数。
     * 
     * @param {AutoStore<any>} store  
     * @param {ComputedContext} context - 动态值上下文，指该动态值所有的路径、值、父路径和父对象引用。
     * @param {ComputedDescriptor<Options>} descriptor - 动态值描述符，包含了动态值的元数据。
     */
    constructor(public store:AutoStore<any>,public descriptor:ObserverDescriptor,public context?:ComputedContext<Value>){        
        this._associated    =  context!==undefined
        this._getter     = descriptor.getter         
        this._options    = Object.assign({
            enable: true,
            group: "",
            depends: []
        }, descriptor.options) as unknown as Required<Options>
        this._id         = this._options.id || (this._associated ? joinValuePath(context?.path) : getId())
        this._path       = context?.path || [`#${this._id}`]
        if(!this._path) this._path = [`#${this._id}`]
        this._initial = this._options.initial 
        this._depends = calcDependPaths(this._path,this._options.depends)
        this._onInitial()
    }
    get options(){ return this._options}
    get id(){return this._id }
    get associated(){return this._associated }
    get async(){ return this._options.async  }
    get enable(){ return this._options.enable!  }    
    set enable(value:boolean){ this._options.enable = value }
    set group(value:string){  this._options.group=value}
    get group(){ return this._options.group! }
    get initial(){ return this._initial}      
    set initial(value){ this._initial = value }  
    get path(){ return this._path }
    get attached(){ return this._attached }
    get depends(){return this._depends}
    set depends(value:string[][]){ this._depends = value }
    get getter(){ return this._getter}
    set getter(value){ this._getter= value  }   

    toString(){ return `ComputedDescriptorObject<${joinValuePath(this._path)}>` }
    get value(){ 
        if(this._associated){
            return getVal(this.store.state,this._path) 
        }else{ 
            this.store._notify({type:'get',path:this.path,value:this._value}) 
            return this._value as unknown as Value
        }
    }           
    set value(value:Value){
        if(this._associated){ 
            setVal(this.store.state,this._path, value)     
        }else{            
            this._value = value          
            this.store._notify({type:'set',path:this.path,value})
        }
    }  
    private _onInitial(){
        if(this._options.initial!==undefined){
            this.update(this._options.initial,{silent:true})
        }
        this.onInitial()
    }
    protected onInitial(){

    } 

    /**
     * 更新计算对象的结果值
     * 
     * @description
     * 
     * - 标量值
     *  update(1)
     * - 对象值
     *  update({value:1}) 
     * 
     */
    update(value:Value,options?:UpdateOptions){        
        this.store.update(()=>{
            this.value = value
        },options) 
    }
    /**
     * 更新计算属性的值，并且不会触发依赖的变化事件
     * 
     * 
     * 
     * @param value 
     * @param {boolean} silent - 是否静默更新，即不会触发依赖变化事件 
     */
    silentUpdate(value:Value){
        this.update(value,{silent:true})
    }

    /**
     * 订阅当前计算对象值变化的事件
     * @description
     * 
     * 当计算结果值发生变化时触发
     * 
     * @example
     * 
     * const computedObj = store.computedObject.get("xxx")
     * computedObj.watch((value)=>{
     *      
     * })
     * 
     */
    watch(listener:(value:Value)=>void,options?:WatchListenerOptions){
        return this.store.watch(this.path!.join(PATH_DELIMITER),({value})=>{
            listener.call(this,value as Value)
        },options)
    } 
    
    protected emitStoreEvent(event:keyof StoreEvents,args:any){
        setImmediate(()=>{
            this.store.emit(event,args)
        })
    }
    /**
     * 获取当前对象的依赖路径
     * 
     * 本方法供子类重写，用来对依赖进行规范
     * 
     * @returns 
     */
    protected getDepends(){
        return this.depends!
    }
    /**
     * 当依赖变化时调用
     * @param _ 
     */
    protected onDependsChange(_:StateOperateParams){ 
    
    }

    attach(){
        if(!this._attached && this.depends && this.depends.length>0){
            this._subscribers.push(this.store.watch(
                this.getDepends(),
                this.onDependsChange.bind(this),
                {operates:'write'}
            ))
            this.store.log(()=>`${this.toString()} subscribed to ${this.depends!.map(depends=>depends.join(PATH_DELIMITER)).join(",")}`)
            this._attached=true
        }
    }
    detach(){
        if(!this._attached) return 
        this._subscribers.forEach(subscriber=>subscriber.off())
        this._attached=false
    }

}
 
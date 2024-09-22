/**
 * 
 * 
 * 
 */
import { PATH_DELIMITER } from "../consts"; 
import { AutoStore } from "../store/store";
import { StateOperateParams } from "../store/types";
import { getDependPaths } from "../utils/getDependPaths";
import { getVal } from "../utils/getVal";
import { joinValuePath } from "../utils/joinValuePath";
import {  ComputedContext, ComputedDescriptor, ComputedOptions, RuntimeComputedOptions } from './types';
import { Watcher } from "../watch/types";
import { StoreEvents } from "../events/types";
import { setVal } from "../utils";
import { getId } from "../utils/getId"; 
export class ComputedObject<Value=any>{    
    private _path?:string[] 
    private _options:Required<ComputedOptions>
    private _getter:any
    private _depends: string[][] | undefined
    private _id:string = ""
    private _initialValue:Value | undefined
    private _subscribers:Watcher[] = []              // 保存订阅者的ID
    private _subscribed:boolean = false
    private _value:Value | undefined
    private _attched:boolean = false                 // 是否已经附加到状态对象上
    /**
     *  构造函数。
     * 
     * @param {AutoStore<any>} store  
     * @param {ComputedContext} context - 动态值上下文，指该动态值所有的路径、值、父路径和父对象引用。
     * @param {ComputedDescriptor<Options>} descriptor - 动态值描述符，包含了动态值的元数据。
     */
    constructor(public store:AutoStore<any>,public descriptor:ComputedDescriptor,public context?:ComputedContext<Value>){
        this._attched    =  context!==undefined
        this._path       = context?.path 
        this._getter     = descriptor.getter         
        this._options    = Object.assign({
            enable: true,
            group: "",
            depends: []
        }, descriptor.options) as unknown as Required<ComputedOptions>
        this._id         = this._options.id || (this._path ? joinValuePath(this._path) : getId())
        this._depends    = getDependPaths(this._path,this._options.depends )
        this._initialValue = this._options.initial 
        this.onInitial()   
    } 
    get options(){ return this._options   }
    get id(){return this._id }
    get attched(){return this._attched }
    get enable(){ return this._options.enable as boolean }
    set enable(value:boolean){ this._options.enable = value }
    get async(){return this._options.async}
    get group(){return this.options.group}
    get initial(){ return this._initialValue}      
    set initial(value){ this._initialValue = value }  
    get path(){ return this._path }
    get getter(){ return this._getter}
    set getter(value){ this._getter= value  } 
    get depends(){return this._depends}
    set depends(value){ this._depends=value}     
    toString(){ return `ComputedObject<${joinValuePath(this._path)}>` }
    get value(){ return (this._attched ? getVal(this.store.state,this._path) :  this._value) as unknown as Value}           
    set value(value:Value){
        if(this._attched){ 
            setVal(this.store.state,this._path!, value)     
        }else{
            this._value = value
        }
    }  
    /**
     * 更新计算对象的结果值
     * 
     * @description
     * 
     * - 标量值
     *  update(1)
     * - 对象值
     *  update({result:1})
     * 
     * 
     * 
     * 
     */
    update(value:Value,options?:{silent?:boolean}){
        if(this._attched){
            this.store.silentUpdate((state)=>{
                setVal(state,this._path!, value)
            })
        }else{
            this._value = value
        }
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
        if(this._attched){
            this.store.silentUpdate((state)=>{
                setVal(state,this._path!, value)
            })
        }else{
            this._value = value
        }
    }
    /**
     * 检查计算函数是否被禁用
     * 
     * @param value 
     * @returns {boolean} 
     */
    protected isDisable(value:boolean | undefined){
       return !this.store.options.enableComputed || (!this.enable && value!==true) || value===false
    }
    /**
     * 
     * 当动态值对象初始化时调用
     * 
     */
    protected onInitial(){

    }     
    /**
    *  手动触发计算属性getter函数的重新执行，重新计算计算属性的值
    * 
    * @description
    */
    run(options?:RuntimeComputedOptions){
        options
        throw new Error("Method not implemented.");
    }
    /**
     * 当依赖变化时调用
     * @param _ 
     */
    protected onDependsChange(_:StateOperateParams){ 
        throw new Error("Method not implemented.");
    }
    /**
     * 订阅依赖的变化事件
     * 不包括读取依赖的事件
     */
    subscribe(){
        if(this._depends && !this._subscribed){
            this._subscribers.push(this.store.watch(
                this._depends!,
                this.onDependsChange.bind(this),
                {operates:'write'}
            ))
            this.store.log(()=>`ComputedObject<${this.toString()}> subscribed to ${this._depends!.map(depends=>depends.join(PATH_DELIMITER)).join(",")}`)
            this._subscribed=true
        }
    }    
    /**
     * 取消订阅依赖的变化事件
     */
    unsubscribe(){
        this._subscribers.forEach(subscriber=>subscriber.off())
        this._subscribed=false
    }
    
    protected emitComputedEvent(event:keyof StoreEvents,args:any){
        setTimeout(()=>{
            this.store.emit(event,args)
        },0)
    }

    /**
     * 订阅当前计算变化的事件
     * @description
     * 
     * 当计算结果值发生变化时触发
     * 
     * @example
     * 
     * const computedObj = store.computedObject.get("xxx")
     * computedObj.on((value)=>{
     *      
     * })
     * 
     */
    on(listener:(value:Value)=>void){
        // 如果计算对象挂载到状态对象上，则直接订阅状态对象的变化事件即可
        if(this._attched){  
            return this.store.watch(this._path!.join(PATH_DELIMITER),({value})=>{
                listener.call(this,value as Value)
            })
        }else{
            
        }
    }



}
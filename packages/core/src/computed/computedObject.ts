/**
 * 
 * 
 * 
 */
import { OBJECT_PATH_DELIMITER } from "../consts"; 
import { AutoStore } from "../store/store";
import { StateOperateParams } from "../store/types";
import { getDependPaths } from "../utils/getDependPaths";
import { getVal } from "../utils/getVal";
import { joinValuePath } from "../utils/joinValuePath";
import {  ComputedContext, ComputedDescriptor, ComputedOptions, RuntimeComputedOptions } from './types';
import { Watcher } from "../watch/types";

 

export class ComputedObject<Value=any,Scope=any,Options extends ComputedOptions<Value,Scope> = ComputedOptions<Value,Scope>>{    
    private _path:string[] = []
    private _parentPath:string[] = []
    private _options:Required<Options>
    private _getter:any
    private _depends: string[][] | undefined
    private _id:string = ""
    private _initialValue:Value | undefined
    private _subscribers:Watcher[] = []              // 保存订阅者的ID
    private _subscribed:boolean = false
    /**
     *  构造函数。
     * 
     * @param {AutoStore<any>} store  
     * @param {ComputedContext} context - 动态值上下文，指该动态值所有的路径、值、父路径和父对象引用。
     * @param {ComputedDescriptor<Options>} descriptor - 动态值描述符，包含了动态值的元数据。
     */
    constructor(public store:AutoStore<any>,public context:ComputedContext<Value>,public descriptor:ComputedDescriptor){
        this._path       = context.path
        this._parentPath = context.parentPath
        this._getter     = descriptor.getter         
        this._options    = Object.assign({
            enable: true,
            group: "",
            depends: []
        }, descriptor.options) as unknown as Required<Options>
        this._id         = this._options.id ?? joinValuePath(this._path)
        this._depends    = getDependPaths(this._path,this._options.depends )
        this._initialValue = this._options.initial 
        this.onInitial()   
    } 
    get options(){ return this._options   }
    get id(){return this._id }
    get enable(){ return this._options.enable as boolean }
    set enable(value:boolean){ this._options.enable = value }
    get group(){return this.options.group}
    get value(){ return getVal(this.store.state,this._path) as unknown as Value}           
    get initial(){ return this._initialValue}  
    set initial(value){ this._initialValue = value }  
    get path(){ return this._path }
    get getter(){ return this._getter}
    set getter(value){ this._getter= value  } 
    get depends(){return this._depends}
    set depends(value){ this._depends=value}     
    toString(){ return `ComputedObject<${joinValuePath(this._path)}>` }
 
    /**
     * 检查计算函数是否被禁用
     * 
     * @param value 
     * @returns {boolean} 
     */
    protected isDisable(value:boolean=true){
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
            this._depends.forEach(depends=>{
                this._subscribers.push(this.store.watch(
                        depends.join(OBJECT_PATH_DELIMITER),
                        this.onDependsChange.bind(this),
                        {operates:['set','delete','insert','remove','update']}
                    ))
            })
            this.store.log(()=>`ComputedObject<${this.toString()}> subscribed to ${this._depends!.map(depends=>depends.join(OBJECT_PATH_DELIMITER)).join(",")}`)
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


}
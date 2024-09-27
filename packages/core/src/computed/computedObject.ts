/**
 * 
 * 
 * 
 */
import { PATH_DELIMITER } from "../consts"; 
import { AutoStore } from "../store/store";
import { StateOperateParams } from "../store/types";
import { getDependPaths } from "../utils/getDependPaths";
import { joinValuePath } from "../utils/joinValuePath";
import {  ComputedContext, ComputedDescriptor, ComputedOptions, RuntimeComputedOptions } from './types';
import { Watcher } from "../watch/types"; 
import { ComputedDescriptorObject } from "../descriptor/descriptorObject";


export class ComputedObject<Value=any> extends ComputedDescriptorObject<Value,ComputedOptions<Value>>{     
    private _subscribers:Watcher[] = []              // 保存订阅者的ID
    private _subscribed:boolean = false 

    /**
     *  构造函数。
     * 
     * @param {AutoStore<any>} store  
     * @param {ComputedContext} context - 动态值上下文，指该动态值所有的路径、值、父路径和父对象引用。
     * @param {ComputedDescriptor<Options>} descriptor - 动态值描述符，包含了动态值的元数据。
     */
    constructor(public store:AutoStore<any>,public descriptor:ComputedDescriptor,public context?:ComputedContext<Value>){
        super(store,descriptor,context) 
        this.options.depends  = getDependPaths(this.path,this.options.depends ) 
    }    
    toString(){ return `ComputedObject<${joinValuePath(this.path)}>` } 
    get depends(){
        return super.depends as string[][] | undefined
    }

    set depends(value:string[][] | undefined){
        super.depends = value
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
     * 获取当前对象的依赖路径
     * 
     * @returns 
     */
    protected getDepends(){
        return this.depends!
    }
    /**
     * 订阅依赖的变化事件
     * 不包括读取依赖的事件
     */
    subscribe(){
        if(this.depends && !this._subscribed){
            this._subscribers.push(this.store.watch(
                this.getDepends(),
                this.onDependsChange.bind(this),
                {operates:'write'}
            ))
            this.store.log(()=>`${this.toString()} subscribed to ${this.depends!.map(depends=>depends.join(PATH_DELIMITER)).join(",")}`)
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
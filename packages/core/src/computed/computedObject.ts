/**
 * 
 * 
 * 
 */
import { AutoStore } from "../store/store";
import { calcDependPaths } from "../utils/calcDependPaths";
import { joinValuePath } from "../utils/joinValuePath";
import {  ComputedContext, ComputedDescriptor, ComputedOptions, RuntimeComputedOptions } from './types';
import { ObserverObject } from "../observer/observer";

export class ComputedObject<Value=any> extends ObserverObject<Value,ComputedOptions<Value>>{     
    /**
     *  构造函数。
     * 
     * @param {AutoStore<any>} store  
     * @param {ComputedContext} context - 动态值上下文，指该动态值所有的路径、值、父路径和父对象引用。
     * @param {ComputedDescriptor<Options>} descriptor - 动态值描述符，包含了动态值的元数据。
     */
    constructor(public store:AutoStore<any>,public descriptor:ComputedDescriptor,public context?:ComputedContext<Value>){
        super(store,descriptor,context) 
        descriptor.options.depends  = calcDependPaths(this.path,this.options.depends )         
    }    
    toString(){ return `ComputedObject<${joinValuePath(this.path)}>` }  
    
    get val():Value{
        return this.async ? (this.value as any).value :  this.value
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
    * eslint-disable-next-line @typescript-eslint/no-unused-vars
    */
    run(options?:RuntimeComputedOptions){
        throw new Error("Method not implemented.");
    } 
    

}
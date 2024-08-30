/**
 * 
 * 
 * 
 */
import { DynamicValueContext } from "../dynamic"
import { DynamicValueObject } from "../dynamic/valueObject"
import type { AutoStore } from "../store/store" 
import { joinValuePath } from "../utils/joinValuePath";
import { ComputedDescriptor, ComputedOptions } from './types';

 

export class ComputedObject<Value=any,Scope=any> 
    extends DynamicValueObject<Value,Scope,ComputedOptions<Value,Scope>>{
    protected _initialValue:any

    constructor(public store:AutoStore<any>,context:DynamicValueContext,descriptor:ComputedDescriptor<Scope,Value>){
        super(store,context,descriptor)
    } 
    get initial(){ return this._initialValue}  
    protected onInitial(){
      
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
     */
    run(){
        this.descriptor.getter
    }
    toString(){ return `ComputedObject<${joinValuePath(this.path)}>` }

}
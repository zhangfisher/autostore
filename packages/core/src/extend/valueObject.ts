/**
 * 
 * 在创建对象时，如果对象的成员值是一个函数，则代表这是一个动态对象
 * autoda会为创建一个ValueObject
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

import { AutoStore } from "../store/store"
import { getVal } from "../utils/getVal"
import { DynamicValueContext, DynamicValueDescriptor, DynamicValueOptions } from './types';


export class DynamicValueObject<Scope=any,Value=any,Options extends DynamicValueOptions = DynamicValueOptions>{
    constructor(public store:AutoStore<any>,public context:DynamicValueContext,public descriptor:DynamicValueDescriptor<Options>){
        this.options.id = descriptor.options.id
    } 
    get options(){ return this.descriptor.options as unknown as RequiredDynamicOptions }
    get id(){return this.options.id }
    get enable(){ return this.options.enable  }
    set enable(value:boolean){ this.options.enable = value }
    get group(){return this.options.group}
    get value(){ return getVal(this.store.state,this.context.path) as unknown as Value}       
    get path(){ return this.context.path }
    get getter(){ return this.descriptor.getter}
    set getter(value){ this.descriptor.getter = value } 

}
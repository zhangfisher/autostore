/**
 * 
 * 
 * 
 */
import { COMPUTED_DESCRIPTOR_FLAG, SKIP_PROXY_FLAG } from "../consts"
import type { Stateable } from "../state"
import { getVal } from "../utils"
import { ComputedDescriptor, ComputedOptions, RequiredComputedOptions } from "./types"

 
export type ComputedObjectContext<Scope=any,Value=any> = {
    path      : string[],
    parent    : any
    parentPath: string[]
    depends   : string[]
}

export class ComputedObject<Scope=any,Value=any>{
    context:ComputedObjectContext<Scope,Value>
    descriptor:ComputedDescriptor<Scope,Value>
    constructor(public state:Stateable<any>,context:ComputedObjectContext<Scope,Value>,descriptor:ComputedDescriptor<Scope,Value>){
        this.descriptor = descriptor
        this.context = context
    } 
    get options(){ return this.descriptor.options as unknown as RequiredComputedOptions<Scope,Value> }
    get id(){return this.options.id }
    get enable(){ return this.options.enable  }
    get group(){return this.options.group}
    set enable(value:boolean){ this.options.enable = value }
    get async(){return this.options.async}
    get depends(){return this.options.depends}   
    get value(){ return getVal(this.state.data,this.context.path) }       
    /**
     * 手动触发计算属性getter函数的重新执行，重新计算计算属性的值
     */
    run(){

    }
}
/**
 *  抽象的动态计算值对象
 *  
 *  该对象具有以下特点
 * 
 *  - 具有一个Value，该值是动态的，可以通过计算函数Getter计算得到
 *  - 具有一个Getter，该函数用于计算Value的值
 * 
 *  - 对象具有状态依赖，可以是一个依赖，也可以是一组依赖，或者是动态依赖
 *  - 当所依赖的值变化时执行Getter并将结果赋值给Value
 * 
 *  - 对象可以attach to state，此时path不为空，表示该对象挂载到状态对象上的路径。当依赖变化后执行
 *     Getter的结果会自动更新到状态对象上的挂载路径上path
 *  - 如果没有挂载到状态对象上，则Value的值保存在当前对象实例中
 * 
 *  
 * 
 * 
 */


import { PATH_DELIMITER } from "./consts"; 
import { AutoStore } from "./store/store"; 
import { getVal } from "./utils/getVal";
import { joinValuePath } from "./utils/joinValuePath"; 
import { setVal } from "./utils/setVal";
import { getId } from "./utils/getId"; 
import { EventEmitter } from "./events"; 
import { IComputedDescriptor, IComputedDescriptorOptions } from "./descriptor";
import { ComputedContext } from "./computed/types";



export type IValueObjectOptipons<Value=any> = {
    id?     : string
    path?   : string[]
    enable? : boolean
    group?  : string
    initial?: Value
}


export type IDescriptorEvents<Value=any> = {
    change:Value
}

export class IDescriptorObject<Value=any,Getter=any,Options extends IComputedDescriptorOptions<Value>=IComputedDescriptorOptions<Value,any>> extends EventEmitter<IDescriptorEvents<Value>>{    
    private _path?:string[]  | undefined
    private _id:string = ""
    private _initial:Value | undefined
    private _value:Value | undefined
    private _attched:boolean = false             
    private _getter:Getter
    private _depends:string[][] | undefined
    private _silenting:boolean = false
    private _batching:boolean = false
    private _options:Required<Options>
  
    /**
     *  构造函数。
     * 
     * @param {AutoStore<any>} store  
     * @param {ComputedContext} context - 动态值上下文，指该动态值所有的路径、值、父路径和父对象引用。
     * @param {ComputedDescriptor<Options>} descriptor - 动态值描述符，包含了动态值的元数据。
     */
    constructor(public store:AutoStore<any>,public descriptor:IComputedDescriptor,public context?:ComputedContext<Value>){        
        super()
        this._attched    =  context!==undefined
        this._path       = context?.path 
        this._getter     = descriptor.getter as Getter 
        this._options    = Object.assign({
            enable: true,
            group : "", 
        }, descriptor.options) as unknown  as Required<Options>
        this._id         = this._options.id || (this._path ? joinValuePath(this._path) : getId())
        this._initial = this._options.initial  
        this.onInitial()
    }
    get id(){return this._id }
    get attched(){return this._attched }
    get enable(){ return this._options.enable!  }
    set enable(value:boolean){ this._options.enable = value }
    set group(value:string){  this._options.group=value}
    get group(){ return this._options.group! }
    get initial(){ return this._initial}      
    set initial(value){ this._initial = value }  
    get path(){ return this._path }
    get depends(){return this._depends}
    set depends(value){ this._depends=value}     
    toString(){ return `ValueObject<${joinValuePath(this._path)}>` }
    get value(){ 
        return (this._attched ? getVal(this.store.state,this._path) :  this._value) as unknown as Value
    }           
    set value(value:Value){
        if(this._attched){            
            this.store.update((state)=>{
                setVal(state,this._path!, value)    
            },{
                batch:this._batching,
                silent:this._silenting
            })
        }else{
            this._value = value
            if(!this._silenting) this.emit("change",value)
        }
    }   

    private onInitial(){

    }
    on<T extends keyof IDescriptorEvents>(event: T,listener:(value:Value)=>void){ 
        // 如果计算对象挂载到状态对象上，则直接订阅状态对象的变化事件即可
        if(this._attched){  
            return this.store.watch(this._path!.join(PATH_DELIMITER),({value})=>{
                listener.call(this,value as Value)
            })
        }else{
            return super.on(event,listener)
        }        
    } 
    once<T extends keyof IDescriptorEvents>(event: T, listener: (payload:IDescriptorEvents[T]) => void) {        
        if(this._attched){   
            return this.store.watch(this._path!.join(PATH_DELIMITER),({value})=>{
                listener.call(this,value as Value)
            },{once:true})
        }else{
            return super.once(event,listener)
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
     */
    update(value:Value,options?:{batch?:boolean,silent?:boolean}){
        this._batching = !!options?.batch 
        this._silenting = !!options?.silent
        try{
            this.value = value            
        }finally{
            this._batching = false
            this._silenting = false
        }
    }    
    /**
     * 更新计算属性的值，并且不会触发依赖的变化事件
     *  
     * @param value 
     * @param {boolean} silent - 是否静默更新，即不会触发依赖变化事件 
     */
    silentUpdate(value:Value){
        this.update(value,{silent:true})
    } 

}
 
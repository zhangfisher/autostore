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


import { PATH_DELIMITER } from "../consts"; 
import { AutoStore } from "../store/store"; 
import { getVal } from "../utils/getVal";
import { joinValuePath } from "../utils/joinValuePath"; 
import { setVal } from "../utils/setVal";
import { getId } from "../utils/getId"; 
import {  StoreEvents } from "../events"; 
import { IComputedDescriptor, IComputedDescriptorOptions } from "./types";
import { ComputedContext } from "../computed/types";
import { UpdateOptions } from "../store/types";
import {  WatchListenerOptions } from "../watch/types";



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



export class ComputedDescriptorObject<
    Value=any,
    Options extends IComputedDescriptorOptions<Value>=IComputedDescriptorOptions<Value,any>>{    
    private _path:string[]  
    private _id:string = ""
    private _initial:Value | undefined
    private _value:Value | undefined
    private _attched:boolean = false             
    private _getter:any
    private _depends:string[][] | undefined
    private _options:Required<Options> 
    /**
     *  构造函数。
     * 
     * @param {AutoStore<any>} store  
     * @param {ComputedContext} context - 动态值上下文，指该动态值所有的路径、值、父路径和父对象引用。
     * @param {ComputedDescriptor<Options>} descriptor - 动态值描述符，包含了动态值的元数据。
     */
    constructor(public store:AutoStore<any>,public descriptor:IComputedDescriptor,public context?:ComputedContext<Value>){        
        this._attched    =  context!==undefined
        this._getter     = descriptor.getter         
        this._options    = Object.assign({
            enable: true,
            group: "",
            depends: []
        }, descriptor.options) as unknown as Required<Options>
        this._id         = this._options.id || (this._attched ? joinValuePath(context?.path) : getId())
        this._path       = context?.path || [`#${this._id}`]
        if(!this._path) this._path = [`#${this._id}`]
        this._initial = this._options.initial 
        this.onInitial()
    }
    get options(){ return this._options}
    get id(){return this._id }
    get attched(){return this._attched }
    get async(){ return this._options.async  }
    get enable(){ return this._options.enable!  }    
    set enable(value:boolean){ this._options.enable = value }
    set group(value:string){  this._options.group=value}
    get group(){ return this._options.group! }
    get initial(){ return this._initial}      
    set initial(value){ this._initial = value }  
    get path(){ return this._path }
    get depends(){return this._depends}
    set depends(value){ this._depends=value}         
    get getter(){ return this._getter}
    set getter(value){ this._getter= value  }   

    toString(){ return `ComputedDescriptorObject<${joinValuePath(this._path)}>` }
    get value(){ 
        if(this._attched){
            return getVal(this.store.state,this._path) 
        }else{ 
            this.store._notify({type:'get',path:this.path,value:this._value}) 
            return this._value as unknown as Value
        }
    }           
    set value(value:Value){
        if(this._attched){ 
            setVal(this.store.state,this._path, value)     
        }else{            
            this._value = value          
            this.store._notify({type:'set',path:this.path,value})
        }
    }  
    onInitial(){

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
    batchUpdate(value:Value){
        this.update(value,{batch:true})
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
     * computedObj.on((value)=>{
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
}
 


/**
 * 
 * 
 * 
 */
import { PATH_DELIMITER } from "./consts"; 
import { AutoStore } from "./store/store";
import { StateOperateParams } from "./store/types"; 
import { getVal } from "./utils/getVal";
import { joinValuePath } from "./utils/joinValuePath";
import { StoreEvents } from "./events/types";
import { setVal } from "./utils/setVal";
import { getId } from "./utils/getId"; 
import { EventEmitter } from "./events"; 



export type IValueObjectOptipons<Value=any> = {
    id?     : string
    path?   : string[]
    enable? : boolean
    group?  : string
    initial?: Value
}


export type IValueEvents<Value=any> = {
    change:Value
}

export class IValueObject<Value=any> extends EventEmitter<IValueEvents<Value>>{    
    private _path?:string[]  | undefined
    private _id:string = ""
    private _initial:Value | undefined
    private _value:Value | undefined
    private _attched:boolean = false             
    private _getter:any
     private _depends:any
    private _options:Required<IValueObjectOptipons<Value>>
  
    /**
     *  构造函数。
     * 
     * @param {AutoStore<any>} store  
     * @param {ComputedContext} context - 动态值上下文，指该动态值所有的路径、值、父路径和父对象引用。
     * @param {ComputedDescriptor<Options>} descriptor - 动态值描述符，包含了动态值的元数据。
     */
    constructor(public store:AutoStore<any>,getter?:Function,options?:IValueObjectOptipons<Value>){        
        super()
        this._options = Object.assign({ 
            enable : true 
        },options) as Required<IValueObjectOptipons<Value>>
        this._path    = this._options.path 
        this._attched = Array.isArray(this._path) 
        this._initial = this._options.initial 
        this._getter  = getter
        this._id      = this._options.id || (this._path ? joinValuePath(this._path) : getId())
    }
    get id(){return this._id }
    get attched(){return this._attched }
    get enable(){ return this._options.enable as boolean }
    set enable(value:boolean){ this._options.enable = value }
    set group(value:string){  this._options.group=value}
    get group(){ return this._options.group }
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
            setVal(this.store.state,this._path!, value)    
        }else{
            this._value = value
            this.emit("change",value)
        }
    }   
    on<T extends keyof IValueEvents>(event: T,listener:(value:Value)=>void){ 
        // 如果计算对象挂载到状态对象上，则直接订阅状态对象的变化事件即可
        if(this._attched){  
            return this.store.watch(this._path!.join(PATH_DELIMITER),({value})=>{
                listener.call(this,value as Value)
            })
        }else{
            return super.on(event,listener)
        }        
    } 
    once<T extends keyof IValueEvents>(event: T, listener: (payload:IValueEvents[T]) => void) {        
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
     * 
     * 
     * 
     */
    update(value:Value,options?:{batch?:boolean,silent?:boolean}){
        if(this._attched){
            this.store.update((state)=>{
                setVal(state,this._path!, value)
            },options)
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
    /**
     * 当依赖变化时调用
     * @param _ 
     */
    protected onDependsChange(_:StateOperateParams){ 
        throw new Error("Method not implemented.");
    } 
    protected emitComputedEvent(event:keyof StoreEvents,args:any){
        setTimeout(()=>{
            this.store.emit(event,args)
        },0)
    } 


}
 
import { setVal } from "../utils/setVal"
import { WatchOptions, WatchDescriptor, WatchGetter } from './types';
import { Dict } from "../types"
import { getVal } from "../utils/getVal"
import { isEq } from "../utils/isEq";
import { AutoStore } from "../store/store";
import { ComputedContext } from "../computed/types";
import { joinValuePath } from "../utils/joinValuePath";
import { getId } from "../utils/getId";
import { StoreEvents } from "../events/types";
 

export class WatchObject<Value=any> {
    private _cache?: Dict
    private _path?:string[] 

    private _id:string
    private _getter?:WatchGetter<Value>
    private _options: Required<WatchOptions>
    private _value:Value | undefined
    private _attched:boolean = false                 // 是否已经附加到状态对象上
    private _initialValue:Value | undefined


    constructor(public store:AutoStore<any>,descriptor:WatchDescriptor,public context?:ComputedContext<any>){ 
        this._attched    =  context!==undefined
        this._path       = context?.path 
        this._getter     = descriptor.getter  
        this._options = Object.assign({ 
            enable  : true,            
            group   : undefined, 
            initial : undefined 
        },descriptor.options) as Required<WatchOptions>
        if(typeof(this._options.depends)!=='function') throw new Error("watch options.depends must be a function")        
        this._id  = this._options.id || (this._path ? joinValuePath(this._path) : getId())
        this._initialValue = this._options.initial 
        this.onInitial()            
    }
    get id(){ return this._id}
    get attched(){return this._attched }

    get options(){ return this._options}

    get initial(){ return this._initialValue}      
    set initial(value){ this._initialValue = value }  

    get path(){ return this._path}
    get group(){ return this._options.group}
    get depends(){ return this._options.depends!}
    get enable(){ return this._options.enable!}
    set enable(value:boolean){ this._options.enable = value}
    get cache(){
        if(!this._cache) this._cache = {}
        return this._cache!
    }
    toString(){ return `WatchObject<${joinValuePath(this._path)}>` }

    get value(){ return (this._attched ? getVal(this.store.state,this._path) :  this._value) as unknown as Value}           
    set value(value:Value){
        if(this._attched){
            setVal(this.store.state,this._path!, value)    
        }else{
            this._value = value
        }
    }  
    private onInitial(){
        if(this._options.initial!==undefined){
            if(this.attched){
                this.store.silentUpdate(state=>{
                    setVal(state,this.path!,this._options.initial)
                })
            }else{
                this._value = this._options.initial
            }
        }
        
    }
    /**
     * 判断当前监听函数是否依赖于某个路径
     * 
     * @param dependPath 
     * @param dependValue 
     * @returns 
     */
    isDepends(dependPath:string[],dependValue:any){
        if(isEq(dependPath,this.path)) return false
        return this.depends(dependPath,dependValue)
    }

    reset(){
        this._cache = {}
        this.value = this.initial as Value
    } 
    /**
     * 运行侦听函数
     * @param watchPath 
     * @returns 
     */
    run(watchPath:string[],watchValue:any){   
        // 1. 检查是否启用
        if(!this.enable) {
            this.store.options.log!(`WatchObject <${this.toString()}> is disabled`)
            return 
        } 
        try{
            // 2.  执行监听函数
            const result = this._getter?.call(this,
                {   
                    path:watchPath,
                    value:watchValue
                },this as any)    
            this.value = result as Value            
            this.emitWatchEvent("watch:done",{value:result,watchObject:this})
        }catch(e){
            this.emitWatchEvent("watch:error",{error:e, watchObject:this})
        }        
    }  
    protected emitWatchEvent(event:keyof StoreEvents,args:any){
        setTimeout(()=>{
            this.store.emit(event,args)
        },0)
    }


}
 
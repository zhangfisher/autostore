import { setVal } from "../utils/setVal"
import { WatchOptions, WatchDescriptor, WatchGetter } from './types';
import { Dict } from "../types"
import { getVal } from "../utils/getVal"
import { isEq } from "../utils/isEq";
import { AutoStore } from "../store/store";
import { ComputedContext } from "../computed/types";
import { joinValuePath } from "../utils/joinValuePath";
import { getId } from "../utils/getId";
 

export class WatchObject<Value=any,Result=any> {
    private _cache?: Dict
    private _id:string
    private _getter?:WatchGetter<Value,Result>
    private _options: Required<WatchOptions>
    constructor(public store:AutoStore<any>,descriptor:WatchDescriptor,public context:ComputedContext<any>){        
        this._options = Object.assign({ 
            enable  : true,            
            group   : undefined, 
            initial : undefined 
        },descriptor.options) as Required<WatchOptions>
        if(typeof(this._options.depends)!=='function') throw new Error("watch options.depends must be a function")        
        this._id  = this._options.id || (this.context.path ? joinValuePath(this.context.path) : getId())
        this.onInitial()
    }
    get id(){ return this._id}
    get options(){ return this._options}

    get path(){ return this.context.path}
    get depends(){ return this._options.depends!}
    get enable(){ return this._options.enable!}
    set enable(value:boolean){ this._options.enable = value}
    get cache(){
        if(!this._cache) this._cache = {}
        return this._cache!
    }
    /**
     * 返回当前watch处理后的,即listener的返回值
     * @returns 
     */
    get value(){
        return getVal(this.store.state,this.path)
    }     
    private onInitial(){
        if(this._options.initial!==undefined){
            this.store.silentUpdate(state=>{
                setVal(state,this.path,this._options.initial)
            })
        }
    }
    /**
     * 返回输入的路径是否当前对象所依赖的路径
     * 
     * 如果路径是自身路径，则返回false
     * 
     * @param watchedPath 
     * @param watchedValue 
     * @returns 
     */
    isDepends(watchedPath:string[],watchedValue:any){
        if(isEq(watchedPath,this.path)) return false
        return this.depends(watchedPath,watchedValue)
    }

    reset(){
        this._cache = {}
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
            const result = this._getter?.call(this,watchPath,watchValue,this as any)    
            // 3. 将返回值回写到状态中
            if(result!==undefined){            
                // 回写到原地                    
                setVal(this.store.state,this.path,result) 
            }    
        }catch{

        }        
    }  

}
 
import { WatchOptions, WatchDescriptor } from './types';
import { Dict } from "../types"
import { isEq } from "../utils/isEq";
import { AutoStore } from "../store/store";
import { ComputedContext } from "../computed/types"; 
import { ObserverObject } from "../observer/observer"; 

export class WatchObject<Value=any> extends ObserverObject<Value,WatchOptions<Value>>{
    private _cache?: Dict 
    constructor(public store:AutoStore<any>,descriptor:WatchDescriptor,public context?:ComputedContext<any>){ 

        super(store,descriptor,context) 
        if(typeof(this.options.filter)!=='function') throw new Error("watch options.filter must be a function")                
    }
    get filter(){ return this.options.filter! }
    get cache(){
        if(!this._cache) this._cache = {}
        return this._cache!
    }
    toString(){ return `WatchObject<${this.id}>` }
 
    protected onInitial(){ 
    }
    /**
     * 侦听到值变化时调用本函数来判断是否匹配
     * 
     * 如果是则执行监听函数
     * 
     * @param dependPath 
     * @param dependValue 
     * @returns 
     */
    isMatched(dependPath:string[],dependValue:any){
        if(isEq(dependPath,this.path)) return false
        return this.filter(dependPath,dependValue)
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
            this.store.log(`WatchObject <${this.toString()}> is disabled`)
            return 
        } 
        try{
            // 2.  执行监听函数
            const result = this.getter?.call(this,
                {   
                    path:watchPath,
                    value:watchValue
                },this as any)    
            this.value = result as Value            
            this.emitStoreEvent("watch:done",{value:result,watchObject:this})
        }catch(e){
            this.emitStoreEvent("watch:error",{error:e, watchObject:this})
        }        
    }   


}
 
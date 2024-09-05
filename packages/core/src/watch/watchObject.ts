import { setVal } from "../utils/setVal"
import { WatchListener, WatchOptions, WatchDescriptor, WatchGetter } from './types';
import { Dict } from "../types"
import { getVal } from "../utils/getVal"
import { OBJECT_PATH_DELIMITER } from "../consts"  
import { isEq } from "../utils/isEq";
import { AutoStore } from "../store/store";
import { ComputedContext } from "../computed/types";
import { joinValuePath } from "../utils/joinValuePath";
 

export class WatchObject<T extends Dict> {
    private _cache?: Dict
    private _getter?:WatchGetter<T>
    private _options: Required<WatchOptions>
    constructor(public store:AutoStore<T>,public context:ComputedContext<any>,descriptor:WatchDescriptor){        
        this._options = Object.assign({ 
            enable  : true,
            selfPath: [],
            group   : undefined,
            context : undefined,
            initial : undefined 
        },descriptor.options) as Required<WatchOptions>
        if(typeof(this._options.depends)!=='function') throw new Error("watch options.depends must be a function")        
            // 如果没有id则生成一个id
        if(!this._options.id){
            const selfPath = this._options.path
            this._options.id = this._options.id  ?? joinValuePath(selfPath) 
        } 
    }
    get id(){ return this._options.id!}
    get options(){ return this._options}
    get path(){ return this._options.path!}
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
    /**
     * 返回输入的路径是否当前对象所依赖的路径
     * 
     * 如果路径是自身路径，则返回false
     * 
     * @param watchPath 
     * @param watchValue 
     * @returns 
     */
    isDepends(watchPath:string[],watchValue:any){
        if(isEq(watchPath,this.path)) return false
        return this.depends(watchPath,watchValue)
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
 
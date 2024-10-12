import { Dict } from "../types" 
import { WatchObject } from "./watchObject";
import { getVal } from "../utils";
import { AutoStore } from '../store/store';
import {  WatchDependFilter, Watcher, WatchGetter, WatchOptions } from "./types";
import { watch } from "./watch";

export class WatchObjects<State extends Dict> extends Map<string,WatchObject>{
    private _watcher:Watcher ={off:()=>{}}
    private _enable:boolean=true                            // 是否启用侦听器
    constructor(public store:AutoStore<State>){
        super()   
    }  
    get enable(){return this._enable}
    set enable(value:boolean){ this._enable = value  }      
    set(key:string,value:WatchObject){
        if(super.size===0) {
            this.createWacher() 
        }        
        return super.set(key,value)
    }
    /**
     * 创建全局侦听器,
     * 此侦听器会侦听根对象，当对象所有的状态变化,会执行所有监听过滤函数，如果返回true，则执行对应的监听函数
     * 负责处理动态侦听
     */
    private createWacher(){
        this._watcher = this.store.watch("**",({path})=>{
            if(!this._enable) return 
            const value = getVal(this.store.state,path)
            for(let watchObj of this.values()){
                if(watchObj.isMatched(path,value)){
                    watchObj.run(path,value)
                }
                
            }                
        })
    } 
    /**
     * 重置侦听器
     */
    reset(){
        this._watcher && this._watcher.off()
        this.createWacher()
    }
   
    /**
     * 动态加一个侦听器对象  
     * 
     * @description
     * 
     * 动态创建一个侦听器对象，侦听器对象是一个函数，当侦听器侦听的路径发生变化时，侦听器会被调用
     * 
     * @param selfPath              侦听函数所在的路径,用来接收侦听函数的返回值，当使用useWatch时
     * @param listener              侦听函数 
     * @param options               参数
     * @param watchTo               侦听结果写到处下载
     * @returns 
     */
    create<Value=any,DependValue=any>(getter:WatchGetter<Value,DependValue>,filter?:WatchDependFilter<DependValue>,options?:Omit<WatchOptions<Value>,'filter'>) {      
        const descrioptorBuilder = watch(getter,filter,options)     
        const descrioptor = descrioptorBuilder() 
        return this.store._createWatch(descrioptor)  as WatchObject<Value>    
    }
    /**
     * 控制某个组的侦听器是否启用
     * @param groupName 
     * @param value 
     */
    enableGroup(groupName:string,value:boolean=true){
        for(const watcher of this.values()){
            if(watcher.options.group === groupName){
                watcher.options.enable = value
            }
        }
    } 

}
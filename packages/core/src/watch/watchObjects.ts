import { WatchDescriptorDefine } from './types';
import { Dict } from "../types" 
import { WatchObject } from "./watchObject";
import { getVal } from "../utils";
import { AutoStore } from '../store/store';

export class WatchObjects<State extends Dict> extends Map<string,WatchObject<T>>{
    private _off?:()=>void
    private _enable:boolean=true                            // 是否启用侦听器
    constructor(public store:AutoStore<State>){
        super()   
        store.on("created",this.onStateCreated.bind(this))
    }  
    private onStateCreated(){ 
        this.createWacher() 
    }
    get enable(){
        return this._enable
    }
    set enable(value:boolean){
        this._enable = value
    }      
    /**
     * 创建全局侦听器,
     * 此侦听器会侦听根对象，当对象所有的状态变化,会执行所有监听过滤函数，如果返回true，则执行对应的监听函数
     * 负责处理动态侦听
     */
    private createWacher(){
        const unwatch = this.store.watch("**",(changedPaths)=>{
            if(!this._enable) return 
            changedPaths.forEach((keyPath)=>{  
                const watchValue = getVal(this.store.state,keyPath)
                for(let watchObj of this.values()){
                    if(watchObj.isDepends(keyPath,watchValue)){
                        watchObj.run(keyPath,watchValue)
                    }
                    
                }                
            })
        },[])
        this._off = unwatch
    } 
    /**
     * 重置侦听器
     */
    reset(){
        this._off && this._off()
        this.createWacher()
    }
   
    /**
     * 添加一个侦听器对象  
     * @param selfPath              侦听函数所在的路径,用来接收侦听函数的返回值，当使用useWatch时
     * @param listener              侦听函数 
     * @param options               参数
     * @param watchTo               侦听结果写到处下载
     * @returns 
     */
    add(descriptor:WatchDescriptorDefine){
        const watchObject  = new WatchObject(this.store,descriptor)
        this.set(watchObject.id,watchObject)
        return watchObject
    }
    /**
     * 控制某个组的侦听器是否启用
     * @param groupName 
     * @param value 
     */
    enableGroup(groupName:string,value:boolean=true){
        for(const watcher of this.values()){
            if(watcher.options.group==groupName){
                watcher.options.enable = value
            }
        }
    } 

}
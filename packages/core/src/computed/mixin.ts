import { StateExtendContext, StateExtendDescriptor } from "../extend";
import type { AutoStore } from "../store/store";
import { Dict } from "../types";
import { isPathEq } from "../utils/isPathEq";
import { ComputedObject } from "./computedObject";
import { ComputedDescriptor } from "./types";

export class ComputedMixin<State extends Dict>{
    protected createComputedObject(this: AutoStore<State>){
        
    }

    
    /**
     * 
     * 创建一个计算属性对象
     * 
     * 当data中的成员是一个函数时，会自动创建一个计算属性对象
     * 
     * 
     */
    protected createComputed(this: AutoStore<State>,extendContext:StateExtendContext,descriptor:StateExtendDescriptor){
        const computedObj = new ComputedObject(this,extendContext,descriptor as ComputedDescriptor)    
        // 对同步计算属性启动自动依赖收集，即运行一次. (异步函数不能自动收集依赖 )
        if(!computedObj.async){
            this.collectDependencies(computedObj)
        }        
        return computedObj.value    
    } 

    /**
     * 自动收集同步依赖
     * 
     * 如果计算函数是一个同步函数，则可以通过运行函数来收集依赖
     * 
     * 
     */
    private collectDependencies(this: AutoStore<State>,computedObj:ComputedObject){
        if(!computedObj.async) return 
        const dependencies:string[][] = []      
        // 1. 先侦听所有的get操作事件 
        const watcher = this.watch((event)=>{
            computedObj.depends.forEach((dep)=>{
                if(Array.isArray(dep)){
                    if(isPathEq(event.path,dep))  dependencies.push(dep)
                }else{

                }
                 
            })    
        },{operates:['get']})
       // 第一次运行getter函数，如果函数内部有get操作，会触发
        computedObj.run()   
        watcher.off()
    }

}
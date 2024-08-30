/**
 * 同步计算
 */
import {  setVal  } from "../utils"; 
import {  ComputedOptions,  RuntimeComputedOptions } from './types';
import { getValueScope } from '../scope';
import { ComputedObject } from "./computedObject";
import { isPathMatched } from "../utils/isPathMatched";
import { OBJECT_PATH_DELIMITER } from "../consts";
import { StateOperateParams } from "../store/types";
 

/**
 * 
 * 同步计算属性对象
 * 
 */
export class SyncComputedObject<State> extends ComputedObject<State>{

  /**
   * 同步计算属性对象在初始化时，会通过运行来自动收集依赖
   */
  protected onInitial(){
      this.collectDependencies()
  }
  /**
   * 
   * 当计算属性的依赖发生变化时，重新计算计算属性的值
   * 
   * @param args  可以覆盖默认的配置参数
   * @returns 
   */
  run(options?:RuntimeComputedOptions){        
    const { initialize = false } = options ?? {}
    // 1. 检查是否计算被禁用
    if(!this.store.options.enableComputed || (!this.enable && options?.enable!==true) || options?.enable===false){
      this.store.log(`Sync computed <${this.toString()}> is disabled`,'warn')
      return 
    }
    !initialize && this.store.log(`Run sync computed for : ${this.toString()}`); 
 
    // 2. 合成最终的配置参数
    const finalComputedOptions = Object.assign({},this.options,options) as Required<ComputedOptions>

    // 2. 根据配置参数获取计算函数的上下文对象      
    const scope = getValueScope(this,'computed',this.context,finalComputedOptions)  

    // 3. 执行getter函数
    let computedResult = finalComputedOptions.initial;
    try {
      computedResult = (this.getter ).call(this.store,scope);
      if(initialize){
        this._initialValue = computedResult
      }else{
        setVal(this.store.state,this.path, computedResult);
      }      
      !initialize && this.store.emit("computed:done", { id:this.id,path:this.path,value:computedResult})
    } catch (e: any) {
      !initialize && this.store.emit("computed:error", { id: this.id, path: this.path, error: e });
    }    
  } 
  /**
   * 自动收集同步依赖
   * 
   * 如果计算函数是一个同步函数，则可以通过运行函数来收集依赖
   * 
   * 收集依赖时的注意事项：
   * 
   
   * (scope)=>{
   *    scope.user.firstName+scope.user.lastName
   * }
   * 以上会产生对user对象的读取,得到的依赖是['user.firstName','user.lastName','user']
   * 
   * 
   * 
   * 
   * 
   */
  private collectDependencies(){
      let dependencies:string[][] = []       
      const watcher = this.store.watch((event)=>{      
          dependencies.push(event.path)
      },{operates:['get']})   
      // 第一次运行getter函数，如果函数内部有get操作，会触发上面的watcher事件，从而收集依赖
      this.run({initialize:true})   
      watcher.off()     
      // 去重一下
      dependencies= [...new Set(dependencies)]
      this.depends = dependencies      
      this.subscribeDepends()
  }  
  protected onDependsChange(event: StateOperateParams): void {      
      this.run()
  }
}
 
/**
 * 同步计算
 */
import { ComputedOptions,  SyncRuntimeComputedOptions } from './types';
import { getValueScope } from '../scope';
import { ComputedObject } from "./computedObject";
import { StateOperateParams } from "../store/types";
import { noRepeat } from "../utils/noRepeat";
import { calcDependPaths } from '../utils/calcDependPaths';

/**
 * 
 * 同步计算属性对象
 * 
 */
export class SyncComputedObject<Value=any,Scope=any>  extends ComputedObject<Value>{

  get async(){return false }
  /**
   * 同步计算属性对象在初始化时，会通过运行来自动收集依赖
   */
  onInitial(){
      this.collectDependencies()
  }
  
  /**
   * 
   * 当计算属性的依赖发生变化时，重新计算计算属性的值
   * 
   * @param args  可以覆盖默认的配置参数
   * @returns 
   */
  run(options?:SyncRuntimeComputedOptions){        
    const { first ,changed } = Object.assign({
      first:false,
      changed:undefined
    },options)
    // 1. 检查是否计算被禁用, 注意，仅点非初始化时才检查计算开关，因为第一次运行需要收集依赖，这样才能在后续运行时，随时启用/禁用计算属性
    if(!first && this.isDisable(options?.enable)){
      this.store.log(`Sync computed <${this.toString()}> is disabled`,'warn')
      return 
    }

    !first && this.store.log(()=>`Run sync computed for : ${this.toString()}`); 

    // 2. 合成最终的配置参数
    const finalComputedOptions = (options ?  Object.assign({},this.options,options) : this.options ) as Required<ComputedOptions>

    // 3. 根据配置参数获取计算函数的上下文对象      
    const scope =  getValueScope<Value,Scope>(this as any,'computed',this.context,finalComputedOptions)  

    // 4. 执行getter函数
    let computedResult = finalComputedOptions.initial;
    try {
      computedResult = (this.getter).call(this,scope,{changed,first});
      // 将结果回写入store
      if(first){
        this.initial = computedResult
      }else{ 
        this.store.peep(()=>{
          this.value = computedResult  
        })
      }  
      !first && this.emitStoreEvent("computed:done", { id:this.id,path:this.path,value:computedResult,computedObject:this as unknown as ComputedObject})
    } catch (e: any) {
      !first && this.emitStoreEvent("computed:error", { id: this.id, path: this.path, error: e ,computedObject:this as unknown as ComputedObject});
      throw e
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
   */
  private collectDependencies(){
      let dependencies:string[][] = []       
      const watcher = this.store.watch((event)=>{      
          dependencies.push(event.path)            
      },{operates:['get']})   
      // 第一次运行getter函数，如果函数内部有get操作，会触发上面的watcher事件，从而收集依赖
      this.run({first:true})   
      // 依赖收集完成后就结束侦听
      watcher.off() 
      // 同步函数也可以额外指定依赖
      if(Array.isArray(this.options.depends) && this.options.depends.length>0){
        dependencies.push(...calcDependPaths(this.path,this.options.depends))
      } 
      this.depends = noRepeat(dependencies)       
      this.attach()
  }  


  /**
   * 当依赖发生变化时调用
   * @param event
   */
  protected onDependsChange(event: StateOperateParams): void {      
      this.run({changed:event})
  }
}
 
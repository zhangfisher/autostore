/**
 * 同步计算
 */
import {  getVal, setVal  } from "../utils"; 
import { ComputedDescriptorParams, ComputedGetter, ComputedOptions,  ComputedRunContext, RuntimeComputedOptions } from './types';
import { getExtendScope } from '../scope';
import { IStore } from '../store/types';
import { IReactiveReadHookParams } from "../reactives/types";
import { ComputedObject } from "./computedObject";
import { executeStoreHooks } from "./utils";
import { OBJECT_PATH_DELIMITER } from "../consts";
import { Dict } from "../types";
 

/**
 * 
 * 同步计算属性对象
 * 
 */
export class SyncComputedObject extends ComputedObject{
  
  onInitial(){
      
  }
  /**
   * 
   * 当计算属性的依赖发生变化时，重新计算计算属性的值
   * 
   * @param args  可以覆盖默认的配置参数
   * @returns 
   */
  onComputed(options?:RuntimeComputedOptions){
    
    if(!this.store.options.enableComputed || (!this.enable && options?.enable!==true)){
      this.store.options.log(`Sync computed <${this.toString()}> is disabled`,'warn')
      return 
    }

    this.store.log(`Run sync computed for : ${this.toString()}`); 

    computedRunContext.dependValues = values
    const finalComputedOptions = Object.assign({},this.options,options) as Required<ComputedOptions>

    // 1. 根据配置参数获取计算函数的上下文对象      
    const scope = getExtendScope(this.store,'computed',this.context,finalComputedOptions)  


    // 2. 执行getter函数
    let computedResult = computedOptions.initial;
    try {
      computedResult = (getter as ComputedGetter<any>).call(store,scopeDraft);
      store.emit("computed:done",{ path:valuePath,id: computedId,value:computedResult})
      setTimeout(()=>{onDone && onDone.call(store as unknown as IStore<any>,{id:computedId,error:undefined,abort:false,timeout:false,scope:scopeDraft,valuePath,result:computedResult})},0)      
    } catch (e: any) {// 如果执行计算函数出错,则调用        
      store.emit("computed:error", { path:valuePath,id: computedId, error: e })
      setTimeout(()=>{onDone && onDone.call(store as unknown as IStore<any>,{id:computedId,error:e,abort:false,timeout:false,scope:scopeDraft,valuePath,result:computedResult})},0)      
    }
    // 3. 将getter的返回值替换到状态中的,完成移花接木
    if(selfReactiveable){
      // @ts-ignore
      selfReactiveable.setState((draft:any)=>{ 
        setVal(draft, resultPath, computedResult);
      })
    }else{
      setVal(draft, resultPath, computedResult);
    }        
  }
}

function createComputed<T extends Dict>(computedRunContext:ComputedRunContext,computedOptions:ComputedOptions,store:IStore<T>){
  const { valuePath, id:computedId,desc:computedDesc,resultPath,getter } = computedRunContext
  const { selfReactiveable,onDone } = computedOptions

    store.reactiveable.createComputed({
      onComputed:({draft,values,options})=>{
        if(!store.options.enableComputed || (!computedOptions.enable && options?.enable!==true)){
          store.options.log(`Sync computed <${computedDesc}> is disabled`,'warn')
          return 
        }


        store.options.log(`Run sync computed for : ${computedDesc}`); 

        computedRunContext.dependValues = values
        const finalComputedOptions = Object.assign({},computedOptions,options) as Required<ComputedOptions>

        // 1. 根据配置参数获取计算函数的上下文对象      
        const scopeDraft = getExtendScope(store,finalComputedOptions,{draft,dependValues:values,valuePath,computedType:"Computed"} )  

        // 2. 执行getter函数
        let computedResult = computedOptions.initial;
        try {
          computedResult = (getter as ComputedGetter<any>).call(store,scopeDraft);
          store.emit("computed:done",{ path:valuePath,id: computedId,value:computedResult})
          setTimeout(()=>{onDone && onDone.call(store as unknown as IStore<any>,{id:computedId,error:undefined,abort:false,timeout:false,scope:scopeDraft,valuePath,result:computedResult})},0)      
        } catch (e: any) {// 如果执行计算函数出错,则调用        
          store.emit("computed:error", { path:valuePath,id: computedId, error: e })
          setTimeout(()=>{onDone && onDone.call(store as unknown as IStore<any>,{id:computedId,error:e,abort:false,timeout:false,scope:scopeDraft,valuePath,result:computedResult})},0)      
        }
        // 3. 将getter的返回值替换到状态中的,完成移花接木
        if(selfReactiveable){
          // @ts-ignore
          selfReactiveable.setState((draft:any)=>{ 
            setVal(draft, resultPath, computedResult);
          })
        }else{
          setVal(draft, resultPath, computedResult);
        }        
      },
      options: computedOptions,
    }); 

}

/**
 * 为同步计算属性生成mutate
 * @param stateCtx
 * @param computedParams
 */

export  function createComputedMutate<State extends Dict,R=any>(computedParams:IReactiveReadHookParams,store:IStore<State>) :ComputedObject<State> | undefined {
    
  // 1. 获取计算属性的描述
  const {path:valuePath, parent,value } = computedParams;       
  if (parent && !Object.hasOwn(parent, valuePath[valuePath.length - 1])) {
    return;         // 排除掉所有非own属性,例如valueOf等
  }
  // 2. 获取到计算属性描述信息：  包括getter和配置。 此时value是一个函数

  let { getter, options: computedOptions }  = value() as ComputedDescriptorParams<any>    
   
  
    // 2. 运行Hook:  当创建计算属性前时运行hook，本Hook的目的是允许重新指定computedThis或者重新包装原始计算函数
    // 3.运行Hook: 用来在创建computed前运行,允许拦截更改计算函数的依赖,上下文,以及getter等    
    //  运行hook会修改计算配置，所以在hook运行后再读取配置
    executeStoreHooks(valuePath,getter,store,computedOptions)
    const {  selfReactiveable } = computedOptions
    const computedResultPath:string[] =  valuePath 

    // 3. 参数解析:  

    // 计算对象的id和name，name用于打印日志时提供更多信息
    const computedId = getComputedId(valuePath,computedOptions)
    const computedDesc = valuePath.join(OBJECT_PATH_DELIMITER)
  
    store.options.log(()=>`Create sync computed: ${computedDesc} (scope=${computedOptions.scope})`);    
    
    const computedRunContext:ComputedRunContext = {
      id             : computedId,
      desc           : computedDesc,
      resultPath     : computedResultPath,
      isComputedRunning: false,
      dependValues   : [],
      valuePath,      
      deps           : [],
      getter
    }    

    createComputed(computedRunContext,computedOptions,store)     

    // 移花接木原地替换
    if(!selfReactiveable) computedParams.replaceValue(getVal(store.state, valuePath));
    
    // 5. 创建计算对象实例
    const computedObject = new ComputedObject<State,R>(store,selfReactiveable,valuePath,computedOptions) 
    if(computedOptions.objectify) store.computedObjects.set(computedId,computedObject)
    return  computedObject
  }
/**
 * 
 * 异步计算
 * 
 * 
 * 
 * 
 * 
 */
import { skipComputed,  joinValuePath, getError, getDepValues,getVal, setVal, getComputedId  } from "../utils";
import { delay } from 'flex-tools/async/delay'; 
import { OBJECT_PATH_DELIMITER } from '../consts';
import { getValueScope } from '../scope';
import {  AsyncComputedObject,  ComputedOptions, ComputedParams, ComputedProgressbar } from './types';
import type  { ComputedDescriptorDefine, ComputedRunContext } from './types';
import { IReactiveReadHookParams } from '../reactives/types';
import { ComputedObject } from './computedObject';
import { createAsyncComputedObject, executeStoreHooks } from './utils';
import { Dict } from '../types';



export function setAsyncComputedObject<T extends Dict=Dict>(store:IStore<T>,draft:any,resultPath:string[],computedId:string,valueObj:Partial<AsyncComputedObject>){
    const asyncObj = createAsyncComputedObject(store,computedId,valueObj)
    const reusltValue = getVal(draft,resultPath)
    Object.assign(reusltValue,asyncObj,valueObj)
}
  
  /**
   * computed(async (scope,{getProgressbar})=>{
   *    const pbar = getProgressbar({max:100,min:0}) // 初始值
   *    pbar.value(12)      // 修改进度值 
   *    pbar.end()          // 结束进度条
   * })
   * 
   * @param init 
   * @returns 
   */
  function createComputeProgressbar(setState:any,valuePath:string[],opts?:{max?:number,min?:number,value?:number}):ComputedProgressbar{
    const { max=100, min=0, value=0 } = Object.assign({},opts)
    // @ts-ignore
    setState((draft) =>setVal(draft, [...valuePath, "progress"], value))
    return {
      value(num:number){  
        if(num>max) num=max
        if(num<min) num=min
        // @ts-ignore
        setState((draft) =>setVal(draft, [...valuePath, "progress"], num))
      },
      end(){ this.value(max) }
    }
  }
  
  
  function updateAsyncComputedState(setState:any,resultPath:string[],values:Partial<AsyncComputedObject>){
    setState((draft:any) => {      
        Object.entries(values).forEach(([key,value])=>{
          setVal(draft, [...resultPath,key], value);  
        })    
    });
  }
  
  /**
   * 执行异步计算函数的getter方法
   * @param getter 
   * @param scopeDraft 
   * @param options 
   */
async function executeComputedGetter<T extends Dict>(draft:any,computedRunContext:ComputedRunContext,computedOptions:ComputedOptions,store:IStore<T>){
   
    const { id,valuePath,getter,resultPath,dependValues } = computedRunContext;  
    const { timeout=0,retry=[0,0],selfReactiveable,onDone }  = computedOptions  
    const setState  = selfReactiveable ? selfReactiveable.setState.bind(selfReactiveable) : store.setState
    
    const scopeDraft = getValueScope(store,computedOptions,{draft,dependValues,valuePath,computedType:"Computed"} )  
     
    const [retryCount,retryInterval] = Array.isArray(retry) ? retry : [Number(retry),0]
  
    let timeoutCallback:Function 
  
  
    const abortController = new AbortController()
    const computedParams:Required<ComputedParams> ={
      onTimeout     : (cb:Function)=>timeoutCallback=cb,
      getProgressbar: (options)=>createComputeProgressbar(setState,valuePath,options),
      getSnap       : (scope:any)=>getSnap(scope,false),
      abortSignal   : abortController.signal,
      cancel        : abortController.abort,
      extras        : computedOptions.extras
    }   
    let hasAbort=false  // 是否接收到可中止信号
  
    // 配置可中止信号，以便可以取消计算
    updateAsyncComputedState(setState,resultPath,{cancel:markRaw(skipComputed(()=>abortController.abort())) as any}) 
    // 侦听中止信号，以便在中止时能停止 
    abortController.signal.addEventListener('abort',()=>{
      hasAbort=true
    })
    let hasError=false,err:any
    let hasTimeout=false
    let computedResult:any

    for(let i=0;i<retryCount+1;i++){
      hasError=false
      hasTimeout=false
      let timerId:any,countdownId:any
      const afterUpdated={} // 保存执行完成后需要更新的内容，以便在最后一次执行后更新状态  
      try {      
        // 处理超时参数和倒计时
        let [timeoutValue=0,countdown=0] = Array.isArray(timeout) ? timeout : [timeout,0]
        updateAsyncComputedState(setState,resultPath,{loading:true,error:null,retry:i>0 ? retryCount- i : 0,timeout:countdown > 1 ? countdown :timeoutValue,progress:0})
        // 如果有中止信号，则取消计算 
        if(hasAbort){
          throw new Error("Abort")
        } 
        // 超时处理
        if(timeoutValue>0){        
          timerId = setTimeout(()=>{                    
            hasTimeout=true
            if(typeof(timeoutCallback) === 'function') timeoutCallback()
            if(!hasError){  
              clearInterval(countdownId)   
              updateAsyncComputedState(setState,resultPath,{loading:false,error:"TIMEOUT",timeout:0})            
            }                    
          },timeoutValue)        
          // 启用设置倒计时:  比如timeout= 6*1000, countdown= 6
          if(countdown > 1){
            countdownId = setInterval(()=>{              
              updateAsyncComputedState(setState,resultPath,{timeout:countdown--})    
              if(countdown===0) clearInterval(countdownId)                    
            },timeoutValue/(countdown+1))
          }
        }      
        // 执行计算函数
        computedResult = await getter.call(store, scopeDraft,computedParams);
        if(hasAbort) throw new Error("Abort") 
        if(!hasTimeout){
          Object.assign(afterUpdated,{result:computedResult,error:null,timeout:0})
        }            
      }catch (e:any) {
        err=e
        hasError = true
        if(!hasTimeout){        
          Object.assign(afterUpdated,{error:getError(e).message,timeout:0})        
        }
        /// 启用重试
        if(retryCount>0){
          Object.assign(afterUpdated,{retry:retryCount- i })        
        }
      } finally {      
        clearTimeout(timerId)
        clearInterval(countdownId)
        // 重试时不更新loading状态
        if(!hasError || (i==retryCount))  Object.assign(afterUpdated,{loading:false})
        if((!hasError && !hasTimeout)){
          Object.assign(afterUpdated,{error:null})
        }
        updateAsyncComputedState(setState,resultPath,afterUpdated)  
      } 
      // 重试延迟
      if(hasError){
        // 最后一次不延迟
        if(retryCount>0 && retryInterval>0 && i<retryCount){
          await delay(retryInterval)
        }
      }
    }
    // 计算完成后触发事件
    if(hasAbort || hasTimeout){
      store.emit("computed:cancel",{path:valuePath,id,reason:hasTimeout ? 'timeout' : 'abort'})            
      setTimeout(()=>{
        onDone && onDone.call(store as unknown as IStore<any>,{id,error:undefined,abort:hasAbort,timeout:hasTimeout,scope:scopeDraft,valuePath,result:computedResult})
      },0)      
    }else if(hasError){      
      store.emit("computed:error",{path:valuePath,id,error:err})
      setTimeout(()=>{onDone && onDone.call(store as unknown as IStore<any>,{id,error:err,abort:false,timeout:false,scope:scopeDraft,valuePath,result:computedResult})},0)      
    }else{
      store.emit("computed:done",{path:valuePath,id,value:computedResult})
      onDone && onDone.call(store as unknown as IStore<any>,{id,error:undefined,abort:false,timeout:false,scope:scopeDraft,valuePath,result:computedResult})
    }    
}

  

function createComputed<State extends Dict>(computedRunContext:ComputedRunContext,computedOptions:ComputedOptions,store:IStore<State>){
  const { valuePath, id:computedId,deps,desc:computedDesc } = computedRunContext
  const { selfReactiveable,initial,noReentry } = computedOptions

  store.reactiveable.createAsyncComputed({
    // 指定依赖
    depends:(draft)=>{
      return getDepValues(deps,draft, valuePath)
    },
    // 初始化计算函数
    initial:(draft)=>{
      if(selfReactiveable){
        // @ts-ignore
        selfReactiveable.setState((draft)=>{
          setVal(draft, valuePath, createAsyncComputedObject(store, computedId,{result: initial}))
        })
      }else{
        setVal(draft, valuePath, createAsyncComputedObject(store, computedId,{result: initial}))
      }          
    },
    onComputed:async ({draft,values,options})=>{
      if(!store.options.enableComputed || (!computedOptions.enable && options?.enable!==true)){
        store.options.log(`Async computed <${computedDesc}> is disabled`,'warn')
        return 
      }
      
      store.options.log(`Run async computed for : ${computedDesc}`);

      const finalComputedOptions = Object.assign({},computedOptions,options) as Required<ComputedOptions>
      if(noReentry && computedRunContext.isComputedRunning) {
        if( store.options.debug){
          store.options.log(`Reentry async computed: ${computedDesc}`,'warn');
        }        
        store.emit("computed:cancel",{path:valuePath,id:computedId,reason:"reentry"});
        return
      }
      computedRunContext.isComputedRunning=true
      computedRunContext.dependValues = values        // 即所依赖项的值
      try{
        return await executeComputedGetter<State>(draft,computedRunContext,finalComputedOptions,store)
      }finally{
        computedRunContext.isComputedRunning=false
      }
    },
    options:computedOptions
  })  
}


/**
 * 为异步计算属性生成mutate
 * @param stateCtx
 * @param params
 */
export  function createAsyncComputedMutate<State extends Dict,R=any>(computedParams:IReactiveReadHookParams,store:IStore<State>) :ComputedObject<State,AsyncComputedObject<R>> | undefined {
    
    // 1. 参数检查
    const { path:valuePath, parent ,value } = computedParams;
    // // 排除掉所有非own属性,例如valueOf等
    if (parent && !Object.hasOwn(parent, valuePath[valuePath.length - 1])) {
      return;
    }

    // 2. 获取到计算属性描述信息：  包括getter和配置。 此时value是一个函数
    let { getter, options: computedOptions }  = value() as ComputedDescriptorDefine<any>
    computedOptions.async = true; 

    // 3.运行Hook: 用来在创建computed前运行,允许拦截更改计算函数的依赖,上下文,以及getter等    
    //  运行hook会修改计算配置，所以在hook运行后再读取配置
    executeStoreHooks(valuePath,getter,store,computedOptions)

    // 4. 读取解构计算参数：   由于hook可能会修改计算配置，所以在hook运行后再读取配置
    const { depends =[], selfReactiveable } = computedOptions

    // 5. 解析计算目标路径：  即计算函数的返回值到更新到哪里,如果指定了selfPath
    const computedResultPath:string[] =  valuePath
  
    // 6. 解析依赖参数 
    if(depends.length==0){
      store.options.log(`async computed <${valuePath.join(".")}> should specify depends`,'warn')
    }
    // 计算对象的id和name，name用于打印日志时提供更多信息
    const computedId = getComputedId(valuePath,computedOptions)
    computedOptions.id = computedId
    const computedDesc = valuePath.join(OBJECT_PATH_DELIMITER)
  
    store.options.log(()=>`Create async computed: ${computedDesc} (depends=${depends.length==0 ? 'None' : joinValuePath(depends)},scope=${computedOptions.scope})`);
    
    // 7. 创建mutate
    const computedRunContext:ComputedRunContext = {
      id               : computedId,
      desc             : computedDesc,
      resultPath       : computedResultPath,
      isComputedRunning: false,
      dependValues     : [],
      valuePath,      
      deps             : depends,
      getter
    }    
    createComputed<State>(computedRunContext,computedOptions,store)  

    // 移花接木原地替换
    if(!selfReactiveable) computedParams.replaceValue(getVal(store.state, valuePath));

    // 8. 创建计算对象实例
    const computedObject = new ComputedObject<State,AsyncComputedObject<R>>(store,selfReactiveable,valuePath,computedOptions) 
    if(computedOptions.objectify) store.computedObjects.set(computedId,computedObject)
    return  computedObject
}

export function asyncComputedObject<T extends Dict =Dict>(initial:AsyncComputedObject){
  return Object.assign({
    loading : false,
    timeout : 0,
    retry   : 0,          // 重试次数，3表示最多重试3次
    error   : null,
    result  : undefined,
    progress: 0,
    run     : markRaw(skipComputed(() => {})),
    cancel  : markRaw(skipComputed(() => {}))
  },initial) as AsyncComputedObject<T>
}
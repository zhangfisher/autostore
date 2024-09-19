<<<<<<< HEAD
export * from "./store"
export * from "./types"
=======
import React,{ useEffect,useState } from "react"
import { AutoStore, ComputedDescriptorBuilder, Dict, getVal,AsyncComputedResult, isComputedDescriptorBuilder, Computed, ComputedDescriptor, ComputedObject, AsyncComputedGetter, ComputedGetter, SyncComputedOptions, ComputedDepends, ComputedOptions } from 'autostore';
import { PATH_DELIMITER } from "autostore/src/consts";
import { ComputedState } from "autostore/src/descriptor"; 
import { AsyncComponentRender } from "./types";
export class ReactAutoStore<State extends Dict> extends AutoStore<State>{
    /**
     * 
     * 创建一个响应式的组件，当数据发生变化时，组件会自动更新
     * 
     * @example
     * 
     * import { createStore } from "autostore-react" 
     * 
     * const { state, $ } = createStore({
     *      firstName:'zhang',
     *      lastName:'san'
     *      fullName: (user)=>{
     *          return user.firstName + ' ' + user.lastName
     *      }
     * })
     * 
     * @example
     * 
     * 只显示状态值
     * 
     *      $("firstName")
     * 
     * @example
     * 
     * 显示组合计算状态
     * 
     *      $((state)=>state.firstName+state.lastName)
     * 
     * @example
     * 
     *  简单的异步组合计算状态，并提供loading
     *  $(async (state)=>state.firstName+state.lastName,<div>loading...</div>)
     * 
     * @example
     * 
     *  同步计算组件
     * 
     *  当组件内部依赖的a,b变化时，自动重新渲染
     *   $((value)=>{
     *      return <div>{state.a + state.b}</div></div>
     *   },(scope)=>{
     *      return scope.a + scope.b
     *   },computedOptions)
     * 
     * 
     * @example
     * 
     *  异步计算组件
     *   
     *   当依赖变化时，重新执行getter来获取数据，然后重新渲染组件
     *   
     *   $(({loading,timeout,result,retry,.....})=>{
     *      return {loading ? <div>loading...</div> : <div>{result}</div>}
     *   },async (scope,options)=>{
     *     const books = await fetch(scope.url)
     *     return books
     *   },[依赖],{timeout:1000,retry:3})
     * 
     * 
     * </div>
     * 
     * 
     * @param selector  字符串或逊
     * @returns 
     */
    $(selector: string):React.ReactNode
    $(selector: (state:ComputedState<State>)=>React.ReactNode):React.ReactNode
    $(selector: (state:ComputedState<State>)=>Promise<any>,fallback?:React.ReactNode):React.ReactNode
    $<Value=any, Scope=any>(render:AsyncComponentRender,getter: AsyncComputedGetter<Value,Scope>,depends: ComputedDepends,options?: ComputedOptions<Value,Scope>):React.ReactNode
    $<Value=any, Scope=any >(getter: ComputedGetter<Value,Scope>,options?: SyncComputedOptions<Value,Scope>):React.ReactNode;
    $(selector:any):React.ReactNode{ 

        const [computedObj,setComputedObj] = useState<ComputedObject>(null)

        // 获取依赖
        const [deps] = useState<string[]>(()=>{
            if(isComputedDescriptorBuilder(selector)){
                const descriptor = selector() as ComputedDescriptor
                descriptor.options.objectify = false        // 不保存到computedObjects中
                const obj = this.computedObjects.create(descriptor)
                setComputedObj(obj)
                return descriptor.options.initial
            }else if(typeof(selector)==='function'){
                return this.collectDeps(selector)
            }else{
                return [selector]
            }
        })

  
        const getValue = ()=>{
            if(typeof(selector)==='function'){
                return selector(this.state)
            }else{
                return getVal(this.state,selector.split(PATH_DELIMITER))
            } 
        }

        const [ value,setValue ] = useState(()=>getValue())

        useEffect(()=>{
            if(computedObj instanceof ComputedObject){
                
            }else{

            }
            const watcher = this.watch(deps,()=>{
                setValue(getValue())  
            })
            return ()=>watcher.off()
        },[deps])

        return <>{
            {value}
        }</>
    }
    /**
     *     * - 显示计算函数的返回值状态
     *      $(computed(async (scope,args)=>{
     *          await delay()
     *          return firstName
     *      },computedOptions))
     * - 
     *       $(computed(async (scope,args)=>{
     *          await delay()
     *          return firstName
     *      },computedOptions),<div>loading...</div>)
     *       $(computed(async (scope,args)=>{
     *          await delay()
     *          return firstName
     *      },computedOptions),({timout,loading,retry})=>{
     *          return <div></div>
     *      })
     */  
    $$(selector: ComputedDescriptorBuilder,fallback?:React.ReactNode)
    $$(selector: ComputedDescriptorBuilder,render:(params:AsyncComputedResult)=>React.ReactNode){

    }
}
>>>>>>> 59ecaee6dae5ca5be262680d20cd884b310451b8

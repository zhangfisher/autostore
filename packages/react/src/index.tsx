import React,{ useEffect,useState } from "react"
import { AutoStore, ComputedDescriptorBuilder, Dict, getVal,AsyncComputedResult, isComputedDescriptorBuilder, Computed, ComputedDescriptor, ComputedObject } from 'autostore';
import { PATH_DELIMITER } from "autostore/src/consts";
import { ComputedState } from "autostore/src/descriptor"; 
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
     * - 只显示状态值
     *      $("firstName")
     * - 显示组合计算状态
     * 
     *      $((state)=>state.firstName+state.lastName)
     * - 显示异步组合计算状态，并提供loading
     *      $(async (state)=>state.firstName+state.lastName,<div>loading...</div>)
     * - 显示计算函数的返回值状态
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
     * </div>
     * 
     * 
     * @param selector  字符串或逊
     * @returns 
     */
    $(selector: string)
    $(selector: (state:ComputedState<State>)=>Exclude<any,Promise<any>>)
    $(selector: (state:ComputedState<State>)=>Promise<any>,fallback?:React.ReactNode)
    $(selector: ComputedDescriptorBuilder,fallback?:React.ReactNode)
    $(selector: ComputedDescriptorBuilder,render:(params:AsyncComputedResult)=>React.ReactNode)
    $(selector:any){ 

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
}
import React,{ useEffect,useState } from "react"
import { ComputedState,PATH_DELIMITER,AutoStore, Dict, getVal, AsyncComputedGetter, ComputedGetter, SyncComputedOptions, ComputedDepends, ComputedOptions, AutoStoreOptions } from '@autostorejs/core';
import { AsyncComponentRender, SyncComponentRender } from "./types";


export class ReactAutoStore<State extends Dict> extends AutoStore<State>{
    constructor(initial: State,options?:AutoStoreOptions<State>){
        super(initial,options)
        this.$=this.$.bind(this)
        this.useState=this.useState.bind(this)
        this.useDepends = this.useDepends.bind(this)
    }
    /**
     * 
     * 创建一个响应式的组件，当数据发生变化时，组件会自动更新
     * 
     * @example
     * 
     * import { createStore } from "@autostorejs/react" 
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
     * 生成一个只包括指定路径值的片段组件
     * 
     * $("firstName")
     * 
     * @example
     * 
     * 生成一个由多个计算状态组成的片段组件,当依赖变化时自动更新
     * 
     * $((state)=>{
     *    return state.firstName+state.lastName
     * })
     * 
     * scope默认指向ROOT     * 
     * 
     * @example
     * 
     *  同步计算组件， $(render,getter,options)
     *  
     *  getter是一个计算函数，当依赖变化时，重新执行getter来获取数据，然后作为props传递给render进行重新渲染
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
    $(selector: (state:ComputedState<State>)=>any):React.ReactNode
    $<Value=any, Scope=any>(render:AsyncComponentRender,getter: AsyncComputedGetter<Value,Scope>,depends: ComputedDepends,options?: ComputedOptions<Value,Scope>):React.ReactNode
    $<Value=any, Scope=any >(render:SyncComponentRender,getter: ComputedGetter<Value,Scope>,options?: SyncComputedOptions<Value,Scope>):React.ReactNode;
    $():React.ReactNode{ 
        const args = arguments    
        const selector = args.length===1 && (typeof(args[0])==='string' || typeof(args[0])==='function') ? args[0] : undefined
        // const render = args.length>=2 && typeof(args[0])==='function' ? args[0] : undefined
        // const getter = args.length>=2 && typeof(args[1])==='function' ? args[1] : undefined
        // const depends = args.length>=3 && Array.isArray(args[2]) ? args[2] : []
        // const asyncOptions = args.length>=4 && typeof(args[3])==='object' ? args[3] : {}
        // const syncOptions = args.length>=3 && typeof(args[2])==='object' ? args[2] : {}
        
         const El =  React.memo(()=>{
            // const [computedObj,setComputedObj] = useState<ComputedObject>()

            // 收集依赖的路径
            const deps = this.useDepends(selector)
    
            const [ value,setValue ] = useState(()=>this.getValue(selector))
    
            useEffect(()=>{
                // if(computedObj instanceof ComputedObject){
                    
                // }else{
    
                // }
                // 侦听依赖的变化，当依赖变化时，更新值
                const watcher = this.watch(deps,()=>{
                    setValue(this.getValue(selector))  
                })
                return ()=>watcher.off()
            },[deps])
    
            return <>
                {value}
            </>
        }  , () => true)  
        return <El />; 
    }
           
        // 当依赖变化时读取依赖目标的值
    private getValue(selector:undefined | string[] | string | ((state:ComputedState<State>)=>any)){
        if(!selector) return this.state
        if(typeof(selector)==='function'){
            return selector(this.state)
        }else if(Array.isArray(selector)){
            return getVal(this.state,selector)
        }else{
            return getVal(this.state,selector.split(PATH_DELIMITER))
        } 
    }
    /**
     * 
     * 返回收集依赖的路径
     * 
     * @example
     * 
     * useDepends("order.price") == [["order","price"]]
     * useDepends(["order","price"]) == [["order","price"]]
     * useDepends((state)=>state.order.price* state.order.count)) == [["order","price"],["order","count"]]
     * 
     */
    useDepends(selector: string):string[][]
    useDepends(selector: string[]):string[][]
    useDepends(selector: (state:ComputedState<State>)=>any):string[][]
    useDepends(selector:any):string[][]{
        const [deps] = useState(()=>{
            if(typeof(selector)==='function'){
                return this.collectDeps(selector)  
            }else if(typeof(selector)==='string'){
                return [selector.split(PATH_DELIMITER)]  
            }else if(Array.isArray(selector)){
                return [selector]  
            }else{
                return []
            }
        })
        return deps        
    }

    /**
     * 返回当前状态
     * 
     * @example
     * [order,setOrder ] = useState()
     * [price,setPrice ] = useState<number>("order.price")
     * [price,setPrice ] = useState<number>(['order','price'])
     * [price,setPrice ] = useState<number>((state)=>state.order.price)
     * 
     */
    useState<V>(selector?: string):[V,React.Dispatch<React.SetStateAction<V>>]
    useState<V>(selector: string[]):[V,React.Dispatch<React.SetStateAction<V>>]
    useState<V>(selector: (state:ComputedState<State>)=>V):[V,React.Dispatch<React.SetStateAction<V>>]
    useState<V>():[V,React.Dispatch<React.SetStateAction<V>>]{
        const args = arguments    
        const selector = args.length===1 && (typeof(args[0])==='string' || typeof(args[0])==='function') ? args[0] : undefined     
        const [ value,setValue ] = useState(()=>this.getValue(selector))    
        const deps = this.useDepends(selector)
        useEffect(()=>{ 
            // 侦听依赖的变化，当依赖变化时，更新值
            const watcher = this.watch(deps,()=>{
                setValue(this.getValue(selector))  
            })
            return ()=>watcher.off()
        },[deps])

        return [ value,setValue ] 
    }
}



export function createStore<State extends Dict>(initial: State,options?:AutoStoreOptions<State>){
    return new ReactAutoStore<State>(initial,options);
}
 
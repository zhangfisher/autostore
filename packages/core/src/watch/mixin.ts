import type { AutoStore } from "../store/store"
import { StateOperateParams, StateOperates } from "../store/types"
import { Dict } from "../types"
import { Watcher, WatchListener, WatchOptions } from "./types"

export class WatchMixin<State extends Dict>{
    
    /**
     * 监视数据变化，并在变化时执行指定的监听器函数。
     * 
     * @example
     * 
     * - 侦听所有的数据变化
     *  
     * const unwatch = state.watch(({type,path,value,oldValue,parentPath,parent})=>{})
     * 
     * - 侦听指定路径的数据变化
     * 
     * const unwatch = state.watch("job.title",({type,path,value,oldValue,parentPath,parent})=>{})
     * 
     * - 侦听多个路径的数据变化
     * 
     * const unwatch = state.watch(["job.title","job.salary"],({type,path,value,oldValue,parentPath,parent})=>{})
     * 
     * - 侦听通配符路径的数据变化
     * 
     * const unwatch = state.watch("job.*",({type,path,value,oldValue,parentPath,parent})=>{})
     * 
     * 
     * 
     * @param {string|string[]} keyPaths - 要监视的数据路径，可以是单个字符串或字符串数组。
     * @param {WatchListener} listener - 当监视的数据路径变化时执行的回调函数。
     * @param {WatchOptions} [options] - 可选参数，用于配置监视行为。
     * @returns {Watcher} - 返回一个表示监听器的数字标识符，用来取消监听。
     */    
    watch(this: AutoStore<State>,listener:WatchListener,options?:WatchOptions):Watcher
    watch(this: AutoStore<State>,keyPaths:string | (string|string[])[],listener:WatchListener,options?:WatchOptions):Watcher
    watch(this: AutoStore<State>):Watcher{
        const isWatchAll = typeof(arguments[0])==='function'
        const listener = isWatchAll ? arguments[0] : arguments[1]

        const createSubscribe =(operates:StateOperates[],filter:WatchOptions['filter'])=>(event:StateOperateParams)=>{
            if(operates && Array.isArray(operates) && operates.length>0 ){     // 指定操作类型                
                if(!operates.includes(event.type)) return
            }
            if(typeof(filter)==='function' && !filter(event)) return
            listener.call(this,event)                    
        }        
        if(isWatchAll){ // 侦听全部
            const {once,operates,filter} = Object.assign({once:false,operates:[]},arguments[1])  as Required<WatchOptions>
            const subscribeMethod = once ? this.changesets.once : this.changesets.on
            return subscribeMethod.call(this.changesets,"**",createSubscribe(operates,filter),{objectify:true}) as Watcher
        }else{ // 只侦听指定路径
            const delimiter = this.changesets.delimiter as string
            const keyPaths = arguments[0] as string | (string|string[])[]
            const paths:string[] = Array.isArray(keyPaths) ? 
                keyPaths.map(v=>typeof(v)==='string'? v:v.join(delimiter)) : [keyPaths]
            const {once,operates,filter} = Object.assign({once:false,operates:[]},arguments[2])  as Required<WatchOptions>
            const subscribeMethod = once ? this.changesets.once : this.changesets.on           
            const subscribers:string[]=[]
            const unSubscribe = ()=>{
                subscribers.forEach(subscriber=>this.changesets.off(subscriber))
            }
            paths.forEach(path=>{
                subscribers.push(subscribeMethod.call(this.changesets,path,createSubscribe(operates,filter)) as string)
            })
            return {off:unSubscribe}
        }        
    }
}
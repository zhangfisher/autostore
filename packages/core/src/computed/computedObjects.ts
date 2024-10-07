import { InvalidDependsError, InvalidScopeError, TimeoutError } from "../errors"
import { AutoStore } from "../store/store"
import { Dict } from "../types"
import { AsyncComputedObject } from "./async"
import { ComputedObject } from "./computedObject" 
import { SyncComputedObject } from "./sync"
import { AsyncComputedGetter, ComputedDepends, ComputedDescriptor,  ComputedGetter, ComputedOptions, RuntimeComputedOptions, SyncComputedOptions } from "./types"
import { computed } from "./computed"
import { isAbsolutePath } from "../utils/isAbsolutePath"
import { isObserverDescriptor } from "../utils/isObserverDescriptor"
import { PATH_DELIMITER } from "../consts"
import { isPathEq } from "../utils"

 
 
export class ComputedObjects<State extends Dict =  Dict> extends Map<string,ComputedObject<Dict>>{
    constructor(public store:AutoStore<State>){
      super()
    }
    get enable(){ return this.store.options.enableComputed }
    set enable(value:boolean){
      this.store.options.enableComputed = value
    }
     
    /**
     * 动态创建一个新的计算对象
     * 
     * @description
     * 
     * 如同在状态对象中使用computed创建计算属性一样，可以使用computedObjects.create动态创建一个计算对象 
     * 
     * 差别在于
     * - 在状态对象中使用computed创建计算属性时，有计算上下文，因此可以为scope和depends指定相对依赖路径
     * - 在computedObjects.create中，没有计算上下文
     * computedObjects.create(async ()=>{
     * 
     * },[],{
     *  scope: 'CURRENT'  // 无效
     *  scope: 'ROOT'    // 有效
     *  scope: 'parent'  // 无效
     *  scope: './xxx'   // 无效
     *  scope: '/xxx'    // 有效
     *  scope: '../../xxx' // 无效 
     * })
     * 
     * - 动态创建的计算对象的scope只能是根状态对象或者指定绝对路径,不能是相对路径
     *  
     * 
     * 
     */
    create<Value = any, Scope = any>(getter: ComputedGetter<Value,Scope>,options?: SyncComputedOptions<Value,Scope>):SyncComputedObject<Value,Scope>
    create<Value = any, Scope = any>(getter: AsyncComputedGetter<Value,Scope>,depends: ComputedDepends,options?: ComputedOptions<Value,Scope>): AsyncComputedObject<Value,Scope>    
    create<Value = any, Scope = any>(descriptor:ComputedDescriptor<Value,Scope>): AsyncComputedObject<Value,Scope> | SyncComputedObject<Value,Scope>    
    create():any {
      // @ts-ignore
      const descrioptor:ComputedDescriptor = isObserverDescriptor(arguments[0]) ?  arguments[0] : computed(...arguments)()
      if(descrioptor.options.async){
          // 异步依赖是手工指定的，所以需要检查是否是绝对路径，不允许相对路径，因为没有计算上下文
          if(!isAbsolutePath(descrioptor.options.depends)){
            throw new InvalidDependsError("The scope of the dynamic computed object must be the root state object or an absolute path")
          }
      }
      const scope = descrioptor.options.scope
      if(scope===undefined){
        descrioptor.options.scope = 'ROOT'
      }else  if(!isAbsolutePath([scope])){
        throw new InvalidScopeError("The scope of the dynamic computed object must be the root state object or an absolute path")
      }

      return this.store._createComputed(descrioptor)              
    }
    /**
     * 运行指定组的计算函数
     *  
     * 注意：并不会等待所有的计算函数都执行完毕，而是返回一个Promise.all
     * 
     * @param string 
     * @param 
     * @param string 
     * @param param3 
     */
    async runGroup(group:string,runArgs?:RuntimeComputedOptions ,options?: { wait?:boolean,timeout?:number }){       
      return await this.run((computedObject:ComputedObject)=>computedObject.group==group,runArgs,options)
    }
    /**
     * 运行指定id或满足条件的计算函数
     * 
     * 当wait=true时则等待所有的计算函数执行完毕
     * 也可以指定一个timeout时间，超时后会抛出异常TIMEOUT
     * 
     * 
     * @param filter 
     * @param runArgs 传递给计算属性的run函数的参数
     * @param options 
     */
    async run(filter:(computedObject:ComputedObject)=>boolean,runArgs?:RuntimeComputedOptions,options?:{ wait?:boolean,timeout?:number }):Promise<any>
    async run(id:string,runArgs?:RuntimeComputedOptions ,options?: { wait?:boolean,timeout?:number }):Promise<any>
    async run():Promise<any>{
      if(arguments.length==0){
        return Promise.all([...this.values()].map(computedObject=>computedObject.run()))
      }      
      let filter:(computedObject:ComputedObject)=>boolean
      if(typeof(arguments[0])==='function'){
        filter = arguments[0] 
      }else if(typeof(arguments[0])==='string'){ // 运行指定的id
        filter = (computedObject:ComputedObject)=>computedObject.id==arguments[0]
      }            
      
      const computedRunArgs = Object.assign({},arguments[1]) as RuntimeComputedOptions

      const options = Object.assign({wait:false,timeout:0},arguments[2]) as  { wait:boolean,timeout:number }

      // 等待所有的计算函数执行完毕
      const dones:Record<string,boolean>={}      // 记录各个计算函数是否执行完毕
      return new Promise<void>((resolve,reject)=>{
        // 是否等待所有的计算函数执行完毕
        if(options.wait){
          let tmId:any
          computedRunArgs.onDone = ({id})=>{
            dones[id] = true
            if(Object.values(dones).every(v=>v)){
              clearTimeout(tmId)
              return true
            }        
          }
          if(options.timeout>0){
            tmId = setTimeout(()=>{
              reject(new TimeoutError())
            },options.timeout)
          } 
        }      
        Promise.all(
          [...this.values()].filter((obj:ComputedObject)=>{
            if(filter(obj)){
              dones[obj.id] = false
              return true
            }
            return  false
          }).map(computedObject=>{
            return computedObject.run(computedRunArgs)
          }))
        if(!options.wait){
          resolve()
        }
      })
    }


    /**
     * 启用或禁用计算
     * @param value 
     */
    async enableGroup(value:boolean){
      for(let computedObject of this.values()){
        computedObject.options.enable = value
      }
    }
    /**
     * 移除指定的计算对象
     * 
     * 注意：如果该计算对象是state的某个属性创建的，只会删除计算对象，不会删除state属性
     * 
     * @param id 
     * @returns 
     */
    delete(id: string){
      this.get(id)?.detach()
      return super.delete(id)
    }
    /**
     * 返回指定路径的计算对象
     * 
     * @example
     * 
     * 
     * const computedObjects = store.computedObjects.find(['a','b'])
     * 
     * @param path 
     */
    find(path:string | string[] | undefined):ComputedObject | undefined{
      if(!path) return 
      const spath = Array.isArray(path) ?  path : path.split(PATH_DELIMITER)
      for(const obj of this.values()){
        if(isPathEq(obj.path,spath)){
          return obj
        }
      }
    }
  }
   

import { AutoStore } from "../store/store"
import { Dict } from "../types"
import { ComputedObject } from "./computedObject" 

 
 
export class ComputedObjects<State extends Dict =  Dict> extends Map<string,ComputedObject<Dict,State>>{
    constructor(public store:AutoStore<State>){
      super()
    }

    /**
     * 创建一个新的计算对象
     * 
     * 
     * 
     */
    new( ){
      // const obj = new ComputedObject(this.store,context,descriptor)
      
    }
    // /**
    //  * 运行指定组的计算函数
    //  *  
    //  * 注意：并不会等待所有的计算函数都执行完毕，而是返回一个Promise.all
    //  * 
    //  * @param string 
    //  * @param 
    //  * @param string 
    //  * @param param3 
    //  */
    // async runGroup(group:string,runArgs?:RuntimeComputedOptions ,options?: { wait?:boolean,timeout?:number }){       
    //   return await this.run((computedObject:ComputedObject<T>)=>computedObject.group==group,runArgs,options)
    // }
    // /**
    //  * 运行指定id或满足条件的计算函数
    //  * 
    //  * 当wait=true时则等待所有的计算函数执行完毕
    //  * 也可以指定一个timeout时间，超时后会抛出异常TIMEOUT
    //  * 
    //  * 
    //  * @param filter 
    //  * @param runArgs 传递给计算属性的run函数的参数
    //  * @param options 
    //  */
    // async run(filter:(computedObject:ComputedObject<T>)=>boolean,runArgs?:RuntimeComputedOptions,options?:{ wait?:boolean,timeout?:number }):Promise<any>
    // async run(id:string,runArgs?:RuntimeComputedOptions ,options?: { wait?:boolean,timeout?:number }):Promise<any>
    // async run():Promise<any>{
    //   if(arguments.length==0){
    //     return Promise.all([...this.values()].map(computedObject=>computedObject.run()))
    //   }      
    //   let filter:(computedObject:ComputedObject<T>)=>boolean
    //   if(typeof(arguments[0])==='function'){
    //     filter = arguments[0] 
    //   }else if(typeof(arguments[0])==='string'){ // 运行指定的id
    //     filter = (computedObject:ComputedObject<T>)=>computedObject.id==arguments[0]
    //   }            
      
    //   const computedRunArgs = Object.assign({},arguments[1]) as RuntimeComputedOptions

    //   const options = Object.assign({wait:false,timeout:0},arguments[2]) as  { wait:boolean,timeout:number }

    //   // 等待所有的计算函数执行完毕
    //   const dones:Record<string,boolean>={}      // 记录各个计算函数是否执行完毕
    //   return new Promise<void>((resolve,reject)=>{
    //     // 是否等待所有的计算函数执行完毕
    //     if(options.wait){
    //       let tmId:any
    //       computedRunArgs.onDone = ({id})=>{
    //         dones[id] = true
    //         if(Object.values(dones).every(v=>v)){
    //           clearTimeout(tmId)
    //           return true
    //         }        
    //       }
    //       if(options.timeout>0){
    //         tmId = setTimeout(()=>{
    //           reject(new TimeoutError())
    //         },options.timeout)
    //       } 
    //     }      
    //     Promise.all(
    //       [...this.values()].filter((obj:ComputedObject<T>)=>{
    //         if(filter(obj)){
    //           dones[obj.id] = false
    //           return true
    //         }
    //         return  false
    //       }).map(computedObject=>{
    //         return computedObject.run(computedRunArgs)
    //       }))
    //     if(!options.wait){
    //       resolve()
    //     }
    //   })
    // }


    /**
     * 启用或禁用计算
     * @param value 
     */
    // async enableGroup(value:boolean){
    //   for(let computedObject of this.values()){
    //     computedObject.options.enable = value
    //   }
    // }
    // /**
    //  * 移除指定的计算对象
    //  * 
    //  * 注意：如果该计算对象是state的某个属性创建的，只会删除计算对象，不会删除state属性
    //  * 
    //  * @param id 
    //  * @returns 
    //  */
    // delete(id: string){
    //   //this.get(id)?.mutate.cancel()   // 取消订阅
    //   return super.delete(id)
    // }
    // /**
    //  * 创建一个新计算对象
    //  */
    // get create():ReturnType<typeof computedObjectCreator<T>>{
    //   if(!this._createComputed){
    //     this._createComputed = computedObjectCreator<T>(this.store)
    //   }
    //   return this._createComputed
    // }   
  }
   

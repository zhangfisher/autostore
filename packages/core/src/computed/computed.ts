import { COMPUTED_TYPE, SKIP_PROXY_FLAG } from "../consts";
import { Dict } from "../types";
import { isAsyncFunction } from "../utils/isAsyncFunction";
import { normalizeDeps } from "../utils/normalizeDeps";
import { AsyncComputedGetter, ComputedDepends, ComputedDescriptor, ComputedGetter, ComputedOptions } from "./types";

/**
 * 用来封装状态的计算函数，使用计算函数的传入的是当前对象
 *
 *  类型声明：
 *   R: 计算函数的返回值类型,该值会回写入声明的计算属性中，如果是异步计算函数，会回写入AsyncComputedObject.value中
 *   ExtraAttrs: 额外的属性，会合并到AsyncComputedObject中
 *
 * @param getter
 * @param depends
 * @param options
 * @returns
 *
 */
export function computed<R = any,Scope=any>( getter: AsyncComputedGetter<Scope,R>,depends:ComputedDepends,options?: ComputedOptions<Scope,R>): ComputedDescriptor<Scope,R>;
export function computed<R = any,Scope=any>( getter: ComputedGetter<Scope,R>, options?: ComputedOptions<Scope,R>): R
export function computed<R = any,Scope=any>( getter: any,depends?:any, options?: ComputedOptions<Scope,R>):any {
	
  if (typeof getter !== "function")  throw new Error("computed getter must be a function");
  
  // 解析参数：同时支持同步和异步计算函数两种方式声明
  let deps:ComputedDepends = []
  const opts : ComputedOptions<Scope,R> = {
    async           : false,
    enable          : true,
    timeout         : 0,
    depends         : [],    
    immediate       : 'auto',       // 马上执行一次，异步计算函数，如果提供initial值，则不会马上执行   
    objectify       : true          // 保存对象
  }

  if(arguments.length==1){
    deps = []    
  }else if(arguments.length==2){
    if(Array.isArray(arguments[1])){
      deps = arguments[1]
    }else if(typeof(arguments[1]) === 'object'){
      Object.assign(opts,arguments[1])
    }else{
      throw new Error("invalid computed arguments")
    }
  }else if(arguments.length>=3){
    deps = arguments[1]
    Object.assign(opts,arguments[2])
  }


  // 是否是异步计算函数
  const isAsync = opts.async === true 
        || isAsyncFunction(getter)
        || (arguments.length>=2 && Array.isArray(depends)) 


  opts.async = isAsync;  
  opts.depends = normalizeDeps(deps) ; 

  const descriptor:ComputedDescriptor<Scope,R> = {
      getter,
      options: opts,
      [COMPUTED_TYPE]: isAsync ? 'async' : 'sync',
      [SKIP_PROXY_FLAG]:true
   };
  return descriptor  
}
 
import { COMPUTED_DESCRIPTOR_FLAG } from "../consts";
import { WatchDependParams,  WatchDescriptorBuilder, WatchGetter,  WatchOptions } from "./types";
import { normalizedWatchFilter } from "./utils";

 /* 
 *  watch函数用来声明一个监听函数，当监听的值发生变化时，会触发监听函数的执行
 *  
 *  @description
 *  
 *  并将监听的返回值回写入所声明的位置状态中
 * 
 *  如:以下在validate属性中声明了一个监听函数，当侦听到表单中所有validate发生变化时，会触发监听函数的执行
 *  然后将监听函数的返回值回写到validate属性中
 * 
 * {
 *     validate:watch<boolean,stirng>((value:string,oldValue:boolean)=>{
 *          return value.length>0
 *    },{
 *     depends:(path:string[],value:any)=>{
 *          return path[path.length-1]=='validate'
 *      }
 *    })
 * 
 * @param listener  监听函数,只能是同步函数
 * @param options 
 * @returns 
 */
 export function watch<Result=any,Value =any>(getter:WatchGetter<Value,Result>,depends?:WatchDependParams<Value>,options?:WatchOptions<Result>):WatchDescriptorBuilder<Value,Result>{
    const opts : WatchOptions<Result> = Object.assign({
        depends  : normalizedWatchFilter(depends),
        enable   : true,
        objectify: true
    },options)  
    const descriptorBuilder = () => {
        return { 
          type:'watch', 
          getter,
          options: opts,
        }
    }
    descriptorBuilder[COMPUTED_DESCRIPTOR_FLAG]     = true 

    return descriptorBuilder as WatchDescriptorBuilder<Value, Result>;
}

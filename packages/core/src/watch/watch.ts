import { COMPUTED_DESCRIPTOR_BUILDER_FLAG } from "../consts";
import { WatchDepends,  WatchDescriptorBuilder, WatchGetter,  WatchOptions } from "./types";
import { normalizedWatchDepends } from "./utils";

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
 * 
 * @template Value  监听函数的返回值类型
 * @template DependValue 指发生变化的值类型，如watch的依赖的x的值是一个boolean，则当变化时，emitValue的类型就是boolean
 * @param listener  监听函数,只能是同步函数
 * @param options 
 * @returns 
 */
 export function watch<Value=any, DependValue=any>(getter:WatchGetter<Value,DependValue>,depends?:WatchDepends<DependValue>,options?:WatchOptions<Value,DependValue>):WatchDescriptorBuilder<Value>
 export function watch<Value=any, DependValue=any>(getter:WatchGetter<Value,DependValue>,options?:WatchOptions<Value,DependValue>):WatchDescriptorBuilder<Value>
 export function watch<Value =any>(){
    const getter = arguments[0]
    const depends = typeof(arguments[1])==='function' ? arguments[1] : ()=>true
    const options = typeof(arguments[1])==='object' ? arguments[1] : arguments[2]

    const opts : WatchOptions<Value> =   Object.assign({
        depends  : normalizedWatchDepends(depends),
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
    descriptorBuilder[COMPUTED_DESCRIPTOR_BUILDER_FLAG] = true 

    return descriptorBuilder as WatchDescriptorBuilder<Value>;
}

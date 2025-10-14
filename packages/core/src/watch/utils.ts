/** biome-ignore-all lint/suspicious/noPrototypeBuiltins: <noPrototypeBuiltins> */
import { OBSERVER_DESCRIPTOR_BUILDER_FLAG } from "../consts";

// /**
//  *
//  * 在指定on参数时，取值可以是
//  * - 动态侦听  (path:string[],value:any)=>boolean
//  * - 静态侦听  指定要侦听的路径
//  *      string | (string,string[])[]
//  *   如果是string，则使用OBJECT_PATH_DELIMITER分割成数组
//  *   最后形式是string[][]
//  *
//  * 本函数用来将on参数标准化为一个函数(path:string[])=>boolean
//  *
//  *
//  * @param on
//  * @returns
//  */
// export function normalizedWatchDepends(on:WatchDependParams=[]): WatchDependFilter{
//     if(typeof on === 'function'){
//         return on
//     }else if(typeof(on)==='string'){
//         return (path:string[])=>joinValuePath(path)== joinValuePath(on.split(PATH_DELIMITER))
//     }else if(Array.isArray(on)){
//         if(on.length===0) return ()=>true
//         return (path:string[])=>{
//             return on.map(item=>
//                 typeof(item) === 'string' ?
//                     item.split(PATH_DELIMITER)
//                     : (Array.isArray(item) ? item : [String(item)])
//                 ).some(item=>joinValuePath(path)==joinValuePath(item))
//         }
//     }else{
//         return ()=>false
//     }
// }

export function isWatchDescriptorBuilder(value: any) {
	return typeof value === "function" && value[OBSERVER_DESCRIPTOR_BUILDER_FLAG] === true;
}

export function isWatchDescriptor(obj: any) {
	return (
		typeof obj === "object" &&
		obj.hasOwnProperty("type") &&
		obj.type === "watch" &&
		obj.hasOwnProperty("getter") &&
		typeof obj.getter === "function" &&
		obj.hasOwnProperty("options") &&
		typeof obj.options === "object"
	);
}

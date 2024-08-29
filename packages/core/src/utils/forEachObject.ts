/**
 * 深度遍历对象
 * 
 * 对遍历对象的每一个属性值调用fn，如果是对象和数组，则会进行递归遍历
 * 
 * 
 * 
 * @param obj 
 * @param fn  ({value:any,key:string[],parent:object})=>void
 */

import { Dict } from "../types"



export function forEachObject<T extends Dict>(obj:T,callback?:(params:{key:string,value:any,path:string[],parent:T})=>void){     
    function _forEachObject(obj:T,key:string[]){
        for(let k in obj){
            const value = obj[k]
            if(typeof(callback) === 'function'){
                callback({value,key:k,parent:obj,path:key.concat(k)})
            }
            if(typeof(value)==='object'){
                _forEachObject(value,key.concat(k))
            }
        }
    }
    _forEachObject(obj,[])
}



// forEachObject({
//     a:1,
//     b:{
//         c:2
//     },
//     d:[3,4],
//     e:5
// },({value,key,parent,path})=>{
//     console.log("key=",key," value=",value," path=",path," parent=",parent)
// })
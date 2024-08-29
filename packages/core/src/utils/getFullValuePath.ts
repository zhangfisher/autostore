import { OBJECT_PATH_DELIMITER } from "../consts"


/**
 * 
 * 获取数据的绝对路径
 * 
 * @description
 * 
 *  基于curPath，获取relPath的绝对路径
 * 
 * @example
 * 
 * 如valuePath =[ 'a', 'b', 'c', 'd', 'e', 'f' ]
 *  self =  [ 'a', 'b', 'c', 'd', 'e', 'f' ]
 * root =  []
 * parent =  [ 'a', 'b', 'c', 'd' ]
 * current =  [ 'a', 'b', 'c', 'd', 'e' ]  当前对象
 * ['a','b'] =  [ 'a', 'b' ]
 * m =  [ 'a', 'b', 'c', 'd', 'e', 'm' ]
 * x =  [ 'a', 'b', 'c', 'd', 'e', 'x' ]
 * ./x =  [ 'a', 'b', 'c', 'd', 'e', 'x' ]
 * ../x =  [ 'a', 'b', 'c', 'd', 'x' ]
 * ../../x =  [ 'a', 'b', 'c', 'x' ]
 * ../../../x =  [ 'a', 'b', 'x' ]
 * ../../../../x =  [ 'a', 'x' ]
 * ../../../../../x =  [ 'x' ]
 * ../../../../../../x =  [ 'x' ]
 * 
 * 
 * @param curPath  当前路径
 * @param path    路径
 * @param isRelPath   是否使用相对路径,本参数是内部使用的，外部不需要传此参数
 * @returns 
 */
export function getFullValuePath(curPath:string[],path:'self' | 'root' | 'parent' | 'current' | string[] | string,isRelPath?:boolean):string[]{
    if(!Array.isArray(curPath)) throw new Error('curPath must be an array')
    if(path  === 'self'){
        return curPath
    }else if(path === 'root'){
        return []
    }else if(path === 'parent'){
        return curPath.slice(0,-2)
    }else if(path === 'current'){
        return curPath.slice(0,-1)
    }else if(typeof(path) === 'string'){        
       
        if(path.startsWith('./')){               // 字符串支持相对路径语法，如"../" 或 "./" 或 "xxx"
            return [...curPath.slice(0,-1),...path.slice(2).split(OBJECT_PATH_DELIMITER)]
        }else if(path.startsWith('../')){ // 父路径
            return getFullValuePath(curPath.slice(0,-1),path.slice(3),true)
        }else if(path.startsWith("/")){     // 绝对路径             
            path = path.replace(/^(\/)*/,"") 
            return path.split(OBJECT_PATH_DELIMITER)
        }else{
            return isRelPath ?  [...curPath.slice(0,-1),...path.split(OBJECT_PATH_DELIMITER)] : path.split(OBJECT_PATH_DELIMITER)
        }
    }else if(Array.isArray(path)){
        return path
    }
    return curPath    
}
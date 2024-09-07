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
 * curPath =[ 'a', 'b', 'c', 'd', 'e', 'f' ]
 * getFullValuePath(curPath,self) =  [ 'a', 'b', 'c', 'd', 'e', 'f' ]
 * getFullValuePath(curPath,root) =  []
 * getFullValuePath(curPath,parent) =  [ 'a', 'b', 'c', 'd' ]
 * getFullValuePath(curPath,current) =  [ 'a', 'b', 'c', 'd', 'e' ]
 * getFullValuePath(curPath,['a','b']) =  [ 'a', 'b' ]
 * getFullValuePath(curPath,'m') =  [ 'a', 'b', 'c', 'd', 'e', 'm' ]
 * getFullValuePath(curPath,'x') =  [ 'a', 'b', 'c', 'd', 'e', 'x' ]
 * getFullValuePath(curPath,'./x') =  [ 'a', 'b', 'c', 'd', 'e', 'x' ]
 * getFullValuePath(curPath,'../x') =  [ 'a', 'b', 'c', 'd', 'x' ]
 * getFullValuePath(curPath,'../../x') =  [ 'a', 'b', 'c', 'x' ]
 * getFullValuePath(curPath,'../../../x') =  [ 'a', 'b', 'x' ]
 * getFullValuePath(curPath,'../../../../x') =  [ 'a', 'x' ]
 * getFullValuePath(curPath,'../../../../../x') =  [ 'x' ]
 * getFullValuePath(curPath,'../../../../../../x') =  [ 'x' ]
 *  
 * curPath如果为undefined，则无法使用相对路径
 * 
 * @param curPath  当前路径
 * @param path    路径
 * @param isRelPath   是否使用相对路径,本参数是内部使用的，外部不需要传此参数
 * @returns 
 */
export function getFullValuePath(curPath:string[] | undefined,path:'self' | 'root' | 'parent' | 'current' | string[] | string,isRelPath?:boolean):string[] | undefined{
    if(curPath && path  === 'self'){
        return curPath
    }else if(curPath && path === 'root'){
        return []
    }else if(curPath && path === 'parent'){
        return curPath.slice(0,-2)
    }else if(curPath && path === 'current'){
        return curPath.slice(0,-1)
    }else if(typeof(path) === 'string'){               
        if(curPath && path.startsWith('./')){               // 字符串支持相对路径语法，如"../" 或 "./" 或 "xxx"
            return [...curPath.slice(0,-1),...path.slice(2).split(OBJECT_PATH_DELIMITER)]
        }else if(curPath && path.startsWith('../')){ // 父路径
            return getFullValuePath(curPath.slice(0,-1),path.slice(3),true)
        }else if(path.startsWith("/")){     // 绝对路径             
            path = path.replace(/^(\/)*/,"") 
            return path.split(OBJECT_PATH_DELIMITER)
        }else{ //  
            return curPath && isRelPath ?  [...curPath.slice(0,-1),...path.split(OBJECT_PATH_DELIMITER)] : path.split(OBJECT_PATH_DELIMITER)
        }
    }else if(Array.isArray(path)){
        return path
    }
    return curPath    
}
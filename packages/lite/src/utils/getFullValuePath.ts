import { PATH_DELIMITER } from "../consts"


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
 * 当curPath===undefined或者以#开头时，则无法使用相对路径
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * @param curPath  当前路径
 * @param path    路径
 * @param isRelPath   是否使用相对路径,本参数是内部使用的，外部不需要传此参数
 * @returns 
 */
export function getFullValuePath(curPath:string[] | undefined,path:'self' | 'root' | 'parent' | 'current' | string[] | string,isRelPath?:boolean):string[] | undefined{
    // 当curPath===undefined或者以#开头时，则无法使用相对路径
    // 如果以#开头，则说明是动态创建的响应式对象，没有attached到state上,所以没有相对路径
    const supportRel = curPath && !curPath[0].startsWith("#")
    if(Array.isArray(path)){
        return path
    }else if( path  === 'self'){
        return supportRel ? curPath : undefined
    }else if(path === 'root'){
        return supportRel ? [] : undefined
    }else if(path === 'parent'){
        return supportRel ? curPath.slice(0,-2) : undefined
    }else if(path === 'current'){
        return supportRel ? curPath.slice(0,-1) : undefined
    }else if(typeof(path) === 'string'){               
        if(path.startsWith('./')){               // 字符串支持相对路径语法，如"../" 或 "./" 或 "xxx"
            return supportRel ? [...curPath.slice(0,-1),...path.slice(2).split(PATH_DELIMITER)] : undefined
        }else if(path.startsWith('../')){ // 父路径
            return supportRel ? getFullValuePath(curPath.slice(0,-1),path.slice(3),true) : undefined
        }else if(path.startsWith("/")){     // 绝对路径   
            return path.replace(/^(\/)*/,"").split(PATH_DELIMITER)
        }else{ //  普通路径
            return supportRel && isRelPath ?  [...curPath.slice(0,-1),...path.split(PATH_DELIMITER)] : path.split(PATH_DELIMITER)
        }
    }      
}
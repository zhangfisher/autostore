import { ComputedDepends } from "../computed/types"
import { PATH_DELIMITER } from "../consts" 

/**
 * 
 * 规范化依赖参数
 * 用来将依赖参数转换为数组
 * 
 * - 如果是数组，则直接返回
 * - 如果是字符串则使用OBJECT_PATH_DELIMITER分割 * 
 * - 相对路径则直接返回
 * 
 * 
 * @param arg 返回 [[],[],[],"./ddd","../../xxxxx",[]]
 */
export function normalizeDeps(arg: ComputedDepends | undefined): (string | string[])[]  {
    if(!arg) return []
    return arg.map((dep: any) =>{
        if(Array.isArray(dep)){
            return dep
        }else if(typeof(dep) === 'string'){
            if(['/',"./","../"].some(c=>dep.startsWith(c))){
                return dep
            }else{
                return dep.includes(PATH_DELIMITER) ? dep.split(PATH_DELIMITER) : dep.split(".")
            } 
        }else{
            return []
        }
    })
}


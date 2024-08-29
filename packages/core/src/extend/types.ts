import { SKIP_PROXY_FLAG, DYNAMIC_DESCRIPTOR_FLAG } from "../consts"
import { Dict } from "../types"

export enum DynamicValueScopeRef{
    Root    = 'root',
    Current = 'current',
    Parent  = 'parent',  
    Depends = 'depends',                // 指向依赖数组
    Self    = 'self'                    // 指向自身，默认值
} 
 

 

// 指定Store中计算函数的上下文,如果是字符串代表是当前对象的指定键，如果是string[]，则代表是当前Store对象的完整路径
// 当ComputedContext是一个字符串并且以@开头时，有个特殊含义，即是一个路径指向：
// 如：{fields:{ user:"address",address:"user" }}，如果scope=@user，代表的当前scope对象指向的user属性的值所指向的对象，在这里实质传入的是address
export type DynamicValueScope  =  DynamicValueScopeRef | string | string[] | ((state:any)=>string | string[] | DynamicValueScopeRef)


export type DynamicValueType = 'watch' | 'computed'

export type DynamicValueOptions<Value=any>= {
     /**
     * 计算函数的唯一标识，如果未指定，则自动生成一个唯一标识
     */
     id? : string                          
     /**
      * 计算属性的初始化值
      */
     initial? : Value
     /**
      * 计算属性的作用域
      * 
      * @description
      * 
      * 用来指定计算函数的第一个参数，即计算函数的作用域
      * 
      * 默认值：current，指向的是计算属性所在对象
      * 
      */
     scope? : DynamicValueScope
     
     /**
      * 计算开关
      * 当=false时不会执行计算，也就是不会执行计算函数
      * 
      */    
     enable?:boolean        
     /**
      * 
      * 是否是异步计算函数
      * 
      * 默认情况下，通过typeof(fn)=="async function"来判断是否是异步计算函数
      * 但是在返回Promise或者Babel转码等情况下，判断会失效时，需要手动指定async=true
      */
     async?:boolean 
}

export type DynamicValueContext = {
    path      : string[]
    value     : any
    parentPath: string[]
    parent    : any
}

export type DynamicValueDescriptor<Getter extends Function  = Function ,Options extends Dict = Dict> = {    
    type                          : DynamicValueType
    getter                        : Getter
    options                       : Options
    [DYNAMIC_DESCRIPTOR_FLAG]     : true
    [SKIP_PROXY_FLAG]             : true        
}
    

import { SKIP_PROXY_FLAG, DYNAMIC_DESCRIPTOR_FLAG } from "../consts"
import { Dict } from "../types"
import { DynamicValueObject } from "./valueObject"

export enum DynamicValueScopeRef{
    Root    = 'ROOT',
    Current = 'CURRENT',
    Parent  = 'PARENT',  
    Depends = 'DEPENDS',                // 指向依赖数组
    Self    = 'SELF'                    // 指向自身，默认值
} 
 

 

// 指定Store中计算函数的上下文,如果是字符串代表是当前对象的指定键，如果是string[]，则代表是当前Store对象的完整路径
// 当ComputedContext是一个字符串并且以@开头时，有个特殊含义，即是一个路径指向：
// 如：{fields:{ user:"address",address:"user" }}，如果scope=@user，代表的当前scope对象指向的user属性的值所指向的对象，在这里实质传入的是address
export type DynamicValueScope  =  DynamicValueScopeRef | string | string[] | 
    ((valueObject:DynamicValueObject)=>string | string[] | DynamicValueScopeRef)


export type DynamicValueType = 'watch' | 'computed'

/**
 * 计算属性的依赖路径
 * 
 * 规则如下：
 * 
 * - 以/开头，代表绝对路径,/字符是可选的，如果省略/字符，也表示绝对路径
 * - 以./开头，代表相对路径,相对的是当前路径
 * - 以../开头，代表相对路径,相对的是父路径
 * - ROOT: 代表根路径
 * - CURRENT: 代表当前路径
 * - PARENT: 代表父路径
 * - SELF: 代表自身
 * - 不以/,./,../开头的任意字符串，代表绝对路径
 * - 路径使用.作为分割符
 * 
 * 特别注意:
 * 
 * 当相对路径时，指的相对的是当前路径所在的对象的路径，而不是当前路径
 * 
 * 比如
 * 
 * curPath=['a','b','c','d']
 * 
 * 则 ./ 代表的是 a.b.c，而不是 a.b.c.d,也就是说，相对路径是不包含自身的
 * 因此./x 代表的是 a.b.c.x，而不是 a.b.c.d.x
 * 
 * 
 * 
 * 
 * 
 */
export type DynamicValueDepends = (string | string[] | 'SELF'  | 'CURRENT' | 'ROOT' | 'PARENT' )[]  

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
      * 用来指定计算函数的第一个参数，即计算函数的作用范围
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

    /**
     * 指定该计算属性的依赖路径
     * 
     * @description
     * 
     * 支持绝对路径和相对路径
     * 
     * - 绝对路径：
     * 
     *   以/开头，代表绝对路径,
     *    /字符是可选的，如果省略/字符，则默认为绝对路径
     *   
     *   如：/a.b.c 表示根对象的a.b.c属性
     *   如：/a 表示根对象的a属性     * 
     *   如  a.b.c 等效于 /a.b.c
     * 
     * - 相对路径：
     *   以./或者../开头，代表相对路径
     *  ./指的相对当前对象，../指的是父对象
     * ../a.b.c表示父对象的a.b.c属性
     * ../../a 表示父对象的父对象的a属性     
     * 
     * 
     * 
     * 注意：在异步计算属性时需要手工指定依赖，因为无法自动分析依赖
     * 同步计算时不需要指定依赖，因为可以自动分析依赖
     
     * 
    */
    depends?: DynamicValueDepends
    /**
     * 为该计算函数指定一个分组名
     * 
     * @description
     * 
     * 此属性用来将计算函数分组，比如一个store中具有相同group的计算函数
     * 然后就可以启用/关闭/运行指定分组的计算函数
     * 在表单中通过为所有validate指定统一的分组名称，这样就可以统一控制表单的验证是否计算
     * 
     * store.computedObjects.get(["a","b"]).run() // 重新启动
     * 马上重新运行指定组的计算函数
     * store.computedObjects.getGroup("a"]).run() // 运行组     
     * store.computedObjects.enableGroup("b"]) 
     * 
     */
    group?:string

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
    
export type DynamicValueGetter<Value=any,Scope =any,Args extends Dict = Dict> = (scope:Scope,options:Args)=>Value
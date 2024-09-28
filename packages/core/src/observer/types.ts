import { OBSERVER_DESCRIPTOR_BUILDER_FLAG } from "../consts"  

export type  ObserverType = 'watch' | 'computed'

export enum  ObserverScopeRef{
    Root    = 'ROOT',
    Current = 'CURRENT',
    Parent  = 'PARENT',  
    Depends = 'DEPENDS',                // 指向依赖数组
    Self    = 'SELF'                    // 指向自身，默认值
} 


// 动态依赖匹配
export type ObserverDependMatcher<Value=any> = (path:string[],value:Value)=>boolean

// export type ObserverDepends<Value=any> = (string | string[] | 'CURRENT' | 'ROOT' | 'PARENT' )[] 
//                             | ObserverDependMatcher<Value>

export type ObserverDepends = (string | string[])[]

export type ObserverScope = string | string[] | 'SELF'  | 'CURRENT' | 'ROOT' | 'PARENT'


export type ObserverDescriptorGetter<Value,Scope> = ((scope:Scope,args:any)=>Value) | ((scope:Scope,args:any)=>Promise<Value>)

export interface ObserverDescriptor<
    T extends string = string,
    Value = any,
    Scope =any,
    Getter = ObserverDescriptorGetter<Value,Scope>,
    Options extends ObserverOptions<Value> = ObserverOptions<Value>
    >{
        type: T
        getter: Getter
        options: Options
    }

export interface ObserverDescriptorBuilder<
    Type extends string= string,
    Value=any,
    Scope=any,
    descriptor extends ObserverDescriptor<Type,Value,Scope> = ObserverDescriptor<Type,Value,Scope>> {
    ():descriptor
    [OBSERVER_DESCRIPTOR_BUILDER_FLAG] : true 
} 


export type ObserverOptions<Value=any> = {
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
    scope? : ObserverScope
    
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
   depends?: ObserverDepends
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
   /**
    * 
    * 是否保存创建的computedObject对象
    * 
    * @description
    * 默认情况下，每一个计算属性均会创建一个computedObject对象实便并且保存到store.computedObjects中
    * 
    * 默认=true,=false则不会保存
    * 
    */
   objectify?:boolean   
}
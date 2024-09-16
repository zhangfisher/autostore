import { COMPUTED_DESCRIPTOR_FLAG } from "./consts"  


export type IDescriptorDepends<V=any> = (string | string[] | 'SELF'  | 'CURRENT' | 'ROOT' | 'PARENT' )[] 
                                | ((path:string[],value:V)=>boolean)

export type IDescriptorOptions<Value=any,DependValue=any> = {
    id?       : string
    group?    : string
    enable?   : boolean
    initial?  : Value
    objectify?: boolean                       // 创建的对象是否保存到watchObjects中
    depends?  : (string | string[] | 'SELF'  | 'CURRENT' | 'ROOT' | 'PARENT' )[] | IDescriptorDepends<DependValue>
    scope?    : string
    async?    : boolean 
}

export type IDescriptorGetter<Value,Scope> = (scope:Scope,args:any)=>Value

export interface IDescriptor<
    T extends string = string,
    Value = any,
    Scope =any,
    Getter = IDescriptorGetter<Value,Scope>,
    Options extends IDescriptorOptions = IDescriptorOptions
    >{
        type: T
        getter: Getter
        options: Options
    }

export interface IDescriptorBuilder<descriptor extends IDescriptor> {
    ():descriptor
    [COMPUTED_DESCRIPTOR_FLAG]     : true 
} 



export function isDescriptorBuilder(value:any){
    return typeof(value) === 'function' && value[COMPUTED_DESCRIPTOR_FLAG]===true
}
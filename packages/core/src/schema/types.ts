import { VALUE_SCHEMA } from "../consts"

export type SchemaObjectValidate<Value=any> = (newValue:Value,oldValue:Value,path:string)=>boolean

export interface SchemaObject<Value=any> {
    [VALUE_SCHEMA]    : true
    value?            : Value
    validate?         : SchemaObjectValidate<Value>
    behavior?         : 'pass' | 'ignore' | 'throw'   // 当验证失败时的行为， pass=继续写入; ignore: 静默忽略; throw: 触发ValidateError错误; 验证失败信息会更新到validators.errors中
    required?         : boolean
    enable?           : boolean 
    path?             : string
    // 提供一些元数据
    title?            : string
    help?             : string
    placeholder?      : string
    select?           : string[] | number[] | boolean[] | ({
        label?        : string
        value         : Value
        default?      : boolean
        icon?         : string
    })[]
    widget?           : string          
    errorTips?        : string | ((this:SchemaObject<Value>,path:string,newValue:Value,oldValue:Value)=>string )
    tags?             : string[]        
    group?            : string
    advanced?        : boolean 
}


export type SchemaObjectArgs<Value=any> = Pick<SchemaObject<Value>,
    'value'
    | 'required' 
    | 'validate' 
    | 'behavior' 
    | 'enable' 
    | 'errorTips' 
    | 'placeholder' 
    | 'tags' 
    | 'help' 
    | 'title' 
    | 'widget' 
    | 'select'
    | 'group'
    | 'advanced'
> & Record<string,any>

export interface SchemaBuilder<Value=any>{
    <T=Value>(value:T, options?:SchemaObjectArgs ): SchemaObject<T>
    <T=Value>(value:T, validate:SchemaObjectValidate<T>, options?:SchemaObjectArgs):SchemaObject<T>
    <T=Value>(value:T, validate:SchemaObjectValidate<T>, errorTips?:SchemaObjectArgs['errorTips']):SchemaObject<T>
}

 

// 以上用来提取出SchemaObject的类型
type MergeIntersection<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type UnionToIntersection<U> = 
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type GetSchemaObjectsHelper<T, Prefix extends string> = 
    T extends SchemaObject<infer V> 
        ? Prefix extends '' ? never : { [key in Prefix]: V }
        : T extends Record<string, any> 
            ? { [K in keyof T]: 
                GetSchemaObjectsHelper<T[K], Prefix extends '' 
                    ? K & string 
                    : `${Prefix}.${K & string}`
              > }[keyof T]
            : never;

export type SchemaState<T extends Record<string, any>> = 
    MergeIntersection<UnionToIntersection<GetSchemaObjectsHelper<T, ''>>>

import { VALUE_SCHEMA } from "../consts"
import { ComputedState, Dict, GetTypeByPath, ObjectKeyPaths } from '../types';

export type SchemaObjectValidate<Value=any> = (newValue:Value, oldValue:Value, path:string)=>boolean

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
    errorTips?        : string | ((this:SchemaObject<Value>, path:string, newValue:Value, oldValue:Value)=>string)
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
    <T=Value>(value:T, options?:SchemaObjectArgs<T>): SchemaObject<T>
    <T=Value>(value:T, validate:SchemaObjectValidate<T>, options?:SchemaObjectArgs<T>):SchemaObject<T>
    <T=Value>(value:T, validate:SchemaObjectValidate<T>, errorTips?:SchemaObjectArgs<T>['errorTips']):SchemaObject<T>
}

export type ConfigurableState<State extends Dict> = {
    [Key in ObjectKeyPaths<ComputedState<State>>]: 
        GetTypeByPath<State, Key> extends SchemaObject<infer Value> 
            ? Value
            : never
} extends infer Temp 
    ? { [K in keyof Temp as Temp[K] extends never ? never : K]: Temp[K] } 
    : never

export type SchemaState<State extends Dict> = ConfigurableState<State>
 

 
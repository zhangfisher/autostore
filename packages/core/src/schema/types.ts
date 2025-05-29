import { ComputedBuilder } from "../computed/types";
import { VALUE_SCHEMA } from "../consts"
import { ComputedState, Dict, GetTypeByPath, ObjectKeyPaths } from '../types';

export type SchemaObjectValidate<Value = any> = (newValue: Value, oldValue: Value, path: string) => boolean


export interface SchemaObjectWidgetTypes {

}

export interface ComputedSchemaObject<Value = any, State = Dict> {
    [VALUE_SCHEMA]?: true
    value?: Value
    validate?: SchemaObjectValidate<Value>
    behavior?: 'pass' | 'ignore' | 'throw'   // 当验证失败时的行为， pass=继续写入; ignore: 静默忽略; throw: 触发ValidateError错误; 验证失败信息会更新到validators.errors中
    required?: boolean | ComputedBuilder<boolean, State>
    datatype?: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'any' | string
    enable?: boolean
    path?: string[]
    icon?: string
    // 提供一些元数据
    title?: string
    help?: string
    placeholder?: string
    select?: string[] | number[] | boolean[] | ({
        label?: string
        value: Value
        default?: boolean
        icon?: string
    })[]
    widget?: keyof SchemaObjectWidgetTypes | string
    errorTips?: string | ((this: SchemaObject<Value>, path: string, newValue: Value, oldValue: Value) => string)
    tags?: string[]
    group?: string
    advanced?: boolean
    order?: number
}

export interface SchemaObject<Value = any, State = Dict> {
    [VALUE_SCHEMA]?: true
    value?: Value
    validate?: SchemaObjectValidate<Value>
    behavior?: 'pass' | 'ignore' | 'throw'   // 当验证失败时的行为， pass=继续写入; ignore: 静默忽略; throw: 触发ValidateError错误; 验证失败信息会更新到validators.errors中
    required?: boolean | ComputedBuilder<boolean, State>
    datatype?: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'any' | string
    enable?: boolean | ComputedBuilder<boolean, State>
    path?: string[]
    icon?: string | ComputedBuilder<string, State>
    // 提供一些元数据
    title?: string | ComputedBuilder<string, State>
    help?: string | ComputedBuilder<string, State>
    placeholder?: string | ComputedBuilder<string, State>
    select?: string[] | number[] | boolean[] | ({
        label?: string
        value: Value
        default?: boolean
        icon?: string
    })[] | ComputedBuilder<any[], State>
    widget?: keyof SchemaObjectWidgetTypes | string | ComputedBuilder<string, State>
    errorTips?: string | ComputedBuilder<string, State>
    | ((this: SchemaObject<Value>, path: string, newValue: Value, oldValue: Value) => string)
    tags?: string[] | ComputedBuilder<string[], State>
    group?: string | ComputedBuilder<string, State>
    advanced?: boolean | ComputedBuilder<boolean, State>
    order?: number | ComputedBuilder<number, State>
}


// T extends unknown[] ? ComputedState<T[number]>[]
//     :
//     (
//         T extends SchemaObject<infer V> ? V
//         : (
//             T extends RawObject<T> ? T
//             : (
//                 T extends (...args: any) => any ? PickComputedResult<T>
//                 : (
//                     T extends Dict ? {
//                         [K in keyof T]: T[K] extends (...args: any[]) => any ? PickComputedResult<T[K]>
//                         : (
//                             T[K] extends Record<string, any> ? ComputedState<T[K]>
//                             : (
//                                 T[K] extends unknown[] ? ComputedState<T[K][number]>[] : T[K]
//                             )
//                         )
//                     }
//                     : T
//                 )
//             )
//         )
//     )


export type SchemaObjectArgs<Value = any> = Pick<SchemaObject<Value>,
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
> & Record<string, any>

export interface SchemaBuilder<Value = any> {
    <T = Value>(value: T, options?: SchemaObjectArgs<T>): SchemaObject<T>
    <T = Value>(value: T, validate: SchemaObjectValidate<T>, options?: SchemaObjectArgs<T>): SchemaObject<T>
    <T = Value>(value: T, validate: SchemaObjectValidate<T>, errorTips?: SchemaObjectArgs<T>['errorTips']): SchemaObject<T>
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



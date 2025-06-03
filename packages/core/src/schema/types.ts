import { ComputedBuilder, ComputedGetter } from "../computed/types";
import { VALUE_SCHEMA } from "../consts"
import { ComputedState, Dict, GetTypeByPath, ObjectKeyPaths, StatePath } from '../types';

export type SchemaObjectValidate<Value = any> = (newValue: Value, oldValue: Value, path: string) => boolean

export interface SchemaObjectWidgetTypes {

}

type ToExpandType<T> =
    T extends string ? (string extends T ? T : string) :
    T extends number ? (number extends T ? T : number) :
    T extends boolean ? (boolean extends T ? T : boolean) :
    T;


export interface SchemaObject<Value = any, State = Dict> extends Record<string, any> {
    [VALUE_SCHEMA]: true
    path: string[]
    value: ToExpandType<Value>
    name?: string
    validate?: SchemaObjectValidate<Value>
    behavior?: 'pass' | 'ignore' | 'throw'   // 当验证失败时的行为， pass=继续写入; ignore: 静默忽略; throw: 触发ValidateError错误; 验证失败信息会更新到validators.errors中
    required?: boolean | ComputedBuilder<boolean, State>
    datatype?: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'any' | string
    enable?: boolean | ComputedBuilder<boolean, State>
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
    advanced?: boolean | ComputedGetter<boolean, State>
    order?: number | ComputedGetter<number, State>
}


export type ISchemaObject<Value = any, Extras extends Dict = Dict> = {
    [VALUE_SCHEMA]: true
    path: string[]
    value: ToExpandType<Value>
} & Extras


export type RemoveSchemaFlags<T extends Dict> = {
    [K in keyof T as K extends typeof VALUE_SCHEMA ? never : K]: T[K]
}


export type SchemaStatePath<State> = Exclude<keyof {
    [K in StatePath<State> as GetTypeByPath<State, K> extends {
        [VALUE_SCHEMA]: true
    } ? K : GetTypeByPath<State, K> extends Array<infer Item>
    ? Item extends { [VALUE_SCHEMA]: true }
    ? `${K}.${number}` | K  // 返回数组路径和索引路径
    : never
    : never]: any
}, number | symbol>

// export type SchemaStatePath<State> = Exclude<keyof {
//     [K in StatePath<State> as GetTypeByPath<State, K> extends ISchemaObject ? K : never]: any
// }, number | symbol>


// 根据路径获取SchemaObject
export type GetSchemaObjectByPath<State extends Dict, P extends string = string> = Required<
    ComputedState<RemoveSchemaFlags<GetTypeByPath<State, P>>> & {
        [VALUE_SCHEMA]: true
        value: GetTypeByPath<State, P>['value']
        path: string[]
    }
>

export type NewSchemaObject<State extends Dict> =
    ComputedState<RemoveSchemaFlags<State>> & {
        [VALUE_SCHEMA]: true
        path: string[]
    }

export type SchemaObjectArgs<Value = any, State = Dict> = Omit<SchemaObject<Value, State>,
    'path' | '__AS_VALUE_SCHEMA__' | 'value'
> & Record<string, any>

export interface SchemaBuilder<Value = any> {
    <T = Value, Define extends SchemaObjectArgs<T> = SchemaObjectArgs<T>>(value: T, options?: Define): ISchemaObject<T, Define>
    <T = Value, Define extends SchemaObjectArgs<T> = SchemaObjectArgs<T>>(value: T, validate: SchemaObjectValidate<T>, options?: Define): ISchemaObject<T, Define>
    <T = Value, Define extends SchemaObjectArgs<T> = SchemaObjectArgs<T>>(value: T, validate: SchemaObjectValidate<T>, errorTips?: SchemaObject<T>['errorTips']): ISchemaObject<T, Define>
}

export type ConfigurableState<State extends Dict> = {
    [Key in SchemaStatePath<State> as GetTypeByPath<State, Key> extends ISchemaObject ? Key : never]: GetTypeByPath<ComputedState<State>, Key>
}

export type SchemaState<State extends Dict> = ConfigurableState<State>




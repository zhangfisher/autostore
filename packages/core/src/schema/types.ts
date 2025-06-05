import { ComputedBuilder, ComputedGetter } from "../computed/types";
import { VALUE_SCHEMA } from "../consts"
import { ComputedState, Dict, GetTypeByPath, ObjectKeyPaths, StatePath, ToRawType } from '../types';

export type SchemaValidator<Value = any> = (newValue: Value, oldValue: Value, path: string) => boolean

export interface SchemaObjectWidgetTypes {

}




export type ISchemaObject<Value = any, Extras extends Dict = Dict> = {
    [VALUE_SCHEMA]: true
    path: string[]
    value: ToRawType<Value>
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



// 根据路径获取Schema
export type GetSchemaOptionsByPath<State extends Dict, P extends string = string> = Required<
    ComputedState<GetTypeByPath<State, P>['options']>
>


export type SchemaOptions<Value = any, State = Dict> = {
    name?: string
    // 当验证失败时的行为， pass=继续写入; ignore: 静默忽略; throw: 触发ValidateError错误; 验证失败信息会更新到validators.errors中
    behavior?: 'pass' | 'ignore' | 'throw'
    widget?: keyof SchemaObjectWidgetTypes | string | ComputedBuilder<string, State>
    required?: boolean | ComputedBuilder<boolean, State>
    visible?: boolean | ComputedBuilder<boolean, State>
    enable?: boolean | ComputedBuilder<boolean, State>
    icon?: string | ComputedBuilder<string, State>
    // 提供一些元数据
    title?: string | ComputedBuilder<string, State>
    help?: string | ComputedBuilder<string, State>
    placeholder?: string | ComputedBuilder<string, State>
    errorTips?: string | ComputedBuilder<string, State>
    tags?: string[] | ComputedBuilder<string[], State>
    group?: string | ComputedBuilder<string, State>
    advanced?: boolean | ComputedGetter<boolean, State>
    order?: number | ComputedGetter<number, State>
    select?: string[] | number[] | boolean[] | ({
        label?: string
        value?: ToRawType<Value>
        default?: boolean
        enable?: boolean
        selected?: boolean
        icon?: string
    })[] | ComputedBuilder<any[], State>
} & Record<string, any>

export type ISchemaDescriptor<Value = any> = {
    [VALUE_SCHEMA]: true
    value: ToRawType<Value>
}
export type SchemaDescriptor<Value = any, State = Dict> = {
    datatype: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'any' | string
    validate?: SchemaValidator<ToRawType<Value>>
    options: SchemaOptions<ToRawType<Value>, State>
} & ISchemaDescriptor<Value>

export type SchemaDescriptorBuilder<Value = any, State = Dict> = () => SchemaDescriptor<Value, State>


export interface SchemaBuilder<Value = any> {
    <T = Value, Options extends SchemaOptions<T> = SchemaOptions<T>>(value: T, options?: Options): SchemaDescriptor<T, Options>
    <T = Value, Options extends SchemaOptions<T> = SchemaOptions<T>>(value: T, validate: SchemaValidator<T>, options?: Options): SchemaDescriptor<T, Options>
    <T = Value, Options extends SchemaOptions<T> = SchemaOptions<T>>(value: T, validate: SchemaValidator<T>, errorTips?: SchemaOptions<T, Options>['errorTips']): SchemaDescriptor<T, Options>
}

export type ConfigurableState<State extends Dict> = {
    [Key in SchemaStatePath<State> as GetTypeByPath<State, Key> extends ISchemaObject ? Key : never]: GetTypeByPath<ComputedState<State>, Key>
}

export type SchemaState<State extends Dict> = ConfigurableState<State>




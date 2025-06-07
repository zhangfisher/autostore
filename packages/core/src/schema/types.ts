import { ComputedBuilder, ComputedGetter } from "../computed/types";
import { VALUE_SCHEMA } from "../consts"
import { ComputedState, Dict, GetTypeByPath, StatePath, ToRawType } from '../types';

export type SchemaValidate<Value = any> = (newValue: Value, oldValue: Value, path: string) => boolean
export type SchemaValidator<Value = any> = {
    // 校验函数
    validate: SchemaValidate<Value>
    // 当验证失败时的行为
    // pass: 继续写入; ignore: 静默忽略; throw: 触发ValidateError错误; 验证失败信息会更新到validators.errors中
    onFail: 'pass' | 'throw' | 'ignore'
    // 校验失败时的错误信息
    message?: string | ((e: Error, path: string, newValue: Value, oldValue: Value) => string)
}

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

export type SchemaKeyPaths<State> = Exclude<keyof {
    [K in StatePath<State> as GetTypeByPath<State, K> extends {
        [VALUE_SCHEMA]: true
    } ? K : GetTypeByPath<State, K> extends Array<infer Item>
    ? Item extends { [VALUE_SCHEMA]: true }
    ? `${K}.${number}`
    : never
    : never]: any
}, number | symbol>


// 根据路径获取Schema
export type GetSchemaOptionsByPath<State extends Dict, P extends string = string> = Required<
    ComputedState<GetTypeByPath<State, P>['options']>
>


export type SchemaOptions<Value = any, State = Dict> = {
    name?: string
    widget?: keyof SchemaObjectWidgetTypes | string | ComputedBuilder<string, State>
    required?: boolean | ComputedBuilder<boolean, State>
    visible?: boolean | ComputedBuilder<boolean, State>
    enable?: boolean | ComputedBuilder<boolean, State>
    icon?: string | ComputedBuilder<string, State>
    // 提供一些元数据
    title?: string | ComputedBuilder<string, State>
    help?: string | ComputedBuilder<string, State>
    placeholder?: string | ComputedBuilder<string, State>
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
export type SchemaDescriptor<Value = any, Options = Dict> = {
    datatype: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'any' | string
    value: ToRawType<Value>
    validator?: SchemaValidator<ToRawType<Value>>
    options: SchemaOptions<ToRawType<Value>, Options>
} & ISchemaDescriptor<Value>

export type SchemaDescriptorBuilder<Value = any, State = Dict> = () => SchemaDescriptor<Value, State>


export interface SchemaBuilder<Value = any> {
    <T = Value, Options extends SchemaOptions<T> = SchemaOptions<T>>(value: T, options?: Options): SchemaDescriptor<T, Options>
    <T = Value, Options extends SchemaOptions<T> = SchemaOptions<T>>(value: T, validate: SchemaValidate<T>, options?: Options): SchemaDescriptor<T, Options>
    <T = Value, Options extends SchemaOptions<T> = SchemaOptions<T>>(value: T, validate: SchemaValidate<T>, invalidMessage?: SchemaValidator<T>['message'], options?: Options): SchemaDescriptor<T, Options>
    <T = Value, Options extends SchemaOptions<T> = SchemaOptions<T>>(value: T, validator: SchemaValidator<T>, options?: Options): SchemaDescriptor<T, Options>
}

export type ConfigurableState<State extends Dict> = {
    [Key in SchemaKeyPaths<State>]: GetTypeByPath<ComputedState<State>, Key>
}

export type SchemaState<State extends Dict> = ConfigurableState<State>


export type ComputedSchemaState<State extends Dict> = {
    [Key in SchemaKeyPaths<State>]: (
        GetTypeByPath<State, Key> extends SchemaDescriptor<infer V, infer Options>
        ? Options & { value: V } : GetTypeByPath<State, Key>
    ) & {
        path: string[]
    }
}

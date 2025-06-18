import { ComputedBuilder, ComputedGetter } from "../computed/types";
import { VALUE_SCHEMA_BUILDER_FLAG } from "../consts"
import { AutoStore } from "../store";
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


export type ISchemaObject<Value = any, Extras extends Dict = Dict> = {
    [VALUE_SCHEMA_BUILDER_FLAG]: true
    path: string[]
    value: ToRawType<Value>
} & Extras

export type RemoveSchemaFlags<T extends Dict> = {
    [K in keyof T as K extends typeof VALUE_SCHEMA_BUILDER_FLAG ? never : K]: T[K]
}



export type SchemaKeyPaths<State> = Exclude<keyof {
    [K in StatePath<State> as GetTypeByPath<State, K> extends {
        [VALUE_SCHEMA_BUILDER_FLAG]: true
    } ? K : GetTypeByPath<State, K> extends Array<infer Item>
    ? Item extends { [VALUE_SCHEMA_BUILDER_FLAG]: true }
    ? `${K}.${number}`
    : never
    : never]: any
}, number | symbol>


// 根据路径获取Schema
export type GetSchemaOptionsByPath<State extends Dict, P extends string = string> = Required<
    ComputedState<GetTypeByPath<State, P>['options']>
>
export type SchemaInputWidgetAttrs<State = Dict> = {
    filled?: boolean | ComputedBuilder<boolean, State>
    pill?: boolean | ComputedBuilder<boolean, State>
    clearable?: boolean | ComputedBuilder<boolean, State>
    readonly?: boolean | ComputedBuilder<boolean, State>
    autocomplete?: string | ComputedBuilder<string, State>
    pattern?: string | ComputedBuilder<string, State>
    autocorrect?: 'on' | 'off'
    noSpinButtons?: boolean | ComputedBuilder<boolean, State>
    autofocus?: boolean | ComputedBuilder<boolean, State>
    maxLength?: number | ComputedBuilder<number, State>
    minLength?: number | ComputedBuilder<number, State>
    spellcheck?: boolean | ComputedBuilder<boolean, State>
    inputType?: 'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url'
}
export interface SchemaWidgetTreeNode {
    id: string | number
    label?: string
    enable?: boolean
    selected?: boolean
    icon?: string
    children?: SchemaWidgetTreeNode[] //Array<SchemaWidgetTreeNode>
}

export type SchemaWidgetTypes = 'input'
    | 'select'
    | 'textarea'
    | 'range'
    | 'radio'
    | 'radio-button'
    | 'rating'
    | 'checkbox'
    | 'switch'
    | 'tree-select'
    | 'date'
    | 'time'
    | 'ipaddress'
    | 'colorpicker'
    | 'url'
    | 'file'
    | 'number'
    | 'password'
    | 'qrcode'
    | 'email'
    | 'phone'
    | 'search'
    | 'tree-dropdown-select'

export interface SchemaWidgetOptions<State = Dict> {
    filled?: boolean | ComputedBuilder<boolean, State>
    pill?: boolean | ComputedBuilder<boolean, State>
    clearable?: boolean | ComputedBuilder<boolean, State>
    readonly?: boolean | ComputedBuilder<boolean, State>
    autocomplete?: string | ComputedBuilder<string, State>
    pattern?: string | ComputedBuilder<string, State>
    autocorrect?: 'on' | 'off'
    noSpinButtons?: boolean | ComputedBuilder<boolean, State>
    autofocus?: boolean | ComputedBuilder<boolean, State>
    maxLength?: number | ComputedBuilder<number, State>
    minLength?: number | ComputedBuilder<number, State>
    spellcheck?: boolean | ComputedBuilder<boolean, State>
    inputType?: 'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url'
    selection?: 'signle' | 'multiple' | 'leaf'
    multiple?: boolean | ComputedBuilder<boolean, State>,
    maxOptionsVisible?: number | ComputedBuilder<number, State>,
    placement?: 'top' | 'bottom'
    max?: number | ComputedBuilder<number, State>
    precision?: number | ComputedBuilder<number, State>
    min?: number | ComputedBuilder<number, State>
    step?: number | ComputedBuilder<number, State>
    tooltip?: 'top' | 'bottom'
    format?: ('hex' | 'rgb' | 'hsl' | 'hsv') | ComputedBuilder<('hex' | 'rgb' | 'hsl' | 'hsv'), State>
    inline?: boolean | ComputedBuilder<boolean, State>
    opacity?: boolean | ComputedBuilder<boolean, State>
    uppercase?: boolean | ComputedBuilder<boolean, State>
    swatches?: string | ComputedBuilder<string, State>
    background?: string | ComputedBuilder<string, State>
    radius?: number | ComputedBuilder<number, State>
    errorCorrection?: 'L' | 'M' | 'Q' | 'H'
    passwordToggle?: boolean | ComputedBuilder<boolean, State>
    passwordVisible?: boolean | ComputedBuilder<boolean, State>
    resize?: 'none' | 'vertical' | 'auto'
    items?: SchemaWidgetTreeNode | SchemaWidgetTreeNode[]
    renderHelp?: (ctx: AutoFormContext) => any
    renderLabel?: (ctx: AutoFormContext) => any
    renderValue?: (ctx: AutoFormContext) => any
    renderError?: (ctx: AutoFormContext) => any
    onFieldChange?: (event: Event) => any
}

export type AutoFormContext = {
    store: AutoStore<any>
    form: any
    labelPos: 'top' | 'left' | 'none'
    advanced: boolean
    dark: boolean
}

export type SchemaWidgetAction<State = Dict> = {
    id?: string
    label?: string
    icon?: string
    position?: 'before' | 'after'
    type?: 'button' | 'dropdown' | 'image' | string
    url?: string
    tips?: string
    variant?: 'primary' | 'neutral' | 'success' | 'danger' | 'warning' | 'default'
    onClick?: (value: any, ctx: {
        action: SchemaWidgetAction,
        schema: SchemaOptions,
        event: Event,
        update: (value: any) => void
    }) => void
    disabled?: boolean | ComputedBuilder<boolean, State>
    visible?: boolean | ComputedBuilder<boolean, State>
    // 如果指定了items，则渲染为Dropdown
    items?: SchemaWidgetAction<State>[]
}

export type SchemaOptions<Value = any, State = Dict> = Record<string, any> & {
    name?: string
    widget?: SchemaWidgetTypes | Omit<string, SchemaWidgetTypes>
    required?: boolean | ComputedBuilder<boolean, State>
    visible?: boolean | ComputedBuilder<boolean, State>
    enable?: boolean | ComputedBuilder<boolean, State>
    description?: string | ComputedBuilder<string, State>
    icon?: string | ComputedBuilder<string, State>
    // 提供一些元数据
    label?: string | ComputedBuilder<string, State>
    labelPos?: string | ComputedBuilder<string, State>
    help?: string | ComputedBuilder<string, State>
    placeholder?: string | ComputedBuilder<string, State>
    group?: string | ComputedBuilder<string, State>
    advanced?: boolean | ComputedGetter<boolean, State>
    order?: number | ComputedGetter<number, State>
    width?: number | string | ComputedGetter<string, State>
    divider?: boolean | ComputedGetter<boolean, State>
    itemWidth?: number | string | ComputedGetter<string, State>
    invalidMessage?: string | ((e: Error, path: string, newValue: Value, oldValue: Value) => string);
    onFail?: 'pass' | 'throw' | 'ignore'
    select?: string[] | number[] | boolean[] | ({
        label?: string
        value?: ToRawType<Value>
        default?: boolean
        enable?: boolean
        selected?: boolean
        icon?: string
    } | string)[] | ComputedBuilder<any[], State>
    actions?: SchemaWidgetAction<State>[]
    // 转换数据
    toView?: (value: any) => any
    toState?: (value: any) => any
    toInput?: (value: any) => any
} & SchemaWidgetOptions<State>

export type SchemaDescriptor<Value = any, Options = Dict> = {
    datatype: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'any' | string
    value: Value
    validator?: SchemaValidator<Value>
    options: SchemaOptions<Value, Options>
}

export interface SchemaDescriptorBuilder<Value = any, State = Dict> {
    [VALUE_SCHEMA_BUILDER_FLAG]: true
    (): SchemaDescriptor<Value, State>
}

export interface SchemaBuilder<Value = any> {
    <T = Value, Options extends SchemaOptions<T> = SchemaOptions<T>>(value: T, options?: Options): SchemaDescriptorBuilder<ToRawType<T>, Options>
    <T = Value, Options extends SchemaOptions<T> = SchemaOptions<T>>(value: T, validate: SchemaValidate<T>, options?: Options): SchemaDescriptorBuilder<ToRawType<T>, Options>
    <T = Value, Options extends SchemaOptions<T> = SchemaOptions<T>>(value: T, validate: SchemaValidate<T>, invalidMessage?: SchemaValidator<T>['message'], options?: Options): SchemaDescriptorBuilder<ToRawType<T>, Options>
    <T = Value, Options extends SchemaOptions<T> = SchemaOptions<T>>(value: T, validator: SchemaValidator<T>, options?: Options): SchemaDescriptorBuilder<ToRawType<T>, Options>
}

export type ConfigurableState<State extends Dict> = {
    [Key in SchemaKeyPaths<State>]: GetTypeByPath<ComputedState<State>, Key>
}

export type SchemaState<State extends Dict> = ConfigurableState<State>


export type ComputedSchemaState<State extends Dict> = {
    [Key in SchemaKeyPaths<State>]: (
        GetTypeByPath<State, Key> extends SchemaDescriptorBuilder<infer V, infer Options>
        ? Options & { value: V } : GetTypeByPath<State, Key>
    ) & {
        path: string[]
    }
}

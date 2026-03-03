import type { ComputedBuilder } from "../computed/types";
import { VALUE_SCHEMA_BUILDER_FLAG } from "../consts";
import { AutoStore } from "../store/store";
import { StoreRawStateType } from "../store/types";
import { ComputedState, GetTypeByPath, StatePath } from "../types";

/**
 * 用于保存所有配置项的类型
 * key： 配置项名称路径，如user.order.price
 * value: AutoStoreFieldSchema & { value:<从原始Store中读取，写入时也会写入到原始Store的对应项>}
 */
// export type AutoStoreConfigures = Record<
//     string,
//     AutoStateSchema & {
//         value: any;
//     }
// >;
export interface AutoStoreConfigures {}

// biome-ignore lint/suspicious/noEmptyInterface: <noEmptyInterface>
export interface AutoStoreWidgets {}
export interface AutoStoreAction {
    id?: string;
    label?: string;
    icon?: string;
    disabled?: boolean;
    visible?: boolean;
    default?: boolean;
    checked?: boolean;
    tooltip?: string;
    value?: any;
    onClick?: (action: AutoStoreAction) => void;
}

/**
 * 从 AutoStoreWidgets 提取 widget 键类型
 * 当 AutoStoreWidgets 为空接口时，回退到 string 类型
 */
type WidgetKeys<T> = keyof T extends never ? string : keyof T;

export type AutoStoreWidgetTypes = WidgetKeys<AutoStoreWidgets>;

/**
 * 从 AutoStoreWidgets 中提取指定 widget 的配置类型
 */
export type WidgetConfig<W extends keyof AutoStoreWidgets> = AutoStoreWidgets[W];

/**
 * AutoStateSchema 基础接口（不包含 widget 特定配置）
 */
export interface AutoStateSchemaBase<Value = any> {
    value: Value;
    /**
     * 配置项控件类型
     * 即渲染渲染表单字段控件
     */
    widget?: AutoStoreWidgetTypes;
    /**
     * 配置键名称
     * 即在ConfigManager.state配置对象中存储key路径
     * 如果没有指定，则等于配置项所在的路径,如path=["order","price"],则key=order.price
     */
    key?: string;
    /**
     * 配置项名称
     * 一般是英文名称，用于渲染表单名称
     * 如果没有指定，默认等于路径的最后一个节点，如path=["order","price"],则name=price
     */
    name?: string;
    /**
     * 配置项标题
     * 一般是中文名称，用于渲染表单标题
     * 默认值等于name
     */
    label?: string;
    /**
     * 配置项帮助信息
     */
    help?: string;
    /**
     * 配置项提示信息
     */
    tooltip?: string;
    /**
     * 默认值
     */
    default?: Value;
    /**
     * 当校验出错时的无效提示信息
     *
     * 支持插值变量
     * - 当前所有配置项的值，例如: invalidTips="{label}数据格式错误"
     * - error: 错误信息，即错误对象的message属性
     * - errorStack: 错误堆栈信息,即错误对象的stack属性
     * - value: 错误值
     * - path: 路径
     *
     */
    errorMessage?: string;
    datatype?: string;
    /**
     * 是否启用
     */
    enable?: boolean;
    /**
     * 配置项图标
     */
    icon?: string;
    /**
     * 是否必填
     */
    required?: boolean;
    /**
     * 是否可见
     */
    visible?: boolean;
    description?: string;
    placeholder?: string;
    /**
     * 分组名称
     */
    group?: string;
    /**
     * 是否是高级选项
     */
    advanced?: boolean;
    /**
     * 是否显示分割线
     */
    divider?: boolean;
    /**
     * 排序号
     */
    order?: number;
    width?: number | string;
    height?: number | string;
    styles?: Record<string, any>; // 用于扩展widget样式，如{"<选择器>":"样式"}
    classs?: Record<string, any>; // 用于扩展widget类，如{"<选择器>":"类名"}

    /**
     *
     * 校验失败时的默认行为
     *
     * - throw: 默认，触发ValidateError错误
     * - throw-pass： 继续写入,然后再触发ValidateError错误
     * - pass: 继续写入,不抛出错误
     * - ignore: 静默忽略，即不触发错误，也不写入
     *
     * 错误信息均会写入到errors中
     *
     * 当校验函数返回 false 或抛出错误时，使用此选项决定如何处理
     * 可被校验函数抛出的 ValidateError.behavior 覆盖
     *
     */
    onInvalid?: "pass" | "throw" | "ignore" | "throw-pass";
    /**
     * 校验函数
     * 允许通过throw new Error()来提供错误信息
     * @param value
     * @returns
     */
    validate?: (value: Value, oldValue: Value, path: string[]) => boolean;
    /**
     * 在视图模式下的渲染函数
     */
    toView?: (value: Value) => any;
    /**
     * 写入到状态时的转换函数
     */
    toState?: (value: any) => any;
    /**
     * 将状态转换为输入值的函数
     */
    toInput?: (value: any) => any;
    /**
     * 用于自定义渲染表单字段
     */
    toRender?: (value: any) => any;
    /**
     * 动作
     */
    actions?: AutoStoreAction[];
}

/**
 * 提取类型的可选键
 */
type OptionalKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * 提取类型的必需键
 */
type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

/**
 * 创建精确的 Widget 配置类型：
 * - 必需属性保持必需
 * - 可选属性保持可选
 */
export type WidgetConfigPrecise<W extends keyof AutoStoreWidgets> = Pick<
    AutoStoreWidgets[W],
    RequiredKeys<AutoStoreWidgets[W]>
> &
    Partial<Pick<AutoStoreWidgets[W], OptionalKeys<AutoStoreWidgets[W]>>>;

/**
 * 完整的 AutoStateSchema 类型，根据 widget 参数自动合并对应 widget 配置
 * 使用泛型参数 Widget 来实现类型安全的 widget 配置推断
 */
export type AutoStoreStateSchema<
    Value = any,
    Widget extends keyof AutoStoreWidgets = never,
> = keyof AutoStoreWidgets extends never
    ? AutoStateSchemaBase<Value>
    : [Widget] extends [never]
      ? AutoStateSchemaBase<Value>
      : AutoStateSchemaBase<Value> &
            (Widget extends keyof AutoStoreWidgets ? WidgetConfigPrecise<Widget> : {});

// 让对象的成员值允许是ComputedBuilder，可计算值
// 例外：函数类型的属性，如果名称以 on、to、render 开头，则不允许为 ComputedBuilder
// 保留字段：key、value、path、datatype 等系统字段不允许为 ComputedBuilder
export type Computedable<Obj extends Record<string, any>, Value = any> = {
    [Key in keyof Obj]: Key extends "validate"
        ? (value: Value, oldValue: Value, path: string[]) => boolean
        : Key extends "name" | "id" | "key" | "value" | "path" | "datatype"
          ? Obj[Key] // 保留字段，不允许为 ComputedBuilder
          : Key extends `${"on" | "to" | "render"}${string}`
            ? Obj[Key] extends (...args: any[]) => any
                ? Obj[Key] // 函数类型，不允许为 ComputedBuilder
                : Obj[Key] | ComputedBuilder<Obj[Key], any>
            : Obj[Key] | ComputedBuilder<Obj[Key], any>;
};
export type ComputedableStateSchema<
    Value = any,
    Widget extends keyof AutoStoreWidgets = never,
> = Computedable<AutoStoreStateSchema<Value, Widget>, Value>;

export type SchemaDescriptor<Value = any, Widget extends keyof AutoStoreWidgets = never> = {
    path?: string[];
    value: Value;
    schema: AutoStoreStateSchema<Value, Widget>;
};

export interface SchemaDescriptorBuilder<
    Value = any,
    Widget extends keyof AutoStoreWidgets = never,
> {
    [VALUE_SCHEMA_BUILDER_FLAG]: true;
    (): SchemaDescriptor<Value, Widget>;
}

/**
 * 从 SchemaDescriptorBuilder 中提取 Widget 类型
 * 用于在 ConfigurableState 中恢复 widget 特定配置的类型信息
 */
export type ExtractWidgetFromBuilder<T> =
    T extends SchemaDescriptorBuilder<any, infer W> ? W : never;

export type SchemaBuilder<Value = any> = <T = Value, W extends keyof AutoStoreWidgets = never>(
    value: T,
    schema?: ComputedableStateSchema<Value, W>,
) => SchemaDescriptorBuilder<T, W>;

export type ConfigurableKeyPaths<State> = Exclude<
    keyof {
        [K in StatePath<State> as GetTypeByPath<State, K> extends {
            [VALUE_SCHEMA_BUILDER_FLAG]: true;
        }
            ? K
            : GetTypeByPath<State, K> extends Array<infer Item>
              ? Item extends { [VALUE_SCHEMA_BUILDER_FLAG]: true }
                  ? `${K}.${number}`
                  : never
              : never]: any;
    },
    number | symbol
>;

// 获取可配置项的类型
// 使用 AutoStateSchema 以包含 widget 特定配置属性（如 min, max, step 等）
export type ConfigurableState<Store extends AutoStore<any>, Prefix extends string = ""> = {
    [Key in ConfigurableKeyPaths<StoreRawStateType<Store>> as Prefix extends ""
        ? Key
        : `${Prefix}.${Key}`]: AutoStoreStateSchema<
        GetTypeByPath<ComputedState<StoreRawStateType<Store>>, Key>,
        ExtractWidgetFromBuilder<GetTypeByPath<StoreRawStateType<Store>, Key>>
    >;
};

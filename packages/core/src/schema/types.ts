import type { ComputedBuilder } from '../computed/types';
import { VALUE_SCHEMA_BUILDER_FLAG } from '../consts';

/**
 * 用于保存所有配置项的类型
 * key： 配置项名称路径，如user.order.price
 * value: AutoStoreFieldSchema & { value:<从原始Store中读取，写入时也会写入到原始Store的对应项>}
 */
export type AutoStoreConfigures = Record<
    string,
    AutoStateSchema & {
        value: any;
    }
>;

// biome-ignore lint/suspicious/noEmptyInterface: <noEmptyInterface>
export interface AutoStoreWidgets {
    number: {
        max: number;
        min: number;
        step?: number;
    };
}
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

export type AutoStoreWidgetTypes = keyof AutoStoreWidgets;

/**
 * 从 AutoStoreWidgets 中提取指定 widget 的配置类型
 */
export type WidgetConfig<W extends keyof AutoStoreWidgets> = AutoStoreWidgets[W];

/**
 * AutoStateSchema 基础接口（不包含 widget 特定配置）
 */
interface AutoStateSchemaBase<Value = any> {
    /**
     * 配置项控件类型
     * 即渲染渲染表单字段控件
     */
    widget?: string;
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
     * - stack: 错误堆栈信息,即错误对象的stack属性
     *
     */
    invalidTips?: string;
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
    onInvalid?: 'pass' | 'throw' | 'ignore' | 'throw-pass';
    /**
     * 校验函数
     * 允许通过throw new Error()来提供错误信息
     * @param value
     * @returns
     */
    onValidate?: (value: Value, oldValue: Value, path: string[]) => boolean;
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
 * 完整的 AutoStateSchema 类型，根据 widget 参数自动合并对应 widget 配置
 */
export type AutoStateSchema<
    Value = any,
    Widget extends AutoStoreWidgetTypes = AutoStoreWidgetTypes,
> = AutoStateSchemaBase<Value> &
    (Widget extends keyof AutoStoreWidgets ? Partial<WidgetConfig<Widget>> : {});

export type SchemaDescriptor<Value = any> = {
    path?: string[];
    value: Value;
    schema: AutoStateSchema<Value>;
};

export interface SchemaDescriptorBuilder<Value = any> {
    [VALUE_SCHEMA_BUILDER_FLAG]: true;
    (): SchemaDescriptor<Value>;
}
// 让对象的成员值允许是ComputedBuilder，可计算值
export type Computedable<Obj extends Record<string, any>> = {
    [Key in keyof Obj]:
        | Obj[Key]
        | (Obj[Key] extends (...args: any[]) => any
              ? never
              : Key extends 'name' | 'widget' | 'path' | 'actions' | 'items'
              ? never
              : ComputedBuilder<Obj[Key], any>);
};
export type ComputedableStateSchemaOptions<Value = any> = Computedable<AutoStateSchema<Value>>;

export type SchemaBuilder<Value = any> = <T = Value>(
    value: T,
    schema?: ComputedableStateSchemaOptions<Value>,
) => SchemaDescriptorBuilder<T>;

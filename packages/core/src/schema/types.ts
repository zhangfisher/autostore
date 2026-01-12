import type { ComputedBuilder } from '../computed/types';
import { VALUE_SCHEMA_BUILDER_FLAG } from '../consts';

/**
 * 用于保存所有配置项的类型
 * key： 配置项名称路径，如user.order.price
 * value: AutoStoreFieldSchema & { value:<从原始Store中读取，写入时也会写入到原始Store的对应项>}
 */
export type AutoStoreConfigures = Record<
    string,
    StateSchema & {
        value: any;
    }
>;

export interface AutoStoreWidgets {
    number: {
        max: number;
        min: number;
    };
}
export type AutoStoreWidgetTypes = keyof AutoStoreWidgets;

export type StateSchema<Value = any, Widget extends AutoStoreWidgetTypes = AutoStoreWidgetTypes> = {
    /**
     * 配置项控件类型
     * 即渲染渲染表单字段控件
     */
    widget?: Widget;
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
    default?: boolean;
    /**
     * 当校验出错时的无效提示信息
     */
    invalidTips?: string;
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
     * 当校验失败时的行为
     *
     * pass: 继续写入;
     * ignore: 静默忽略;
     * throw: 触发ValidateError错误; 验证失败信息会更新到validators.errors中
     *
     */
    validationBehavior?: 'pass' | 'throw' | 'ignore' | 'throw-pass';
    /**
     * 校验函数
     * 允许通过throw new Error()来提供错误信息
     * @param value
     * @returns
     */
    onValidate?: (value: Value) => boolean | Promise<boolean>;
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
} & AutoStoreWidgets[Widget];

export type SchemaDescriptor<Value = any> = {
    datatype: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'any' | string;
    value: Value;
    options: StateSchema;
    path?: string[];
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
export type ComputedableStateSchemaOptions<Value = any> = Computedable<StateSchema<Value>>;

export type SchemaBuilder<Value = any> = <T = Value>(
    value: T,
    options?: ComputedableStateSchemaOptions<Value>,
) => SchemaDescriptorBuilder<T>;

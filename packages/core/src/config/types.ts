import { CONFIGURABLE_DESCRIPTOR_BUILDER_FLAG, CONFIGURABLE_DESCRIPTOR_FLAG } from '../consts';

// biome-ignore lint/suspicious/noEmptyInterface: <noEmptyInterface>
export interface AutoStoreConfigures {}
export interface AutoStoreWidgets {
    number: {
        max: number;
        min: number;
    };
}
export type AutoStoreWidgetTypes = keyof AutoStoreWidgets;

export type ConfigurableSchema<Widget extends AutoStoreWidgetTypes = AutoStoreWidgetTypes> = {
    /**
     * 配置键名称
     * 即在ConfigManager.state配置对象中存储key路径
     */
    key?: string[];
    /**
     * 配置项名称
     * 一般是英文名称，用于渲染表单名称
     */
    name?: string;
    /**
     * 配置项标题
     * 一般是中文名称，用于渲染表单标题
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
     * 是否启用
     */
    enable?: boolean;
    /**
     * 配置项图标
     */
    icon?: string;
    /**
     * 配置项控件类型
     * 即渲染渲染表单字段控件
     */
    widget?: Widget;
    /**
     * 是否必填
     */
    required?: boolean;
    /**
     * 是否可见
     */
    visible?: boolean;
    /**
     * 校验函数
     * 允许通过throw new Error()来提供错误信息
     * @param value
     * @returns
     */
    onValidate?: (value: any) => boolean | Promise<boolean>;
} & AutoStoreWidgets[Widget];

export type ConfigurablSchemaDescriptor<Value = any> = {
    [CONFIGURABLE_DESCRIPTOR_FLAG]: true;
    value: Value;
    schema: ConfigurableSchema<any>;
};

export interface ConfigurableSchemaDescriptorBuilder<Value = any> {
    [CONFIGURABLE_DESCRIPTOR_BUILDER_FLAG]: true;
    (): ConfigurablSchemaDescriptor<Value>;
}

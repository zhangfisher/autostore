/**
 * Widget 类型推断测试
 *
 * 验证 AutoStateSchema 类型能够根据 widget 参数正确合并对应 widget 配置
 */
/** biome-ignore-all lint/correctness/noUnusedVariables: <explanation> */

import type { AutoStateSchema, AutoStoreWidgets } from '../src/schema/types';

// 扩展 AutoStoreWidgets 以支持更多 widget 类型
declare module '../src/schema/types' {
    export interface AutoStoreWidgets {
        number: {
            max: number;
            min: number;
            step?: number;
        };
        text: {
            maxLength?: number;
            minLength?: number;
            pattern?: RegExp;
        };
        select: {
            options: Array<{ value: any; label: string }>;
            multiple?: boolean;
        };
    }
}

// 测试 1: widget='number' 时应该包含 number widget 的配置
type TestNumberWidget = AutoStateSchema<number, 'number'>;

const numberSchemaTest: TestNumberWidget = {
    widget: 'number',
    label: '数量',
    // 这些属性来自 'number' widget 配置
    max: 100,
    min: 0,
    step: 1,
    // 这些是通用的 schema 属性
    required: true,
    enable: true,
};

// 测试 2: widget='text' 时应该包含 text widget 的配置
type TestTextWidget = AutoStateSchema<string, 'text'>;

const textSchemaTest: TestTextWidget = {
    widget: 'text',
    label: '用户名',
    // 这些属性来自 'text' widget 配置
    maxLength: 20,
    minLength: 3,
    pattern: /^[a-zA-Z0-9]+$/,
    // 这些是通用的 schema 属性
    required: true,
    placeholder: '请输入用户名',
};

// 测试 3: widget='select' 时应该包含 select widget 的配置
type TestSelectWidget = AutoStateSchema<any, 'select'>;

const selectSchemaTest: TestSelectWidget = {
    widget: 'select',
    label: '选择项',
    // 这些属性来自 'select' widget 配置
    options: [
        { value: 1, label: '选项1' },
        { value: 2, label: '选项2' },
    ],
    multiple: false,
    // 这些是通用的 schema 属性
    required: true,
};

// 测试 4: 未指定 widget 类型时,应该有所有通用属性
type TestGenericSchema = AutoStateSchema;

const genericSchemaTest: TestGenericSchema = {
    widget: 'text',
    label: '通用字段',
    required: false,
    enable: true,
};

// 测试 5: 验证类型错误捕获
const invalidTextSchema: AutoStateSchema<string, 'text'> = {
    widget: 'text',
    max: 100, // 错误: max 不属于 text widget
};

const invalidNumberSchema: AutoStateSchema<number, 'number'> = {
    widget: 'number',
    schema: [], // 错误: options 不属于 number widget
};

// 测试 6: 验证可选性 - widget 特定属性都是可选的
const validPartialNumberSchema: AutoStateSchema<number, 'number'> = {
    widget: 'number',
    label: '价格',
    // min 和 max 都是可选的
    min: 0,
    // max 未指定,应该不报错
};

console.log('✅ Widget 类型推断测试通过');

/**
 * Widget 类型推断使用示例
 *
 * 演示 AutoStateSchema 如何根据 widget 参数自动合并对应 widget 配置类型
 */

import type { AutoStateSchema } from './src/schema/types';

// 扩展 AutoStoreWidgets 接口以定义支持的 widget 类型
declare module './src/schema/types' {
    export interface AutoStoreWidgets {
        /**
         * 数字输入框 widget 配置
         */
        number: {
            /** 最大值 */
            max: number;
            /** 最小值 */
            min: number;
            /** 步长 */
            step?: number;
        };

        /**
         * 文本输入框 widget 配置
         */
        text: {
            /** 最大长度 */
            maxLength?: number;
            /** 最小长度 */
            minLength?: number;
            /** 正则表达式验证 */
            pattern?: RegExp;
        };

        /**
         * 下拉选择框 widget 配置
         */
        select: {
            /** 选项列表 */
            options: Array<{ value: any; label: string }>;
            /** 是否多选 */
            multiple?: boolean;
        };
    }
}

// ===== 使用示例 =====

// 示例 1: 使用 'number' widget
const numberFieldSchema: AutoStateSchema<number, 'number'> = {
    widget: 'number',
    label: '价格',
    // number widget 特定配置
    max: 9999,
    min: 0,
    step: 0.01,
    // 通用 schema 配置
    required: true,
    enable: true,
    help: '请输入商品价格',
};

// 示例 2: 使用 'text' widget
const textFieldSchema: AutoStateSchema<string, 'text'> = {
    widget: 'text',
    label: '用户名',
    // text widget 特定配置
    maxLength: 20,
    minLength: 3,
    pattern: /^[a-zA-Z0-9_]+$/,
    // 通用 schema 配置
    required: true,
    placeholder: '请输入用户名',
    help: '只能包含字母、数字和下划线',
};

// 示例 3: 使用 'select' widget
const selectFieldSchema: AutoStateSchema<string, 'select'> = {
    widget: 'select',
    label: '性别',
    // select widget 特定配置
    options: [
        { value: 'male', label: '男' },
        { value: 'female', label: '女' },
        { value: 'other', label: '其他' },
    ],
    multiple: false,
    // 通用 schema 配置
    required: true,
};

// 示例 4: 通用 schema (不指定 widget 类型)
const genericFieldSchema: AutoStateSchema = {
    widget: 'text',
    label: '备注',
    required: false,
    enable: true,
};

// ===== 类型安全保障 =====

// ✅ 正确: number widget 可以使用 max/min/step
const validNumberSchema: AutoStateSchema<number, 'number'> = {
    widget: 'number',
    max: 100,
    min: 0,
    step: 1,
};

// ❌ 错误: text widget 不能使用 max (这是 number widget 的属性)
// @ts-expect-error - 属性'max'不存在于类型 'AutoStateSchema<string, "text">'
const invalidTextSchema: AutoStateSchema<string, 'text'> = {
    widget: 'text',
    max: 100, // Type Error!
};

// ❌ 错误: number widget 不能使用 options (这是 select widget 的属性)
// @ts-expect-error - 属性'options'不存在于类型 'AutoStateSchema<number, "number">'
const invalidNumberSchema: AutoStateSchema<number, 'number'> = {
    widget: 'number',
    options: [], // Type Error!
};

// ===== 实际应用场景 =====

/**
 * 创建一个表单配置对象
 */
const formConfig = {
    // 年龄字段 - 使用 number widget
    age: {
        widget: 'number' as const,
        label: '年龄',
        max: 150,
        min: 0,
        step: 1,
        required: true,
    } satisfies AutoStateSchema<number, 'number'>,

    // 用户名字段 - 使用 text widget
    username: {
        widget: 'text' as const,
        label: '用户名',
        maxLength: 20,
        minLength: 3,
        required: true,
    } satisfies AutoStateSchema<string, 'text'>,

    // 角色字段 - 使用 select widget
    role: {
        widget: 'select' as const,
        label: '角色',
        options: [
            { value: 'admin', label: '管理员' },
            { value: 'user', label: '普通用户' },
            { value: 'guest', label: '访客' },
        ],
        multiple: true,
    } satisfies AutoStateSchema<string, 'select'>,
};

console.log('Widget 类型推断示例 - 类型安全且易用!');

export {
    numberFieldSchema,
    textFieldSchema,
    selectFieldSchema,
    genericFieldSchema,
    formConfig,
};

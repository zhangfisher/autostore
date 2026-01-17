/**
 * 验证 configurable 的类型推断
 * 这个文件用于 TypeScript 类型检查,不需要运行
 */

import { configurable } from '../src';

// 测试1: number 类型推断
const ageSchema = configurable(25, {
    onValidate: (value) => {
        // value 应该被推断为 number 类型
        const _numCheck: number = value; // 如果类型正确,这行不应该有错误
        return value >= 0 && value <= 150;
    },
});

// 测试2: string 类型推断
const nameSchema = configurable('John', {
    onValidate: (value) => {
        // value 应该被推断为 string 类型
        const _strCheck: string = value; // 如果类型正确,这行不应该有错误
        return value.length > 0;
    },
});

// 测试3: boolean 类型推断
const enabledSchema = configurable(true, {
    onValidate: (value) => {
        // value 应该被推断为 boolean 类型
        const _boolCheck: boolean = value; // 如果类型正确,这行不应该有错误
        return typeof value === 'boolean';
    },
});

// 测试4: array 类型推断
const tagsSchema = configurable(['tag1', 'tag2'], {
    onValidate: (value) => {
        // value 应该被推断为 string[] 类型
        const _arrCheck: string[] = value; // 如果类型正确,这行不应该有错误
        return value.length <= 5;
    },
});

export { ageSchema, nameSchema, enabledSchema, tagsSchema };

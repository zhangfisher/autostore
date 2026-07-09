import { describe, test, it, expect, mock, beforeAll, afterAll, beforeEach, afterEach } from "bun:test"

import { parseFunc } from '../../src/utils/parseFunc';

describe('parseFunc', () => {
    // 测试普通函数解析
    it('should parse regular function', () => {
        const fnStr = 'function(a, b) { return a + b; }';
        const fn = parseFunc(fnStr)!;

        expect(typeof fn).toBe('function');
        expect(fn(2, 3)).toBe(5);
    });

    // 测试单行表达式箭头函数
    it('should parse arrow function with expression', () => {
        const fnStr = '(a, b) => a * b';
        const fn = parseFunc(fnStr)!;

        expect(typeof fn).toBe('function');
        expect(fn(3, 4)).toBe(12);
    });

    // 测试带花括号的多行语句箭头函数
    it('should parse arrow function with block body', () => {
        const fnStr = '(a, b) => { const result = a - b; return result; }';
        const fn = parseFunc(fnStr)!;

        expect(typeof fn).toBe('function');
        expect(fn(10, 4)).toBe(6);
    });

    // 测试带有```包裹的函数
    it('should parse function wrapped in code block', () => {
        const fnStr = '```function(a, b) { return a / b; }```';
        const fn = parseFunc(fnStr)!;

        expect(typeof fn).toBe('function');
        expect(fn(10, 2)).toBe(5);
    });

    // 测试带有```包裹的箭头函数
    it('should parse arrow function wrapped in code block', () => {
        const fnStr = '```(a, b) => a % b```';
        const fn = parseFunc(fnStr)!;

        expect(typeof fn).toBe('function');
        expect(fn(10, 3)).toBe(1);
    });

    // 测试复杂的箭头函数
    it('should parse complex arrow function with multiple statements', () => {
        const fnStr = `(a, b) => {
            let result = 0;
            for (let i = 0; i < b; i++) {
                result += a;
            }
            return result;
        }`;
        const fn = parseFunc(fnStr)!;

        expect(typeof fn).toBe('function');
        expect(fn(3, 4)).toBe(12); // 3 * 4 = 12
    });

    // 测试无参数的函数
    it('should parse functions with no parameters', () => {
        const fnStr = '() => 42';
        const fn = parseFunc(fnStr)!;

        expect(typeof fn).toBe('function');
        expect(fn()).toBe(42);
    });

    // 测试无法解析的情况
    it('should return original string if parsing fails', () => {
        const invalidFnStr = 'not a function';
        const result = parseFunc(invalidFnStr);

        expect(result).toBeUndefined();
    });

    // 测试语法错误的函数
    it('should return original string if function has syntax errors', () => {
        const invalidFnStr = 'function(a, b) { return a + b; '; // 缺少结束括号
        const result = parseFunc(invalidFnStr);

        expect(result).toBeUndefined();
    });
});

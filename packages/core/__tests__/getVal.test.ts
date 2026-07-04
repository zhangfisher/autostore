import { describe, test, expect } from "bun:test";

import { getVal } from '../src/utils/getVal';

describe('getVal', () => {
    const obj = {
        a: {
            b: {
                c: 1,
            },
            list: [10, 20, 30],
        },
        users: [
            { name: '张三', age: 18 },
            { name: '李四', age: 20 },
        ],
    };

    test('当路径为空时返回原对象', () => {
        expect(getVal(obj, undefined)).toBe(obj);
        expect(getVal(obj, null as any)).toBe(obj);
        expect(getVal(obj, '')).toBe(obj);
        expect(getVal(obj, [])).toBe(obj);
    });

    test('支持点号分隔的字符串路径访问', () => {
        expect(getVal(obj, 'a.b.c')).toBe(1);
    });

    test('支持路径段数组访问', () => {
        expect(getVal(obj, ['a', 'b', 'c'])).toBe(1);
    });

    test('路径不存在时返回默认值', () => {
        expect(getVal(obj, 'a.x', '默认')).toBe('默认');
        expect(getVal(obj, 'a.b.x')).toBeUndefined();
    });

    test('中间路径段不存在时立即返回默认值', () => {
        expect(getVal(obj, 'x.y.z', '兜底')).toBe('兜底');
    });

    test('支持通过数字索引字符串访问数组成员', () => {
        expect(getVal(obj, 'a.list.0')).toBe(10);
        expect(getVal(obj, 'a.list.1')).toBe(20);
        expect(getVal(obj, 'a.list.2')).toBe(30);
    });

    test('数组索引越界时返回默认值', () => {
        expect(getVal(obj, 'a.list.5', '无')).toBe('无');
        expect(getVal(obj, 'a.list.5')).toBeUndefined();
    });

    test('支持通过数组路径访问对象数组中的成员', () => {
        expect(getVal(obj, ['users', '0', 'name'])).toBe('张三');
        expect(getVal(obj, ['users', '1', 'age'])).toBe(20);
    });

    test('支持直接以数组作为根对象访问数组成员', () => {
        const arr = ['x', 'y', 'z'];
        expect(getVal(arr, '0')).toBe('x');
        expect(getVal(arr, ['2'])).toBe('z');
        expect(getVal(arr, '3', '默认')).toBe('默认');
    });

    test('支持 Map 成员访问', () => {
        const map = new Map([['key', { value: 42 }]]);
        expect(getVal(map, 'key.value')).toBe(42);
        expect(getVal({ m: map }, ['m', 'key', 'value'])).toBe(42);
    });
});

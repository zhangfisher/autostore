import { describe, test, expect } from 'bun:test';
import { createSandbox } from '../src/utils/createSandbox';

describe('createSandbox', () => {
    describe('基本功能测试', () => {
        test('应该能够执行基本的算术运算', () => {
            const sandbox = createSandbox({
                a: 10,
                b: 5,
                c: 3,
            });

            expect(sandbox('a + b')).toBe(15);
            expect(sandbox('a * b + c')).toBe(53);
            expect(sandbox('(a + b) / c')).toBe(5);
        });

        test('应该能够处理字符串操作', () => {
            const sandbox = createSandbox({
                firstName: 'zhang',
                lastName: 'san',
                age: 25,
            });

            expect(sandbox('firstName + " " + lastName')).toBe('zhang san');
            expect(sandbox('firstName + " is " + age + " years old"')).toBe('zhang is 25 years old');
        });

        test('应该能够执行数组操作', () => {
            const sandbox = createSandbox({
                numbers: [1, 2, 3, 4, 5],
                multiplier: 2,
            });

            expect(sandbox('numbers.map(n => n * multiplier)')).toEqual([2, 4, 6, 8, 10]);
            expect(sandbox('numbers.reduce((a, b) => a + b, 0)')).toBe(15);
        });

        test('应该能够调用 context 中的函数', () => {
            const sandbox = createSandbox({
                x: 100,
                double: (n: number) => n * 2,
                add: (a: number, b: number) => a + b,
            });

            expect(sandbox('double(x)')).toBe(200);
            expect(sandbox('add(x, 50)')).toBe(150);
        });

        test('应该能够访问嵌套对象属性', () => {
            const sandbox = createSandbox({
                user: {
                    name: 'alice',
                    profile: {
                        age: 30,
                        city: 'beijing',
                    },
                },
            });

            expect(sandbox('user.name')).toBe('alice');
            expect(sandbox('user.profile.age')).toBe(30);
            expect(sandbox('user.profile.city')).toBe('beijing');
        });
    });

    describe('错误处理测试', () => {
        test('无 onError 回调时应该抛出错误', () => {
            const sandbox = createSandbox({ a: 1, b: 2 });

            expect(() => sandbox('undefinedVariable')).toThrow();
            expect(() => sandbox('a +')).toThrow();
        });

        test('onError 返回值时应该使用该值作为结果', () => {
            const sandbox = createSandbox(
                { x: 100, y: 200 },
                {
                    onError: (error, code) => {
                        return -1;
                    },
                }
            );

            expect(sandbox('x + y')).toBe(300);
            expect(sandbox('undefinedVar')).toBe(-1);
            expect(sandbox('x +')).toBe(-1);
        });

        test('onError 不返回值时应该继续抛出错误', () => {
            const sandbox = createSandbox(
                { name: 'alice' },
                {
                    onError: (error, code) => {
                        console.log(`记录错误: ${code}`);
                    },
                }
            );

            expect(sandbox('name')).toBe('alice');
            expect(() => sandbox('undefinedProp')).toThrow();
        });

        test('onError 应该接收错误对象和代码字符串', () => {
            let capturedError: Error | undefined;
            let capturedCode: string | undefined;

            const sandbox = createSandbox(
                { a: 1 },
                {
                    onError: (error, code) => {
                        capturedError = error;
                        capturedCode = code;
                        return null;
                    },
                }
            );

            sandbox('badVar');

            expect(capturedError).toBeDefined();
            expect(capturedError).toBeInstanceOf(Error);
            expect(capturedCode).toBe('badVar');
        });

        test('onError 可以根据错误类型返回不同值', () => {
            const sandbox = createSandbox(
                { items: [1, 2, 3] },
                {
                    onError: (error, code) => {
                        if (error instanceof ReferenceError) {
                            return 'undefined';
                        }
                        if (error instanceof SyntaxError) {
                            return [];
                        }
                        return null;
                    },
                }
            );

            expect(sandbox('items.length')).toBe(3);
            expect(sandbox('badVar')).toBe('undefined');
            expect(sandbox('items[')).toEqual([]);
        });
    });

    describe('边界情况测试', () => {
        test('应该处理空的 context', () => {
            const sandbox = createSandbox({});
            expect(sandbox('1 + 1')).toBe(2);
        });

        test('应该处理特殊字符变量名', () => {
            const sandbox = createSandbox({
                $var: 1,
                _var: 2,
                var2: 3,
            });

            expect(sandbox('$var + _var + var2')).toBe(6);
        });

        test('应该处理表达式返回 undefined', () => {
            const sandbox = createSandbox({ a: 1 });
            expect(sandbox('void 0')).toBeUndefined();
        });

        test('应该处理表达式返回 null', () => {
            const sandbox = createSandbox({});
            expect(sandbox('null')).toBeNull();
        });

        test('应该处理多个 context 变量', () => {
            const context: Record<string, number> = {};
            for (let i = 0; i < 10; i++) {
                context[`v${i}`] = i;
            }

            const sandbox = createSandbox(context);
            expect(sandbox('v0 + v1 + v2')).toBe(3);
        });
    });

    describe('类型安全性测试', () => {
        test('应该保持函数的类型', () => {
            const fn = (x: number) => x * 2;
            const sandbox = createSandbox({ double: fn, value: 5 });

            const result = sandbox('double(value)');
            expect(result).toBe(10);
        });

        test('应该保持数组的类型', () => {
            const sandbox = createSandbox({
                numbers: [1, 2, 3] as number[],
            });

            const result = sandbox('numbers');
            expect(Array.isArray(result)).toBe(true);
            expect(result).toEqual([1, 2, 3]);
        });
    });

    describe('disabledGlobals 测试', () => {
        test('应该禁用指定的全局变量', () => {
            const sandbox = createSandbox(
                { x: 1 },
                { disabledGlobals: ['window', 'document', 'fetch'] }
            );

            // 禁用的全局变量应该返回 undefined
            expect(sandbox('typeof window')).toBe('undefined');
            expect(sandbox('typeof document')).toBe('undefined');
            expect(sandbox('typeof fetch')).toBe('undefined');
        });

        test('禁用全局变量后调用它们应该抛出错误', () => {
            const sandbox = createSandbox(
                { x: 1 },
                { disabledGlobals: ['fetch', 'XMLHttpRequest'] }
            );

            // 尝试调用禁用的函数应该抛出 TypeError
            expect(() => sandbox('fetch("/api")')).toThrow(TypeError);
            expect(() => sandbox('new XMLHttpRequest()')).toThrow(TypeError);
        });

        test('不应该影响 context 中的同名变量', () => {
            const sandbox = createSandbox(
                {
                    window: { title: 'custom' },
                    document: { getElementById: () => 'div' },
                },
                { disabledGlobals: ['window', 'document'] }
            );

            // context 中的变量应该正常工作
            expect(sandbox('window.title')).toBe('custom');
            expect(sandbox('typeof document.getElementById')).toBe('function');
        });

        test('应该能够禁用多个全局变量', () => {
            const sandbox = createSandbox(
                { result: 1 },
                {
                    disabledGlobals: [
                        'window',
                        'document',
                        'fetch',
                        'XMLHttpRequest',
                        'WebSocket',
                        'Worker',
                    ],
                }
            );

            expect(sandbox('typeof window')).toBe('undefined');
            expect(sandbox('typeof document')).toBe('undefined');
            expect(sandbox('typeof fetch')).toBe('undefined');
            expect(sandbox('typeof XMLHttpRequest')).toBe('undefined');
            expect(sandbox('typeof WebSocket')).toBe('undefined');
            expect(sandbox('typeof Worker')).toBe('undefined');
            // context 变量应该仍然可用
            expect(sandbox('result')).toBe(1);
        });

        test('空数组应该不禁用任何全局变量', () => {
            const sandbox = createSandbox({ x: 1 }, { disabledGlobals: [] });

            // 空数组不应该影响全局变量
            // 注意：在 Bun/test 环境中可能没有 window，所以只测试基本类型
            expect(sandbox('typeof console')).not.toBe('undefined');
        });

        test('应该能够与 onError 配合使用', () => {
            const sandbox = createSandbox(
                { x: 1 },
                {
                    disabledGlobals: ['fetch'],
                    onError: (error, code) => {
                        if (error instanceof TypeError && code.includes('fetch')) {
                            return 'fetch disabled';
                        }
                        throw error;
                    },
                }
            );

            expect(sandbox('fetch("/api")')).toBe('fetch disabled');
            expect(sandbox('x + 1')).toBe(2);
        });

        test('禁用不存在的全局变量不应该报错', () => {
            const sandbox = createSandbox(
                { x: 1 },
                { disabledGlobals: ['nonExistentGlobal123', 'anotherFakeGlobal'] }
            );

            // 即使禁用的全局变量不存在，也应该正常工作
            expect(sandbox('x + 1')).toBe(2);
            expect(sandbox('typeof nonExistentGlobal123')).toBe('undefined');
        });
    });
});

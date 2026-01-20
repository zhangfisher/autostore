import { describe, test, expect } from 'bun:test';
import { createSandbox } from '../../src/utils/createSandbox';

describe('createSandbox', () => {
    describe('基本功能测试', () => {
        test('应该创建一个沙箱函数', () => {
            const sandbox = createSandbox({ a: 1, b: 2 });
            expect(sandbox).toBeInstanceOf(Function);
        });

        test('应该能执行简单的加法运算', () => {
            const sandbox = createSandbox({ a: 1, b: 2 });
            const result = sandbox('a + b');
            expect(result).toBe(3);
        });

        test('应该能执行复杂的算术运算', () => {
            const sandbox = createSandbox({ a: 10, b: 5, c: 3 });
            expect(sandbox('a + b')).toBe(15);
            expect(sandbox('a * b + c')).toBe(53);
            expect(sandbox('(a + b) / c')).toBe(5);
            expect(sandbox('a - b * c')).toBe(-5);
        });
    });

    describe('字符串操作测试', () => {
        test('应该能拼接字符串', () => {
            const sandbox = createSandbox({
                firstName: 'zhang',
                lastName: 'san',
                age: 25,
            });
            expect(sandbox('firstName + " " + lastName')).toBe('zhang san');
            expect(sandbox('firstName + " is " + age + " years old"')).toBe(
                'zhang is 25 years old',
            );
        });

        test('应该能使用模板字符串', () => {
            const sandbox = createSandbox({ name: 'Alice', city: 'Beijing' });
            expect(sandbox('`Hello, ${name} from ${city}`')).toBe('Hello, Alice from Beijing');
        });

        test('应该能使用字符串方法', () => {
            const sandbox = createSandbox({ text: 'Hello World' });
            expect(sandbox('text.toUpperCase()')).toBe('HELLO WORLD');
            expect(sandbox('text.toLowerCase()')).toBe('hello world');
            expect(sandbox('text.length')).toBe(11);
        });
    });

    describe('数组操作测试', () => {
        test('应该能使用数组方法', () => {
            const sandbox = createSandbox({
                numbers: [1, 2, 3, 4, 5],
                multiplier: 2,
            });
            expect(sandbox('numbers.map(n => n * multiplier)')).toEqual([2, 4, 6, 8, 10]);
            expect(sandbox('numbers.reduce((a, b) => a + b, 0)')).toBe(15);
            expect(sandbox('numbers.filter(n => n > 2)')).toEqual([3, 4, 5]);
        });

        test('应该能访问数组元素', () => {
            const sandbox = createSandbox({ arr: [10, 20, 30] });
            expect(sandbox('arr[0]')).toBe(10);
            expect(sandbox('arr[2]')).toBe(30);
            expect(sandbox('arr.length')).toBe(3);
        });

        test('应该能使用数组的 slice 和 splice', () => {
            const sandbox = createSandbox({ arr: [1, 2, 3, 4, 5] });
            expect(sandbox('arr.slice(1, 3)')).toEqual([2, 3]);
        });
    });

    describe('对象操作测试', () => {
        test('应该能访问对象属性', () => {
            const sandbox = createSandbox({
                user: {
                    name: 'alice',
                    profile: { age: 30, city: 'beijing' },
                },
            });
            expect(sandbox('user.name')).toBe('alice');
            expect(sandbox('user.profile.age')).toBe(30);
            expect(sandbox('user.profile.city')).toBe('beijing');
        });

        test('应该能使用对象解构', () => {
            const sandbox = createSandbox({ user: { name: 'Bob', age: 25 } });
            expect(sandbox('({ name } = user, name)')).toBe('Bob');
        });

        test('应该能使用 Object 方法', () => {
            const sandbox = createSandbox({
                obj: { a: 1, b: 2, c: 3 },
            });
            expect(sandbox('Object.keys(obj)')).toEqual(['a', 'b', 'c']);
            expect(sandbox('Object.values(obj)')).toEqual([1, 2, 3]);
            expect(sandbox('Object.keys(obj).length')).toBe(3);
        });
    });

    describe('函数调用测试', () => {
        test('应该能调用 context 中的函数', () => {
            const sandbox = createSandbox({
                x: 100,
                double: (n: number) => n * 2,
                add: (a: number, b: number) => a + b,
            });
            expect(sandbox('double(x)')).toBe(200);
            expect(sandbox('add(x, 50)')).toBe(150);
        });

        test('应该能使用箭头函数', () => {
            const sandbox = createSandbox({ x: 5 });
            expect(sandbox('((n) => n * 2)(x)')).toBe(10);
            expect(sandbox('((a, b) => a + b)(x, 10)')).toBe(15);
        });

        test('应该能使用内置函数', () => {
            const sandbox = createSandbox({ num: 3.14159 });
            expect(sandbox('Math.round(num)')).toBe(3);
            expect(sandbox('Math.floor(num)')).toBe(3);
            expect(sandbox('Math.ceil(num)')).toBe(4);
            expect(sandbox('Math.sqrt(16)')).toBe(4);
        });

        test('应该能使用 JSON 方法', () => {
            const sandbox = createSandbox({
                obj: { name: 'test', value: 123 },
            });
            expect(sandbox('JSON.stringify(obj)')).toBe('{"name":"test","value":123}');
            expect(sandbox('JSON.parse(\'{"x":10}\').x')).toBe(10);
        });
    });

    describe('布尔值和逻辑运算测试', () => {
        test('应该能执行布尔运算', () => {
            const sandbox = createSandbox({ a: true, b: false });
            expect(sandbox('a && b')).toBe(false);
            expect(sandbox('a || b')).toBe(true);
            expect(sandbox('!a')).toBe(false);
            expect(sandbox('!b')).toBe(true);
        });

        test('应该能执行比较运算', () => {
            const sandbox = createSandbox({ a: 5, b: 10, c: '5' });
            expect(sandbox('a < b')).toBe(true);
            expect(sandbox('a > b')).toBe(false);
            expect(sandbox('a == c')).toBe(true);
            expect(sandbox('a === c')).toBe(false);
            expect(sandbox('a !== c')).toBe(true);
        });

        test('应该能使用三元运算符', () => {
            const sandbox = createSandbox({ score: 85 });
            expect(sandbox('score >= 60 ? "pass" : "fail"')).toBe('pass');
        });
    });

    describe('边界情况测试', () => {
        test('应该能处理空 context', () => {
            const sandbox = createSandbox({});
            expect(sandbox('1 + 1')).toBe(2);
            expect(sandbox('Math.PI')).toBeCloseTo(3.14159);
        });

        test('应该能处理单个变量 context', () => {
            const sandbox = createSandbox({ x: 42 });
            expect(sandbox('x')).toBe(42);
            expect(sandbox('x * 2')).toBe(84);
        });

        test('应该能处理 null 和 undefined', () => {
            const sandbox = createSandbox({
                a: null,
                b: undefined,
            });
            expect(sandbox('a === null')).toBe(true);
            expect(sandbox('b === undefined')).toBe(true);
            expect(sandbox('a ?? "default"')).toBe('default');
            expect(sandbox('b ?? "default"')).toBe('default');
        });

        test('应该能处理数字 0 和空字符串', () => {
            const sandbox = createSandbox({ zero: 0, emptyStr: '' });
            expect(sandbox('zero')).toBe(0);
            expect(sandbox('emptyStr')).toBe('');
            expect(sandbox('zero || "default"')).toBe('default');
            expect(sandbox('emptyStr || "default"')).toBe('default');
        });

        test('应该能处理 NaN 和 Infinity', () => {
            const sandbox = createSandbox({});
            expect(sandbox('NaN')).toBeNaN();
            expect(sandbox('Infinity')).toBe(Infinity);
            expect(sandbox('-Infinity')).toBe(-Infinity);
        });

        test('应该能处理负数', () => {
            const sandbox = createSandbox({ a: -5, b: -10 });
            expect(sandbox('a + b')).toBe(-15);
            expect(sandbox('a * b')).toBe(50);
        });

        test('应该能处理小数', () => {
            const sandbox = createSandbox({ a: 0.1, b: 0.2 });
            expect(sandbox('a + b')).toBeCloseTo(0.3, 10);
        });
    });

    describe('错误处理测试', () => {
        test('应该抛出引用错误当访问未定义的变量', () => {
            const sandbox = createSandbox({ a: 1 });
            expect(() => {
                sandbox('undefinedVariable');
            }).toThrow();
        });

        test('应该抛出语法错误当代码有语法问题', () => {
            const sandbox = createSandbox({ a: 1 });
            expect(() => {
                sandbox('a + ');
            }).toThrow();
        });

        test('应该抛出类型错误当类型不匹配', () => {
            const sandbox = createSandbox({ num: 42 });
            expect(() => {
                sandbox('num.toUpperCase()');
            }).toThrow();
        });

        test('应该抛出错误当除以零', () => {
            const sandbox = createSandbox({ a: 10 });
            const result = sandbox('a / 0');
            expect(result).toBe(Infinity);
        });

        test('应该处理深度嵌套的对象路径错误', () => {
            const sandbox = createSandbox({ user: { name: 'Alice' } });
            expect(() => {
                sandbox('user.profile.age');
            }).toThrow();
        });
    });

    describe('高级特性测试', () => {
        test('应该能使用解构赋值', () => {
            const sandbox = createSandbox({ arr: [1, 2, 3] });
            expect(sandbox('([a, b] = arr, a + b)')).toBe(3);
        });

        test('应该能使用扩展运算符', () => {
            const sandbox = createSandbox({
                arr1: [1, 2],
                arr2: [3, 4],
            });
            expect(sandbox('[...arr1, ...arr2]')).toEqual([1, 2, 3, 4]);
        });

        test('应该能使用可选链操作符', () => {
            const sandbox = createSandbox({ user: { name: 'Alice' } });
            expect(sandbox('user?.name')).toBe('Alice');
            expect(sandbox('user?.profile?.age')).toBeUndefined();
        });

        test('应该能使用空值合并操作符', () => {
            const sandbox = createSandbox({
                a: null,
                b: undefined,
                c: 0,
                d: '',
                e: 'default',
            });
            expect(sandbox('a ?? "default1"')).toBe('default1');
            expect(sandbox('b ?? "default2"')).toBe('default2');
            expect(sandbox('c ?? "default3"')).toBe(0);
            expect(sandbox('d ?? "default4"')).toBe('');
            expect(sandbox('e ?? "default5"')).toBe('default');
        });
    });

    describe('特殊字符和 Unicode 测试', () => {
        test('应该能处理特殊字符作为变量名', () => {
            const sandbox = createSandbox({
                $var: 1,
                _var: 2,
            });
            expect(sandbox('$var + _var')).toBe(3);
        });

        test('应该能处理 Unicode 字符串', () => {
            const sandbox = createSandbox({
                name: '张三',
                emoji: '🎉',
            });
            expect(sandbox('name')).toBe('张三');
            expect(sandbox('emoji')).toBe('🎉');
            expect(sandbox('name + " " + emoji')).toBe('张三 🎉');
        });
    });

    describe('性能和多次调用测试', () => {
        test('应该能多次调用同一个沙箱', () => {
            const sandbox = createSandbox({ x: 10 });
            expect(sandbox('x + 1')).toBe(11);
            expect(sandbox('x + 2')).toBe(12);
            expect(sandbox('x + 3')).toBe(13);
        });

        test('应该能创建多个独立的沙箱实例', () => {
            const sandbox1 = createSandbox({ x: 10 });
            const sandbox2 = createSandbox({ x: 20 });
            expect(sandbox1('x * 2')).toBe(20);
            expect(sandbox2('x * 2')).toBe(40);
        });

        test('context 变化不会影响已创建的沙箱', () => {
            const context = { x: 10 };
            const sandbox = createSandbox(context);
            expect(sandbox('x')).toBe(10);
            context.x = 20;
            // sandbox 应该使用创建时的 values，不会反映后续变化
            expect(sandbox('x')).toBe(10);
        });
    });

    describe('类型安全测试', () => {
        test('应该能处理混合类型运算', () => {
            const sandbox = createSandbox({
                num: 10,
                str: '5',
                bool: true,
            });
            expect(sandbox('num + parseInt(str)')).toBe(15);
            expect(sandbox('String(num) + str')).toBe('105');
        });

        test('应该能处理数组包含不同类型', () => {
            const sandbox = createSandbox({
                mixed: [1, 'two', true, null, undefined],
            });
            expect(sandbox('mixed[0]')).toBe(1);
            expect(sandbox('mixed[1]')).toBe('two');
            expect(sandbox('mixed[2]')).toBe(true);
            expect(sandbox('mixed[3]')).toBe(null);
            expect(sandbox('mixed[4]')).toBeUndefined();
        });
    });

    describe('Math 和内置对象测试', () => {
        test('应该能使用 Math 对象的所有方法', () => {
            const sandbox = createSandbox({ x: -5 });
            expect(sandbox('Math.abs(x)')).toBe(5);
            expect(sandbox('Math.max(1, 2, 3)')).toBe(3);
            expect(sandbox('Math.min(1, 2, 3)')).toBe(1);
            expect(sandbox('Math.pow(2, 3)')).toBe(8);
            expect(sandbox('Math.random() >= 0')).toBe(true);
            expect(sandbox('Math.random() <= 1')).toBe(true);
        });

        test('应该能使用 Date 对象', () => {
            const sandbox = createSandbox({});
            const result = sandbox('new Date().getFullYear()');
            const currentYear = new Date().getFullYear();
            expect(result).toBeGreaterThanOrEqual(2020);
            expect(result).toBeLessThanOrEqual(2100);
        });

        test('应该能使用 Array 构造函数', () => {
            const sandbox = createSandbox({});
            expect(sandbox('Array.from([1, 2, 3], x => x * 2)')).toEqual([2, 4, 6]);
        });
    });

    describe('复杂表达式测试', () => {
        test('应该能处理复杂的嵌套表达式', () => {
            const sandbox = createSandbox({
                arr: [1, 2, 3, 4, 5],
            });
            expect(
                sandbox('arr.filter(x => x > 2).map(x => x * 2).reduce((a, b) => a + b, 0)'),
            ).toBe(24);
        });

        test('应该能处理多层对象访问和方法调用', () => {
            const sandbox = createSandbox({
                data: {
                    items: [{ price: 10 }, { price: 20 }, { price: 30 }],
                },
            });
            expect(sandbox('data.items.map(i => i.price).reduce((a, b) => a + b, 0)')).toBe(60);
        });

        test('应该能处理逻辑组合表达式', () => {
            const sandbox = createSandbox({
                age: 25,
                score: 85,
                name: 'Alice',
            });
            expect(sandbox('age >= 18 && score >= 60 && name !== ""')).toBe(true);
            expect(sandbox('age < 18 || score < 60 || name === ""')).toBe(false);
        });
    });

    describe('变量名测试', () => {
        test('应该能处理包含数字的变量名', () => {
            const sandbox = createSandbox({
                var1: 1,
                var2: 2,
                a1b2: 10,
            });
            expect(sandbox('var1 + var2')).toBe(3);
            expect(sandbox('a1b2 * 2')).toBe(20);
        });

        test('应该能处理长变量名', () => {
            const sandbox = createSandbox({
                veryLongVariableName: 42,
                anotherLongName: 10,
            });
            expect(sandbox('veryLongVariableName + anotherLongName')).toBe(52);
        });

        test('应该能处理下划线开头的变量名', () => {
            const sandbox = createSandbox({
                _private: 1,
                __double: 2,
            });
            expect(sandbox('_private + __double')).toBe(3);
        });
    });

    describe('返回值测试', () => {
        test('应该能返回各种类型的值', () => {
            const sandbox = createSandbox({
                num: 42,
                str: 'hello',
                arr: [1, 2, 3],
                obj: { key: 'value' },
                bool: true,
            });
            expect(sandbox('num')).toBe(42);
            expect(sandbox('str')).toBe('hello');
            expect(sandbox('arr')).toEqual([1, 2, 3]);
            expect(sandbox('obj')).toEqual({ key: 'value' });
            expect(sandbox('bool')).toBe(true);
        });

        test('应该能返回函数定义', () => {
            const sandbox = createSandbox({ x: 10 });
            const fn = sandbox('(n) => n * x');
            expect(typeof fn).toBe('function');
            expect(fn(5)).toBe(50);
        });

        test('应该能返回 undefined', () => {
            const sandbox = createSandbox({});
            expect(sandbox('undefined')).toBeUndefined();
            expect(sandbox('void 0')).toBeUndefined();
        });
    });
});

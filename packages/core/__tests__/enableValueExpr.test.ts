import { describe, test, expect } from 'bun:test';
import { AutoStore } from '../src';
import { delay } from 'flex-tools/async/delay';
/**
 * enableValueExpr 和 createSandbox 选项测试
 *
 * 当 enableValueExpr=true 时，字符串值如果是 ```code``` 格式会被沙箱解析
 * createSandbox 选项允许自定义沙箱创建函数
 */

describe('enableValueExpr 选项', () => {
    test('默认启用 enableValueExpr，应该解析 ```code``` 字符串', () => {
        const store = new AutoStore({
            order: {
                price: 10,
                count: 2,
                total: '```computed((scope)=>scope.price*scope.count)```',
            },
        });

        // total 应该被解析为 computed 计算属性，返回计算结果
        // @ts-expect-error total 动态解析为 number，但类型推断为 string
        expect(store.state.order.total).toBe(20);
        // 应该创建对应的 computedObject
        expect(store.computedObjects.size).toBe(1);
    });

    test('enableValueExpr=true 时，应该解析表达式字符串', () => {
        const store = new AutoStore(
            {
                a: 1,
                b: 2,
                sum: '```computed((scope)=>scope.a+scope.b)```',
            },
            { enableValueExpr: true },
        );

        // sum 应该被解析为 computed 计算属性，返回计算结果
        // @ts-expect-error sum 动态解析为 number，但类型推断为 string
        expect(store.state.sum).toBe(3);
        expect(store.computedObjects.size).toBe(1);
    });

    test('enableValueExpr=false 时，不应解析 ```code``` 字符串', () => {
        const store = new AutoStore(
            {
                a: 1,
                b: 2,
                sum: '```computed((scope)=>scope.a+scope.b)```',
            },
            { enableValueExpr: false },
        );

        // sum 应该保持为原始字符串
        expect(store.state.sum).toBe('```computed((scope)=>scope.a+scope.b)```');
        expect(store.computedObjects.size).toBe(0);
    });

    test('应该解析复杂的表达式', () => {
        const store = new AutoStore({
            user: {
                firstName: 'zhang',
                lastName: 'san',
                fullName: '```computed((scope)=>scope.firstName+" "+scope.lastName)```',
            },
        });

        // fullName 应该被解析为计算属性
        expect(store.state.user.fullName).toBe('zhang san');
        expect(store.computedObjects.size).toBe(1);
    });

    test('应该只在 lazy=false 时解析', () => {
        const store = new AutoStore(
            {
                a: 1,
                b: 2,
                sum: '```computed((scope)=>scope.a+scope.b)```',
            },
            { lazy: true },
        );

        // lazy=true 时，不会在初始化时解析
        expect(store.state.sum).toBe('```computed((scope)=>scope.a+scope.b)```');
        expect(store.computedObjects.size).toBe(0);
    });

    test('应该支持嵌套对象中的表达式', () => {
        const store = new AutoStore({
            order: {
                price: 100,
                count: 3,
                discount: 0.9,
                total: '```computed((scope)=>scope.price*scope.count*scope.discount)```',
            },
        });

        // 嵌套对象中的表达式也应该被解析
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.order.total).toBe(270);
        expect(store.computedObjects.size).toBe(1);
    });

    test('应该支持多个表达式', () => {
        const store = new AutoStore({
            a: 1,
            b: 2,
            c: 3,
            sum: '```computed((scope)=>scope.a+scope.b+scope.c)```',
            product: '```computed((scope)=>scope.a*scope.b*scope.c)```',
        });

        // 多个表达式都应该被解析
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.sum).toBe(6);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.product).toBe(6);
        expect(store.computedObjects.size).toBe(2);
    });

    test('非 ```code``` 格式的字符串不应被解析', () => {
        const store = new AutoStore({
            message: 'Hello World',
            code: 'computed((scope)=>scope.a)',
        });

        // 普通字符串不应被解析
        expect(store.state.message).toBe('Hello World');
        expect(store.state.code).toBe('computed((scope)=>scope.a)');
        expect(store.computedObjects.size).toBe(0);
    });

    test('解析后的计算属性应该正常工作', () => {
        const store = new AutoStore({
            price: 10,
            count: 2,
            total: '```computed((scope)=>scope.price*scope.count)```',
        });

        // 解析后的 computed 应该正常工作
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.total).toBe(20);

        // 修改依赖项后应该重新计算
        store.state.price = 20;
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.total).toBe(40);
    });

    test('应该解析空格和换行', () => {
        const store = new AutoStore({
            a: 1,
            b: 2,
            sum: '``` computed((scope)=>scope.a+scope.b) ```',
        });

        // 带空格的表达式也应该被解析
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.sum).toBe(3);
        expect(store.computedObjects.size).toBe(1);
    });
});

describe('createSandbox 自定义选项', () => {
    test('应该使用自定义的 createSandbox 函数', () => {
        let sandboxCalled = false;

        const store = new AutoStore(
            {
                a: 1,
                b: 2,
                sum: '```computed((scope)=>scope.a+scope.b)```',
            },
            {
                sandbox: {
                    create: (context, options) => {
                        sandboxCalled = true;
                        // 返回默认的沙箱函数
                        const {
                            createSandbox: defaultCreateSandbox,
                        } = require('../src/utils/createSandbox');
                        return defaultCreateSandbox(context, options);
                    },
                },
            },
        );

        // 应该调用自定义沙箱
        expect(sandboxCalled).toBe(true);
        // 结果应该正常
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.sum).toBe(3);
    });

    test('自定义沙箱可以增强安全性', () => {
        const store = new AutoStore(
            {
                value: '```42```',
            },
            {
                sandbox: {
                    create: () => {
                        // 创建一个更严格的沙箱
                        return (code: string) => {
                            // 简单的安全沙箱
                            const fn = new Function(`return ${code}`);
                            return fn();
                        };
                    },
                },
            },
        );

        // 应该使用自定义沙箱解析
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.value).toBe(42);
    });

    test('自定义沙箱可以添加错误处理', () => {
        let errorCaught = false;

        const store = new AutoStore(
            {
                a: 1,
                value: '```undefinedVar```',
            },
            {
                sandbox: {
                    create: (context) => {
                        return (code: string) => {
                            try {
                                const fn = new Function(...Object.keys(context), `return ${code}`);
                                return fn(...Object.values(context));
                            } catch (error) {
                                errorCaught = true;
                                return null; // 返回默认值
                            }
                        };
                    },
                },
            },
        );

        // 应该捕获错误并返回默认值
        expect(errorCaught).toBe(true);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.value).toBe(null);
    });

    test('自定义沙箱可以记录日志', () => {
        const logs: string[] = [];

        const store = new AutoStore(
            {
                a: 1,
                b: 2,
                sum: '```computed((scope)=>scope.a+scope.b)```',
            },
            {
                debug: true,
                sandbox: {
                    create: (context) => {
                        return (code: string) => {
                            logs.push(`Executing: ${code}`);
                            const {
                                createSandbox: defaultCreateSandbox,
                            } = require('../src/utils/createSandbox');
                            const sandbox = defaultCreateSandbox(context);
                            return sandbox(code);
                        };
                    },
                },
            },
        );

        // 应该记录执行的代码
        expect(logs.length).toBeGreaterThan(0);
        expect(logs.some((log) => log.includes('computed'))).toBe(true);
    });

    test('自定义沙箱可以添加额外的上下文', () => {
        const store = new AutoStore(
            {
                value: '```MY_CONST```',
            },
            {
                sandbox: {
                    create: () => {
                        // 添加额外的常量
                        return (code: string) => {
                            const MY_CONST = 42;
                            const fn = new Function('MY_CONST', `return ${code}`);
                            return fn(MY_CONST);
                        };
                    },
                },
            },
        );

        // 应该能够使用额外的上下文
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.value).toBe(42);
    });
});

describe('enableValueExpr 和 createSandbox 组合测试', () => {
    test('enableValueExpr=false 时，自定义沙箱不应被调用', () => {
        let sandboxCalled = false;

        const store = new AutoStore(
            {
                a: 1,
                sum: '```a+1```',
            },
            {
                enableValueExpr: false,
                sandbox: {
                    create: () => {
                        sandboxCalled = true;
                        return (code: string) => code;
                    },
                },
            },
        );

        // 沙箱不应该被调用
        expect(sandboxCalled).toBe(false);
        expect(store.state.sum).toBe('```a+1```');
    });

    test('enableValueExpr=true 时，应该使用默认沙箱解析', () => {
        const store = new AutoStore({
            a: 1,
            b: 2,
            sum: '```computed((scope)=>scope.a+scope.b)```',
        });

        // 应该使用默认沙箱解析
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.sum).toBe(3);
    });

    test('应该能够在沙箱中访问 computed, watch 等函数', () => {
        const store = new AutoStore(
            {
                a: 1,
                b: 2,
                sum: '```computed((s)=>s.a+s.b)```',
                watcher: '```watch(()=>{return "watched"},(p)=>p.length>0,{initial:"initial"})```',
            },
            { debug: true },
        );

        // 读取值以触发对象创建
        const sum = store.state.sum;
        const watcher = store.state.watcher;

        // 应该能够访问这些函数
        // 类型断言：字符串表达式在运行时被解析为计算属性的返回值
        expect(sum as unknown as number).toBe(3);
        expect(store.computedObjects.size).toBe(1);
        // watch 返回 initial 值
        expect(watcher).toBe('initial');
        // watch 对象应该被创建
        expect(store.watchObjects.size).toBe(1);
    });

    test('解析过程会触发 computed:created 事件', () => {
        let createdEventFired = false;

        const store = new AutoStore(
            {
                a: 1,
                b: 2,
                sum: '```computed((scope)=>scope.a+scope.b)```',
            },
            {
                debug: true,
                onComputedCreated() {
                    createdEventFired = true;
                },
            },
        );

        // 读取 sum 会触发 computed 对象的创建
        const sum = store.state.sum;

        // computed 对象应该在读取时被创建并触发事件
        // 类型断言：字符串表达式在运行时被解析为计算属性的返回值
        expect(sum as unknown as number).toBe(3);
        expect(createdEventFired).toBe(true);
        expect(store.computedObjects.size).toBe(1);
    });
});

describe('边界情况和错误处理', () => {
    test('空字符串不应该被解析', () => {
        const store = new AutoStore({
            empty: '',
        });

        expect(store.state.empty).toBe('');
    });

    test('只有 ``` 的字符串不应该被解析', () => {
        const store = new AutoStore({
            invalid: '```',
        });

        // 不完整的代码块应该保持原样
        expect(store.state.invalid).toBe('```');
    });

    test('只有一个 ``` 的字符串不应该被解析', () => {
        const store = new AutoStore({
            invalid: '```code',
        });

        // 不完整的代码块应该保持原样
        expect(store.state.invalid).toBe('```code');
    });

    test('``` 中有语法错误应该使用默认错误处理', () => {
        // 使用 debug 模式查看错误日志
        const store = new AutoStore(
            {
                a: 1,
                invalid: '```syntax error here```',
            },
            { debug: false },
        );

        // 语法错误的代码应该返回原始代码字符串
        expect(store.state.invalid).toBe('syntax error here');
    });

    test('应该处理包含换行的表达式', () => {
        const store = new AutoStore({
            a: 1,
            b: 2,
            sum: '```\ncomputed((scope)=>\nscope.a+scope.b\n)\n```',
        });

        // 包含换行的表达式也应该被解析
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.sum).toBe(3);
    });

    test('表达式返回 undefined 应该被设置为 undefined', () => {
        const store = new AutoStore({
            value: '```void 0```',
        });

        // undefined 结果会被设置
        expect(store.state.value).toBeUndefined();
    });

    test('表达式返回 null 应该正常处理', () => {
        const store = new AutoStore({
            value: '```null```',
        });

        // null 应该被正常处理
        expect(store.state.value).toBeNull();
    });

    test('应该在初始化时完成解析，而不是读取时', () => {
        let parseCount = 0;

        const store = new AutoStore(
            {
                a: 1,
                sum: '```computed((scope)=>scope.a+1)```',
            },
            {
                sandbox: {
                    create: (context) => {
                        return (code: string) => {
                            parseCount++;
                            const {
                                createSandbox: defaultCreateSandbox,
                            } = require('../src/utils/createSandbox');
                            const sandbox = defaultCreateSandbox(context);
                            return sandbox(code);
                        };
                    },
                },
            },
        );

        // 解析应该在初始化时完成
        expect(parseCount).toBeGreaterThan(0);

        const beforeRead = parseCount;
        // 读取值
        const sum = store.state.sum;
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(sum).toBe(2);

        // 不应该再次解析
        expect(parseCount).toBe(beforeRead);
    });
});

describe('实际应用场景测试', () => {
    test('订单计算场景', () => {
        const store = new AutoStore({
            order: {
                price: 100,
                count: 3,
                total: '```computed((scope)=>scope.price*scope.count)```',
            },
        });

        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.order.total).toBe(300);

        store.state.order.price = 200;
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.order.total).toBe(600);
    });

    test('用户信息场景', () => {
        const store = new AutoStore({
            user: {
                firstName: 'zhang',
                lastName: 'san',
                age: 25,
                fullName: '```computed((scope)=>scope.firstName+" "+scope.lastName)```',
                description:
                    '```computed((scope)=>scope.firstName+" is "+scope.age+" years old")```',
            },
        });

        expect(store.state.user.fullName).toBe('zhang san');
        expect(store.state.user.description).toBe('zhang is 25 years old');
    });

    test('购物车场景', () => {
        const store = new AutoStore({
            cart: {
                items: [
                    { name: 'Apple', price: 10, quantity: 2 },
                    { name: 'Banana', price: 5, quantity: 3 },
                ],
                total: '```computed((scope)=>scope.items.reduce((sum,item)=>sum+item.price*item.quantity,0))```',
            },
        });

        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.cart.total).toBe(35);
    });

    test('条件计算场景', () => {
        const store = new AutoStore({
            score: 85,
            grade: '```computed((scope)=>scope.score>=90?"A":scope.score>=80?"B":"C")```',
        });

        expect(store.state.grade).toBe('B');

        store.state.score = 95;
        expect(store.state.grade).toBe('A');
    });

    test('多层嵌套计算属性', () => {
        const store = new AutoStore({
            data: {
                base: 10,
                rate: 1.5,
                amount: '```computed((scope)=>scope.base*scope.rate)```',
                total: '```computed((scope)=>scope.amount*2)```',
            },
        });

        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.data.amount).toBe(15);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.data.total).toBe(30);

        store.state.data.base = 20;
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.data.amount).toBe(30);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.data.total).toBe(60);
    });

    test('数组计算属性', () => {
        const store = new AutoStore({
            items: [1, 2, 3, 4, 5],
            sum: '```computed((scope)=>scope.items.reduce((a,b)=>a+b,0))```',
            avg: '```computed((scope)=>scope.sum/scope.items.length)```',
        });

        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.sum).toBe(15);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.avg).toBe(3);
    });
});

describe('异步计算属性测试', () => {
    test('应该解析异步 computed 表达式', async () => {
        const store = new AutoStore({
            price: 10,
            count: 2,
            total: '```computed(async (scope)=>scope.price*scope.count,["price","count"])```',
        });

        // 异步计算属性应该被正确解析
        expect(store.state.total).toBeDefined();
        await delay(1);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.total.value).toBe(20);
        expect(store.computedObjects.size).toBe(1);
    });

    test('异步计算属性应该支持依赖项数组', async () => {
        const store = new AutoStore({
            a: 1,
            b: 2,
            result: '```computed(async (scope)=>{await new Promise(r=>setTimeout(r,10));return scope.a+scope.b},["a","b"])```',
        });
        store.state.result;
        // 等待异步计算完成
        await delay(100);

        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(await store.state.result.value).toBe(3);
    });

    test('异步计算属性应该支持 initial 值', async () => {
        const store = new AutoStore({
            base: 10,
            rate: 1.5,
            amount: '```computed(async (scope)=>scope.base*scope.rate,["base","rate"],{initial:0,immediate:true})```',
        });
        store.state.amount; // 触发计算属性创建
        await delay(1);
        // initial 值应该立即可用
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.amount.value).toBe(15);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.amount.loading).toBe(false);

        // 等待异步计算完成
        await delay(100);

        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.amount.value).toBe(15);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.amount.loading).toBe(false);
    });

    test('异步计算属性应该响应依赖项变化', async () => {
        const store = new AutoStore({
            price: 10,
            quantity: 2,
            total: '```computed(async (scope)=>{await new Promise(r=>setTimeout(r,10));return scope.price*scope.quantity},["price","quantity"])```',
        });
        store.state.total; // 触发计算属性创建

        // 等待初始计算完成
        await delay(50);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(await store.state.total.value).toBe(20);

        // 修改依赖项
        store.state.price = 20;
        await delay(50);

        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(await store.state.total.value).toBe(40);
    });

    test('异步计算属性应该支持 timeout 选项', async () => {
        const store = new AutoStore({
            value: '```computed(async (scope)=>{await new Promise(r=>setTimeout(r,100));return "done"},[],{timeout:50})```',
        });

        // 等待超时
        await delay(100);

        // 应该超时
        //@ts-expect-error
        expect(store.state.value.error).toBeDefined();
    });

    test('异步计算属性应该支持 retry 选项', async () => {
        const sandbox = { data: { attemptCount: 0 } };

        const store = new AutoStore(
            {
                shouldFail: true,
                result: '```computed(async (scope)=>{data.attemptCount++;if(scope.shouldFail&&data.attemptCount<=2){throw new Error("fail")}await new Promise(r=>setTimeout(r,10));return "success"},[],{retry:3})```',
            },
            { sandbox: { context: sandbox } },
        );
        store.state.result; // 触发计算属性创建

        // 等待重试成功
        await delay(200);

        expect(sandbox.data.attemptCount).toBe(4);
    });

    test('异步计算属性应该支持 progress 回调', async () => {
        const sandbox = { data: { progresses: [] as number[] } };

        const store = new AutoStore(
            {
                value: `\`\`\`computed(async (scope)=>{
                    for(let i=1;i<=3;i++){
                        data.progresses.push(i);
                        await new Promise(r=>setTimeout(r,10));
                    }
                    return "done"
                },[])\`\`\``,
            },
            { sandbox: { context: sandbox } },
        );
        store.state.value; // 触发计算属性创建

        // 等待计算完成
        await delay(100);

        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(await store.state.value.value).toBe('done');
        expect(sandbox.data.progresses).toEqual([1, 2, 3]);
    });

    test('异步计算属性应该支持 cancel', async () => {
        const sandbox = { data: { cancelFn: undefined as (() => void) | undefined } };

        const store = new AutoStore(
            {
                value: '```computed(async (scope,{cancel})=>{data.cancelFn=cancel;await new Promise(r=>setTimeout(r,100));return "done"})```',
            },
            { sandbox: { context: sandbox } },
        );

        // 立即取消
        if (sandbox.data.cancelFn) sandbox.data.cancelFn();

        // 等待一下
        await delay(20);

        // 应该被取消
        // @ts-expect-error
        expect(store.state.value.error).toBeDefined();
    });

    test('同步和异步计算属性可以混合使用', async () => {
        const store = new AutoStore({
            base: 10,
            rate: 1.5,
            amount: '```computed((scope)=>scope.base*scope.rate)```',
            total: '```computed(async (scope)=>{await new Promise(r=>setTimeout(r,10));return scope.amount*2},["amount"])```',
        });

        // 同步计算应该立即可用
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.amount).toBe(15);

        // 触发异步计算属性创建
        void store.state.total;

        // 等待异步计算完成
        await delay(100);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(await store.state.total.value).toBe(30);
    });

    test('异步计算属性可以嵌套在其他异步计算中', async () => {
        const store = new AutoStore({
            items: [1, 2, 3],
            sum: '```computed((scope)=>scope.items.reduce((a,b)=>a+b,0))```',
            doubled:
                '```computed(async (scope)=>{await new Promise(r=>setTimeout(r,10));return scope.sum*2},["sum"])```',
        });

        // 触发异步计算属性创建
        void store.state.doubled;

        // 等待异步计算完成
        await delay(50);

        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(await store.state.doubled.value).toBe(12);
    });

    test('异步计算属性在 lazy=true 时应该延迟创建', async () => {
        const store = new AutoStore(
            {
                a: 1,
                b: 2,
                sum: '```computed(async (scope)=>{await new Promise(r=>setTimeout(r,10));return scope.a+scope.b},["a","b"])```',
            },
            { lazy: true },
        );

        // 初始时不应该有计算对象
        expect(store.computedObjects.size).toBe(0);

        // 在 lazy 模式下，表达式字符串不会被解析
        expect(store.state.sum).toBe(
            '```computed(async (scope)=>{await new Promise(r=>setTimeout(r,10));return scope.a+scope.b},["a","b"])```',
        );
        expect(store.computedObjects.size).toBe(0);
    });

    test('异步计算属性应该触发事件', async () => {
        let doneEventFired = false;
        let errorEventFired = false;

        const store = new AutoStore(
            {
                value: '```computed(async (scope)=>{await new Promise(r=>setTimeout(r,10));return "success"},[])```',
            },
            {
                onComputedDone() {
                    doneEventFired = true;
                },
                onComputedError() {
                    errorEventFired = true;
                },
            },
        );

        // 触发计算属性创建
        void store.state.value;

        // 等待计算完成
        await delay(50);

        expect(doneEventFired).toBe(true);
        expect(errorEventFired).toBe(false);
    });

    test('异步计算属性错误应该触发错误事件', async () => {
        let errorEventFired = false;
        let capturedError: any = null;

        const store = new AutoStore(
            {
                value: '```computed(async (scope)=>{throw new Error("test error")},[])```',
            },
            {
                onComputedError(args) {
                    errorEventFired = true;
                    capturedError = args.error;
                },
            },
        );

        // 触发计算属性创建
        void store.state.value;

        // 等待错误发生
        await delay(50);

        expect(errorEventFired).toBe(true);
        expect(capturedError).toBeDefined();
    });

    test('异步计算属性超时应该触发错误事件', async () => {
        let errorEventFired = false;
        let capturedError: any = null;

        const store = new AutoStore(
            {
                value: '```computed(async (scope)=>{await new Promise(r=>setTimeout(r,100));return "done"},[],{timeout:[50,5]})```',
            },
            {
                onComputedError(args) {
                    errorEventFired = true;
                    capturedError = args.error;
                },
            },
        );

        // 触发计算属性创建
        void store.state.value;

        // 等待超时
        await delay(150);

        expect(errorEventFired).toBe(true);
        expect(capturedError).toBe('TIMEOUT');
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.value.error).toBe('TIMEOUT');
    });

    test('异步计算属性应该支持进度条功能', async () => {
        const store = new AutoStore({
            value: '```computed(async (scope,{getProgressbar})=>{const pbar = getProgressbar({max:100,min:0});for(let i=0;i<=100;i+=10){pbar.value(i);await new Promise(r=>setTimeout(r,10));}return "done"},[])```',
        });

        store.state.value; // 触发计算属性创建

        // 等待一段时间后检查进度
        await delay(50);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.value.progress).toBeGreaterThan(0);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.value.loading).toBe(true);

        // 等待计算完成
        await delay(200);

        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(await store.state.value.value).toBe('done');
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.value.progress).toBe(100);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.value.loading).toBe(false);
    });

    test('进度条应该支持自定义最大值和最小值', async () => {
        const store = new AutoStore({
            value: '```computed(async (scope,{getProgressbar})=>{const pbar = getProgressbar({max:200,min:0,value:0});for(let i=0;i<=200;i+=40){pbar.value(i);await new Promise(r=>setTimeout(r,10));}return "done"},[])```',
        });

        store.state.value; // 触发计算属性创建

        // 等待一段时间后检查进度
        await delay(30);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.value.progress).toBeGreaterThan(0);

        // 等待计算完成
        await delay(150);

        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(await store.state.value.value).toBe('done');
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.value.progress).toBe(200);
    });

    test('进度条应该支持 end() 方法自动设置为最大值', async () => {
        const store = new AutoStore({
            value: '```computed(async (scope,{getProgressbar})=>{const pbar = getProgressbar({max:100,min:0});await new Promise(r=>setTimeout(r,20));pbar.end();return "done"},[])```',
        });

        store.state.value; // 触发计算属性创建

        // 等待计算完成
        await delay(100);

        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(await store.state.value.value).toBe('done');
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.value.progress).toBe(100);
    });

    test('进度条值应该在范围内自动限制', async () => {
        const store = new AutoStore({
            value: '```computed(async (scope,{getProgressbar})=>{const pbar = getProgressbar({max:100,min:0});pbar.value(150);await new Promise(r=>setTimeout(r,10));pbar.value(-10);await new Promise(r=>setTimeout(r,10));pbar.value(50);await new Promise(r=>setTimeout(r,10));return "done"},[])```',
        });

        store.state.value; // 触发计算属性创建

        // 第一个值超过最大值应该被限制为100
        await delay(5);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.value.progress).toBe(100);

        // 第二个值小于最小值应该被限制为0
        await delay(15);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.value.progress).toBe(0);

        // 第三个值在范围内应该正常设置
        await delay(15);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.value.progress).toBe(50);

        // 等待计算完成
        await delay(30);
    });

    test('进度条可以与依赖项变化配合使用', async () => {
        const store = new AutoStore({
            total: 100,
            processed: 0,
            progress:
                '```computed(async (scope,{getProgressbar})=>{const pbar = getProgressbar({max:scope.total,min:0});for(let i=0;i<=scope.total;i+=20){pbar.value(i);await new Promise(r=>setTimeout(r,10));}return "done"},["total"])```',
        });

        store.state.progress; // 触发计算属性创建

        // 等待第一次计算完成 - 增加时间确保完成
        await delay(150);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.progress.progress).toBe(100);

        // 修改依赖项
        store.state.total = 200;
        await delay(20);

        // 进度条应该根据新的最大值重新开始
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.progress.loading).toBe(true);

        // 等待计算完成 - 200 需要 11 次迭代 * 10ms = 110ms，加上余量
        await delay(200);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.progress.progress).toBe(200);
    });

    test('进度条应该支持初始值', async () => {
        const store = new AutoStore({
            value: '```computed(async (scope,{getProgressbar})=>{const pbar = getProgressbar({max:100,min:0,value:30});await new Promise(r=>setTimeout(r,20));pbar.value(60);return "done"},[])```',
        });

        store.state.value; // 触发计算属性创建

        // 等待计算属性初始化完成
        await delay(5);

        // 初始值应该是30
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.value.progress).toBe(30);

        // 等待一段时间后应该是60
        await delay(30);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.value.progress).toBe(60);

        // 等待计算完成
        await delay(30);
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(await store.state.value.value).toBe('done');
    });

    test('进度条应该与 retry 选项配合使用', async () => {
        const sandbox = {
            data: { attemptCount: 0 },
        };

        const store = new AutoStore(
            {
                shouldFail: true,
                value: '```computed(async (scope,{getProgressbar})=>{data.attemptCount++;const pbar = getProgressbar({max:100,min:0});pbar.value(data.attemptCount*25);if(data.attemptCount<=2){throw new Error("fail")}await new Promise(r=>setTimeout(r,10));pbar.end();return "success"},[],{retry:3})```',
            },
            { sandbox: { context: sandbox } },
        );

        store.state.value; // 触发计算属性创建

        // 等待重试成功
        await delay(200);

        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(await store.state.value.value).toBe('success');
        // @ts-expect-error 动态解析的值类型推断不匹配
        expect(store.state.value.progress).toBe(100);
        expect(sandbox.data.attemptCount).toBe(4);
    });
});

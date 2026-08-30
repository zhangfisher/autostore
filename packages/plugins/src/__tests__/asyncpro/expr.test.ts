// oxlint-disable no-unused-expressions
// @ts-nocheck
import { describe, test, expect } from "bun:test";
import { AutoStore } from "autostore";
import { delay } from "flex-tools/async/delay";
import "../../asyncpro";

describe("异步计算属性测试", () => {
    test("应该解析异步 computed 表达式", async () => {
        const store = new AutoStore({
            price: 10,
            count: 2,
            total: '```asyncComputed(async (scope)=>scope.price*scope.count,["price","count"])```',
        });

        // 异步计算属性应该被正确解析
        expect(store.state.total).toBeDefined();
        await delay(1);
        // @ts-ignore
        expect(store.state.total.value).toBe(20);
        expect(store.computedObjects.size).toBe(1);
    });

    test("异步计算属性应该支持依赖项数组", async () => {
        const store = new AutoStore({
            a: 1,
            b: 2,
            result: '```asyncComputed(async (scope)=>{await new Promise(r=>setTimeout(r,10));return scope.a+scope.b},["a","b"])```',
        });
        store.state.result;
        // 等待异步计算完成
        await delay(100);
        // @ts-ignore
        expect(await store.state.result.value).toBe(3);
    });

    test("异步计算属性应该支持 initial 值", async () => {
        const store = new AutoStore({
            base: 10,
            rate: 1.5,
            amount: '```asyncComputed(async (scope)=>scope.base*scope.rate,["base","rate"],{initial:0,immediate:true})```',
        });
        store.state.amount; // 触发计算属性创建
        await delay(1);
        // initial 值应该立即可用
        // @ts-ignore
        expect(store.state.amount.value).toBe(15);
        // @ts-ignore
        expect(store.state.amount.loading).toBe(false);

        // 等待异步计算完成
        await delay(100);
        // @ts-ignore
        expect(store.state.amount.value).toBe(15);
        // @ts-ignore
        expect(store.state.amount.loading).toBe(false);
    });

    test("异步计算属性应该响应依赖项变化", async () => {
        const store = new AutoStore({
            price: 10,
            quantity: 2,
            total: '```asyncComputed(async (scope)=>{await new Promise(r=>setTimeout(r,10));return scope.price*scope.quantity},["price","quantity"])```',
        });
        store.state.total; // 触发计算属性创建

        // 等待初始计算完成
        await delay(50);

        expect(store.state.total.value).toBe(20);

        // 修改依赖项
        store.state.price = 20;
        await delay(50);

        expect(await store.state.total.value).toBe(40);
    });

    test("异步计算属性应该支持 timeout 选项", async () => {
        const store = new AutoStore({
            value: '```asyncComputed(async (scope)=>{await new Promise(r=>setTimeout(r,100));return "done"},[],{timeout:50})```',
        });

        // 等待超时
        await delay(100);

        // 应该超时
        //@ts-expect-error
        expect(store.state.value.error).toBeDefined();
    });

    test("异步计算属性应该支持 retry 选项", async () => {
        const sandbox = { data: { attemptCount: 0 } };

        const store = new AutoStore(
            {
                shouldFail: true,
                result: '```asyncComputed(async (scope)=>{data.attemptCount++;if(scope.shouldFail&&data.attemptCount<=2){throw new Error("fail")}await new Promise(r=>setTimeout(r,10));return "success"},[],{retry:3})```',
            },
            { sandbox: { context: sandbox } },
        );
        store.state.result; // 触发计算属性创建

        // 等待重试成功
        await delay(200);

        expect(sandbox.data.attemptCount).toBe(4);
    });

    test("异步计算属性应该支持 progress 回调", async () => {
        const sandbox = { data: { progresses: [] as number[] } };

        const store = new AutoStore(
            {
                value: `\`\`\`asyncComputed(async (scope)=>{
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

        expect(await store.state.value.value).toBe("done");
        expect(sandbox.data.progresses).toEqual([1, 2, 3]);
    });

    test("异步计算属性应该支持 cancel", async () => {
        const sandbox = { data: { cancelFn: undefined as (() => void) | undefined } };

        const store = new AutoStore(
            {
                value: '```asyncComputed(async (scope,{cancel})=>{data.cancelFn=cancel;await new Promise(r=>setTimeout(r,100));return "done"})```',
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

    test("同步和异步计算属性可以混合使用", async () => {
        const store = new AutoStore({
            base: 10,
            rate: 1.5,
            amount: "```computed((scope)=>scope.base*scope.rate)```",
            total: '```asyncComputed(async (scope)=>{await new Promise(r=>setTimeout(r,10));return scope.amount*2},["amount"])```',
        });

        // 同步计算应该立即可用

        expect(store.state.amount).toBe(15);

        // 触发异步计算属性创建
        void store.state.total;

        // 等待异步计算完成
        await delay(100);

        expect(await store.state.total.value).toBe(30);
    });

    test("异步计算属性可以嵌套在其他异步计算中", async () => {
        const store = new AutoStore({
            items: [1, 2, 3],
            sum: "```computed((scope)=>scope.items.reduce((a,b)=>a+b,0))```",
            doubled:
                '```asyncComputed(async (scope)=>{await new Promise(r=>setTimeout(r,10));return scope.sum*2},["sum"])```',
        });

        // 触发异步计算属性创建
        void store.state.doubled;

        // 等待异步计算完成
        await delay(50);

        expect(await store.state.doubled.value).toBe(12);
    });

    test("异步计算属性在 lazy=true 时应该延迟创建", async () => {
        const store = new AutoStore(
            {
                a: 1,
                b: 2,
                sum: '```asyncComputed(async (scope)=>{await new Promise(r=>setTimeout(r,10));return scope.a+scope.b},["a","b"])```',
            },
            { lazy: true },
        );

        // 初始时不应该有计算对象
        expect(store.computedObjects.size).toBe(0);

        // 在 lazy 模式下，表达式字符串不会被解析
        expect(store.state.sum).toBe(
            '```asyncComputed(async (scope)=>{await new Promise(r=>setTimeout(r,10));return scope.a+scope.b},["a","b"])```',
        );
        expect(store.computedObjects.size).toBe(0);
    });

    test("异步计算属性应该触发事件", async () => {
        let doneEventFired = false;
        let errorEventFired = false;

        const store = new AutoStore(
            {
                value: '```asyncComputed(async (scope)=>{await new Promise(r=>setTimeout(r,1));return "success"},[])```',
            },
            {
                onObserverDone() {
                    doneEventFired = true;
                },
                onObserverError() {
                    errorEventFired = true;
                },
            },
        );

        // 触发计算属性创建
        void store.state.value;

        // 等待计算完成
        await delay(100);

        expect(doneEventFired).toBe(true);
        expect(errorEventFired).toBe(false);
    });

    test("异步计算属性错误应该触发错误事件", async () => {
        let errorEventFired = false;
        let capturedError: any = null;

        const store = new AutoStore(
            {
                value: '```asyncComputed(async (scope)=>{throw new Error("test error")},[])```',
            },
            {
                onObserverError(args) {
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

    test("异步计算属性超时应该触发错误事件", async () => {
        let errorEventFired = false;
        let capturedError: any = null;

        const store = new AutoStore(
            {
                value: '```asyncComputed(async (scope)=>{await new Promise(r=>setTimeout(r,100));return "done"},[],{timeout:[50,5]})```',
            },
            {
                onObserverError(args) {
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
        expect(capturedError).toBe("TIMEOUT");

        expect(store.state.value.error).toBe("TIMEOUT");
    });

    test("异步计算属性应该支持进度条功能", async () => {
        const store = new AutoStore({
            value: '```asyncComputed(async (scope,{getProgressbar})=>{const pbar = getProgressbar({max:100,min:0});for(let i=0;i<=100;i+=10){pbar.value(i);await new Promise(r=>setTimeout(r,10));}return "done"},[])```',
        });

        store.state.value; // 触发计算属性创建

        // 等待一段时间后检查进度
        await delay(50);

        expect(store.state.value.progress).toBeGreaterThan(0);

        expect(store.state.value.loading).toBe(true);

        // 等待计算完成
        await delay(200);

        expect(await store.state.value.value).toBe("done");

        expect(store.state.value.progress).toBe(100);

        expect(store.state.value.loading).toBe(false);
    });

    test("进度条应该支持自定义最大值和最小值", async () => {
        const store = new AutoStore({
            value: '```asyncComputed(async (scope,{getProgressbar})=>{const pbar = getProgressbar({max:200,min:0,value:0});for(let i=0;i<=200;i+=40){pbar.value(i);await new Promise(r=>setTimeout(r,10));}return "done"},[])```',
        });

        store.state.value; // 触发计算属性创建

        // 等待一段时间后检查进度
        await delay(30);

        expect(store.state.value.progress).toBeGreaterThan(0);

        // 等待计算完成
        await delay(150);

        expect(await store.state.value.value).toBe("done");

        expect(store.state.value.progress).toBe(200);
    });

    test("进度条应该支持 end() 方法自动设置为最大值", async () => {
        const store = new AutoStore({
            value: '```asyncComputed(async (scope,{getProgressbar})=>{const pbar = getProgressbar({max:100,min:0});await new Promise(r=>setTimeout(r,20));pbar.end();return "done"},[])```',
        });

        store.state.value; // 触发计算属性创建

        // 等待计算完成
        await delay(100);

        expect(await store.state.value.value).toBe("done");

        expect(store.state.value.progress).toBe(100);
    });

    test("进度条值应该在范围内自动限制", async () => {
        const store = new AutoStore({
            value: '```asyncComputed(async (scope,{getProgressbar})=>{const pbar = getProgressbar({max:100,min:0});pbar.value(150);await new Promise(r=>setTimeout(r,10));pbar.value(-10);await new Promise(r=>setTimeout(r,10));pbar.value(50);await new Promise(r=>setTimeout(r,10));return "done"},[])```',
        });

        store.state.value; // 触发计算属性创建

        // 第一个值超过最大值应该被限制为100
        await delay(5);

        expect(store.state.value.progress).toBe(100);

        // 第二个值小于最小值应该被限制为0
        await delay(15);

        expect(store.state.value.progress).toBe(0);

        // 第三个值在范围内应该正常设置
        await delay(15);

        expect(store.state.value.progress).toBe(50);

        // 等待计算完成
        await delay(30);
    });

    test("进度条可以与依赖项变化配合使用", async () => {
        const store = new AutoStore({
            total: 100,
            processed: 0,
            progress:
                '```asyncComputed(async (scope,{getProgressbar})=>{const pbar = getProgressbar({max:scope.total,min:0});for(let i=0;i<=scope.total;i+=20){pbar.value(i);await new Promise(r=>setTimeout(r,10));}return "done"},["total"])```',
        });

        store.state.progress; // 触发计算属性创建

        // 等待第一次计算完成 - 增加时间确保完成
        await delay(150);

        expect(store.state.progress.progress).toBe(100);

        // 修改依赖项
        store.state.total = 200;
        await delay(20);

        // 进度条应该根据新的最大值重新开始

        expect(store.state.progress.loading).toBe(true);

        // 等待计算完成 - 200 需要 11 次迭代 * 10ms = 110ms，加上余量
        await delay(200);

        expect(store.state.progress.progress).toBe(200);
    });

    test("进度条应该支持初始值", async () => {
        const store = new AutoStore({
            value: '```asyncComputed(async (scope,{getProgressbar})=>{const pbar = getProgressbar({max:100,min:0,value:30});await new Promise(r=>setTimeout(r,20));pbar.value(60);return "done"},[])```',
        });

        store.state.value; // 触发计算属性创建

        // 等待计算属性初始化完成
        await delay(5);

        // 初始值应该是30

        expect(store.state.value.progress).toBe(30);

        // 等待一段时间后应该是60
        await delay(30);

        expect(store.state.value.progress).toBe(60);

        // 等待计算完成
        await delay(30);

        expect(await store.state.value.value).toBe("done");
    });
});

/// <reference types="bun" />
import { describe, test, expect } from "bun:test";
import { AutoStore, computed } from "autostore";
import { trace } from "../trace";

// 本地 delay，沿用 shadow.test.ts 风格，避免引入 autostore delay 默认 1000ms
const delay = (ms = 100) => new Promise((r) => setTimeout(r, ms));

describe("trace 插件", () => {
    test("通过 plugins:[trace] 安装后挂载 store.trace 方法", () => {
        const store = new AutoStore({ count: 1 }, { plugins: [trace] });
        expect(typeof store.trace).toBe("function");

        const tracker = store.trace(() => {}, "write");
        expect(typeof tracker.start).toBe("function");
        expect(typeof tracker.stop).toBe("function");
    });

    test("跟踪同步函数内的写操作", async () => {
        const store = new AutoStore(
            { count: 1, name: "tom" },
            { plugins: [trace] },
        );
        const tracker = store.trace(() => {
            store.state.count = 2;
            store.state.name = "jerry";
        }, "write");

        const ops = await tracker.start();

        expect(ops.length).toBe(2);
        expect(ops[0]!.type).toBe("set");
        expect(ops[0]!.path.join(".")).toBe("count");
        expect(ops[0]!.value).toBe(2);
        expect(ops[0]!.oldValue).toBe(1);
        expect(ops[1]!.path[0]).toBe("name");
        expect(ops[1]!.value).toBe("jerry");
    });

    test("默认 operates='*' 同时捕获读和写操作", async () => {
        const store = new AutoStore({ count: 1 }, { plugins: [trace] });
        const tracker = store.trace(() => {
            const _ = store.state.count; // 触发 get
            store.state.count = 2; // 触发 set
        });

        const ops = await tracker.start();

        expect(ops.length).toBe(2);
        expect(ops[0]!.type).toBe("get");
        expect(ops[1]!.type).toBe("set");
    });

    test("operates:'write' 过滤掉读操作", async () => {
        const store = new AutoStore({ count: 1 }, { plugins: [trace] });
        const tracker = store.trace(
            () => {
                const _ = store.state.count; // get 被过滤
                store.state.count = 2;
            },
            "write",
        );

        const ops = await tracker.start();

        expect(ops.length).toBe(1);
        expect(ops[0]!.type).toBe("set");
    });

    test("operates 指定类型数组仅跟踪匹配类型", async () => {
        const store = new AutoStore(
            { count: 1, items: [1, 2, 3] },
            { plugins: [trace] },
        );
        const tracker = store.trace(
            () => {
                store.state.count = 2; // set，被过滤
                store.state.items.push(4); // insert，匹配
            },
            ["insert"],
        );

        const ops = await tracker.start();

        expect(ops.length).toBe(1);
        expect(ops[0]!.type).toBe("insert");
    });

    test("isStop 回调在匹配时提前停止跟踪", async () => {
        const store = new AutoStore(
            { a: 0, b: 0, c: 0 },
            { plugins: [trace] },
        );
        const tracker = store.trace(
            () => {
                store.state.a = 1;
                store.state.b = 2;
                store.state.c = 3;
            },
            "write",
        );

        // 当 path[0]==="b" 时停止，c 不应被收集
        const ops = await tracker.start((op) => op.path[0] === "b");

        expect(ops.length).toBe(2);
        expect(ops[0]!.path[0]).toBe("a");
        expect(ops[1]!.path[0]).toBe("b");
        expect(ops.find((op) => op.path[0] === "c")).toBeUndefined();
    });

    test("跟踪异步函数内的操作", async () => {
        const store = new AutoStore(
            { count: 1, name: "tom" },
            { plugins: [trace] },
        );
        const tracker = store.trace(
            async () => {
                await delay(50);
                store.state.count = 2;
                await delay(50);
                store.state.name = "jerry";
            },
            "write",
        );

        const ops = await tracker.start();

        expect(ops.length).toBe(2);
        expect(ops[0]!.path[0]).toBe("count");
        expect(ops[1]!.path[0]).toBe("name");
    });

    test("stop() 手动停止后不再收集操作", async () => {
        const store = new AutoStore({ count: 1 }, { plugins: [trace] });
        const tracker = store.trace(
            async () => {
                await delay(50);
                store.state.count = 2;
            },
            "write",
        );

        const p = tracker.start();
        tracker.stop(); // watcher 已在 start() 的 executor 内同步创建，立即 off
        const ops = await p;

        // stop 后 set 不再进入 ops
        expect(ops.length).toBe(0);
    });

    test("跟踪嵌套路径的写操作", async () => {
        const store = new AutoStore(
            { user: { name: "tom" } },
            { plugins: [trace] },
        );
        const tracker = store.trace(
            () => {
                store.state.user.name = "jerry";
            },
            "write",
        );

        const ops = await tracker.start();

        expect(ops.length).toBe(1);
        expect(ops[0]!.type).toBe("set");
        expect(ops[0]!.path.join(".")).toBe("user.name");
        expect(ops[0]!.oldValue).toBe("tom");
        expect(ops[0]!.value).toBe("jerry");
    });

    test("跟踪数组 push 操作", async () => {
        const store = new AutoStore(
            { items: [1, 2, 3] },
            { plugins: [trace] },
        );
        const tracker = store.trace(() => {
            store.state.items.push(4);
        });

        const ops = await tracker.start();

        expect(ops.length).toBeGreaterThanOrEqual(1);
        const insertOp = ops.find((op) => op.type === "insert");
        expect(insertOp).toBeDefined();
        expect(insertOp!.path[0]).toBe("items");
    });

    test("空函数跟踪返回空数组", async () => {
        const store = new AutoStore({ count: 1 }, { plugins: [trace] });
        const tracker = store.trace(() => {}, "write");

        const ops = await tracker.start();

        expect(ops.length).toBe(0);
    });

    test("跟踪同步计算属性的依赖链传播", async () => {
        const store = new AutoStore(
            {
                sync: {
                    a: 1,
                    b: (scope: any) => scope.a + 1,
                    c: (scope: any) => scope.b + 1,
                    d: (scope: any) => scope.c + 1,
                    e: (scope: any) => scope.d + 1,
                    f: (scope: any) => scope.e + 1,
                    g: (scope: any) => scope.f + 1,
                    h: (scope: any) => scope.g + 1,
                },
            },
            { plugins: [trace] },
        );

        const tracker = store.trace(() => {
            store.state.sync.a = 2;
        }, "write");

        const operates = await tracker.start();

        expect(
            operates.map((op) => [op.type, op.path.join(".")]),
        ).toStrictEqual([
            ["set", "sync.a"],
            ["set", "sync.b"],
            ["set", "sync.c"],
            ["set", "sync.d"],
            ["set", "sync.e"],
            ["set", "sync.f"],
            ["set", "sync.g"],
            ["set", "sync.h"],
        ]);
    });

    test("跟踪异步计算属性的依赖链传播", async () => {
        const store = new AutoStore(
            {
                a0: 10,
                a1: computed(
                    async (scope: any) => {
                        await delay(1);
                        return scope.a0 + 1;
                    },
                    ["a0"],
                    { initial: 11 },
                ),
                a2: computed(
                    async (scope: any) => {
                        await delay(1);
                        return scope.a1.value + 1;
                    },
                    ["a1"],
                    { initial: 12 },
                ),
                a3: computed(
                    async (scope: any) => {
                        await delay(1);
                        return scope.a2.value + 1;
                    },
                    ["a2"],
                    { initial: 13 },
                ),
                a4: computed(
                    async (scope: any) => {
                        await delay(1);
                        return scope.a3.value + 1;
                    },
                    ["a3"],
                    { initial: 14 },
                ),
                a5: computed(
                    async (scope: any) => {
                        await delay(1);
                        return scope.a4.value + 1;
                    },
                    ["a4"],
                    { initial: 15 },
                ),
                a6: computed(
                    async (scope: any) => {
                        await delay(1);
                        return scope.a5.value + 1;
                    },
                    ["a5"],
                    { initial: 16 },
                ),
                a7: computed(
                    async (scope: any) => {
                        await delay(1);
                        return scope.a6.value + 1;
                    },
                    ["a6"],
                    { initial: 17 },
                ),
                a8: computed(
                    async (scope: any) => {
                        await delay(1);
                        return scope.a7.value + 1;
                    },
                    ["a7"],
                    { initial: 18 },
                ),
                a9: computed(
                    async (scope: any) => {
                        await delay(1);
                        return scope.a8.value + 1;
                    },
                    ["a8"],
                    { initial: 19 },
                ),
            },
            { plugins: [trace] },
        );

        const operates = await store
            .trace(() => {
                store.state.a0 = 2;
            }, "write")
            .start((operate) => operate.path[0] === "a9");

        expect(operates[operates.length - 1]!.path[0]).toBe("a9");
    });
});

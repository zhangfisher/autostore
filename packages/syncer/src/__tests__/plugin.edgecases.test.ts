/* eslint-disable @typescript-eslint/no-unused-vars */
/** biome-ignore-all lint/correctness/noUnusedVariables: <noUnusedVariables> */
import { describe, expect, test, vi } from "vitest";
import { computed, AutoStore } from "../../../core/src";
import "..";

describe("plugin 边界情况测试", () => {
    describe("store.clone 边界情况", () => {
        test("clone 非 object 类型路径应抛出错误", () => {
            const store = new AutoStore({
                value: 100,
            });

            // 尝试 clone 一个非 object 类型
            expect(() => {
                store.clone({ entry: "value" });
            }).toThrow("The clone path must be an object");
        });

        test("clone 空对象", () => {
            const store = new AutoStore({});
            const cloned = store.clone();

            expect(cloned.getSnap()).toEqual({});
            expect(cloned.getSnap()).toEqual(store.getSnap());
        });

        test("clone 时 sync: none 不创建同步", () => {
            const store = new AutoStore({
                user: {
                    name: "fisher",
                    age: 30,
                },
            });

            const cloned = store.clone({ sync: "none" });

            // 修改原 store，cloned 不应该同步
            store.state.user.name = "alice";
            expect(cloned.state.user.name).toBe("fisher");

            // 修改 cloned，原 store 不应该同步
            cloned.state.user.name = "bob";
            expect(store.state.user.name).toBe("alice");
        });

        test("clone 时 sync: forward 只向前同步", () => {
            const store = new AutoStore({
                user: {
                    name: "fisher",
                    age: 30,
                },
            });

            const cloned = store.clone({ sync: "forward" });

            // 原 store 修改应该同步到 cloned
            store.state.user.name = "alice";
            expect(cloned.state.user.name).toBe("alice");

            // cloned 修改不应该同步到原 store
            cloned.state.user.name = "bob";
            expect(store.state.user.name).toBe("alice");
        });

        test("clone 时 sync: backward 只向后同步", () => {
            const store = new AutoStore({
                user: {
                    name: "fisher",
                    age: 30,
                },
            });

            const cloned = store.clone({ sync: "backward" });

            // 原 store 修改不应该同步到 cloned
            store.state.user.name = "alice";
            expect(cloned.state.user.name).toBe("fisher");

            // cloned 修改应该同步到原 store
            cloned.state.user.name = "bob";
            expect(store.state.user.name).toBe("bob");
        });

        test("clone 保留原 store 的选项配置", () => {
            const store = new AutoStore(
                {
                    user: {
                        name: "fisher",
                    },
                },
                { id: "original" },
            );

            const cloned = store.clone();

            // cloned 会继承原 store 的配置
            // ID 会被继承
            expect(cloned.id).toBe(`${store.id}_clone`);
        });

        test("clone 部分路径时同步正确", () => {
            const store = new AutoStore({
                user: {
                    name: "fisher",
                    age: 30,
                },
                order: {
                    price: 100,
                    count: 2,
                },
            });

            const cloned = store.clone({ entry: "user" });

            // cloned 应该只包含 user 部分
            expect(cloned.getSnap()).toEqual({ name: "fisher", age: 30 });

            // 修改原 store 的 user 应该同步
            store.state.user.name = "alice";
            expect(cloned.state.name).toBe("alice");

            // 修改 cloned 应该同步到原 store 的 user
            cloned.state.age = 25;
            expect(store.state.user.age).toBe(25);

            // 修改原 store 的 order 不应该影响 cloned
            store.state.order.price = 200;
            expect(cloned.getSnap()).toEqual({ name: "alice", age: 25 });
        });

        test("clone 包含计算属性", () => {
            const store = new AutoStore({
                order: {
                    price: 100,
                    count: 2,
                    total: computed((order) => order.price * order.count),
                },
            });

            const cloned = store.clone();

            expect(cloned.state.order.total).toBe(200);

            // 修改原 store
            store.state.order.price = 150;
            expect(cloned.state.order.total).toBe(300);

            // 修改 cloned
            cloned.state.order.count = 3;
            expect(store.state.order.total).toBe(450);
        });

        test("clone 嵌套对象", () => {
            const store = new AutoStore({
                data: {
                    level1: {
                        level2: {
                            level3: {
                                value: 100,
                            },
                        },
                    },
                },
            });

            const cloned = store.clone();

            expect(cloned.getSnap()).toEqual(store.getSnap());

            store.state.data.level1.level2.level3.value = 200;
            expect(cloned.state.data.level1.level2.level3.value).toBe(200);

            cloned.state.data.level1.level2.level3.value = 300;
            expect(store.state.data.level1.level2.level3.value).toBe(300);
        });

        test("clone 数组类型", () => {
            const store = new AutoStore({
                items: [1, 2, 3, 4, 5],
            });

            const cloned = store.clone();

            expect(cloned.state.items).toEqual([1, 2, 3, 4, 5]);

            // 修改数组元素
            store.state.items[0] = 10;
            expect(cloned.state.items[0]).toBe(10);

            // 添加元素
            store.state.items.push(6);
            expect(cloned.state.items).toEqual([10, 2, 3, 4, 5, 6]);

            // 删除元素
            store.state.items.splice(1, 1);
            expect(cloned.state.items).toEqual([10, 3, 4, 5, 6]);
        });

        test("clone 混合类型状态", () => {
            const store = new AutoStore({
                stringValue: "test",
                numberValue: 100,
                booleanValue: true,
                nullValue: null,
                arrayValue: [1, 2, 3],
                objectValue: { a: 1, b: 2 } as { a: number; b: number; c?: number },
            });

            const cloned = store.clone();

            expect(cloned.getSnap()).toEqual(store.getSnap());

            // 修改各种类型
            store.state.stringValue = "updated";
            expect(cloned.state.stringValue).toBe("updated");

            store.state.numberValue = 200;
            expect(cloned.state.numberValue).toBe(200);

            store.state.booleanValue = false;
            expect(cloned.state.booleanValue).toBe(false);

            store.state.arrayValue.push(4);
            expect(cloned.state.arrayValue).toEqual([1, 2, 3, 4]);

            store.state.objectValue.c = 3;
            expect(cloned.state.objectValue).toEqual({ a: 1, b: 2, c: 3 });
        });
    });

    describe("store.sync 边界情况", () => {
        test("sync 到已同步的 store 会创建新的同步器", () => {
            const store1 = new AutoStore({
                value: 100,
            });
            const store2 = new AutoStore({
                value: 0,
            });
            const store3 = new AutoStore({
                value: 0,
            });

            // store1 同步到 store2
            const syncer1 = store1.sync(store2);
            // store1 同步到 store3
            const syncer2 = store1.sync(store3);

            // 两个同步器应该不同
            expect(syncer1).not.toBe(syncer2);

            // 修改 store1 应该同步到两个 store
            store1.state.value = 200;
            expect(store2.state.value).toBe(200);
            expect(store3.state.value).toBe(200);
        });

        test("sync 时指定 direction: forward", () => {
            const fromStore = new AutoStore({
                value: 100,
            });
            const toStore = new AutoStore({
                value: 0,
            });

            fromStore.sync(toStore, { direction: "forward" });

            // fromStore 修改应该同步到 toStore
            fromStore.state.value = 200;
            expect(toStore.state.value).toBe(200);

            // toStore 修改不应该同步到 fromStore
            toStore.state.value = 300;
            expect(fromStore.state.value).toBe(200);
        });

        test("sync 时指定 direction: backward", () => {
            const fromStore = new AutoStore({
                value: 100,
            });
            const toStore = new AutoStore({
                value: 100,
            });

            fromStore.sync(toStore, { direction: "backward" });

            // fromStore 修改不应该同步到 toStore (backward 只接收)
            fromStore.state.value = 200;
            expect(toStore.state.value).toBe(100);

            // toStore 修改应该同步到 fromStore (backward 接收对方发送)
            toStore.state.value = 300;
            expect(fromStore.state.value).toBe(300);
        });

        test("sync 时不立即同步，需要手工调用pull", () => {
            const fromStore = new AutoStore({
                value: 100,
            });
            const toStore = new AutoStore({});

            const syncer = toStore.sync(fromStore, { mode: "none" });

            // toStore 应该还是初始的空对象
            expect(toStore.getSnap()).toEqual({});

            // 手动 pull
            syncer.pull();
            // @ts-expect-error
            expect(toStore.state.value).toBe(100);
        });

        test("sync 空对象路径", () => {
            const store1 = new AutoStore({});
            const store2 = new AutoStore({});

            store1.sync(store2);

            // 添加新属性
            // @ts-expect-error
            store1.state.test = "value";
            // @ts-expect-error
            expect(store2.state.test).toBe("value");
        });
    });

    describe("sync 和 clone 组合使用", () => {
        test("先 clone 再 sync 到第三个 store", () => {
            const original = new AutoStore({
                user: {
                    name: "fisher",
                    age: 30,
                },
            });

            const cloned = original.clone();
            const third = new AutoStore();

            // cloned 同步到 third
            cloned.sync(third);

            cloned.state.user.name = "alice";
            // original 和 third 都应该更新
            expect(original.state.user.name).toBe("alice");
            expect(third.state.user.name).toBe("alice");
        });

        test("clone 部分再同步", () => {
            const original = new AutoStore({
                user: {
                    name: "fisher",
                    age: 30,
                },
                order: {
                    price: 100,
                },
            });

            const cloned = original.clone({ entry: "user" });
            const third = new AutoStore();

            cloned.sync(third);

            cloned.state.name = "alice";
            expect(original.state.user.name).toBe("alice");
            expect(third.state.name).toBe("alice");

            // original 的 order 不会影响 third
            original.state.order.price = 200;
            expect(third.state.order).toBeUndefined();
        });
    });

    describe("错误处理", () => {
        test("clone 不存在的路径应抛出错误", () => {
            const store = new AutoStore({
                value: 100,
            });

            // clone 一个不存在的路径(不是对象)
            expect(() => store.clone({ entry: "value" as any })).toThrow();
        });
    });
});

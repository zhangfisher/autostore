// oxlint-disable no-unused-expressions
import { AutoStore, delay } from "autostore";
import { describe, test, expect } from "bun:test";
import { watch } from "../../watch/watch"; 
import "../../watch"

    describe("watch 生命周期事件", () => {
        test("watch:created 事件在 WatchObject 创建时触发", () => {
            const createdEvents: any[] = [];

            const store = new AutoStore({
                count: 1,
            });

            store.on("observer/*/created", ({ observer }) => {
                createdEvents.push({
                    id: observer.id,
                    path: observer.path,
                });
            });

            // 动态添加 watch 属性
            store.update((state) => {
                // @ts-expect-error
                state.watchCount = watch(
                    ({ value }: any) => {
                        return value * 2;
                    },
                    (path: string[]) => path[path.length - 1] === "count",
                );
            });

            // 访问 watch 属性以触发 WatchObject 创建
            // @ts-expect-error
            store.state.watchCount;

            expect(createdEvents.length).toBe(1);
            expect(createdEvents[0].id).toBe("watchCount");
            expect(createdEvents[0].path).toEqual(["watchCount"]);
        });

        test("observer/*/done 事件在 WatchObject 执行成功后触发", async () => {
            const doneEvents: any[] = [];

            const store = new AutoStore({
                count: 1,
            });

            store.on("observer/*/done", (args) => {
                doneEvents.push({
                    path: args.observer.path,
                    value: args.value,
                });
            });

            // 动态添加 watch 属性
            store.update((state) => {
                // @ts-expect-error
                state.watchCount = watch(
                    ({ value }: any) => {
                        return value * 2;
                    },
                    (path: string[]) => path[path.length - 1] === "count",
                );
            });

            // 访问 watch 属性以触发 WatchObject 创建
            // @ts-expect-error
            store.state.watchCount;

            // 修改 count 以触发 watch 函数执行
            store.state.count = 5;
            await delay(0); // 等待事件处理

            expect(doneEvents.length).toBe(1);
            expect(doneEvents[0].value).toBe(10);
        });

        test("watch:error 事件在 WatchObject 执行出错时触发", async () => {
            const errorEvents: any[] = [];

            const store = new AutoStore({
                count: 1,
            });

            store.on("observer/*/error", (args) => {
                errorEvents.push({
                    path: args.observer.path,
                    error: args.error instanceof Error ? args.error.message : args.error,
                });
            });

            // 动态添加 watch 属性
            store.update((state) => {
                // @ts-expect-error
                state.watchCount = watch(
                    () => {
                        throw new Error("侦听器错误");
                    },
                    (path: string[]) => path[path.length - 1] === "count",
                );
            });

            // 访问 watch 属性以触发 WatchObject 创建
            // @ts-expect-error
            store.state.watchCount;

            // 修改 count 以触发 watch 函数执行
            store.state.count = 5;
            await delay(0);

            expect(errorEvents.length).toBe(1);
            expect(errorEvents[0].error).toBe("侦听器错误");
        });
    });


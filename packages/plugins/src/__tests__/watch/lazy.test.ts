// oxlint-disable no-unused-expressions
import { AutoStore } from "autostore";
import { describe, test, expect } from "bun:test";
import { watch } from "../../watch/watch"; 
import "../../watch"

describe("lazy=true时的watch功能测试", () => {
     test("lazy=true 时，watch 对象在读取时才创建", async () => {
        let watchCount = 0;

        const store = new AutoStore(
            {
                count: 1,
                watcher: watch(
                    () => {
                        watchCount++;
                        return watchCount;
                    },
                    (path) => path[path.length - 1] === "count",
                ),
            },
            { lazy: true },
        );

        // 初始时不应该有 watch 对象
        expect(store.watchObjects.size).toBe(0);

        // 读取 watcher 对象
        const watcher = store.state.watcher;
        expect(watchCount).toBe(0);
        expect(store.watchObjects.size).toBe(1);
        expect(store.watchObjects.get("watcher")?.id).toBe("watcher");

        // 修改依赖项
        store.state.count = 2;
        await new Promise((resolve) => setTimeout(resolve, 10));
        expect(watchCount).toBe(1);
    });

    test("lazy=true 时，混合计算属性和 watch 对象按需创建", async () => {
        let syncComputedExecuted = false;
        let watchExecuted = false;

        const store = new AutoStore(
            {
                value: 10,
                syncComputed: (scope: any) => {
                    syncComputedExecuted = true;
                    return scope.value * 2;
                },
                watcher: watch(
                    () => {
                        watchExecuted = true;
                        return watchExecuted;
                    },
                    (path) => path[path.length - 1] === "value",
                ),
            },
            { lazy: true },
        );

        // 初始时不应该有任何对象被创建
        expect(store.computedObjects.size).toBe(0);
        expect(store.watchObjects.size).toBe(0);
        expect(syncComputedExecuted).toBe(false);
        expect(watchExecuted).toBe(false);

        // 读取同步计算属性
        const result = store.state.syncComputed;
        expect(result).toBe(20);
        expect(syncComputedExecuted).toBe(true);
        expect(store.computedObjects.size).toBe(1);
        expect(store.watchObjects.size).toBe(0);

        // 读取 watch 对象
        const watcher = store.state.watcher;
        expect(watcher);
        expect(store.watchObjects.size).toBe(1);
        expect(store.computedObjects.size).toBe(1);

        // 修改依赖项，触发 watch
        store.state.value = 20;
        await new Promise((resolve) => setTimeout(resolve, 10));
        expect(watchExecuted).toBe(true);
    });

    test("lazy=true 时，不会触发 watch:created 事件直到读取", () => {
        let createdEventFired = false;
        const createdPaths: string[] = [];

        const store = new AutoStore(
            {
                count: 1,
                watcher1: watch(
                    () => 1,
                    (path) => path[path.length - 1] === "count",
                ),
                watcher2: watch(
                    () => 2,
                    (path) => path[path.length - 1] === "count",
                ),
            },
            {
                lazy: true,
                onObserverCreated({ observer: observerObject }) {
                    if (observerObject.type === "watch") {
                        createdEventFired = true;
                        createdPaths.push(observerObject.path.join("."));
                    }
                },
            },
        );

        // 初始时不应触发事件
        expect(createdEventFired).toBe(false);
        expect(createdPaths.length).toBe(0);

        // 读取第一个 watch 对象
        store.state.watcher1;

        expect(createdEventFired).toBe(true);
        expect(createdPaths).toContain("watcher1");

        // 读取第二个 watch 对象
        store.state.watcher2;
        expect(createdPaths).toContain("watcher2");
        // 由于 onObserverCreated 可能会被触发多次，我们只检查是否包含所需的路径
        expect(createdPaths.length).toBeGreaterThanOrEqual(2);
    });
});

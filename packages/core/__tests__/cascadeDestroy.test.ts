import { describe, test, expect } from "bun:test";
import { AutoStore, computed, watch } from "../src";

/**
 * 级联销毁观察对象特性（cascadeDestroy）测试
 *
 * 注：销毁操作经 setTimeout 异步执行，触发 delete 后须 await flush() 再断言。
 */
describe("cascadeDestroy 级联销毁观察对象", () => {
    /** 等待一次宏任务，使 cascadeDestroy 的 setTimeout flush 执行 */
    const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

    test("默认开启：删除依赖项时销毁计算对象", async () => {
        const store = new AutoStore({
            a: 1,
            b: 2,
            c: (scope: any) => scope.a + scope.b,
        });
        void store.state.c; // 触发创建
        const c = store.computedObjects.find(["c"]);
        expect(c).toBeDefined();
        delete (store.state as any).a;
        await flush();
        expect(store.computedObjects.find(["c"])).toBeUndefined();
        expect(c!.destroyed).toBe(true);
    });

    test("删除计算属性自身挂载路径时销毁", async () => {
        const store = new AutoStore({
            a: 1,
            c: (scope: any) => scope.a,
        });
        void store.state.c;
        const c = store.computedObjects.find(["c"]);
        expect(c).toBeDefined();
        delete (store.state as any).c;
        await flush();
        expect(store.computedObjects.find(["c"])).toBeUndefined();
        expect(c!.destroyed).toBe(true);
    });

    test("全局 cascadeDestroy=false 时不会自动销毁", async () => {
        const store = new AutoStore(
            {
                a: 1,
                c: (scope: any) => scope.a,
            },
            { cascadeDestroy: false },
        );
        void store.state.c;
        const c = store.computedObjects.find(["c"]);
        expect(c).toBeDefined();
        delete (store.state as any).a;
        await flush();
        expect(store.computedObjects.find(["c"])).toBeDefined();
        expect(c!.destroyed).toBe(false);
    });

    test("单个观察对象 cascadeDestroy=false 覆盖全局", async () => {
        const store = new AutoStore({
            a: 1,
            d: 2,
            // c 关闭自动销毁
            c: computed((scope: any) => scope.a + scope.d, { cascadeDestroy: false }),
            // e 正常（继承全局 true）
            e: (scope: any) => scope.a + scope.d,
        });
        void store.state.c;
        void store.state.e;
        delete (store.state as any).a;
        await flush();
        // c 保留
        expect(store.computedObjects.find(["c"])).toBeDefined();
        expect(store.computedObjects.find(["c"])!.destroyed).toBe(false);
        // e 被销毁
        expect(store.computedObjects.find(["e"])).toBeUndefined();
    });

    test("祖先路径删除会销毁后代依赖的观察对象", async () => {
        const store = new AutoStore({
            user: { name: "zhang" },
            // 顶层计算属性，scope=root，依赖自动收集为 ["user","name"]
            display: (scope: any) => scope.user.name,
        });
        void store.state.display;
        const d = store.computedObjects.find(["display"]);
        expect(d).toBeDefined();
        delete (store.state as any).user; // 删祖先 ["user"]
        await flush();
        expect(store.computedObjects.find(["display"])).toBeUndefined();
        expect(d!.destroyed).toBe(true);
    });

    test("删除更深子路径不会销毁仅依赖父路径的观察对象", async () => {
        const store = new AutoStore({
            user: { name: "zhang" },
            u: (scope: any) => scope.user, // 仅依赖 ["user"]
        });
        void store.state.u;
        const u = store.computedObjects.find(["u"]);
        expect(u).toBeDefined();
        delete (store.state as any).user.name; // 删后代
        await flush();
        expect(store.computedObjects.find(["u"])).toBeDefined();
        expect(u!.destroyed).toBe(false);
    });

    test("删除非依赖路径不会销毁观察对象", async () => {
        const store = new AutoStore({
            a: 1,
            x: 100,
            c: (scope: any) => scope.a,
        });
        void store.state.c;
        const c = store.computedObjects.find(["c"]);
        delete (store.state as any).x; // x 不是 c 的依赖
        await flush();
        expect(store.computedObjects.find(["c"])).toBeDefined();
        expect(c!.destroyed).toBe(false);
    });

    test("onObserverDestroyed 回调与 observer:destroyed 事件均触发一次", async () => {
        let cbCount = 0;
        let evtCount = 0;
        const store = new AutoStore(
            { a: 1, c: (scope: any) => scope.a },
            { onObserverDestroyed: () => cbCount++ },
        );
        store.on("observer:destroyed", () => evtCount++);
        void store.state.c;
        delete (store.state as any).a;
        await flush();
        expect(cbCount).toBe(1);
        expect(evtCount).toBe(1);
    });

    test("WatchObject 自身路径删除时销毁", async () => {
        const store = new AutoStore({
            a: 1,
            w: watch(() => 1, () => true, { initial: 0 }),
        });
        void store.state.w; // 触发 watch 创建
        expect(store.watchObjects.size).toBe(1);
        delete (store.state as any).w;
        await flush();
        expect(store.watchObjects.has("w")).toBe(false);
    });

    test("批量更新中删除依赖，回放后销毁", async () => {
        const store = new AutoStore({
            a: 1,
            b: 2,
            c: (scope: any) => scope.a + scope.b,
        });
        void store.state.c;
        expect(store.computedObjects.find(["c"])).toBeDefined();
        store.update((s: any) => {
            delete s.a;
            delete s.b;
        }, { batch: true });
        await flush();
        expect(store.computedObjects.find(["c"])).toBeUndefined();
    });

    test("多个 AutoStore 实例索引互不干扰", async () => {
        const s1 = new AutoStore({ a: 1, c: (scope: any) => scope.a });
        const s2 = new AutoStore({ a: 1, c: (scope: any) => scope.a });
        void s1.state.c;
        void s2.state.c;
        delete (s1.state as any).a;
        await flush();
        expect(s1.computedObjects.find(["c"])).toBeUndefined();
        expect(s2.computedObjects.find(["c"])).toBeDefined();
    });

    test("手动 computedObjects.delete 触发 observer:destroyed 事件", () => {
        let evtCount = 0;
        const store = new AutoStore({ a: 1, c: (scope: any) => scope.a });
        store.on("observer:destroyed", () => evtCount++);
        void store.state.c;
        const c = store.computedObjects.find(["c"]);
        expect(c).toBeDefined();
        store.computedObjects.delete(c!.id);
        expect(store.computedObjects.find(["c"])).toBeUndefined();
        expect(c!.destroyed).toBe(true);
        expect(evtCount).toBe(1);
    });
});

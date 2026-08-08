import { describe, expect, spyOn, test } from "bun:test";
import "./setup";
import { AutoStore } from "autostore";
import { AutoTemplateEngine } from "../engine";
import { nextTick } from "./helpers";

/**
 * AutoTemplateEngine 第二参「store | state」输入测试（ADR-0009）。
 *
 * 通用 mount() helper 仍走实例路径（new AutoStore(state) 再传入），本文件直接构造 engine
 * 以覆盖裸状态路径、销毁分流（_ownsStore）、storeOptions 透传与静默兜空。
 */

describe("AutoTemplateEngine 第二参：store | state（ADR-0009）", () => {
    test("裸状态对象：engine 自建 store 并完成首渲", () => {
        const root = document.createElement("div");
        root.innerHTML = `<span x-text="name"></span>`;
        const engine = new AutoTemplateEngine(root, { name: "zhang" });
        expect(engine.store).toBeInstanceOf(AutoStore);
        expect(root.querySelector("span")!.textContent).toBe("zhang");
        engine.destroy();
    });

    test("裸状态对象：经 engine.state 响应式更新生效（种子对象已失效，唯句柄响应式）", async () => {
        const root = document.createElement("div");
        root.innerHTML = `<span x-text="count"></span>`;
        const engine = new AutoTemplateEngine(root, { count: 0 });
        expect(root.querySelector("span")!.textContent).toBe("0");
        engine.state.count = 42; // 响应式状态句柄（store.state 的 Proxy）
        await nextTick();
        expect(root.querySelector("span")!.textContent).toBe("42");
        engine.destroy();
    });

    test("AutoStore 实例：直接借用同一引用，不重建", () => {
        const root = document.createElement("div");
        root.innerHTML = `<span x-text="name"></span>`;
        const store = new AutoStore({ name: "li" });
        const engine = new AutoTemplateEngine(root, store);
        expect(engine.store).toBe(store);
        expect(root.querySelector("span")!.textContent).toBe("li");
        engine.destroy();
    });

    test("销毁分流：自建 store（裸状态路径）被 engine.destroy() 销毁", () => {
        const root = document.createElement("div");
        root.innerHTML = `<span x-text="name"></span>`;
        const engine = new AutoTemplateEngine(root, { name: "zhang" });
        const spy = spyOn(engine.store, "destroy");
        engine.destroy();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test("销毁分流：外部 store 不被 engine.destroy() 销毁（借用语义）", () => {
        const root = document.createElement("div");
        root.innerHTML = `<span x-text="name"></span>`;
        const store = new AutoStore({ name: "li" });
        const engine = new AutoTemplateEngine(root, store);
        const spy = spyOn(store, "destroy");
        engine.destroy();
        expect(spy).not.toHaveBeenCalled();
        // 外部 store 仍可用（engine 未碰它）
        expect(store.state.name).toBe("li");
        store.destroy();
    });

    test("storeOptions：自建路径透传给 new AutoStore(state, storeOptions)", () => {
        const root = document.createElement("div");
        root.innerHTML = `<span x-text="name"></span>`;
        const engine = new AutoTemplateEngine(root, { name: "zhang" }, {
            storeOptions: { debug: true },
        });
        expect((engine.store as any).options.debug).toBe(true);
        engine.destroy();
    });

    test("storeOptions：实例路径被忽略（store 保持原状）", () => {
        const root = document.createElement("div");
        root.innerHTML = `<span x-text="name"></span>`;
        const store = new AutoStore({ name: "li" }); // 默认 debug=false
        const engine = new AutoTemplateEngine(root, store, {
            storeOptions: { debug: true },
        });
        expect((engine.store as any).options.debug).toBeFalsy();
        engine.destroy();
    });

    test("null：静默兜空 store，不抛错（ADR-0009 决策 5）", () => {
        const root = document.createElement("div");
        root.innerHTML = `<span>static</span>`;
        const engine = new AutoTemplateEngine(root, null as any);
        expect(engine.store).toBeInstanceOf(AutoStore);
        expect(root.querySelector("span")!.textContent).toBe("static");
        engine.destroy();
    });

    test("undefined：静默兜空 store，不抛错", () => {
        const root = document.createElement("div");
        root.innerHTML = `<span>static</span>`;
        const engine = new AutoTemplateEngine(root, undefined as any);
        expect(engine.store).toBeInstanceOf(AutoStore);
        engine.destroy();
    });
});

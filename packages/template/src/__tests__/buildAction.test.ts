import { describe, expect, test } from "bun:test";
import "./setup";
import { mount, nextTick } from "./helpers";

/**
 * engine.buildAction —— 注册时自动包装的 async action 生命周期广播。
 *
 * 三入口均自动用 buildAction 包装：
 *  - 全局 `engine.actions[name] = fn`（actions Proxy 的 set trap）
 *  - 构造时 `options.actions`（engine 构造函数扫描）
 *  - `<script type="actions">`（compiler 提取时包装）
 * 仅 async action（返回 thenable）广播 `actions/<name>/{pending,resolved,rejected}`；同步 action 透明。
 * action 函数名入事件路径，payload 亦带 name → 通配订阅可抓任意 action 开始/成功/失败。
 */
describe("actions 注册时自动包装（buildAction → actions/<name>/*）", () => {
    test("全局赋值自动包装：async 成功广播 pending + resolved", async () => {
        const events: string[] = [];
        const { root, engine } = mount(`<button @click="save">x</button>`, {});
        engine.actions.save = async () => "done";
        engine.on("actions/save/pending", () => events.push("pending"));
        engine.on("actions/save/resolved", (m: any) => events.push(`resolved:${m.payload.result}`));
        root.querySelector("button")!.click();
        await nextTick();
        expect(events).toEqual(["pending", "resolved:done"]);
    });

    test("async 失败广播 pending + rejected，无 unhandled rejection", async () => {
        const events: string[] = [];
        const { root, engine } = mount(`<button @click="boom">x</button>`, {});
        engine.actions.boom = async () => {
            throw new Error("oops");
        };
        engine.on("actions/boom/pending", () => events.push("pending"));
        engine.on("actions/boom/rejected", (m: any) => events.push(`rejected:${m.payload.error.message}`));
        // 触发：buildAction 内部 then(_, onRejected) 消费 reject → 不产生 unhandledRejection
        root.querySelector("button")!.click();
        await nextTick();
        expect(events).toEqual(["pending", "rejected:oops"]);
    });

    test("同步 action 包装后透明（不广播）", async () => {
        const events: string[] = [];
        const { root, engine } = mount(`<button @click="sync">x</button>`, {});
        engine.actions.sync = () => 42;
        engine.on("actions/sync/pending", () => events.push("pending"));
        engine.on("actions/sync/resolved", () => events.push("resolved"));
        root.querySelector("button")!.click();
        await nextTick();
        expect(events).toEqual([]);
    });

    test("构造时 options.actions 自动包装", async () => {
        const events: string[] = [];
        const { root, engine } = mount(`<button @click="init">x</button>`, {}, {
            actions: { init: async () => "ready" },
        });
        engine.on("actions/init/resolved", (m: any) => events.push(m.payload.result));
        root.querySelector("button")!.click();
        await nextTick();
        expect(events).toEqual(["ready"]);
    });

    test('<script type="actions"> 局部 async action 自动包装', async () => {
        const events: string[] = [];
        const { root, engine } = mount(
            `<div x-data="{}"><button @click="local">x</button><script type="actions">{ async local(){ return "L" } }</script></div>`,
            {},
        );
        engine.on("actions/local/resolved", (m: any) => events.push(m.payload.result));
        root.querySelector("button")!.click();
        await nextTick();
        expect(events).toEqual(["L"]);
    });

    test("通配 action 通配订阅抓任意 action 开始（payload.name 区分）", async () => {
        const names: string[] = [];
        const { root, engine } = mount(`<button @click="a">a</button><button @click="b">b</button>`, {});
        engine.actions.a = async () => {};
        engine.actions.b = async () => {};
        engine.on("actions/*/pending", (m: any) => names.push(m.payload.name));
        root.querySelectorAll("button")[0]!.click();
        root.querySelectorAll("button")[1]!.click();
        await nextTick();
        expect(names).toEqual(["a", "b"]);
    });

    test("经 x-on 触发：this 仍为 OnEvalContext（buildAction 透传 this/args）", async () => {
        let captured: any;
        const { root, engine } = mount(`<button @click="probe">x</button>`, { count: 7 });
        engine.actions.probe = async function (this: any) {
            captured = this;
            return this.store.state.count;
        };
        engine.on("actions/probe/resolved", () => {});
        root.querySelector("button")!.click();
        await nextTick();
        expect(captured.store.state.count).toBe(7);
        expect(captured.$event).toBeDefined();
    });
});

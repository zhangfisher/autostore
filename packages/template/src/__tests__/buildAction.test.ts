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

    test("同步 action 也广播 pending + resolved（ADR-0011 同步/异步统一）", async () => {
        const events: string[] = [];
        const { root, engine } = mount(`<button @click="sync">x</button>`, {});
        engine.actions.sync = () => 42;
        engine.on("actions/sync/pending", () => events.push("pending"));
        engine.on("actions/sync/resolved", (m: any) => events.push(`resolved:${m.payload.result}`));
        root.querySelector("button")!.click();
        await nextTick();
        expect(events).toEqual(["pending", "resolved:42"]);
    });

    test("同步抛错广播 pending + rejected 并 rethrow（错误仍经 eval.ts catch 传播）", async () => {
        const events: string[] = [];
        const { root, engine } = mount(`<button @click="boom">x</button>`, {});
        engine.actions.boom = () => {
            throw new Error("oops");
        };
        engine.on("actions/boom/pending", () => events.push("pending"));
        engine.on("actions/boom/rejected", (m: any) => events.push(`rejected:${m.payload.error.message}`));
        // buildAction rethrow 前已广播 rejected；rethrow 的错误被 x-on eval.ts try/catch 捕获记日志（不冒泡到浏览器）
        root.querySelector("button")!.click();
        await nextTick();
        expect(events).toEqual(["pending", "rejected:oops"]);
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

    test('<script type="actions"> 局部 action 不进总线、只 DOM 冒泡（ADR-0012 隔离同名串扰）', async () => {
        const busEvents: string[] = [];
        const domEvents: string[] = [];
        const { root, engine } = mount(
            `<div x-data="{}"><form><button @click="local">x</button></form><script type="actions">{ async local(){ return "L" } }</script></div>`,
            {},
        );
        engine.on("actions/local/resolved", (m: any) => busEvents.push(m.payload.result));
        root.querySelector("form")!.addEventListener("action:local", (e: any) => {
            domEvents.push(e.detail.phase);
        });
        root.querySelector("button")!.click();
        await nextTick();
        // 局部 action 不进总线（避免与其他 scope 同名局部 action 串扰）
        expect(busEvents).toEqual([]);
        // 只 DOM 冒泡（祖先聚合经冒泡隔离作用域）
        expect(domEvents).toEqual(["pending", "resolved"]);
    });

    test('<script type="actions" global> 声明全局 action，进总线双发（ADR-0012 global 标志）', async () => {
        const busEvents: string[] = [];
        const { root, engine } = mount(
            `<div x-data="{}"><button @click="gsave">x</button><script type="actions" global>{ async gsave(){ return "G" } }</script></div>`,
            {},
        );
        engine.on("actions/gsave/resolved", (m: any) => busEvents.push(m.payload.result));
        root.querySelector("button")!.click();
        await nextTick();
        // global 标志 → 注入 engine.actions → 进总线（区别于默认局部只 DOM 冒泡）
        expect(busEvents).toEqual(["G"]);
    });

    test('<script type="actions"> 内多个 action 均注册并独立触发（局部，只 DOM 冒泡）', async () => {
        const domA: string[] = [];
        const domB: string[] = [];
        const busEvents: string[] = [];
        const { root, engine } = mount(
            `<div x-data="{}">
               <form>
                 <button class="a" @click="doA">a</button>
                 <button class="b" @click="doB">b</button>
               </form>
               <script type="actions">{ async doA(){ return "A" }, async doB(){ return "B" } }</script>
             </div>`,
            {},
        );
        engine.on("actions/doA/resolved", () => busEvents.push("A"));
        engine.on("actions/doB/resolved", () => busEvents.push("B"));
        root.querySelector("form")!.addEventListener("action:doA", (e: any) => domA.push(e.detail.phase));
        root.querySelector("form")!.addEventListener("action:doB", (e: any) => domB.push(e.detail.phase));
        root.querySelector("button.a")!.click();
        root.querySelector("button.b")!.click();
        await nextTick();
        // 多个 action 均注册、独立触发；局部只 DOM 冒泡、不进总线（ADR-0012）
        expect(busEvents).toEqual([]);
        expect(domA).toEqual(["pending", "resolved"]);
        expect(domB).toEqual(["pending", "resolved"]);
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

/**
 * action:<name> DOM 冒泡事件 + phase 修饰符（ADR-0010）。
 *
 * buildAction 在 thenable 分支双发：总线 actions/<name>/*（上一 describe 覆盖）+ DOM 冒泡
 * action:<name>（bubbles+composed，detail 不带 el/scope）。祖先经 @action:<name> 监听（复用 x-on），
 * phase 修饰符 .pending/.resolved/.rejected 按 detail.phase 过滤（guard 类型，与 .left/.right 同构）。
 * 命令式直调（this 非 OnEvalContext）无触发元素 → 只走总线、不冒泡。
 */
describe("action:<name> DOM 冒泡事件 + phase 修饰符（ADR-0010）", () => {
    test("DOM 冒泡到祖先元素，detail 带 phase（pending→resolved）", async () => {
        const phases: string[] = [];
        const { root, engine } = mount(`<form><button @click="save">x</button></form>`, {});
        engine.actions.save = async () => "done";
        root.querySelector("form")!.addEventListener("action:save", (e: any) => {
            phases.push(e.detail.phase);
        });
        root.querySelector("button")!.click();
        await nextTick();
        expect(phases).toEqual(["pending", "resolved"]);
    });

    test("rejected 事件冒泡，detail 带 error", async () => {
        const details: any[] = [];
        const { root, engine } = mount(`<form><button @click="boom">x</button></form>`, {});
        engine.actions.boom = async () => {
            throw new Error("oops");
        };
        root.querySelector("form")!.addEventListener("action:boom", (e: any) => {
            details.push({ phase: e.detail.phase, msg: e.detail.error?.message });
        });
        root.querySelector("button")!.click();
        await nextTick();
        expect(details).toEqual([
            { phase: "pending", msg: undefined },
            { phase: "rejected", msg: "oops" },
        ]);
    });

    test("phase 修饰符：.pending 与 .resolved 各自只响应对应阶段（经 x-on）", async () => {
        const { root, engine } = mount(
            `<form @action:save.pending="log.push('p')" @action:save.resolved="log.push('r')"><button @click="save">x</button></form>`,
            { log: [] as string[] },
        );
        engine.actions.save = async () => "done";
        root.querySelector("button")!.click();
        // pending 同步 dispatch：.pending guard 放行、.resolved guard 短路
        expect([...engine.state.log]).toEqual(["p"]);
        await nextTick();
        // resolved 异步 dispatch：.resolved guard 放行、.pending guard 短路
        expect([...engine.state.log]).toEqual(["p", "r"]);
    });

    test("命令式直调不冒泡 DOM 事件（this 非 OnEvalContext，只走总线）", async () => {
        let domCount = 0;
        const { root, engine } = mount(`<div></div>`, {});
        engine.actions.save = async () => "done";
        root.addEventListener("action:save", () => domCount++);
        await engine.actions.save();
        expect(domCount).toBe(0);
    });
});

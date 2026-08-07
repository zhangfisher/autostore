import { describe, expect, test } from "bun:test";
import "./setup";
import { AutoStore } from "autostore";
import { AutoTemplateEngine } from "../engine";
import { mount, nextTick } from "./helpers";

/**
 * 事件总线（信号面，ADR-0003）第一期测试。
 *
 * 用 autostart=false 构造引擎，便于在 compile() 之前订阅生命周期事件。
 * engine/ready 为 retain 态信号，晚订阅亦能补拿。
 */

/** 构造 autostart=false 的引擎（不在构造期 compile），返回 {root,store,engine} */
function mountDeferred(html: string, state: any) {
    const root = document.createElement("div");
    root.innerHTML = html.trim();
    const store = new AutoStore(state);
    const engine = new AutoTemplateEngine(root, store, { autostart: false });
    return { root, store, engine };
}

describe("事件总线（信号面）", () => {
    test("engine/ready：retain 让晚订阅者补拿构造期已发的事件", () => {
        const { engine } = mountDeferred(`<span x-text="a"></span>`, { a: 1 });
        // ready 在构造期已发（retain=true），此处晚订阅应立即收到
        let payload: any;
        engine.on("engine/ready", (m) => (payload = m.payload));
        expect(payload).toBeDefined();
        expect(payload.el).toBe(engine.el);
    });

    test("engine/compile：before/after 分别在 compile() 前后触发", () => {
        const { engine } = mountDeferred(`<span x-text="a"></span>`, { a: 1 });
        const seq: string[] = [];
        engine.on("engine/compile/before", () => seq.push("before"));
        engine.on("engine/compile/after", () => seq.push("after"));
        engine.compile();
        expect(seq).toEqual(["before", "after"]);
    });

    test("scope/created + scope/compiled：编译期触发，id 一致", () => {
        const { engine } = mountDeferred(`<span x-text="a"></span>`, { a: 1 });
        const created: number[] = [];
        const compiled: number[] = [];
        engine.on("scope/created", (m) => created.push(m.payload.id));
        engine.on("scope/compiled", (m) => compiled.push(m.payload.id));
        engine.compile();
        expect(created).toHaveLength(1);
        expect(compiled).toHaveLength(1);
        expect(created[0]).toBe(compiled[0]);
    });

    test("scope/destroyed：engine.destroy 时触发", () => {
        const { engine } = mountDeferred(`<span x-text="a"></span>`, { a: 1 });
        engine.compile();
        const destroyed: number[] = [];
        engine.on("scope/destroyed", (m) => destroyed.push(m.payload.id));
        engine.destroy();
        expect(destroyed).toHaveLength(1);
    });

    test("directive/* 通配符订阅：能匹配具体指令名 emit（created+compiled）", () => {
        const { engine } = mountDeferred(`<span x-text="a"></span>`, { a: 1 });
        const created: string[] = [];
        const compiled: string[] = [];
        engine.on("directive/*/created", (m) => created.push(m.payload.name));
        engine.on("directive/*/compiled", (m) => compiled.push(m.payload.name));
        engine.compile();
        expect(created).toContain("text");
        expect(compiled).toContain("text");
    });

    test("render/flush：状态变化驱动的 flush 触发前后事件", async () => {
        const { engine, store } = mountDeferred(`<span x-text="a"></span>`, { a: 1 });
        engine.compile();
        const seq: string[] = [];
        engine.on("render/flush/before", () => seq.push("before"));
        engine.on("render/flush/after", () => seq.push("after"));
        store.state.a = 2;
        await new Promise<void>((r) => setTimeout(r, 0));
        expect(seq).toEqual(["before", "after"]);
    });

    test("listenerCount：无订阅=0、订阅>0、off 后归 0", () => {
        const { engine } = mountDeferred(`<span x-text="a"></span>`, { a: 1 });
        expect(engine.listenerCount).toBe(0);
        const sub = engine.on("scope/created", () => {});
        expect(engine.listenerCount).toBeGreaterThan(0);
        sub.off();
        expect(engine.listenerCount).toBe(0);
    });

    test("directive/loading/mounted：dispatcher 检测动态插入的 x-loading 元素并广播", async () => {
        const { root, engine } = mount(`<section></section>`, {});
        const mounted: string[] = [];
        // 事件命名空间用指令注册名（loading），非属性名 x-loading
        engine.on("directive/loading/mounted", (m) => mounted.push(m.payload.name));
        const el = document.createElement("div");
        el.setAttribute("x-loading", "true");
        (root.firstElementChild as HTMLElement).appendChild(el);
        await nextTick(); // 等 MutationObserver 回调（microtask）送达
        expect(mounted).toContain("loading");
    });

    test("directive/loading/attr-changed：setAttribute 改值经 dispatcher 路由广播", async () => {
        const { root, engine } = mount(`<section></section>`, { a: 1 });
        const changes: string[] = [];
        engine.on("directive/loading/attr-changed", (m) => changes.push(m.payload.newVal));
        const el = document.createElement("div");
        el.setAttribute("x-loading", "a");
        (root.firstElementChild as HTMLElement).appendChild(el);
        await nextTick();
        el.setAttribute("x-loading", "a"); // 同值不变 → 不触发
        el.setAttribute("x-loading", "true"); // 变化 → 触发 attr-changed
        await nextTick();
        expect(changes).toContain("true");
        engine.destroy();
    });
});

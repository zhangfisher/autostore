import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import "./setup";
import { mount, nextTick } from "./helpers";

describe("x-slot 静态冻结快照", () => {
    test("static：渲染 template 子节点内容", () => {
        const { root } = mount(`<div x-slot><a href="x">ssss</a></div>`, {});
        expect(root).toEqualHTML(`<div>
  <div><a href="x">ssss</a></div>
</div>`);
    });

    test("static：内容不响应状态变化（无 watcher，T1 防御）", async () => {
        const { root, store } = mount(`<div x-slot><span>fixed</span></div>`, { x: 1 });
        expect(root.textContent).toContain("fixed");
        store.state.x = 999;
        await nextTick();
        expect(root.textContent).toContain("fixed");
    });

    test("static：剥除内部指令属性（x-text 不绑定、属性消失、文本保持字面）", async () => {
        const { root, store } = mount(`<div x-slot><span x-text="t">old</span></div>`, { t: "NEW" });
        const span = root.querySelector("span")!;
        expect(span.hasAttribute("x-text")).toBe(false); // 属性被剥
        expect(span.textContent).toBe("old"); // 不绑定：保持字面
        store.state.t = "CHANGED";
        await nextTick();
        expect(span.textContent).toBe("old"); // 状态变化仍不影响（根本没订阅）
    });

    test("static：内部含指令时不抛错（warn 对冲，内容照常渲染）", () => {
        const { root } = mount(`<div x-slot><b x-text="t">x</b></div>`, { t: "y" });
        expect(root.querySelector("b")).not.toBeNull();
        expect(root.querySelector("b")?.textContent).toBe("x"); // 字面保留，未绑定
    });

    test("static：DOM API 改动在反应式刷新后保留（engine 不触碰内容）", async () => {
        const { root, store } = mount(
            `<div><main x-slot><p>hi</p></main><span x-text="counter"></span></div>`,
            { counter: 0 },
        );
        const p = root.querySelector("p")!;
        p.textContent = "MUTATED";
        p.classList.add("active");
        store.state.counter = 5; // 触发无关反应式刷新
        await nextTick();
        expect(root.querySelector("p")?.textContent).toBe("MUTATED"); // DOM API 改动保留
        expect(root.querySelector("p")?.classList.contains("active")).toBe(true);
        expect(root.querySelector("span")?.textContent).toBe("5"); // 兄弟反应式正常更新
    });
});

describe("x-slot 远程子引擎", () => {
    let origFetch: typeof globalThis.fetch;
    let fetchCalls: string[] = [];

    beforeEach(() => {
        origFetch = globalThis.fetch;
        fetchCalls = [];
    });
    afterEach(() => {
        globalThis.fetch = origFetch;
    });

    /** 按 url → body 映射 mock fetch（未命中 url 返回 404） */
    function mockFetch(map: Record<string, string>) {
        globalThis.fetch = (async (input: any) => {
            const url = String(typeof input === "string" ? input : input?.url ?? input);
            fetchCalls.push(url);
            const body = map[url];
            if (body === undefined) return { ok: false, status: 404, text: async () => "" } as any;
            return { ok: true, status: 200, text: async () => body } as any;
        }) as any;
    }

    test("remote：fetch url → child engine 编译 fetched HTML（独立 store，自身 x-data 自治）", async () => {
        mockFetch({ "/post": `<div x-data="{ name: 'child' }"><span x-text="name"></span></div>` });
        const { root } = mount(`<div x-slot="url"></div>`, { url: "/post" });
        await nextTick();
        // child engine 用自身 x-data 的 name 渲染（与父 store 完全隔离）
        expect(root.querySelector("span")?.textContent).toBe("child");
    });

    test("remote：url 响应式变化 → 销毁旧 child engine + 重 fetch 新模板", async () => {
        mockFetch({
            "/a": `<div x-data="{ name: 'A' }"><span x-text="name"></span></div>`,
            "/b": `<div x-data="{ name: 'B' }"><span x-text="name"></span></div>`,
        });
        const { root, store } = mount(`<div x-slot="url"></div>`, { url: "/a" });
        await nextTick();
        expect(root.querySelector("span")?.textContent).toBe("A");
        store.state.url = "/b";
        await nextTick();
        expect(root.querySelector("span")?.textContent).toBe("B");
    });

    test("remote：初值空 → 不 fetch、宿主空；赋值后 fetch", async () => {
        mockFetch({ "/late": `<span>LATE</span>` });
        const { root, store } = mount(`<div x-slot="url"></div>`, { url: "" });
        await nextTick();
        expect(fetchCalls.length).toBe(0);
        expect(root.querySelector("span")).toBeNull();
        store.state.url = "/late";
        await nextTick();
        expect(fetchCalls).toContain("/late");
        expect(root.querySelector("span")?.textContent).toBe("LATE");
    });

    test("remote：fetch 失败 → 错误占位（不静默）", async () => {
        mockFetch({}); // 所有 url 404
        const { root } = mount(`<div x-slot="url"></div>`, { url: "/bad" });
        await nextTick();
        expect(root.querySelector(".x-slot-error")).not.toBeNull();
    });

    test("remote：fetch 期间经 x-loading 显示覆盖层，完成后移除并替换为产物", async () => {
        let resolveFetch: () => void = () => {};
        globalThis.fetch = (async () => {
            await new Promise<void>((r) => {
                resolveFetch = r;
            });
            return { ok: true, status: 200, text: async () => `<span>OK</span>` } as any;
        }) as any;
        const { root } = mount(`<div x-slot="url"></div>`, { url: "/slow" });
        await nextTick();
        // 复用 x-loading 运行时指令：宿主加属性 → dispatcher mount 覆盖层
        expect(root.querySelector(".x-loading-overlay")).not.toBeNull();
        resolveFetch();
        await nextTick();
        // 完成后移除属性 → 覆盖层消失、换上 child engine 产物
        expect(root.querySelector(".x-loading-overlay")).toBeNull();
        expect(root.querySelector("span")?.textContent).toBe("OK");
    });

    test("teardown：x-if toggle false→true 重新 fetch（child engine 随 scope 销毁，β 不跨 toggle 保内容）", async () => {
        mockFetch({ "/t": `<span>T</span>` });
        const { root, store } = mount(`<div x-if="show"><div x-slot="url"></div></div>`, {
            show: true,
            url: "/t",
        });
        await nextTick();
        expect(root.querySelector("span")?.textContent).toBe("T");
        const firstCalls = fetchCalls.length;

        store.state.show = false; // 销毁子树（含 child engine）
        await nextTick();
        expect(root.querySelector("span")).toBeNull();

        store.state.show = true; // 重建 → 重新 fetch（β）
        await nextTick();
        expect(root.querySelector("span")?.textContent).toBe("T");
        expect(fetchCalls.length).toBeGreaterThan(firstCalls); // 确认重新 fetch，非保内容
    });
});

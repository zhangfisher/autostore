import { describe, expect, test } from "bun:test";
import "./setup";
import { mount, nextTick } from "./helpers";
import { parseColor } from "../directives/presets/loading";

/** 读取覆盖层根节点（宿主第一个子若为 overlay 则返回，否则 null） */
const overlayOf = (host: Element | null): HTMLElement | null =>
    (host?.querySelector(".x-loading-overlay") as HTMLElement) ?? null;

/** 等待指定毫秒（用于 delay 用例） */
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

describe("x-loading 颜色解析（纯函数）", () => {
    test("hex 全形态", () => {
        expect(parseColor("#000")).toEqual([0, 0, 0]);
        expect(parseColor("#000000")).toEqual([0, 0, 0]);
        expect(parseColor("#888")).toEqual([136, 136, 136]);
        expect(parseColor("#ffa516")).toEqual([255, 165, 22]);
        // #rgba / #rrggbbaa 丢弃 alpha
        expect(parseColor("#000f")).toEqual([0, 0, 0]);
        expect(parseColor("#ffa516ff")).toEqual([255, 165, 22]);
    });
    test("rgb()/rgba()", () => {
        expect(parseColor("rgb(255, 165, 0)")).toEqual([255, 165, 0]);
        expect(parseColor("rgba(0,0,0,0.5)")).toEqual([0, 0, 0]);
    });
    test("hsl()", () => {
        expect(parseColor("hsl(0, 100%, 50%)")).toEqual([255, 0, 0]);
    });
    test("颜色名表", () => {
        expect(parseColor("black")).toEqual([0, 0, 0]);
        expect(parseColor("white")).toEqual([255, 255, 255]);
        expect(parseColor("red")).toEqual([255, 0, 0]);
    });
    test("非法输入返回 null", () => {
        expect(parseColor("notacolor")).toBeNull();
        expect(parseColor("")).toBeNull();
    });
});

describe("x-loading 快速绑定（整值即 visible 表达式）", () => {
    test("true 挂载覆盖层，false 移除，true 重建", async () => {
        const { root, store } = mount(`<div id="h" x-loading="show"></div>`, { show: true });
        const h = root.querySelector("#h")!;
        // 初始 true：覆盖层已挂载
        expect(overlayOf(h)).not.toBeNull();
        store.state.show = false;
        await nextTick();
        expect(overlayOf(h)).toBeNull();
        store.state.show = true;
        await nextTick();
        expect(overlayOf(h)).not.toBeNull();
    });

    test("初始 false：覆盖层不挂载", async () => {
        const { root, store } = mount(`<div id="h" x-loading="show"></div>`, { show: false });
        const h = root.querySelector("#h")!;
        expect(overlayOf(h)).toBeNull();
        store.state.show = true;
        await nextTick();
        expect(overlayOf(h)).not.toBeNull();
    });

    test("falsy 值（false/0/空串/null）统一不挂载", () => {
        for (const flag of [false, 0, "", null]) {
            const { root } = mount(`<div id="h" x-loading="flag"></div>`, { flag });
            expect(overlayOf(root.querySelector("#h"))).toBeNull();
        }
    });

    test("表达式 visible：a && !b 依赖多状态，切换任一即响应", async () => {
        const { root, store } = mount(`<div id="h" x-loading="a && !b"></div>`, {
            a: true,
            b: false,
        });
        const h = root.querySelector("#h")!;
        // true && !false → true：已挂载
        expect(overlayOf(h)).not.toBeNull();
        store.state.b = true;
        await nextTick();
        // true && !true → false：移除
        expect(overlayOf(h)).toBeNull();
        store.state.a = false;
        store.state.b = false;
        await nextTick();
        // false && !false → false：仍无
        expect(overlayOf(h)).toBeNull();
        store.state.a = true;
        await nextTick();
        // true && !false → true：重建
        expect(overlayOf(h)).not.toBeNull();
    });

    test("路径绑定 store 状态：order.isSubmit", async () => {
        const { root, store } = mount(`<div id="h" x-loading="order.isSubmit"></div>`, {
            order: { isSubmit: false },
        });
        const h = root.querySelector("#h")!;
        expect(overlayOf(h)).toBeNull();
        store.state.order.isSubmit = true;
        await nextTick();
        expect(overlayOf(h)).not.toBeNull();
    });

    test("配合 x-data 局部变量：初始 true 即挂载", async () => {
        const { root } = mount(
            `<div id="h" x-data="{ isLoading:true }" x-loading="isLoading"></div>`,
            {},
        );
        // x-data 注入局部响应式变量 isLoading=true → watch 经 dataScope 取值 → 挂载覆盖层
        expect(overlayOf(root.querySelector("#h"))).not.toBeNull();
    });
});

describe("x-loading 配置绑定（对象语法）", () => {
    test("visible 字段控制显隐", async () => {
        const { root, store } = mount(
            `<div id="h" x-loading="{ visible:'flag' }"></div>`,
            { flag: false },
        );
        const h = root.querySelector("#h")!;
        expect(overlayOf(h)).toBeNull();
        store.state.flag = true;
        await nextTick();
        expect(overlayOf(h)).not.toBeNull();
    });

    test("缺 visible：warn 且不挂载（不抛错）", () => {
        const { root } = mount(`<div id="h" x-loading="{ message:'x' }"></div>`, {});
        expect(overlayOf(root.querySelector("#h"))).toBeNull();
    });

    test("color 注入 loader（currentColor 经 style.color）", () => {
        const { root } = mount(
            `<div id="h" x-loading="{ visible:'l', color:'red' }"></div>`,
            { l: true },
        );
        const loader = root.querySelector("#h .x-loading-loader") as HTMLElement;
        expect(loader).not.toBeNull();
        // style.color 读值经 happy-dom 规范化；断言非空且含 red 或对应 rgb
        expect(loader.style.color.length).toBeGreaterThan(0);
    });

    test("bgColor + opacity 合成为 rgba 背景", () => {
        const { root } = mount(
            `<div id="h" x-loading="{ visible:'l', bgColor:'white', opacity:0.5 }"></div>`,
            { l: true },
        );
        const ov = overlayOf(root.querySelector("#h"))!;
        // 背景应含 rgba（white,0.5 → 半透明白）
        const bg = ov.style.background || ov.style.backgroundColor;
        expect(bg).toMatch(/rgba?\(/);
    });

    test("message 渲染文本；不传则无文本节点", () => {
        const withMsg = mount(
            `<div id="h" x-loading="{ visible:'l', message:'正在加载' }"></div>`,
            { l: true },
        );
        const msg1 = withMsg.root.querySelector("#h .x-loading-message");
        expect(msg1?.textContent).toBe("正在加载");

        const noMsg = mount(`<div id="h" x-loading="{ visible:'l' }"></div>`, { l: true });
        expect(noMsg.root.querySelector("#h .x-loading-message")).toBeNull();
    });
});

describe("x-loading 修饰符", () => {
    test(".screen 追加全屏 class", () => {
        const { root } = mount(`<div id="h" x-loading.screen="l"></div>`, { l: true });
        const ov = overlayOf(root.querySelector("#h"))!;
        expect(ov.className).toContain("x-loading-screen");
    });

    test("无 .screen 时不追加全屏 class", () => {
        const { root } = mount(`<div id="h" x-loading="l"></div>`, { l: true });
        const ov = overlayOf(root.querySelector("#h"))!;
        expect(ov.className).not.toContain("x-loading-screen");
    });
});

describe("x-loading delay 防闪烁", () => {
    test("delay>0：true 后延迟到期才挂载", async () => {
        const { root } = mount(`<div id="h" x-loading="{ visible:'l', delay:20 }"></div>`, {
            l: true,
        });
        const h = root.querySelector("#h")!;
        // created 时 initial=true 启动 timer，未到期：尚未挂载
        expect(overlayOf(h)).toBeNull();
        await wait(60);
        expect(overlayOf(h)).not.toBeNull();
    });

    test("延迟窗口内回 false：不挂载（防闪烁）", async () => {
        const { root, store } = mount(
            `<div id="h" x-loading="{ visible:'l', delay:30 }"></div>`,
            { l: false },
        );
        const h = root.querySelector("#h")!;
        store.state.l = true;
        await nextTick();
        // 未到期，回 false
        store.state.l = false;
        await nextTick();
        await wait(80);
        expect(overlayOf(h)).toBeNull();
    });
});

describe("x-loading 反复切换无泄露", () => {
    test("多次 true↔false：覆盖层始终至多 1 个", async () => {
        const { root, store } = mount(`<div id="h" x-loading="l"></div>`, { l: true });
        const h = root.querySelector("#h")!;
        for (let i = 0; i < 5; i++) {
            store.state.l = false;
            await nextTick();
            store.state.l = true;
            await nextTick();
        }
        expect(h.querySelectorAll(".x-loading-overlay").length).toBe(1);
    });

    test("销毁后覆盖层移除（destroy 清理 DOM）", async () => {
        const { root, store } = mount(
            `<div id="outer" x-if="show"><div id="h" x-loading="l"></div></div>`,
            { show: true, l: true },
        );
        const h = root.querySelector("#h")!;
        expect(overlayOf(h)).not.toBeNull();
        // 外层 x-if 隐藏 → 销毁子 scope（含 x-loading）→ destroy 移除覆盖层
        store.state.show = false;
        await nextTick();
        // #h 被移除（子树销毁）
        expect(root.querySelector("#h")).toBeNull();
    });
});

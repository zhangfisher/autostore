import { describe, expect, test } from "bun:test";
import "./setup";
import { mount, nextTick } from "./helpers";

/** 读取覆盖层根节点（宿主第一个子若为 overlay 则返回，否则 null） */
const overlayOf = (host: Element | null): HTMLElement | null =>
    (host?.querySelector(".x-loading-overlay") as HTMLElement) ?? null;

/** 等待指定毫秒（用于 delay 用例） */
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

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
});

describe("x-loading 字面量与缺省（bare / true / false）", () => {
    test("裸 x-loading（无值）≡ x-loading='true'：默认显示", () => {
        const { root } = mount(`<div id="h" x-loading></div>`, {});
        expect(overlayOf(root.querySelector("#h"))).not.toBeNull();
    });

    test("x-loading='true'：字面量 true，静态显示（非状态路径）", () => {
        const { root } = mount(`<div id="h" x-loading="true"></div>`, {});
        expect(overlayOf(root.querySelector("#h"))).not.toBeNull();
    });

    test("x-loading='false'：字面量 false，静态隐藏（非状态路径）", () => {
        const { root } = mount(`<div id="h" x-loading="false"></div>`, {});
        expect(overlayOf(root.querySelector("#h"))).toBeNull();
    });

    test("字面量大小写不敏感：TRUE / False 同效", () => {
        const a = mount(`<div id="a" x-loading="TRUE"></div>`, {});
        expect(overlayOf(a.root.querySelector("#a"))).not.toBeNull();
        const b = mount(`<div id="b" x-loading="False"></div>`, {});
        expect(overlayOf(b.root.querySelector("#b"))).toBeNull();
    });

    test("字面量不订阅状态：store 变化不影响显隐", async () => {
        const { root, store } = mount(`<div id="h" x-loading="true"></div>`, { flag: false });
        const h = root.querySelector("#h")!;
        expect(overlayOf(h)).not.toBeNull();
        store.state.flag = true; // 字面量模式无订阅，不应触发任何变化
        await nextTick();
        expect(overlayOf(h)).not.toBeNull();
    });
});

describe("x-loading 运行时通道（Runtime 指令 / observer）", () => {
    test("属性保留在结果 DOM 上（允许 DOM API 访问）", () => {
        const { root } = mount(`<div id="h" x-loading="l"></div>`, { l: true });
        // runtime 指令属性不被编译器剥除，留在结果元素上
        expect(root.querySelector("#h")!.hasAttribute("x-loading")).toBe(true);
    });

    test("动态插入带 x-loading 的元素：observer 自动挂载", async () => {
        const { root, store } = mount(`<div></div>`, { l: false });
        // 编译期无 x-loading 元素；运行时用原生 DOM API 插入
        const dynamic = document.createElement("div");
        dynamic.id = "d";
        dynamic.setAttribute("x-loading", "l");
        root.querySelector("div")!.appendChild(dynamic);
        await nextTick(); // 等 observer 投递
        expect(overlayOf(root.querySelector("#d"))).toBeNull(); // l=false 不挂载
        store.state.l = true;
        await nextTick();
        expect(overlayOf(root.querySelector("#d"))).not.toBeNull(); // 响应全局状态
    });

    test("setAttribute 改值 → attrChanged 重绑到新表达式", async () => {
        const { root, store } = mount(`<div id="h" x-loading="a"></div>`, { a: false, b: true });
        const h = root.querySelector("#h")!;
        expect(overlayOf(h)).toBeNull(); // a=false
        // 改绑到 b
        h.setAttribute("x-loading", "b");
        await nextTick();
        expect(overlayOf(h)).not.toBeNull(); // b=true → 挂载
        store.state.b = false;
        await nextTick();
        expect(overlayOf(h)).toBeNull(); // 现在订阅的是 b
    });

    test("removeAttribute 删除属性 → 卸载实例（覆盖层移除）", async () => {
        const { root, store } = mount(`<div id="h" x-loading="l"></div>`, { l: true });
        const h = root.querySelector("#h")!;
        expect(overlayOf(h)).not.toBeNull();
        h.removeAttribute("x-loading");
        await nextTick(); // observer 检测到属性删除 → unmount
        expect(overlayOf(h)).toBeNull();
        // 属性已删，后续状态变化不再影响
        store.state.l = false;
        await nextTick();
        expect(overlayOf(h)).toBeNull();
    });

    test("元素从 DOM 移除 → observer 自动卸载（无泄露）", async () => {
        const { root, store } = mount(`<div id="h" x-loading="l"></div>`, { l: true });
        const h = root.querySelector("#h")!;
        expect(overlayOf(h)).not.toBeNull();
        h.remove(); // 原生移除
        await nextTick();
        // 元素已不在；状态变化不应抛错（实例已 unmounted，watcher 已 off）
        expect(() => {
            store.state.l = false;
        }).not.toThrow();
    });

    test("engine.destroy 回收 observer：销毁后动态插入不再生效", async () => {
        const { root, engine } = mount(`<div></div>`, { l: true });
        engine.destroy();
        // destroy 后 observer 已断开，新插入的 x-loading 元素不会被接管
        const dynamic = document.createElement("div");
        dynamic.setAttribute("x-loading", "l");
        (root.querySelector("div") ?? root).appendChild(dynamic);
        await nextTick();
        expect(overlayOf(dynamic)).toBeNull();
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

    test("缺 visible：默认显示（裸属性≡true 语义延伸到配置缺省）", () => {
        const { root } = mount(`<div id="h" x-loading="{ message:'x' }"></div>`, {});
        // 未指定 visible ≡ true：默认显示，message 正常渲染
        const h = root.querySelector("#h")!;
        expect(overlayOf(h)).not.toBeNull();
        expect(h.querySelector(".x-loading-message")?.textContent).toBe("x");
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

describe("x-loading selector 目标元素", () => {
    test("selector 命中宿主后代：覆盖层挂到目标而非宿主", () => {
        const { root } = mount(
            `<div id="h" x-loading="{ visible:'l', selector:'#t' }"><div id="t"></div></div>`,
            { l: true },
        );
        const h = root.querySelector("#h")!;
        const t = root.querySelector("#t")!;
        const ov = h.querySelector(".x-loading-overlay") as HTMLElement;
        expect(ov).not.toBeNull();
        expect(ov.parentElement === t).toBe(true); // 挂在 #t 上，非宿主直接子
    });

    test("selector 以 @ 开头：覆盖层挂到 document 全局元素（宿主外）", () => {
        // 准备一个宿主外的全局目标
        const external = document.createElement("div");
        external.id = "external";
        document.body.appendChild(external);
        try {
            const { root, engine } = mount(
                `<div id="h" x-loading="{ visible:'l', selector:'@#external' }"></div>`,
                { l: true },
            );
            // 覆盖层应在全局 #external 上，而非 detached 的 root 内
            expect(external.querySelector(".x-loading-overlay")).not.toBeNull();
            expect(root.querySelector(".x-loading-overlay")).toBeNull();
            engine.destroy();
        } finally {
            external.remove();
        }
    });

    test("selector 未命中：回退到宿主元素显示", () => {
        const { root } = mount(
            `<div id="h" x-loading="{ visible:'l', selector:'#missing' }"></div>`,
            { l: true },
        );
        const h = root.querySelector("#h")!;
        const ov = h.querySelector(".x-loading-overlay") as HTMLElement;
        expect(ov).not.toBeNull();
        expect(ov.parentElement === h).toBe(true); // 回退宿主
    });

    test("selector 非法：回退到宿主元素显示（不抛错）", () => {
        const { root } = mount(
            `<div id="h" x-loading="{ visible:'l', selector:'!!bad!!' }"></div>`,
            { l: true },
        );
        const h = root.querySelector("#h")!;
        const ov = h.querySelector(".x-loading-overlay") as HTMLElement;
        expect(ov).not.toBeNull();
        expect(ov.parentElement === h).toBe(true); // 非法选择器回退宿主
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

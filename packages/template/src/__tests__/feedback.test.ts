import { afterEach, describe, expect, test } from "bun:test";
import "./setup";
import { mount as rawMount, nextTick } from "./helpers";

// 跟踪本文件创建的 engine，afterEach 统一 destroy——避免累积的 MutationObserver/dispatcher
// 在全量测试下拖慢 happy-dom 调度（feedback 测试重：含 async action + 多 controllable promise，
// engine 不释放会让后续测试的命令式 setAttribute/removeAttribute 触发的 mutation 回调严重滞后）。
const _engines: { destroy: () => void }[] = [];
const mount = (html: string, state: any, options?: any) => {
    const r = rawMount(html, state, options);
    _engines.push(r.engine);
    return r;
};
afterEach(() => {
    for (const e of _engines) {
        try {
            e.destroy();
        } catch {
            /* 忽略已销毁 */
        }
    }
    _engines.length = 0;
});

/**
 * x-on `.feedback` 修饰符（ADR-0008）—— async action 执行反馈。
 *
 * 信号源 = business handler 返回值捕获（action 返回的 Promise），非订阅全局 actions 事件。
 * 状态机：pending 常驻 → resolved/rejected 终态 → timeout 后清终态类。
 * 配置经 x-on-options / x-options：{ at, timeout, pendingClass, resolvedClass, rejectedClass, loading }。
 */

/** 造一个可控 Promise（手动 resolve/reject），精确控制 async action 时序 */
function controllable<T = void>() {
    let resolve!: (v: T) => void;
    let reject!: (e: any) => void;
    const promise = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return { promise, resolve, reject };
}

describe("x-on .feedback：状态机与类名", () => {
    test("async 成功：触发即加 pending，resolve 后切 resolved、清 pending", async () => {
        const { promise, resolve } = controllable();
        const { root, engine } = mount(`<button @click.feedback="save">x</button>`, {});
        engine.actions.save = () => promise;
        const btn = root.querySelector("button")!;
        btn.click();
        // click 同步触发 → feedback.enter() 同步加 pending
        expect(btn.classList.contains("pending")).toBe(true);
        expect(btn.classList.contains("resolved")).toBe(false);
        resolve();
        await nextTick();
        expect(btn.classList.contains("pending")).toBe(false);
        expect(btn.classList.contains("resolved")).toBe(true);
    });

    test("async 失败：触发加 pending，reject 后切 rejected", async () => {
        const { promise, reject } = controllable();
        const { root, engine } = mount(`<button @click.feedback="boom">x</button>`, {});
        engine.actions.boom = () => promise;
        const btn = root.querySelector("button")!;
        btn.click();
        expect(btn.classList.contains("pending")).toBe(true);
        reject(new Error("oops"));
        await nextTick();
        expect(btn.classList.contains("pending")).toBe(false);
        expect(btn.classList.contains("rejected")).toBe(true);
    });

    test("同步 action 成功：直接进 resolved 终态（无 pending，ADR-0013 同步/异步一致）", async () => {
        const { root, engine } = mount(`<button @click.feedback="sync">x</button>`, {});
        engine.actions.sync = () => 42;
        const btn = root.querySelector("button")!;
        btn.click();
        // 同步成功：直接终态 resolved（无 pending 常驻——同步瞬时，pending 无加载态意义）
        expect(btn.classList.contains("pending")).toBe(false);
        expect(btn.classList.contains("resolved")).toBe(true);
    });

    test("同步 action 抛错：进 rejected 终态（ADR-0013 错误流冒泡，feedback 检测同步失败）", async () => {
        const { root, engine } = mount(`<button @click.feedback="boom">x</button>`, {});
        engine.actions.boom = () => {
            throw new Error("oops");
        };
        const btn = root.querySelector("button")!;
        btn.click();
        // 同步抛错：buildAction rethrow → eval.ts rethrow → feedback catch settle rejected
        expect(btn.classList.contains("pending")).toBe(false);
        expect(btn.classList.contains("rejected")).toBe(true);
    });

    test("自定义类名（pendingClass/resolvedClass/rejectedClass）", async () => {
        const { promise, resolve } = controllable();
        const { root, engine } = mount(
            `<button @click.feedback="save" x-on-options="{feedback:{pendingClass:'loading',resolvedClass:'ok',rejectedClass:'err'}}">x</button>`,
            {},
        );
        engine.actions.save = () => promise;
        const btn = root.querySelector("button")!;
        btn.click();
        expect(btn.classList.contains("loading")).toBe(true);
        resolve();
        await nextTick();
        expect(btn.classList.contains("ok")).toBe(true);
    });
});

describe("x-on .feedback：timeout 终态清除", () => {
    test("timeout>0：终态类延时后清除；pending 期间不受 timeout 影响", async () => {
        const { promise, resolve } = controllable();
        const { root, engine } = mount(
            `<button @click.feedback="save" x-on-options="{feedback:{timeout:50}}">x</button>`,
            {},
        );
        engine.actions.save = () => promise;
        const btn = root.querySelector("button")!;
        btn.click();
        expect(btn.classList.contains("pending")).toBe(true);
        // pending 期间（resolve 前）等候超过 timeout，pending 仍常驻
        await new Promise((r) => setTimeout(r, 80));
        expect(btn.classList.contains("pending")).toBe(true);
        resolve();
        await nextTick();
        expect(btn.classList.contains("resolved")).toBe(true);
        await new Promise((r) => setTimeout(r, 80)); // 过 timeout → 清终态
        expect(btn.classList.contains("resolved")).toBe(false);
    });

    test("timeout=0（默认）：终态常驻，直到下次 pending", async () => {
        const { promise, resolve } = controllable();
        const { root, engine } = mount(
            `<button @click.feedback="save" x-on-options="{feedback:{timeout:0}}">x</button>`,
            {},
        );
        engine.actions.save = () => promise;
        const btn = root.querySelector("button")!;
        btn.click();
        resolve();
        await nextTick();
        expect(btn.classList.contains("resolved")).toBe(true);
        await new Promise((r) => setTimeout(r, 30));
        expect(btn.classList.contains("resolved")).toBe(true); // 仍常驻
    });
});

describe("x-on .feedback：at 目标元素", () => {
    test("at=普通选择器：closest 向上找祖先容器加类", async () => {
        const { promise, resolve } = controllable();
        const { root, engine } = mount(
            `<form class="f"><button @click.feedback="save" x-on-options="{feedback:{at:'.f'}}">x</button></form>`,
            {},
        );
        engine.actions.save = () => promise;
        const btn = root.querySelector("button")!;
        const form = root.querySelector(".f")!;
        btn.click();
        expect(form.classList.contains("pending")).toBe(true);
        expect(btn.classList.contains("pending")).toBe(false); // 类在祖先不在按钮
        resolve();
        await nextTick();
        expect(form.classList.contains("resolved")).toBe(true);
    });

    test("at=@全局：document.querySelector 定位宿主外元素", async () => {
        const { promise, resolve } = controllable();
        const external = document.createElement("div");
        external.id = "ext";
        document.body.appendChild(external);
        try {
            const { root, engine } = mount(
                `<button @click.feedback="save" x-on-options="{feedback:{at:'@#ext'}}">x</button>`,
                {},
            );
            engine.actions.save = () => promise;
            root.querySelector("button")!.click();
            expect(external.classList.contains("pending")).toBe(true);
            resolve();
            await nextTick();
            expect(external.classList.contains("resolved")).toBe(true);
        } finally {
            external.remove();
        }
    });

    test("at 未命中：静默回退宿主元素", async () => {
        const { promise, resolve } = controllable();
        const { root, engine } = mount(
            `<button @click.feedback="save" x-on-options="{feedback:{at:'.no-such'}}">x</button>`,
            {},
        );
        engine.actions.save = () => promise;
        const btn = root.querySelector("button")!;
        btn.click();
        expect(btn.classList.contains("pending")).toBe(true); // 回退宿主
        resolve();
        await nextTick();
        expect(btn.classList.contains("resolved")).toBe(true);
    });
});

describe("x-on .feedback：loading 叠加（命令式 overlay）", () => {
    test("loading:true：pending 时叠加 x-loading overlay，终态时移除，类名照常", async () => {
        const { promise, resolve } = controllable();
        const { root, engine } = mount(
            `<button @click.feedback="save" x-on-options="{feedback:{loading:true}}">x</button>`,
            {},
        );
        engine.actions.save = () => promise;
        const btn = root.querySelector("button")!;
        btn.click();
        await nextTick(); // 等 MutationObserver 触发 x-loading mounted
        expect(btn.classList.contains("pending")).toBe(true); // 类名叠加
        expect(btn.hasAttribute("x-loading")).toBe(true); // feedback 命令式 setAttribute
        expect(btn.querySelector(".x-loading-overlay")).toBeTruthy(); // x-loading 渲染 overlay
        resolve();
        await nextTick();
        // feedback 职责：终态移除 x-loading 属性。overlay 的 DOM 移除是 x-loading unmounted
        // 的职责（由 x-loading.test.ts 覆盖），此处不依赖 happy-dom 对运行时 removeAttribute
        // 的 MutationObserver 回调时序（全量测试累积下该回调偶严重滞后）。
        expect(btn.hasAttribute("x-loading")).toBe(false);
        expect(btn.classList.contains("resolved")).toBe(true);
    });

    test("loading 对象：命令式 overlay 带 message（ADR-0008 决策 8 契约）", async () => {
        const { promise, resolve } = controllable();
        const { root, engine } = mount(
            `<button @click.feedback="save" x-on-options="{feedback:{loading:{message:'保存中'}}}">x</button>`,
            {},
        );
        engine.actions.save = () => promise;
        const btn = root.querySelector("button")!;
        btn.click();
        await nextTick();
        expect(btn.querySelector(".x-loading-message")?.textContent).toBe("保存中");
        resolve();
        await nextTick();
        expect(btn.hasAttribute("x-loading")).toBe(false); // feedback 终态移除属性
    });
});

describe("x-on .feedback：重入与组合", () => {
    test("重入：连点两次，旧 resolve 不覆盖新终态（generation 防陈旧）", async () => {
        const p1 = controllable();
        const p2 = controllable();
        const { root, engine } = mount(`<button @click.feedback="save">x</button>`, {});
        const btn = root.querySelector("button")!;
        engine.actions.save = () => p1.promise;
        btn.click(); // gen=1, p1
        expect(btn.classList.contains("pending")).toBe(true);
        engine.actions.save = () => p2.promise;
        btn.click(); // gen=2, p2（覆盖）
        expect(btn.classList.contains("pending")).toBe(true);
        p1.resolve(); // 旧 p1 resolve：gen 不匹配，应被忽略
        await nextTick();
        expect(btn.classList.contains("resolved")).toBe(false); // 旧结果未生效
        expect(btn.classList.contains("pending")).toBe(true); // p2 未决，仍 pending
        p2.resolve(); // 新 p2 resolve：生效
        await nextTick();
        expect(btn.classList.contains("resolved")).toBe(true);
    });

    test("与 .debounce 组合：feedback 居内层，debounce 到时后仍捕获返回值", async () => {
        const { promise, resolve } = controllable();
        const { root, engine } = mount(
            `<button @click.feedback.debounce="save" x-on-options="{debounce:30}">x</button>`,
            {},
        );
        engine.actions.save = () => promise;
        const btn = root.querySelector("button")!;
        btn.click();
        expect(btn.classList.contains("pending")).toBe(false); // debounce 等待中
        await new Promise((r) => setTimeout(r, 60)); // debounce 到时 → feedback 捕获 Promise
        expect(btn.classList.contains("pending")).toBe(true);
        resolve();
        await nextTick();
        expect(btn.classList.contains("resolved")).toBe(true);
    });
});

describe("x-on .feedback：销毁清理", () => {
    test("destroy：cleanup.cancel 移除 feedback 类与 x-loading 属性", async () => {
        const { promise } = controllable();
        const { root, engine } = mount(
            `<button @click.feedback="save" x-on-options="{feedback:{loading:true}}">x</button>`,
            {},
        );
        engine.actions.save = () => promise;
        const btn = root.querySelector("button")!;
        btn.click();
        await nextTick();
        expect(btn.classList.contains("pending")).toBe(true);
        expect(btn.hasAttribute("x-loading")).toBe(true);
        engine.destroy();
        expect(btn.classList.contains("pending")).toBe(false);
        expect(btn.classList.contains("resolved")).toBe(false);
        expect(btn.hasAttribute("x-loading")).toBe(false);
    });
});

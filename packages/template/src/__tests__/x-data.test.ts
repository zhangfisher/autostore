import { describe, expect, spyOn, test } from "bun:test";
import "./setup";
import { mount, nextTick } from "./helpers";
import type { AutoTemplateEngine } from "../engine";

/**
 * 在引擎中找到指定渲染元素对应的 scope 并销毁。
 * 用于多实例碰撞测试精确控制单个 x-data.attach 实例的销毁顺序（engine.destroy 会无序全销毁）。
 */
function destroyScopeFor(engine: AutoTemplateEngine, el: Element): void {
    for (const scope of engine.scopes.values()) {
        if (scope.el === el) {
            scope.destroy();
            return;
        }
    }
    throw new Error(`未找到元素对应的 scope：${el.outerHTML}`);
}

/**
 * 轮询等待断言通过。
 *
 * happy-dom 的 MutationObserver 回调触发时序相对 `setTimeout(0)` 不确定（偶发排在宏任务之后），
 * 单次 `await nextTick()` 会在 MO 回调前读到旧值导致 flake。改为轮询：反复 `nextTick` 直到断言通过，
 * 用尽次数后抛出最后一次的真实失败信息。
 */
async function waitFor(fn: () => void, attempts = 30): Promise<void> {
    for (let i = 0; i < attempts; i++) {
        try {
            fn();
            return;
        } catch {
            await nextTick();
        }
    }
    fn();
}

describe("x-data 数据指令", () => {
    test("默认模式：注入 dataScope，后代表达式可读取；渲染结果保留 x-data 属性", () => {
        const { root } = mount(`<div id="a" x-data="{a:1}"><span x-text="a"></span></div>`, {});
        expect(root).toEqualHTML(`<div>
  <div id="a" x-data="{a:1}">
    <span>1</span>
  </div>
</div>`);
    });

    test("relaxed-json 宽松语法：无引号键 / 尾逗号 / 字符串值", () => {
        const { root } = mount(
            `<div x-data="{a:1, b:'hi',}"><span x-text="a + b"></span></div>`,
            {},
        );
        expect(root).toEqualHTML(`<div>
  <div x-data="{a:1, b:'hi',}">
    <span>1hi</span>
  </div>
</div>`);
    });

    test("嵌套覆盖：子 x-data 覆盖父同名键，互不污染", () => {
        const { root } = mount(
            `<div id="a" x-data="{a:1}">
  <span x-text="a"></span>
  <div id="b" x-data="{a:2}">
    <span x-text="a"></span>
  </div>
</div>`,
            {},
        );
        expect(root).toEqualHTML(`<div>
  <div id="a" x-data="{a:1}">
    <span>1</span>
    <div id="b" x-data="{a:2}">
      <span>2</span>
    </div>
  </div>
</div>`);
    });

    test("父级继承：子可读取父 x-data 未覆盖的键", () => {
        const { root } = mount(
            `<div x-data="{a:1, b:2}"><span x-text="a"></span><span x-text="b"></span></div>`,
            {},
        );
        expect(root).toEqualHTML(`<div>
  <div x-data="{a:1, b:2}">
    <span>1</span>
    <span>2</span>
  </div>
</div>`);
    });

    test("运行时 setAttribute 更新：默认模式触发全量刷新", async () => {
        const { root } = mount(`<div id="a" x-data="{a:1}"><span x-text="a"></span></div>`, {});
        root.querySelector("#a")!.setAttribute("x-data", "{a:2}");
        await waitFor(() =>
            expect(root).toEqualHTML(`<div>
  <div id="a" x-data="{a:2}">
    <span>2</span>
  </div>
</div>`),
        );
    });

    test("运行时 setAttribute 同步删键：消失的键从 dataScope 移除", async () => {
        const { root } = mount(
            `<div id="a" x-data="{a:1, b:2}"><span x-text="a"></span><span x-text="b"></span></div>`,
            {},
        );
        root.querySelector("#a")!.setAttribute("x-data", "{a:9}");
        await waitFor(() =>
            expect(root).toEqualHTML(`<div>
  <div id="a" x-data="{a:9}">
    <span>9</span>
    <span></span>
  </div>
</div>`),
        );
    });

    test("父级运行时变更经 parent 链传播到后代", async () => {
        const { root } = mount(
            `<div id="a" x-data="{v:1}"><div><span x-text="v"></span></div></div>`,
            {},
        );
        root.querySelector("#a")!.setAttribute("x-data", "{v:5}");
        await waitFor(() =>
            expect(root).toEqualHTML(`<div>
  <div id="a" x-data="{v:5}">
    <div>
      <span>5</span>
    </div>
  </div>
</div>`),
        );
    });

    test("解析失败静默：仅打印日志，不中断编译，dataScope 为空", () => {
        const { root } = mount(`<div x-data="{bad"><span x-text="a"></span></div>`, {});
        expect(root).toEqualHTML(`<div>
  <div x-data="{bad">
    <span></span>
  </div>
</div>`);
    });

    test("解析为非对象（数组）：静默忽略，dataScope 为空", () => {
        const { root } = mount(`<div x-data="[1,2,3]"><span x-text="a"></span></div>`, {});
        expect(root).toEqualHTML(`<div>
  <div x-data="[1,2,3]">
    <span></span>
  </div>
</div>`);
    });
});

describe("x-data.attach 挂载全局 store", () => {
    test("attach：合并进 store 根键，x-text 经响应式自动订阅", () => {
        const { root, store } = mount(
            `<div id="a" x-data.attach="{a:1}"><span x-text="a"></span></div>`,
            {},
        );
        expect(store.state.a).toBe(1);
        expect(root).toEqualHTML(`<div>
  <div id="a" x-data.attach="{a:1}">
    <span>1</span>
  </div>
</div>`);
    });

    test("attach 响应式：改 store.state 自动更新，无需全量刷新", async () => {
        const { root, store } = mount(
            `<div x-data.attach="{a:1}"><span x-text="a"></span></div>`,
            {},
        );
        store.state.a = 99;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div x-data.attach="{a:1}">
    <span>99</span>
  </div>
</div>`);
    });

    test("attach 销毁 CAS：元素销毁后自动删除自己写入的键", () => {
        const { store, engine } = mount(
            `<div x-data.attach="{a:1, b:2}"><span x-text="a"></span></div>`,
            {},
        );
        expect(store.state.a).toBe(1);
        expect(store.state.b).toBe(2);
        engine.destroy();
        expect(store.state.a).toBeUndefined();
        expect(store.state.b).toBeUndefined();
    });

    test("attach 运行时 setAttribute：CAS 重写 store，消失键删除", async () => {
        const { root, store } = mount(
            `<div id="a" x-data.attach="{a:1}"><span x-text="a"></span></div>`,
            {},
        );
        root.querySelector("#a")!.setAttribute("x-data.attach", "{a:7, c:9}");
        await waitFor(() => expect(store.state.a).toBe(7));
        expect(store.state.c).toBe(9);
        expect(root).toEqualHTML(`<div>
  <div id="a" x-data.attach="{a:7, c:9}">
    <span>7</span>
  </div>
</div>`);
    });
});

describe("x-data 与 x-for 共存", () => {
    test("容器 x-data 经 parent 链透传进各 item", async () => {
        const { root, store } = mount(
            `<ul x-data="{sep:'|'}" x-for="item of items"><li x-text="item + sep"></li></ul>`,
            { items: ["x", "y"] },
        );
        await waitFor(() =>
            expect(root).toEqualHTML(`<div>
  <ul x-data="{sep:'|'}">
    <li>x|</li>
    <li>y|</li>
  </ul>
</div>`),
        );
        // 容器 x-data 运行时变更应透传到 item（parent 链）
        root.querySelector("ul")!.setAttribute("x-data", "{sep:'#'}");
        await waitFor(() =>
            expect(root).toEqualHTML(`<div>
  <ul x-data="{sep:'#'}">
    <li>x#</li>
    <li>y#</li>
  </ul>
</div>`),
        );
    });
});

describe("x-data.attach 多实例碰撞（CAS 销毁）", () => {
    test("两实例同键不同值：先销毁先写者，不误删后写者的值", () => {
        const { root, store, engine } = mount(
            `<div id="e1" x-data.attach="{x:1}"></div><div id="e2" x-data.attach="{x:2}"></div>`,
            {},
        );
        // 后写覆盖：e2 的 2 胜出
        expect(store.state.x).toBe(2);
        // 先销毁先写者 e1：CAS 判定 state.x(2) !== 1 → 跳过，e2 的值存活
        destroyScopeFor(engine, root.querySelector("#e1")!);
        expect(store.state.x).toBe(2);
        // 再销毁后写者 e2：state.x(2) === 2 → 删除
        destroyScopeFor(engine, root.querySelector("#e2")!);
        expect(store.state.x).toBeUndefined();
    });

    test("两实例同键同值：销毁时恰好删除一次，第二次 CAS 跳过无异常", () => {
        const { root, store, engine } = mount(
            `<div id="e1" x-data.attach="{x:1}"></div><div id="e2" x-data.attach="{x:1}"></div>`,
            {},
        );
        expect(store.state.x).toBe(1);
        // e1 销毁：state.x(1) === 1 → 删除
        destroyScopeFor(engine, root.querySelector("#e1")!);
        expect(store.state.x).toBeUndefined();
        // e2 销毁：state.x(undefined) !== 1 → 跳过（不抛错、不重复 delete）
        expect(() => destroyScopeFor(engine, root.querySelector("#e2")!)).not.toThrow();
        expect(store.state.x).toBeUndefined();
    });

    test("两实例同键不同值：反向销毁顺序（后写者先销毁）也能正确清空", () => {
        const { root, store, engine } = mount(
            `<div id="e1" x-data.attach="{x:1}"></div><div id="e2" x-data.attach="{x:2}"></div>`,
            {},
        );
        expect(store.state.x).toBe(2);
        // 先销毁后写者 e2：state.x(2) === 2 → 删除
        destroyScopeFor(engine, root.querySelector("#e2")!);
        expect(store.state.x).toBeUndefined();
        // 再销毁先写者 e1：state.x(undefined) !== 1 → 跳过
        destroyScopeFor(engine, root.querySelector("#e1")!);
        expect(store.state.x).toBeUndefined();
    });

    test("部分键重叠：CAS 保留后写者的值，先写者只清理自己的独占键", () => {
        const { root, store, engine } = mount(
            `<div id="e1" x-data.attach="{a:1, b:2}"></div><div id="e2" x-data.attach="{b:9, c:3}"></div>`,
            {},
        );
        // b 被 e2 覆盖为 9
        expect(store.state.a).toBe(1);
        expect(store.state.b).toBe(9);
        expect(store.state.c).toBe(3);
        // 销毁 e1：删独占键 a；b 因 state.b(9) !== 2 → 跳过（保留 e2 的 b）
        destroyScopeFor(engine, root.querySelector("#e1")!);
        expect(store.state.a).toBeUndefined();
        expect(store.state.b).toBe(9);
        expect(store.state.c).toBe(3);
        // 销毁 e2：删 b、c
        destroyScopeFor(engine, root.querySelector("#e2")!);
        expect(store.state.b).toBeUndefined();
        expect(store.state.c).toBeUndefined();
    });

    test("三实例链式覆盖，乱序销毁：仅末写者执行删除，其余 CAS 跳过", () => {
        const { root, store, engine } = mount(
            `<div id="e1" x-data.attach="{x:1}"></div><div id="e2" x-data.attach="{x:2}"></div><div id="e3" x-data.attach="{x:3}"></div>`,
            {},
        );
        expect(store.state.x).toBe(3);
        // 乱序销毁中间、最先写者：均因值不匹配而跳过
        destroyScopeFor(engine, root.querySelector("#e2")!);
        expect(store.state.x).toBe(3);
        destroyScopeFor(engine, root.querySelector("#e1")!);
        expect(store.state.x).toBe(3);
        // 末写者 e3：state.x(3) === 3 → 删除
        destroyScopeFor(engine, root.querySelector("#e3")!);
        expect(store.state.x).toBeUndefined();
    });

    test("运行时覆盖写入触发覆盖告警日志", async () => {
        const { root, store, engine } = mount(
            `<div id="e1" x-data.attach="{x:1}"></div><div id="e2" x-data.attach="{y:2}"></div>`,
            {},
        );
        const warnSpy = spyOn(store.logger, "warn");
        // 运行时让 e2 写入已由 e1 建立的键 x → 触发覆盖告警
        root.querySelector("#e2")!.setAttribute("x-data.attach", "{x:99}");
        await waitFor(() => expect(store.state.x).toBe(99));
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(String(warnSpy.mock.calls[0]?.[0] ?? "")).toContain("覆盖");
        warnSpy.mockRestore();
    });

    test("engine.destroy 全量销毁：多实例碰撞下最终 store 干净（末写者删除、其余 CAS 跳过）", () => {
        const { store, engine } = mount(
            `<div id="e1" x-data.attach="{a:1}"></div><div id="e2" x-data.attach="{a:2, b:3}"></div>`,
            {},
        );
        expect(store.state.a).toBe(2);
        expect(store.state.b).toBe(3);
        engine.destroy();
        // 末写者 e2 删 a/b；e1 对 a 的 CAS 跳过（a 已被 e2 改为 2，!== 1）
        expect(store.state.a).toBeUndefined();
        expect(store.state.b).toBeUndefined();
    });
});

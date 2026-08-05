/**
 * x-for x-empty 空状态子节点测试。
 *
 * 覆盖：空/非空渲染、空↔非空往返无泄漏、多 x-empty 全显、空元素对父作用域求值、
 * opt-in 不污染既有 x-for、仅 x-empty 无项模板的容器。
 *
 * 框架：bun:test。初始渲染同步（engine 构造期 flush），状态变更后需 await nextTick()。
 */
import { describe, expect, test } from "bun:test";
import "../setup";
import { mount, nextTick } from "../helpers";

/** 从 engine.scopes 反查元素对应的 scope（与 x-for-v2.test.ts 同实现） */
function scopeOf(engine: any, el: Element): any {
    for (const [ref, scope] of engine.scopes) {
        if (ref.deref() === el) return scope;
    }
    return undefined;
}

describe("x-for x-empty 空状态子节点", () => {
    test("初始空：渲染 x-empty、不渲染项", () => {
        const { root } = mount(
            `<ul x-for="item of items">
               <li x-text="item.name"></li>
               <li x-empty>没有数据</li>
             </ul>`,
            { items: [] },
        );
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>没有数据</li>
  </ul>
</div>`);
    });

    test("初始非空：渲染项、x-empty 不在 DOM", () => {
        const { root } = mount(
            `<ul x-for="item of items">
               <li x-text="item.name"></li>
               <li x-empty>没有数据</li>
             </ul>`,
            { items: [{ name: "a" }, { name: "b" }] },
        );
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <li>b</li>
  </ul>
</div>`);
    });

    test("空 → 非空 → 空 往返：DOM 正确切换、scope 无泄漏", async () => {
        const { root, store, engine } = mount(
            `<ul x-for="item of items">
               <li x-text="item.name"></li>
               <li x-empty>没有数据</li>
             </ul>`,
            { items: [] },
        );
        const ul = root.querySelector("ul")!;
        const binding = scopeOf(engine, ul);

        // 初始空：1 个 empty scope、1 个节点
        expect(binding.children.size).toBe(1);
        expect(ul.children.length).toBe(1);

        // → 非空（2 项）：empty 拆除、2 个 item scope
        store.state.items.push({ name: "a" }, { name: "b" });
        await nextTick();
        expect(binding.children.size).toBe(2);
        expect(ul.children.length).toBe(2);
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <li>b</li>
  </ul>
</div>`);

        // → 空：item 拆除、empty 重新挂载、仍 1 个 scope（无累积泄漏）
        store.state.items = [];
        await nextTick();
        expect(binding.children.size).toBe(1);
        expect(ul.children.length).toBe(1);
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>没有数据</li>
  </ul>
</div>`);
    });

    test("多个 x-empty：全部渲染、按文档序", () => {
        const { root } = mount(
            `<ul x-for="item of items">
               <li x-text="item.name"></li>
               <li x-empty>第一空</li>
               <li x-empty>第二空</li>
             </ul>`,
            { items: [] },
        );
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>第一空</li>
    <li>第二空</li>
  </ul>
</div>`);
    });

    test("x-empty 上的绑定对父作用域求值（无 item/$index）", () => {
        const { root } = mount(
            `<ul x-for="item of items">
               <li x-text="item.name"></li>
               <li x-empty x-text="emptyMsg"></li>
             </ul>`,
            { items: [], emptyMsg: "暂无数据" },
        );
        // emptyMsg 来自根 state（父作用域），非 item 上下文
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>暂无数据</li>
  </ul>
</div>`);
    });

    test("opt-in：无 x-empty 子节点的 x-for，空状态仍为空容器（不污染既有行为）", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items"><li x-text="item.name"></li></ul>`,
            { items: [{ name: "a" }] },
        );
        store.state.items = [];
        await nextTick();
        // 无 x-empty 子节点 → 不渲染任何 fallback，容器留空（既有行为不变）
        expect(root).toEqualHTML(`<div>
  <ul></ul>
</div>`);
    });

    test("仅 x-empty、无项模板的容器（守卫放宽后正常工作）", () => {
        const { root } = mount(
            `<ul x-for="item of items">
               <li x-empty>没有数据</li>
             </ul>`,
            { items: [] },
        );
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>没有数据</li>
  </ul>
</div>`);
    });
});

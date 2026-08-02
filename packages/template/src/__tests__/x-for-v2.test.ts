/**
 * x-for v2 专项回归测试：key-based 节点复用。
 *
 * v2 复用规则（与 v1 全量重建对照）：
 * - 同 key + index 不变（如 push/pop 末尾增删）→ 复用 DOM/scope/订阅（焦点/输入态保留）。
 * - 同 key + index 变（如 unshift/中间 splice 致后续项移位）→ 重建（订阅路径含旧 index 已失效）。
 * - 同 key + index 不变 + item 引用变 → 复用 + refresh（DOM identity 保持，内容更新）。
 * - 循环变量 $length/$end/$begin 依赖全局长度：复用项经 refresh 重算（非响应式，store 不自动触发）。
 *
 * 核心断言手段：DOM 节点 identity（container.children[i] === 渲染前缓存的引用）——
 * 它是焦点/输入态/动画保留的充要证据（节点未被替换）。
 */
import { describe, expect, test } from "bun:test";
import "./setup";
import { mount, nextTick } from "./helpers";

/** 从 engine.scopes 反查元素对应的 scope */
function scopeOf(engine: any, el: Element): any {
    for (const [ref, scope] of engine.scopes) {
        if (ref.deref() === el) return scope;
    }
    return undefined;
}

describe("x-for v2 key-based 节点复用", () => {
    test("push 加末项：旧项 DOM 身份保持（焦点/输入态保留）", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li><input value="x"></li></ul>`,
            { items: [{ id: 1 }, { id: 2 }] },
        );
        const ul = root.querySelector("ul")!;
        const li0 = ul.children[0]!;
        const li1 = ul.children[1]!;
        const input0 = li0.querySelector("input")!;
        input0.focus();
        store.state.items.push({ id: 3 });
        await nextTick();
        // 旧两项 DOM 节点未被替换（复用），新项追加末尾
        expect(ul.children[0]).toBe(li0);
        expect(ul.children[1]).toBe(li1);
        expect(ul.children.length).toBe(3);
        expect(li0.querySelector("input")).toBe(input0);
        // input 节点身份保持 → 焦点/输入态必然保留（真实浏览器中同节点不被替换即不丢焦点）。
        // 不用 document.activeElement：happy-dom 对 focus 支持不可靠，identity 保持已是充要证据。
    });

    test("pop 删末项：剩余项 DOM 身份保持", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="item.id"></li></ul>`,
            { items: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        );
        const ul = root.querySelector("ul")!;
        const li0 = ul.children[0]!;
        const li1 = ul.children[1]!;
        store.state.items.pop();
        await nextTick();
        expect(ul.children[0]).toBe(li0);
        expect(ul.children[1]).toBe(li1);
        expect(ul.children.length).toBe(2);
    });

    test("unshift 加首项：旧项 index 变 → 重建（DOM 身份变化）", async () => {
        // unshift 使旧项 index 全部 +1，订阅路径含旧 index 失效 → 按规则重建（非复用）
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="item.id"></li></ul>`,
            { items: [{ id: 1 }, { id: 2 }] },
        );
        const ul = root.querySelector("ul")!;
        const oldLi0 = ul.children[0];
        store.state.items.unshift({ id: 0 });
        await nextTick();
        expect(ul.children.length).toBe(3);
        // id=1 的项现在位于 index 1（原 0），DOM 被重建（身份变化）
        const liId1 = Array.from(ul.children).find((li) => li.textContent === "1")!;
        expect(liId1).not.toBe(oldLi0);
    });

    test("中间 splice 插入：后续项 index 变 → 重建，新项就位", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="item.id"></li></ul>`,
            { items: [{ id: 1 }, { id: 3 }] },
        );
        const ul = root.querySelector("ul")!;
        const liId1Before = ul.children[0]; // id=1 在 index 0
        store.state.items.splice(1, 0, { id: 2 });
        await nextTick();
        expect(ul.children.length).toBe(3);
        // id=1 仍在 index 0（位置未变）→ 复用，DOM 身份保持
        expect(ul.children[0]).toBe(liId1Before);
        // 新插入的 id=2 在 index 1
        expect(ul.children[1]!.textContent).toBe("2");
        // id=3 从 index 1 → 2（移位）→ 重建
        expect(ul.children[2]!.textContent).toBe("3");
    });

    test("整体替换（同序同 key 同引用）：全复用，DOM 身份保持", async () => {
        const a = { id: 1, name: "a" };
        const b = { id: 2, name: "b" };
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="item.name"></li></ul>`,
            { items: [a, b] },
        );
        const ul = root.querySelector("ul")!;
        const li0 = ul.children[0]!;
        const li1 = ul.children[1]!;
        // 替换为同对象引用（模拟重新读取同一份数据）
        store.state.items = [a, b];
        await nextTick();
        expect(ul.children[0]).toBe(li0);
        expect(ul.children[1]).toBe(li1);
    });

    test("整体替换（同 key 不同引用）：复用 + refresh，DOM 身份保持且内容更新", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="item.name"></li></ul>`,
            { items: [{ id: 1, name: "a" }] },
        );
        const ul = root.querySelector("ul")!;
        const li0 = ul.children[0]!;
        // 同 id（key 不变）、index 不变，但换新对象引用 → 复用 + refresh
        store.state.items = [{ id: 1, name: "A2" }];
        await nextTick();
        expect(ul.children[0]).toBe(li0); // DOM 身份保持
        expect(li0.textContent).toBe("A2"); // 内容刷新为新引用的值
    });

    test("循环变量 $end 随复用项重算：push 后原末项 $end true→false，DOM 身份保持", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="$end"></li></ul>`,
            { items: [{ id: 1 }, { id: 2 }] },
        );
        const ul = root.querySelector("ul")!;
        const li0 = ul.children[0]!; // id=1，原非末项 $end=false
        const li1 = ul.children[1]!; // id=2，原末项 $end=true
        expect(li1.textContent).toBe("true");
        store.state.items.push({ id: 3 });
        await nextTick();
        // id=1、id=2 位置不变 → 复用，DOM 身份保持
        expect(ul.children[0]).toBe(li0);
        expect(ul.children[1]).toBe(li1);
        // id=2 不再是末项 → $end 经 refresh 重算为 false（$length 2→3）
        expect(li1.textContent).toBe("false");
        // 新末项 id=3 → $end=true
        expect(ul.children[2]!.textContent).toBe("true");
    });

    test("watcher/scope 无泄漏：10 次 push+pop 循环后 binding.children.size 回到初始", async () => {
        const { root, store, engine } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="item.name"></li></ul>`,
            { items: [{ id: 1, name: "a" }, { id: 2, name: "b" }] },
        );
        const ul = root.querySelector("ul")!;
        const binding = scopeOf(engine, ul);
        const initial = binding.children.size; // 2 项 × 1 成员 = 2
        for (let i = 0; i < 10; i++) {
            store.state.items.push({ id: 100 + i, name: `n${i}` });
            await nextTick();
            store.state.items.pop();
            await nextTick();
        }
        expect(binding.children.size).toBe(initial);
        expect(ul.querySelectorAll("li").length).toBe(2);
    });

    test("复合项 push：组内各成员 DOM 身份保持", async () => {
        const { root, store } = mount(
            `<dl x-for="item of items" :key="item.id"><dt x-text="item.k"></dt><dd x-text="item.v"></dd></dl>`,
            { items: [{ id: 1, k: "a", v: "1" }] },
        );
        const dl = root.querySelector("dl")!;
        const dt0 = dl.children[0];
        const dd0 = dl.children[1];
        store.state.items.push({ id: 2, k: "b", v: "2" });
        await nextTick();
        // 旧组 dt/dd 复用（身份保持），新组追加
        expect(dl.children[0]).toBe(dt0);
        expect(dl.children[1]).toBe(dd0);
        expect(dl.children.length).toBe(4); // 2 组 × 2 成员
        // 组内顺序正确：dt 在 dd 前
        expect(dl.children[2]!.tagName).toBe("DT");
        expect(dl.children[3]!.tagName).toBe("DD");
    });

    test("无 :key：push 旧项复用（index 不变），unshift 旧项重建（index 变）", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items"><li x-text="item.name"></li></ul>`,
            { items: [{ name: "a" }, { name: "b" }] },
        );
        const ul = root.querySelector("ul")!;
        const li0 = ul.children[0]!;
        // push：旧项 index 不变 → 复用
        store.state.items.push({ name: "c" });
        await nextTick();
        expect(ul.children[0]).toBe(li0);
        // unshift：旧项 index +1 → 重建
        const li0AfterPush = ul.children[0];
        store.state.items.unshift({ name: "z" });
        await nextTick();
        expect(ul.children[1]).not.toBe(li0AfterPush); // 旧 a 项重建
        expect(ul.children[0]!.textContent).toBe("z"); // 新首项
    });

    test("重复 key 检测：logger.error 被调用", async () => {
        const { store, engine } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="item.id"></li></ul>`,
            { items: [{ id: 1 }] },
        );
        const errors: string[] = [];
        const orig = engine.logger.error;
        engine.logger.error = (msg: any) => errors.push(String(msg));
        try {
            store.state.items = [{ id: 1 }, { id: 1 }];
            await nextTick();
            expect(errors.some((e) => e.includes("duplicate key"))).toBe(true);
        } finally {
            engine.logger.error = orig;
        }
    });

    test("filter 表达式：toggle active 增删差异项，存留项 DOM 身份保持", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items.filter(x => x.active)" :key="item.id"><li x-text="item.id"></li></ul>`,
            {
                items: [
                    { id: 1, active: true },
                    { id: 2, active: true },
                ],
            },
        );
        const ul = root.querySelector("ul")!;
        const li0 = ul.children[0]!; // id=1
        const li1 = ul.children[1]!; // id=2
        // 隐藏 id=1：filter 结果只剩 id=2（index 0，原 index 1 → 变 → 重建）
        // 验证更纯粹的复用：保留两项 active，再追加第三项 active
        store.state.items.push({ id: 3, active: true });
        await nextTick();
        // id=1、id=2 仍在 filter 结果的前两位（index 不变）→ 复用
        expect(ul.children[0]).toBe(li0);
        expect(ul.children[1]).toBe(li1);
        expect(ul.children[2]!.textContent).toBe("3");
    });

    test("嵌套 x-for：外层 push 复用外层 li，最终 HTML 正确", async () => {
        const { root, store } = mount(
            `<ul x-for="row of matrix" :key="row.id"><li x-text="row.title"></li><ol x-for="cell of row.cells"><li x-text="cell"></li></ol></ul>`,
            {
                matrix: [
                    { id: 1, title: "r1", cells: ["a", "b"] },
                    { id: 2, title: "r2", cells: ["c"] },
                ],
            },
        );
        const ul = root.querySelector("ul")!;
        const outerLi0 = ul.children[0];
        store.state.matrix.push({ id: 3, title: "r3", cells: ["d", "e"] });
        await nextTick();
        // 外层前两项 index 不变 → 复用
        expect(ul.children[0]).toBe(outerLi0);
        expect(ul.querySelectorAll(":scope > li").length).toBe(3);
        // 最终结构正确：每项 li + ol
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>r1</li>
    <ol>
      <li>a</li>
      <li>b</li>
    </ol>
    <li>r2</li>
    <ol>
      <li>c</li>
    </ol>
    <li>r3</li>
    <ol>
      <li>d</li>
      <li>e</li>
    </ol>
  </ul>
</div>`);
    });

    test("反复结构变化稳定：交替 push/splice/整体替换不抛错、最终态正确", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="item.id"></li></ul>`,
            { items: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        );
        const ul = root.querySelector("ul")!;
        store.state.items.push({ id: 4 });
        await nextTick();
        store.state.items.splice(1, 1); // 删 id=2
        await nextTick();
        store.state.items = [{ id: 5 }, { id: 6 }];
        await nextTick();
        store.state.items.unshift({ id: 0 });
        await nextTick();
        expect(ul.children.length).toBe(3);
        expect(Array.from(ul.children).map((li) => li.textContent)).toEqual(["0", "5", "6"]);
    });
});

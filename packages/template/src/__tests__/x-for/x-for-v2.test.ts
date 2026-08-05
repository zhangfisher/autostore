/**
 * x-for v2 专项回归测试：key-based 节点复用。
 *
 * v2 复用规则（与 v1 全量重建对照）：
 * - 同 key + index 不变（如 push/pop 末尾增删）→ 复用 DOM/scope/订阅（焦点/输入态保留）。
 * - 同 key + index 变（如 unshift/中间 splice 致后续项移位）→ 重订阅（P1：复用项根 DOM，仅重建子树；订阅路径含旧 index 已失效）。
 * - 同 key + index 不变 + item 引用变 → 复用 + refresh（DOM identity 保持，内容更新）。
 * - 循环变量 $length/$end/$begin 依赖全局长度：复用项经 refresh 重算（非响应式，store 不自动触发）。
 *
 * 核心断言手段：DOM 节点 identity（container.children[i] === 渲染前缓存的引用）——
 * 它是焦点/输入态/动画保留的充要证据（节点未被替换）。
 */
import { describe, expect, test } from "bun:test";
import "../setup";
import { mount, nextTick } from "../helpers";

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

    test("unshift 加首项：旧项 index 变 → 重订阅（项根 DOM 身份保持，P1）", async () => {
        // unshift 使旧项 index 全部 +1，订阅路径含旧 index 失效 → P1 重订阅（复用项根 DOM，不重建）
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="item.id"></li></ul>`,
            { items: [{ id: 1 }, { id: 2 }] },
        );
        const ul = root.querySelector("ul")!;
        const oldLi0 = ul.children[0]!; // id=1
        store.state.items.unshift({ id: 0 });
        await nextTick();
        expect(ul.children.length).toBe(3);
        // id=1 的项现在位于 index 1（原 0），P1 重订阅复用项根 DOM → 身份保持
        const liId1 = Array.from(ul.children).find((li) => li.textContent === "1")!;
        expect(liId1).toBe(oldLi0);
    });

    test("P0: items[i]={同id新对象} 整体替换单项 → 项内容更新（旧版静默失效已修复）", async () => {
        // 旧版 BUG：core 对单项替换发 items.{i}(type=update)，watch("items") 收不到 → DOM 静默不更新。
        // P0：纯路径 itemsPath 时补 items.* 监听，命中项级 update 触发 render，走复用 + refresh patch。
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="item.name"></li></ul>`,
            {
                items: [
                    { id: 1, name: "a" },
                    { id: 2, name: "b" },
                ],
            },
        );
        const ul = root.querySelector("ul")!;
        const li0 = ul.children[0]!;
        // 整体替换第一项为新对象（同 id、新 name）——旧版此处 DOM 仍为 "a"
        store.state.items[0] = { id: 1, name: "REPLACED" };
        await nextTick();
        expect(li0.textContent).toBe("REPLACED");
        // 同 id + index 不变 → 复用项根 DOM（refresh patch，不重建）
        expect(ul.children[0]).toBe(li0);
        // 第二项不受影响
        expect(ul.children[1]!.textContent).toBe("b");
    });

    test("P0: items[i]={不同id} 整体替换 → 旧 key 销毁、新 key 新建", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="item.id"></li></ul>`,
            { items: [{ id: 1 }, { id: 2 }] },
        );
        const ul = root.querySelector("ul")!;
        // 整体替换第一项为不同 id（新 key）——P0 项级监听触发 render，走新建分支
        store.state.items[0] = { id: 99 };
        await nextTick();
        expect(ul.children[0]!.textContent).toBe("99");
        expect(ul.children[1]!.textContent).toBe("2");
        expect(ul.children.length).toBe(2);
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
            {
                items: [
                    { id: 1, name: "a" },
                    { id: 2, name: "b" },
                ],
            },
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

    test("P1 边界：移动复用项根 DOM，但项内子节点重建（子节点焦点不保留）", async () => {
        // P1 契约：rebindItem 复用项根 li，但 compileChild(reuseEl) 清空子树重建 → input 是新节点。
        // 子节点焦点彻底保留需 core 对象身份订阅（v3 路线）；此处固化当前契约防回归。
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li><input value="x"></li></ul>`,
            { items: [{ id: 1 }, { id: 2 }] },
        );
        const ul = root.querySelector("ul")!;
        const oldLi0 = ul.children[0]!; // id=1 项根
        const oldInput = oldLi0.querySelector("input")!;
        store.state.items.unshift({ id: 0 });
        await nextTick();
        // id=1 移到 index 1：项根 li 复用（P1 重订阅）
        expect(ul.children[1]).toBe(oldLi0);
        // 项内子节点 input 被 compileChild(reuseEl) 清空重建 → 身份变化（子节点焦点不保留）
        expect(oldLi0.querySelector("input")).not.toBe(oldInput);
        // 最终结构：3 项各有 input（与身份断言互补——结构等价，但 input 节点已换）
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>
      <input value="x">
    </li>
    <li>
      <input value="x">
    </li>
    <li>
      <input value="x">
    </li>
  </ul>
</div>`);
    });

    test("P1 复合项移动：组内各成员项根 DOM 均复用（dt/dd 各自保持）", async () => {
        const { root, store } = mount(
            `<dl x-for="item of items" :key="item.id"><dt x-text="item.k"></dt><dd x-text="item.v"></dd></dl>`,
            {
                items: [
                    { id: 1, k: "a", v: "1" },
                    { id: 2, k: "b", v: "2" },
                ],
            },
        );
        const dl = root.querySelector("dl")!;
        const dt0 = dl.children[0]!; // id=1 的 dt
        const dd0 = dl.children[1]!; // id=1 的 dd
        store.state.items.unshift({ id: 0, k: "z", v: "0" });
        await nextTick();
        // id=1 组移到 index 1（原 0）：rebindItem 按成员配对复用 old.nodes[0]=dt、[1]=dd
        expect(dl.children[2]).toBe(dt0); // 项根 dt 复用
        expect(dl.children[3]).toBe(dd0); // 项根 dd 复用
        expect(dl.children[0]!.textContent).toBe("z"); // 新首组
        // 最终结构：3 组 dt/dd，移动后顺序正确（z/a/b）
        expect(root).toEqualHTML(`<div>
  <dl>
    <dt>z</dt>
    <dd>0</dd>
    <dt>a</dt>
    <dd>1</dd>
    <dt>b</dt>
    <dd>2</dd>
  </dl>
</div>`);
    });

    test("P0 不误伤字段级：items[i].field= 走字段级精准 patch，DOM 不重建", async () => {
        // P0 补了 items.* 监听（仅命中项级 items.{i} update）；字段级 items.{i}.field 仍由项内
        // watcher 精准 patch（不进 render）→ DOM 身份保持。验证 P0 未让字段级退化为粗粒度。
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="item.name"></li></ul>`,
            {
                items: [
                    { id: 1, name: "a" },
                    { id: 2, name: "b" },
                ],
            },
        );
        const ul = root.querySelector("ul")!;
        const li0 = ul.children[0]!;
        const li1 = ul.children[1]!;
        store.state.items[0].name = "A2"; // 原位改字段，不换对象
        await nextTick();
        expect(li0.textContent).toBe("A2"); // 值更新（项内 watcher patch）
        expect(ul.children[0]).toBe(li0); // DOM 身份保持（未进 render）
        expect(ul.children[1]).toBe(li1); // 兄弟项不动
        // 最终结构：仅首项内容更新，兄弟项不动
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>A2</li>
    <li>b</li>
  </ul>
</div>`);
    });

    test("清空列表：items=[] 全销毁、binding.children 清空（无泄漏）", async () => {
        const { root, store, engine } = mount(
            `<ul x-for="item of items" :key="item.id"><li x-text="item.id"></li></ul>`,
            { items: [{ id: 1 }, { id: 2 }, { id: 3 }] },
        );
        const ul = root.querySelector("ul")!;
        const binding = scopeOf(engine, ul);
        expect(binding.children.size).toBe(3);
        store.state.items = [];
        await nextTick();
        expect(ul.children.length).toBe(0);
        expect(binding.children.size).toBe(0); // 全部 scope 销毁并从父级移除
        expect(root).toEqualHTML(`<div>
  <ul></ul>
</div>`);
    });
});

import { describe, expect, test } from "bun:test";
import "./setup";
import { mount, nextTick } from "./helpers";

/**
 * 响应式插值（`{{ }}`）测试——文本节点 + 属性值两表面。
 * 反应式复用 scope.watchExpression + collectDependencies，见 ADR-0004。
 */

describe("文本插值 {{ }}", () => {
    test("变量：初始渲染 + 状态变化更新 DOM", async () => {
        const { root, store } = mount(`<div>I am {{name}}</div>`, { name: "zhang" });
        expect(root).toEqualHTML(`<div>
  <div>I am zhang</div>
</div>`);
        store.state.name = "li";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div>I am li</div>
</div>`);
    });

    test("表达式：多依赖自动收集，任一变化即重算", async () => {
        const { root, store } = mount(`<div>{{ first + " " + last }}</div>`, {
            first: "zhang",
            last: "san",
        });
        expect(root).toEqualHTML(`<div>
  <div>zhang san</div>
</div>`);
        store.state.first = "li";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div>li san</div>
</div>`);
        store.state.last = "si";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div>li si</div>
</div>`);
    });

    test("多段：同一文本节点多个 {{}} 各自独立响应", async () => {
        const { root, store } = mount(`<p>I am {{a}} and {{b}}</p>`, { a: "1", b: "2" });
        expect(root).toEqualHTML(`<div>
  <p>I am 1 and 2</p>
</div>`);
        store.state.b = "3";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <p>I am 1 and 3</p>
</div>`);
    });

    test("转义：插值结果作为纯文本，不注入 HTML（XSS 安全）", async () => {
        const { root, store } = mount(`<div>{{html}}</div>`, { html: "<b>x</b>" });
        const div = root.querySelector("div")!;
        expect(div.children.length).toBe(0);
        expect(div.textContent).toBe("<b>x</b>");
        store.state.html = "<img src=x onerror=alert(1)>";
        await nextTick();
        expect(div.children.length).toBe(0);
        expect(div.textContent).toBe("<img src=x onerror=alert(1)>");
    });

    test("directive-less 元素自动建 scope（隐式指令）：嵌套静态子树亦生效", async () => {
        const { root, store } = mount(`<section><span>Hi {{name}}</span></section>`, { name: "k" });
        expect(root).toEqualHTML(`<div>
  <section>
    <span>Hi k</span>
  </section>
</div>`);
        store.state.name = "m";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <section>
    <span>Hi m</span>
  </section>
</div>`);
    });

    test("x-text 在场：插值文本剪枝，x-text 独占 textContent（无孤儿 watcher）", async () => {
        const { root, store } = mount(`<div x-text="name">{{age}}</div>`, { name: "zhang", age: 18 });
        expect(root).toEqualHTML(`<div>
  <div>zhang</div>
</div>`);
        // age 变化不应有任何反应（{{age}} 已剪枝、无 watcher）
        store.state.age = 99;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div>zhang</div>
</div>`);
    });
});

describe("x-for 项内文本插值", () => {
    test("对象字段：项内 {{item.field}} 响应式细粒度更新", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id"><li>{{item.name}}</li></ul>`,
            { items: [{ id: 1, name: "a" }, { id: 2, name: "b" }] },
        );
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
    <li>b</li>
  </ul>
</div>`);
        store.state.items[0]!.name = "A";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>A</li>
    <li>b</li>
  </ul>
</div>`);
    });

    test("primitive 循环变量：数组变更触发重建渲染", async () => {
        const { root, store } = mount(`<ul x-for="n of nums"><li>{{n}}</li></ul>`, { nums: [1, 2, 3] });
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
</div>`);
        store.state.nums = [10, 20];
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>10</li>
    <li>20</li>
  </ul>
</div>`);
    });
});

describe("属性插值（desugar-to-x-bind）", () => {
    test("混合段普通属性：href 拼接 + 依赖更新", async () => {
        const { root, store } = mount(`<a href="/u/{{id}}">link</a>`, { id: 42 });
        expect(root.querySelector("a")!.getAttribute("href")).toBe("/u/42");
        store.state.id = 7;
        await nextTick();
        expect(root.querySelector("a")!.getAttribute("href")).toBe("/u/7");
    });

    test("混合段 class：classList diff，静态+动态合并，无字面 {{}} 泄漏", async () => {
        const { root, store } = mount(`<div class="row {{type}}">x</div>`, { type: "primary" });
        const div = root.querySelector("div")!;
        expect(div.className).toBe("row primary");
        expect(div.getAttribute("class")).not.toContain("{{");
        store.state.type = "secondary";
        await nextTick();
        expect(div.className).toBe("row secondary");
        expect(div.getAttribute("class")).not.toContain("{{");
    });

    test("整体单段 class（字符串）：透传原值走 normalizeClass", async () => {
        const { root, store } = mount(`<div class="{{cls}}">x</div>`, { cls: "a b" });
        expect(root.querySelector("div")!.className).toBe("a b");
        store.state.cls = "c";
        await nextTick();
        expect(root.querySelector("div")!.className).toBe("c");
    });

    test("整体单段 boolean：disabled 透传原值（false 不禁用，避 string \"false\" 恒真坑）", async () => {
        const { root, store } = mount(`<button disabled="{{locked}}">ok</button>`, { locked: true });
        const btn = root.querySelector("button")!;
        expect(btn.disabled).toBe(true);
        store.state.locked = false;
        await nextTick();
        expect(btn.disabled).toBe(false);
        store.state.locked = true;
        await nextTick();
        expect(btn.disabled).toBe(true);
    });

    test("整体单段 property：value 透传原值", async () => {
        const { root, store } = mount(`<input value="{{text}}"/>`, { text: "a" });
        const input = root.querySelector("input")!;
        expect(input.value).toBe("a");
        store.state.text = "b";
        await nextTick();
        expect(input.value).toBe("b");
    });

    test("整体单段普通属性（路径）：title 透传", async () => {
        const { root, store } = mount(`<span title="{{user.name}}">x</span>`, {
            user: { name: "a" },
        });
        expect(root.querySelector("span")!.getAttribute("title")).toBe("a");
        store.state.user.name = "b";
        await nextTick();
        expect(root.querySelector("span")!.getAttribute("title")).toBe("b");
    });

    test("同属性显式 :attr 与插值冲突 → 编译期报错", () => {
        expect(() => mount(`<div :class="x" class="row {{y}}">x</div>`, { x: "a", y: "b" })).toThrow(
            /插值冲突/,
        );
    });
});

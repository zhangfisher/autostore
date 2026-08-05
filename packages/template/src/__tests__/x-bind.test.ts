import { describe, expect, test } from "bun:test";
import "./setup";
import { mount, nextTick } from "./helpers";

describe("x-bind:class 类名绑定", () => {
    test("字符串值即类名 + 状态变化更新", async () => {
        const { root, store } = mount(`<div x-class="variant"></div>`, { variant: "primary" });
        expect(root).toEqualHTML(`<div>
  <div class="primary"></div>
</div>`);
        store.state.variant = "secondary";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div class="secondary"></div>
</div>`);
    });

    test("字符串值含空格拆分为多个类", () => {
        const { root } = mount(`<div x-class="v"></div>`, { v: "foo bar" });
        expect(root).toEqualHTML(`<div>
  <div class="foo bar"></div>
</div>`);
    });

    test("对象多条件开关 + 字段级更新", async () => {
        const { root, store } = mount(
            `<div x-class="{active:isActive, disabled:isDisabled}"></div>`,
            { isActive: true, isDisabled: false },
        );
        expect(root).toEqualHTML(`<div>
  <div class="active"></div>
</div>`);
        store.state.isDisabled = true;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div class="active disabled"></div>
</div>`);
        store.state.isActive = false;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div class="disabled"></div>
</div>`);
    });

    test("三元表达式切换类名", async () => {
        const { root, store } = mount(`<div x-class="paid ? 'on' : 'off'"></div>`, {
            paid: true,
        });
        expect(root).toEqualHTML(`<div>
  <div class="on"></div>
</div>`);
        store.state.paid = false;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div class="off"></div>
</div>`);
    });

    test("原生 class 与 x-class 共存：静态类不被覆盖", async () => {
        const { root, store } = mount(
            `<div class="btn" x-class="{primary:isPrimary}"></div>`,
            { isPrimary: true },
        );
        expect(root).toEqualHTML(`<div>
  <div class="btn primary"></div>
</div>`);
        store.state.isPrimary = false;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div class="btn"></div>
</div>`);
    });

    test("x-class / :class / x-bind:class 三写法等价", () => {
        const cases = [
            mount(`<div x-class="v"></div>`, { v: "on" }).root,
            mount(`<div :class="v"></div>`, { v: "on" }).root,
            mount(`<div x-bind:class="v"></div>`, { v: "on" }).root,
        ];
        for (const r of cases) {
            expect(r).toEqualHTML(`<div>
  <div class="on"></div>
</div>`);
        }
    });

    test("同元素多个不同属性绑定共存（singleton=false）", async () => {
        const { root, store } = mount(`<div :title="t" x-class="c"></div>`, {
            t: "tip",
            c: "on",
        });
        const div = root.firstElementChild as HTMLElement;
        expect(div.getAttribute("title")).toBe("tip");
        expect(div.className).toBe("on");
        // class 变化不影响 title 绑定（两个 bind 实例各自独立）
        store.state.c = "off";
        await nextTick();
        expect(div.className).toBe("off");
        expect(div.getAttribute("title")).toBe("tip");
    });
});

describe("x-bind 属性绑定", () => {
    test(":title 普通属性 + 状态变化", async () => {
        const { root, store } = mount(`<span :title="user.name"></span>`, {
            user: { name: "a" },
        });
        expect(root).toEqualHTML(`<div>
  <span title="a"></span>
</div>`);
        store.state.user.name = "b";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <span title="b"></span>
</div>`);
    });

    test(":title 表达式拼接：多个依赖任一变化均触发重新求值", async () => {
        const { root, store } = mount(
            `<span :title="user.first + ' ' + user.last"></span>`,
            { user: { first: "张", last: "三" } },
        );
        const span = root.querySelector("span")!;
        // 首渲：整表达式经 watchExpression 求值 → "张 三"
        expect(span.getAttribute("title")).toBe("张 三");
        // 改 first：collectDependencies 已收集 user.first 与 user.last 两条依赖，任一变化都重新求值
        store.state.user.first = "李";
        await nextTick();
        expect(span.getAttribute("title")).toBe("李 三");
        // 改 last：同样触发整表达式重算
        store.state.user.last = "四";
        await nextTick();
        expect(span.getAttribute("title")).toBe("李 四");
    });

    test(":value 走 property 更新输入框当前值", async () => {
        const { root, store } = mount(`<input :value="text">`, { text: "a" });
        const input = root.querySelector("input")!;
        expect(input.value).toBe("a");
        store.state.text = "b";
        await nextTick();
        expect(input.value).toBe("b");
    });

    test(":disabled boolean：true 禁用 / false 解除", async () => {
        const { root, store } = mount(`<button :disabled="locked">提交</button>`, {
            locked: true,
        });
        const btn = root.querySelector("button")!;
        expect(btn.disabled).toBe(true);
        store.state.locked = false;
        await nextTick();
        expect(btn.disabled).toBe(false);
    });
});

describe("x-bind:class 在 x-for 内（localScope 注入）", () => {
    test("项内表达式读取 item 字段", async () => {
        const { root } = mount(
            `<ul x-for="item of items"><li x-class="item.on ? 'active' : 'inactive'"></li></ul>`,
            { items: [{ on: true }, { on: false }] },
        );
        expect(root).toEqualHTML(`<div>
  <ul>
    <li class="active"></li>
    <li class="inactive"></li>
  </ul>
</div>`);
    });
});

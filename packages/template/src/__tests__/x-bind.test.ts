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

describe("x-bind:style 样式绑定", () => {
    test("字符串 cssText 整体替换 + 状态变化", async () => {
        const { root, store } = mount(`<div x-style="s"></div>`, { s: "color:red" });
        const div = root.firstElementChild as HTMLElement;
        expect(div.getAttribute("style")).toContain("color");
        store.state.s = "color:blue";
        await nextTick();
        expect(div.style.color).toBe("blue");
    });

    test("对象写入 + 状态变化", async () => {
        const { root, store } = mount(`<div x-style="s"></div>`, {
            s: { color: "red", fontSize: "12px" },
        });
        const div = root.firstElementChild as HTMLElement;
        expect(div.style.color).toBe("red");
        expect(div.style.fontSize).toBe("12px");
        store.state.s = { color: "blue", fontSize: "14px" };
        await nextTick();
        expect(div.style.color).toBe("blue");
        expect(div.style.fontSize).toBe("14px");
    });

    test("对象来回切换清除上次多余 key（不残留）", async () => {
        const { root, store } = mount(`<div x-style="s"></div>`, {
            s: { color: "red", fontWeight: "bold" },
        });
        const div = root.firstElementChild as HTMLElement;
        expect(div.style.fontWeight).toBe("bold");
        // 切到不含 fontWeight 的对象：bold 必须被清除，不能残留
        store.state.s = { color: "blue" };
        await nextTick();
        expect(div.style.color).toBe("blue");
        expect(div.style.fontWeight).toBe("");
    });

    test("求值为 falsy 移除 style 属性", async () => {
        const { root, store } = mount(`<div x-style="s"></div>`, {
            s: { color: "red" },
        });
        const div = root.firstElementChild as HTMLElement;
        expect(div.style.color).toBe("red");
        store.state.s = null;
        await nextTick();
        expect(div.hasAttribute("style")).toBe(false);
    });
});

describe("x-style.transition 过渡动画注入", () => {
    test(".transition 修饰符注入默认值 all 0.3s ease-in（对象模式）", () => {
        const { root } = mount(`<div x-style.transition="s"></div>`, {
            s: { color: "red" },
        });
        const div = root.firstElementChild as HTMLElement;
        expect(div.style.color).toBe("red");
        // 默认值 all 0.3s ease-in 被注入（断 duration 与 all，规避 ease-in 归一化差异）
        expect(div.style.transition).toContain("0.3s");
        expect(div.style.transition).toContain("all");
    });

    test("无修饰符时 x-options 走宿主选项回退注入自定义值", () => {
        const { root } = mount(`<div x-options="{transition:'opacity 1s'}" x-style="s"></div>`, {
            s: { color: "red" },
        });
        const div = root.firstElementChild as HTMLElement;
        expect(div.style.transition).toContain("opacity");
        expect(div.style.transition).toContain("1s");
        expect(div.style.transition).not.toContain("0.3s");
    });

    test("x-bind-options 覆盖默认值（指令选项层显式优先于 .transition 修饰符）", () => {
        const { root } = mount(
            `<div x-style.transition="s" x-bind-options="{transition:'opacity 1s'}"></div>`,
            { s: { color: "red" } },
        );
        const div = root.firstElementChild as HTMLElement;
        // 显式 -options 合并早于修饰符注入（getDirectives step4 先于 step5），故覆盖默认
        expect(div.style.transition).toContain("opacity");
        expect(div.style.transition).not.toContain("0.3s");
    });

    test("对象自带 transition key 显式优先于默认值", () => {
        const { root } = mount(`<div x-style.transition="s"></div>`, {
            s: { color: "red", transition: "opacity 1s" },
        });
        const div = root.firstElementChild as HTMLElement;
        // 用户对象的 transition key 胜出，默认 all 0.3s ease-in 不注入
        expect(div.style.transition).toContain("opacity");
        expect(div.style.transition).not.toContain("0.3s");
    });

    test("字符串模式 transition 前置注入且不被 cssText 整替擦除", () => {
        const { root } = mount(`<div x-style.transition="s"></div>`, {
            s: "color:red",
        });
        const div = root.firstElementChild as HTMLElement;
        expect(div.style.color).toBe("red");
        expect(div.style.transition).toContain("0.3s");
    });

    test("transition 在多次响应式 patch 间持续生效", async () => {
        const { root, store } = mount(`<div x-style.transition="s"></div>`, {
            s: { color: "red" },
        });
        const div = root.firstElementChild as HTMLElement;
        expect(div.style.transition).toContain("0.3s");
        store.state.s = { color: "blue", fontSize: "20px" };
        await nextTick();
        expect(div.style.color).toBe("blue");
        // 切换样式后 transition 仍在（per-patch 注入，非一次性）
        expect(div.style.transition).toContain("0.3s");
    });

    test("falsy 清空后下一次非空 patch 重新注入 transition", async () => {
        const { root, store } = mount(`<div x-style.transition="s"></div>`, {
            s: { color: "red" },
        });
        const div = root.firstElementChild as HTMLElement;
        expect(div.style.transition).toContain("0.3s");
        // 清空：transition 随 removeAttribute('style') 一并清除
        store.state.s = null;
        await nextTick();
        expect(div.hasAttribute("style")).toBe(false);
        // 恢复：transition 重新注入
        store.state.s = { color: "blue" };
        await nextTick();
        expect(div.style.color).toBe("blue");
        expect(div.style.transition).toContain("0.3s");
    });

    test("非 style 绑定的 .transition 静默忽略（仅 attr==='style' 生效）", async () => {
        const { root, store } = mount(`<div :title.transition="t"></div>`, { t: "tip" });
        const div = root.firstElementChild as HTMLElement;
        expect(div.getAttribute("title")).toBe("tip");
        expect(div.style.transition).toBe("");
        store.state.t = "tip2";
        await nextTick();
        expect(div.getAttribute("title")).toBe("tip2");
        expect(div.style.transition).toBe("");
    });

    test("x-bind-options 显式 false 关闭 transition 注入", () => {
        const { root } = mount(
            `<div x-style.transition="s" x-bind-options="{transition:false}"></div>`,
            { s: { color: "red" } },
        );
        const div = root.firstElementChild as HTMLElement;
        expect(div.style.color).toBe("red");
        // 显式 false（指令选项层，早于修饰符注入）阻断注入，与 ADR-0007「显式 false 生效」一致
        expect(div.style.transition).toBe("");
    });
});

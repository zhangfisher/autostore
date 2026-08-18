import { describe, expect, test } from "bun:test";
import "./setup";
import { mount, nextTick } from "./helpers";

/**
 * x-model 双向绑定指令测试（阶段1：text-like + 防循环 + get/set + 修饰符 + 只读降级 + 冲突）。
 *
 * 约定（同 x-on.test.ts）：
 * - `mount(html, state)` 返回 `{ root, engine }`，engine 自建 store（state 为种子）；
 * - 输入模拟：`input.value = x; input.dispatchEvent(new InputEvent('input', {bubbles:true}))`；
 * - scheduler 经 microtask flush，写后须 `await nextTick()` 再断言；
 * - action 经 `engine.actions.xxx = fn` 注册（Proxy 自动 buildAction 包装）。
 */

describe("x-model 基础双向", () => {
    test("state→DOM 初始渲染（state 作真相源）", () => {
        const { root } = mount(`<input x-model="name" />`, { name: "zhang" });
        expect(root.querySelector("input")!.value).toBe("zhang");
    });

    test("DOM→state 写入（简单路径直通快路径）", async () => {
        const { root, engine } = mount(`<input x-model="name" />`, { name: "" });
        const input = root.querySelector("input")!;
        input.value = "fisher";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.name).toBe("fisher");
    });

    test("外部改 state → input 自动更新", async () => {
        const { root, engine } = mount(`<input x-model="name" />`, { name: "a" });
        engine.state.name = "b";
        await nextTick();
        expect(root.querySelector("input")!.value).toBe("b");
    });

    test("嵌套路径双向", async () => {
        const { root, engine } = mount(`<input x-model="user.name" />`, {
            user: { name: "a" },
        });
        const input = root.querySelector("input")!;
        expect(input.value).toBe("a");
        input.value = "b";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.user.name).toBe("b");
    });

    test("textarea 双向", async () => {
        const { root, engine } = mount(`<textarea x-model="text"></textarea>`, {
            text: "hi",
        });
        const ta = root.querySelector("textarea")!;
        expect(ta.value).toBe("hi");
        ta.value = "world";
        ta.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.text).toBe("world");
    });
});

describe("x-model 修饰符", () => {
    test(".number：写回数字类型（避免字符串污染计算属性）", async () => {
        const { root, engine } = mount(`<input x-model.number="count" />`, { count: 0 });
        const input = root.querySelector("input")!;
        input.value = "23";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.count).toBe(23);
        expect(typeof engine.state.count).toBe("number");
    });

    test(".number：NaN 回退原字符串（不破坏）", async () => {
        const { root, engine } = mount(`<input x-model.number="v" />`, { v: "" });
        const input = root.querySelector("input")!;
        input.value = "abc";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.v).toBe("abc");
    });

    test(".trim：去首尾空格", async () => {
        const { root, engine } = mount(`<input x-model.trim="name" />`, { name: "" });
        const input = root.querySelector("input")!;
        input.value = "  hello  ";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.name).toBe("hello");
    });

    test(".change：监听 change 而非 input（失焦触发）", async () => {
        const { root, engine } = mount(`<input x-model.change="name" />`, { name: "" });
        const input = root.querySelector("input")!;
        input.value = "a";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.name).toBe(""); // input 事件不触发写入
        input.dispatchEvent(new Event("change", { bubbles: true }));
        await nextTick();
        expect(engine.state.name).toBe("a"); // change 事件触发
    });
});

describe("x-model get/set（表达式 + action）", () => {
    test("get 表达式：state→DOM 变换（形参 value）", () => {
        const { root } = mount(`<input x-model="count" x-model-options="{get:'value*2'}" />`, {
            count: 5,
        });
        expect(root.querySelector("input")!.value).toBe("10");
    });

    test("get action：当前值自动作首参 + 括号追加参数", () => {
        const { root } = mount(
            `<input x-model="ip" x-model-options="{get:'octet(0)'}" />`,
            { ip: "1.2.3.4" },
            // action 须经 mount 第三参传入——engine 构造时包装就绪，compile 期首次求值即可命中
            {
                actions: {
                    octet: (value: string, index: number) => value.split(".")[index],
                },
            } as any,
        );
        expect(root.querySelector("input")!.value).toBe("1");
    });

    test("get 表达式随依赖变化更新", async () => {
        const { root, engine } = mount(
            `<input x-model="count" x-model-options="{get:'value*2'}" />`,
            { count: 5 },
        );
        engine.state.count = 10;
        await nextTick();
        expect(root.querySelector("input")!.value).toBe("20");
    });

    test("set 表达式：DOM 值写到另一字段（形参 $value）", async () => {
        const { root, engine } = mount(
            `<input x-model="src" x-model-options="{set:'dst=$value'}" />`,
            { src: "", dst: "" },
        );
        const input = root.querySelector("input")!;
        input.value = "hello";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.dst).toBe("hello");
    });

    test("set action：拆分写入多字段（this.state 访问）", async () => {
        const { root, engine } = mount(
            `<input x-model="user.first" x-model-options="{set:'setName'}" />`,
            { user: { first: "zhang", last: "" } },
        );
        engine.actions.setName = function (this: any, $value: string) {
            const parts = $value.split(",");
            this.state.user.first = parts[0];
            this.state.user.last = parts[1] ?? "";
        };
        const input = root.querySelector("input")!;
        input.value = "li,si";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.user.first).toBe("li");
        expect(engine.state.user.last).toBe("si");
    });
});

describe("x-model 防循环", () => {
    test("get 不覆盖用户刚输入的值（跳过自己触发的 read 回调）", async () => {
        const { root, engine } = mount(
            `<input x-model="ip" x-model-options="{get:'firstOctet'}" />`,
            { ip: "1.2.3.4" },
            { actions: { firstOctet: (v: string) => v.split(".")[0] } } as any,
        );
        const input = root.querySelector("input")!;
        expect(input.value).toBe("1"); // 初始 get
        // 用户输入完整 ip
        input.value = "5.6.7.8";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.ip).toBe("5.6.7.8");
        // 防循环：input 不被 get 立即改回 "5"
        expect(input.value).toBe("5.6.7.8");
    });

    test("防循环标志重置后，外部更新仍正常应用 get", async () => {
        const { root, engine } = mount(
            `<input x-model="ip" x-model-options="{get:'firstOctet'}" />`,
            { ip: "1.2.3.4" },
            { actions: { firstOctet: (v: string) => v.split(".")[0] } } as any,
        );
        const input = root.querySelector("input")!;
        // 先触发一次自身写入（置位→重置）
        input.value = "5.6.7.8";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        // 外部改 state → _selfWriting 已重置 → get 正常应用
        engine.state.ip = "9.0.0.0";
        await nextTick();
        expect(input.value).toBe("9");
    });
});

describe("x-model 只读降级与冲突", () => {
    test("表达式无 set：只读降级，DOM→state 不回写", async () => {
        const { root, engine } = mount(`<input x-model="a + b" />`, { a: "x", b: "y" });
        const input = root.querySelector("input")!;
        expect(input.value).toBe("xy"); // 读方向（表达式求值）正常
        input.value = "z";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.a).toBe("x"); // 不回写
        expect(engine.state.b).toBe("y");
    });

    test(":value 与 x-model 同元素 → 编译期报错", () => {
        expect(() => mount(`<input x-model="a" :value="b" />`, { a: "", b: "x" })).toThrow();
    });
});

// ── checkbox 单值布尔双向绑定（ADR-0023）─────────────────────────────────

describe("x-model checkbox 单值布尔", () => {
    test("state→DOM：true → checked，false → unchecked", () => {
        const { root } = mount(`<input type="checkbox" x-model="agree" />`, { agree: true });
        expect(root.querySelector("input")!.checked).toBe(true);

        const { root: root2 } = mount(`<input type="checkbox" x-model="agree" />`, { agree: false });
        expect(root2.querySelector("input")!.checked).toBe(false);
    });

    test("DOM→state：勾选写 true，取消写 false", async () => {
        const { root, engine } = mount(`<input type="checkbox" x-model="agree" />`, {
            agree: false,
        });
        const checkbox = root.querySelector("input") as HTMLInputElement;
        // 勾选
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.agree).toBe(true);

        // 取消
        checkbox.checked = false;
        checkbox.dispatchEvent(new Event("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.agree).toBe(false);
    });

    test("外部改 state → checkbox 自动更新", async () => {
        const { root, engine } = mount(`<input type="checkbox" x-model="agree" />`, {
            agree: false,
        });
        const checkbox = root.querySelector("input") as HTMLInputElement;
        expect(checkbox.checked).toBe(false);

        engine.state.agree = true;
        await nextTick();
        expect(checkbox.checked).toBe(true);
    });

    test("Boolean() coerce：非布尔 state 宽容转换", () => {
        // truthy 字符串 → checked
        const { root } = mount(`<input type="checkbox" x-model="v" />`, { v: "yes" });
        expect(root.querySelector("input")!.checked).toBe(true);

        // falsy 字符串 → unchecked
        const { root: root2 } = mount(`<input type="checkbox" x-model="v" />`, { v: "" });
        expect(root2.querySelector("input")!.checked).toBe(false);

        // 数字 → checked
        const { root: root3 } = mount(`<input type="checkbox" x-model="v" />`, { v: 1 });
        expect(root3.querySelector("input")!.checked).toBe(true);

        // null → unchecked
        const { root: root4 } = mount(`<input type="checkbox" x-model="v" />`, { v: null });
        expect(root4.querySelector("input")!.checked).toBe(false);
    });

    test("Boolean() coerce：用户操作后值变为布尔", async () => {
        const { root, engine } = mount(`<input type="checkbox" x-model="v" />`, { v: "yes" });
        const checkbox = root.querySelector("input") as HTMLInputElement;
        expect(checkbox.checked).toBe(true); // Boolean("yes") = true

        // 取消勾选 → 写回 false（布尔）
        checkbox.checked = false;
        checkbox.dispatchEvent(new Event("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.v).toBe(false); // 从 "yes" 变成 false（布尔）
    });

    test("嵌套路径双向", async () => {
        const { root, engine } = mount(`<input type="checkbox" x-model="user.agree" />`, {
            user: { agree: false },
        });
        const checkbox = root.querySelector("input") as HTMLInputElement;
        expect(checkbox.checked).toBe(false);

        checkbox.checked = true;
        checkbox.dispatchEvent(new Event("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.user.agree).toBe(true);
    });

    test("外部更新 → 防循环不跳过（非自身触发的 read 回调正常应用）", async () => {
        const { root, engine } = mount(`<input type="checkbox" x-model="agree" />`, {
            agree: false,
        });
        const checkbox = root.querySelector("input") as HTMLInputElement;

        // 外部改 state
        engine.state.agree = true;
        await nextTick();
        expect(checkbox.checked).toBe(true); // 正常更新
    });

    test("get 变换：Boolean(state) 后写 checked", () => {
        const { root } = mount(
            `<input type="checkbox" x-model="count" x-model-options="{get:'value>0'}" />`,
            { count: 5 },
        );
        expect(root.querySelector("input")!.checked).toBe(true); // 5 > 0 = true

        const { root: root2 } = mount(
            `<input type="checkbox" x-model="count" x-model-options="{get:'value>0'}" />`,
            { count: 0 },
        );
        expect(root2.querySelector("input")!.checked).toBe(false); // 0 > 0 = false
    });

    test(".change 修饰符：监听 change 而非 input", async () => {
        const { root, engine } = mount(`<input type="checkbox" x-model.change="agree" />`, {
            agree: false,
        });
        const checkbox = root.querySelector("input") as HTMLInputElement;

        // input 事件不触发写入
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.agree).toBe(false); // 未写入

        // change 事件触发写入
        checkbox.dispatchEvent(new Event("change", { bubbles: true }));
        await nextTick();
        expect(engine.state.agree).toBe(true); // 写入
    });

    test(".trim/.number 修饰符对 checkbox 空转（不报错、不影响）", async () => {
        const { root, engine } = mount(
            `<input type="checkbox" x-model.trim.number="agree" />`,
            { agree: false },
        );
        const checkbox = root.querySelector("input") as HTMLInputElement;
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.agree).toBe(true); // 修饰符空转，正常写入布尔
    });
});

describe("x-model checkbox 冲突检测", () => {
    test(":checked 与 x-model 同元素 → 编译期报错", () => {
        expect(() =>
            mount(`<input type="checkbox" x-model="a" :checked="b" />`, { a: false, b: true }),
        ).toThrow();
    });

    test(":value 与 x-model checkbox 同元素 → 放行（不报错，:value 设选项值）", () => {
        // checkbox 的 :value 设选项值（提交到表单的值），不与 x-model 竞写
        expect(() =>
            mount(`<input type="checkbox" x-model="a" :value="'yes'" />`, { a: false }),
        ).not.toThrow();
    });
});

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

// ── radio 双向绑定 ──────────────────────────────────────────────────────────

describe("x-model radio 双向绑定", () => {
    test("state→DOM：state 值匹配 radio value → checked", () => {
        const { root } = mount(
            `<input type="radio" value="male" x-model="gender" />`,
            { gender: "male" },
        );
        expect(root.querySelector("input")!.checked).toBe(true);

        const { root: root2 } = mount(
            `<input type="radio" value="male" x-model="gender" />`,
            { gender: "female" },
        );
        expect(root2.querySelector("input")!.checked).toBe(false);
    });

    test("DOM→state：勾选写 radio value，取消不写", async () => {
        const { root, engine } = mount(
            `<input type="radio" value="male" x-model="gender" />`,
            { gender: "" },
        );
        const radio = root.querySelector("input") as HTMLInputElement;
        expect(radio.checked).toBe(false);

        // 勾选 → 写入 el.value
        radio.checked = true;
        radio.dispatchEvent(new Event("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.gender).toBe("male");
    });

    test("radio 组互斥：多个同名 radio 共享 state", async () => {
        const { root, engine } = mount(
            `<input type="radio" name="g" value="male" x-model="gender" />` +
            `<input type="radio" name="g" value="female" x-model="gender" />`,
            { gender: "male" },
        );
        const radios = root.querySelectorAll("input") as NodeListOf<HTMLInputElement>;
        expect(radios[0].checked).toBe(true);
        expect(radios[1].checked).toBe(false);

        // 选中第二个 → state 变更 → 第一个自动取消
        radios[1].checked = true;
        radios[1].dispatchEvent(new Event("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.gender).toBe("female");
    });

    test("外部改 state → radio 自动更新选中态", async () => {
        const { root, engine } = mount(
            `<input type="radio" name="g" value="male" x-model="gender" />` +
            `<input type="radio" name="g" value="female" x-model="gender" />`,
            { gender: "male" },
        );
        const radios = root.querySelectorAll("input") as NodeListOf<HTMLInputElement>;
        expect(radios[0].checked).toBe(true);

        engine.state.gender = "female";
        await nextTick();
        expect(radios[0].checked).toBe(false);
        expect(radios[1].checked).toBe(true);
    });

    test("嵌套路径双向", async () => {
        const { root, engine } = mount(
            `<input type="radio" value="yes" x-model="user.agree" />`,
            { user: { agree: "" } },
        );
        const radio = root.querySelector("input") as HTMLInputElement;
        expect(radio.checked).toBe(false);

        radio.checked = true;
        radio.dispatchEvent(new Event("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.user.agree).toBe("yes");
    });

    test("外部更新 → 防循环不跳过", async () => {
        const { root, engine } = mount(
            `<input type="radio" value="a" x-model="choice" />`,
            { choice: "" },
        );
        const radio = root.querySelector("input") as HTMLInputElement;
        expect(radio.checked).toBe(false);

        engine.state.choice = "a";
        await nextTick();
        expect(radio.checked).toBe(true);
    });

    test("get 变换：state 值经 get 后与 radio value 比较", () => {
        const { root } = mount(
            `<input type="radio" value="M" x-model="gender" x-model-options="{get:'value.toUpperCase()'}" />`,
            { gender: "m" },
        );
        // get: "m".toUpperCase() = "M"，与 radio value "M" 匹配 → checked
        expect(root.querySelector("input")!.checked).toBe(true);
    });

    test(".change 修饰符：监听 change 而非 input", async () => {
        const { root, engine } = mount(
            `<input type="radio" value="a" x-model.change="choice" />`,
            { choice: "" },
        );
        const radio = root.querySelector("input") as HTMLInputElement;

        // input 事件不触发写入
        radio.checked = true;
        radio.dispatchEvent(new Event("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.choice).toBe("");

        // change 事件触发写入
        radio.dispatchEvent(new Event("change", { bubbles: true }));
        await nextTick();
        expect(engine.state.choice).toBe("a");
    });

    test(".trim/.number 修饰符对 radio 空转", async () => {
        const { root, engine } = mount(
            `<input type="radio" value="yes" x-model.trim.number="choice" />`,
            { choice: "" },
        );
        const radio = root.querySelector("input") as HTMLInputElement;
        radio.checked = true;
        radio.dispatchEvent(new Event("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.choice).toBe("yes"); // 修饰符空转
    });
});

// ── .boolean 修饰符（ADR-0024 决策 3：严格字符串集）─────────────────────────

describe("x-model .boolean 修饰符", () => {
    test('text："true" → true（严格集命中）', async () => {
        const { root, engine } = mount(`<input x-model.boolean="flag" />`, { flag: false });
        const input = root.querySelector("input") as HTMLInputElement;
        input.value = "true";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.flag).toBe(true);
    });

    test('text："false" → false（严格集命中，非 Boolean() 陷阱）', async () => {
        const { root, engine } = mount(`<input x-model.boolean="flag" />`, { flag: true });
        const input = root.querySelector("input") as HTMLInputElement;
        input.value = "false";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.flag).toBe(false); // Boolean("false")===true 是陷阱，严格集修复
    });

    test('text：空串 → false（空=否定）', async () => {
        const { root, engine } = mount(`<input x-model.boolean="flag" />`, { flag: true });
        const input = root.querySelector("input") as HTMLInputElement;
        input.value = "";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.flag).toBe(false);
    });

    test('text：未识别串保留原值（"abc"/"0" 不破坏，镜像 .number NaN 回退）', async () => {
        const { root, engine } = mount(`<input x-model.boolean="flag" />`, { flag: false });
        const input = root.querySelector("input") as HTMLInputElement;
        input.value = "abc";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.flag).toBe("abc"); // 保留原字符串

        input.value = "0";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.flag).toBe("0"); // "0" 不在严格集，保留
    });

    test(".trim.boolean：trim 先行（\" true \" → true）", async () => {
        const { root, engine } = mount(`<input x-model.trim.boolean="flag" />`, {
            flag: false,
        });
        const input = root.querySelector("input") as HTMLInputElement;
        input.value = " true ";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.flag).toBe(true);
    });

    test(".boolean.number 顺序执行：boolean 先转、number 后跑毁掉布尔（冲突自担）", async () => {
        const { root, engine } = mount(`<input x-model.boolean.number="flag" />`, {
            flag: false,
        });
        const input = root.querySelector("input") as HTMLInputElement;
        input.value = "true";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        // boolean 先（"true"→true），number 后（Number(true)=1）——顺序执行、不短路
        expect(engine.state.flag).toBe(1);
    });

    test(".number.boolean 顺序执行：number 先 NaN 回退、boolean 后转（得到 true）", async () => {
        const { root, engine } = mount(`<input x-model.number.boolean="flag" />`, {
            flag: false,
        });
        const input = root.querySelector("input") as HTMLInputElement;
        input.value = "true";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        // number 先（Number("true")=NaN → 回退 "true"），boolean 后（"true"→true）
        expect(engine.state.flag).toBe(true);
    });

    test("checkbox 空转：.boolean 对恒写布尔的 checkbox 冗余无害", async () => {
        const { root, engine } = mount(
            `<input type="checkbox" x-model.boolean="agree" />`,
            { agree: false },
        );
        const checkbox = root.querySelector("input") as HTMLInputElement;
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.agree).toBe(true); // 仍是布尔
    });

    test("radio 布尔对：勾选写布尔（value 经严格集转换）", async () => {
        const { root, engine } = mount(
            `<input type="radio" name="sw" value="true" x-model.boolean="enabled" />` +
                `<input type="radio" name="sw" value="false" x-model.boolean="enabled" />`,
            { enabled: "" },
        );
        const radios = root.querySelectorAll("input") as NodeListOf<HTMLInputElement>;

        // 勾选"开启" → value="true" 经严格集 → 写入布尔 true（非字符串 "true"）
        radios[0].checked = true;
        radios[0].dispatchEvent(new Event("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.enabled).toBe(true);

        // 切到"关闭" → 写入布尔 false（非字符串 "false"）
        radios[1].checked = true;
        radios[1].dispatchEvent(new Event("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.enabled).toBe(false);
    });

    test("radio 读方向注意：.boolean 仅写方向，布尔 state 需 get 变换才能匹配 value", () => {
        // 读方向 display === el.value：true === "true" 不匹配（.boolean 不作用于读方向，Q5 决策）
        // 要让布尔 state 驱动 radio 选中，须 get:'String(value)' 转字符串后再与 value 比较
        const { root } = mount(
            `<input type="radio" name="sw" value="true" x-model="enabled" x-model-options="{get:'String(value)'}" />`,
            { enabled: true },
        );
        expect((root.querySelector("input") as HTMLInputElement).checked).toBe(true);
    });

    test('radio 值不在严格集：warn 一次 + 保留原值写回', async () => {
        const { root, engine } = mount(
            `<input type="radio" value="abc" x-model.boolean="choice" />`,
            { choice: "" },
        );
        const radio = root.querySelector("input") as HTMLInputElement;
        radio.checked = true;
        radio.dispatchEvent(new Event("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.choice).toBe("abc"); // 保留原值
    });

    test("宿主选项回退：x-options={boolean:true} 元素级生效", async () => {
        // 宿主选项挂在 x-model 元素自身（x-options 解析自指令宿主元素，非父容器）
        const { root, engine } = mount(
            `<input x-model="flag" x-options="{boolean:true}" />`,
            { flag: false },
        );
        const input = root.querySelector("input") as HTMLInputElement;
        input.value = "true";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        await nextTick();
        expect(engine.state.flag).toBe(true);
    });
});

describe("x-model radio value 缺失检测", () => {
    test("radio 无 value 属性 → warn + 跳过绑定", () => {
        // radio 默认 value="on"，应 warn 并跳过
        const { root, engine } = mount(
            `<input type="radio" x-model="choice" />`,
            { choice: "" },
        );
        const radio = root.querySelector("input") as HTMLInputElement;
        // 跳过绑定后，radio 不受 state 控制
        expect(radio.checked).toBe(false); // 不被设置
    });

    test("radio value='on'（HTML 默认）→ 同样 warn + 跳过", () => {
        const { root } = mount(
            `<input type="radio" value="on" x-model="choice" />`,
            { choice: "on" },
        );
        // 跳过绑定，即使 state 值恰好是 "on"
        expect(root.querySelector("input")!.checked).toBe(false);
    });
});

describe("x-model radio 冲突检测", () => {
    test(":checked 与 x-model radio 同元素 → 编译期报错", () => {
        expect(() =>
            mount(
                `<input type="radio" value="a" x-model="c" :checked="b" />`,
                { c: "", b: true },
            ),
        ).toThrow();
    });

    test(":value 与 x-model radio 同元素 → 放行（:value 设选项值）", () => {
        expect(() =>
            mount(
                `<input type="radio" x-model="c" :value="'a'" />`,
                { c: "" },
            ),
        ).not.toThrow();
    });
});

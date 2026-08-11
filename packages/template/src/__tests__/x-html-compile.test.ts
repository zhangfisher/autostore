import { describe, expect, test } from "bun:test";
import "./setup";
import { mount, nextTick } from "./helpers";

/**
 * x-html.compile 修饰符测试（ADR-0017）。
 *
 * 把绑定值作为子模板编译进宿主子树（反转 x-html「不编译注入内容」的原定位）：
 * 注入内容写回 scope.template 后调 recompileSubtree，建 scope/watcher、继承宿主作用域。
 *
 * 覆盖决策树：基础编译(Q1/Q2)、作用域继承(Q5)、值变全量重建(Q4)、空值清空+忽略 empty(Q7)、
 * .hide(Q7)、隐式跳过消毒+编译生效(Q3)、嵌套结构指令(Q5)。
 */
describe("x-html.compile - 子模板编译", () => {
    test("基础：注入含 x-text 的模板，求值生效（指令属性被编译剥除）", () => {
        const { root } = mount(`<div id="app"><div x-html.compile="tpl"></div></div>`, {
            tpl: "<span x-text='name'></span>",
            name: "zhang",
        });
        expect(root).toEqualHTML(`<div><div id="app"><div><span>zhang</span></div></div></div>`);
    });

    test("注入 {{}} 插值：顶层文本插值注册到宿主 scope", () => {
        const { root } = mount(`<div id="app"><div x-html.compile="tpl"></div></div>`, {
            tpl: "Hello {{name}}",
            name: "zhang",
        });
        expect(root).toEqualHTML(`<div><div id="app"><div>Hello zhang</div></div></div>`);
    });

    test("作用域继承：注入模板取到宿主 x-data 的局部变量（dataScope 经 _linkParent 传递）", () => {
        const { root } = mount(
            `<div id="app"><div x-data="{msg:'hi'}" x-html.compile="tpl"></div></div>`,
            { tpl: "<span x-text='msg'></span>" },
        );
        expect(root).toEqualHTML(`<div><div id="app"><div><span>hi</span></div></div></div>`);
    });

    test("值变全量重建：tpl 变化后旧子树销毁、新内容编译（Q4）", async () => {
        const { root, store } = mount(`<div id="app"><div x-html.compile="tpl"></div></div>`, {
            tpl: "<span x-text='a'></span>",
            a: "1",
            b: "2",
        });
        expect(root).toEqualHTML(`<div><div id="app"><div><span>1</span></div></div></div>`);
        store.state.tpl = "<span x-text='b'></span>";
        await nextTick();
        expect(root).toEqualHTML(`<div><div id="app"><div><span>2</span></div></div></div>`);
    });

    test("编译后注入内容的绑定持续响应 state（watcher 建立 = 编译生效）", async () => {
        const { root, store } = mount(`<div id="app"><div x-html.compile="tpl"></div></div>`, {
            tpl: "<span x-text='name'></span>",
            name: "a",
        });
        store.state.name = "b";
        await nextTick();
        expect(root).toEqualHTML(`<div><div id="app"><div><span>b</span></div></div></div>`);
    });

    test("空值：tpl=null 销毁子树 + 清空宿主，忽略 empty 文案（Q7）", async () => {
        const { root, store } = mount(
            `<div id="app"><div x-html.compile="tpl" x-html-options="{empty:'占位'}"></div></div>`,
            { tpl: "<span x-text='name'></span>", name: "a" },
        );
        store.state.tpl = null;
        await nextTick();
        // empty 文案被忽略（结构空状态无文案占位语义），宿主清空
        expect(root).toEqualHTML(`<div><div id="app"><div></div></div></div>`);
    });

    test(".hide：空值时宿主 display:none，非空还原（Q7）", async () => {
        const { root, store } = mount(`<div id="app"><div x-html.compile.hide="tpl"></div></div>`, {
            tpl: "<span>x</span>",
        });
        expect(root).toEqualHTML(`<div><div id="app"><div><span>x</span></div></div></div>`);
        // 空值 → 隐藏宿主
        store.state.tpl = null;
        await nextTick();
        const host = root.querySelector("#app > div") as HTMLElement;
        expect(host.style.display).toBe("none");
        // 恢复非空 → 还原 display（无内联 display → 还原为空串）
        store.state.tpl = "<span>y</span>";
        await nextTick();
        expect(host.style.display).toBe("");
        expect(root).toEqualHTML(`<div><div id="app"><div><span>y</span></div></div></div>`);
    });

    test("对照：.raw 模式注入同样字符串不编译，属性残留、不响应 state（Q3 编译 vs 静态）", async () => {
        const { root, store } = mount(`<div id="app"><div x-html.raw="tpl"></div></div>`, {
            tpl: "<span x-text='name'></span>",
            name: "a",
        });
        // .raw 原样写 innerHTML：x-text 属性残留、内容为空（未编译）
        expect(root).toEqualHTML(
            `<div><div id="app"><div><span x-text="name"></span></div></div></div>`,
        );
        store.state.name = "b";
        await nextTick();
        // 未编译 → name 变化不影响注入的静态 span
        expect(root).toEqualHTML(
            `<div><div id="app"><div><span x-text="name"></span></div></div></div>`,
        );
    });

    test("嵌套结构指令：注入含 x-for 的模板并展开（Q5）", () => {
        const { root } = mount(`<div id="app"><div x-html.compile="tpl"></div></div>`, {
            tpl: "<ul x-for='n of nums'><li x-text='n'></li></ul>",
            nums: [1, 2, 3],
        });
        expect(root).toEqualHTML(
            `<div><div id="app"><div><ul><li>1</li><li>2</li><li>3</li></ul></div></div></div>`,
        );
    });
});

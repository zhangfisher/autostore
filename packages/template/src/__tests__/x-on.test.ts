import { describe, expect, test } from "bun:test";
import "./setup";
import { mount, nextTick } from "./helpers";

/**
 * x-on 事件指令测试。
 *
 * 约定：聚合视图只读（context.ts），表达式路径不能写已有 state 键——故"改 state"一律经
 * action（`this.store.state`）；"表达式执行"用全局 spy 或无副作用断言验证。
 * actions 经 `engine.actions.xxx = fn`（getter 返回 options.actions 同一引用）注册。
 */

describe("x-on 基础解析与触发", () => {
    test("@click 触发表达式（全局函数）", () => {
        let called = 0;
        (globalThis as any).__spy = () => {
            called++;
        };
        const { root } = mount(`<button @click="__spy()">x</button>`, {});
        root.querySelector("button")!.click();
        expect(called).toBe(1);
        delete (globalThis as any).__spy;
    });

    test("@click 与 x-on:click 等价触发", () => {
        let n = 0;
        const { root, engine } = mount(
            `<button @click="fn()">a</button><button x-on:click="fn()">b</button>`,
            {},
        );
        engine.actions.fn = () => {
            n++;
        };
        const btns = root.querySelectorAll("button");
        btns[0]!.click();
        btns[1]!.click();
        expect(n).toBe(2);
    });

    test("@click 无值时不报错、不绑定", () => {
        const { root } = mount(`<button @click>x</button>`, {});
        expect(root.querySelector("button")).not.toBeNull();
    });
});

describe("x-on 函数来源（Action 优先 + 表达式兜底）", () => {
    test('engine.actions 命中：@click="submit" 调用 action', () => {
        let n = 0;
        const { root, engine } = mount(`<button @click="submit">x</button>`, {});
        engine.actions.submit = () => {
            n++;
        };
        root.querySelector("button")!.click();
        expect(n).toBe(1);
    });

    test('engine.actions 带参：@click="pay(1)" 透传 args', () => {
        let received: any[] = [];
        const { root, engine } = mount(`<button @click="pay(1, 2)">x</button>`, {});
        engine.actions.pay = (...args: any[]) => {
            received = args;
        };
        root.querySelector("button")!.click();
        expect(received).toEqual([1, 2]);
    });

    test("空括号 submit() 等价裸名 submit", () => {
        let n = 0;
        const { root, engine } = mount(`<button @click="incr()">x</button>`, {});
        engine.actions.incr = () => {
            n++;
        };
        root.querySelector("button")!.click();
        expect(n).toBe(1);
    });

    test("表达式兜底：未注册 action 走 with(scope) 表达式", () => {
        let called = 0;
        (globalThis as any).__spy = () => {
            called++;
        };
        const { root } = mount(`<button @click="__spy()">x</button>`, {});
        root.querySelector("button")!.click();
        expect(called).toBe(1);
        delete (globalThis as any).__spy;
    });

    test("action 内 this.store.state 写入联动响应式", async () => {
        const { root, engine } = mount(
            `<span x-text="count"></span><button @click="incr">+</button>`,
            { count: 0 },
        );
        engine.actions.incr = function () {
            // @ts-ignore
            this.store.state.count++;
        };
        root.querySelector("button")!.click();
        await nextTick();
        expect(root.querySelector("span")!.textContent).toBe("1");
    });
});

describe("x-on this 上下文与 $event", () => {
    test("action 的 this 含 el/$event/$options（含 modifier 开关）", () => {
        let ctx: any;
        const { root, engine } = mount(`<button @click.left="save()">x</button>`, {});
        engine.actions.save = function () {
            ctx = this;
        };
        const btn = root.querySelector("button")!;
        btn.dispatchEvent(new MouseEvent("click", { button: 0 }));
        expect(ctx.el).toBe(btn);
        expect(ctx.$event.type).toBe("click");
        // .left modifier 经解析期注入为 options.left=true，经 $options 聚合视图暴露（ADR-0007）
        expect(ctx.$options.left).toBe(true);
    });

    test('$event 注入：@input="recv($event.target.value)"', () => {
        let received = "";
        const { root, engine } = mount(`<input @input="recv($event.target.value)" />`, {});
        engine.actions.recv = function (v: string) {
            received = v;
        };
        const input = root.querySelector("input")!;
        input.value = "hello";
        input.dispatchEvent(new InputEvent("input", { bubbles: true }));
        expect(received).toBe("hello");
    });
});

describe("x-on option 类修饰符", () => {
    test("@click.once 只触发一次", () => {
        let n = 0;
        const { root, engine } = mount(`<button @click.once="fn()">x</button>`, {});
        engine.actions.fn = () => {
            n++;
        };
        const btn = root.querySelector("button")!;
        btn.click();
        btn.click();
        expect(n).toBe(1);
    });

    test("@click.capture 在捕获阶段先于子元素触发", () => {
        const order: string[] = [];
        const { root, engine } = mount(
            `<div @click.capture="parent()"><button @click="child()">x</button></div>`,
            {},
        );
        engine.actions.parent = () => order.push("p");
        engine.actions.child = () => order.push("c");
        root.querySelector("button")!.click();
        expect(order).toEqual(["p", "c"]);
    });
});

describe("x-on guard 类修饰符 - 系统", () => {
    test("@click.ctrl 仅 ctrlKey 触发", () => {
        let n = 0;
        const { root, engine } = mount(`<button @click.ctrl="fn()">x</button>`, {});
        engine.actions.fn = () => {
            n++;
        };
        const btn = root.querySelector("button")!;
        btn.dispatchEvent(new MouseEvent("click", { ctrlKey: false }));
        expect(n).toBe(0);
        btn.dispatchEvent(new MouseEvent("click", { ctrlKey: true }));
        expect(n).toBe(1);
    });

    test("@keydown.ctrl.exact 仅 ctrl（不能带其他系统键）", () => {
        let n = 0;
        const { root, engine } = mount(`<input @keydown.ctrl.exact="fn()" />`, {});
        engine.actions.fn = () => {
            n++;
        };
        const input = root.querySelector("input")!;
        input.dispatchEvent(
            new KeyboardEvent("keydown", { key: "a", ctrlKey: true, shiftKey: true }),
        );
        expect(n).toBe(0);
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "a", ctrlKey: true }));
        expect(n).toBe(1);
    });

    test("@keydown.exact 单独=无系统修饰符", () => {
        let n = 0;
        const { root, engine } = mount(`<input @keydown.exact="fn()" />`, {});
        engine.actions.fn = () => {
            n++;
        };
        const input = root.querySelector("input")!;
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "a", ctrlKey: true }));
        expect(n).toBe(0);
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
        expect(n).toBe(1);
    });
});

describe("x-on guard 类修饰符 - 按键别名", () => {
    test("@keydown.enter 仅 Enter 触发", () => {
        let n = 0;
        const { root, engine } = mount(`<input @keydown.enter="fn()" />`, {});
        engine.actions.fn = () => {
            n++;
        };
        const input = root.querySelector("input")!;
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
        expect(n).toBe(0);
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
        expect(n).toBe(1);
    });

    test("@keydown.delete 捕获 Delete 与 Backspace", () => {
        let n = 0;
        const { root, engine } = mount(`<input @keydown.delete="fn()" />`, {});
        engine.actions.fn = () => {
            n++;
        };
        const input = root.querySelector("input")!;
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "Delete" }));
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "Backspace" }));
        expect(n).toBe(2);
    });

    test("@keydown.up 方向键 ↑", () => {
        let n = 0;
        const { root, engine } = mount(`<input @keydown.up="fn()" />`, {});
        engine.actions.fn = () => {
            n++;
        };
        root.querySelector("input")!.dispatchEvent(
            new KeyboardEvent("keydown", { key: "ArrowUp" }),
        );
        expect(n).toBe(1);
    });
});

describe("x-on guard 类修饰符 - 鼠标双义", () => {
    test("@click.left 走 mouse 分支（button 0）", () => {
        let n = 0;
        const { root, engine } = mount(`<button @click.left="fn()">x</button>`, {});
        engine.actions.fn = () => {
            n++;
        };
        const btn = root.querySelector("button")!;
        btn.dispatchEvent(new MouseEvent("click", { button: 2 }));
        expect(n).toBe(0);
        btn.dispatchEvent(new MouseEvent("click", { button: 0 }));
        expect(n).toBe(1);
    });

    test("@keydown.left 走 key 分支（ArrowLeft）", () => {
        let n = 0;
        const { root, engine } = mount(`<input @keydown.left="fn()" />`, {});
        engine.actions.fn = () => {
            n++;
        };
        root.querySelector("input")!.dispatchEvent(
            new KeyboardEvent("keydown", { key: "ArrowLeft" }),
        );
        expect(n).toBe(1);
    });

    test("@mousedown.middle 中键（button 1）", () => {
        let n = 0;
        const { root, engine } = mount(`<button @mousedown.middle="fn()">x</button>`, {});
        engine.actions.fn = () => {
            n++;
        };
        const btn = root.querySelector("button")!;
        btn.dispatchEvent(new MouseEvent("mousedown", { button: 0 }));
        expect(n).toBe(0);
        btn.dispatchEvent(new MouseEvent("mousedown", { button: 1 }));
        expect(n).toBe(1);
    });

    test("@contextmenu.right 右键（button 2）", () => {
        let n = 0;
        const { root, engine } = mount(`<button @contextmenu.right="fn()">x</button>`, {});
        engine.actions.fn = () => {
            n++;
        };
        root.querySelector("button")!.dispatchEvent(new MouseEvent("contextmenu", { button: 2 }));
        expect(n).toBe(1);
    });
});

describe("x-on guard self", () => {
    test("@click.self 仅 target===el 触发", () => {
        let n = 0;
        const { root, engine } = mount(`<div @click.self="fn()"><button>x</button></div>`, {});
        engine.actions.fn = () => {
            n++;
        };
        root.querySelector("button")!.click(); // 子元素冒泡，target!==div
        expect(n).toBe(0);
        root.querySelector("div")!.click(); // 点 div 本身
        expect(n).toBe(1);
    });
});

describe("x-on wrapper debounce", () => {
    test("@click.debounce 默认 300ms，连续点击仅最后一次生效", async () => {
        let n = 0;
        const { root, engine } = mount(`<button @click.debounce="fn()">x</button>`, {});
        engine.actions.fn = () => {
            n++;
        };
        const btn = root.querySelector("button")!;
        btn.click();
        btn.click();
        btn.click();
        expect(n).toBe(0);
        await new Promise((r) => setTimeout(r, 350));
        expect(n).toBe(1);
    });

    test('x-on-options="{debounce:500}" 自定义时长（options 通道）', async () => {
        let n = 0;
        const { root, engine } = mount(
            `<button @click="fn()" x-on-options="{debounce:500}">x</button>`,
            {},
        );
        engine.actions.fn = () => {
            n++;
        };
        const btn = root.querySelector("button")!;
        btn.click();
        await new Promise((r) => setTimeout(r, 300));
        expect(n).toBe(0); // 300ms 还未到 500ms
        await new Promise((r) => setTimeout(r, 250));
        expect(n).toBe(1);
    });

    test("destroy 取消 pending debounce timer", async () => {
        let n = 0;
        const { root, engine } = mount(`<button @click.debounce="fn()">x</button>`, {});
        engine.actions.fn = () => {
            n++;
        };
        root.querySelector("button")!.click();
        engine.destroy(); // 销毁应取消 pending timer
        await new Promise((r) => setTimeout(r, 350));
        expect(n).toBe(0);
    });
});

describe("x-on 修饰符组合", () => {
    test("多 guard AND：@keydown.ctrl.enter 必须 ctrl+Enter", () => {
        let n = 0;
        const { root, engine } = mount(`<input @keydown.ctrl.enter="fn()" />`, {});
        engine.actions.fn = () => {
            n++;
        };
        const input = root.querySelector("input")!;
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
        expect(n).toBe(0); // 无 ctrl
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", ctrlKey: true }));
        expect(n).toBe(1);
    });

    test("debounce + guard：防抖后才校验 guard", async () => {
        let n = 0;
        const { root, engine } = mount(`<button @click.debounce.ctrl="fn()">x</button>`, {});
        engine.actions.fn = () => {
            n++;
        };
        const btn = root.querySelector("button")!;
        // ctrl 未按下：debounce 触发后 guard fail
        btn.dispatchEvent(new MouseEvent("click", { ctrlKey: false }));
        await new Promise((r) => setTimeout(r, 350));
        expect(n).toBe(0);
        // ctrl 按下：通过
        btn.dispatchEvent(new MouseEvent("click", { ctrlKey: true }));
        await new Promise((r) => setTimeout(r, 350));
        expect(n).toBe(1);
    });
});

describe("x-on destroy 解绑", () => {
    test("engine.destroy 后再点击不触发", () => {
        let n = 0;
        const { root, engine } = mount(`<button @click="fn()">x</button>`, {});
        engine.actions.fn = () => {
            n++;
        };
        const btn = root.querySelector("button")!;
        engine.destroy();
        btn.click(); // listener 已 removeEventListener
        expect(n).toBe(0);
    });
});

describe('x-on <script type="actions"> 局部 action', () => {
    test("局部 action 经 scope 链查找到并执行", () => {
        const { root, store } = mount(
            `<div x-data="{}"><button @click="localFn()">+</button><script type="actions">{ 
                localFn(){ this.store.state.count++ } 
            }</script></div>`,
            { count: 0 },
        );
        root.querySelector("button")!.click();
        expect(store.state.count).toBe(1);
    });

    test("局部 action 覆盖同名全局 action", () => {
        const { root, store, engine } = mount(
            `<div x-data="{}"><button @click="who()">x</button><script type="actions">{ who(){ this.store.state.who = "local" } }</script></div>`,
            { who: "none", count: 0 },
        );
        engine.actions.who = function (this: any) {
            this.store.state.who = "global";
        };
        root.querySelector("button")!.click();
        expect(store.state.who).toBe("local");
    });

    test("普通 <script> 原样保留在渲染 DOM", () => {
        const { root } = mount(`<div><script>var a = 1;</script></div>`, {});
        const s = root.querySelector("script");
        expect(s).not.toBeNull();
        expect(s!.textContent).toContain("var a");
    });

    test('<script type="actions"> 提取后从 DOM 移除', () => {
        const { root } = mount(
            `<div x-data="{}"><button @click="f()">x</button><script type="actions">{ f(){} }</script></div>`,
            {},
        );
        expect(root.querySelector("script")).toBeNull();
    });
});

/**
 * x-on 结合 x-data（含嵌套）。
 *
 * AutoTemplateActionContext 语义：
 * - `this.data`：scope.getScopeContext() 聚合视图 —— localScope + dataScope + 全局 state，
 *   **可读可写**：写 x-data 字段透传到响应式 dataScope（store.state._scopes[id]）触发更新。
 * - `this.scope`：AutoTemplateScope 实例 —— 经 getDataScope() 沿链拿最近 x-data 域（dataScope 引用）。
 *
 * action 读写 x-data 均可经 `this.data.<字段>`；嵌套场景沿 parent 链自动定位最近 x-data 块。
 */
describe("x-on 结合 x-data（含嵌套）", () => {
    test("this.data 读取 x-data 注入的字段", () => {
        let received: any;
        const { root, engine } = mount(
            `<div x-data="{count:5}"><button @click="read">?</button></div>`,
            {},
        );
        engine.actions.read = function (this: any) {
            received = this.data.count;
        };
        root.querySelector("button")!.click();
        expect(received).toBe(5);
    });

    test("this.data 聚合 x-data 与全局 state", () => {
        let received: any;
        const { root, engine } = mount(
            `<div x-data="{local:1}"><button @click="read">?</button></div>`,
            {
                global: 2,
            },
        );
        engine.actions.read = function (this: any) {
            received = { local: this.data.local, global: this.data.global };
        };
        root.querySelector("button")!.click();
        expect(received).toEqual({ local: 1, global: 2 });
    });

    test("this.scope 为 AutoTemplateScope 实例，getDataScope() 沿链取 dataScope", () => {
        let captured: any;
        const { root, engine } = mount(
            `<div x-data="{count:0}"><button @click="probe">?</button></div>`,
            {},
        );
        engine.actions.probe = function (this: any) {
            captured = this.scope;
        };
        root.querySelector("button")!.click();
        // x-data 在父 div：button 自身 scope 不直接持有 dataScope（null），
        // 须经 getDataScope() 沿 parent 链（或 this.data 代理视图）才能取到——
        // 即"x-data 数据在 _scopeView 中经代理获取，而非 scope 直接拥有"。
        expect(captured.dataScope).toBeNull();
        expect(captured.getDataScope()).toEqual({ count: 0 });
        expect(captured.engine).toBe(engine);
    });

    test("嵌套：后代 action 的 this.data 经聚合视图读祖先 x-data", () => {
        let received: any;
        const { root, engine } = mount(
            `<div x-data="{count:7}"><div><button @click="read">?</button></div></div>`,
            {},
        );
        engine.actions.read = function (this: any) {
            received = this.data.count;
        };
        root.querySelector("button")!.click();
        expect(received).toBe(7);
    });

    test("嵌套覆盖：this.data 取最近（内层）x-data 字段", () => {
        let received: any;
        const { root, engine } = mount(
            `<div x-data="{count:1}"><div x-data="{count:2}"><button @click="read">?</button></div></div>`,
            {},
        );
        engine.actions.read = function (this: any) {
            received = this.data.count;
        };
        root.querySelector("button")!.click();
        expect(received).toBe(2);
    });

    test("this.scope.getDataScope() 写最近 x-data 联动 DOM", async () => {
        const { root, engine } = mount(
            `<div x-data="{count:0}"><button @click="incr">+</button><span x-text="count"></span></div>`,
            {},
        );
        engine.actions.incr = function (this: any) {
            this.scope.getDataScope().count++;
        };
        root.querySelector("button")!.click();
        await nextTick();
        expect(root.querySelector("span")!.textContent).toBe("1");
    });

    test("嵌套：后代 action 经 getDataScope() 沿链写祖先 x-data", async () => {
        const { root, engine } = mount(
            `<div x-data="{count:0}"><div><button @click="incr">+</button></div><span x-text="count"></span></div>`,
            {},
        );
        engine.actions.incr = function (this: any) {
            // 后代 button 无自身 x-data，getDataScope() 沿 parent 链取到祖先 div 的 dataScope
            this.scope.getDataScope().count++;
        };
        root.querySelector("button")!.click();
        await nextTick();
        expect(root.querySelector("span")!.textContent).toBe("1");
    });

    test("嵌套覆盖写：内层 getDataScope() 指向内层，外层不变", async () => {
        const { root, engine } = mount(
            `<div x-data="{count:1}"><span class="outer" x-text="count"></span><div x-data="{count:2}"><span class="inner" x-text="count"></span><button @click="incr">+</button></div></div>`,
            {},
        );
        engine.actions.incr = function (this: any) {
            this.scope.getDataScope().count++;
        };
        root.querySelector("button")!.click();
        await nextTick();
        expect(root.querySelector(".inner")!.textContent).toBe("3");
        expect(root.querySelector(".outer")!.textContent).toBe("1");
    });

    test("无 x-data：getDataScope() 返回 null，data 仍读全局 state", () => {
        let dataScope: any;
        let received: any;
        const { root, engine } = mount(`<button @click="probe">?</button>`, { global: 9 });
        engine.actions.probe = function (this: any) {
            dataScope = this.scope.getDataScope();
            received = this.data.global;
        };
        root.querySelector("button")!.click();
        expect(dataScope).toBeNull();
        expect(received).toBe(9);
    });

    test("this.data 可写：写入 x-data 字段透传到 store 并联动 DOM", async () => {
        const { root, engine } = mount(
            `<div x-data="{count:5}"><button @click="write">?</button><span x-text="count"></span></div>`,
            {},
        );
        engine.actions.write = function (this: any) {
            this.data.count = 99; // 聚合视图 set 透传到响应式 dataScope
        };
        root.querySelector("button")!.click();
        await nextTick();
        expect(root.querySelector("span")!.textContent).toBe("99");
    });

    test('表达式写入：@click="count++" 经 with(data) 透传到 dataScope', async () => {
        const { root } = mount(
            `<div x-data="{count:5}"><button @click="count++">+</button><span x-text="count"></span></div>`,
            {},
        );
        root.querySelector("button")!.click();
        await nextTick();
        expect(root.querySelector("span")!.textContent).toBe("6");
    });

    test('局部 <script type="actions"> action 经 getDataScope() 写 x-data', async () => {
        const { root } = mount(
            `<div x-data="{count:0}"><button @click="incr">+</button><span x-text="count"></span><script type="actions">{ incr(){ this.scope.getDataScope().count++ } }</script></div>`,
            {},
        );
        root.querySelector("button")!.click();
        await nextTick();
        expect(root.querySelector("span")!.textContent).toBe("1");
    });
});

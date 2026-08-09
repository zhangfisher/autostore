import { describe, expect, test } from "bun:test";
import "./setup";
import { mount, nextTick } from "./helpers";

describe("x-text 文本绑定", () => {
    test("x-text 路径：初始渲染 + 状态变化更新 DOM", async () => {
        const { root, store } = mount(`<span x-text="user.name"></span>`, { user: { name: "a" } });
        expect(root).toEqualHTML(`<div>
  <span>a</span>
</div>`);
        store.state.user.name = "b";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <span>b</span>
</div>`);
    });

    test("x-text 表达式：多依赖自动收集 + 局部更新", async () => {
        const { root, store } = mount(`<span x-text="user.first + ' ' + user.last"></span>`, {
            user: { first: "zhang", last: "san" },
        });
        expect(root).toEqualHTML(`<div>
  <span>zhang san</span>
</div>`);
        store.state.user.last = "si";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <span>zhang si</span>
</div>`);
    });

    test("数值被转为字符串写入 textContent", async () => {
        const { root, store } = mount(`<span x-text="count"></span>`, { count: 7 });
        expect(root).toEqualHTML(`<div>
  <span>7</span>
</div>`);
        store.state.count = 42;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <span>42</span>
</div>`);
    });
});

describe("x-text 空值占位与 .hide 修饰符（ADR-0014）", () => {
    test("默认空值：null/undefined/NaN 渲染空串，0 渲染 '0'（NaN 归空为有意行为变更）", async () => {
        const { root, store } = mount(`<span x-text="v"></span>`, { v: null });
        expect(root).toEqualHTML(`<div>
  <span></span>
</div>`);
        store.state.v = undefined;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <span></span>
</div>`);
        store.state.v = NaN;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <span></span>
</div>`);
        store.state.v = 0;
        await nextTick();
        // 0 默认不算空，渲染 '0'
        expect(root).toEqualHTML(`<div>
  <span>0</span>
</div>`);
    });

    test("empty 占位：空值渲染指定文案，非空渲染原值，可随状态切换", async () => {
        const { root, store } = mount(`<span x-text="v" x-text-options="{empty:'没有数据'}"></span>`, {
            v: null,
        });
        expect(root).toEqualHTML(`<div>
  <span>没有数据</span>
</div>`);
        store.state.v = "hi";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <span>hi</span>
</div>`);
        store.state.v = null;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <span>没有数据</span>
</div>`);
    });

    test("emptyValues 附加到默认集（不覆盖）：[0] 让 0 也算空，默认 null 仍算空", async () => {
        // [0] 附加到默认 [null,undefined,NaN]：0 触发占位
        const r1 = mount(`<span x-text="v" x-text-options="{empty:'无',emptyValues:[0]}"></span>`, { v: 0 });
        expect(r1.root).toEqualHTML(`<div>
  <span>无</span>
</div>`);
        // 默认 null 未被覆盖：仍触发占位（relaxed-json 无法表达 undefined/NaN，故附加而非覆盖）
        const r2 = mount(`<span x-text="v" x-text-options="{empty:'无',emptyValues:[0]}"></span>`, { v: null });
        expect(r2.root).toEqualHTML(`<div>
  <span>无</span>
</div>`);
        // 空附加 = 默认：0 不算空
        const r3 = mount(`<span x-text="v" x-text-options="{empty:'无',emptyValues:[]}"></span>`, { v: 0 });
        expect(r3.root).toEqualHTML(`<div>
  <span>0</span>
</div>`);
    });

    test(".hide：空值隐藏宿主，恢复时还原原内联 display（flex）", async () => {
        const { root, store } = mount(`<div style="display:flex" x-text.hide="v"></div>`, { v: null });
        const el = root.firstElementChild as HTMLElement;
        expect(el.style.display).toBe("none"); // 空值隐藏
        expect(el.textContent).toBe(""); // .hide 优先，不写文案
        store.state.v = "x";
        await nextTick();
        expect(el.style.display).toBe("flex"); // 还原原内联 display
        expect(el.textContent).toBe("x");
    });

    test(".hide 还原不固化计算值：无内联 display 时恢复为空串（让 CSS 类重新接管）", async () => {
        const { root, store } = mount(`<div x-text.hide="v"></div>`, { v: null });
        const el = root.firstElementChild as HTMLElement;
        expect(el.style.display).toBe("none");
        store.state.v = "x";
        await nextTick();
        expect(el.style.display).toBe(""); // 还原空串，未把计算值固化成内联
        expect(el.textContent).toBe("x");
    });

    test(".hide 与 empty 并存：.hide 优先，文案不写入", async () => {
        const { root, store } = mount(`<div x-text.hide="v" x-text-options="{empty:'无数据'}"></div>`, {
            v: null,
        });
        const el = root.firstElementChild as HTMLElement;
        expect(el.style.display).toBe("none"); // 隐藏
        expect(el.textContent).toBe(""); // 「无数据」不出现
        store.state.v = "ok";
        await nextTick();
        expect(el.style.display).toBe("");
        expect(el.textContent).toBe("ok");
    });

    test(".hide 修饰符与 x-text-options={hide:true} 等价（ADR-0007 注入）", async () => {
        const { root } = mount(`<div x-text="v" x-text-options="{hide:true}"></div>`, { v: null });
        expect((root.firstElementChild as HTMLElement).style.display).toBe("none");
    });
});

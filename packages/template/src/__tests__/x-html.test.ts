import { describe, expect, test } from "bun:test";
import "./setup";
import { mount, nextTick } from "./helpers";

describe("x-html 原始 HTML 绑定", () => {
    test("x-html 路径：初始渲染 + 状态变化重写 innerHTML", async () => {
        const { root, store } = mount(`<div x-html="user.bio"></div>`, { user: { bio: "<b>hi</b>" } });
        expect(root).toEqualHTML(`<div>
  <div><b>hi</b></div>
</div>`);
        store.state.user.bio = "<i>yo</i>";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div><i>yo</i></div>
</div>`);
    });

    test("x-html 表达式：多依赖自动收集 + 重算", async () => {
        const { root, store } = mount(`<div x-html="'<b>' + user.first + '</b>'"></div>`, {
            user: { first: "zhang" },
        });
        expect(root).toEqualHTML(`<div>
  <div><b>zhang</b></div>
</div>`);
        store.state.user.first = "san";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div><b>san</b></div>
</div>`);
    });

    test("默认消毒：script / on* 事件属性 / javascript: 协议均被剥除", async () => {
        const { root } = mount(`<div x-html="html"></div>`, {
            html: `<b>ok</b><script>alert(1)</script><img src="x" onerror="alert(1)"><a href="javascript:alert(1)">link</a>`,
        });
        expect(root).toEqualHTML(`<div>
  <div><b>ok</b><img src="x"><a>link</a></div>
</div>`);
    });

    test(".raw 修饰符：退出消毒，危险属性原样保留", async () => {
        const { root } = mount(`<div x-html.raw="html"></div>`, {
            html: `<img src="x" onerror="alert(1)">`,
        });
        expect(root).toEqualHTML(`<div>
  <div><img src="x" onerror="alert(1)"></div>
</div>`);
    });

    test("可插拔 sanitizer：engine.options.sanitizer 覆盖默认", async () => {
        const { root } = mount(
            `<div x-html="html"></div>`,
            { html: "<b>x</b>" },
            { sanitizer: (h: string) => h.toUpperCase() },
        );
        // 自定义 sanitizer 把输入全大写后再写入 innerHTML
        expect(root).toEqualHTML(`<div>
  <div><b>X</b></div>
</div>`);
    });

    test("null/空值渲染为空内容", async () => {
        const { root, store } = mount(`<div x-html="html"></div>`, { html: null });
        expect(root).toEqualHTML(`<div>
  <div></div>
</div>`);
        store.state.html = "<b>x</b>";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div><b>x</b></div>
</div>`);
    });

    test("与 x-text 同元素：x-html 确定性胜出（x-text 静默 no-op）", async () => {
        const { root, store } = mount(`<div x-text="t" x-html="h"></div>`, { t: "PLAIN", h: "<b>HTML</b>" });
        expect(root).toEqualHTML(`<div>
  <div><b>HTML</b></div>
</div>`);
        // x-text 从未订阅：变化 t 不影响输出（确定性）
        store.state.t = "CHANGED";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div><b>HTML</b></div>
</div>`);
        // x-html 变化仍生效
        store.state.h = "<i>new</i>";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div><i>new</i></div>
</div>`);
    });
});

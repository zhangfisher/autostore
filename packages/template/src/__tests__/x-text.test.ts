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

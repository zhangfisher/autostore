import { describe, expect, test } from "bun:test";
import "./setup";
import { mount, nextTick } from "./helpers";

/**
 * engine.patch 模板增量编译测试（ADR-0002）。
 *
 * 数据统一挂在 store.state（全局），容器用 `x-data="{}"` 作 scope 锚（空私有域）；
 * `x-patch` 哨兵单独验证。updater 就地改入参（engine.template 的元素），返回值走四态。
 */
describe("engine.patch - 子树重建（void / 同引用）", () => {
    test("void：在 scope 容器内插入片段并生效绑定", () => {
        const { root, engine } = mount(`<div id="app"><div id="ws" x-data="{}"></div></div>`, {
            content: "hello",
        });
        engine.patch("#ws", (ws) => {
            ws.insertAdjacentHTML("beforeend", "<p x-text='content'></p>");
        });
        expect(root).toEqualHTML(`<div><div id="app"><div id="ws"><p>hello</p></div></div></div>`);
    });

    test("void：修改子节点的指令并重新编译", () => {
        const { root, engine } = mount(
            `<div id="app"><div id="ws" x-data="{}"><p x-text='content'></p></div></div>`,
            { content: "hello" },
        );
        engine.patch("#ws", (ws) => {
            ws.querySelector("p")!.setAttribute("x-text", "content + '!'");
        });
        expect(root).toEqualHTML(`<div><div id="app"><div id="ws"><p>hello!</p></div></div></div>`);
    });

    test("返回同引用 === templateEl：等价于 void 子树重建", () => {
        const { root, engine } = mount(`<div id="app"><div id="ws" x-data="{}"></div></div>`, {
            content: "hello",
        });
        engine.patch("#ws", (ws) => {
            ws.insertAdjacentHTML("beforeend", "<p x-text='content'></p>");
            return ws;
        });
        expect(root).toEqualHTML(`<div><div id="app"><div id="ws"><p>hello</p></div></div></div>`);
    });

    test("子树重建保留兄弟子树运行态（增量核心价值）", async () => {
        const { root, store, engine } = mount(
            `<div id="app"><div id="ws" x-data="{}"></div><input id="keep" x-bind:title="content"></div>`,
            { content: "hello" },
        );
        engine.patch("#ws", (ws) => {
            ws.insertAdjacentHTML("beforeend", "<p x-text='content'></p>");
        });
        // #ws 已更新，兄弟 #keep 仍在且响应式未被破坏
        expect(root).toEqualHTML(
            `<div><div id="app"><div id="ws"><p>hello</p></div><input id="keep" title="hello"></div></div>`,
        );
        store.state.content = "world";
        await nextTick();
        // 兄弟子树 #keep 与 #ws 内 <p> 都更新（证明 patch 未破坏 #keep 订阅）
        expect(root).toEqualHTML(
            `<div><div id="app"><div id="ws"><p>world</p></div><input id="keep" title="world"></div></div>`,
        );
    });
});

describe("engine.patch - 替换自身", () => {
    test("返回新 Node（含子树）：子节点被完整编译", () => {
        const { root, engine } = mount(`<div id="app"><div id="ws" x-data="{}"></div></div>`, {
            content: "hello",
        });
        engine.patch("#ws", () => {
            const next = document.createElement("section");
            next.innerHTML = "<p x-text='content'></p><span>tail</span>";
            return next;
        });
        expect(root).toEqualHTML(
            `<div><div id="app"><section><p>hello</p><span>tail</span></section></div></div>`,
        );
    });

    test("返回 HTML 字符串（单节点）", () => {
        const { root, engine } = mount(`<div id="app"><div id="ws" x-data="{}"></div></div>`, {
            content: "hello",
        });
        engine.patch("#ws", () => "<p x-text='content'></p>");
        expect(root).toEqualHTML(`<div><div id="app"><p>hello</p></div></div>`);
    });

    test("返回 HTML 字符串（多节点）", () => {
        const { root, engine } = mount(`<div id="app"><div id="ws" x-data="{}"></div></div>`, {
            content: "hello",
        });
        engine.patch("#ws", () => "<p x-text='content'></p><span>tail</span>");
        expect(root).toEqualHTML(`<div><div id="app"><p>hello</p><span>tail</span></div></div>`);
    });
});

describe("engine.patch - 删除", () => {
    test("返回 null：删除自身（双侧移除 + scope destroy）", () => {
        const { root, engine } = mount(
            `<div id="app"><div id="ws" x-data="{}"><p x-text='content'></p></div></div>`,
            { content: "hello" },
        );
        engine.patch("#ws", () => null);
        expect(root).toEqualHTML(`<div><div id="app"></div></div>`);
    });

    test("返回空串：等价于 null（删除）", () => {
        const { root, engine } = mount(
            `<div id="app"><div id="ws" x-data="{}"><p x-text='content'></p></div></div>`,
            { content: "hello" },
        );
        engine.patch("#ws", () => "");
        expect(root).toEqualHTML(`<div><div id="app"></div></div>`);
    });
});

describe("engine.patch - 边界与守卫", () => {
    test("纯静态裸元素（无指令无插值）：非 scope，warn 拒绝，DOM 不变", () => {
        const { root, engine } = mount(`<div id="app"><div id="bare"></div></div>`, {});
        engine.patch("#bare", (el) => {
            el.insertAdjacentHTML("beforeend", "<p>x</p>");
        });
        expect(root).toEqualHTML(`<div><div id="app"><div id="bare"></div></div></div>`);
    });

    test("含 {{}} 的裸元素（合成 scope）：可 patch", () => {
        const { root, engine } = mount(
            `<div id="app"><div id="ws">{{content}}</div></div>`,
            { content: "hello" },
        );
        engine.patch("#ws", (ws) => {
            ws.insertAdjacentHTML("beforeend", "<p x-text='content'></p>");
        });
        expect(root).toEqualHTML(
            `<div><div id="app"><div id="ws">hello<p>hello</p></div></div></div>`,
        );
    });

    test("动态区域 x-for 元素：拒绝，DOM 不变", () => {
        const { root, engine } = mount(
            `<div id="app"><ul x-for="item of items" :key="item.id"><li x-text="item.name"></li></ul></div>`,
            { items: [{ id: 1, name: "a" }, { id: 2, name: "b" }] },
        );
        // patch x-for 元素自身（ownsChildren）→ 动态区域拒绝；updater 不执行、DOM 保持初始
        engine.patch("ul", (ul) => {
            ul.setAttribute("x-data", "{}");
        });
        expect(root).toEqualHTML(
            `<div><div id="app"><ul><li>a</li><li>b</li></ul></div></div>`,
        );
    });

    test("updater 抛错：不重建，DOM 不变", () => {
        const { root, engine } = mount(
            `<div id="app"><div id="ws" x-data="{}"><p x-text='content'></p></div></div>`,
            { content: "hello" },
        );
        engine.patch("#ws", () => {
            throw new Error("oops");
        });
        expect(root).toEqualHTML(
            `<div><div id="app"><div id="ws"><p>hello</p></div></div></div>`,
        );
    });
});

describe("engine.patch - 哨兵指令 x-patch", () => {
    test("纯静态裸元素挂 x-patch 后建 scope，可 patch", () => {
        const { root, engine } = mount(`<div id="app"><div id="ws" x-patch></div></div>`, {
            content: "hello",
        });
        engine.patch("#ws", (ws) => {
            ws.insertAdjacentHTML("beforeend", "<p x-text='content'></p>");
        });
        expect(root).toEqualHTML(`<div><div id="app"><div id="ws"><p>hello</p></div></div></div>`);
    });
});

describe("engine.patch - 响应式与事件", () => {
    test("patch 插入的绑定后续 state 变化自动更新", async () => {
        const { root, store, engine } = mount(`<div id="app"><div id="ws" x-data="{}"></div></div>`, {
            content: "hello",
        });
        engine.patch("#ws", (ws) => {
            ws.insertAdjacentHTML("beforeend", "<p x-text='content'></p>");
        });
        expect(root).toEqualHTML(`<div><div id="app"><div id="ws"><p>hello</p></div></div></div>`);
        store.state.content = "world";
        await nextTick();
        expect(root).toEqualHTML(`<div><div id="app"><div id="ws"><p>world</p></div></div></div>`);
    });

    test("patch 触发 engine/patch/before|after 事件广播", () => {
        const { engine } = mount(`<div id="app"><div id="ws" x-data="{}"></div></div>`, {});
        const events: string[] = [];
        engine.on("engine/patch/before", () => events.push("before"));
        engine.on("engine/patch/after", () => events.push("after"));
        engine.patch("#ws", () => {});
        expect(events).toEqual(["before", "after"]);
    });
});

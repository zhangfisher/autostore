import { describe, expect, test } from "bun:test";
import { AutoStore } from "autostore";
import { AutoTemplateEngine } from "../engine";
import "./setup";
import { mount, nextTick } from "./helpers";

/**
 * 引擎级端到端用例：scheduler 微任务合并、destroy 资源清理。
 * 指令级行为（x-text/x-if/x-for）已拆分到各自独立测试文件。
 */

describe("e2e - scheduler 微任务合并", () => {
    test("同 tick 多次变更只 flush 一次", async () => {
        const { root, store, engine } = mount(`<span x-text="user.name"></span>`, {
            user: { name: "a" },
        });
        let flushCount = 0;
        const origFlush = engine.scheduler.flush.bind(engine.scheduler);
        engine.scheduler.flush = () => {
            flushCount++;
            origFlush();
        };
        store.state.user.name = "b";
        store.state.user.name = "c";
        store.state.user.name = "d";
        await nextTick();
        expect(flushCount).toBe(1);
        // 合并 flush 后取累积最新值 d
        expect(root).toEqualHTML(`<div>
  <span>d</span>
</div>`);
    });
});

describe("e2e - destroy 资源清理", () => {
    test("destroy 后状态变化不再更新 DOM（watcher 已 off）", async () => {
        const store = new AutoStore({ name: "a" });
        const root = document.createElement("div");
        root.innerHTML = `<span x-text="name"></span>`;
        const app = new AutoTemplateEngine(root, store);
        expect(root).toEqualHTML(`<div>
  <span>a</span>
</div>`);

        app.destroy();
        store.state.name = "b";
        await nextTick();
        // destroy 经 replaceChildren 移除挂载 DOM 并销毁订阅，状态变化不再回写
        expect(root).toEqualHTML(`<div></div>`);
    });

    test("destroy 不销毁共享 store，另一个引擎仍可响应", async () => {
        const store = new AutoStore({ name: "a" });

        const root1 = document.createElement("div");
        root1.innerHTML = `<span x-text="name"></span>`;
        const app1 = new AutoTemplateEngine(root1, store);
        app1.destroy();

        // store 仍存活，第二个引擎正常响应
        store.state.name = "b";
        const root2 = document.createElement("div");
        root2.innerHTML = `<span x-text="name"></span>`;
        const app2 = new AutoTemplateEngine(root2, store);
        expect(root2).toEqualHTML(`<div>
  <span>b</span>
</div>`);
        app2.destroy();
    });
});

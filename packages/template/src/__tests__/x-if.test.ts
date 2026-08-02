import { describe, expect, test } from "bun:test";
import "./setup";
import { mount, nextTick } from "./helpers";
import type { AutoTemplateEngine } from "../engine";
import type { AutoTemplateScope } from "../scope";

/**
 * 从 engine.scopes 反查指定渲染元素对应的 scope。
 * eager x-if 的 binding.children 恰为当前编译出的子树 scope 集合
 * （ownsChildren 保证：子 scope 经 _linkParent 挂为本 scope 子代），
 * 故其 size 是"子树 watcher 是否堆积/泄露"的精确可观测信号。
 */
function scopeOf(engine: AutoTemplateEngine, el: Element): AutoTemplateScope | undefined {
    for (const [ref, scope] of engine.scopes) {
        if (ref.deref() === el) return scope;
    }
    return undefined;
}

describe("x-if eager（默认：false 移除子树 + 销毁 watcher）", () => {
    test("true 显示子树，false 移除子树并 display:none", async () => {
        const { root, store } = mount(`<div id="t" x-if="show">hi</div>`, { show: true });
        expect(root).toEqualHTML(`<div>
  <div id="t">hi</div>
</div>`);
        store.state.show = false;
        await nextTick();
        // "hi" 作为子树被移除，div 仅剩 display:none（空）
        expect(root).toEqualHTML(`<div>
  <div id="t" style="display: none;"></div>
</div>`);
        store.state.show = true;
        await nextTick();
        // 重新显示：重新编译子树，"hi" 复现
        expect(root).toEqualHTML(`<div>
  <div id="t">hi</div>
</div>`);
    });

    test("初始为 false 时子树从不编译（懒挂载）", async () => {
        const { root, store } = mount(`<div x-if="show">hi</div>`, { show: false });
        expect(root).toEqualHTML(`<div>
  <div style="display: none;"></div>
</div>`);
        store.state.show = true;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div>hi</div>
</div>`);
    });

    test("false 销毁子树 watcher：隐藏期间变更不被订阅，重新显示重编译取最新值", async () => {
        const { root, store } = mount(`<div x-if="show"><span x-text="msg"></span></div>`, {
            show: true,
            msg: "a",
        });
        expect(root).toEqualHTML(`<div>
  <div>
    <span>a</span>
  </div>
</div>`);
        // 隐藏：span 子树移除、x-text watcher 销毁
        store.state.show = false;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div style="display: none;"></div>
</div>`);
        // 隐藏期间改 msg：watcher 已销毁，DOM 不变（仍空）
        store.state.msg = "b";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div style="display: none;"></div>
</div>`);
        // 重新显示：重新编译子树，x-text 读取当前最新值 b
        store.state.show = true;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div>
    <span>b</span>
  </div>
</div>`);
    });

    test("falsy 值（false/0/空串/null/undefined）统一移除子树并隐藏", () => {
        for (const flag of [false, 0, "", null, undefined]) {
            const { root } = mount(`<div x-if="flag">x</div>`, { flag });
            expect(root).toEqualHTML(`<div>
  <div style="display: none;"></div>
</div>`);
        }
    });

    test("truthy 非空字符串（'false'/'0'）保持显示并保留子树", () => {
        for (const flag of [true, 1, "false", "0"]) {
            const { root } = mount(`<div x-if="flag">x</div>`, { flag });
            expect(root).toEqualHTML(`<div>
  <div>x</div>
</div>`);
        }
    });

    test("表达式 a && b 依赖多状态，切换任一即响应", async () => {
        const { root, store } = mount(`<div x-if="a && b">x</div>`, { a: true, b: false });
        expect(root).toEqualHTML(`<div>
  <div style="display: none;"></div>
</div>`);
        store.state.b = true;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div>x</div>
</div>`);
        store.state.a = false;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div style="display: none;"></div>
</div>`);
    });

    test("多次显隐切换后状态稳定（每次 true 重编译子树）", async () => {
        const { root, store } = mount(`<div x-if="show">x</div>`, { show: true });
        for (let i = 0; i < 3; i++) {
            store.state.show = false;
            await nextTick();
            store.state.show = true;
            await nextTick();
        }
        expect(root).toEqualHTML(`<div>
  <div>x</div>
</div>`);
    });

    test("x-if 元素的普通属性保留，仅移除指令属性", () => {
        const { root } = mount(`<section class="box" x-if="show"><p x-text="msg"></p></section>`, {
            show: true,
            msg: "ok",
        });
        expect(root).toEqualHTML(`<div>
  <section class="box">
    <p>ok</p>
  </section>
</div>`);
    });
});

describe("x-if 与同元素兄弟指令共存（元素作锚点，兄弟指令跨显隐存活）", () => {
    test("x-if + x-text 同元素：x-text 写入的内容不被 x-if 误删，跨显隐持续更新", async () => {
        // div 无模板子树（x-if 的 subtreeNodes 为空），x-text 写 textContent 不属子树管理范围
        const { root, store } = mount(`<div x-if="show" x-text="title"></div>`, {
            show: true,
            title: "T1",
        });
        expect(root).toEqualHTML(`<div>
  <div>T1</div>
</div>`);
        // 隐藏：仅 display:none，x-text 内容保留、watcher 存活
        store.state.show = false;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div style="display: none;">T1</div>
</div>`);
        // 隐藏期间改 title：x-text watcher 仍存活，更新不可见 DOM
        store.state.title = "T2";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div style="display: none;">T2</div>
</div>`);
        // 重新显示：直接反映累积的最新值
        store.state.show = true;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div>T2</div>
</div>`);
    });
});

describe("x-if.keep（仅切 display，保留子树与 watcher）", () => {
    test("keep 模式：false 仅 display:none，子树与 watcher 保留（v1 行为）", async () => {
        const { root, store } = mount(`<div x-if.keep="show"><span x-text="msg"></span></div>`, {
            show: true,
            msg: "a",
        });
        expect(root).toEqualHTML(`<div>
  <div>
    <span>a</span>
  </div>
</div>`);
        store.state.show = false;
        await nextTick();
        // span 子树保留，仅 display:none
        expect(root).toEqualHTML(`<div>
  <div style="display: none;">
    <span>a</span>
  </div>
</div>`);
        // 隐藏期间改 msg：watcher 存活，patch 到不可见 DOM
        store.state.msg = "b";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div style="display: none;">
    <span>b</span>
  </div>
</div>`);
        // 重新显示：反映累积最新值
        store.state.show = true;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div>
    <span>b</span>
  </div>
</div>`);
    });
});

describe("x-show（= x-if.keep 的快捷方式）", () => {
    test("x-show 与 x-if.keep 行为完全等价：仅切 display、保留子树", async () => {
        const { root, store } = mount(`<div x-show="show"><span x-text="msg"></span></div>`, {
            show: true,
            msg: "a",
        });
        expect(root).toEqualHTML(`<div>
  <div>
    <span>a</span>
  </div>
</div>`);
        store.state.show = false;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div style="display: none;">
    <span>a</span>
  </div>
</div>`);
        // 隐藏期间 watcher 存活
        store.state.msg = "b";
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div style="display: none;">
    <span>b</span>
  </div>
</div>`);
        store.state.show = true;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div>
    <span>b</span>
  </div>
</div>`);
    });
});

describe("x-for + eager x-if 同元素冲突", () => {
    test("x-for 与 eager x-if 同元素：编译期抛错并提示替代方案", () => {
        expect(() =>
            mount(
                `<ul x-for="item of items" :key="item.id" x-if="show"><li x-text="item.name"></li></ul>`,
                { show: false, items: [] },
            ),
        ).toThrow(/x-if\/x-for 冲突[\s\S]*x-show[\s\S]*x-if\.keep/);
    });

    test("x-for + x-if.keep（= x-show）同元素：不冲突，正常工作", async () => {
        const { root, store } = mount(
            `<ul x-for="item of items" :key="item.id" x-if.keep="show"><li x-text="item.name"></li></ul>`,
            {
                show: false,
                items: [{ id: 1, name: "a" }],
            },
        );
        // x-if.keep 不占 ownsChildren，与 x-for 共存；仅切容器 display
        expect(root).toEqualHTML(`<div>
  <ul style="display: none;">
    <li>a</li>
  </ul>
</div>`);
        store.state.show = true;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>a</li>
  </ul>
</div>`);
    });
});

describe("eager x-if 重建后响应式恢复与反复切换无泄露", () => {
    test("false→true 重建子树后，内部响应式元素恢复订阅并持续响应", async () => {
        const { root, store } = mount(`<div id="t" x-if="show"><span x-text="msg"></span></div>`, {
            show: true,
            msg: "a",
        });
        const xifEl = root.querySelector("#t")!;
        // 隐藏：子树（span）移除、x-text watcher 销毁
        store.state.show = false;
        await nextTick();
        expect(xifEl.querySelectorAll("span").length).toBe(0);
        // 重新显示：重新编译子树，span 取当前 msg=a
        store.state.show = true;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div id="t">
    <span>a</span>
  </div>
</div>`);
        // 核心：重建后再次变更 msg —— 新的 x-text watcher 必须存活并响应
        // （区别于仅验证"重建取最新值"，此处验证"重建后 watcher 持续参与响应式"）
        store.state.msg = "c";
        await nextTick();
        expect(xifEl.querySelector("span")!.textContent).toBe("c");
    });

    test("反复 true↔false 切换：子树 DOM 与子 scope 均不堆积（无重复/无泄露），最终态响应式正确", async () => {
        const { root, store, engine } = mount(
            `<div id="t" x-if="show"><span x-text="msg"></span></div>`,
            { show: true, msg: "a" },
        );
        const xifEl = root.querySelector("#t")!;
        const binding = scopeOf(engine, xifEl);
        expect(binding).toBeDefined();
        // 反复交替切换 6 轮（每轮 false→true 各 flush 一次）
        for (let i = 0; i < 6; i++) {
            store.state.show = false;
            await nextTick();
            store.state.show = true;
            await nextTick();
        }
        // 停在 true：恰好一份子树（subtreeNodes 防二次编译 → 无重复挂载）
        expect(xifEl.querySelectorAll("span").length).toBe(1);
        // 子作用域恰好 1 个（span 的 scope）—— size 不增长即子树 watcher 未堆积（无泄露）
        expect(binding!.children.size).toBe(1);
        // 最终态响应式仍正确：重建出的 watcher 活着
        store.state.msg = "z";
        await nextTick();
        expect(xifEl.querySelector("span")!.textContent).toBe("z");
        // 再次隐藏：子作用域应被 destroyChildren 清空（无残留 watcher）
        store.state.show = false;
        await nextTick();
        expect(binding!.children.size).toBe(0);
        expect(xifEl.querySelectorAll("span").length).toBe(0);
    });
});

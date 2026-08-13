import { describe, expect, test } from "bun:test";
import "./setup";
import { mount, nextTick } from "./helpers";
import type { AutoTemplateEngine } from "../engine";

/**
 * 在引擎中找到指定渲染元素对应的 scope 并销毁。
 * 用于多实例碰撞测试精确控制单个 x-data.global 实例的销毁顺序（engine.destroy 会无序全销毁）。
 */
function destroyScopeFor(engine: AutoTemplateEngine, el: Element): void {
    for (const scope of engine.scopes.values()) {
        if (scope.el === el) {
            scope.destroy();
            return;
        }
    }
    throw new Error(`未找到元素对应的 scope：${el.outerHTML}`);
}

describe("x-data 数据指令（编译期首次注入）", () => {
    test("默认模式：编译期注入 data，后代表达式可读取（渲染元素不保留 x-data 属性）", () => {
        const { root } = mount(`<div id="a" x-data="{a:1}"><span x-text="a"></span></div>`, {});
        expect(root).toEqualHTML(`<div>
  <div id="a">
    <span>1</span>
  </div>
</div>`);
    });

    test("relaxed-json 宽松语法：无引号键 / 尾逗号 / 字符串值", () => {
        const { root } = mount(
            `<div x-data="{a:1, b:'hi',}"><span x-text="a + b"></span></div>`,
            {},
        );
        expect(root).toEqualHTML(`<div>
  <div>
    <span>1hi</span>
  </div>
</div>`);
    });

    test("嵌套覆盖：子 x-data 覆盖父同名键，互不污染", () => {
        const { root, engine } = mount(
            `<div id="a" x-data="{a:1}">
  <span x-text="a"></span>
  <div id="b" x-data="{a:2}">
    <span x-text="a"></span>
  </div>
</div>`,
            {},
        );
        expect(root).toEqualHTML(`<div>
  <div id="a">
    <span>1</span>
    <div id="b">
      <span>2</span>
    </div>
  </div>
</div>`);
    });

    test("父级继承：子可读取父 x-data 未覆盖的键", () => {
        const { root } = mount(
            `<div x-data="{a:1, b:2}"><span x-text="a"></span><span x-text="b"></span></div>`,
            {},
        );
        expect(root).toEqualHTML(`<div>
  <div>
    <span>1</span>
    <span>2</span>
  </div>
</div>`);
    });

    test("解析失败静默：仅打印日志，不中断编译，data 为空", () => {
        const { root } = mount(`<div x-data="{bad"><span x-text="a"></span></div>`, {});
        expect(root).toEqualHTML(`<div>
  <div>
    <span></span>
  </div>
</div>`);
    });

    test("解析为非对象（数组）：静默忽略，data 为空", () => {
        const { root } = mount(`<div x-data="[1,2,3]"><span x-text="a"></span></div>`, {});
        expect(root).toEqualHTML(`<div>
  <div>
    <span></span>
  </div>
</div>`);
    });
});

describe("engine.data 运行时更新", () => {
    test("合并更新已有键：路径订阅自动驱动 DOM", async () => {
        const { root, engine } = mount(
            `<div id="a" x-data="{a:1}"><span x-text="a"></span></div>`,
            {},
        );
        engine.data(root.querySelector("#a")!, { a: 2 });
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div id="a">
    <span>2</span>
  </div>
</div>`);
    });

    test("合并语义：只增改、不删已有键", async () => {
        const { root, engine } = mount(
            `<div id="a" x-data="{a:1, b:2}"><span x-text="a"></span><span x-text="b"></span></div>`,
            {},
        );
        engine.data(root.querySelector("#a")!, { a: 9 });
        await nextTick();
        // b 保留（合并不删）
        expect(root).toEqualHTML(`<div>
  <div id="a">
    <span>9</span>
    <span>2</span>
  </div>
</div>`);
    });

    test("新增键：data 形状变化触发子树重建，新键被订阅", async () => {
        const { root, engine } = mount(
            `<div id="a" x-data="{a:1}"><span x-text="a"></span><span x-text="b"></span></div>`,
            {},
        );
        // 初始 b 不存在于 data
        expect(root).toEqualHTML(`<div>
  <div id="a">
    <span>1</span>
    <span></span>
  </div>
</div>`);
        // engine.data 新增 b → data 形状变 → 子树重建 → b 订阅
        engine.data(root.querySelector("#a")!, { b: 2 });
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div id="a">
    <span>1</span>
    <span>2</span>
  </div>
</div>`);
    });

    test("父级变更经 parent 链传播到后代", async () => {
        const { root, engine } = mount(
            `<div id="a" x-data="{v:1}"><div><span x-text="v"></span></div></div>`,
            {},
        );
        engine.data(root.querySelector("#a")!, { v: 5 });
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div id="a">
    <div>
      <span>5</span>
    </div>
  </div>
</div>`);
    });

    test("嵌套 x-data 响应式独立：各层 engine.data 互不串扰", async () => {
        const { root, engine } = mount(
            `<div id="outer" x-data="{a:1}">
  <span x-text="a"></span>
  <div id="inner" x-data="{a:2}">
    <span x-text="a"></span>
  </div>
</div>`,
            {},
        );
        // 初始：内层 a=2 覆盖外层 a=1，依赖路径分别为 _scopes.<outer>.a / _scopes.<inner>.a
        expect(root).toEqualHTML(`<div>
  <div id="outer">
    <span>1</span>
    <div id="inner">
      <span>2</span>
    </div>
  </div>
</div>`);
        // 改外层 a：仅外层 span 更新，内层有自己的 a 不受影响
        engine.data(root.querySelector("#outer")!, { a: 10 });
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div id="outer">
    <span>10</span>
    <div id="inner">
      <span>2</span>
    </div>
  </div>
</div>`);
        // 改内层 a：仅内层 span 更新，外层不受影响
        engine.data(root.querySelector("#inner")!, { a: 20 });
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div id="outer">
    <span>10</span>
    <div id="inner">
      <span>20</span>
    </div>
  </div>
</div>`);
    });

    test("给空 data 注入数据：新增键被精准订阅", async () => {
        const { root, engine } = mount(
            `<div id="a" x-data="{}"><span x-text="b"></span></div>`,
            {},
        );
        expect(root).toEqualHTML(`<div>
  <div id="a">
    <span></span>
  </div>
</div>`);
        engine.data(root.querySelector("#a")!, { b: 9 });
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div id="a">
    <span>9</span>
  </div>
</div>`);
    });
});

describe("x-data.global 挂载全局 store", () => {
    test("编译期合并进 store 根键，x-text 经响应式自动订阅", () => {
        const { root, store } = mount(
            `<div id="a" x-data.global="{a:1}"><span x-text="a"></span></div>`,
            {},
        );
        expect(store.state.a).toBe(1);
        expect(root).toEqualHTML(`<div>
  <div id="a">
    <span>1</span>
  </div>
</div>`);
    });

    test("响应式：改 store.state 自动更新（global 运行时改用 store.state 直接操作）", async () => {
        const { root, store } = mount(
            `<div x-data.global="{a:1}"><span x-text="a"></span></div>`,
            {},
        );
        store.state.a = 99;
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <div>
    <span>99</span>
  </div>
</div>`);
    });

    test("销毁 CAS：元素销毁后自动删除自己写入的键", () => {
        const { store, engine } = mount(
            `<div x-data.global="{a:1, b:2}"><span x-text="a"></span></div>`,
            {},
        );
        expect(store.state.a).toBe(1);
        expect(store.state.b).toBe(2);
        engine.destroy();
        expect(store.state.a).toBeUndefined();
        expect(store.state.b).toBeUndefined();
    });
});

describe("x-data 配置等价性（ADR-0007：modifier ≡ 指令选项，宿主选项回退）", () => {
    test('x-data.global ≡ x-data-options="{global:true}"：均写入 store 根键', () => {
        const a = mount(`<div x-data.global="{eq:1}"></div>`, {});
        const b = mount(`<div x-data-options="{global:true}" x-data="{eq:2}"></div>`, {});
        expect(a.store.state.eq).toBe(1);
        expect(b.store.state.eq).toBe(2);
    });

    test("宿主选项回退：x-data 无 global 配置时回退读取 x-options.global", () => {
        // x-data 既无 .global 也无 x-data-options.global，经 getOption 回退到 x-options.global
        const { store } = mount(`<div x-options="{global:true}" x-data="{host:1}"></div>`, {});
        expect(store.state.host).toBe(1);
    });

    test("指令选项优先于宿主选项：x-data-options.global=false 显式关闭", () => {
        // x-options.global=true，但 x-data-options.global=false 显式覆盖 → local 模式，不写根键
        const { store } = mount(
            `<div x-options="{global:true}" x-data-options="{global:false}" x-data="{x:1}"></div>`,
            {},
        );
        expect(store.state.x).toBeUndefined();
    });
});

describe("x-data 与 x-for 共存", () => {
    test("容器 x-data 经 parent 链透传进各 item；engine.data 更新透传", async () => {
        const { root, engine } = mount(
            `<ul x-data="{sep:'|'}" x-for="item of items"><li x-text="item + sep"></li></ul>`,
            { items: ["x", "y"] },
        );
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>x|</li>
    <li>y|</li>
  </ul>
</div>`);
        // engine.data 更新 sep → 经 parent 链透传到各 item
        engine.data(root.querySelector("ul")!, { sep: "#" });
        await nextTick();
        expect(root).toEqualHTML(`<div>
  <ul>
    <li>x#</li>
    <li>y#</li>
  </ul>
</div>`);
    });
});

describe("x-data.global 多实例碰撞（CAS 销毁）", () => {
    test("两实例同键不同值：先销毁先写者，不误删后写者的值", () => {
        const { root, store, engine } = mount(
            `<div id="e1" x-data.global="{x:1}"></div><div id="e2" x-data.global="{x:2}"></div>`,
            {},
        );
        // 后写覆盖：e2 的 2 胜出
        expect(store.state.x).toBe(2);
        // 先销毁先写者 e1：CAS 判定 state.x(2) !== 1 → 跳过，e2 的值存活
        destroyScopeFor(engine, root.querySelector("#e1")!);
        expect(store.state.x).toBe(2);
        // 再销毁后写者 e2：state.x(2) === 2 → 删除
        destroyScopeFor(engine, root.querySelector("#e2")!);
        expect(store.state.x).toBeUndefined();
    });

    test("两实例同键同值：销毁时恰好删除一次，第二次 CAS 跳过无异常", () => {
        const { root, store, engine } = mount(
            `<div id="e1" x-data.global="{x:1}"></div><div id="e2" x-data.global="{x:1}"></div>`,
            {},
        );
        expect(store.state.x).toBe(1);
        // e1 销毁：state.x(1) === 1 → 删除
        destroyScopeFor(engine, root.querySelector("#e1")!);
        expect(store.state.x).toBeUndefined();
        // e2 销毁：state.x(undefined) !== 1 → 跳过（不抛错、不重复 delete）
        expect(() => destroyScopeFor(engine, root.querySelector("#e2")!)).not.toThrow();
        expect(store.state.x).toBeUndefined();
    });

    test("两实例同键不同值：反向销毁顺序（后写者先销毁）也能正确清空", () => {
        const { root, store, engine } = mount(
            `<div id="e1" x-data.global="{x:1}"></div><div id="e2" x-data.global="{x:2}"></div>`,
            {},
        );
        expect(store.state.x).toBe(2);
        // 先销毁后写者 e2：state.x(2) === 2 → 删除
        destroyScopeFor(engine, root.querySelector("#e2")!);
        expect(store.state.x).toBeUndefined();
        // 再销毁先写者 e1：state.x(undefined) !== 1 → 跳过
        destroyScopeFor(engine, root.querySelector("#e1")!);
        expect(store.state.x).toBeUndefined();
    });

    test("部分键重叠：CAS 保留后写者的值，先写者只清理自己的独占键", () => {
        const { root, store, engine } = mount(
            `<div id="e1" x-data.global="{a:1, b:2}"></div><div id="e2" x-data.global="{b:9, c:3}"></div>`,
            {},
        );
        // b 被 e2 覆盖为 9
        expect(store.state.a).toBe(1);
        expect(store.state.b).toBe(9);
        expect(store.state.c).toBe(3);
        // 销毁 e1：删独占键 a；b 因 state.b(9) !== 2 → 跳过（保留 e2 的 b）
        destroyScopeFor(engine, root.querySelector("#e1")!);
        expect(store.state.a).toBeUndefined();
        expect(store.state.b).toBe(9);
        expect(store.state.c).toBe(3);
        // 销毁 e2：删 b、c
        destroyScopeFor(engine, root.querySelector("#e2")!);
        expect(store.state.b).toBeUndefined();
        expect(store.state.c).toBeUndefined();
    });

    test("三实例链式覆盖，乱序销毁：仅末写者执行删除，其余 CAS 跳过", () => {
        const { root, store, engine } = mount(
            `<div id="e1" x-data.global="{x:1}"></div><div id="e2" x-data.global="{x:2}"></div><div id="e3" x-data.global="{x:3}"></div>`,
            {},
        );
        expect(store.state.x).toBe(3);
        // 乱序销毁中间、最先写者：均因值不匹配而跳过
        destroyScopeFor(engine, root.querySelector("#e2")!);
        expect(store.state.x).toBe(3);
        destroyScopeFor(engine, root.querySelector("#e1")!);
        expect(store.state.x).toBe(3);
        // 末写者 e3：state.x(3) === 3 → 删除
        destroyScopeFor(engine, root.querySelector("#e3")!);
        expect(store.state.x).toBeUndefined();
    });

    test("engine.destroy 全量销毁：多实例碰撞下最终 store 干净（末写者删除、其余 CAS 跳过）", () => {
        const { store, engine } = mount(
            `<div id="e1" x-data.global="{a:1}"></div><div id="e2" x-data.global="{a:2, b:3}"></div>`,
            {},
        );
        expect(store.state.a).toBe(2);
        expect(store.state.b).toBe(3);
        engine.destroy();
        // 末写者 e2 删 a/b；e1 对 a 的 CAS 跳过（a 已被 e2 改为 2，!== 1）
        expect(store.state.a).toBeUndefined();
        expect(store.state.b).toBeUndefined();
    });
});

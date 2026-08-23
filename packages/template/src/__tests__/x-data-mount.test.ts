import { describe, expect, test } from "bun:test";
import "./setup";
import { mount, nextTick } from "./helpers";
import type { AutoTemplateEngine } from "../engine";
import { SCOPES_KEY } from "../engine";

/**
 * x-data mount 挂载机制（ADR-0029）：统一挂载模型三形态、相对/nearest 语法、
 * 无效路径降级、destroy 键级 CAS + 删空回收。
 */

/** 在引擎中找到指定渲染元素对应的 scope 并销毁（精确控制单个实例的销毁顺序） */
function destroyScopeFor(engine: AutoTemplateEngine, el: Element): void {
    for (const scope of engine.scopes.values()) {
        if (scope.el === el) {
            scope.destroy();
            return;
        }
    }
    throw new Error(`未找到元素对应的 scope：${el.outerHTML}`);
}

describe("x-data mount 绝对路径挂载", () => {
    test("mount:'x.y' 把数据 merge 进 state.x.y，子树 {{a}} 直读 + 全树 {{x.y.a}} 可读", () => {
        const { root, store } = mount(
            `<div id="a" x-data="{v:1}" x-data-options="{mount:'x.y'}"><span x-text="v"></span></div>
<div id="b"><span x-text="x.y.v"></span></div>`,
            {},
        );
        expect(store.state.x.y.v).toBe(1);
        expect(root.querySelector("#a span")!.textContent).toBe("1");
        expect(root.querySelector("#b span")!.textContent).toBe("1");
    });

    test("中间路径不存在时逐级自动创建：mount:'x.y' 建出 x:{y:{...}}", () => {
        const { store } = mount(
            `<div x-data="{a:1}" x-data-options="{mount:'p.q.r'}"></div>`,
            {},
        );
        expect(store.state.p.q.r).toEqual({ a: 1 });
    });

    test("merge 语义：挂载点已有旧键保留，新键追加", () => {
        const { store } = mount(
            `<div x-data="{a:1}" x-data-options="{mount:'box'}"></div>`,
            { box: { keep: "旧值" } },
        );
        expect(store.state.box).toEqual({ keep: "旧值", a: 1 });
    });

    test("path 模式 this.data 可写 + engine.data 直 merge 进挂载容器（细粒度响应式）", async () => {
        const { root, engine, store } = mount(
            `<div id="a" x-data="{n:1}" x-data-options="{mount:'cfg'}"><span x-text="n"></span></div>`,
            {},
        );
        // this.data 写：改 store.state.cfg.n 即触发订阅
        store.state.cfg.n = 5;
        await nextTick();
        expect(root.querySelector("#a span")!.textContent).toBe("5");
        // engine.data：直接 merge 进挂载容器（不建私有域、不重建子树）
        engine.data(root.querySelector("#a")!, { m: 9 });
        expect(store.state.cfg.m).toBe(9);
        expect(store.state[SCOPES_KEY]).not.toHaveProperty(
            String(engine.findScopeByEl(root.querySelector("#a")!)!.id),
        );
    });

    test("path 模式数据键经 store 直改驱动外部订阅（全树细粒度更新）", async () => {
        const { root, store } = mount(
            `<div x-data="{v:1}" x-data-options="{mount:'g'}"></div>
<span id="out" x-text="g.v"></span>`,
            {},
        );
        store.state.g.v = 100;
        await nextTick();
        expect(root.querySelector("#out")!.textContent).toBe("100");
    });

    test("中途断裂（存在但非对象）：warn + 降级默认私有域，数据不丢", () => {
        const { root, store, engine } = mount(
            `<div id="a" x-data="{a:1}" x-data-options="{mount:'x.y'}"><span x-text="a"></span></div>`,
            { x: 5 },
        );
        // x=5 无法穿透 → 降级私有域：子树照常读 a，state.x 不被覆盖
        expect((store.state as any).x).toBe(5);
        expect(root.querySelector("#a span")!.textContent).toBe("1");
        const id = engine.findScopeByEl(root.querySelector("#a")!)!.id;
        expect(store.state[SCOPES_KEY][id]).toEqual({ a: 1 });
    });

    test("mount 非字符串（误写 .mount 修饰符产生 true）：warn + 忽略，回默认私有域", () => {
        const { root, store } = mount(
            `<div id="a" x-data.mount="{a:1}"><span x-text="a"></span></div>`,
            {},
        );
        expect(root.querySelector("#a span")!.textContent).toBe("1");
        expect((store.state as any).a).toBeUndefined();
    });

    test("mount 空串 '' 等价根（≡ .global）", () => {
        const { store } = mount(
            `<div x-data="{k:1}" x-data-options="{mount:''}"></div>`,
            {},
        );
        expect(store.state.k).toBe(1);
    });

    test("mount 与 global 同写：mount 优先 + 不写根键", () => {
        const { store } = mount(
            `<div x-data="{k:1}" x-data-options="{mount:'m', global:true}"></div>`,
            {},
        );
        expect(store.state.m.k).toBe(1);
        expect((store.state as any).k).toBeUndefined();
    });

    test("global 带路径残留写法：warn + 按根处理", () => {
        const { store } = mount(
            `<div x-data="{k:1}" x-data-options="{global:'x.y'}"></div>`,
            {},
        );
        expect(store.state.k).toBe(1);
    });
});

describe("x-data mount 相对路径挂载", () => {
    test("'./x' 挂到自身容器下：_scopes.<id>.x", () => {
        const { root, store, engine } = mount(
            `<div id="a" x-data="{v:1}" x-data-options="{mount:'./x'}"><span x-text="v"></span></div>`,
            {},
        );
        const id = engine.findScopeByEl(root.querySelector("#a")!)!.id;
        expect(store.state[SCOPES_KEY][id]).toEqual({ x: { v: 1 } });
        expect(root.querySelector("#a span")!.textContent).toBe("1");
    });

    test("'../shared' 挂到直接父 scope（父有 x-data）：_scopes.<pid>.shared", () => {
        const { root, store, engine } = mount(
            `<div id="p" x-data="{pv:0}"><div id="c" x-data="{v:1}" x-data-options="{mount:'../shared'}"><span x-text="v"></span></div></div>`,
            {},
        );
        const pid = engine.findScopeByEl(root.querySelector("#p")!)!.id;
        expect(store.state[SCOPES_KEY][pid]).toEqual({ pv: 0, shared: { v: 1 } });
    });

    test("'../x' 父 scope 无 _data：无容器则创建（空私有域 + 数据挂入）", () => {
        // #mid 是纯容器（x-scope 占位建 scope、无 x-data），#leaf 的 .. 命中它 → 为其创建私有域
        const { root, store, engine } = mount(
            `<div id="mid" x-scope><div id="leaf" x-data="{v:1}" x-data-options="{mount:'../up'}"><span x-text="v"></span></div></div>`,
            {},
        );
        const mid = engine.findScopeByEl(root.querySelector("#mid")!)!;
        expect(mid._data).not.toBeNull();
        expect(store.state[SCOPES_KEY][mid.id]).toEqual({ up: { v: 1 } });
    });

    test("'../x' 越顶（根 scope 无父）：落根 state", () => {
        // 顶层 #a 直接 ..：无父 → 根
        const { root, store } = mount(
            `<div id="a" x-data="{v:1}" x-data-options="{mount:'../top'}"><span x-text="v"></span></div>`,
            {},
        );
        expect((store.state as any).top).toEqual({ v: 1 });
    });

    test("'../../x' 走两级直接父 scope", () => {
        const { root, store, engine } = mount(
            `<div id="gp" x-data="{g:0}"><div id="p" x-data="{p:0}"><div id="c" x-data="{v:1}" x-data-options="{mount:'../../deep'}"></div></div></div>`,
            {},
        );
        const gid = engine.findScopeByEl(root.querySelector("#gp")!)!.id;
        expect(store.state[SCOPES_KEY][gid]).toEqual({ g: 0, deep: { v: 1 } });
    });

    test("相对路径多段后缀：'../settings/theme' 挂到父容器下的 settings.theme", () => {
        const { root, store, engine } = mount(
            `<div id="p" x-data="{pv:0}"><div id="c" x-data="{v:1}" x-data-options="{mount:'../settings/theme'}"></div></div>`,
            {},
        );
        const pid = engine.findScopeByEl(root.querySelector("#p")!)!.id;
        expect(store.state[SCOPES_KEY][pid].settings.theme).toEqual({ v: 1 });
    });
});

describe("x-data mount .nearest 修饰符", () => {
    test("nearest：.. 跳过无 _data 的占位 scope，挂到最近持有数据的祖先", () => {
        // #mid 是 x-scope 占位（无 _data），#gp 有 x-data：nearest 的 .. 跳过 mid 命中 gp
        const { root, store, engine } = mount(
            `<div id="gp" x-data="{g:0}"><div id="mid" x-scope><div id="c" x-data.nearest="{v:1}" x-data-options="{mount:'../near'}"></div></div></div>`,
            {},
        );
        const gid = engine.findScopeByEl(root.querySelector("#gp")!)!.id;
        const mid = engine.findScopeByEl(root.querySelector("#mid")!)!;
        expect(mid._data).toBeNull(); // nearest 不为 mid 创建容器（区别于默认步进）
        expect(store.state[SCOPES_KEY][gid]).toEqual({ g: 0, near: { v: 1 } });
    });

    test("nearest 经 x-data-options=\"{nearest:true}\" 等价", () => {
        const { root, store, engine } = mount(
            `<div id="gp" x-data="{g:0}"><div id="mid" x-scope><div id="c" x-data="{v:1}" x-data-options="{mount:'../near', nearest:true}"></div></div></div>`,
            {},
        );
        const gid = engine.findScopeByEl(root.querySelector("#gp")!)!.id;
        expect(store.state[SCOPES_KEY][gid].near).toEqual({ v: 1 });
    });

    test("nearest 上溯无数据祖先：落根 state", () => {
        const { root, store } = mount(
            `<div id="mid" x-scope><div id="c" x-data.nearest="{v:1}" x-data-options="{mount:'../root'}"></div></div>`,
            {},
        );
        expect((store.state as any).root).toEqual({ v: 1 });
    });

    test("nearest 命中 path 模式祖先：挂到其挂载容器下（非 _scopes）", () => {
        // #gp 是 mount:'base' 的 path 模式（_data=state.base），#c 的 nearest .. 命中它 → 挂 state.base.child
        const { root, store } = mount(
            `<div id="gp" x-data="{g:0}" x-data-options="{mount:'base'}"><div id="mid" x-scope><div id="c" x-data.nearest="{v:1}" x-data-options="{mount:'../child'}"></div></div></div>`,
            {},
        );
        expect(store.state.base).toEqual({ g: 0, child: { v: 1 } });
    });

    test("nearest 配绝对路径：静默忽略（正常挂载）", () => {
        const { store } = mount(
            `<div x-data.nearest="{v:1}" x-data-options="{mount:'abs'}"></div>`,
            {},
        );
        expect(store.state.abs).toEqual({ v: 1 });
    });

    test("默认（无 nearest）.. 不跳层：直接父是占位 scope 时为其创建容器（对照）", () => {
        const { root, store, engine } = mount(
            `<div id="gp" x-data="{g:0}"><div id="mid" x-scope><div id="c" x-data="{v:1}" x-data-options="{mount:'../near'}"></div></div></div>`,
            {},
        );
        const mid = engine.findScopeByEl(root.querySelector("#mid")!)!;
        const gid = engine.findScopeByEl(root.querySelector("#gp")!)!.id;
        // 默认步进：.. 命中 mid（占位）→ 为 mid 创建容器，数据挂 mid 而非 gp
        expect(store.state[SCOPES_KEY][mid.id]).toEqual({ near: { v: 1 } });
        expect(store.state[SCOPES_KEY][gid]).toEqual({ g: 0 });
    });
});

describe("x-data mount destroy 回收", () => {
    test("path 模式 destroy：键级 CAS 删除 + 容器删空则连同中间容器向上回收", () => {
        const { root, store, engine } = mount(
            `<div id="a" x-data="{v:1}" x-data-options="{mount:'p.q.r'}"></div>`,
            {},
        );
        expect(store.state.p.q.r).toEqual({ v: 1 });
        destroyScopeFor(engine, root.querySelector("#a")!);
        // p.q.r 删空 → 连 q、p 一并回收
        expect((store.state as any).p).toBeUndefined();
    });

    test("挂载点他人旧键保留：删自己的键后容器非空 → 不回收容器", () => {
        const { root, store, engine } = mount(
            `<div id="a" x-data="{a:1}" x-data-options="{mount:'box'}"></div>`,
            { box: { keep: "旧值" } },
        );
        destroyScopeFor(engine, root.querySelector("#a")!);
        expect(store.state.box).toEqual({ keep: "旧值" });
    });

    test("engine.data 运行时追加的键不回收（残留可接受，用户接管）", async () => {
        const { root, store, engine } = mount(
            `<div id="a" x-data="{a:1}" x-data-options="{mount:'box'}"></div>`,
            {},
        );
        engine.data(root.querySelector("#a")!, { runtimeKey: 1 });
        destroyScopeFor(engine, root.querySelector("#a")!);
        // 声明键 a 被 CAS 删除；runtimeKey 残留
        expect(store.state.box).toEqual({ runtimeKey: 1 });
    });

    test("被后写者覆盖的键不误删（CAS）", () => {
        const { root, store, engine } = mount(
            `<div id="e1" x-data="{x:1}" x-data-options="{mount:'shared'}"></div>
<div id="e2" x-data="{x:2}" x-data-options="{mount:'shared'}"></div>`,
            {},
        );
        expect(store.state.shared.x).toBe(2);
        destroyScopeFor(engine, root.querySelector("#e1")!);
        expect(store.state.shared.x).toBe(2); // e1 的 1 已被覆盖，CAS 跳过
        destroyScopeFor(engine, root.querySelector("#e2")!);
        expect((store.state as any).shared).toBeUndefined(); // e2 是末写者，删空后容器回收
    });

    test("无效路径降级 local 后 destroy：按私有域回收（不留垃圾）", () => {
        const { root, store, engine } = mount(
            `<div id="a" x-data="{a:1}" x-data-options="{mount:'x.y'}"></div>`,
            { x: 5 },
        );
        const id = engine.findScopeByEl(root.querySelector("#a")!)!.id;
        expect(store.state[SCOPES_KEY][id]).toEqual({ a: 1 });
        destroyScopeFor(engine, root.querySelector("#a")!);
        expect((store.state as any)[SCOPES_KEY][id]).toBeUndefined();
        expect((store.state as any).x).toBe(5); // 用户数据不动
    });

    test("engine.destroy 全量销毁：mount 挂载的容器一并回收", () => {
        const { store, engine } = mount(
            `<div x-data="{v:1}" x-data-options="{mount:'p.q'}"></div>`,
            {},
        );
        expect(store.state.p.q).toEqual({ v: 1 });
        engine.destroy();
        expect((store.state as any).p).toBeUndefined();
    });
});

describe("x-data mount 指向 _scopes 他域（warn + 放行）", () => {
    test("mount:'_scopes.<id>' 直指他域私有域：放行 merge", () => {
        // scope id 是类级静态自增（跨 engine 不重置）。同一次 mount 内：host 先编译，
        // attacker 后编译——host 的 id = attacker 编译前最后一个已分配 id + 1，可预计算。
        // 先用 probe 量出「下一个 id」（host 将取得的），再在正式模板中显式挂载。
        const probe = mount(`<div id="p" x-data="{x:0}"></div>`, {});
        const nextId = probe.engine.findScopeByEl(probe.root.querySelector("#p")!)!.id + 1;
        probe.engine.destroy();
        const { store } = mount(
            `<div id="host" x-data="{h:1}"></div>
<div id="attacker" x-data="{a:2}" x-data-options="{mount:'_scopes.${nextId}'}"></div>`,
            {},
        );
        // host 恰取 nextId，attacker 的数据 merge 进其私有域（warn + 放行语义）
        expect(store.state._scopes[nextId]).toEqual({ h: 1, a: 2 });
    });
});

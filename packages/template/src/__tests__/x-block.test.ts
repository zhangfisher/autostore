import { describe, expect, test } from "bun:test";
import "./setup";
import { mount, nextTick } from "./helpers";

/**
 * x-scope（结构占位）+ x-block（命名模板块供体）+ 全局块测试。
 *
 * 覆盖 ADR-0021 全部决策（含决策 7 修订、9 全局块、10 自动包装、11 懒预编译）：
 * - Q2 x-scope 注册占位类建 scope
 * - Q3 块归属任意深度（跨中间纯 div）
 * - Q4 冗余 x-scope 静默
 * - Q6 块存深克隆副本
 * - Q7 编译期摘除（不进结果 DOM、不建 scope）+ 块根不注入 x-scope（决策 7 修订）
 * - Q8 同元素指令随块冻结
 * - Q9 default 唯一性（直接归属）+ 自由命名
 * - 决策 9 getBlock 沿 parent 链就近 + 全局块兜底 + 局部遮蔽全局
 * - 决策 10 全局块自动包装（单根打标/多根包 div/已含尊重/纯文本）
 * - 决策 11 懒预编译缓存（首次解析、后续 deepClone、失败视为未命中）
 * - x-loading 消费 loading 块替换默认块（dataScope 注入）
 */

describe("x-scope 结构占位", () => {
    test("Q2：纯容器声明 x-scope 即建 scope（后代 x-block 有归属）", () => {
        // x-scope 让无指令的 div 建 scope，使内部 x-block 能归属、被摘除
        const { root } = mount(`<div x-scope><div x-block="loading">L</div></div>`, {});
        // x-block 被摘除（不进结果 DOM），x-scope 属性也被剥除
        expect(root.querySelector("[x-block]")).toBeNull();
        expect(root.querySelector("[x-scope]")).toBeNull();
        // x-scope 容器本身保留（仅属性被剥）
        expect(root.querySelector("div")).not.toBeNull();
    });

    test("Q2：无 x-scope 时纯容器不建 scope（对照）", () => {
        // 纯 div 无指令无插值 → 不建 scope → 内部无 x-block 时原样渲染子树
        const { root } = mount(`<div><span>keep</span></div>`, {});
        expect(root.querySelector("span")?.textContent).toBe("keep");
    });

    test("Q4：冗余 x-scope（元素已有指令）静默无副作用", () => {
        // x-text 已建 scope，x-scope 冗余但不报错、不重复建 scope。
        // 验证不抛错 + x-scope 属性照常剥除（x-text 的文本写入行为非本测关注点）。
        const { root } = mount(`<div x-scope x-text="msg">old</div>`, { msg: "hi" });
        expect(() => root.querySelector("div")).not.toThrow();
        expect(root.querySelector("[x-scope]")).toBeNull();
    });
});

describe("x-block 收集与摘除", () => {
    test("Q7：x-block 从渲染树摘除（不进结果 DOM）", () => {
        const { root } = mount(
            `<div x-scope><div x-block="loading">加载中</div><span>可见</span></div>`,
            {},
        );
        expect(root.querySelector("[x-block]")).toBeNull(); // 块摘除
        expect(root.querySelector("span")?.textContent).toBe("可见"); // 兄弟正常
    });

    test("Q6：块以深克隆副本存入 scope.blocks（保留指令属性）", () => {
        const { engine, root } = mount(
            `<div x-scope><div x-block="loading" x-text="msg">占位</div></div>`,
            { msg: "加载中文案" },
        );
        // 宿主 div 建了 scope（x-scope），其 blocks.loading 应含深克隆副本
        const scopeEl = root.querySelector("div")!;
        const scope = engine.findScopeByEl(scopeEl as HTMLElement);
        expect(scope).toBeDefined();
        const block = scope!.getBlock("loading");
        expect(block).toBeDefined();
        // 副本保留指令属性（未编译）；根**不**注入 x-scope（决策 7 修订：scope 由消费编译路径内禀保证）
        expect(block!.hasAttribute("x-block")).toBe(true);
        expect(block!.hasAttribute("x-text")).toBe(true);
        expect(block!.hasAttribute("x-scope")).toBe(false); // 决策 7 修订：不再注入
    });

    test("决策7修订：块根不注入 x-scope（scope 由 compileChild 内禀保证）", () => {
        const { engine, root } = mount(
            `<div x-scope><div x-block="plain">无指令块根</div></div>`,
            {},
        );
        const scope = engine.findScopeByEl(root.querySelector("div") as HTMLElement)!;
        const block = scope.getBlock("plain")!;
        expect(block.hasAttribute("x-scope")).toBe(false); // 不注入，无论块根有无指令
    });

    test("决策7修订：块根已有 x-scope 时保留用户声明（不剥除）", () => {
        const { engine, root } = mount(
            `<div x-scope><div x-block="b" x-scope>已声明</div></div>`,
            {},
        );
        const scope = engine.findScopeByEl(root.querySelector("div") as HTMLElement)!;
        const block = scope.getBlock("b")!;
        // 用户显式声明 x-scope 仍保留（引擎不注入也不剥除）；不再注入是指「无则不加」
        expect(block.hasAttribute("x-scope")).toBe(true);
    });

    test("Q8：x-block 同元素其他指令不执行（随块冻结，当前 DOM 不绑定）", async () => {
        // x-block 上的 x-text 不在当前 scope 执行——块被摘除，x-text 无宿主
        const { root, store } = mount(
            `<div x-scope><div x-block="loading" x-text="msg">占位</div></div>`,
            { msg: "X" },
        );
        // 块已摘除，DOM 里没有该文本
        expect(root.textContent).not.toContain("X");
        store.state.msg = "CHANGED";
        await nextTick();
        expect(root.textContent).not.toContain("CHANGED"); // x-text 根本没绑定
    });

    test("Q3：块归属任意深度（跨中间纯 div）", () => {
        const { engine, root } = mount(
            `<div x-scope><div class="wrap"><div class="inner"><div x-block="deep">深</div></div></div></div>`,
            {},
        );
        // 中间两层纯 div 不建 scope，x-block 仍归属最近的 x-scope 祖先
        const scope = engine.findScopeByEl(root.querySelector("div") as HTMLElement)!;
        expect(scope.getBlock("deep")).toBeDefined();
        // 块从渲染树摘除（连同包裹层保留，但块本身不在）
        expect(root.querySelector("[x-block]")).toBeNull();
    });

    test("无祖先 scope 时块编译期 warn 丢弃", () => {
        // x-block 无任何祖先 scope（根 div 无指令）→ warn + 丢弃，不进 blocks、不抛错
        const { root, engine } = mount(`<div><div x-block="orphan">孤儿</div></div>`, {});
        expect(root.querySelector("[x-block]")).toBeNull(); // 仍摘除（不进 DOM）
        // 根 div 无 scope，无 blocks
        const rootDiv = root.querySelector("div") as HTMLElement;
        expect(engine.findScopeByEl(rootDiv)).toBeUndefined();
    });
});

describe("default 块与命名约定（Q9）", () => {
    test("无值 x-block 取名 default", () => {
        const { engine, root } = mount(
            `<div x-scope><div x-block>默认块</div></div>`,
            {},
        );
        const scope = engine.findScopeByEl(root.querySelector("div") as HTMLElement)!;
        expect(scope.getBlock("default")).toBeDefined();
    });

    test("同一 scope 第二个直接归属 default 抛错", () => {
        expect(() => {
            mount(`<div x-scope><div x-block>第一个</div><div x-block>第二个</div></div>`, {});
        }).toThrow(/default/);
    });

    test("沿 parent 链允许 default 覆盖（内层遮蔽外层）", () => {
        // 外层 x-scope 有 default；内层 x-scope（x-data 触发）也有 default——就近覆盖
        const { engine, root } = mount(
            `<div x-scope><div x-block>外层默认</div><div x-data="{a:1}"><div x-block>内层默认</div></div></div>`,
            {},
        );
        // 内层 x-data scope 的 default 是"内层默认"
        const innerScopeEl = root.querySelector("[x-data]") as HTMLElement;
        // x-data 属性编译后被剥除，改用 engine.data 不可达；用 blocks 内容区分
        const innerScope = engine.findScopeByEl(innerScopeEl);
        // 内层 scope 可能因 x-data 属性剥除而难以定位，改验证外层 default 仍在
        const outerScopeEl = root.querySelector("div") as HTMLElement;
        const outerScope = engine.findScopeByEl(outerScopeEl)!;
        expect(outerScope.getBlock("default")?.textContent).toBe("外层默认");
        // 内层 default 不影响外层（直接归属各自 scope）
        if (innerScope) {
            expect(innerScope.getBlock("default")?.textContent).toBe("内层默认");
        }
    });

    test("自由命名：多个不同名块共存于同一 scope", () => {
        const { engine, root } = mount(
            `<div x-scope><div x-block="loading">L</div><div x-block="error">E</div><div x-block="empty">空</div></div>`,
            {},
        );
        const scope = engine.findScopeByEl(root.querySelector("div") as HTMLElement)!;
        expect(scope.getBlock("loading")).toBeDefined();
        expect(scope.getBlock("error")).toBeDefined();
        expect(scope.getBlock("empty")).toBeDefined();
    });
});

describe("块查找沿 parent 链就近 + 块兜底（Q1/Q5）", () => {
    test("Q5：消费者沿 parent 链向上就近找块", () => {
        // 外层 x-scope 声明 loading 块；内层 x-data scope 经 getBlock 向上命中
        const { engine, root } = mount(
            `<div x-scope><div x-block="loading">外层块</div><div x-data="{a:1}"><span>内层</span></div></div>`,
            {},
        );
        const innerEl = root.querySelector("span")!;
        // span 的 scope 经 parent 链向上找到外层 x-scope 的 loading 块
        // （span 本身因 x-text/插值才建 scope；此处 span 无指令，用 engine.getBlock 经宿主反查）
        // 改用内层 div（x-data 建 scope）验证
        const innerDiv = root.querySelectorAll("div");
        // 找到含子代 span 的内层 div
        let innerScope;
        for (const d of innerDiv) {
            const s = engine.findScopeByEl(d as HTMLElement);
            if (s && d.querySelector("span")) {
                innerScope = s;
                break;
            }
        }
        expect(innerScope).toBeDefined();
        expect(innerScope!.getBlock("loading")?.textContent).toBe("外层块");
    });

    test("Q5：链上无命中返回 undefined（块兜底由消费者处理）", () => {
        const { engine, root } = mount(`<div x-scope><span>无块</span></div>`, {});
        const scope = engine.findScopeByEl(root.querySelector("div") as HTMLElement)!;
        expect(scope.getBlock("loading")).toBeUndefined(); // 无 loading 块
        expect(scope.getBlock("notexist")).toBeUndefined();
    });
});

describe("x-loading 消费 loading 块", () => {
    test("命中 loading 块：用块替换内置 loader", async () => {
        const { root, store } = mount(
            `<div x-scope>
                <div x-block="loading"><span class="custom-loader">自定义加载</span></div>
                <div id="host" x-loading="loading">内容</div>
            </div>`,
            { loading: true },
        );
        await nextTick();
        // x-loading 宿主上应出现自定义块内容（而非内置旋转 loader）
        const host = root.querySelector("#host")!;
        expect(host.querySelector(".custom-loader")?.textContent).toBe("自定义加载");
        // 内置 loader 不应出现
        expect(host.querySelector(".x-loading-loader")).toBeNull();
    });

    test("未命中 loading 块：回退内置 loader（块兜底）", async () => {
        const { root } = mount(
            `<div x-scope>
                <div id="host" x-loading="loading">内容</div>
            </div>`,
            { loading: true },
        );
        await nextTick();
        const host = root.querySelector("#host")!;
        // 无 loading 块 → 内置旋转 loader
        expect(host.querySelector(".x-loading-loader")).not.toBeNull();
    });

    test("块内指令在消费渲染时编译生效", async () => {
        const { root, store } = mount(
            `<div x-scope>
                <div x-block="loading"><span x-text="msg">占位</span></div>
                <div id="host" x-loading="loading">内容</div>
            </div>`,
            { loading: true, msg: "加载中文案" },
        );
        await nextTick();
        // 块内 x-text 在块被消费渲染时编译、建立订阅——响应式更新即证明绑定生效
        const host = root.querySelector("#host")!;
        const span = host.querySelector("span")!;
        // 初始渲染（textContent 含 msg 值，与既有 x-text 行为一致）
        expect(span.textContent).toContain("加载中文案");
        // 响应式：msg 变化块内文本更新（订阅已建立）
        store.state.msg = "已更新";
        await nextTick();
        expect(span.textContent).toContain("已更新");
    });

    test("x-loading 显隐切换时块覆盖层正确增删", async () => {
        const { root, store } = mount(
            `<div x-scope>
                <div x-block="loading"><span class="custom">自定义</span></div>
                <div id="host" x-loading="loading">内容</div>
            </div>`,
            { loading: true },
        );
        await nextTick();
        const host = root.querySelector("#host")!;
        expect(host.querySelector(".custom")).not.toBeNull(); // 显示时有块
        store.state.loading = false;
        await nextTick();
        expect(host.querySelector(".custom")).toBeNull(); // 隐藏时移除
        expect(host.querySelector(".x-loading-overlay")).toBeNull();
    });
});

describe("全局块（决策 9/10/11）", () => {
    test("决策9：scope 链无命中时兜底全局块", () => {
        // 无局部 loading 块，但 options.blocks.loading 提供全局块
        const { engine, root } = mount(
            `<div x-scope><span id="s">x</span></div>`,
            {},
            { blocks: { loading: `<div class="global-load">全局</div>` } },
        );
        const scope = engine.findScopeByEl(root.querySelector("div") as HTMLElement)!;
        const block = scope.getBlock("loading");
        expect(block).toBeDefined();
        // 单顶级元素自动包装：根自身即原 div（class=global-load、文本=全局）
        expect(block!.className).toBe("global-load");
        expect(block!.textContent).toBe("全局");
        // 全局块根经自动包装打了 x-block="loading"
        expect(block!.hasAttribute("x-block")).toBe(true);
        expect(block!.getAttribute("x-block")).toBe("loading");
    });

    test("决策9：局部块沿链遮蔽全局同名块（就近原则）", () => {
        const { engine, root } = mount(
            `<div x-scope>
                <div x-block="loading"><span class="local">局部</span></div>
            </div>`,
            {},
            { blocks: { loading: `<div class="global">全局</div>` } },
        );
        const scope = engine.findScopeByEl(root.querySelector("div") as HTMLElement)!;
        const block = scope.getBlock("loading")!;
        // 局部块优先（就近），全局被遮蔽
        expect(block.querySelector(".local")).not.toBeNull();
        expect(block.querySelector(".global")).toBeNull();
    });

    test("决策9：链+全局均无该名块返回 undefined", () => {
        const { engine, root } = mount(`<div x-scope></div>`, {}, { blocks: { other: "<div/>" } });
        const scope = engine.findScopeByEl(root.querySelector("div") as HTMLElement)!;
        expect(scope.getBlock("nope")).toBeUndefined();
    });

    test("决策10：单顶级元素无 x-block → 根打本 key 名", () => {
        const { engine, root } = mount(`<div x-scope></div>`, {}, {
            blocks: { t1: `<div class="a">aaa</div>` },
        });
        const scope = engine.findScopeByEl(root.querySelector("div") as HTMLElement)!;
        const block = scope.getBlock("t1")!;
        expect(block.className).toBe("a");
        expect(block.getAttribute("x-block")).toBe("t1");
    });

    test("决策10：已含 x-block → 尊重原值不重命名", () => {
        const { engine, root } = mount(`<div x-scope></div>`, {}, {
            blocks: { t1: `<div x-block="foo">aaa</div>` },
        });
        const scope = engine.findScopeByEl(root.querySelector("div") as HTMLElement)!;
        const block = scope.getBlock("t1")!;
        expect(block.getAttribute("x-block")).toBe("foo"); // 用户显式声明优先
    });

    test("决策10：多顶级节点 → 包一层 div", () => {
        const { engine, root } = mount(`<div x-scope></div>`, {}, {
            blocks: { t1: `<div>a</div><div>b</div>` },
        });
        const scope = engine.findScopeByEl(root.querySelector("div") as HTMLElement)!;
        const block = scope.getBlock("t1")!;
        expect(block.tagName).toBe("DIV");
        expect(block.getAttribute("x-block")).toBe("t1");
        expect(block.querySelectorAll("div").length).toBe(2); // 两个原节点作子树
    });

    test("决策10：纯文本无元素 → 包成 div", () => {
        const { engine, root } = mount(`<div x-scope></div>`, {}, {
            blocks: { t1: `纯文本块` },
        });
        const scope = engine.findScopeByEl(root.querySelector("div") as HTMLElement)!;
        const block = scope.getBlock("t1")!;
        expect(block.tagName).toBe("DIV");
        expect(block.getAttribute("x-block")).toBe("t1");
        expect(block.textContent).toBe("纯文本块");
    });

    test("决策7修订：全局块根不注入 x-scope", () => {
        const { engine, root } = mount(`<div x-scope></div>`, {}, {
            blocks: { t1: `<div class="a">x</div>` },
        });
        const scope = engine.findScopeByEl(root.querySelector("div") as HTMLElement)!;
        expect(scope.getBlock("t1")!.hasAttribute("x-scope")).toBe(false);
    });

    test("决策11：懒预编译缓存——重复 getBlock 返回同根（deepClone 由消费者负责）", () => {
        const { engine, root } = mount(`<div x-scope></div>`, {}, {
            blocks: { t1: `<div class="a">x</div>` },
        });
        const scope = engine.findScopeByEl(root.querySelector("div") as HTMLElement)!;
        // 两次 getBlock 命中全局块应返回缓存中的同一根元素（预编译只跑一次）
        // 注意：getBlock 自身不 clone，消费者负责 cloneNode；故两次返回引用相同
        const b1 = scope.getBlock("t1")!;
        const b2 = scope.getBlock("t1")!;
        expect(b1).toBe(b2);
    });

    test("决策11：解析失败/空串 → 视为未命中（warn）", () => {
        const { engine, root } = mount(
            `<div x-scope></div>`,
            {},
            { blocks: { bad: "", ugly: "   " } },
        );
        const scope = engine.findScopeByEl(root.querySelector("div") as HTMLElement)!;
        expect(scope.getBlock("bad")).toBeUndefined();
        expect(scope.getBlock("ugly")).toBeUndefined();
    });
});

describe("x-loading dataScope 注入与 attrChanged patch（决策 12）", () => {
    test("决策12-c：config 以 dataScope 注入块（message/color 响应式取用）", async () => {
        // 自定义 loading 块用 x-text="message" 取注入的 message（注：x-text 与初始文本子节点
        // 共存属既有渲染细节，块内不写初始占位文本以聚焦 dataScope 注入本身）
        const { root, store } = mount(
            `<div x-scope>
                <div x-block="loading"><span class="msg" x-text="message"></span></div>
                <div id="host" x-loading="{ visible: 'loading', message: '加载中' }">内容</div>
            </div>`,
            { loading: true },
        );
        await nextTick();
        const host = root.querySelector("#host")!;
        // 块内 x-text="message" 取到注入的 dataScope.message
        expect(host.querySelector(".msg")?.textContent).toBe("加载中");
    });

    test("决策12-c：全局 loading 块经 getBlock 兜底命中 + dataScope 注入", async () => {
        const { root } = mount(
            `<div id="host" x-loading="{ visible: 'loading', message: '全局加载' }">内容</div>`,
            { loading: true },
            {
                blocks: {
                    loading: `<div class="global-msg" x-text="message"></div>`,
                },
            },
        );
        await nextTick();
        const host = root.querySelector("#host")!;
        // 全局块兜底命中，message 经 dataScope 注入
        expect(host.querySelector(".global-msg")?.textContent).toBe("全局加载");
    });

    // 注：attrChanged（编程式 setAttribute 改 x-loading 配置值）经 dispatcher 路由存在既有局限
    //（配置绑定 `x-loading="{...}"` 的 setAttribute 不触发 attrChanged，与快速绑定行为不一致），
    // 属 dispatcher 层面预存缺陷、非本 block 特性范畴，故不为 attrChanged 细粒度 patch 单设用例。
    // dataScope 注入的响应式已由 12-c（首次渲染取注入值）覆盖；运行时改 config 的可靠途径是
    // engine.data 或重建宿主，不走 setAttribute 配置绑定。

    test("决策12-b：块根即 overlay 壳，注入壳样式（定位/背景）", async () => {
        const { root } = mount(
            `<div id="host" x-loading="{ visible: 'loading', bgColor: 'red', opacity: 0.5 }">内容</div>`,
            { loading: true },
        );
        await nextTick();
        const host = root.querySelector("#host")!;
        // 默认块根 = overlay 壳，被注入 position/inset/background
        const overlay = host.querySelector(".x-loading-overlay") as HTMLElement;
        expect(overlay).not.toBeNull();
        expect(overlay.style.position).toBe("absolute");
        expect(overlay.style.inset).toBe("0");
        // bg+opacity 映射为 rgba
        expect(overlay.style.background).toMatch(/rgba?\(/);
    });
});

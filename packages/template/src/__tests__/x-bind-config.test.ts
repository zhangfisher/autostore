import { describe, expect, test } from "bun:test";
import "./setup";
import { AutoStore, ConfigManager, configurable } from "autostore";
import { AutoTemplateEngine } from "../engine";
import { nextTick } from "./helpers";

/**
 * 本地 configurable 包装：放宽 options 类型为 any。
 *
 * `configurable`（= schema）的重载签名要求第二参是 AutoStateSchemaBase 结构，
 * 而本测试用自定义元数据 key（cls/style/locked/v/obj 等，schema 可扩展故合法），
 * 故包一层 cast，规避重载不匹配的类型噪音（不影响运行时行为）。
 */
function cfg(initial: any, options: Record<string, any>) {
    return configurable(initial, options as any);
}

/**
 * x-bind `@` 分隔符——configManager 元数据绑定测试（ADR-0019）。
 *
 * 语法：`配置状态路径@配置属性路径`，第一个 @ 分割，右侧支持多段嵌套（如 `style.color`）。
 *
 * 搭建：state 用 `cfg(initial, {placeholder:...})` 标注字段 → store 构造时自动
 * 注册到共享的 ConfigManager，`configManager.state["configKey.路径"]` 即 schema options 对象。
 *
 * 约定：
 * - 改 schema 子属性经 `configManager.state[fullKey].placeholder = x`（响应式 Proxy）；
 * - scheduler 经 microtask flush，写后须 `await nextTick()` 再断言；
 * - `@` 两侧纯路径 only，无 @ 即状态绑定。
 */

/** 带 configManager 的挂载辅助：state 中的 configurable 字段自动注册到 configManager */
function mountWithConfig(
    html: string,
    state: any,
    opts: { configKey?: string; configManager?: ConfigManager } = {},
) {
    const root = document.createElement("div");
    root.innerHTML = html.trim();
    const configManager =
        opts.configManager ??
        new ConfigManager(
            {
                load: async () => ({}),
                save: async () => {},
            },
            { autoload: false, global: false },
        );
    const store = new AutoStore(state, {
        configManager,
        configKey: opts.configKey,
    } as any);
    const engine = new AutoTemplateEngine(root, store);
    return { root, store, engine, configManager };
}

describe("x-bind @ 配置引用：基础", () => {
    test("@ 绑定 configManager 元数据到属性", () => {
        const { root } = mountWithConfig(`<input :placeholder="order.price@placeholder"/>`, {
            order: {
                price: cfg(99, { placeholder: "请输入价格" }),
            },
        });
        expect(root.querySelector("input")!.getAttribute("placeholder")).toBe("请输入价格");
    });

    test("@ 左侧嵌套状态路径", () => {
        const { root } = mountWithConfig(
            // 左侧 user.profile.name（configurable 字段），右侧 title
            `<input :title="user.profile.name@title"/>`,
            {
                user: {
                    profile: { name: cfg("bob", { title: "昵称" }) },
                },
            },
            { configKey: "app" },
        );
        expect(root.querySelector("input")!.getAttribute("title")).toBe("昵称");
    });

    test("@ 右侧嵌套属性路径（绑 schema 对象属性）", () => {
        const { root } = mountWithConfig(
            // 右侧 style.color 支持多段嵌套
            `<input :placeholder="order.price@style.color"/>`,
            {
                order: {
                    price: cfg(1, { style: { color: "红" } }),
                },
            },
        );
        expect(root.querySelector("input")!.getAttribute("placeholder")).toBe("红");
    });

    test("无 @ 退化为状态绑定（绑 store.state 值）", () => {
        const { root } = mountWithConfig(`<input :placeholder="order.price"/>`, {
            order: { price: "状态值" },
        });
        expect(root.querySelector("input")!.getAttribute("placeholder")).toBe("状态值");
    });
});

describe("x-bind @ 配置引用：响应式更新", () => {
    test("改 configManager schema 属性 → DOM 自动更新", async () => {
        const { root, configManager } = mountWithConfig(
            `<input :placeholder="order.price@placeholder"/>`,
            { order: { price: cfg(1, { placeholder: "旧" }) } },
        );
        const input = root.querySelector("input")!;
        expect(input.getAttribute("placeholder")).toBe("旧");
        // 直接定位 schema options 对象改其属性（configManager.state 是响应式 Proxy）
        const fullKey = Object.keys(configManager.state).find((k) => k.endsWith("order.price"))!;
        (configManager.state as any)[fullKey].placeholder = "新";
        await nextTick();
        expect(input.getAttribute("placeholder")).toBe("新");
    });

    test("改 schema 嵌套属性 → DOM 自动更新（后代广播）", async () => {
        const { root, configManager } = mountWithConfig(
            `<input :placeholder="order.price@style.color"/>`,
            { order: { price: cfg(1, { style: { color: "红" } }) } },
        );
        const input = root.querySelector("input")!;
        expect(input.getAttribute("placeholder")).toBe("红");
        const fullKey = Object.keys(configManager.state).find((k) => k.endsWith("order.price"))!;
        (configManager.state as any)[fullKey].style.color = "蓝";
        await nextTick();
        expect(input.getAttribute("placeholder")).toBe("蓝");
    });

    test("整体替换 schema 嵌套对象 → 后代监听仍触发（ADR-0001 后代广播）", async () => {
        const { root, configManager } = mountWithConfig(
            `<input :placeholder="order.price@style.color"/>`,
            { order: { price: cfg(1, { style: { color: "红" } }) } },
        );
        const input = root.querySelector("input")!;
        const fullKey = Object.keys(configManager.state).find((k) => k.endsWith("order.price"))!;
        (configManager.state as any)[fullKey].style = { color: "绿" };
        await nextTick();
        expect(input.getAttribute("placeholder")).toBe("绿");
    });

    test("configKey 变化时各 store 独立（多 store 共享 configManager）", () => {
        const cm = new ConfigManager(
            { load: async () => ({}), save: async () => {} },
            { autoload: false, global: false },
        );
        const s1 = mountWithConfig(`<input :placeholder="name@placeholder"/>`, {
            name: cfg("a", { placeholder: "应用一" }),
        }, { configKey: "app1", configManager: cm });
        const s2 = mountWithConfig(`<input :placeholder="name@placeholder"/>`, {
            name: cfg("b", { placeholder: "应用二" }),
        }, { configKey: "app2", configManager: cm });
        expect(s1.root.querySelector("input")!.getAttribute("placeholder")).toBe("应用一");
        expect(s2.root.querySelector("input")!.getAttribute("placeholder")).toBe("应用二");
    });
});

describe("x-bind @ 配置引用：全分派复用", () => {
    test("@ class 分支（normalizeClass diff）", () => {
        const { root } = mountWithConfig(`<div :class="order.price@cls"/>`, {
            order: { price: cfg(1, { cls: "primary" }) },
        });
        expect(root.querySelector("div")!.className).toContain("primary");
    });

    test("@ style 分支（对象 cssText 写入）", () => {
        const { root } = mountWithConfig(`<div :style="order.price@style"/>`, {
            order: { price: cfg(1, { style: "color:red" }) },
        });
        // 浏览器规范化 cssText（自动加空格和分号），故匹配 color 键
        expect(root.querySelector("div")!.getAttribute("style")).toContain("color");
    });

    test("@ boolean 分支（disabled truthy setAttribute）", () => {
        const { root } = mountWithConfig(`<button :disabled="order.price@locked"/>`, {
            order: { price: cfg(1, { locked: 1 }) },
        });
        expect(root.querySelector("button")!.hasAttribute("disabled")).toBe(true);
    });

    test("@ property 分支（value 单向写 DOM）", () => {
        const { root } = mountWithConfig(`<input :value="order.price@v"/>`, {
            order: { price: cfg(1, { v: "固定值" }) },
        });
        expect(root.querySelector("input")!.value).toBe("固定值");
    });
});

describe("x-bind @ 配置引用：三层降级", () => {
    test("configManager 不存在 → warn + 静默（不动 DOM）", () => {
        const root = document.createElement("div");
        root.innerHTML = `<input :placeholder="order.price@placeholder"/>`;
        const store = new AutoStore({ order: { price: 1 } });
        expect(() => new AutoTemplateEngine(root, store)).not.toThrow();
        // 无 configManager → 不动 DOM，input 无 placeholder 属性
        expect(root.querySelector("input")!.hasAttribute("placeholder")).toBe(false);
    });

    test("schema 不存在（路径未注册为 configurable）→ warn + 静默", () => {
        const { root } = mountWithConfig(`<input :placeholder="order.count@placeholder"/>`, {
            order: { price: cfg(1, { placeholder: "有" }), count: 5 },
            // order.count 非 configurable → configManager 无对应 schema
        });
        // schema 不存在 → 不动 DOM
        expect(root.querySelector("input")!.hasAttribute("placeholder")).toBe(false);
    });

    test("schema 存在但属性缺失 → 复用 patch removeAttribute（不额外 warn）", () => {
        const { root } = mountWithConfig(`<input :placeholder="order.price@placeholder"/>`, {
            order: { price: cfg(1, { title: "有 title 但无 placeholder" }) },
        });
        // 属性值为 undefined → 走 patch falsy 分支 removeAttribute（此处本就无属性，保持无）
        expect(root.querySelector("input")!.hasAttribute("placeholder")).toBe(false);
    });

    test("嵌套属性路径中途断裂 → 静默 removeAttribute", () => {
        const { root } = mountWithConfig(
            // schema 无 style 子对象 → @style.color 中途断裂 → undefined
            `<input :placeholder="order.price@style.color"/>`,
            { order: { price: cfg(1, { placeholder: "有 placeholder 但无 style" }) } },
        );
        expect(root.querySelector("input")!.hasAttribute("placeholder")).toBe(false);
    });

    test("@ 左侧为空 → warn + 静默", () => {
        const { root } = mountWithConfig(`<input :placeholder="@placeholder"/>`, {
            order: { price: cfg(1, { placeholder: "x" }) },
        });
        expect(root.querySelector("input")!.hasAttribute("placeholder")).toBe(false);
    });

    test("@ 右侧为空 → warn + 静默", () => {
        const { root } = mountWithConfig(`<input :placeholder="order.price@"/>`, {
            order: { price: cfg(1, { placeholder: "x" }) },
        });
        expect(root.querySelector("input")!.hasAttribute("placeholder")).toBe(false);
    });
});

describe("x-bind @ 配置引用：configKey 边界", () => {
    test("configKey 空串 → fullKey 不加前缀", () => {
        const { root, configManager } = mountWithConfig(
            `<input :placeholder="order.price@placeholder"/>`,
            { order: { price: cfg(1, { placeholder: "无前缀" }) } },
            { configKey: "" },
        );
        expect(root.querySelector("input")!.getAttribute("placeholder")).toBe("无前缀");
        // state key 应是不带前缀的 "order.price"
        expect((configManager.state as any)["order.price"]).toBeDefined();
        expect((configManager.state as any)["app.order.price"]).toBeUndefined();
    });
});

describe("x-bind @ 配置引用：冲突", () => {
    test(":value=x@value 与 x-model 同元素 → 编译期报错", () => {
        expect(() =>
            mountWithConfig(`<input x-model="a" :value="a@value"/>`, {
                a: cfg("", { value: "x" }),
            }),
        ).toThrow();
    });
});

// ── .invert 修饰符 × @ 配置绑定（ADR-0025）────────────────────────────────

describe("x-bind .invert + @ 配置绑定", () => {
    test(':disabled.invert="path@enable"：schema.enable 反向映射 disabled', async () => {
        const { root, configManager } = mountWithConfig(
            `<input :disabled.invert="order.price@enable"/>`,
            { order: { price: cfg(1, { enable: false }) } },
            { configKey: "app" },
        );
        const input = root.querySelector("input")!;
        expect(input.disabled).toBe(true); // enable=false → !false=true → 禁用
        (configManager.state as any)["app.order.price"].enable = true;
        await nextTick();
        expect(input.disabled).toBe(false); // enable=true → 可用
        (configManager.state as any)["app.order.price"].enable = false;
        await nextTick();
        expect(input.disabled).toBe(true); // 响应式切回
    });
});

describe("x-model 元数据注入：enable 联动复用 .invert（ADR-0025 修订 ADR-0020 决策 7）", () => {
    test("schema.enable 静态布尔 → 自动注入 disabled（取反）", () => {
        const { root } = mountWithConfig(`<input x-model="user.name"/>`, {
            user: { name: cfg("zhang", { enable: false, placeholder: "输入" }) },
        });
        const input = root.querySelector("input")!;
        expect(input.disabled).toBe(true); // enable=false → 禁用
        expect(input.getAttribute("placeholder")).toBe("输入"); // 直传属性不受影响
    });

    test("schema.enable 翻转 → disabled 响应式切换（不再依赖专用注入器）", async () => {
        const { root, configManager } = mountWithConfig(
            `<input x-model="user.name"/>`,
            { user: { name: cfg("zhang", { enable: true }) } },
            { configKey: "app" },
        );
        const input = root.querySelector("input")!;
        expect(input.disabled).toBe(false); // enable=true → 可用
        (configManager.state as any)["app.user.name"].enable = false;
        await nextTick();
        expect(input.disabled).toBe(true); // 翻转联动
    });

    test("显式 :disabled 优先抑制合成（含 .invert 形态）", async () => {
        const { root, store } = mountWithConfig(
            `<input x-model="user.name" :disabled="locked"/>`,
            { user: { name: cfg("zhang", { enable: false }) }, locked: true },
        );
        const input = root.querySelector("input")!;
        expect(input.disabled).toBe(true); // 显式绑定生效
        store.state.locked = false;
        await nextTick();
        expect(input.disabled).toBe(false); // 显式绑定驱动，schema.enable=false 被抑制
    });
});

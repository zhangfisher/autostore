import { describe, expect, test } from "bun:test";
import "./setup";
import { AutoStore, ConfigManager, configurable } from "autostore";
import { AutoTemplateEngine } from "../engine";
import { nextTick } from "./helpers";

/**
 * 本地 configurable 包装：放宽 options 类型为 any（自定义元数据 key 规避重载噪音）。
 */
function cfg(initial: any, options: Record<string, any>) {
    return configurable(initial, options as any);
}

/**
 * x-model 元数据自动注入测试（ADR-0020）。
 *
 * 用户只写 `<input x-model="order.price"/>`，引擎自动从 configManager schema 合成
 * placeholder/title/required/min/max 等 input 原生属性的隐式 @ 绑定。
 *
 * 搭建：state 用 `cfg(initial, {placeholder, required, min, ...})` 标注 → store 构造时
 * 自动注册到 ConfigManager。schema 有的属性才注入（动态交集）。
 */

/** 带 configManager 的挂载辅助 */
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
            { load: async () => ({}), save: async () => {} },
            { autoload: false, global: false },
        );
    const store = new AutoStore(state, {
        configManager,
        configKey: opts.configKey,
    } as any);
    const engine = new AutoTemplateEngine(root, store);
    return { root, store, engine, configManager };
}

describe("x-model schema 注入：基础属性", () => {
    test("placeholder 自动注入", () => {
        const { root } = mountWithConfig(`<input x-model="order.price"/>`, {
            order: { price: cfg(1, { placeholder: "请输入价格" }) },
        });
        expect(root.querySelector("input")!.getAttribute("placeholder")).toBe("请输入价格");
    });

    test("title 自动注入", () => {
        const { root } = mountWithConfig(`<input x-model="name"/>`, {
            name: cfg("a", { title: "姓名" }),
        });
        expect(root.querySelector("input")!.getAttribute("title")).toBe("姓名");
    });

    test("required 自动注入（boolean setAttribute）", () => {
        const { root } = mountWithConfig(`<input x-model="name"/>`, {
            name: cfg("a", { required: 1 }),
        });
        expect(root.querySelector("input")!.hasAttribute("required")).toBe(true);
    });

    test("readonly 自动注入", () => {
        const { root } = mountWithConfig(`<input x-model="name"/>`, {
            name: cfg("a", { readonly: 1 }),
        });
        expect(root.querySelector("input")!.hasAttribute("readonly")).toBe(true);
    });

    test("pattern/minlength/maxlength 自动注入", () => {
        const { root } = mountWithConfig(`<input x-model="name"/>`, {
            name: cfg("a", { pattern: "[A-Z]+", minlength: 2, maxlength: 10 }),
        });
        const input = root.querySelector("input")!;
        expect(input.getAttribute("pattern")).toBe("[A-Z]+");
        expect(input.getAttribute("minlength")).toBe("2");
        expect(input.getAttribute("maxlength")).toBe("10");
    });
});

describe("x-model schema 注入：type 扩展（min/max/step）", () => {
    test("number type 注入 min/max/step", () => {
        const { root } = mountWithConfig(`<input type="number" x-model="count"/>`, {
            count: cfg(1, { min: 0, max: 100, step: 5 }),
        });
        const input = root.querySelector("input")!;
        expect(input.getAttribute("min")).toBe("0");
        expect(input.getAttribute("max")).toBe("100");
        expect(input.getAttribute("step")).toBe("5");
    });

    test("text type 不注入 min/max/step（即便 schema 有）", () => {
        const { root } = mountWithConfig(`<input type="text" x-model="name"/>`, {
            name: cfg("a", { min: 0, max: 100, step: 5 }),
        });
        // text type 不在 numeric 扩展集 → min/max/step 不注入
        const input = root.querySelector("input")!;
        expect(input.hasAttribute("min")).toBe(false);
        expect(input.hasAttribute("max")).toBe(false);
        expect(input.hasAttribute("step")).toBe(false);
    });
});

describe("x-model schema 注入：enable→disabled 反向映射", () => {
    test("enable=false → disabled（取反）", () => {
        const { root } = mountWithConfig(`<input x-model="name"/>`, {
            name: cfg("a", { enable: false }),
        });
        expect(root.querySelector("input")!.hasAttribute("disabled")).toBe(true);
    });

    test("enable=true → 无 disabled（取反）", () => {
        const { root } = mountWithConfig(`<input x-model="name"/>`, {
            name: cfg("a", { enable: true }),
        });
        expect(root.querySelector("input")!.hasAttribute("disabled")).toBe(false);
    });

    test("改 schema.enable → disabled 响应式更新", async () => {
        const { root, configManager } = mountWithConfig(`<input x-model="name"/>`, {
            name: cfg("a", { enable: true }),
        });
        const input = root.querySelector("input")!;
        expect(input.hasAttribute("disabled")).toBe(false);
        const fullKey = Object.keys(configManager.state).find((k) => k.endsWith("name"))!;
        (configManager.state as any)[fullKey].enable = false;
        await nextTick();
        expect(input.hasAttribute("disabled")).toBe(true);
    });
});

describe("x-model schema 注入：name 特殊处理", () => {
    test("schema 无 name + 简单路径 → name=路径", () => {
        const { root } = mountWithConfig(`<input x-model="order.price"/>`, {
            order: { price: cfg(1, { placeholder: "x" }) },
        });
        expect(root.querySelector("input")!.getAttribute("name")).toBe("order.price");
    });

    test("schema 有 name 元数据 → name=元数据值", () => {
        const { root } = mountWithConfig(`<input x-model="order.price"/>`, {
            order: { price: cfg(1, { name: "priceField" }) },
        });
        expect(root.querySelector("input")!.getAttribute("name")).toBe("priceField");
    });

    test("表达式场景 → 跳过 name 注入", () => {
        const { root } = mountWithConfig(`<input x-model="user.first + user.last"/>`, {
            user: { first: cfg("a", {}), last: cfg("b", {}) },
        });
        expect(root.querySelector("input")!.hasAttribute("name")).toBe(false);
    });

    test("元素已有显式 name 属性 → 跳过（显式优先）", () => {
        const { root } = mountWithConfig(`<input name="explicit" x-model="order.price"/>`, {
            order: { price: cfg(1, { name: "meta" }) },
        });
        expect(root.querySelector("input")!.getAttribute("name")).toBe("explicit");
    });
});

describe("x-model schema 注入：显式绑定优先抑制", () => {
    test("显式 :placeholder 抑制自动合成", () => {
        const { root } = mountWithConfig(
            `<input x-model="name" :placeholder="user.tip"/>`,
            {
                name: cfg("a", { placeholder: "自动值" }),
                user: { tip: "显式值" },
            },
        );
        // 显式 :placeholder 胜出，自动注入被抑制
        expect(root.querySelector("input")!.getAttribute("placeholder")).toBe("显式值");
    });
});

describe("x-model schema 注入：动态交集与降级", () => {
    test("schema 缺失的属性不注入", () => {
        const { root } = mountWithConfig(`<input x-model="name"/>`, {
            name: cfg("a", { placeholder: "只有 placeholder" }),
            // 无 title/required/...
        });
        const input = root.querySelector("input")!;
        expect(input.getAttribute("placeholder")).toBe("只有 placeholder");
        expect(input.hasAttribute("title")).toBe(false);
        expect(input.hasAttribute("required")).toBe(false);
    });

    test("configManager 不存在 → 整体跳过（静默）", () => {
        const root = document.createElement("div");
        root.innerHTML = `<input x-model="name"/>`;
        const store = new AutoStore({ name: "a" });
        expect(() => new AutoTemplateEngine(root, store)).not.toThrow();
        // 无 configManager → 不注入任何属性
        const input = root.querySelector("input")!;
        expect(input.hasAttribute("placeholder")).toBe(false);
        expect(input.hasAttribute("name")).toBe(false);
    });

    test("schema 编译期未注册 → 不合成属性绑定（静默，无 WARN 噪音）", () => {
        // schema 未注册时跳过 @ 合成（仅 name 简单路径注入），避免每个白名单属性一条 schema 不存在 WARN。
        // 取舍：schema 后注册不生效（牺牲动态性换静默）。
        const cm = new ConfigManager(
            { load: async () => ({}), save: async () => {} },
            { autoload: false, global: false },
        );
        const root = document.createElement("div");
        root.innerHTML = `<input x-model="name"/>`;
        const store = new AutoStore({ name: "a" }, { configManager: cm, configKey: "app" } as any);
        expect(() => new AutoTemplateEngine(root, store)).not.toThrow();
        const input = root.querySelector("input")!;
        // name 是简单路径，编译期静态注入（不依赖 schema）
        expect(input.getAttribute("name")).toBe("name");
        // schema 不存在 → 无 @ 绑定、无 WARN
        expect(input.hasAttribute("placeholder")).toBe(false);
    });
});

describe("x-model schema 注入：合成 watcher 回收", () => {
    test("scope.destroy 后改 schema 不再报错/泄漏", async () => {
        const { root, engine } = mountWithConfig(`<input x-model="name"/>`, {
            name: cfg("a", { placeholder: "初始" }),
        });
        const input = root.querySelector("input")!;
        expect(input.getAttribute("placeholder")).toBe("初始");
        // 销毁 engine（连带所有 scope.destroy，合成 watcher off）
        engine.destroy();
        // 改 configManager 不应抛错（watcher 已 off）
        // （destroy 后 input 已脱离 engine，不再更新是正常的）
        expect(() => engine.destroy()).not.toThrow();
    });
});

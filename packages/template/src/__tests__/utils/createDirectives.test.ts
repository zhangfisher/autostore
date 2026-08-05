import { describe, expect, test } from "bun:test";
import { AutoStore } from "autostore";
import { AutoTemplateScope } from "../../scope";
import { createDirectives } from "../../directives/utils/createDirectives";
import { AutoTemplateDirectiveBase } from "../../directives/base";
import type { AutoDirectiveInfo } from "../../directives/types";
import { AutoTemplateEngine } from "../../engine";

/**
 * 测试用指令类
 *
 * priority/singleton 经静态字段声明（createDirectives 实例化前据此排序/去重）。
 * 指令名通过 `engine.directives.set(name, Cls)` 注册，不依赖 static name。
 */
class HighPrioSingleton extends AutoTemplateDirectiveBase {
    static override readonly priority = 100;
}
class LowPrioSingleton extends AutoTemplateDirectiveBase {
    static override readonly priority = 10;
}
class MultiInstance extends AutoTemplateDirectiveBase {
    static override readonly priority = 50;
    static override readonly singleton = false;
}
class SamePrioA extends AutoTemplateDirectiveBase {
    static override readonly priority = 30;
}
class SamePrioB extends AutoTemplateDirectiveBase {
    static override readonly priority = 30;
}

/** 构造最小可用 engine（不自动编译），并注册测试指令类 */
function makeEngine(): AutoTemplateEngine<any> {
    const store = new AutoStore({ count: 0 });
    const engine = new AutoTemplateEngine(document.createElement("div"), store, {
        autostart: false,
    });
    engine.directives.set("high", HighPrioSingleton);
    engine.directives.set("low", LowPrioSingleton);
    engine.directives.set("multi", MultiInstance);
    engine.directives.set("spa", SamePrioA);
    engine.directives.set("spb", SamePrioB);
    return engine;
}

function makeBinding(engine: AutoTemplateEngine<any>): AutoTemplateScope {
    return new AutoTemplateScope(
        engine,
        document.createElement("div"),
        document.createElement("div"),
    );
}

/** 包装 createDirectives，自动注入测试用 binding */
function buildDirectives(
    engine: AutoTemplateEngine<any>,
    infos: AutoDirectiveInfo[],
): AutoTemplateDirectiveBase[] {
    return createDirectives(engine, infos, makeBinding(engine));
}

describe("createDirectives - 未注册指令", () => {
    test("未注册指令被静默跳过，不抛错", () => {
        const result = buildDirectives(makeEngine(), [
            { name: "unknown" },
            { name: "high", value: "a" },
        ]);
        expect(result).toHaveLength(1);
        expect(result[0]).toBeInstanceOf(HighPrioSingleton);
    });

    test("全部未注册时返回空数组", () => {
        expect(buildDirectives(makeEngine(), [{ name: "x" }, { name: "y" }])).toEqual([]);
    });
});

describe("createDirectives - 单例去重", () => {
    test("单例同名指令只保留最后声明的", () => {
        const result = buildDirectives(makeEngine(), [
            { name: "high", value: "1" },
            { name: "high", value: "2" },
            { name: "high", value: "3" },
        ]);
        expect(result).toHaveLength(1);
        expect(result[0]!.value).toBe("3");
    });
});

describe("createDirectives - 非单例", () => {
    test("非单例同名指令全部保留，且保持声明顺序", () => {
        const result = buildDirectives(makeEngine(), [
            { name: "multi", value: "1" },
            { name: "multi", value: "2" },
        ]);
        expect(result).toHaveLength(2);
        expect(result[0]!.value).toBe("1");
        expect(result[1]!.value).toBe("2");
    });
});

describe("createDirectives - 优先级排序", () => {
    test("按 priority 降序排列（大的在前）", () => {
        const result = buildDirectives(makeEngine(), [{ name: "low" }, { name: "high" }]);
        expect(result[0]).toBeInstanceOf(HighPrioSingleton);
        expect(result[1]).toBeInstanceOf(LowPrioSingleton);
    });

    test("priority 相同时保持声明顺序（稳定排序）", () => {
        const result = buildDirectives(makeEngine(), [{ name: "spa" }, { name: "spb" }]);
        expect(result[0]).toBeInstanceOf(SamePrioA);
        expect(result[1]).toBeInstanceOf(SamePrioB);
    });
});

describe("createDirectives - 实例字段注入", () => {
    test("DirectiveInfo 完整注入实例（value/attr/modifiers/options/info）", () => {
        const info: AutoDirectiveInfo = {
            name: "high",
            value: "user.name",
            attr: "title",
            modifiers: ["once", "debounce"],
            options: { delay: 100 },
        };
        const result = buildDirectives(makeEngine(), [info]);
        expect(result).toHaveLength(1);
        const inst = result[0]!;
        expect(inst.value).toBe("user.name");
        expect(inst.attr).toBe("title");
        expect(inst.modifiers).toEqual(["once", "debounce"]);
        expect(inst.options).toEqual({ delay: 100 });
        expect(inst.info).toEqual(info);
    });

    test("可选字段缺失时正常实例化", () => {
        const inst = buildDirectives(makeEngine(), [{ name: "high" }])[0]!;
        expect(inst.value).toBeUndefined();
        expect(inst.attr).toBeUndefined();
        expect(inst.modifiers).toBeUndefined();
        expect(inst.options).toBeUndefined();
    });
});

describe("createDirectives - 综合场景", () => {
    test("混合：单例去重 + 非单例多实例 + 优先级排序", () => {
        const result = buildDirectives(makeEngine(), [
            { name: "multi", value: "m1" },
            { name: "high", value: "h1" },
            { name: "low", value: "l1" },
            { name: "high", value: "h2" },
            { name: "multi", value: "m2" },
        ]);
        expect(result.map((d) => d.value)).toEqual(["h2", "m1", "m2", "l1"]);
    });
});

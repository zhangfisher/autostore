import { describe, expect, test } from "bun:test";
import { AutoStore } from "autostore";
import { AutoTemplateBinding } from "../binding";
import { createDirectives } from "../directives/utils/createDirectives";
import { TemplateDirectiveBase } from "../directives/base";
import type { DirectiveInfo } from "../directives/types";
import { AutoTemplateEngine } from "../engine";

/**
 * 测试用指令类
 *
 * 通过 static name/priority/singleton 显式声明行为，避免依赖 preset 注册的完整性
 * （当前多数 preset 未定义 static name，无法真实注册）。
 */
class HighPrioSingleton extends TemplateDirectiveBase {
    static override name = "high";
    static override priority = 100;
    // singleton 继承默认值 true
}
class LowPrioSingleton extends TemplateDirectiveBase {
    static override name = "low";
    static override priority = 10;
}
class MultiInstance extends TemplateDirectiveBase {
    static override name = "multi";
    static override priority = 50;
    static override singleton = false;
}
class SamePrioA extends TemplateDirectiveBase {
    static override name = "spa";
    static override priority = 30;
}
class SamePrioB extends TemplateDirectiveBase {
    static override name = "spb";
    static override priority = 30;
}

/** 构造最小可用 engine，并注册测试指令类 */
function makeEngine(): AutoTemplateEngine {
    const store = new AutoStore({ count: 0 });
    const engine = new AutoTemplateEngine(document.createElement("div"), store);
    engine.directives.set("high", HighPrioSingleton);
    engine.directives.set("low", LowPrioSingleton);
    engine.directives.set("multi", MultiInstance);
    engine.directives.set("spa", SamePrioA);
    engine.directives.set("spb", SamePrioB);
    return engine;
}

function makeBinding(): AutoTemplateBinding {
    return new AutoTemplateBinding(document.createElement("div"), document.createElement("div"));
}

/** 包装独立函数 createDirectives，自动注入测试用 binding，简化用例 */
function buildDirectives(
    engine: AutoTemplateEngine,
    infos: DirectiveInfo[],
): TemplateDirectiveBase[] {
    return createDirectives(engine, infos, makeBinding());
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
        // 声明顺序 low(10) -> high(100)，期望结果 high 在前
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
        const info: DirectiveInfo = {
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
            { name: "multi", value: "m1" }, // prio 50
            { name: "high", value: "h1" }, // prio 100, singleton
            { name: "low", value: "l1" }, // prio 10
            { name: "high", value: "h2" }, // 覆盖 h1
            { name: "multi", value: "m2" }, // prio 50
        ]);
        // 解析后：multi:m1, high:h2, low:l1, multi:m2
        // 排序（priority 降序）：high(100) -> multi:m1(50) -> multi:m2(50) -> low(10)
        // 两个 multi priority 相同，保持声明顺序 m1 在 m2 前
        expect(result.map((d) => d.value)).toEqual(["h2", "m1", "m2", "l1"]);
    });
});

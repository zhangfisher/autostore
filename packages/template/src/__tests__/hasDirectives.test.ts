import { describe, expect, test } from "bun:test";
import { hasDirectives } from "../directives/utils/hasDirectives";

/**
 * 构造一个带指定属性的 div 元素。
 *
 * 属性按对象键的插入顺序设置，setAttribute 同样按调用顺序写入 attributes。
 */
function elWith(attrs: Record<string, string>): HTMLElement {
    const el = document.createElement("div");
    for (const [name, value] of Object.entries(attrs)) {
        el.setAttribute(name, value);
    }
    return el;
}

describe("hasDirectives - 长前缀指令", () => {
    test("x-if 指令返回 true", () => {
        expect(hasDirectives(elWith({ "x-if": "xxx" }))).toBe(true);
    });

    test("无值指令 x-calk 返回 true", () => {
        expect(hasDirectives(elWith({ "x-calk": "" }))).toBe(true);
    });

    test("带修饰符的 x-if.once.y 返回 true", () => {
        expect(hasDirectives(elWith({ "x-if.once.y": "xxx" }))).toBe(true);
    });

    test("带属性参数的 x-bind:title 返回 true", () => {
        expect(hasDirectives(elWith({ "x-bind:title": "x" }))).toBe(true);
    });

    test("options 补充参数 x-if-options 返回 true", () => {
        expect(hasDirectives(elWith({ "x-if-options": "{a:1}" }))).toBe(true);
    });
});

describe("hasDirectives - @ 事件快捷前缀", () => {
    test("@click 返回 true", () => {
        expect(hasDirectives(elWith({ "@click": "fn" }))).toBe(true);
    });

    test("带修饰符的 @click.debounce 返回 true", () => {
        expect(hasDirectives(elWith({ "@click.debounce": "fn" }))).toBe(true);
    });
});

describe("hasDirectives - : 属性绑定快捷前缀", () => {
    test(":title 返回 true", () => {
        expect(hasDirectives(elWith({ ":title": "x" }))).toBe(true);
    });

    test("含连字符的 :data-id 返回 true", () => {
        expect(hasDirectives(elWith({ ":data-id": "x" }))).toBe(true);
    });
});

describe("hasDirectives - 普通 HTML 属性", () => {
    test("普通属性 class/id/style/data-* 返回 false", () => {
        expect(
            hasDirectives(
                elWith({ class: "box", id: "app", style: "color:red", "data-x": "1" }),
            ),
        ).toBe(false);
    });

    test("无任何属性返回 false", () => {
        expect(hasDirectives(document.createElement("div"))).toBe(false);
    });
});

describe("hasDirectives - 混合场景", () => {
    test("指令与普通属性混合时返回 true", () => {
        const el = elWith({ class: "box", "x-if": "a", id: "app" });
        expect(hasDirectives(el)).toBe(true);
    });

    test("首个属性即指令时短路返回 true", () => {
        const el = elWith({ "x-if": "a", class: "box", id: "app" });
        expect(hasDirectives(el)).toBe(true);
    });
});

describe("hasDirectives - 自定义 prefix", () => {
    test("自定义 prefix 识别 data-x- 开头指令", () => {
        expect(hasDirectives(elWith({ "data-x-if": "a" }), "data-x-")).toBe(true);
    });

    test("自定义 prefix 后 x- 前缀视为普通属性返回 false", () => {
        expect(hasDirectives(elWith({ "x-if": "a" }), "data-x-")).toBe(false);
    });

    test("prefix 不影响 @ 与 : 快捷前缀的识别", () => {
        expect(hasDirectives(elWith({ "@click": "fn", ":title": "x" }), "data-x-")).toBe(true);
    });
});

describe("hasDirectives - 边界", () => {
    test("传入文本节点（非 HTMLElement）返回 false 不报错", () => {
        const text = document.createTextNode("hello");
        // 类型上以 HTMLElement 约束，这里用 as 绕过仅为边界测试；
        // 运行时靠 instanceof 保护直接返回 false，不访问 attributes
        expect(hasDirectives(text as unknown as HTMLElement)).toBe(false);
    });
});

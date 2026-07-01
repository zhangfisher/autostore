import { describe, expect, test } from "bun:test";
import { removeDirectives } from "../directives/utils/removeDirectives";

/**
 * 构造一个带指定属性的 div 元素。
 *
 * 属性按对象键的插入顺序设置，setAttribute 同样按调用顺序写入 attributes，
 * 因此可以稳定验证属性集合的变化。
 */
function elWith(attrs: Record<string, string>): HTMLElement {
    const el = document.createElement("div");
    for (const [name, value] of Object.entries(attrs)) {
        el.setAttribute(name, value);
    }
    return el;
}

/** 返回元素当前的属性名数组（按声明顺序），便于断言剩余属性 */
function attrNamesOf(el: HTMLElement): string[] {
    const names: string[] = [];
    const attributes = el.attributes;
    for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        if (attr) names.push(attr.name);
    }
    return names;
}

describe("removeDirectives - 长前缀指令", () => {
    test("删除带值的普通指令 x-if", () => {
        const el = elWith({ "x-if": "xxx" });
        removeDirectives(el);
        expect(attrNamesOf(el)).toEqual([]);
    });

    test("删除无值指令 x-calk", () => {
        const el = elWith({ "x-calk": "" });
        removeDirectives(el);
        expect(attrNamesOf(el)).toEqual([]);
    });

    test("删除带修饰符的指令 x-if.once.y", () => {
        const el = elWith({ "x-if.once.y": "xxx" });
        removeDirectives(el);
        expect(el.hasAttribute("x-if.once.y")).toBe(false);
    });

    test("删除带属性参数的指令 x-bind:title 与 x-event:click", () => {
        const el = elWith({ "x-bind:title": "x", "x-event:click": "y" });
        removeDirectives(el);
        expect(attrNamesOf(el)).toEqual([]);
    });

    test("删除 options 补充参数 x-if-options 及其主指令", () => {
        const el = elWith({ "x-if": "a", "x-if-options": "{a:1}" });
        removeDirectives(el);
        expect(attrNamesOf(el)).toEqual([]);
    });
});

describe("removeDirectives - @ 事件快捷前缀", () => {
    test("删除 @click", () => {
        const el = elWith({ "@click": "fn" });
        removeDirectives(el);
        expect(attrNamesOf(el)).toEqual([]);
    });

    test("删除带修饰符的 @click.debounce", () => {
        const el = elWith({ "@click.debounce": "fn" });
        removeDirectives(el);
        expect(el.hasAttribute("@click.debounce")).toBe(false);
    });
});

describe("removeDirectives - : 属性绑定快捷前缀", () => {
    test("删除 :title", () => {
        const el = elWith({ ":title": "x" });
        removeDirectives(el);
        expect(attrNamesOf(el)).toEqual([]);
    });

    test("删除含连字符的 :data-id", () => {
        const el = elWith({ ":data-id": "x" });
        removeDirectives(el);
        expect(el.hasAttribute(":data-id")).toBe(false);
    });
});

describe("removeDirectives - 保留普通 HTML 属性", () => {
    test("普通属性 class/id/style/data-* 保留", () => {
        const el = elWith({ class: "box", id: "app", style: "color:red", "data-x": "1" });
        removeDirectives(el);
        expect(attrNamesOf(el)).toEqual(["class", "id", "style", "data-x"]);
    });

    test("混合场景：删除指令、保留普通属性", () => {
        const el = elWith({
            class: "box",
            "x-if": "a",
            id: "app",
            "@click": "fn",
            ":title": "t",
            "x-text": "b",
        });
        removeDirectives(el);
        expect(attrNamesOf(el)).toEqual(["class", "id"]);
    });

    test("所有属性都是指令时全部删除", () => {
        const el = elWith({ "x-if": "a", "@click": "b", ":title": "c" });
        removeDirectives(el);
        expect(el.attributes.length).toBe(0);
    });

    test("无指令属性时不删除任何属性", () => {
        const el = elWith({ class: "box", id: "app" });
        removeDirectives(el);
        expect(attrNamesOf(el)).toEqual(["class", "id"]);
    });

    test("无任何属性时正常返回", () => {
        const el = document.createElement("div");
        removeDirectives(el);
        expect(el.attributes.length).toBe(0);
    });
});

describe("removeDirectives - 自定义 prefix", () => {
    test("自定义 prefix 删除 data-x- 开头的指令", () => {
        const el = elWith({ "data-x-if": "a", "data-x-text": "b" });
        removeDirectives(el, "data-x-");
        expect(attrNamesOf(el)).toEqual([]);
    });

    test("自定义 prefix 后 x- 前缀属性视为普通属性保留", () => {
        const el = elWith({ "x-if": "a", "data-x-if": "b" });
        removeDirectives(el, "data-x-");
        expect(attrNamesOf(el)).toEqual(["x-if"]);
    });

    test("prefix 不影响 @ 与 : 快捷前缀的删除", () => {
        const el = elWith({ "@click": "fn", ":title": "x", "data-x-if": "b" });
        removeDirectives(el, "data-x-");
        expect(attrNamesOf(el)).toEqual([]);
    });
});

describe("removeDirectives - 边界", () => {
    test("传入文本节点（非 HTMLElement）不做处理也不报错", () => {
        const text = document.createTextNode("hello");
        // 类型上以 HTMLElement 约束，这里用 as 绕过仅为边界测试；
        // 运行时靠 instanceof 保护直接返回，不访问 attributes
        expect(() => removeDirectives(text as unknown as HTMLElement)).not.toThrow();
    });
});

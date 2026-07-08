import { describe, expect, test } from "bun:test";
import { getDirectives } from "../directives/utils/getDirectives";
import type { KylinDirectiveInfo } from "../directives/types";

/**
 * 构造一个带指定属性的 div 元素。
 *
 * 属性按对象键的插入顺序设置，setAttribute 同样按调用顺序写入 attributes，
 * 因此可以稳定验证"按声明顺序返回"这一行为。
 */
function elWith(attrs: Record<string, string>): HTMLElement {
    const el = document.createElement("div");
    for (const [name, value] of Object.entries(attrs)) {
        el.setAttribute(name, value);
    }
    return el;
}

/** 解析单个元素的全部指令，便于只关心唯一结果的用例 */
function parseOne(attrs: Record<string, string>, prefix?: string): KylinDirectiveInfo {
    const list = getDirectives(elWith(attrs), prefix);
    expect(list).toHaveLength(1);
    return list[0]!;
}

describe("findDirectives - 普通长前缀指令", () => {
    test('x-if="xxx" 解析为带值的普通指令', () => {
        expect(parseOne({ "x-if": "xxx" })).toEqual({ name: "if", value: "xxx" });
    });

    test("x-calk 无值指令不输出 value 字段", () => {
        expect(parseOne({ "x-calk": "" })).toEqual({ name: "calk" });
    });

    test('x-if.once.y="xxx" 解析出多个修饰符', () => {
        expect(parseOne({ "x-if.once.y": "xxx" })).toEqual({
            name: "if",
            value: "xxx",
            modifiers: ["once", "y"],
        });
    });

    test('x-bind:title="xxx" 解析出 bind 指令与属性参数', () => {
        expect(parseOne({ "x-bind:title": "xxx" })).toEqual({
            name: "bind",
            attr: "title",
            value: "xxx",
        });
    });

    test("x-bind:title.once 同时携带属性参数与修饰符", () => {
        expect(parseOne({ "x-bind:title.once": "xxx" })).toEqual({
            name: "bind",
            attr: "title",
            value: "xxx",
            modifiers: ["once"],
        });
    });

    test('x-event:click="xxx" 解析为 event 指令，事件名放入 attr', () => {
        expect(parseOne({ "x-event:click": "xxx" })).toEqual({
            name: "event",
            attr: "click",
            value: "xxx",
        });
    });
});

describe("findDirectives - @ 事件快捷前缀", () => {
    test('@click="fn" 解析为 event 指令并输出事件名 attr', () => {
        expect(parseOne({ "@click": "fn" })).toEqual({
            name: "event",
            attr: "click",
            value: "fn",
        });
    });

    test('@click.debounce="fn" 修饰符放入 modifiers，name 仍为 event', () => {
        expect(parseOne({ "@click.debounce": "fn" })).toEqual({
            name: "event",
            attr: "click",
            value: "fn",
            modifiers: ["debounce"],
        });
    });

    test("@keydown.a.b 支持多个修饰符", () => {
        expect(parseOne({ "@keydown.a.b": "onKey" })).toEqual({
            name: "event",
            attr: "keydown",
            value: "onKey",
            modifiers: ["a", "b"],
        });
    });

    test("@click 无值时仍输出 attr，但不输出 value", () => {
        expect(parseOne({ "@click": "" })).toEqual({ name: "event", attr: "click" });
    });
});

describe("findDirectives - : 属性绑定快捷前缀", () => {
    test(':title="x" 等价于 x-bind:title', () => {
        expect(parseOne({ ":title": "x" })).toEqual({
            name: "bind",
            attr: "title",
            value: "x",
        });
    });

    test(":title.once 快捷方式同样支持修饰符", () => {
        expect(parseOne({ ":title.once": "x" })).toEqual({
            name: "bind",
            attr: "title",
            value: "x",
            modifiers: ["once"],
        });
    });

    test(':data-id="x" 支持含连字符的属性名', () => {
        expect(parseOne({ ":data-id": "x" })).toEqual({
            name: "bind",
            attr: "data-id",
            value: "x",
        });
    });
});

describe("findDirectives - options 补充参数", () => {
    test("x-if-options 的值合并到同名主指令的 options 字段", () => {
        expect(parseOne({ "x-if": "xxx", "x-if-options": "{a:1}" })).toEqual({
            name: "if",
            value: "xxx",
            options: { a: 1 },
        });
    });

    test("options 值支持无引号键、嵌套对象与引号字符串（relaxed-json）", () => {
        expect(
            parseOne({
                "x-for": "items",
                "x-for-options": "{ key:item, index:i, conf:{ delay:100 } }",
            }),
        ).toEqual({
            name: "for",
            value: "items",
            options: { key: "item", index: "i", conf: { delay: 100 } },
        });
    });

    test("options 合并到同名主指令，且自身不单独占位（顺序保持）", () => {
        const list = getDirectives(elWith({ "x-if": "a", "x-if-options": "{a:1}", "x-text": "b" }));
        expect(list).toEqual([
            { name: "if", value: "a", options: { a: 1 } },
            { name: "text", value: "b" },
        ]);
    });

    test("options 声明在主指令之前也能正确合并", () => {
        const list = getDirectives(elWith({ "x-if-options": "{a:1}", "x-if": "a" }));
        expect(list).toEqual([{ name: "if", value: "a", options: { a: 1 } }]);
    });

    test("找不到同名主指令时 options 被忽略", () => {
        expect(getDirectives(elWith({ "x-if-options": "{a:1}" }))).toEqual([]);
    });

    test("options 值不是对象字符串时抛出错误", () => {
        expect(() => getDirectives(elWith({ "x-if": "a", "x-if-options": "hello" }))).toThrow();
    });

    test("options 值为空字符串时抛出错误", () => {
        expect(() => getDirectives(elWith({ "x-if": "a", "x-if-options": "" }))).toThrow();
    });
});

describe("findDirectives - 顺序与忽略规则", () => {
    test("多个指令按声明顺序返回", () => {
        const list = getDirectives(
            elWith({ "x-if": "a", "@click": "b", ":title": "c", "x-text": "d" }),
        );
        expect(list).toEqual([
            { name: "if", value: "a" },
            { name: "event", attr: "click", value: "b" },
            { name: "bind", attr: "title", value: "c" },
            { name: "text", value: "d" },
        ]);
    });

    test("非指令的普通 HTML 属性被忽略", () => {
        expect(getDirectives(elWith({ class: "box", id: "app", "x-text": "a" }))).toEqual([
            { name: "text", value: "a" },
        ]);
    });

    test("没有任何指令属性时返回空数组", () => {
        expect(getDirectives(elWith({ class: "box" }))).toEqual([]);
    });

    test("没有任何属性时返回空数组", () => {
        expect(getDirectives(document.createElement("div"))).toEqual([]);
    });
});

describe("findDirectives - 自定义 prefix", () => {
    test("自定义 prefix 识别 data-x- 开头的指令", () => {
        expect(parseOne({ "data-x-if": "a" }, "data-x-")).toEqual({ name: "if", value: "a" });
    });

    test("自定义 prefix 后原 x- 前缀不再被识别为指令", () => {
        const list = getDirectives(elWith({ "x-if": "a", "data-x-if": "b" }), "data-x-");
        expect(list).toEqual([{ name: "if", value: "b" }]);
    });

    test("prefix 不影响 @ 与 : 快捷前缀的识别", () => {
        const list = getDirectives(elWith({ "@click": "fn", ":title": "x" }), "data-x-");
        expect(list).toEqual([
            { name: "event", attr: "click", value: "fn" },
            { name: "bind", attr: "title", value: "x" },
        ]);
    });
});

import { describe, expect, test } from "bun:test";
import { getDirectives, getHostOptions } from "../../directives/utils/getDirectives";
import type { AutoDirectiveInfo } from "../../directives/types";
import "../setup";
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
function parseOne(attrs: Record<string, string>, prefix?: string): AutoDirectiveInfo {
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
            options: { once: true, y: true },
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
            options: { once: true },
        });
    });

    test('x-event:click="xxx" 过时写法仍解析为 event（未注册→静默失效）', () => {
        expect(parseOne({ "x-event:click": "xxx" })).toEqual({
            name: "event",
            attr: "click",
            value: "xxx",
        });
    });
});

describe("findDirectives - x-show 别名归一化（≡ x-if.keep）", () => {
    test('x-show="a" 归一为 x-if + keep 修饰符', () => {
        expect(parseOne({ "x-show": "a" })).toEqual({
            name: "if",
            value: "a",
            modifiers: ["keep"],
            options: { keep: true },
        });
    });

    test("x-show 无值时仍归一为 if + keep（不输出 value）", () => {
        expect(parseOne({ "x-show": "" })).toEqual({
            name: "if",
            modifiers: ["keep"],
            options: { keep: true },
        });
    });
});

describe("findDirectives - x-class/x-style 别名归一化（≡ x-bind）", () => {
    test('x-class="a" 归一为 bind + class', () => {
        expect(parseOne({ "x-class": "a" })).toEqual({ name: "bind", attr: "class", value: "a" });
    });

    test('x-style="a" 归一为 bind + style', () => {
        expect(parseOne({ "x-style": "a" })).toEqual({ name: "bind", attr: "style", value: "a" });
    });

    test("x-class 与 :class 解析结果完全一致", () => {
        expect(parseOne({ "x-class": "a" })).toEqual(parseOne({ ":class": "a" }));
    });
});

describe("findDirectives - @ 事件快捷前缀", () => {
    test('@click="fn" 解析为 on 指令并输出事件名 attr', () => {
        expect(parseOne({ "@click": "fn" })).toEqual({
            name: "on",
            attr: "click",
            value: "fn",
        });
    });

    test('@click.debounce="fn" 修饰符放入 modifiers，name 仍为 on', () => {
        expect(parseOne({ "@click.debounce": "fn" })).toEqual({
            name: "on",
            attr: "click",
            value: "fn",
            modifiers: ["debounce"],
            options: { debounce: true },
        });
    });

    test("@keydown.a.b 支持多个修饰符", () => {
        expect(parseOne({ "@keydown.a.b": "onKey" })).toEqual({
            name: "on",
            attr: "keydown",
            value: "onKey",
            modifiers: ["a", "b"],
            options: { a: true, b: true },
        });
    });

    test("@click 无值时仍输出 attr，但不输出 value", () => {
        expect(parseOne({ "@click": "" })).toEqual({ name: "on", attr: "click" });
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
            options: { once: true },
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

describe("findDirectives - modifier 注入与宿主选项（ADR-0007）", () => {
    test("modifier 注入为同名指令选项（options[name]=true）", () => {
        // .once.y 经解析期注入：modifiers 保留，options 同步生成
        expect(parseOne({ "x-if.once.y": "a" }).options).toEqual({ once: true, y: true });
    });

    test("显式 x-{name}-options 优先于 modifier 注入（含 false 生效）", () => {
        // .debounce 注入 true，但 x-on-options 显式 500 优先
        const info = parseOne({ "@click.debounce": "fn", "x-on-options": "{debounce:500}" });
        expect(info.options?.debounce).toBe(500);
        // 显式 false 阻断 modifier 注入（hasOwnProperty 判定命中）
        const info2 = parseOne({ "@click.debounce": "fn", "x-on-options": "{debounce:false}" });
        expect(info2.options?.debounce).toBe(false);
    });

    test("纯数字段（已废 .debounce.500）不注入 options", () => {
        const info = parseOne({ "@click.debounce.500": "fn" });
        expect(info.options).toEqual({ debounce: true }); // "500" 不注入
        expect(info.modifiers).toEqual(["debounce", "500"]); // 原始 modifiers 保留
    });

    test("裸 x-options 不作为指令（由 getHostOptions 单独解析）", () => {
        expect(getDirectives(elWith({ "x-options": "{a:1}" }))).toEqual([]);
    });

    test("getHostOptions 解析 x-options 为对象", () => {
        expect(getHostOptions(elWith({ "x-options": "{a:1, b:'x'}" }))).toEqual({ a: 1, b: "x" });
    });

    test("getHostOptions 无 x-options 时返回 undefined", () => {
        expect(getHostOptions(elWith({ "x-if": "a" }))).toBeUndefined();
    });

    test("getHostOptions 值非对象时抛出错误", () => {
        expect(() => getHostOptions(elWith({ "x-options": "hello" }))).toThrow();
    });
});

describe("findDirectives - 顺序与忽略规则", () => {
    test("多个指令按声明顺序返回", () => {
        const list = getDirectives(
            elWith({ "x-if": "a", "@click": "b", ":title": "c", "x-text": "d" }),
        );
        expect(list).toEqual([
            { name: "if", value: "a" },
            { name: "on", attr: "click", value: "b" },
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
            { name: "on", attr: "click", value: "fn" },
            { name: "bind", attr: "title", value: "x" },
        ]);
    });
});

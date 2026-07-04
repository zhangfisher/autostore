import { describe, expect, test } from "bun:test";
import { transformElement } from "../compile/utils/transformElement";
import type { NodeTransformer } from "../compile/utils/transformElement";

/**
 * 从 HTML 字符串创建单个根元素，使输入 DOM 结构一眼可见。
 * 输入与断言均用 HTML 字符串，保持对称、直观。
 */
function createElement(html: string): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html.trim();
    const first = wrapper.firstElementChild;
    if (!first) {
        throw new Error(`无法从 HTML 创建元素: ${html}`);
    }
    return first as HTMLElement;
}

/**
 * 创建一个把 parent 标签名写入 `data-parent` 属性的 mark 元素，
 * 使 parent 语义能通过 outerHTML 直接断言。
 */
function markWithParent(parent: HTMLElement | undefined): HTMLElement {
    const m = document.createElement("mark");
    m.setAttribute("data-parent", parent?.tagName ?? "NONE");
    return m;
}

describe("transformElement - 未命中默认克隆", () => {
    test("无 transformer 时整树结构等价保留且为全新节点", () => {
        const root = createElement("<div><span>hi</span></div>");
        const result = transformElement(root, []);

        expect(result.outerHTML).toBe("<div><span>hi</span></div>");
        expect(result).not.toBe(root);
    });

    test("未命中节点保留、命中节点被替换", () => {
        const root = createElement("<div><span></span><p></p></div>");
        const result = transformElement(root, [
            [(n) => n.nodeName === "SPAN", () => document.createElement("b")],
        ]);

        expect(result.outerHTML).toBe("<div><b></b><p></p></div>");
    });
});

describe("transformElement - 命中策略", () => {
    test("首个命中的 filter 生效（first-match-wins）", () => {
        const root = createElement("<div></div>");
        const result = transformElement(root, [
            [() => true, () => document.createElement("i")],
            [() => true, () => document.createElement("b")],
        ]);

        expect(result.outerHTML).toBe("<i></i>");
    });

    test("filter 返回 false 的节点走默认克隆", () => {
        const root = createElement("<div><span></span></div>");
        const result = transformElement(root, [
            [(n) => n.nodeName === "SECTION", () => document.createElement("b")],
        ]);

        expect(result.outerHTML).toBe("<div><span></span></div>");
    });
});

describe("transformElement - parent 语义", () => {
    test("文本节点的 parent 仍是所属元素（HTMLElement）", () => {
        const root = createElement("<div><span>hi</span></div>");
        const result = transformElement(root, [
            [(n) => n.nodeType === Node.TEXT_NODE, (_n, parent) => markWithParent(parent)],
        ]);

        // 文本节点的 parent 是所属元素 span，而非更高层级的 div
        expect(result.outerHTML).toBe('<div><span><mark data-parent="SPAN"></mark></span></div>');
    });

    test("嵌套元素中各节点的 parent 为各自的父元素", () => {
        const root = createElement("<div><section><span></span></section></div>");
        const result = transformElement(root, [
            [(n) => n.nodeType === Node.ELEMENT_NODE, (node, parent) => {
                const cloned = node.cloneNode(false) as HTMLElement;
                cloned.setAttribute("data-parent", parent?.tagName ?? "NONE");
                return cloned;
            }],
        ]);

        expect(result.outerHTML).toBe(
            '<div data-parent="NONE"><section data-parent="DIV"><span data-parent="SECTION"></span></section></div>',
        );
    });

    test("根节点的 parent 为 undefined", () => {
        const root = createElement("<div></div>");
        const result = transformElement(root, [
            [() => true, (_n, parent) => markWithParent(parent)],
        ]);

        expect(result.outerHTML).toBe('<mark data-parent="NONE"></mark>');
    });
});

describe("transformElement - 剪枝", () => {
    test("transform 返回 null 丢弃该节点及其整个子树", () => {
        const root = createElement("<div><span>keep</span><p><em>drop</em></p></div>");
        const result = transformElement(root, [
            [(n) => n.nodeName === "P", () => null],
        ]);

        expect(result.outerHTML).toBe("<div><span>keep</span></div>");
    });

    test("transform 返回 undefined 同样剪枝（与 null 等价）", () => {
        const root = createElement("<div><span>keep</span><p><em>drop</em></p></div>");
        const result = transformElement(root, [
            [(n) => n.nodeName === "P", () => undefined],
        ]);

        expect(result.outerHTML).toBe("<div><span>keep</span></div>");
    });

    test("根节点被剪枝时抛异常", () => {
        const root = createElement("<div></div>");
        expect(() => transformElement(root, [[() => true, () => null]])).toThrow();
    });
});

describe("transformElement - 原树只读", () => {
    test("转换过程不修改原树", () => {
        const root = createElement("<div><span>hi</span></div>");
        const original = root.outerHTML;
        transformElement(root, [
            [(n) => n.nodeName === "SPAN", () => document.createElement("b")],
        ]);

        expect(root.outerHTML).toBe(original);
    });

    test("新树节点独立于原树", () => {
        const root = createElement("<div><span></span></div>");
        const result = transformElement(root, []);
        result.appendChild(document.createElement("br"));

        expect(root.outerHTML).toBe("<div><span></span></div>");
    });
});

describe("transformElement - 泛型收窄", () => {
    test("声明 <HTMLElement> 时仅元素节点进入 transform，文本走默认克隆", () => {
        const root = createElement("<div>hi</div>");
        const transformers: NodeTransformer<HTMLElement>[] = [
            [(n) => n.nodeType === Node.ELEMENT_NODE, () => document.createElement("mark")],
        ];
        const result = transformElement(root, transformers);

        // div 命中替换为 mark；文本节点被 filter 拒绝，默认克隆后挂入 mark
        expect(result.outerHTML).toBe("<mark>hi</mark>");
    });
});

describe("transformElement - 字符串返回", () => {
    test("返回 HTML 字符串解析为元素", () => {
        const root = createElement("<div><span></span></div>");
        const result = transformElement(root, [
            [(n) => n.nodeName === "SPAN", () => '<b class="x">hi</b>'],
        ]);

        expect(result.outerHTML).toBe('<div><b class="x">hi</b></div>');
    });

    test("返回多节点 HTML 字符串全部挂入新父", () => {
        const root = createElement("<div><span></span></div>");
        const result = transformElement(root, [
            [(n) => n.nodeName === "SPAN", () => "<a>1</a><b>2</b>"],
        ]);

        expect(result.outerHTML).toBe("<div><a>1</a><b>2</b></div>");
    });

    test("字符串替换时原节点的子内容被丢弃", () => {
        const root = createElement("<div><span>old</span></div>");
        const result = transformElement(root, [
            [(n) => n.nodeName === "SPAN", () => "<i>new</i>"],
        ]);

        expect(result.outerHTML).toBe("<div><i>new</i></div>");
    });

    test("返回空字符串视为剪枝", () => {
        const root = createElement("<div><span>keep</span><p>drop</p></div>");
        const result = transformElement(root, [
            [(n) => n.nodeName === "P", () => ""],
        ]);

        expect(result.outerHTML).toBe("<div><span>keep</span></div>");
    });

    test("字符串生成的节点不再走 transformers", () => {
        const root = createElement("<div><span></span></div>");
        let count = 0;
        const result = transformElement(root, [
            [(n) => n.nodeType === Node.ELEMENT_NODE, (node) => {
                count += 1;
                // span 返回字符串生成 <b>；其他元素返回克隆保留结构
                return node.nodeName === "SPAN" ? "<b></b>" : node.cloneNode(false);
            }],
        ]);

        // 只有 div、span 被处理；span 生成的 b 不再被二次处理
        expect(count).toBe(2);
        expect(result.outerHTML).toBe("<div><b></b></div>");
    });

    test("根节点返回单节点字符串作为新根", () => {
        const root = createElement("<div></div>");
        const result = transformElement(root, [
            [() => true, () => "<main></main>"],
        ]);

        expect(result.outerHTML).toBe("<main></main>");
    });

    test("根节点返回多节点字符串抛异常", () => {
        const root = createElement("<div></div>");
        expect(() =>
            transformElement(root, [[() => true, () => "<a></a><b></b>"]]),
        ).toThrow();
    });
});

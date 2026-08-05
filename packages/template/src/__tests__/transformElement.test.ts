import { describe, expect, test } from "bun:test";
import { transformElement } from "../utils/transformElement";
import type { NodeTransformer } from "../utils/transformElement";
import "./setup";
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

describe("transformElement - 未命中默认克隆", () => {
    test("无 transformer 时整树结构等价保留且为全新节点", () => {
        const root = createElement("<div><span>hi</span></div>");
        const result = transformElement(root, []);

        expect(result).toEqualHTML(`<div>
  <span>hi</span>
</div>`);
        expect(result).not.toBe(root);
    });

    test("未命中节点保留、命中节点被替换", () => {
        const root = createElement("<div><span></span><p></p></div>");
        const result = transformElement(
            root,
            [[(n) => n.nodeName === "SPAN", () => document.createElement("b")]],
        );

        expect(result).toEqualHTML(`<div>
  <b></b>
  <p></p>
</div>`);
    });
});

describe("transformElement - 命中策略", () => {
    test("首个命中的 filter 生效（first-match-wins）", () => {
        const root = createElement(`<div a="x"></div>`);
        const result = transformElement(
            root,
            [
                [
                    () => true,
                    () => {
                        return document.createElement("i");
                    },
                ],
                [() => true, () => document.createElement("b")],
            ],
        );

        expect(result).toEqualHTML(`<i></i>`);
    });

    test("filter 返回 false 的节点走默认克隆", () => {
        const root = createElement("<div><span></span></div>");
        const result = transformElement(
            root,
            [[(n) => n.nodeName === "SECTION", () => document.createElement("b")]],
        );

        expect(result).toEqualHTML(`<div>
  <span></span>
</div>`);
    });
});

describe("transformElement - 剪枝", () => {
    test("transform 返回 null 丢弃该节点及其整个子树", () => {
        const root = createElement("<div><span>keep</span><p><em>drop</em></p></div>");
        const result = transformElement(root, [[(n) => n.nodeName === "P", () => null]]);

        expect(result).toEqualHTML(`<div>
  <span>keep</span>
</div>`);
    });

    test("transform 返回 undefined 同样剪枝（与 null 等价）", () => {
        const root = createElement("<div><span>keep</span><p><em>drop</em></p></div>");
        const result = transformElement(root, [[(n) => n.nodeName === "P", () => undefined]]);

        expect(result).toEqualHTML(`<div>
  <span>keep</span>
</div>`);
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
        transformElement(
            root,
            [[(n) => n.nodeName === "SPAN", () => document.createElement("b")]],
        );

        // 严格字符相等：验证原树字节级未被改动（非结构断言，保留 .toBe）
        expect(root.outerHTML).toBe(original);
    });

    test("新树节点独立于原树", () => {
        const root = createElement("<div><span></span></div>");
        const result = transformElement(root, []);
        result.appendChild(document.createElement("br"));

        expect(root).toEqualHTML(`<div>
  <span></span>
</div>`);
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
        expect(result).toEqualHTML(`<mark>hi</mark>`);
    });
});

describe("transformElement - 字符串返回", () => {
    test("返回 HTML 字符串解析为元素", () => {
        const root = createElement("<div><span></span></div>");
        const result = transformElement(
            root,
            [[(n) => n.nodeName === "SPAN", () => '<b class="x">hi</b>']],
        );

        expect(result).toEqualHTML(`<div>
  <b class="x">hi</b>
</div>`);
    });

    test("返回多节点 HTML 字符串全部挂入新父", () => {
        const root = createElement("<div><span></span></div>");
        const result = transformElement(
            root,
            [[(n) => n.nodeName === "SPAN", () => "<a>1</a><b>2</b>"]],
        );

        expect(result).toEqualHTML(`<div>
  <a>1</a>
  <b>2</b>
</div>`);
    });

    test("字符串替换时原节点的子内容被丢弃", () => {
        const root = createElement("<div><span>old</span></div>");
        const result = transformElement(
            root,
            [[(n) => n.nodeName === "SPAN", () => "<i>new</i>"]],
        );

        expect(result).toEqualHTML(`<div>
  <i>new</i>
</div>`);
    });

    test("返回空字符串视为剪枝", () => {
        const root = createElement("<div><span>keep</span><p>drop</p></div>");
        const result = transformElement(root, [[(n) => n.nodeName === "P", () => ""]]);

        expect(result).toEqualHTML(`<div>
  <span>keep</span>
</div>`);
    });

    test("字符串生成的节点不再走 transformers", () => {
        const root = createElement("<div><span></span></div>");
        let count = 0;
        const result = transformElement(
            root,
            [
                [
                    (n) => n.nodeType === Node.ELEMENT_NODE,
                    (node) => {
                        count += 1;
                        // span 返回字符串生成 <b>；其他元素返回克隆保留结构
                        return node.nodeName === "SPAN" ? "<b></b>" : node.cloneNode(false);
                    },
                ],
            ],
        );

        // 只有 div、span 被处理；span 生成的 b 不再被二次处理
        expect(count).toBe(2);
        expect(result).toEqualHTML(`<div>
  <b></b>
</div>`);
    });

    test("根节点返回单节点字符串作为新根", () => {
        const root = createElement("<div></div>");
        const result = transformElement(root, [[() => true, () => "<main></main>"]]);

        expect(result).toEqualHTML(`<main></main>`);
    });

    test("根节点返回多节点字符串抛异常", () => {
        const root = createElement("<div></div>");
        expect(() => transformElement(root, [[() => true, () => "<a></a><b></b>"]])).toThrow();
    });
});

describe("transformElement - ownsChildren 占有子树", () => {
    test("返回 ownsChildren 信号：节点挂接但跳过其子节点递归", () => {
        const root = createElement(
            "<div><span>x</span><ul><li>a</li><li>b</li></ul><span>y</span></div>",
        );
        const result = transformElement(
            root,
            [
                [
                    (n) => n.nodeName === "UL",
                    (node) => ({
                        node: (node as HTMLElement).cloneNode(false) as Node,
                        ownsChildren: true as const,
                    }),
                ],
            ],
        );

        // ul 浅克隆挂接、其 li 子节点未被递归；前后兄弟 span 正常克隆
        expect(result).toEqualHTML(`<div>
  <span>x</span>
  <ul></ul>
  <span>y</span>
</div>`);
    });
});

// formatHTML —— 把 HTML 字符串格式化为带缩进的层次结构，供断言与人眼审查
//
// 独立成文件（不 import engine），使 setup.ts 可早期 import 它注册 matcher，
// 而不牵连 engine 模块的求值顺序（register 必须先于 engine 求值）。
//
// 走 DOM 解析归一：临时容器 innerHTML 解析 → 递归遍历 childNodes。两侧
// （actual 的 outerHTML 与 expected 手写串）经同一管线，断言建立在「结构等价」
// 而非字符精确相等之上，宽容 happy-dom 序列化的无关差异（引号、void 斜杠等）。
//
// 规则契约：
//  1. void 元素（hr/input/br/...）单标签，不递归子节点；
//  2. 空元素（剔除空白后无子节点）不折行：`<ul></ul>`；
//  3. 剔除纯空白文本节点后——直接子节点含文本 → 整段同行内联（`<li>a</li>`、
//     `<p>x<b>y</b>z</p>`）；全是元素 → 折行缩进；
//  4. 属性按键名排序输出（消除序列化顺序敏感性）、HTML 属性转义；
//  5. 文本 HTML 转义；2 空格缩进；输出首尾 trim。

/** HTML void 元素集合（无闭合标签、无子节点） */
const VOID_ELEMENTS = new Set([
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
]);

/** 文本转义（& < >） */
function escapeText(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** 属性值转义（& "） */
function escapeAttr(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/** 是否纯空白文本节点（剔除装饰性缩进用） */
function isBlankText(node: Node): boolean {
    return node.nodeType === Node.TEXT_NODE && (node.nodeValue ?? "").trim() === "";
}

/** 元素的有意义子节点（剔除纯空白文本节点后） */
function meaningfulChildren(el: Element): Node[] {
    return Array.from(el.childNodes).filter((n) => !isBlankText(n));
}

/** 序列化元素属性：按键名排序 + 转义，返回带前导空格的串（无属性则空串） */
function attrsString(el: Element): string {
    const list = Array.from(el.attributes)
        .map((a) => `${a.name}="${escapeAttr(a.value)}"`)
        .sort((x, y) => x.localeCompare(y));
    return list.length ? ` ${list.join(" ")}` : "";
}

/**
 * 内联输出一个节点为字符串（无缩进/换行）。
 * 用于「含文本子节点 → 整段同行」场景：子树整体压成一行。
 */
function emitInline(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
        return escapeText((node.nodeValue ?? "").trim());
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return "";
    const el = node as Element;
    const tag = el.tagName.toLowerCase();
    const attrs = attrsString(el);
    if (VOID_ELEMENTS.has(tag)) return `<${tag}${attrs}>`;
    const kids = meaningfulChildren(el);
    if (kids.length === 0) return `<${tag}${attrs}></${tag}>`;
    return `<${tag}${attrs}>${kids.map(emitInline).join("")}</${tag}>`;
}

/**
 * 作为独立行（带缩进）输出一个节点。
 * 元素按规则 b 判断：含文本 → 同行内联；全是元素 → 折行递归。
 */
function emitBlock(node: Node, depth: number, lines: string[]): void {
    const indent = "  ".repeat(depth);
    if (node.nodeType === Node.TEXT_NODE) {
        const t = (node.nodeValue ?? "").trim();
        if (t) lines.push(indent + escapeText(t));
        return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return; // 注释等忽略（本仓库测试不涉及）
    const el = node as Element;
    const tag = el.tagName.toLowerCase();
    const attrs = attrsString(el);
    if (VOID_ELEMENTS.has(tag)) {
        lines.push(indent + `<${tag}${attrs}>`);
        return;
    }
    const kids = meaningfulChildren(el);
    if (kids.length === 0) {
        lines.push(indent + `<${tag}${attrs}></${tag}>`);
        return;
    }
    const hasText = kids.some((n) => n.nodeType === Node.TEXT_NODE);
    if (hasText) {
        // 规则 b：含文本子节点 → 整段同行内联
        lines.push(indent + `<${tag}${attrs}>${kids.map(emitInline).join("")}</${tag}>`);
    } else {
        // 全是元素 → 折行缩进
        lines.push(indent + `<${tag}${attrs}>`);
        for (const k of kids) emitBlock(k, depth + 1, lines);
        lines.push(indent + `</${tag}>`);
    }
}

/**
 * 把 HTML 字符串格式化为带缩进的多行串。
 * 顶层多个节点各占独立行（本仓库断言均为单根 `<div>`）。
 */
export function formatHTML(html: string): string {
    const container = document.createElement("div");
    container.innerHTML = html.trim();
    const lines: string[] = [];
    for (const node of Array.from(container.childNodes)) {
        if (isBlankText(node)) continue;
        emitBlock(node, 0, lines);
    }
    return lines.join("\n").trim();
}

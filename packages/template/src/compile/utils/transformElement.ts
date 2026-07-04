/** 节点过滤器：返回 true 表示该节点命中此转换器（始终接收原始 Node） */
export type NodeFilter = (node: Node) => boolean;

/**
 * 节点转换器。
 *
 * @typeParam T - 当前节点的精确类型，默认 `Node`；可收窄为 `HTMLElement`/`Text` 等以获得更精确的类型推断。
 * @param node - 当前节点
 * @param parent - 始终为父元素（`HTMLElement`），根节点时为 `undefined`
 * @returns 新节点、HTML 字符串或空值：
 *   - 返回 `Node` → 用其替换原节点，并继续递归处理原子节点
 *   - 返回 `string` → 按 HTML 片段用 `<template>` 解析，所有顶层节点替代原节点（原内容丢弃、不递归）
 *   - 返回 `null`/`undefined`/空字符串 → 丢弃该节点及其整个子树（剪枝）
 */
export type NodeTransform<T extends Node = Node> = (
    node: T,
    parent: HTMLElement | undefined,
) => Node | string | null | undefined;

/** 转换器对：`[filter, transform]`，按数组顺序首个命中即生效 */
export type NodeTransformer<T extends Node = Node> = [
    filter: NodeFilter,
    transform: NodeTransform<T>,
];

/**
 * 将 HTML 字符串解析为 DocumentFragment。
 *
 * 用 `<template>` 元素的 innerHTML 解析——inert（不执行脚本、不加载资源、不渲染），
 * 且能正确处理 `<tr>`/`<td>`/`<option>` 等需特定父上下文的元素
 * （`<div>.innerHTML` 会丢弃这些元素）。
 *
 * @param html - HTML 片段字符串
 * @returns 解析后的 DocumentFragment；空或纯空白字符串返回 `null`（表示剪枝）
 */
function parseHtmlFragment(html: string): DocumentFragment | null {
    const tpl = document.createElement("template");
    tpl.innerHTML = html.trim();
    const frag = tpl.content;
    return frag.childNodes.length === 0 ? null : frag;
}

/**
 * 深度优先遍历 DOM 树，基于 `transformers` 声明式地重建一棵新树。
 *
 * 原树保持只读、不会被修改；函数返回由转换器构建出的全新根元素。
 *
 * 遍历规则：
 * - 对**每个节点**（元素/文本/注释等）按 `transformers` 数组顺序匹配：
 *   - **首个** `filter` 返回 `true` 的转换器生效（first-match-wins）
 *   - 命中的 `transform` 返回 `Node` → 用其替换原节点，并继续递归处理原子节点
 *   - 命中的 `transform` 返回 `string` → 按 HTML 片段用 `<template>` 解析，所有顶层节点替代原节点（原内容丢弃、不递归；生成的节点视为成品，不再走 transformers）
 *   - 命中的 `transform` 返回 `null`/`undefined`/空字符串 → 丢弃该节点及其整个子树（剪枝）
 *   - **无任何 `filter` 命中** → 浅克隆原节点（`cloneNode(false)`），继续递归子节点
 * - `filter` 可按 `nodeType`/`nodeName` 等对节点类型分流
 * - 根节点的字符串替换必须只产生一个节点，否则抛异常
 *
 * 类型约定：
 * - `transform` 的 `node` 支持所有节点类型；通过泛型 `T` 可收窄到具体类型（如 `HTMLElement`/`Text`）
 *   以获得精确的属性推断。默认 `T = Node`。工具内部对 `node` 做 `as T` 断言，
 *   类型安全性由调用方 `filter` 保证（约定：`filter` 返回 `true` ⇔ `node` 是 `T`）。
 * - `transform` 的 `parent` **始终为父元素**（`HTMLElement`），即使 `node` 是文本/注释等非元素节点；
 *   根节点时为 `undefined`。
 *
 * @typeParam T - `transform` 处理的目标节点类型，默认 `Node`
 * @param el - 原始根元素（保持只读）
 * @param transformers - 转换器对数组，按序首个命中即生效
 * @returns 由转换器构建出的新根元素
 * @throws 根节点被转换器剪枝时抛出异常
 */
export function transformElement<T extends Node = Node>(
    el: HTMLElement,
    transformers: NodeTransformer<T>[],
): HTMLElement {
    let newRoot: HTMLElement | null = null;

    /**
     * 递归转换单个节点，返回新节点；返回 `null` 表示该节点被丢弃。
     */
    const walk = (
        node: Node,
        newParent: Node | null,
        parentElement: HTMLElement | null,
    ): Node | null => {
        const parent = parentElement ?? undefined;

        // 按序查找首个命中的 transformer（first-match-wins）
        let matched = false;
        let result: Node | string | null | undefined = undefined;
        for (const [filter, transform] of transformers) {
            if (filter(node)) {
                // node 断言为 T：类型安全性由调用方 filter 保证（filter 返回 true ⇔ node 是 T）
                matched = true;
                result = transform(node as T, parent);
                break;
            }
        }

        // 未命中任何 filter：默认浅克隆保留（走 Node 路径）
        if (!matched) {
            result = node.cloneNode(false);
        }

        // 命中但返回 null/undefined：剪枝，丢弃该节点及其子树
        // （未命中时 result 是 Node，不会误判）
        if (result == null) {
            return null;
        }

        // 命中并返回字符串：用 <template> 解析为多节点 fragment，完全替换原节点
        // （原内容丢弃、不递归；生成的节点视为成品，不再走 transformers）
        if (typeof result === "string") {
            const frag = parseHtmlFragment(result);
            if (!frag) {
                return null; // 空字符串 → 剪枝
            }
            // 根节点：必须解析为单节点（transformElement 返回 HTMLElement 单根）
            if (node === el) {
                if (frag.childNodes.length !== 1) {
                    throw new Error("transformElement: 根节点的字符串替换必须只产生一个节点");
                }
                newRoot = frag.firstChild as HTMLElement;
            }
            // 非根：fragment 自动展开挂入新父
            if (newParent) {
                newParent.appendChild(frag);
            }
            return null; // 字符串路径完成（walk 返回值未被外部使用）
        }

        // Node 路径：根节点记录引用、挂接到新父、递归子节点
        if (node === el) {
            newRoot = result as HTMLElement;
        }
        newParent?.appendChild(result);

        // 递归子节点：索引遍历 live NodeList，零数组分配。
        // 循环仅在有子节点时执行；有子节点的 node 必为元素（DOM 结构保证），
        // 故可安全作为下一层节点的父元素传入。
        const children = node.childNodes;
        for (let i = 0; i < children.length; i++) {
            // children[i] 非空：i < length 已保证索引存在（noUncheckedIndexedAccess 下需显式断言）
            walk(children[i]!, result, node as HTMLElement);
        }

        return result;
    };

    walk(el, null, null);

    if (!newRoot) {
        throw new Error("transformElement: 根元素被转换器丢弃，无法生成新的根节点");
    }

    return newRoot;
}

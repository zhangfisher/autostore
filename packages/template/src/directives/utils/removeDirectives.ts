import { isDirectiveAttr } from "./isDirectiveAttr";

/**
 * 移除元素上的（编译时）指令属性
 *
 * 遍历 el 的属性集合，删除所有被识别为指令的属性（`@...`、`:...`、`x-...`），
 * 普通 HTML 属性（class、id、data-* 等）保留。识别规则与 getDirectives 完全一致。
 *
 * 说明：
 * - `el.attributes` 是 NamedNodeMap（live collection），遍历过程中删除会改变其长度，
 *   导致索引错乱，因此先收集所有待删除属性名，再统一调用 removeAttribute 删除。
 * - 传入非 HTMLElement（如文本节点）时直接返回，不做任何处理。
 * - `keepAttr` 谓词：返回 true 的指令属性**保留**（不删除）。编译器据此保留 Runtime/Hybrid
 *   指令属性（如 `x-loading`），使其留在结果 DOM 上供 observer 检测、允许 DOM API 改值/删除。
 *
 * @param el       - 目标元素
 * @param prefix   - 长前缀指令前缀，默认 "x-"；不影响 `@` 与 `:` 快捷前缀
 * @param keepAttr - 可选谓词：返回 true 的指令属性保留（默认全部删除）
 */
export function removeDirectives(
    el: HTMLElement,
    prefix = "x-",
    keepAttr?: (attrName: string) => boolean,
): void {
    if (!(el instanceof HTMLElement)) return;

    const attributes = el.attributes;
    const namesToRemove: string[] = [];
    for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        if (attr && isDirectiveAttr(attr.name, prefix) && !keepAttr?.(attr.name)) {
            namesToRemove.push(attr.name);
        }
    }

    for (const name of namesToRemove) {
        el.removeAttribute(name);
    }
}

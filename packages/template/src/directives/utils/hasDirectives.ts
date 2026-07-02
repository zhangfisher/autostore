import { isDirectiveAttr } from "./isDirectiveAttr";

/**
 * 判断元素是否包含任意指令属性
 *
 * 只要元素上存在一个被识别为指令的属性（`@...`、`:...`、`x-...`）即返回 true，
 * 普通 HTML 属性（class、id、data-* 等）不计入。识别规则与 getDirectives /
 * removeDirectives 完全一致（共用 isDirectiveAttr 谓词）。
 *
 * 与 `getDirectives(el).length > 0` 相比，本函数找到首个指令属性即短路返回，
 * 不构建 DirectiveInfo 数组，适合仅需存在性判断、不需要指令列表的场景。
 *
 * 说明：传入非 HTMLElement（如文本节点）时返回 false，不做任何处理。
 *
 * @param el     - 目标元素
 * @param prefix - 长前缀指令前缀，默认 "x-"；不影响 `@` 与 `:` 快捷前缀
 */
export function hasDirectives(el: HTMLElement, prefix = "x-"): boolean {
    if (!(el instanceof HTMLElement)) return false;

    const attributes = el.attributes;
    for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        if (attr && isDirectiveAttr(attr.name, prefix)) {
            return true;
        }
    }
    return false;
}

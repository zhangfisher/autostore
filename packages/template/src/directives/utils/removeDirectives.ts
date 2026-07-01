/** 事件绑定快捷前缀 */
const EVENT_PREFIX = "@";
/** 属性绑定快捷前缀 */
const BIND_PREFIX = ":";

/**
 * 判断属性名是否为指令属性
 *
 * 识别规则与 getDirectives 保持一致：
 * - `@` 事件快捷前缀（如 @click）
 * - `:` 属性绑定快捷前缀（如 :title）
 * - prefix 长前缀（默认 x-，含 x-xxx-options 形式也归属此类）
 *
 * `@` 与 `:` 为固定快捷前缀，不受 prefix 参数影响。
 */
function isDirectiveAttrName(rawName: string, prefix: string): boolean {
    return (
        rawName.startsWith(EVENT_PREFIX) ||
        rawName.startsWith(BIND_PREFIX) ||
        rawName.startsWith(prefix)
    );
}

/**
 * 移除元素上的所有指令属性
 *
 * 遍历 el 的属性集合，删除所有被识别为指令的属性（`@...`、`:...`、`x-...`），
 * 普通 HTML 属性（class、id、data-* 等）保留。识别规则与 getDirectives 完全一致。
 *
 * 说明：
 * - `el.attributes` 是 NamedNodeMap（live collection），遍历过程中删除会改变其长度，
 *   导致索引错乱，因此先收集所有待删除属性名，再统一调用 removeAttribute 删除。
 * - 传入非 HTMLElement（如文本节点）时直接返回，不做任何处理。
 *
 * @param el - 目标元素
 * @param prefix - 长前缀指令前缀，默认 "x-"；不影响 `@` 与 `:` 快捷前缀
 */
export function removeDirectives(el: HTMLElement, prefix = "x-"): void {
    if (!(el instanceof HTMLElement)) return;

    const attributes = el.attributes;
    const namesToRemove: string[] = [];
    for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        if (attr && isDirectiveAttrName(attr.name, prefix)) {
            namesToRemove.push(attr.name);
        }
    }

    for (const name of namesToRemove) {
        el.removeAttribute(name);
    }
}

/** 事件绑定快捷前缀 */
export const EVENT_PREFIX = "@";
/** 属性绑定快捷前缀 */
export const BIND_PREFIX = ":";

/**
 * 判断属性名是否为指令属性
 *
 * 识别规则与 getDirectives / removeDirectives / hasDirectives 保持一致：
 * - `@` 事件快捷前缀（如 @click）
 * - `:` 属性绑定快捷前缀（如 :title）
 * - prefix 长前缀（默认 x-，含 x-xxx-options 形式也归属此类）
 *
 * `@` 与 `:` 为固定快捷前缀，不受 prefix 参数影响。该判定是整个指令系统的
 * 核心边界，集中在此一处避免规则漂移。
 *
 * @param rawName - 属性原始名
 * @param prefix  - 长前缀指令前缀，默认 "x-"；不影响 `@` 与 `:` 快捷前缀
 */
export function isDirectiveAttr(rawName: string, prefix = "x-"): boolean {
    return (
        rawName.startsWith(EVENT_PREFIX) ||
        rawName.startsWith(BIND_PREFIX) ||
        rawName.startsWith(prefix)
    );
}

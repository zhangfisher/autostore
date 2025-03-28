
import { VNode, isVNode } from 'vue';

/**
 * 判断值是否是一个有效的 Vue 节点
 * 
 * @param {any} value - 要检查的值
 * @returns {boolean} - 如果值是有效的 Vue 节点，则返回 true，否则返回 false
 */
export function isVueElement(value: any): boolean {
    if (value === null || value === undefined) {
        return false;
    }
    if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string' || typeof value === 'symbol') {
        return true;
    }
    if (Array.isArray(value)) {
        return value.every(isVueElement);
    }
    if (isVNode(value)) {
        return true;
    }
    return false;
}
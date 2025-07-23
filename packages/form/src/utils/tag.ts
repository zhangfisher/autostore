/**
 * 自定义元素标签装饰器
 *
 * 基于lit的customElement装饰器，增加了检查组件是否已注册的逻辑
 * 如果组件已经注册，则忽略再次注册
 * 如果组件未注册，则使用customElement进行注册
 */

import { customElement } from 'lit/decorators.js';

/**
 * 自定义元素标签装饰器
 * @param tagName 要注册的自定义元素标签名
 * @returns 类装饰器
 */
export function tag(tagName: string) {
    // 返回实际的装饰器函数
    return (classOrDescriptor: any) => {
        // 检查该标签是否已经被注册
        if (customElements.get(tagName)) {
            // 如果已注册，返回原始类，不执行注册
            console.warn(`Custom element with tag "${tagName}" is already defined. Skipping registration.`);
            return classOrDescriptor;
        }

        // 如果未注册，使用lit的customElement装饰器进行注册
        return customElement(tagName)(classOrDescriptor);
    };
}

import React from 'react';

/**
 * 判断值是否是一个 React.ReactNode
 * 
 * @param {any} value - 要检查的值
 * @returns {boolean} - 如果值是 React.ReactNode，则返回 true，否则返回 false
 */
export function isReactNode(value: any): boolean {
    if (value === null || value === undefined) {
        return false;
    }
    if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string' || typeof value === 'symbol') {
        return true;
    }
    if (Array.isArray(value)) {
        return value.every(isReactNode);
    }
    if (React.isValidElement(value)) {
        return true;
    }
    return false;
}
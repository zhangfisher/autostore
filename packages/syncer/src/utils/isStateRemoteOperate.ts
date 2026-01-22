import type { StateRemoteOperate } from '../types';

/**
 * 判断值是否是一个 StateRemoteOperate
 *
 * 通过检查必需字段和类型来判断一个值是否是合法的 StateRemoteOperate
 *
 * @param val 要判断的值
 * @returns 如果是 StateRemoteOperate 则返回 true，否则返回 false
 *
 * @example
 * ```typescript
 * import { isStateRemoteOperate } from '@autostorejs/syncer';
 *
 * worker.addEventListener('message', (event: MessageEvent) => {
 *     if (isStateRemoteOperate(event.data)) {
 *         // 处理状态操作
 *         transport.onStateOperate(event.data);
 *     } else {
 *         // 处理其他类型的消息
 *         console.log('收到其他消息:', event.data);
 *     }
 * });
 * ```
 */
export function isStateRemoteOperate(val: unknown): val is StateRemoteOperate {
    // 检查是否是对象且不为 null
    if (typeof val !== 'object' || val === null) {
        return false;
    }

    const obj = val as Record<string, unknown>;

    // 检查必需字段是否存在
    if (
        typeof obj.id !== 'string' ||
        typeof obj.type !== 'string' ||
        !Array.isArray(obj.path) ||
        typeof obj.flags !== 'number'
    ) {
        return false;
    }

    // type 字段必须是有效的操作类型
    const validTypes = [
        'set',
        'delete',
        'insert',
        '$stop',
        '$push',
        '$update',
        '$push-schemas',
        '$pull-store',
        '$update-store',
        '$pull-schemas',
        '$update-schemas',
        '$update-schema-option',
    ];

    if (!validTypes.includes(obj.type)) {
        return false;
    }

    // 可选字段检查
    if (obj.parentPath !== undefined && !Array.isArray(obj.parentPath)) {
        return false;
    }

    if (obj.indexs !== undefined && !Array.isArray(obj.indexs)) {
        return false;
    }

    if (obj.reply !== undefined && typeof obj.reply !== 'boolean') {
        return false;
    }

    if (obj.__schema__ !== undefined && typeof obj.__schema__ !== 'boolean') {
        return false;
    }

    return true;
}

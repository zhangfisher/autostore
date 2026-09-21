import { SHALLOW_PROXY_FLAG } from '../consts';

export type ShallowObject<T> = T & {
    [SHALLOW_PROXY_FLAG]: true;
};

/**
 * 标记一个对象值为浅响应(Shallow)：进入状态树后仅创建一层浅代理。
 *
 * - 顶层代理的读写与数组操作照常产生操作事件(set/insert/remove 等)
 * - 属性值不再递归创建代理——读出即为原始引用，直接修改其内部不会产生任何事件
 * - 适用于大数组/大对象等高频读写的性能敏感场景
 *
 * 与 markRaw(完全不创建代理)相对。详见 ADR-0006。
 *
 * @param obj
 * @returns
 */
export function shallow<T = any>(obj: T): ShallowObject<T> {
    try {
        if (obj !== null && typeof obj === 'object') {
            // @ts-expect-error
            obj[SHALLOW_PROXY_FLAG] = true;
        }
    } catch {}
    return obj as ShallowObject<T>;
}

/**
 * 判断一个对象是否被标记为浅响应
 *
 * @param obj
 * @returns
 */
export function isShallow(obj: any): boolean {
    return (
        obj !== null && typeof obj === 'object' && (obj as any)[SHALLOW_PROXY_FLAG] === true
    );
}

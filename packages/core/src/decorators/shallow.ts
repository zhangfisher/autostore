import { SHALLOW_PROXY_FLAG } from '../consts';

export type ShallowObject<T = any, Deep extends 0 | 1 = 0> = T & {
    [SHALLOW_PROXY_FLAG]: Deep;
};

/**
 * 标记一个对象值为浅响应(Shallow)：进入状态树后仅创建一层浅代理。
 *
 * - 顶层代理的读写与数组操作照常产生操作事件(set/insert/remove 等)
 * - 属性值不再递归创建代理——读出即为原始引用，直接修改其内部不会产生任何事件
 * - 适用于大数组/大对象等高频读写的性能敏感场景
 *
 * `deep` 声明向下多代理一层(仅 0|1 两档,默认 0)：
 *
 * - `deep=0`: 仅被标记对象本身一层浅代理,成员读出即原始引用
 * - `deep=1`: 成员也获得一层浅代理——成员属性读写有事件、成员内函数照常创建计算属性,
 *   但孙级及以下读出即原始引用。成员在**首次经代理读取时惰性纳管**,
 *   之后 push/set 进来的新成员同样生效
 * - 运行时越界值归一:`deep>0` 一律按 1 处理(静默降级到 0 会砍掉用户以为有的响应,更危险)
 *
 * 与 markRaw(完全不创建代理)相对。详见 ADR-0006 / ADR-0007。
 *
 * @param obj
 * @param deep 向下代理层数,0|1,默认 0
 * @returns
 */
export function shallow<T = any, Deep extends 0 | 1 = 0>(
    obj: T,
    deep: Deep = 0 as Deep
): ShallowObject<T, Deep> {
    try {
        if (obj !== null && typeof obj === 'object') {
            // @ts-expect-error
            obj[SHALLOW_PROXY_FLAG] = deep > 0 ? 1 : 0;
        }
    } catch {}
    return obj as ShallowObject<T, Deep>;
}

/**
 * 判断一个对象是否被标记为浅响应
 *
 * 标记值自 ADR-0007 起为归一化数字(0|1)；同时兼容旧布尔 `true`
 * (同页混布新旧捆绑副本场景,Symbol.for 全局注册使二者可互判)
 *
 * @param obj
 * @returns
 */
export function isShallow(obj: any): boolean {
    const flag = obj?.[SHALLOW_PROXY_FLAG];
    return (
        obj !== null &&
        typeof obj === 'object' &&
        (flag === true || typeof flag === 'number')
    );
}

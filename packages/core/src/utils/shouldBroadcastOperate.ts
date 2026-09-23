import { StateOperate } from "../store/types";

/** 后代广播派生时，用于探测路径是否存在的哨兵值 */
export const BROADCAST_SENTINEL = Symbol("autostore.broadcast");

/**
 * 判断一个值是否为可下钻的结构化值：普通对象 {} / Map / Array。
 * 显式排除 Set（第一阶段范围），以及 Date/RegExp/类实例/observer 对象等非纯对象。
 */
export function isBroadcastableValue(value: any): boolean {
    if (value == null || typeof value !== "object") return false;
    if (value instanceof Set) return false; // Set 暂不纳入下钻
    if (Array.isArray(value) || value instanceof Map) return true;
    // 普通对象：原型为 null 或 Object.prototype（排除类实例、observer 对象等）
    const proto = Object.getPrototypeOf(value);
    return proto === null || proto === Object.prototype;
}

/**
 * 判断一个 operate 是否应触发后代广播。
 * 仅处理 set / delete / update(set 陷阱) 且值为结构化值的情形；
 * insert/remove/fill 等数组方法产生的 operate（带 indexs、value 为增量数组、含移位语义）
 * 留待后续阶段。详见 ADR-0001。
 */
export function shouldBroadcastOperate(params: StateOperate): boolean {
    const t = params.type;
    if (t === "set" || t === "delete") {
        return isBroadcastableValue(params.value);
    }
    if (t === "update") {
        // set 陷阱产生的 arr[i] = 结构化值：indexs 为空、value 为单个结构化值。
        // fill 产生的 update 带 indexs 且 value 为数组，不在本阶段处理。
        return (!params.indexs || params.indexs.length === 0) && isBroadcastableValue(params.value);
    }
    return false;
}

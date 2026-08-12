import { AutoStore } from "../store/store";

/**
 * 判别 x 是否为 AutoStore 实例（ADR-0009 决策 3）。
 *
 * `instanceof` 为主；`__AUTO_STORE__` 实例字段兜"双副本 autostore 致 instanceof 失灵"场景
 * （AutoStore 经 super() 子类如 ReactAutoStore 亦有此字段）。
 */
export function isAutoStore(x: unknown): x is AutoStore<any> {
    return (
        x instanceof AutoStore ||
        (x !== null &&
            typeof x === "object" &&
            (x as Record<string, unknown>).__AUTO_STORE__ === true)
    );
}

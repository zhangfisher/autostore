import type { AsyncComputedValue } from "../computed/types";
import { ASYNC_COMPUTED_VALUE } from "../consts";

/**
 * 是否是高级异步计算属性值
 *
 * 判定优先级：
 * 1. 携带 ASYNC_COMPUTED_VALUE 标记（createAsyncComputedValue/asyncpro 生成的标准形态）
 * 2. duck-typing 兜底：浅拷贝/解构产生的对象可能丢失标记，按 value+loading+retry 三字段识别
 */
export function isAsyncComputedValue(value: any): value is AsyncComputedValue {
    return (
        value &&
        typeof value === "object" &&
        // biome-ignore lint/suspicious/noPrototypeBuiltins: <noPrototypeBuiltins>
        (value.hasOwnProperty(ASYNC_COMPUTED_VALUE) ||
            ("value" in value && "loading" in value && "retry" in value))
    );
}

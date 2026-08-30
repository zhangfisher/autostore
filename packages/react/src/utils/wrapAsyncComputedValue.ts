import {
    type AsyncComputedValue,
    createAsyncComputedValue,
    isAsyncComputedValue,
    type ObserverObject,
} from "autostore";

/**
 * 将一个普通值包装为 AsyncComputedValue 形态的对象
 *
 * @description
 *
 * 用于在 hook 中统一返回两种异步计算属性的形态：
 *
 * - 高级异步计算(asyncComputed声明)：状态值本身就是AsyncComputedValue对象，浅拷贝返回
 * - 简单异步计算(computed(async...)声明)：计算结果原位写入（标量值），
 *   此处包装为AsyncComputedValue形态返回，并尽可能从对应的computedObj同步运行状态
 *
 * 当提供computedObj时：
 * - 绑定run/cancel到计算对象，支持手动重算（简单异步原位值上没有run/cancel，此处补齐）
 * - 同步当前的loading(running)与error状态，避免首次渲染到事件订阅之间的窗口期状态丢失
 *
 * @param value - 状态值（可能是AsyncComputedValue或简单异步的原位结果）
 * @param computedObj - 可选，该路径对应的计算对象（简单异步时用于同步状态与绑定方法）
 */
export function wrapAsyncComputedValue<Value = any>(
    value: Value,
    computedObj?: ObserverObject<any>,
): AsyncComputedValue<Value> {
    if (isAsyncComputedValue(value)) {
        // 高级异步：值本身就是AsyncComputedValue（含标记），浅拷贝生成新引用以触发React更新
        return { ...value };
    }
    // 简单异步：包装时从计算对象同步运行状态，补齐loading首帧与run/cancel
    return createAsyncComputedValue(value, {
        loading: computedObj?.running === true,
        error: computedObj?.error ?? null,
        ...(computedObj
            ? {
                  run: (args?: any) => computedObj.run(args),
                  cancel: () => {},
              }
            : {}),
    }) as AsyncComputedValue<Value>;
}

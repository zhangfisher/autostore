import { TimeoutError } from "../errors";
import type { AutoStore } from "../store/store";
import { getVal } from "./getVal";
import { isAsyncComputedValue } from "./isAsyncComputedValue";

/**
 * 
 * 获取对象中指定路径的值
 * 如果目标是一个异步计算值，返回该异步计算值，如果异步计算正在进行中，是等待状态，否则返回该值
 * 
 */
export function getAsyncValue<Value = any>(store: AutoStore<any>, keyPath: string | string[] | undefined, options?: { defaultValue?: any, timeout?: number }): Promise<Value> {
    const { defaultValue, timeout = 0 } = options || {}
    return new Promise<Value>((resolve, reject) => {
        const path = typeof (keyPath) === 'string' ? keyPath.split(store.delimiter) : keyPath
        const val = getVal(store.state, path, defaultValue)
        if (isAsyncComputedValue(val)) {
            if (val.loading) {
                let tmId: any
                // 等等loading变成false
                const subscriber = store.watch(`${path}${store.delimiter}loading`, () => {
                    if (tmId) clearTimeout(tmId)
                    resolve(val.value)
                }, { once: true })
                if (timeout > 0) {
                    tmId = setTimeout(() => {
                        subscriber?.off()
                        reject(new TimeoutError())
                    }, timeout)
                }
            } else {
                resolve(val.value)
            }
        } else {
            resolve(val)
        }
    })
}
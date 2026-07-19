import type { AnyObserverDescriptor } from "../observer";
import { getDefaultComputedOptions } from "./getDefaultComputedOptions";
import { isAsyncFunction } from "./isAsyncFunction";
import { isObserverDescriptorBuilder } from "./isObserverDescriptorBuilder";
/**
 *
 * @param value
 * @returns
 */
export function getObserverDescriptor(value: any): AnyObserverDescriptor | undefined {
    let descriptor: AnyObserverDescriptor | undefined;
    if (isObserverDescriptorBuilder(value)) {
        descriptor = value() as AnyObserverDescriptor;
    } else if (typeof value === "function") {
        // 只是简单的函数，没有任何配置参数，属性简化的计算属性，具有默认的属性
        descriptor = {
            type: "sync",
            getter: value,
            options: Object.assign({}, getDefaultComputedOptions(), {
                async: isAsyncFunction(value),
            }),
        };
    }
    return descriptor;
}

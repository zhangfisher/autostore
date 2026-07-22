import {
    OBSERVER_DESCRIPTOR_BUILDER_FLAG,
    OBSERVER_DESCRIPTOR_FLAG,
    OBSERVER_TYPE_FLAG,
    normalizeDeps,
    getDefaultComputedOptions,
} from "autostore";
import type { ComputedDepends } from "autostore";
import type {
    AsyncProComputedGetter,
    AsyncProComputedOptions,
    AsyncProComputedDescriptorBuilder,
    AsyncProComputedDescriptor,
    AsyncComputedValue,
} from "./types";

/**
 * 用来封装状态的计算函数，使用计算函数的传入的是当前对象
 *
 *
 * @param getter
 * @param depends
 * @param options
 * @returns
 *
 */
export function asyncComputed<Value = any, Scope = any>(
    getter: AsyncProComputedGetter<Value, Scope>,
    depends: ComputedDepends,
    options?: AsyncProComputedOptions<Value, Scope>,
): AsyncProComputedDescriptorBuilder<AsyncComputedValue<Value>, Scope> {
    if (typeof getter !== "function") throw new Error("computed getter must be a function");
    // 解析参数：同时支持同步和异步计算函数两种方式声明
    const opts: AsyncProComputedOptions = Object.assign({}, getDefaultComputedOptions(), options, {
        async: true,
    });
    opts.depends = normalizeDeps(depends);

    const descriptorBuilder = () => {
        return {
            type: "asyncpro",
            getter,
            options: opts,
            [OBSERVER_DESCRIPTOR_FLAG]: true,
        } as unknown as AsyncProComputedDescriptor<Value, Scope>;
    };
    descriptorBuilder[OBSERVER_DESCRIPTOR_BUILDER_FLAG] = true as const;
    descriptorBuilder[OBSERVER_TYPE_FLAG] = "asyncpro";
    return descriptorBuilder as AsyncProComputedDescriptorBuilder<AsyncComputedValue<Value>, Scope>;
}

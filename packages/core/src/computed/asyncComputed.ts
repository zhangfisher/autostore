import { OBSERVER_DESCRIPTOR_BUILDER_FLAG, OBSERVER_DESCRIPTOR_FLAG } from "../consts";
import { InvalidComputedArgumentsError } from "../errors";
import { isAsyncFunction } from "../utils/isAsyncFunction";
import { normalizeDeps } from "../utils/normalizeDeps";
import { getDefaultComputedOptions } from "../utils/getDefaultComputedOptions";
import type {
    AsyncComputedGetter,
    ComputedDepends,
    ComputedOptions,
    AsyncComputedDescriptorBuilder,
    AsyncComputedDescriptor,
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
    getter: AsyncComputedGetter<Value, Scope>,
    depends: ComputedDepends,
    options?: ComputedOptions<Value, Scope>,
): AsyncComputedDescriptorBuilder<Value, Scope> {
    if (typeof getter !== "function") throw new Error("computed getter must be a function");
    // 解析参数：同时支持同步和异步计算函数两种方式声明
    const opts: ComputedOptions = Object.assign({}, getDefaultComputedOptions(), options, {
        async: true,
    });
    opts.depends = normalizeDeps(depends);

    const descriptorBuilder = () => {
        return {
            type: "computed",
            getter,
            options: opts,
            [OBSERVER_DESCRIPTOR_FLAG]: true,
        } as AsyncComputedDescriptor<Value, Scope>;
    };
    descriptorBuilder[OBSERVER_DESCRIPTOR_BUILDER_FLAG] = true as const;

    return descriptorBuilder;
}

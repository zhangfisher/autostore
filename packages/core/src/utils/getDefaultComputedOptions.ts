import { ComputedOptions } from "../computed/types";


export function getDefaultComputedOptions():ComputedOptions{
    return {
        objectify: true,
        async    : false,
		enable         : true,
		timeout        : 0,
		depends        : [],
		immediate      : "auto",    // 马上执行一次，异步计算函数，如果提供initial值，则不会马上执行
		extras         : undefined,
		reentry        : true
    }
}
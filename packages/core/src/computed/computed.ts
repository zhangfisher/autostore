import { OBSERVER_DESCRIPTOR_BUILDER_FLAG,OBSERVER_DESCRIPTOR_FLAG } from "../consts";
import { InvalidComputedArgumentsError } from "../errors";
import { isAsyncFunction } from "../utils/isAsyncFunction";
import { normalizeDeps } from "../utils/normalizeDeps";
import { getDefaultComputedOptions } from "../utils/getDefaultComputedOptions";
import {
	AsyncComputedGetter,
	ComputedDepends,
	ComputedDescriptorBuilder,
	ComputedDescriptor,
	ComputedGetter,
	ComputedOptions,
	SyncComputedOptions
} from "./types";

/**
 * 用来封装状态的计算函数，使用计算函数的传入的是当前对象
 *
 *  类型声明：
 *   R: 计算函数的返回值类型,该值会回写入声明的计算属性中，如果是异步计算函数，会回写入AsyncComputedObject.value中
 *   ExtraAttrs: 额外的属性，会合并到AsyncComputedObject中
 *
 * @param getter
 * @param depends
 * @param options
 * @returns
 *
 */
export function computed<Value = any, Scope = any>(getter: AsyncComputedGetter<Value,Scope>,depends: ComputedDepends,options?: ComputedOptions<Value,Scope>): ComputedDescriptorBuilder<Value,Scope>;
export function computed<Value = any, Scope = any >(getter: ComputedGetter<Value,Scope>,options?: SyncComputedOptions<Value,Scope>):Value;
export function computed<Value = any, Scope = any>(): any {
  const getter = arguments[0];
	if (typeof getter !== "function") throw new Error("computed getter must be a function");
	// 解析参数：同时支持同步和异步计算函数两种方式声明
	let deps: ComputedDepends = [];
	const opts: ComputedOptions  = Object.assign({},getDefaultComputedOptions())
	if (arguments.length === 1) {
		deps = [];
	} else if (arguments.length === 2) {
		if (Array.isArray(arguments[1])) {
			opts.depends =  arguments[1];			
		} else if (typeof arguments[1] === "object") {
			Object.assign(opts, arguments[1]);
			opts.depends = normalizeDeps(opts.depends);
		} else {
			throw new InvalidComputedArgumentsError();
		}
	} else if (arguments.length >= 3) {
		deps = normalizeDeps(arguments[1]);
		Object.assign(opts, arguments[2]);
		opts.depends = deps
	}

	// 判定是否是异步计算函数
	opts.async = opts.async === true 
                || isAsyncFunction(getter) 
                || (arguments.length >= 2 && Array.isArray(arguments[1]));	

	const descriptorBuilder = ()=>{
		return {
			type:'computed', 
			getter,
			options: opts,
			[OBSERVER_DESCRIPTOR_FLAG]:true
		} as  ComputedDescriptor<Value,Scope>		
	} 
	descriptorBuilder[OBSERVER_DESCRIPTOR_BUILDER_FLAG]=true

	return descriptorBuilder 
}

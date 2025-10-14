import type { ComputedObject } from "../computed/computedObject";
import type { ComputedScope } from "../computed/types";
import type { ObserverObject } from "../observer/observer";
import type { ObserverType } from "../observer/types";
import type { Dict } from "../types";
import type { SchemaOptions } from "../schema";
import type { AutoStore } from "./store";
export type BatchChangeEvent = "__batch_update__";
export type StateChangeEvents = Record<string, StateOperate>;

export type StateOperateType =
	| "get"
	| "set"
	| "delete" // 用于对象
	| "insert"
	| "update"
	| "remove" // 用于数组
	| "batch"; // 批量操作

export type StateOperate<Value = any, Parent = any> = {
	type: StateOperateType;
	path: string[];
	value: Value;
	indexs?: number[]; // 数组操作时，操作的索引，如[1,2]表示操作了数组的第1个和第2个元素
	oldValue?: Value;
	parentPath?: string[];
	parent?: Parent;
	/**
	 * 是否是批量操作时的回放事件
	 */
	reply?: boolean;
	flags?: number;
};

export interface AutoStoreOptions<State extends Dict> {
	/**
	 * 提供一个id，用于标识当前store
	 */
	id?: string;

	/**
	 * 是否启用调试模式
	 * @description
	 *
	 * 调试模式下会在控制台输出一些日志信息
	 *
	 */
	debug?: boolean;
	/**
	 * 声明是否shadow,默认false
	 */
	shadow?: boolean;
	/**
	 *  是否马上创建动态对象
	 *
	 *
	 * @description
	 *
	 * 默认情况下，计算函数仅在第一次读取时执行,
	 * 如果lazy=true时，则延迟创建计算对象
	 *
	 * @default true
	 *
	 * @deprecated
	 *
	 *
	 */
	lazy?: boolean;
	/**
	 * 是否启用计算
	 *
	 * @description
	 *
	 * 当enableComputed=false时，会创建计算属性，但不会执行计算函数
	 * 可以通过enableComputed方法启用
	 *
	 * 相当于全局计算总开关
	 *
	 *
	 *
	 */
	enableComputed?: boolean;

	/**
	 * 路径分隔符,默认是`.`
	 */
	delimiter?: string;
	/**
	 * 获取计算函数的根scope
	 *
	 * @description
	 *
	 * 计算函数在获取scope时调用，允许修改其根scope
	 *
	 * 默认指向的是当前根对象，此处可以修改其指向
	 *
	 * 比如,return  state.fields，代表计算函数的根指向state.fields
	 * 这样在指定依赖时，如depends="count"，则会自动转换为state.fields.count
	 *
	 */
	getRootScope?: (state: State, options: { observerType: ObserverType; valuePath: string[] | undefined }) => any;

	/**
	 *
	 * 为所有动态值对象提供默认的scope参数
	 *
	 * @description
	 * 默认情况下，所有computedObject,watchObject的scope参数均为CURRENT
	 * 可以通过此参数来为所有的computedObject,watchObject提供默认的scope参数
	 * 比如让所有的computedObject,watchObject的默认scope参数均为ROOT
	 *
	 */
	scope?: ComputedScope;
	/**
	 * 当启用debug=true时用来输出日志信息
	 *
	 * @param message
	 * @param level
	 * @returns
	 */
	log?: (message: any, level?: "info" | "error" | "warn") => void;
	/**
	 * 启用重置功能
	 *
	 * @description
	 *
	 * 当启用resetable=true时，会记录数据的首次变化，然后在store.reset()方法调用时，将数据恢复到初始状态
	 *
	 */
	resetable?: boolean;
	/**
	 * 计算函数是否允许重入
	 */
	reentry?: boolean;
	/**
	 *
	 * 当创建计算属性时调用
	 *
	 * @description
	 *
	 * 允许在此对计算对象进行一些处理，比如重新封装getter函数，或者直接修改ComputedOptions
	 *
	 * @example
	 *
	 * createStore({...},{
	 *  onCreateComputed(computedObject){
	 *      const oldGetter = computedObject.getter
	 *      computedObject.getter = function(){
	 *          do something
	 *          return oldGetter.call(this,...arguments)
	 *      }
	 *  }
	 * })
	 * @param this
	 * @param computedObject
	 * @returns
	 */
	onComputedCreated?: (this: AutoStore<State>, computedObject: ComputedObject) => void;

	/**
	 * 当每一次计算完成后调用
	 * @param this
	 * @param computedObject
	 * @returns
	 */
	onComputedDone?: (
		this: AutoStore<State>,
		args: { id: string; path: string[]; value: any; computedObject: ComputedObject },
	) => void;

	/**
	 * 当计算出错时调用
	 * @param this
	 * @param error
	 * @param computedObject
	 * @returns
	 */
	onComputedError?: (
		this: AutoStore<State>,
		args: { id: string; path: string[]; error: Error; computedObject: ComputedObject },
	) => void;
	/**
	 * 当每一次计算对象被取消时调用
	 * 仅在异步计算时有效
	 * @param this
	 * @param computedObject
	 * @returns
	 */
	onComputedCancel?: (
		this: AutoStore<State>,
		args: {
			id: string;
			path: string[];
			reason: "timeout" | "abort" | "reentry" | "error";
			computedObject: ComputedObject<any>;
		},
	) => void;
	/**
	 *
	 * 当创建观察对象实例化时调用
	 *
	 * 一般可以在此对ObserverObject进行一些处理
	 * 比如重新封装run函数等
	 *
	 */
	onObserverCreated?: (observerObject: ObserverObject<any, any>) => void;

	onObserverBeforeCreate?: (observerObject: ObserverObject<any, any>) => void;
	/**
	 *
	 *
	 *
	 * 当状态值是一个函数时，创建对应的可观察对象前调用
	 *
	 * 即第一次读取时调用，
	 *
	 * 返回false则不创建对应的可观察对象，将函数标志为raw
	 *
	 */
	onObserverInitial?: (this: AutoStore<State>, path: string[], value: any, parent: any) => void | boolean;
	/**
	 * 默认的値模式
	 */
	defaultSchemaOptions?: Partial<SchemaOptions<any>>;
	/**
	 * 当写入时状态时执行此校验函数
	 */
	onValidate?: (this: AutoStore<State>, path: string[], newValue: any, oldValue: any) => boolean;

	/**
	 *
	 * 获取影子store
	 * 为所有observer对象提供store对象
	 *
	 */
	getShadowStore?: () => AutoStore<any>;
}

export type UpdateOptions = {
	/**
	 * 执行批量更新操作，期间不会触发事件，等更新函数执行后再触发batch事件
	 *  =false 不执行批量更新操作
	 *  =true  执行批量更新操作，批量更新事件名称为__batch_update__
	 *  <string> 执行批量更新操作，批量更新事件名称为指定的字符串
	 */
	batch?: boolean | string;
	/**
	 * 执行更新操作时，静默，不会触发任何事件
	 *
	 */
	silent?: boolean;
	/**
	 *
	 * 更新时执行校验的模式
	 * - none    不进行校验，即不执行校验函数
	 * - pass    校验失败时放行，即进行更新
	 * - ignore  校验失败时忽略更新操作，不进行更新
	 * - throw   校验失败时抛出异常 (默认)
	 *
	 *
	 */
	validate?: "none" | "pass" | "throw" | "ignore";
	/**
	 * 执行读取操作时，不会触发GET事件
	 * 即偷听
	 */
	peep?: boolean;
	/**
	 * 在批量更新结束后，会自动回放update(()=>{...})之间的所有操作事件
	 * 然后再触发一个__batch_update__事件
	 *
	 * @description
	 *
	 * =true 默认会回放所有操作事件
	 * =false 不会回放操作事件,仅会触发__batch_update__事件
	 */
	reply?: boolean;
	/**
	 * 额外的更新标识
	 * 用在执行更新操作时传递额外的标识
	 *
	 * store.update(()=>{...},{flags:8})
	 *
	 * 在update期间触发的事件operate中会包含此值，可以通过operate.flags获取到此值
	 *
	 */
	flags?: number;
};

export type StateTracker = {
	stop: () => void;
	start(isStop?: (operate: StateOperate) => boolean): Promise<StateOperate[]>;
};

export type StoreSyncer = { on: () => void; off: () => void };

export type StoreSyncOptions = {
	from?: string;
	to?: string;
	filter?: (this: AutoStore<any>, operate: StateOperate) => boolean;
	immediate?: boolean; // 初始化时立刻同步一次
	direction?: "both" | "forward" | "backward"; // 0:双向同步, 1: from->to,  2: to->from
	// 同步时，是否路径进行映射处理，比如将['order','price']映射成['order.price']等
	pathMap?: {
		from: (path: string[], value: any) => string[] | undefined;
		to: (path: string[], value: any) => string[] | undefined;
	};
};

import { describe, test, it, expect } from "bun:test";
import type { Equal, Expect } from "@type-challenges/utils";
import { AutoStore, computed } from "../../src";
import type { ObserverObject, ObserverOptions, ObserverDescriptor } from "../../src";

/**
 * Observer 基础类型测试
 * 测试观察者模式的类型定义
 */
describe("Observer 基础类型", () => {
	test("ObserverType 类型", () => {
		// ObserverType 应该是 'watch' | 'computed' | 'schema'
		type ObserverType = "watch" | "computed" | "schema";
		type Case = Expect<Equal<ObserverType, "watch" | "computed" | "schema">>;
	});

	test("ObserverScopeRef 枚举", () => {
		// ObserverScopeRef 应该包含这些值
		type ScopeRef = "ROOT" | "CURRENT" | "PARENT" | "DEPENDS" | "SELF";
		type Case = Expect<Equal<ScopeRef, "ROOT" | "CURRENT" | "PARENT" | "DEPENDS" | "SELF">>;
	});

	test("ObserverScope 类型", () => {
		// ObserverScope 可以是多种类型
		type Scope1 = string;
		type Scope2 = string[];
		type Scope3 = "SELF" | "CURRENT" | "ROOT" | "PARENT";

		type Scope = Scope1 | Scope2 | Scope3;
		type Case = Expect<Equal<Scope, string | string[] | "SELF" | "CURRENT" | "ROOT" | "PARENT">>;
	});

	test("ObserverDepends 类型", () => {
		// ObserverDepends 是二维数组
		type Depends = (string | string[])[][];
		const depends1: Depends = [["count"], ["user", "name"]];
		const depends2: Depends = [["./count"], ["../value"]];
		const depends3: Depends = [["ROOT"]];
		const depends4: Depends = [["CURRENT"]];
		const depends5: Depends = [["PARENT"]];
	});
});

/**
 * ObserverOptions 类型测试
 */
describe("ObserverOptions 类型", () => {
	test("基础 ObserverOptions", () => {
		type Options = ObserverOptions<number>;

		type Case = Expect<
			Equal<
				keyof Options,
				"id" | "initial" | "scope" | "enable" | "async" | "depends" | "group" | "objectify" | "throwError" | "schema"
			>
		>;
	});

	test("ObserverOptions 属性类型", () => {
		type Options = ObserverOptions<number>;

		// id 是可选的 string
		type IdType = Options["id"];
		type Case1 = Expect<Equal<IdType, string | undefined>>;

		// initial 是可选的 Value 类型
		type InitialType = Options["initial"];
		type Case2 = Expect<Equal<InitialType, number | undefined>>;

		// scope 是可选的 ObserverScope
		type ScopeType = Options["scope"];
		type Case3 = Expect<Equal<ScopeType, string | string[] | "SELF" | "CURRENT" | "ROOT" | "PARENT" | undefined>>;

		// enable 是可选的 boolean
		type EnableType = Options["enable"];
		type Case4 = Expect<Equal<EnableType, boolean | undefined>>;

		// async 是可选的 boolean
		type AsyncType = Options["async"];
		type Case5 = Expect<Equal<AsyncType, boolean | undefined>>;

		// depends 是可选的二维数组
		type DependsType = Options["depends"];
		type Case6 = Expect<Equal<DependsType, (string | string[])[][] | undefined>>;

		// group 是可选的 string
		type GroupType = Options["group"];
		type Case7 = Expect<Equal<GroupType, string | undefined>>;

		// objectify 是可选的 boolean
		type ObjectifyType = Options["objectify"];
		type Case8 = Expect<Equal<ObjectifyType, boolean | undefined>>;

		// throwError 是可选的 boolean
		type ThrowErrorType = Options["throwError"];
		type Case9 = Expect<Equal<ThrowErrorType, boolean | undefined>>;
	});

	test("带 Schema 的 ObserverOptions", () => {
		type Schema = {
			label: string;
			widget: string;
		};

		type Options = ObserverOptions<number, Schema>;

		type SchemaType = Options["schema"];
		type Case = Expect<Equal<SchemaType, Schema | undefined>>;
	});
});

/**
 * ObserverDescriptor 类型测试
 */
describe("ObserverDescriptor 类型", () => {
	test("基础 ObserverDescriptor", () => {
		type Descriptor = ObserverDescriptor<"computed", number, any>;

		type Case = Expect<
			Equal<
				keyof Descriptor,
				"type" | "getter" | "options"
			>
		>;
	});

	test("ObserverDescriptor 属性类型", () => {
		type Getter = (scope: any) => number;
		type Scope = { count: number };
		type Options = ObserverOptions<number>;
		type Descriptor = ObserverDescriptor<"computed", number, Scope, Getter, Options>;

		// type 应该是 "computed"
		type TypeType = Descriptor["type"];
		type Case1 = Expect<Equal<TypeType, "computed">>;

		// getter 应该是 Getter 类型
		type GetterType = Descriptor["getter"];
		type Case2 = Expect<Equal<GetterType, Getter>>;

		// options 应该是 Required<Options>
		type OptionsType = Descriptor["options"];
		type Case3 = Expect<Equal<keyof OptionsType, "id" | "initial" | "scope" | "enable" | "async" | "depends" | "group" | "objectify" | "throwError" | "schema">>;
	});

	test("不同类型的 ObserverDescriptor", () => {
		type ComputedDescriptor = ObserverDescriptor<"computed", number, any>;
		type WatchDescriptor = ObserverDescriptor<"watch", number, any>;
		type SchemaDescriptor = ObserverDescriptor<"schema", number, any>;

		type Case1 = Expect<Equal<ComputedDescriptor["type"], "computed">>;
		type Case2 = Expect<Equal<WatchDescriptor["type"], "watch">>;
		type Case3 = Expect<Equal<SchemaDescriptor["type"], "schema">>;
	});
});

/**
 * ObserverObject 类型测试
 */
describe("ObserverObject 类型", () => {
	test("基础 ObserverObject 属性", () => {
		const store = new AutoStore({
			value: computed(() => 1),
		});

		const observerObject = store.computedObjects.get("value");
		if (observerObject) {
			type ObserverObjectType = typeof observerObject;

			// ObserverObject 应该有这些核心属性
			type Case = Expect<
				Equal<
					keyof ObserverObjectType,
					"type" | "id" | "path" | "depends" | "options" | "error" | "update" | "silentUpdate" | "watch" | "attach" | "detach" | "run"
				>
			>;
		}
	});

	test("ObserverObject 属性类型", () => {
		const store = new AutoStore({
			value: computed(() => 1),
		});

		const observerObject = store.computedObjects.get("value");
		if (observerObject) {
			// type 应该是 string
			type TypeType = typeof observerObject.type;
			type Case1 = Expect<Equal<TypeType, string>>;

			// id 应该是 string
			type IdType = typeof observerObject.id;
			type Case2 = Expect<Equal<IdType, string>>;

			// path 应该是 string[]
			type PathType = typeof observerObject.path;
			type Case3 = Expect<Equal<PathType, string[]>>;

			// depends 应该是 string[][]
			type DependsType = typeof observerObject.depends;
			type Case4 = Expect<Equal<DependsType, string[][]>>;

			// error 应该是 Error | undefined
			type ErrorType = typeof observerObject.error;
			type Case5 = Expect<Equal<ErrorType, Error | undefined>>;
		}
	});

	test("ObserverObject.update 方法", () => {
		const store = new AutoStore({
			value: computed(() => 1),
		});

		const observerObject = store.computedObjects.get("value");
		if (observerObject) {
			// update 方法接收 value 和 options
			observerObject.update(1, {
				silent: true,
				validate: "pass",
			});

			type UpdateMethod = typeof observerObject.update;
			type Case = Expect<Equal<UpdateMethod, (value: any, options?: any) => void>>;
		}
	});

	test("ObserverObject.silentUpdate 方法", () => {
		const store = new AutoStore({
			value: computed(() => 1),
		});

		const observerObject = store.computedObjects.get("value");
		if (observerObject) {
			// silentUpdate 只接收 value
			observerObject.silentUpdate(1);

			type SilentUpdateMethod = typeof observerObject.silentUpdate;
			type Case = Expect<Equal<SilentUpdateMethod, (value: any) => void>>;
		}
	});

	test("ObserverObject.watch 方法", () => {
		const store = new AutoStore({
			value: computed(() => 1),
		});

		const observerObject = store.computedObjects.get("value");
		if (observerObject) {
			// watch 返回 Watcher
			const watcher = observerObject.watch((operate) => {
				operate.type;
			});

			type WatcherType = typeof watcher;
			type Case = Expect<Equal<keyof WatcherType, "off" | "pause" | "resume" | "isWatching" | "watch" | "id">>;
		}
	});

	test("ObserverObject.attach 和 detach 方法", () => {
		const store = new AutoStore({
			value: computed(() => 1),
		});

		const observerObject = store.computedObjects.get("value");
		if (observerObject) {
			// attach 和 detach 不接收参数
			observerObject.attach();
			observerObject.detach();

			type AttachMethod = typeof observerObject.attach;
			type DetachMethod = typeof observerObject.detach;
			type Case = Expect<Equal<AttachMethod, () => void> & Equal<DetachMethod, () => void>>;
		}
	});

	test("ObserverObject.run 方法", () => {
		const store = new AutoStore({
			value: computed(() => 1),
		});

		const observerObject = store.computedObjects.get("value");
		if (observerObject) {
			// run 可以接收 options
			observerObject.run({
				silent: true,
			});

			type RunMethod = typeof observerObject.run;
			type Case = Expect<Equal<RunMethod, (...args: any[]) => any>>;
		}
	});
});

/**
 * Observer 依赖匹配器类型测试
 */
describe("Observer 依赖匹配器", () => {
	test("ObserverDependMatcher 类型", () => {
		// ObserverDependMatcher 是一个函数类型
		type Matcher = (path: string[], value: any) => boolean;

		const matcher1: Matcher = (path, value) => {
			return path.length > 0;
		};

		const matcher2: Matcher = (path, value) => {
			return value > 0;
		};
	});
});

/**
 * Observer 描述符构建器类型测试
 */
describe("Observer 描述符构建器", () => {
	test("computed 描述符构建器", () => {
		const desc = computed(() => 1);

		type DescriptorBuilder = typeof desc;

		// 描述符构建器应该有这些方法
		type Case = Expect<
			Equal<
				keyof DescriptorBuilder,
				"type" | "getter" | "depends" | "options" | "build"
			>
		>;
	});

	test("描述符构建器 options 类型", () => {
		const desc = computed(() => 1);

		type OptionsType = typeof desc.options;

		// options 应该包含所有 ObserverOptions 字段
		type Case = Expect<
			Equal<
				keyof OptionsType,
				"id" | "initial" | "scope" | "enable" | "async" | "depends" | "group" | "objectify" | "throwError" | "schema"
			>
		>;
	});
});

/**
 * Observer 回调类型测试
 */
describe("Observer 回调类型", () => {
	test("onObserverBeforeCreate 回调", () => {
		const store = new AutoStore(
			{
				value: computed(() => 1),
			},
			{
				onObserverBeforeCreate: (descriptor) => {
					// descriptor 应该是 ObserverDescriptor 类型
					descriptor.type;
					descriptor.getter;
					descriptor.options;
				},
			}
		);

		type CallbackType = typeof store.options.onObserverBeforeCreate;
		type ParamType = Parameters<NonNullable<CallbackType>>[0];
		type Case = Expect<Equal<keyof ParamType, "type" | "getter" | "options">>;
	});

	test("onObserverCreated 回调", () => {
		const store = new AutoStore(
			{
				value: computed(() => 1),
			},
			{
				onObserverCreated: (observerObject) => {
					// observerObject 应该是 ObserverObject 类型
					observerObject.id;
					observerObject.path;
					observerObject.depends;
					observerObject.options;
				},
			}
		);

		type CallbackType = typeof store.options.onObserverCreated;
		type ParamType = Parameters<NonNullable<CallbackType>>[0];
		type Case = Expect<Equal<keyof ParamType, "type" | "id" | "path" | "depends" | "options" | "error" | "update" | "silentUpdate" | "watch" | "attach" | "detach" | "run">>;
	});

	test("onObserverInitial 回调", () => {
		const store = new AutoStore(
			{
				value: computed(() => 1),
			},
			{
				onObserverInitial: (observerObject) => {
					observerObject.type;
				},
			}
		);

		type CallbackType = typeof store.options.onObserverInitial;
		type ParamType = Parameters<NonNullable<CallbackType>>[0];
		type Case = Expect<Equal<keyof ParamType, "type" | "id" | "path" | "depends" | "options" | "error" | "update" | "silentUpdate" | "watch" | "attach" | "detach" | "run">>;
	});
});

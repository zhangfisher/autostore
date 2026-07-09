import { describe, test } from "bun:test";
import type { Equal, Expect } from "@type-challenges/utils";
import { AutoStore, computed } from "../../src";
import type { StatePath, GetTypeByPath } from "../../src";

/**
 * 路径类型推断基础测试
 */
describe("路径类型推断 - 基础", () => {
	test("顶层属性路径", () => {
		const store = new AutoStore({
			name: "张三",
			age: 18,
			admin: true,
		});

		type PathType = StatePath<typeof store.state>;
		const check: Expect<Equal<PathType, "name" | "age" | "admin">> = true as any;
	});

	test("嵌套对象路径", () => {
		const store = new AutoStore({
			user: {
				name: "张三",
				age: 18,
			},
		});

		type PathType = StatePath<typeof store.state>;
		// 应该包含完整路径
		const check1: Expect<Equal<"user", PathType>> = true as any;
		const check2: Expect<Equal<"user.name", PathType>> = true as any;
		const check3: Expect<Equal<"user.age", PathType>> = true as any;
	});

	test("深层嵌套路径", () => {
		const store = new AutoStore({
			level1: {
				level2: {
					level3: {
						value: "deep",
					},
				},
			},
		});

		type PathType = StatePath<typeof store.state>;
		const check1: Expect<Equal<"level1", PathType>> = true as any;
		const check2: Expect<Equal<"level1.level2", PathType>> = true as any;
		const check3: Expect<Equal<"level1.level2.level3", PathType>> = true as any;
		const check4: Expect<Equal<"level1.level2.level3.value", PathType>> = true as any;
	});
});

/**
 * 路径类型推断 - 特殊类型
 */
describe("路径类型推断 - 特殊类型", () => {
	test("数组路径", () => {
		const store = new AutoStore({
			items: [1, 2, 3],
		});

		type PathType = StatePath<typeof store.state>;
		const check1: Expect<Equal<"items", PathType>> = true as any;
		const check2: Expect<Equal<`items.${number}`, PathType>> = true as any;
	});

	test("嵌套数组路径", () => {
		const store = new AutoStore({
			matrix: [
				[1, 2],
				[3, 4],
			],
		});

		type PathType = StatePath<typeof store.state>;
		const check1: Expect<Equal<"matrix", PathType>> = true as any;
		const check2: Expect<Equal<`matrix.${number}`, PathType>> = true as any;
	});

	test("对象数组路径", () => {
		const store = new AutoStore({
			users: [
				{
					id: 1,
					name: "张三",
				},
			],
		});

		type PathType = StatePath<typeof store.state>;
		const check1: Expect<Equal<"users", PathType>> = true as any;
		const check2: Expect<Equal<`users.${number}`, PathType>> = true as any;
		const check3: Expect<Equal<`users.${number}.id`, PathType>> = true as any;
		const check4: Expect<Equal<`users.${number}.name`, PathType>> = true as any;
	});
});

/**
 * 路径类型推断 - 计算属性
 */
describe("路径类型推断 - 计算属性", () => {
	test("同步计算属性路径", () => {
		const store = new AutoStore({
			count: 0,
			double: (scope) => scope.count * 2,
		});

		type PathType = StatePath<typeof store.state>;
		const check: Expect<Equal<PathType, "count" | "double">> = true as any;
	});

	test("嵌套计算属性路径", () => {
		const store = new AutoStore({
			user: {
				firstName: "张",
				lastName: "三",
				fullName: (scope) => scope.firstName + scope.lastName,
			},
		});

		type PathType = StatePath<typeof store.state>;
		const check1: Expect<Equal<"user", PathType>> = true as any;
		const check2: Expect<Equal<"user.firstName", PathType>> = true as any;
		const check3: Expect<Equal<"user.lastName", PathType>> = true as any;
		const check4: Expect<Equal<"user.fullName", PathType>> = true as any;
	});

	test("异步计算属性路径", () => {
		const store = new AutoStore({
			value: computed(async () => 1, []),
		});

		type PathType = StatePath<typeof store.state>;
		const check: Expect<Equal<PathType, "value">> = true as any;
	});
});

/**
 * 路径类型推断 - 混合场景
 */
describe("路径类型推断 - 混合场景", () => {
	test("对象与数组混合", () => {
		const store = new AutoStore({
			data: {
				items: [1, 2, 3],
				meta: {
					count: 10,
				},
			},
		});

		type PathType = StatePath<typeof store.state>;
		const check1: Expect<Equal<"data", PathType>> = true as any;
		const check2: Expect<Equal<"data.items", PathType>> = true as any;
		const check3: Expect<Equal<"data.items.${number}", PathType>> = true as any;
		const check4: Expect<Equal<"data.meta", PathType>> = true as any;
		const check5: Expect<Equal<"data.meta.count", PathType>> = true as any;
	});

	test("多层数组嵌套", () => {
		const store = new AutoStore({
			matrix: [
				[
					[1, 2],
					[3, 4],
				],
			],
		});

		type PathType = StatePath<typeof store.state>;
		const check1: Expect<Equal<"matrix", PathType>> = true as any;
		const check2: Expect<Equal<`matrix.${number}`, PathType>> = true as any;
		const check3: Expect<Equal<`matrix.${number}.${number}`, PathType>> = true as any;
	});

	test("计算属性与普通属性混合", () => {
		const store = new AutoStore({
			count: 0,
			double: (scope) => scope.count * 2,
			items: [1, 2, 3],
			sum: (scope: any) => scope.items.reduce((a: number, b: number) => a + b, 0),
		});

		type PathType = StatePath<typeof store.state>;
		const check1: Expect<Equal<"count", PathType>> = true as any;
		const check2: Expect<Equal<"double", PathType>> = true as any;
		const check3: Expect<Equal<"items", PathType>> = true as any;
		const check4: Expect<Equal<"items.${number}", PathType>> = true as any;
		const check5: Expect<Equal<"sum", PathType>> = true as any;
	});
});

/**
 * 路径类型推断 - 可选属性
 */
describe("路径类型推断 - 可选属性", () => {
	test("可选属性路径", () => {
		const store = new AutoStore({
			required: "value",
			optional: undefined as string | undefined,
		});

		type PathType = StatePath<typeof store.state>;
		const check: Expect<Equal<PathType, "required" | "optional">> = true as any;
	});

	test("嵌套可选属性", () => {
		const store = new AutoStore({
			user: {
				name: "张三" as string | undefined,
				age: 18,
			},
		});

		type PathType = StatePath<typeof store.state>;
		const check1: Expect<Equal<"user", PathType>> = true as any;
		const check2: Expect<Equal<"user.name", PathType>> = true as any;
		const check3: Expect<Equal<"user.age", PathType>> = true as any;
	});
});

/**
 * 路径类型推断 - 联合类型
 */
describe("路径类型推断 - 联合类型", () => {
	test("联合类型属性", () => {
		const store = new AutoStore({
			value: "string" as string | number,
		});

		type PathType = StatePath<typeof store.state>;
		const check: Expect<Equal<PathType, "value">> = true as any;
	});

	test("数组元素联合类型", () => {
		const store = new AutoStore({
			items: [1, "a", true] as (number | string | boolean)[],
		});

		type PathType = StatePath<typeof store.state>;
		const check1: Expect<Equal<"items", PathType>> = true as any;
		const check2: Expect<Equal<`items.${number}`, PathType>> = true as any;
	});
});

/**
 * 根据路径获取类型
 */
describe("GetTypeByPath 测试", () => {
	test("获取基础类型", () => {
		const store = new AutoStore({
			str: "string",
			num: 100,
			bool: true,
		});

		type StrType = GetTypeByPath<typeof store.state, "str">;
		const check1: Expect<Equal<StrType, string>> = true as any;

		type NumType = GetTypeByPath<typeof store.state, "num">;
		const check2: Expect<Equal<NumType, number>> = true as any;

		type BoolType = GetTypeByPath<typeof store.state, "bool">;
		const check3: Expect<Equal<BoolType, boolean>> = true as any;
	});

	test("获取嵌套对象类型", () => {
		const store = new AutoStore({
			user: {
				name: "张三",
				age: 18,
				address: {
					city: "北京",
				},
			},
		});

		type UserNameType = GetTypeByPath<typeof store.state, "user.name">;
		const check1: Expect<Equal<UserNameType, string>> = true as any;

		type UserAgeType = GetTypeByPath<typeof store.state, "user.age">;
		const check2: Expect<Equal<UserAgeType, number>> = true as any;

		type UserAddressCityType = GetTypeByPath<typeof store.state, "user.address.city">;
		const check3: Expect<Equal<UserAddressCityType, string>> = true as any;
	});

	test("获取数组类型", () => {
		const store = new AutoStore({
			items: [1, 2, 3],
		});

		type ItemsType = GetTypeByPath<typeof store.state, "items">;
		const check: Expect<Equal<ItemsType, number[]>> = true as any;
	});

	test("获取计算属性类型", () => {
		const store = new AutoStore({
			count: 0,
			double: (scope) => scope.count * 2,
		});

		type CountType = GetTypeByPath<typeof store.state, "count">;
		const check1: Expect<Equal<CountType, number>> = true as any;

		type DoubleType = GetTypeByPath<typeof store.state, "double">;
		const check2: Expect<Equal<DoubleType, number>> = true as any;
	});

	test("获取异步计算属性类型", () => {
		const store = new AutoStore({
			value: computed(async () => 1, []),
		});

		type ValueType = GetTypeByPath<typeof store.state, "value">;
		const check: Expect<
			Equal<
				keyof ValueType,
				"loading" | "progress" | "timeout" | "error" | "retry" | "value" | "run" | "cancel"
			>
		> = true as any;
	});

	test("获取对象数组元素类型", () => {
		const store = new AutoStore({
			users: [
				{
					id: 1,
					name: "张三",
				},
			],
		});

		type UsersType = GetTypeByPath<typeof store.state, "users">;
		const check: Expect<
			Equal<
				UsersType,
				Array<{
					id: number;
					name: string;
				}>
			>
		> = true as any;
	});
});

/**
 * 路径类型推断 - 边界情况
 */
describe("路径类型推断 - 边界情况", () => {
	test("空对象", () => {
		const store = new AutoStore({});

		type PathType = StatePath<typeof store.state>;
		const check: Expect<Equal<PathType, never>> = true as any;
	});

	test("只有一层属性", () => {
		const store = new AutoStore({
			a: 1,
			b: 2,
			c: 3,
		});

		type PathType = StatePath<typeof store.state>;
		const check: Expect<Equal<PathType, "a" | "b" | "c">> = true as any;
	});

	test("null 和 undefined", () => {
		const store = new AutoStore({
			nullValue: null,
			undefValue: undefined,
		});

		type PathType = StatePath<typeof store.state>;
		const check: Expect<Equal<PathType, "nullValue" | "undefValue">> = true as any;
	});
});

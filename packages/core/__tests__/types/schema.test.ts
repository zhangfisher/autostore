import { describe, expect, test } from "vitest";
import type { Equal, Expect } from "@type-challenges/utils";
import { AutoStore, computed, configurable, type ConfigurableState } from "../../src";

describe("Schema类型", () => {
	test("Schmea路径", () => {
		const store = new AutoStore({
			user: {
				name: configurable("张三"),
				age: configurable(18),
				admin: configurable(true),
				address: {
					city: configurable("北京"),
					street: "长安街",
				},
				tags: [configurable("其他")],
			},
		});

		store.state;

		type KeyCase = Expect<
			Equal<
				typeof store.types.schemaKeys,
				"user.name" | "user.age" | "user.admin" | "user.address.city" | `user.tags.${number}`
			>
		>;
		// 获取配置项
		type GetType = Parameters<typeof store.schemas.get>[0];

		type KeyCase2 = Expect<Equal<typeof store.types.schemaKeys, GetType>>;
	});
	test("Schmea状态", () => {
		const store = new AutoStore({
			user: {
				name: configurable("张三"),
				age: configurable(18),
				admin: configurable(true),
				address: {
					city: configurable("北京"),
					street: "长安街",
				},
				z: computed(async () => {
					return 1;
				}, ["a"]),
			},
		});

		store.state.user.name;
		store.state.user.z;
		type Keys = typeof store.types.schemas;
		type KeyCase = Expect<
			Equal<
				typeof store.types.schemas,
				{
					"user.name": string;
					"user.age": number;
					"user.admin": boolean;
					"user.address.city": string;
				}
			>
		>;
	});
	test("当schema为数组时，获取Schmea状态", () => {
		class ModuleBase {}

		type MergeModuleSettings<T extends Record<string, any>> = {
			[K in keyof T]: T[K] extends ModuleBase ? ConfigurableState<T[K]["state"]> : T[K];
		};

		class MyModule extends ModuleBase {
			// state = state({
			// 	x: {
			// 		user: configurable([1, 2, 3]),
			// 	},
			// 	info: {
			// 		x1: configurable<number>(1),
			// 		x2: configurable(true),
			// 		x3: configurable(""),
			// 		x4: configurable<number[]>([1, 2, 3]),
			// 		x5: configurable({ a: 1 }),
			// 	},
			// });
		}

		interface VoerkaModules {
			my: MyModule;
		}

		interface VoerkaSettings extends MergeModuleSettings<VoerkaModules> {}

		type SchemaType = keyof VoerkaSettings["my"];

		const moduel1 = new MyModule();

		// const store = new AutoStore(state);
		// type Cases = [
		// 	Expect<
		// 		Equal<
		// 			SchemaType,
		// 			{
		// 				"x.user": number[];
		// 			}
		// 		>
		// 	>,
		// ];
		// const operates: any[] = [];
		// store.watch(
		// 	(operate) => {
		// 		operates.push(operate);
		// 	},
		// 	{ operates: "write" },
		// );
	});
	// test("获取指定路径的Schmea状态", () => {
	//     const store = new AutoStore({
	//         user: {
	//             name: configurable("张三", {
	//                 label: '姓名',
	//                 placeholder: '请输入姓名',
	//                 invalidTips: '姓名长度必须大于3个字符',
	//                 required: computed(() => true),
	//                 enable: computed<boolean>(
	//                     async (state: any) => state.user.admin,
	//                     ['user.admin']
	//                 )
	//             }),
	//             age: configurable(18),
	//             admin: configurable(true),
	//             address: {
	//                 city: configurable("北京"),
	//                 street: "长安街"
	//             }
	//         }
	//     })
	//     store.schemas.store.state["user.name"]
	//     type userNameType = typeof store.schemas.store.state["user.name"]
	//     type NameCase = Expect<
	//         Equal<
	//             typeof store.schemas.store.state["user.name"],
	//             {
	//                 value: string
	//                 path: string[]
	//                 label: string
	//                 placeholder: string
	//                 invalidTips: string
	//                 required: boolean
	//                 enable: AsyncComputedValue<boolean>
	//             }
	//         >
	//     >

	//     const userName = store.schemas.get('user.name')
	//     type GetNameCase = Expect<
	//         Equal<
	//             typeof userName,
	//             {
	//                 value: string
	//                 path: string[]
	//                 label: string
	//                 placeholder: string
	//                 invalidTips: string
	//                 required: boolean
	//                 enable: AsyncComputedValue<boolean>
	//             } | undefined
	//         >
	//     >
	//     type NameCases = Expect<
	//         Equal<
	//             typeof store.schemas.store.state['user.name'],
	//             Exclude<typeof userName, undefined>
	//         >
	//     >
	// })
	// test("获取校验器", () => {
	//     const store = new AutoStore({
	//         user: {
	//             name: configurable("张三", {
	//                 onValidate: (value: any) => {
	//                     return value > 0
	//                 }
	//             }),
	//             age: configurable(18),
	//             admin: configurable(true),
	//             address: {
	//                 city: configurable("北京"),
	//                 street: "长安街"
	//             }
	//         }
	//     })
	//     const validator = store.schemas.getValidator('user.name')

	//     type NameValidatorType = Exclude<typeof validator, undefined>
	//     type NameCases = Expect<
	//         Equal<
	//             NameValidatorType,
	//             {
	//                 validate: SchemaValidate<boolean>;
	//                 onFail: "pass" | "throw" | "ignore";
	//                 message?: string | ((e: Error, path: string, newValue: boolean, oldValue: boolean) => string) | undefined
	//             }
	//         >
	//     >

	// })

	// test("动态增加schema", () => {
	//     const store = new AutoStore({
	//         user: {
	//             name: "张三",
	//         }
	//     })
	//     const newSchema = store.schemas.add("sss", {
	//         label: '姓名',
	//         placeholder: '请输入姓名',
	//         invalidTips: '姓名长度必须大于3个字符',
	//         required: computed(() => true),
	//         enable: computed<boolean>(
	//             async (state: any) => state.user.admin,
	//             ['user.admin']
	//         )
	//     })
	//     newSchema.label
	//     newSchema.placeholder
	//     newSchema.placeholder
	//     newSchema.invalidTips
	//     newSchema.required
	//     newSchema.enable
	//     type cases = Expect<
	//         Equal<
	//             typeof newSchema,
	//             {
	//                 label: string;
	//                 placeholder: string;
	//                 invalidTips: string;
	//                 required: boolean;
	//                 enable: AsyncComputedValue<boolean>;
	//             }
	//         >
	//     >
	// })
});

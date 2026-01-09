import { describe, test, it, expect, mock, beforeAll, afterAll, beforeEach, afterEach } from "bun:test"

import { configurable, s, schema } from "../src/schema";
import { AutoStore, type StateOperate } from "../src/store";
import { computed, delay, setVal, ValidateError } from "../src";

describe("validator", () => {
	test("number initial", () => {
		const store = new AutoStore({
			order: {
				price: s.number(100, { onValidate: (val: any) => val > 10 }),
			},
		});
		expect(store.state.order.price).toBe(100);
		expect(store.schemas.has("order.price")).toBeTruthy();
	});
	test("赋值时校验出错默认触发ValidateError", () => {
		const store = new AutoStore({
			order: {
				price: s.number(100, { onValidate: (val: any) => val > 10 }),
			},
		});
		expect(store.state.order.price).toBe(100);
		expect(() => {
			store.state.order.price = 10;
		}).toThrow(ValidateError);
		expect(store.state.order.price).toBe(10);
	});

	test("赋值时校验出错时不触发错误忽略", () => {
		const store = new AutoStore({
			order: {
				price: s.number(100, {
					onValidate: (val: any) => val > 10,
					onFail: "ignore",
				}),
			},
		});
		expect(store.state.order.price).toBe(100);
		expect(() => {
			store.state.order.price = 10;
		}).not.toThrow(ValidateError);
		expect(store.state.order.price).toBe(100);
	});
	// ignore忽略错误也不写入，而pass则是写入，但是将错误信息写入到errors中
	test("赋值时校验出错时不触发错误放行", () => {
		const store = new AutoStore({
			order: {
				price: s.number(100, {
					onValidate: (val: any) => val > 10,
					onFail: "pass",
				}),
			},
		});
		expect(store.state.order.price).toBe(100);
		expect(() => {
			store.state.order.price = 10;
		}).not.toThrow(ValidateError);
		expect(store.state.order.price).toBe(10);
		expect("order.price" in store.schemas.errors).toBe(true);
	});

	test("自定义校验提示", () => {
		const store = new AutoStore({
			order: {
				price: s.number(100, {
					onValidate: (val: any) => val > 10,
					invalidTips: "价格必须大于10",
				}),
			},
		});
		expect(store.state.order.price).toBe(100);
		store.schemas.has("order.price");
		try {
			store.state.order.price = 10;
		} catch (e: any) {
			expect(e).toBeInstanceOf(ValidateError);
			expect(e.message).toBe("价格必须大于10");
			expect(store.schemas.errors["order.price"]).toBe("价格必须大于10");
		}
	});
	test("校验提示信息可以使用插值变量", () => {
		const store = new AutoStore({
			order: {
				price: s.number(100, {
					onValidate: (val: any) => val > 10,
					invalidTips: "价格必须大于10({label})",
					label: "注意",
				}),
			},
		});
		expect(store.state.order.price).toBe(100);
		store.schemas.has("order.price");
		try {
			store.state.order.price = 10;
		} catch (e: any) {
			expect(e).toBeInstanceOf(ValidateError);
			expect(e.message).toBe("价格必须大于10(注意)");
			expect(store.schemas.errors["order.price"]).toBe("价格必须大于10(注意)");
		}
	});

	test("使自定义用函数校验提示", () => {
		const store = new AutoStore({
			order: {
				price: s.number(100, {
					onValidate: (val: any) => val > 10,
					invalidTips: "价格必须大于10",
				}),
			},
		});
		expect(store.state.order.price).toBe(100);
		store.schemas.has("order.price");
		try {
			store.state.order.price = 10;
		} catch (e: any) {
			expect(e).toBeInstanceOf(ValidateError);
			expect(e.message).toBe("价格必须大于10");
			expect(store.schemas.errors["order.price"]).toBe("价格必须大于10");
		}
	});
	test("通过err.message返回校验错误信息", () => {
		const store = new AutoStore({
			order: {
				price: s.number(100, {
					onValidate: (val: any) => {
						if (val < 10) {
							throw new ValidateError("价格必须大于10");
						}
						return true;
					},
				}),
			},
		});
		expect(store.state.order.price).toBe(100);
		store.schemas.has("order.price");
		try {
			store.state.order.price = 10;
		} catch (e: any) {
			expect(e).toBeInstanceOf(ValidateError);
			expect(e.message).toBe("价格必须大于10");
			expect(store.schemas.errors["order.price"]).toBe("价格必须大于10");
		}
	});
	test("使用onValidate全局校验", () => {
		const store = new AutoStore(
			{
				order: {
					price: 100,
				},
			},
			{
				onValidate: (path, newVal, oldVal) => {
					expect(path).toEqual(["order", "price"]);
					expect(newVal).toBe(10);
					expect(oldVal).toBe(100);
					return newVal > 10;
				},
			},
		);
		expect(store.state.order.price).toBe(100);
		try {
			store.state.order.price = 5;
		} catch (e: any) {
			expect(e).toBeInstanceOf(ValidateError);
			expect("order.price" in store.schemas.errors).toBe(true);
		}
	});

	test("configurable状态时提供默认值", () => {
		const store = new AutoStore({
			order: {
				name: configurable("order"),
				price: configurable(10),
				count: configurable(2),
				pay: configurable(true),
			},
		});
		expect(store.state.order.name).toBe("order");
		expect(store.state.order.price).toBe(10);
		expect(store.state.order.count).toBe(2);
		expect(store.state.order.pay).toBe(true);
	});
	test("configurable提供额外的配置选项", () => {
		const store = new AutoStore({
			order: {
				name: configurable("order", {
					label: "订单名称",
					description: "订单描述",
					placeholder: "请输入订单名称",
					required: true,
				}),
				price: configurable(10),
				count: configurable(2),
				pay: configurable(true),
			},
		});
		const nameSchema = store.schemas.get("order.name")!;
		expect(nameSchema.label).toBe("订单名称");
		expect(nameSchema.description).toBe("订单描述");
		expect(nameSchema.placeholder).toBe("请输入订单名称");
		expect(nameSchema.required).toBe(true);
	});
	test("configurable使用同步计算配置选项", () => {
		const store = new AutoStore({
			order: {
				price: configurable(10),
				count: configurable(0),
				pay: configurable(true, {
					enable: computed((state) => {
						return state.order.count > 0;
					}),
				}),
			},
		});
		const paySchema = store.schemas.get("order.pay")!;
		expect(paySchema.enable).toBe(false);
		store.state.order.count = 1;
		expect(paySchema.enable).toBe(true);
	});

	test("configurable使用异步计算配置选项", () => {
		return new Promise<void>((resolve) => {
			const paths: any[] = [],
				values: any[] = [];
			const store = new AutoStore({
				order: {
					price: configurable(10),
					count: configurable(0),
					pay: configurable(true, {
						enable: computed(
							async (state) => {
								await delay(100);
								return state.order.count > 0;
							},
							["order.count"],
						),
					}),
				},
			});
			store.schemas.store.on("computed:done", ({ path, value }) => {
				paths.push(path);
				values.push(value);
				if (paths.length === 1) {
					store.state.order.count = 1;
				} else if (paths.length === 2) {
					expect(paths).toEqual([
						["order_$_pay", "enable"],
						["order_$_pay", "enable"],
					]);
					expect(values).toEqual([false, true]);
					resolve();
				}
			});
		});
	});

	test("监听使用schema装饰的值变化", () => {
		return new Promise<void>((resolve) => {
			const store = new AutoStore({
				order: {
					price: s.number(100, {
						onValidate: (val: any) => val > 10,
					}),
				},
			});

			store.watch((operate: StateOperate) => {
				expect(operate.path).toEqual(["order", "price"]);
				expect(operate.value).toBe(101);
				resolve();
			});
			setVal(store.state, ["order", "price"], 101);
			// store.state.order.price = 101
		});
	});
	test("schema数据是一个计算函数", () => {
		return new Promise<void>((resolve) => {
			const store = new AutoStore({
				order: {
					price: configurable(10),
					visiable: configurable(true, {
						enable: computed((state) => {
							return (state.order.price > 20) as boolean;
						}),
					}),
				},
			});
			store.on("schema:updated", (schema) => {
				expect(schema.enable).toBe(true);
			});
			const schmea = store.schemas.get("order.visiable")!;
			expect(schmea.enable).toBe(false);
			setVal(store.state, ["order", "price"], 101);
			expect(schmea.enable).toBe(true);
			resolve();
		});
	});
	test("schema数据是一个异步计算函数", () => {
		return new Promise<void>((resolve) => {
			const store = new AutoStore({
				order: {
					price: configurable(10),
					visiable: configurable(true, {
						enable: computed(
							async (state) => {
								await new Promise((resolve) => setTimeout(resolve, 10));
								return state.order.price > 20;
							},
							["order.price"],
							{
								initial: false,
							},
						),
					}),
				},
			});
			const values: any[] = [];
			store.on("schema:updated", (schema) => {
				values.push((schema.enable as any).value);
			});

			const schmea = store.schemas.get("order.visiable")!;
			store.state.order.price = 101;
			setTimeout(() => {
				expect((schmea.enable as any).value).toBe(true);
				resolve();
			}, 200);
		});
	});
	test("监听shadow的store的异步属性", () => {
		return new Promise<void>((resolve) => {
			const store = new AutoStore({
				order: {
					price: configurable(10),
					visiable: configurable(true, {
						enable: computed(
							async (state) => {
								await new Promise((resolve) => setTimeout(resolve, 100));
								return state.order.price > 20;
							},
							["order.price"],
							{
								initial: false,
							},
						),
					}),
				},
			});
			store.schemas.store.watch("order_$_visiable.enable.value", (op) => {
				expect(op.value).toBeTruthy();
				resolve();
			});
			store.state.order.price = 101;
		});
	});
	test("使用schemas.add方式增加校验", () => {
		const store = new AutoStore({
			order: {
				price: 100,
			},
		});
		store.schemas.add(
			"order.price",
			s.number(100, {
				onValidate: (val: any) => val > 10,
				onFail: "pass",
			}),
		);

		expect(store.state.order.price).toBe(100);
		expect(() => {
			store.state.order.price = 10;
		}).not.toThrow(ValidateError);
		expect(store.state.order.price).toBe(10);
		expect("order.price" in store.schemas.errors).toBe(true);
	});
	test("使用find获取schema", () => {
		return new Promise<void>((resolve) => {
			const store = new AutoStore({
				order: {
					price: configurable(10),
					count: configurable(0),
					pay: configurable(true, {
						enable: computed(
							async (state) => {
								await delay(100);
								return state.order.count > 0;
							},
							["order.count"],
						),
					}),
				},
			});
			const orders = store.schemas.find(["order"]);
			const pay = store.schemas.find(["order", "pay"]);
			expect(orders.length).toBe(3);
			expect(pay.length).toBe(1);
			resolve();
		});
	});
	test("动态添加schema", () => {
		return new Promise<void>((resolve) => {
			const store = new AutoStore({
				order: {
					price: 100,
				},
			});

			store.schemas.add(
				"order.price",
				schema(100, {
					onValidate: (val: any) => val > 10,
				}),
			);

			store.watch((operate: StateOperate) => {
				expect(operate.path).toEqual(["order", "price"]);
				expect(operate.value).toBe(101);
				resolve();
			});
			setVal(store.state, ["order", "price"], 101);
			// store.state.order.price = 101
		});
	});
	test("schema数据中包括数组", () => {
		return new Promise<void>((resolve) => {
			const store = new AutoStore({
				order: {
					users: configurable([], {
						label: "成员",
						widget: "checkbox-group",
						select: [
							{ label: "产品1", value: 1 },
							{ label: "产品2", value: 2 },
							{ label: "产品3", value: 3 },
						],
					}),
				},
			});
			expect(store.schemas.has(["order", "users"])).toBeTruthy();
			resolve();
		});
	});
});

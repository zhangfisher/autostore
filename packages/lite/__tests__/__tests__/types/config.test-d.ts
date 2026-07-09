// import { describe, test, it, expect } from "bun:test";
// import type { Equal, Expect } from "@type-challenges/utils";
// import { AutoStore, computed, ConfigManager, configurable } from "../../src";
// import type {
//     ObserverObject,
//     ObserverOptions,
//     ObserverDescriptor,
//     ConfigurableState,
//     StoreRawStateType,
// } from "../../src";
// import { AutoStoreConfigures } from "../../src/schema/types";

// const configManager = new ConfigManager({
//     load: () => {
//         return {};
//     },
// });
// const orderStore = new AutoStore(
//     {
//         order: {
//             price: configurable(99.9, {
//                 label: "订单价格",
//                 validate: (value) => value > 0,
//             }),
//             quantity: configurable(10, {
//                 label: "订单数量",
//                 validate: (value) => value > 0,
//             }),
//         },
//     },
//     {
//         configManager,
//         configKey: "app1",
//     },
// );

// type orderStoreTypes = typeof orderStore.types;
// type orderStoreTypeKeys = keyof orderStoreTypes;
// type orderStoreRawState = typeof orderStore.types.rawState;
// type orderStoreEvents = keyof typeof orderStore.types.events;
// type orderRawType = StoreRawStateType<typeof orderStore>;

// const userStore = new AutoStore(
//     {
//         user: {
//             name: configurable("Bob", {
//                 label: "用户名",
//                 validate: (value) => typeof value === "string" && value.length > 0,
//             }),
//             age: configurable(25, {
//                 label: "年龄",
//                 validate: (value) => value >= 0 && value <= 150,
//             }),
//         },
//     },
//     {
//         configManager,
//         configKey: "app2",
//     },
// );

// const shopStore = new AutoStore(
//     {
//         shop: {
//             discount: configurable(0.1, {
//                 label: "折扣",
//                 validate: (value) => value >= 0 && value < 1,
//             }),
//             tax: configurable(0.05, {
//                 label: "税率",
//                 widget: "number",
//                 max: 1,
//                 min: 2,
//                 validate: (value) => value >= 0 && value < 1,
//             }),
//         },
//     },
//     {
//         configManager,
//         configKey: "app3",
//     },
// );
// type orderStoreConfigurableState = ConfigurableState<typeof orderStore, "app1">;
// type userConfigurableState = ConfigurableState<typeof userStore, "app2">;
// type ShopConfigurableState = ConfigurableState<typeof shopStore>;

// declare module "autostore" {
//     interface AutoStoreConfigures
//         extends orderStoreConfigurableState, userConfigurableState, ShopConfigurableState {}
//     interface AutoStoreWidgets {
//         number: {
//             max: number;
//             min: number;
//             step?: number;
//         };
//         text: {
//             maxLength?: number;
//             minLength?: number;
//             pattern?: RegExp | string;
//             rows?: number;
//             multiline?: boolean;
//         };
//         select: {
//             options: Array<{ label: string; value: any; disabled?: boolean }>;
//             multiple?: boolean;
//         };
//         checkbox: {
//             trueValue?: any;
//             falseValue?: any;
//             indeterminate?: boolean;
//         };
//     }
// }
// AutoStoreConfigManager.state["app1.order.price"].value;

// // ========== Widget 属性类型推断测试 ==========
// // 验证 ConfigurableState 正确包含 widget 特定配置属性

// type TestNumberWidget = ConfigurableState<typeof shopStore, "app3">;

// // 验证 number widget 的属性类型存在且正确
// type _Test1 = Expect<Equal<TestNumberWidget["app3.shop.tax"]["min"], number>>;
// type _Test2 = Expect<Equal<TestNumberWidget["app3.shop.tax"]["max"], number>>;
// type _Test3 = Expect<Equal<TestNumberWidget["app3.shop.tax"]["step"], number | undefined>>;

// // 验证没有前缀的配置类型
// type TestNumberWidgetNoPrefix = ConfigurableState<typeof shopStore, "">;
// type _Test4 = Expect<Equal<TestNumberWidgetNoPrefix["shop.tax"]["min"], number>>;
// type _Test5 = Expect<Equal<TestNumberWidgetNoPrefix["shop.tax"]["max"], number>>;

// // 验证实际使用场景的类型推断 - 通过 AutoStoreConfigManager 访问
// // 注意：需要在 AutoStoreConfigures 中包含对应的键才能正常访问
// AutoStoreConfigManager.state["shop.tax"].min;
// AutoStoreConfigManager.state["shop.tax"].max;
// AutoStoreConfigManager.state["shop.tax"].step;

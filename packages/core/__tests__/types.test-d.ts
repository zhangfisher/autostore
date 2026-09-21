/** biome-ignore-all lint/correctness/noUnusedVariables: <noUnusedVariables> */
import type { Equal, Expect } from "@type-challenges/utils";
import type { ComputedState, Dict, GetTypeByPath, StatePath } from "../src/types/";
import { configurable, s, schema, type ConfigurableKeyPaths } from "../src/schema";
import { AutoStore } from "../src/store";
import { computed } from "../src";
import type { Get } from "type-fest";

const stt = {
    title: "姓名",
    placeholder: "请输入姓名",
    errorTips: "姓名长度必须大于3个字符",
    enable: computed((state) => {
        return state.user.admin as boolean;
    }),
    required: computed(
        async (state) => {
            return state.user.admin;
        },
        ["user.admin"],
    ),

    tags: [computed(() => "fisher")],
};

type sst = ComputedState<typeof stt>;

const obj = {
    price: schema<number>(100),
    tags: s.array<number[]>([1, 2]),
    address: configurable({
        city: "QuanZhou",
        post: 1234,
        street: "FenZhei",
    }),
    customer: {
        name: s.string("zhang"),
        age: s.number<number>(18),
        address: "ss",
    },
    products: ["fisher", configurable("100")],
};
const store = new AutoStore(obj);
store.state.price;

// 示例测试
type RawState = typeof obj;
type addressType = RawState["address"];
type s2 = StatePath<RawState>;
type sf = ConfigurableKeyPaths<RawState>;
type sdf = GetTypeByPath<RawState, "address">;
type sdf2 = GetTypeByPath<RawState, "address.post">;

type dd = Get<RawState, "address">;

type d = ComputedState<RawState>;

type State = ComputedState<typeof obj>;

const objState = obj as unknown as State;

objState.price;
objState.tags;
objState.address;
objState.address.city;
objState.address.post;
objState.address.street;
objState.customer.name;
objState.customer.age;

type cases = [
    Expect<Equal<State["price"], number>>,
    Expect<Equal<State["tags"], number[]>>,
    Expect<
        Equal<
            State["address"],
            {
                city: string;
                post: number;
                street: string;
            }
        >
    >,
    // Expect<Equal<SchemaState<RawState>, {
    //     tags: number[]
    //     price: number
    //     address: {
    //         city: string
    //         post: number
    //         street: string;
    //     }
    //     "customer.name": string
    //     "customer.age": number
    // }>>
];

const store2 = new AutoStore({
    order: {
        name: configurable("autostore"),
        price: configurable(10),
        count: configurable(2),
        pay: configurable(true),
        total: computed<number>((scope) => scope.price * scope.count),
    },
});
store2.state.order.name;
store2.state.order.price;
store2.state.order.total;

function state<State extends Dict<any>>(state: State) {
    return state as ComputedState<State>;
}
class MyState {
    state = state({
        order: {
            name: configurable("autostore"),
            price: configurable(10),
            count: configurable(2),
            pay: configurable(true),
            total: computed<number>((scope) => scope.price * scope.count),
        },
    });
    constructor() {}
    test() {
        this.reactive.order.name;
        this.reactive.order.name;
        this.reactive.order.total;

        this.store.state.order.name;
        this.store.state.order.name;
        this.store.state.order.total;

        this.state.order.price;
    }
    private _store?: AutoStore<any>;
    get store() {
        return this._store! as AutoStore<this["state"]>;
    }
    get reactive() {
        return this.store.state; //as ComputedState<this['state']>
    }
}

const mys = new MyState();

mys.reactive.order.name;

/**
 * Widget 类型提取测试
 * 验证 widget 字段从 AutoStoreWidgets 提取类型
 * 并且当 AutoStoreWidgets 为空时回退到 string
 */
import type { AutoStoreStateSchema, AutoStoreWidgetTypes } from "../src/schema/types";

// 测试 1: 验证 AutoStoreWidgetTypes 是 "number" 类型
type WidgetTypeTest = AutoStoreWidgetTypes;
const _widgetTypeCheck: WidgetTypeTest = "number"; // ✅

// 测试 2: widget 可以是 "number"
const _validWidget: AutoStoreStateSchema<number, "number"> = {
    widget: "number", // ✅ 应该通过类型检查
    min: 0,
    max: 100,
    value: 50,
};

// 测试 3: widget 特定配置的类型推断
type NumberWidgetConfig = AutoStoreStateSchema<number, "number">;
const numberSchema: NumberWidgetConfig = {
    widget: "number",
    min: 0, // ✅ 类型推断正确
    max: 100, // ✅ 类型推断正确
    step: 1, // ✅ 可选字段
    value: 50,
};

type WidgetConfigTests = [
    Expect<Equal<typeof numberSchema.min, number | undefined>>,
    Expect<Equal<typeof numberSchema.max, number | undefined>>,
    Expect<Equal<typeof numberSchema.step, number | undefined>>,
];

/**
 * shallow 浅响应类型测试
 * 验证 ComputedState 对 shallow 标记值的短路分发与单层转换(见 ADR-0006)
 */
import { shallow } from "../src/decorators/shallow";
import type { ShallowState } from "../src/types/";

const shallowState = {
    a: shallow({
        b: 1,
        c: { c1: 1 },
        total: (scope: { b: number }) => scope.b * 2,
    }),
    x: [1, 2, 3],
};
type ShallowS = ComputedState<typeof shallowState>;

type shallowCases = [
    // 标记对象直接成员: 函数 → 计算结果, 普通值原样
    Expect<Equal<ShallowS["a"]["b"], number>>,
    Expect<Equal<ShallowS["a"]["total"], number>>,
    // 嵌套成员不递归: 原样保留(与运行时读出 raw 一致)
    Expect<Equal<ShallowS["a"]["c"], { c1: number }>>,
    // 标记仅作用于被标记对象: 普通路径照常
    Expect<Equal<ShallowS["x"], number[]>>,
    // ShallowState 独立使用: 函数成员转计算结果
    Expect<
        Equal<
            ShallowState<{ n: number; f: (scope: any) => string }>,
            { n: number; f: string }
        >
    >,
];

// 运行时冒烟: shallow 值可正常进入状态树
const shallowStore = new AutoStore(shallowState);
shallowStore.state.a.b;
shallowStore.state.a.total;
shallowStore.state.a.c.c1;
shallowStore.state.x[1];

/**
 * shallow deep=1 类型测试
 * 验证根+成员两层浅代理的类型映射(见 ADR-0007):
 * 成员的函数成员 → 计算结果类型, 孙级原样保留
 */
const shallowDeepState = {
    // 数组根: 元素(成员)获得浅代理
    items: shallow(
        [
            {
                id: 1,
                meta: { x: 1 },
                total: (scope: { id: number }) => scope.id * 2,
            },
        ],
        1,
    ),
    // 对象根: 成员对象再下钻一层
    obj: shallow(
        { row: { id: 1, label: (scope: { id: number }) => `#${scope.id}` } },
        1,
    ),
};
type ShallowDeepS = ComputedState<typeof shallowDeepState>;

// 对象根且成员为数组: 数组元素(孙级)读出即 raw
const shallowDeepObjArr = {
    a: shallow({ list: [{ id: 1, f: (scope: any) => "x" }] }, 1),
};

type shallowDeepCases = [
    // 数组根: 元素的函数成员 → 计算结果
    Expect<Equal<ShallowDeepS["items"][number]["total"], number>>,
    // 数组根: 元素的嵌套对象(孙级)原样保留
    Expect<Equal<ShallowDeepS["items"][number]["meta"], { x: number }>>,
    // 对象根: 成员对象的函数成员 → 计算结果
    Expect<Equal<ShallowDeepS["obj"]["row"]["label"], string>>,
    // 对象根: 成员对象的普通成员(孙级)原样保留
    Expect<Equal<ShallowDeepS["obj"]["row"]["id"], number>>,
    // 对象根: 成员为数组时其元素(孙级)读出即 raw, 函数成员保持函数类型
    // (泛型推断保留字面量返回类型 "x", 不拓宽)
    Expect<
        Equal<
            ComputedState<typeof shallowDeepObjArr>["a"]["list"][number]["f"],
            (scope: any) => "x"
        >
    >,
];

// 运行时冒烟: deep=1 值可正常进入状态树
const shallowDeepStore = new AutoStore(shallowDeepState);
shallowDeepStore.state.items[0].total;
shallowDeepStore.state.obj.row.label;

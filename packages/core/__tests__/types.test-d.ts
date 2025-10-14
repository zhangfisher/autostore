import { Equal, Expect } from "@type-challenges/utils";
import { ComputedState, Dict, GetTypeByPath, StatePath } from "../src/types/";
import { configurable, s, schema, SchemaState, SchemaKeyPaths } from "../src/schema";
import { AutoStore } from "../src/store";
import { computed } from "../src";
import { Get } from "type-fest";

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
type s = SchemaState<RawState>;
type s2 = StatePath<RawState>;
type sf = SchemaKeyPaths<RawState>;
type sdf = GetTypeByPath<RawState, "address">;
type sdf2 = GetTypeByPath<RawState, "address.post">;

type dd = Get<RawState, "address">;

type d = ComputedState<RawState>;

type State = ComputedState<typeof obj>;

let objState = obj as unknown as State;

objState.price;
objState.tags;
objState.address;
objState.address.city;
objState.address.post;
objState.address.street;
objState.customer.name;
objState.customer.age;

// eslint-disable-next-line
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

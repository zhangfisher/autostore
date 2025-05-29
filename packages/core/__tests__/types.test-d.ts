import { Equal, Expect } from "@type-challenges/utils"
import { ComputedState, Dict } from "../src/types";
import { configurable, ConfigurableState, s, schema, SchemaState } from "../src/schema";
import { AutoStore } from "../src/store";
import { computed } from "../src";


const obj = {
    price: schema<number>(100),
    tags: s.array<number>([1, 2]),
    address: s.object({
        city: "QuanZhou",
        post: 1234,
        street: "FenZhei"
    }),
    customer: {
        name: s.string("zhang"),
        age: s.number<number>(18)
    }
}
const store = new AutoStore(obj)
store.state.price

// 示例测试
type RawState = typeof obj


type d = ConfigurableState<RawState>


type State = ComputedState<typeof obj>


let objState = obj as unknown as State

objState.price
objState.tags
objState.address.city
objState.address.post
objState.address.street
objState.customer.name
objState.customer.age


// eslint-disable-next-line 
type cases = [
    Expect<Equal<State['price'], number>>,
    Expect<Equal<State['tags'], number[]>>,
    Expect<Equal<State['address'], {
        city: string
        post: number,
        street: string
    }>>,
    Expect<Equal<SchemaState<RawState>, {
        tags: number[]
        price: number
        address: {
            city: string
            post: number
            street: string;
        }
        "customer.name": string
        "customer.age": number
    }>>
]


const store2 = new AutoStore({
    order: {
        name: configurable("autostore"),
        price: configurable(10),
        count: configurable(2),
        pay: configurable(true),
        total: computed<number>((scope) => scope.price * scope.count)
    }
})
store2.state.order.name
store2.state.order.name
store2.state.order.price
store2.state.order.total


function state<State extends Dict<any>>(state: State) {
    return state as ComputedState<State>
}
class MyState {
    state = state({
        order: {
            name: configurable("autostore"),
            price: configurable(10),
            count: configurable(2),
            pay: configurable(true),
            total: computed<number>((scope) => scope.price * scope.count)
        }
    })
    constructor() {

    }
    test() {
        this.reactive.order.name
        this.reactive.order.name
        this.reactive.order.total

        this.store.state.order.name
        this.store.state.order.name
        this.store.state.order.total

        this.state.order.price

    }
    private _store?: AutoStore<any>
    get store() {
        return this._store! as AutoStore<this['state']>
    }
    get reactive() {
        return this.store.state //as ComputedState<this['state']>
    }
}


const mys = new MyState()

mys.reactive.order.name
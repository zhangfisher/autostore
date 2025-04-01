import { Equal, Expect }  from "@type-challenges/utils"
import { ComputedState } from "../src/types";
import { ConfigurableState, s, schema,SchemaState } from "../src/schema";
import { AutoStore } from "../src/store";


const obj = {
    price     : schema<number>(100),
    tags      : s.array<number>([1,2]),
    address   : s.object({
        city  : "QuanZhou",
        post  : 1234,
        street: "FenZhei"
    }),
    customer:{
        name: s.string("zhang"),
        age : s.number<number>(18)
    }
}
const store = new AutoStore(obj)
store.state.price

type d = ConfigurableState<RawState>
 

type State = ComputedState<typeof obj>

// 示例测试
type RawState = typeof obj

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
    Expect<Equal<State['price'],number>>,
    Expect<Equal<State['tags'],number[]>>,
    Expect<Equal<State['address'],{
        city  : string
        post  : number,
        street: string
    }>>,
    Expect<Equal<SchemaState<RawState>,{
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


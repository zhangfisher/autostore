import { Equal, Expect }  from "@type-challenges/utils"
import { ComputedState } from "../src/types";
import { s } from "../src/schema";

const obj = {
    price     : s.number(100),
    tags      : s.array(["a","b"]),
    address   : s.object({
        city  : "QuanZhou",
        post  : 1234,
        street: "FenZhei"
    })
}

type State = ComputedState<typeof obj>


let objState = obj as unknown as State

objState.price
objState.tags
objState.address.city
objState.address.post
objState.address.street


// eslint-disable-next-line 
type cases = [
    Expect<Equal<State['price'],number>>,
    Expect<Equal<State['tags'],string[]>>,
    Expect<Equal<State['address'],{
        city:string
        post:number,
        street:string
    }>>
 ]


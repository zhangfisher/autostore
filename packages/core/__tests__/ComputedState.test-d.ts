import { Equal, Expect }  from "@type-challenges/utils"
import { ComputedState } from "../src/types";
import { validators } from "../src/validate";

const Obj = {
    price: validators.number(100)
}

type State = ComputedState<typeof Obj>

type cases = [
    Expect<Equal<State['price'],number>>,
 ]

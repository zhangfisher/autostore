import { AutoStore, computed } from "../src";
import { Expect, Equal } from "@type-challenges/utils";
const store = new AutoStore({
    order: {
        price: 8,
        count: 10,
        total1: (scope: any) => scope.price * scope.count,
        total2: computed((scope: any) => scope.price * scope.count),
        total3: computed<number>(
            async (scope: any) => scope.price * scope.count,
            ["./price", "./count"],
        ),
        total4: async (scope: any) => scope.price * scope.count,
    },
    user: {
        first: "zhang",
        last: "fisher",
        fullName1: (scope: any) => (scope.first + scope.last) as string,
        fullName2: computed((scope: any) => (scope.first + scope.last) as string),
        fullName3: computed(
            async (scope: any) => (scope.first + scope.last) as string,
            ["./price"],
        ),
        fullName4: async (scope: any) => (scope.first + scope.last) as string,
    },
});

type State = typeof store.state;

type cases = [
    Expect<Equal<State["order"]["total1"], number>>,
    Expect<Equal<State["order"]["total2"], number>>,
    Expect<Equal<State["order"]["total3"], number>>,
    Expect<Equal<State["order"]["total4"], number>>,
    Expect<Equal<State["user"]["fullName1"], string>>,
    Expect<Equal<State["user"]["fullName2"], string>>,
    Expect<Equal<State["user"]["fullName3"], string>>,
    Expect<Equal<State["user"]["fullName4"], string>>,
];

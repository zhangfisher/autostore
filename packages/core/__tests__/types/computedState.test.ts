import { describe, test } from "vitest"
import type { Equal, Expect } from '@type-challenges/utils'
import { AutoStore, computed, ComputedState, configurable, s, SchemaDescriptorBuilder } from "../../src"


describe("ComputedState", () => {

    test("Schmea计算状态", () => {
        const state = {
            order: {
                price: s.number(100, (val: any) => val > 10),
                count: configurable(100, (val: any) => val > 10)
            }
        }
        type RawType = typeof state
        type PriceType = RawType['order']['price']
        type CountType = RawType['order']['count']
        type isSchemaType = PriceType extends (...args: any[]) => any ? true : false
        type isSchemasType = PriceType extends SchemaDescriptorBuilder<infer X, any> ? X : false
        type dstate = ComputedState<RawType>


    })
})

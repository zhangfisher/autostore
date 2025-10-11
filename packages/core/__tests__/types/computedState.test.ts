import { describe, test } from "vitest";
import type { Equal, Expect } from "@type-challenges/utils";
import { type ComputedState, configurable, s, type SchemaDescriptorBuilder } from "../../src";

describe("ComputedState", () => {
	test("Schmea计算状态", () => {
		const state = {
			order: {
				price: s.number(100, {
					onValidate: (val: any) => val > 10,
				}),
				count: configurable(100, {
					onValidate: (val: any) => val > 10,
				}),
			},
		};
		type RawType = typeof state;
		type PriceType = RawType["order"]["price"];
		type CountType = RawType["order"]["count"];
		type isSchemaType = PriceType extends (...args: any[]) => any ? true : false;
		type isSchemasType = PriceType extends SchemaDescriptorBuilder<infer X, any> ? X : false;
		type dstate = ComputedState<RawType>;
	});
});

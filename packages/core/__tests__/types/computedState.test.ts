import { describe, test } from "vitest";
import type { Equal, Expect } from "@type-challenges/utils";
import { type ComputedState, configurable, s } from "../../src";

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
		type CState = ComputedState<typeof state>;

		type Cases = [Expect<Equal<CState["order"]["price"], number>>, Expect<Equal<CState["order"]["count"], number>>];
	});
});

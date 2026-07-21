// oxlint-disable no-unused-vars
/**
 * RefStore 类型推断测试
 * 验证当 RefStores 为空时不会报错，以及路径类型推断是否正确
 */

import { AutoStore, computed } from "autostore";
import { RefState } from "../../refState";

/**
 * 通过模块增强（declaration merging）扩展 refState.ts 导出的空 RefStores 接口。
 * 合并成员后，ref("@<storeId>/<path>") 即可推断出对应的状态类型。
 */
declare module "../../refState" {
    interface RefStores {
        user: {
            state: {
                name: string;
                age: number;
                address: {
                    city: string;
                    zip: string;
                };
            };
        };
        product: {
            state: {
                price: number;
                stock: number;
            };
        };
    }
}
// 测试 1: 当 RefStores 为空时，ref() 应该能正常工作
const store1 = new AutoStore({
    name: "test",
    age: 30,
});
// 测试 2: 当有 RefStores 时，应该能正确推断类型
const store2 = new AutoStore({
    total: computed((_, { ref }) => {
        // 使用 @storeId/path 语法引用其他 store
        const userName = ref("@user/name"); // 应该推断为 string
        const userAge = ref("@user/age"); // 应该推断为 number
        const city = ref("@user/address.city"); // 应该推断为 string
        const price = ref("@product/price"); // 应该推断为 number

        type cases = [
            Expect<Equal<typeof userName, string>>,
            Expect<Equal<typeof userAge, number>>,
            Expect<Equal<typeof city, string>>,
            Expect<Equal<typeof price, number>>,
        ];

        return price;
    }),
});

// 测试 3: 验证 RefState 类型本身
const refState: RefState = ((path: any) => {}) as any;
const value1 = refState("@user/name"); // string
const value2 = refState("some.path"); // any

type Test5 = Expect<Equal<typeof value1, string>>;
type Test6 = Expect<Equal<typeof value2, any>>;

// 测试 4: 验证不存在的路径也能编译通过（虽然运行时返回 undefined）
const invalidValue = refState("@nonexistent/path"); // any，不会报错

// 测试 5: 验证嵌套路径的类型推断
const store3 = new AutoStore({
    nested: computed((_, { ref }) => {
        const city = ref("@user/address.city"); // string
        const zip = ref("@user/address.zip"); // string
        type Test7 = Expect<Equal<typeof city, string>>;
        type Test8 = Expect<Equal<typeof zip, string>>;
        return city;
    }),
});

// Helper type for type testing
type Expect<T extends true> = T;
type Equal<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

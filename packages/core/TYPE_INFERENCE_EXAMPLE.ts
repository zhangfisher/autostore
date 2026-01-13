/**
 * 类型推断示例
 *
 * 此文件展示 configurable 函数修复后的类型推断效果
 *
 * 修复前：onValidate 中的 value 参数类型为 any
 * 修复后：onValidate 中的 value 参数能正确推断为初始值的类型
 */

import { AutoStore, ValidateError } from './src/index';
import { configurable } from './src/schema/schema';

// ============================================
// 示例 1: 基础 number 类型推断
// ============================================
const store1 = new AutoStore({
    count: configurable(100, {
        onValidate: (value) => {
            // ✅ 修复后：value 被正确推断为 number 类型
            // 可以进行数字运算和比较
            if (value < 0 || value > 1000) {
                throw new ValidateError('数量超出范围');
            }

            // ✅ TypeScript 知道 value 是 number
            const doubled: number = value * 2;

            // ❌ 修复前：value 是 any，以下代码不会报错（应该报错）
            // const wrong: string = value.toUpperCase();

            return true;
        },
        validationBehavior: 'pass',
    }),
});

// ============================================
// 示例 2: string 类型推断
// ============================================
const store2 = new AutoStore({
    username: configurable('admin', {
        onValidate: (value) => {
            // ✅ value 被推断为 string 类型
            if (value.length < 3) {
                throw new ValidateError('用户名太短');
            }

            // ✅ 可以调用 string 方法
            const trimmed: string = value.trim();

            // ✅ 类型安全的字符串操作
            if (value.includes('@')) {
                throw new ValidateError('用户名不能包含 @');
            }

            return true;
        },
    }),
});

// ============================================
// 示例 3: boolean 类型推断
// ============================================
const store3 = new AutoStore({
    enabled: configurable(true, {
        onValidate: (value) => {
            // ✅ value 被推断为 boolean 类型
            if (!value) {
                throw new ValidateError('必须启用');
            }

            // ✅ 可以进行布尔运算
            const negated: boolean = !value;

            return true;
        },
    }),
});

// ============================================
// 示例 4: 自定义对象类型推断
// ============================================
interface Product {
    name: string;
    price: number;
    inStock: boolean;
}

const store4 = new AutoStore({
    product: configurable<Product>(
        { name: 'iPhone', price: 999, inStock: true },
        {
            onValidate: (value) => {
                // ✅ value 被推断为 Product 类型
                // TypeScript 提供完整的类型提示和检查
                if (value.price < 0) {
                    throw new ValidateError('价格不能为负数');
                }

                if (!value.inStock && value.name.includes('新')) {
                    throw new ValidateError('新品必须库存');
                }

                // ✅ 可以安全访问对象属性
                const productName: string = value.name;
                const productPrice: number = value.price;

                // ❌ 以下代码会报类型错误（这是好事！）
                // value.invalidProperty = 'test';

                return true;
            },
        },
    ),
});

// ============================================
// 示例 5: 数组类型推断
// ============================================
const store5 = new AutoStore({
    tags: configurable<string[]>(['type1', 'type2'], {
        onValidate: (value) => {
            // ✅ value 被推断为 string[] 类型
            if (value.length === 0) {
                throw new ValidateError('至少需要一个标签');
            }

            // ✅ 可以使用数组方法
            const firstTag: string = value[0];

            // ✅ 类型安全的数组操作
            value.forEach((tag) => {
                // tag 也被正确推断为 string
                console.log(tag.toUpperCase());
            });

            return true;
        },
    }),
});

// ============================================
// 示例 6: toView 和 toState 的类型推断
// ============================================
const store6 = new AutoStore({
    amount: configurable(0, {
        onValidate: (value) => {
            // ✅ value 是 number
            return value >= 0;
        },

        // ✅ toView 的参数类型与 value 类型一致 (number)
        toView: (value) => {
            return `¥${value.toFixed(2)}`;
        },

        // ✅ toState 的参数是 any（外部输入）
        toState: (value) => {
            // 可以安全地将输入转换为 number
            return Number(value);
        },

        // ✅ toInput 的参数类型也是 number
        toInput: (value) => {
            return value.toString();
        },
    }),
});

// ============================================
// 类型安全对比
// ============================================

// ❌ 修复前：value 是 any，以下错误在编译时无法发现
/*
const badExample = new AutoStore({
    count: configurable(100, {
        onValidate: (value) => {
            // 修复前：这行代码不会报错，但运行时会崩溃
            const wrong: string = value.toUpperCase(); // 运行时错误！

            if (value < 0) {
                throw new ValidateError('错误');
            }
            return true;
        },
    }),
});
*/

// ✅ 修复后：同样的代码会在编译时就被发现
/*
const goodExample = new AutoStore({
    count: configurable(100, {
        onValidate: (value) => {
            // TypeScript 报错：类型 'number' 上不存在 'toUpperCase' 属性
            // const wrong: string = value.toUpperCase(); // ❌ 编译时错误！

            if (value < 0) {
                throw new ValidateError('错误');
            }
            return true;
        },
    }),
});
*/

export {
    store1,
    store2,
    store3,
    store4,
    store5,
    store6,
};

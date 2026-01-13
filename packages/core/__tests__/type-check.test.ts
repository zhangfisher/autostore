/**
 * 类型推断测试文件
 * 此文件用于验证 TypeScript 类型推断是否正确
 * 不会被实际执行，仅用于类型检查
 */

import { AutoStore, ValidateError } from '../src/index';
import { configurable } from '../src/schema/schema';

// 测试 configurable 的类型推断
const store1 = new AutoStore({
    count: configurable(100, {
        onValidate: (value) => {
            // 此处 value 应该被推断为 number 类型
            if (value < 0 || value > 1000) {
                throw new ValidateError('数量超出范围');
            }
            return true;
        },
        onInvalid: 'pass',
    }),
});

// 测试 string 类型的推断
const store2 = new AutoStore({
    name: configurable('hello', {
        onValidate: (value) => {
            // 此处 value 应该被推断为 string 类型
            if (value.length < 3) {
                throw new ValidateError('名称太短');
            }
            return true;
        },
    }),
});

// 测试 boolean 类型的推断
const store3 = new AutoStore({
    enabled: configurable(true, {
        onValidate: (value) => {
            // 此处 value 应该被推断为 boolean 类型
            if (!value) {
                throw new ValidateError('必须启用');
            }
            return true;
        },
    }),
});

// 测试 object 类型的推断
interface User {
    name: string;
    age: number;
}

const store4 = new AutoStore({
    user: configurable<User>(
        { name: 'test', age: 20 },
        {
            onValidate: (value) => {
                // 此处 value 应该被推断为 User 类型
                if (value.age < 18) {
                    throw new ValidateError('年龄不足');
                }
                return true;
            },
        },
    ),
});

// 测试 array 类型的推断
const store5 = new AutoStore({
    items: configurable<number[]>([1, 2, 3], {
        onValidate: (value) => {
            // 此处 value 应该被推断为 number[] 类型
            if (value.length === 0) {
                throw new ValidateError('数组不能为空');
            }
            return true;
        },
    }),
});

console.log('类型推断测试通过');

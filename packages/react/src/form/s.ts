/* eslint-disable no-misused-spread */
/**
 * Field 类 - 可解构的字段对象
 * 支持通过解构语法访问内部的 values 对象成员
 */
class Field<T = any> {
    /** 内部值对象 */
    private _values: Record<string, T>;

    constructor(values: Record<string, T>) {
        this._values = values;
    }

    /**
     * 获取所有值
     */
    get values(): Record<string, T> {
        return this._values;
    }

    /**
     * 获取指定键的值
     */
    getValue(key: string): T | undefined {
        return this._values[key];
    }

    /**
     * 设置指定键的值
     */
    setValue(key: string, value: T): void {
        this._values[key] = value;
    }

    /**
     * 添加键值对
     */
    addValue(key: string, value: T): void {
        this._values[key] = value;
    }

    /**
     * 实现 Symbol.iterator 使其可解构（迭代对象的值）
     */
    *[Symbol.iterator](): Iterator<T> {
        for (const value of Object.values(this._values)) {
            yield value;
        }
    }

    /**
     * 调用处理器 - 当实例被当作函数调用时执行
     * @param a 第一个数字参数
     * @param b 第二个数字参数
     * @returns 计算结果或值数组
     */
    call(a: number, b: number): any {
        console.log(`Field 被调用了！参数: a=${a}, b=${b}`);
        console.log(`当前值对象:`, this._values);

        // 示例：对参数进行运算并返回
        const result = {
            sum: a + b,
            product: a * b,
            values: this._values,
        };

        console.log(`计算结果:`, result);
        return result;
    }

    /**
     * @deprecated 请使用 call 方法代替
     */
    callHandler(a: number, b: number): any {
        return this.call(a, b);
    }
}

/**
 * callable 函数的配置选项
 */
interface CallableOptions<T> {
    /** 指定实例中被调用的方法名称，默认为 'call' */
    callMethod?: keyof T | string;
    /** 指定实例中用于展开和属性访问的数据对象属性名，默认为 'data' */
    dataKey?: keyof T | string;
}

/**
 * 提取方法的函数签名类型
 */
type MethodSignature<T, K extends keyof T | string> = K extends keyof T
    ? T[K] extends (...args: infer A) => infer R
        ? (...args: A) => R
        : never
    : (...args: any[]) => any;

/**
 * 提取 values 属性的类型
 */
type PickDataType<T, V extends keyof T | undefined> = V extends keyof T
    ? T[V] extends Record<string, any>
        ? { [K in keyof T[V]]: T[V][K] }
        : never
    : {};

/**
 * callable 函数 - 将任意实例包装为可调用对象
 * 使用 Proxy 拦截函数调用，this 始终指向原实例
 * 支持对象展开语法 {...callableInstance}
 * 根据 callMethod 自动推断函数签名
 * 根据 values 自动推断可解构的属性类型
 *
 * @param instance 要包装的实例
 * @param options 配置选项
 * @returns 可调用的实例
 */
function callable<
    T extends Record<string, any>,
    K extends keyof T = "call",
    V extends keyof T = "data",
>(
    instance: T,
    options?: CallableOptions<T> & { callMethod?: K; dataKey?: V },
): T & MethodSignature<T, K> & PickDataType<T, V>;

function callable<T extends Record<string, any>>(
    instance: T,
    options?: CallableOptions<T>,
): T & { (...args: any[]): any } {
    const { callMethod = "call", dataKey = "data" } = options || {};

    // 创建一个包装函数，这个函数就是可调用的主体
    const wrapper = function (...args: any[]) {
        // 获取调用方法
        const method = (instance as any)[callMethod];
        if (typeof method === "function") {
            // 调用时 this 指向原实例
            return method.apply(instance, args);
        }
        throw new Error(`Method '${String(callMethod)}' not found on instance`);
    };

    // 显式给函数添加属性，避免被 ESLint 识别为纯函数
    (wrapper as any).isCallableObject = true;

    // 使用 Proxy 包装这个函数，拦截属性访问，转发到原实例
    return new Proxy(wrapper, {
        /**
         * 拦截属性访问，data 对象的属性优先于实例属性
         */
        get(_target, prop, receiver) {
            // 先从 data 对象获取属性（优先）
            if (typeof prop === "string") {
                const dataObj = (instance as any)[dataKey];
                if (dataObj && typeof dataObj === "object" && prop in dataObj) {
                    const value = dataObj[prop];
                    return value;
                }
            }

            // 如果 data 对象中没有该属性，从原实例获取
            let value = Reflect.get(instance, prop, receiver);

            // 如果是方法，绑定 this 到原实例
            if (typeof value === "function" && prop !== "constructor" && "bind" in value) {
                return (value as any).bind(instance);
            }

            return value;
        },

        /**
         * 拦截属性设置，转发到原实例
         */
        set(_target, prop, value, receiver) {
            return Reflect.set(instance, prop, value, receiver);
        },

        /**
         * 拦截 in 操作符
         */
        has(_target, prop) {
            return Reflect.has(instance, prop);
        },

        /**
         * 拦截 Object.getOwnPropertyDescriptor()
         * 用于对象展开语法，只返回 data 对象的属性描述符
         * 对于其他属性，返回实际的描述符但标记为不可枚举
         */
        getOwnPropertyDescriptor(target, prop) {
            // 从 data 对象获取属性描述符
            const dataObj = (instance as any)[dataKey];
            if (
                typeof prop === "string" &&
                dataObj &&
                typeof dataObj === "object" &&
                Object.prototype.hasOwnProperty.call(dataObj, prop)
            ) {
                const descriptor = Reflect.getOwnPropertyDescriptor(dataObj, prop);
                if (descriptor) {
                    // 确保是可枚举的
                    descriptor.enumerable = true;
                    return descriptor;
                }
            }

            // 对于函数的固有属性（prototype、name、length 等），返回实际描述符但标记为不可枚举
            const targetDescriptor = Reflect.getOwnPropertyDescriptor(target, prop);
            if (targetDescriptor) {
                // 设置为不可枚举，这样展开时不会包含这些属性
                targetDescriptor.enumerable = false;
                return targetDescriptor;
            }

            // 对于实例的属性，也设置为不可枚举
            const instanceDescriptor = Reflect.getOwnPropertyDescriptor(instance, prop);
            if (instanceDescriptor) {
                instanceDescriptor.enumerable = false;
                return instanceDescriptor;
            }

            return undefined;
        },

        /**
         * 拦截 Object.keys()、Object.getOwnPropertyNames()、for...in 和对象展开
         * 对于对象展开，只返回 data 对象的键和必要的函数固有属性
         */
        ownKeys(target) {
            // 获取 data 对象的键
            const dataObj = (instance as any)[dataKey];
            const valueKeys = dataObj && typeof dataObj === "object" ? Object.keys(dataObj) : [];

            // 只获取函数的必要固有属性（prototype、name、length）
            const necessaryTargetKeys = Reflect.ownKeys(target).filter(
                (key) =>
                    key === "prototype" ||
                    key === "name" ||
                    (typeof key === "string" && key === "length"),
            );

            // 合并去重
            const allKeys = new Set([...valueKeys, ...necessaryTargetKeys]);

            return Array.from(allKeys);
        },

        /**
         * 拦截 getPrototypeOf
         * 用于对象展开和类型检查
         */
        getPrototypeOf(_target) {
            return Reflect.getPrototypeOf(instance);
        },

        /**
         * 拦截 setPrototypeOf
         */
        setPrototypeOf(_target, proto) {
            return Reflect.setPrototypeOf(instance, proto);
        },
    }) as T & { (...args: any[]): any };
}

// ==================== 使用示例 ====================

// 1. 创建 Field 实例（使用对象参数）
const field = new Field({ key1: "值1", key2: "值2", key3: "值3" });

// 2. 通过 ... 进行解构（解构的是对象的值）
const [val1, val2, val3] = field;
console.log(val1, val2, val3); // "值1" "值2" "值3"

// 4. 在 for...of 中使用（迭代对象的值）
for (const value of field) {
    console.log(value); // 依次输出 "值1", "值2", "值3"
}

// 5. 使用数组展开（获取对象的所有值）
const allValues = [...field];
console.log(allValues); // ["值1", "值2", "值3"]

// ==================== callable 使用示例 ====================

// 9. 使用 callable 将 Field 实例包装为可调用对象
// Field 的 values 属性作为数据源
const callableField = callable(new Field({ first: "A", second: "B", third: "C" }), {
    dataKey: "values", // 明确指定使用 values 属性
});

// ✅ 像函数一样调用，this 指向原实例
const result = callableField(10, 20);
console.log("函数调用", result);

// ✅ 直接访问 values 对象的属性
console.log("访问 values 属性:", callableField.first, callableField.second, callableField.third);

// ✅ 解构 values 属性
const { first, second, third } = callableField;
console.log("解构 values:", first, second, third);

// ✅ 数组解构
console.log("数组解构 values 值:", [...callableField]);

// ✅ 对象展开
const spreadValues = { ...callableField };
console.log("对象展开 values:", spreadValues);

// ==================== 高级用法：自定义配置 ====================

// 10. 创建一个自定义类
class AnotherField {
    _values = { x: 1, y: 2 };

    get values() {
        return this._values;
    }

    // 使用不同的方法名
    execute(op: string, a: number, b: number) {
        console.log(`执行 ${op}: ${a}, ${b}`);
        if (op === "add") return a + b;
        if (op === "multiply") return a * b;
        return 0;
    }
}

// 11. 自定义 callMethod
const anotherField = callable(new AnotherField(), {
    callMethod: "execute", // 使用 execute 方法
    dataKey: "values", // 使用 values 属性作为数据源
});

// ✅ 调用 execute 方法
console.log("自定义方法调用:", anotherField("add", 100, 200)); // 300

// 12. 创建一个自定义类
class Calculator {
    data = { a: 10, b: 2, c: { c1: true, c2: "x" } };
    a = "x";
    x = 1;
    y = 2;
    // 自定义调用方法
    calculate(operation: string, x: number, y: number) {
        console.log(`计算: ${operation}(${x}, ${y})`);
        switch (operation) {
            case "add":
                return x + y;
            case "multiply":
                return x * y;
            default:
                return 0;
        }
    }
    test() {
        console.log("this.a=", this.a);
    }
}

// 11. 使用 callable 包装自定义类
const calc = callable(new Calculator(), {
    callMethod: "calculate", // 指定调用方法
    // dataKey: "data" 可以省略，因为默认值就是 "data"
});

// ✅ 调用自定义方法
console.log("加法:", calc("add", 5, 3)); // 8
console.log("乘法:", calc("multiply", 4, 7)); // 28

// ✅ data 属性优先于实例属性
console.log("calc.a (优先data.a):", calc.a); // 10（来自 data）
console.log("calc.x (实例属性):", calc.x); // 1（来自实例）

// ✅ 展开 data 对象
const { a, b } = calc;
console.log("解构 data 属性:", a, b); // 10, 2

// ✅ 对象展开
const calcSpread = { ...calc };
console.log("对象展开:", calcSpread); // { a: 10, b: 2, x: 1, y: 2 }
calc.test();

// ==================== 对象字面量用法 ====================

// 13. 直接对对象字面量使用 callable
const userObj = {
    // 数据对象
    data: {
        name: "张三",
        age: 25,
        email: "zhangsan@example.com",
    },
    // 调用方法
    greet(greeting: string) {
        return `${greeting}, 我是${this.data.name}，今年${this.data.age}岁`;
    },
    // 其他方法
    getEmail() {
        return this.data.email;
    },
};

// 14. 包装对象字面量
const user = callable(userObj, {
    callMethod: "greet", // 使用 greet 方法
    // dataKey: "data" 可以省略，因为默认值就是 "data"
});

// ✅ 调用 greet 方法
console.log("问候:", user("你好"));

// ✅ 直接访问 data 属性（优先于实例属性）
console.log("用户信息:", user.name, user.age, user.email);

// ✅ 调用实例方法
console.log("邮箱:", user.getEmail());

// ✅ 解构 data 属性
const { name, age } = user;
console.log("解构用户:", name, age);

// ✅ 对象展开
const userSpread = { ...user };
console.log("展开用户:", userSpread);

export { Field, callable };
export type { CallableOptions };

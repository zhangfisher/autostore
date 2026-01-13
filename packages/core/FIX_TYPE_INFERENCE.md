# configurable 类型推断修复说明

## 问题描述

在使用 `configurable` 函数时,`onValidate` 回调中的 `value` 参数类型被推断为 `any`,而不是初始值的实际类型。

### 问题示例

```typescript
const store = new AutoStore({
    count: configurable(100, {
        onValidate: (value) => {   // value 的类型是 any，应该是 number
            if (value < 0 || value > 1000) {
                throw new ValidateError('数量超出范围');
            }
            return true;
        },
        validationBehavior: 'pass',
    }),
});
```

## 根本原因

问题出在两个地方:

1. **`schema.ts` 中的 `schema` 函数**: 没有使用 TypeScript 泛型参数
2. **`types.ts` 中的 `SchemaDescriptor`**: `schema` 字段没有传递泛型 `Value`

### 修复前的代码

**schema.ts**:
```typescript
export const schema = function () {
    const initial = arguments[0];
    // ...
} as unknown as SchemaBuilder;
```

**types.ts**:
```typescript
export type SchemaDescriptor<Value = any> = {
    path?: string[];
    value: Value;
    datatype: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'any' | string;
    schema: StateSchema;  // ❌ 没有传递 Value 泛型
};
```

## 修复方案

### 1. 修复 `schema.ts` 中的函数签名

```typescript
// ✅ 修复后：添加泛型参数
export const schema = function <Value>(initial: Value, options?: any) {
    const args = parseSchemaArgs([initial, options]);
    const value = initial;
    const datatype = Array.isArray(value) ? 'array' : typeof value;
    if (typeof value === 'object') {
        markRaw(value);
    }
    const builder = () => ({
        value,
        datatype,
        schema: args.schema,
    });
    builder[VALUE_SCHEMA_BUILDER_FLAG] = true;
    return builder as SchemaDescriptorBuilder<Value>;
} as unknown as SchemaBuilder;

export const configurable = schema;
```

### 2. 修复 `types.ts` 中的类型定义

```typescript
// ✅ 修复后：将 Value 泛型传递给 StateSchema
export type SchemaDescriptor<Value = any> = {
    path?: string[];
    value: Value;
    datatype: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'any' | string;
    schema: StateSchema<Value>;  // ✅ 传递 Value 泛型
};
```

### 3. 同步修复 `createTypeSchemaBuilder`

```typescript
export function createTypeSchemaBuilder<Value = any>(
    isValid: (val: any) => boolean,
    defaultTips: string,
) {
    // ✅ 修复后：使用显式参数
    const typeSchema = function (initial: Value, options?: any) {
        const opts = Object.assign({}, options);
        if (typeof opts.onValidate !== 'function') {
            opts.onValidate = isValid;
        }
        if (!opts.invalidTips) {
            opts.invalidTips = defaultTips;
        }
        return schema(initial, opts);
    };
    return typeSchema as SchemaBuilder<Value>;
}
```

## 修复效果

### ✅ 类型正确推断

```typescript
const store = new AutoStore({
    count: configurable(100, {
        onValidate: (value) => {
            // ✅ value 被正确推断为 number 类型
            if (value < 0 || value > 1000) {
                throw new ValidateError('数量超出范围');
            }
            // ✅ 可以进行数字运算
            const doubled = value * 2;

            // ❌ TypeScript 会捕获类型错误
            // const wrong: string = value.toUpperCase(); // 编译时错误！

            return true;
        },
    }),
});
```

### ✅ 支持所有类型

```typescript
// string 类型
const s1 = configurable('hello', {
    onValidate: (value) => {
        // value: string
        return value.length > 3;
    }
});

// boolean 类型
const s2 = configurable(true, {
    onValidate: (value) => {
        // value: boolean
        return value === true;
    }
});

// 自定义对象类型
interface User { name: string; age: number; }
const s3 = configurable<User>({ name: 'John', age: 30 }, {
    onValidate: (value) => {
        // value: User
        return value.age >= 18;
    }
});

// 数组类型
const s4 = configurable<number[]>([1, 2, 3], {
    onValidate: (value) => {
        // value: number[]
        return value.length > 0;
    }
});
```

### ✅ 类型安全的好处

1. **编译时错误检测**: 在开发阶段就能发现类型错误
2. **更好的 IDE 支持**: 自动补全和类型提示
3. **减少运行时错误**: 类型系统帮助防止常见错误
4. **代码可维护性**: 类型即文档,代码更易理解

## 测试验证

已添加完整的类型推断测试:

- ✅ `packages/core/__tests__/config-type-inference.test.ts` - 运行时测试
- ✅ `packages/core/__tests__/type-check.test.ts` - 类型检查测试
- ✅ `packages/core/TYPE_INFERENCE_EXAMPLE.ts` - 类型推断示例

所有测试通过:
```bash
bun run test config-type-inference.test.ts
# 6 pass, 0 fail
```

## 相关文件

- [packages/core/src/schema/schema.ts](src/schema/schema.ts) - schema 函数实现
- [packages/core/src/schema/types.ts](src/schema/types.ts) - 类型定义
- [packages/core/__tests__/config-type-inference.test.ts](__tests__/config-type-inference.test.ts) - 类型推断测试
- [packages/core/TYPE_INFERENCE_EXAMPLE.ts](TYPE_INFERENCE_EXAMPLE.ts) - 类型推断示例

## 影响范围

这是一个纯类型系统的改进,不影响运行时行为:

- ✅ 完全向后兼容
- ✅ 不改变任何运行时逻辑
- ✅ 仅增强类型安全性
- ✅ 不需要修改现有代码(除了可选的类型标注)

## 原则应用

这次修复体现了以下工程原则:

- **KISS**: 使用简单的泛型参数传递解决问题
- **YAGNI**: 只修复了明确需要的类型推断,不过度设计
- **类型安全**: 在不增加复杂度的前提下最大化类型保护
- **向后兼容**: 改进不破坏现有代码

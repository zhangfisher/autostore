# AutoStateSchema Widget 类型推断功能

## 概述

修改了 `AutoStateSchema` 类型,使其能够根据 `widget` 参数自动从 `AutoStoreWidgets` 中提取并合并对应的 widget 配置类型。

## 核心修改

### 文件: [packages/core/src/schema/types.ts](src/schema/types.ts)

#### 1. 新增 `WidgetConfig` 类型辅助工具

```typescript
/**
 * 从 AutoStoreWidgets 中提取指定 widget 的配置类型
 */
export type WidgetConfig<W extends keyof AutoStoreWidgets> = AutoStoreWidgets[W];
```

#### 2. 重构 `AutoStateSchema` 类型结构

将原有的单一接口拆分为:

- **`AutoStateSchemaBase<Value>`**: 基础接口,包含所有通用的 schema 属性
- **`AutoStateSchema<Value, Widget>`**: 完整类型,通过交叉类型合并基础配置和 widget 特定配置

```typescript
/**
 * AutoStateSchema 基础接口（不包含 widget 特定配置）
 */
interface AutoStateSchemaBase<Value = any> {
    widget?: string;
    key?: string;
    name?: string;
    label?: string;
    // ... 其他通用属性
}

/**
 * 完整的 AutoStateSchema 类型，根据 widget 参数自动合并对应 widget 配置
 */
export type AutoStateSchema<Value = any, Widget extends AutoStoreWidgetTypes = AutoStoreWidgetTypes> =
    AutoStateSchemaBase<Value> & (Widget extends keyof AutoStoreWidgets ? Partial<WidgetConfig<Widget>> : {});
```

## 类型推断原理

使用 TypeScript 的 **条件类型** 和 **交叉类型** 实现:

1. **条件类型**: `Widget extends keyof AutoStoreWidgets ? Partial<WidgetConfig<Widget>> : {}`
   - 如果 `Widget` 是 `AutoStoreWidgets` 的有效 key,则提取对应的配置类型
   - 否则返回空对象类型

2. **交叉类型 (`&`)**: 将基础配置和 widget 特定配置合并
   - 结果类型包含两部分的所有属性
   - widget 特定属性使用 `Partial` 包装,使其变为可选

## 使用示例

### 定义 Widget 配置

首先在 `AutoStoreWidgets` 接口中定义支持的 widget 类型:

```typescript
declare module './src/schema/types' {
    export interface AutoStoreWidgets {
        number: {
            max: number;
            min: number;
            step?: number;
        };
        text: {
            maxLength?: number;
            minLength?: number;
            pattern?: RegExp;
        };
        select: {
            options: Array<{ value: any; label: string }>;
            multiple?: boolean;
        };
    }
}
```

### 使用 Widget 类型

```typescript
// ✅ number widget - 自动包含 max/min/step 属性
const numberSchema: AutoStateSchema<number, 'number'> = {
    widget: 'number',
    max: 100,
    min: 0,
    step: 1,
    label: '数量',
};

// ✅ text widget - 自动包含 maxLength/minLength/pattern 属性
const textSchema: AutoStateSchema<string, 'text'> = {
    widget: 'text',
    maxLength: 20,
    minLength: 3,
    label: '用户名',
};

// ✅ select widget - 自动包含 options/multiple 属性
const selectSchema: AutoStateSchema<string, 'select'> = {
    widget: 'select',
    options: [{ value: 1, label: '选项1' }],
    multiple: false,
};
```

### 类型安全保障

```typescript
// ❌ 编译错误: max 属性不属于 text widget
const invalidSchema: AutoStateSchema<string, 'text'> = {
    widget: 'text',
    max: 100, // Type Error: 'max' does not exist on type...
};

// ❌ 编译错误: options 属性不属于 number widget
const invalidSchema2: AutoStateSchema<number, 'number'> = {
    widget: 'number',
    options: [], // Type Error: 'options' does not exist on type...
};
```

## 设计原则

本次修改严格遵循以下原则:

### 1. **DRY (Don't Repeat Yourself)**
- 避免为每种 widget 重复定义相同的通用属性
- 通过类型继承和组合实现复用

### 2. **SOLID 原则**
- **单一职责 (S)**: `AutoStateSchemaBase` 专注于通用配置,`WidgetConfig` 专注于 widget 特定配置
- **开闭原则 (O)**: 通过扩展 `AutoStoreWidgets` 接口即可添加新 widget,无需修改核心类型
- **接口隔离 (I)**: 每个 widget 只包含自己需要的配置属性

### 3. **类型安全**
- 编译时类型检查,防止错误使用 widget 配置
- 自动类型推导,提供良好的 IDE 提示

### 4. **向后兼容**
- `Widget` 泛型参数有默认值,未指定时仍可正常使用
- 所有 widget 特定属性都是可选的 (`Partial`)

## 测试

创建了专门的测试文件验证类型推断功能:

- **[packages/core/__tests__/widget-type-inference.test.ts](__tests__/widget-type-inference.test.ts)**: 类型推断测试
- **[packages/core/WIDGET_TYPE_USAGE_EXAMPLE.ts](WIDGET_TYPE_USAGE_EXAMPLE.ts)**: 完整使用示例

运行测试:
```bash
bun test __tests__/widget-type-inference.test.ts
```

## 相关文件

- [packages/core/src/schema/types.ts](src/schema/types.ts) - 类型定义
- [packages/core/__tests__/widget-type-inference.test.ts](__tests__/widget-type-inference.test.ts) - 类型测试
- [packages/core/WIDGET_TYPE_USAGE_EXAMPLE.ts](WIDGET_TYPE_USAGE_EXAMPLE.ts) - 使用示例

## 优势总结

1. **类型安全**: 编译时检查,防止错误配置
2. **开发体验**: IDE 自动补全和类型提示
3. **可扩展性**: 轻松添加新的 widget 类型
4. **可维护性**: 清晰的类型结构,易于理解和维护
5. **向后兼容**: 不影响现有代码

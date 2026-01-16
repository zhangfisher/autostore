# AutoStore Core 类型单元测试

本目录包含 AutoStore 核心包的 TypeScript 类型单元测试,使用 `@type-challenges/utils` 库的 `Expect` 和 `Equal` 工具进行类型断言。

## 测试文件组织

测试按功能模块组织,每个功能对应一个测试文件:

### 1. [store.test-d.ts](./store.test-d.ts)
**Store 基础类型测试**
- AutoStore 类的类型推断
- 状态类型推断
- Store 选项类型
- Store 方法类型 (watch, update, peep, get, reset, destroy)
- Store 类型属性 (computedObjects, watchObjects, operates)

### 2. [computed.test-d.ts](./computed.test-d.ts)
**计算属性类型测试**
- 同步计算返回类型推断
- 异步计算返回类型推断 (AsyncComputedValue)
- computed 函数类型
- 计算属性选项类型 (timeout, retry, immediate, reentry)
- 计算依赖类型 (ROOT, CURRENT, PARENT, 相对路径)
- 计算作用域 (scope) 类型

### 3. [watch.test-d.ts](./watch.test-d.ts)
**状态监听类型测试**
- 监听器函数类型
- 监听选项类型 (once, operates, filter)
- Watcher 方法类型 (off, pause, resume, isWatching)
- 路径监听类型 (单路径、多路径、通配符)
- watch 对象类型

### 4. [observer.test-d.ts](./observer.test-d.ts)
**观察者模式类型测试**
- ObserverType 类型 (watch | computed | schema)
- ObserverScopeRef 枚举
- ObserverOptions 类型
- ObserverDescriptor 类型
- ObserverObject 类型
- 观察者依赖匹配器

### 5. [events.test-d.ts](./events.test-d.ts)
**事件系统类型测试**
- EventEmitter 方法类型
- Store 事件类型 (load, reset, computed:*, watch:*, observer:*)
- 事件处理器类型
- EventListener 类型
- 状态操作事件类型

### 6. [schema.test-d.ts](./schema.test-d.ts)
**配置化状态类型测试**
- configurable 和 schema 函数类型
- Schema 选项类型 (label, widget, help, required, visible 等)
- Schema 验证类型 (onValidate, onInvalid)
- 转换函数类型 (toView, toState, toInput, toRender)
- Store types 属性 (schemas, schemaKeys)

### 7. [utility-types.test-d.ts](./utility-types.test-d.ts)
**工具类型测试**
- Dict 类型
- Primitive 类型
- ComputedState 类型转换
- StatePath 路径类型
- GetTypeByPath 根据路径获取类型
- 复杂类型组合

### 8. [path-inference.test-d.ts](./path-inference.test-d.ts)
**路径类型推断测试**
- 顶层属性路径
- 嵌套对象路径
- 数组路径 (包含模板字符串类型 `items.${number}`)
- 计算属性路径
- 混合场景路径
- 边界情况

### 9. [reactive-state.test-d.ts](./reactive-state.test-d.ts)
**响应式状态类型测试**
- 基础类型保持 (string, number, boolean, null, undefined)
- 函数转换为返回值类型
- 对象类型处理
- 数组类型处理
- 复杂场景组合
- ComputedState 工具类型

## 测试命名规范

- 测试文件以 `.test-d.ts` 后缀结尾,表示这是类型测试文件
- 测试使用 `describe` 和 `test` 组织
- 类型断言使用 `Expect<Equal<Actual, Expected>>` 格式

## 类型断言示例

```typescript
test("示例类型测试", () => {
    const store = new AutoStore({
        count: 0,
        double: (scope) => scope.count * 2,
    });

    type StateType = typeof store.state;

    // 使用 Expect 进行类型断言
    const check: Expect<Equal<StateType, {
        count: number;
        double: number;
    }>> = true;
});
```

## 运行测试

```bash
# 运行所有测试
bun test

# 只运行类型测试
bun test __tests__/types/
```

## 类型测试原则

1. **覆盖全面**: 每个公开 API 都应该有对应的类型测试
2. **按功能组织**: 相关的功能测试组织在同一个 describe 块中
3. **边界情况**: 测试各种边界情况和特殊场景
4. **类型安全**: 确保类型推断准确,不使用 any 规避类型检查

## 注意事项

- 类型测试在编译时进行,不需要运行时执行
- 类型测试文件不会生成 JavaScript 代码
- 使用 `--test` 模式运行测试时,TypeScript 会检查类型断言
- 如果类型不匹配,测试会在编译时报错

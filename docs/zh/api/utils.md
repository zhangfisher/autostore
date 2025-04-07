# Utils 工具函数

本文档包含了 AutoStore 提供的所有工具函数的详细说明和使用示例。

## isRaw

检查一个对象是否被标记为非响应式对象。

### 函数签名

```typescript
function isRaw(obj: any): boolean
```

### 参数

- `obj: any` - 要检查的对象

### 返回值

- `boolean` - 如果对象被标记为非响应式则返回 true，否则返回 false

### 描述

`isRaw` 函数用于检查一个对象是否被标记为非响应式对象。在 AutoStore 中，被标记为 raw 的对象不会被转换为响应式代理对象。

### 示例

```typescript
import { isRaw, markRaw } from 'autostore';

const obj = { name: 'test' };
console.log(isRaw(obj)); // false

const rawObj = markRaw({ name: 'test' });
console.log(isRaw(rawObj)); // true
```

## isEq

深度比较两个值是否相等。

### 函数签名

```typescript
function isEq(a: any, b: any): boolean
```

### 参数

- `a: any` - 要比较的第一个值
- `b: any` - 要比较的第二个值

### 返回值

- `boolean` - 如果两个值相等则返回 true，否则返回 false

### 描述

`isEq` 函数用于深度比较两个值是否相等。比较规则如下：

- 如果两个值完全相等（===），返回 true
- 如果其中一个值为 null，返回 false
- 如果两个值类型不同，返回 false
- 如果两个值都是数组，则比较数组长度和每个元素
- 如果两个值都是对象（非数组），则比较对象的键数量和每个键的值
- 对于嵌套的对象和数组会进行递归比较

### 示例

```typescript
import { isEq } from 'autostore';

// 基本类型比较
console.log(isEq(1, 1)); // true
console.log(isEq('hello', 'hello')); // true
console.log(isEq(1, '1')); // false

// 数组比较
console.log(isEq([1, 2, 3], [1, 2, 3])); // true
console.log(isEq([1, 2, 3], [1, 2, 4])); // false
console.log(isEq([1, [2, 3]], [1, [2, 3]])); // true

// 对象比较
console.log(isEq({ a: 1, b: 2 }, { a: 1, b: 2 })); // true
console.log(isEq({ a: 1, b: 2 }, { b: 2, a: 1 })); // true
console.log(isEq({ a: 1, b: { c: 3 } }, { a: 1, b: { c: 3 } })); // true
console.log(isEq({ a: 1 }, { a: 1, b: 2 })); // false
```

## isMap

判断一个值是否为 Map 类型。

### 函数签名

```typescript
function isMap(mayMap: any): mayMap is Map<any, any>
```

### 参数

- `mayMap: any` - 要检查的值

### 返回值

- `boolean` - 如果值是 Map 类型则返回 true，否则返回 false

### 描述

`isMap` 函数用于类型检查，判断传入的值是否为 JavaScript 的 Map 对象。这是一个类型保护函数，在 TypeScript 中使用时可以帮助类型推断。

### 示例

```typescript
import { isMap } from 'autostore';

const map = new Map();
const obj = {};
const arr = [];

console.log(isMap(map));  // true
console.log(isMap(obj));  // false
console.log(isMap(arr));  // false
console.log(isMap(null)); // false

// 在 TypeScript 中的类型保护用法
const value: unknown = new Map();
if (isMap(value)) {
    // 这里的 value 被推断为 Map 类型
    value.set('key', 'value');
}
```
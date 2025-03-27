# Utils 工具函数文档

[前面的文档内容保持不变...]

## getFullValuePath
获取数据的绝对路径，支持多种路径格式和相对路径解析。

**参数:**
- `curPath: string[] | undefined` - 当前路径数组
- `path: 'self' | 'root' | 'parent' | 'current' | string[] | string` - 目标路径
- `isRelPath?: boolean` - 是否使用相对路径（内部参数）

**返回值:**
- `string[] | undefined` - 解析后的绝对路径数组，如果路径无效则返回undefined

**特性:**
- 支持多种路径格式：
  - 特殊关键字：'self'、'root'、'parent'、'current'
  - 数组路径：直接返回
  - 字符串路径：支持相对路径语法
- 相对路径支持：
  - './' - 当前目录
  - '../' - 父目录
  - '/' - 绝对路径
- 安全处理：
  - 当curPath为undefined时不支持相对路径
  - 当路径以'#'开头时不支持相对路径（动态创建的响应式对象）

**示例:**
```typescript
import { getFullValuePath } from '@autostore/core'

const curPath = ['a', 'b', 'c', 'd', 'e', 'f']

// 特殊关键字
console.log(getFullValuePath(curPath, 'self'))
// ['a', 'b', 'c', 'd', 'e', 'f']

console.log(getFullValuePath(curPath, 'root'))
// []

console.log(getFullValuePath(curPath, 'parent'))
// ['a', 'b', 'c', 'd']

console.log(getFullValuePath(curPath, 'current'))
// ['a', 'b', 'c', 'd', 'e']

// 数组路径
console.log(getFullValuePath(curPath, ['x', 'y']))
// ['x', 'y']

// 字符串路径
console.log(getFullValuePath(curPath, 'm'))
// ['a', 'b', 'c', 'd', 'e', 'm']

// 相对路径
console.log(getFullValuePath(curPath, './x'))
// ['a', 'b', 'c', 'd', 'e', 'x']

console.log(getFullValuePath(curPath, '../x'))
// ['a', 'b', 'c', 'd', 'x']

console.log(getFullValuePath(curPath, '../../x'))
// ['a', 'b', 'c', 'x']

// 绝对路径
console.log(getFullValuePath(curPath, '/x/y/z'))
// ['x', 'y', 'z']

// 特殊情况处理
const dynamicPath = ['#1', 'b', 'c']
console.log(getFullValuePath(dynamicPath, '../x'))
// undefined (动态创建的响应式对象不支持相对路径)

console.log(getFullValuePath(undefined, '../x'))
// undefined (无当前路径时不支持相对路径)
```

**实际使用场景:**
```typescript
// 在响应式系统中处理路径依赖
function resolveDepPath(currentPath: string[], dep: string) {
    const fullPath = getFullValuePath(currentPath, dep)
    if (!fullPath) {
        throw new Error(`Cannot resolve dependency path: ${dep}`)
    }
    return fullPath
}

// 使用示例
const currentPath = ['store', 'user', 'profile']
const paths = [
    resolveDepPath(currentPath, '../settings'),    // ['store', 'user', 'settings']
    resolveDepPath(currentPath, './name'),         // ['store', 'user', 'profile', 'name']
    resolveDepPath(currentPath, '/global/config')  // ['global', 'config']
]
```

[其他文档内容保持不变...]
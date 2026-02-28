# 过滤器

过滤器功能允许你精确控制哪些路径的数据会被同步，实现选择性同步。

## 基本用法

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreSyncer } from '@autostorejs/syncer'

const store1 = new AutoStore({
  count: 0,
  user: { name: 'Alice', age: 30, password: 'secret' },
  items: [] as string[]
})

const store2 = new AutoStore({
  count: 0,
  user: { name: 'Bob', age: 25 },
  items: [] as string[]
})

const syncer = store1.sync(store2, {
  filter: (path, value) => {
    // 只同步 count 路径
    return path[0] === 'count'
  },
  mode: 'both'
})

// 只有 count 的变化会被同步
store1.count = 100  // 同步
store1.user.name = 'Alice'  // 不同步
```

## 常见过滤场景

### 过滤敏感字段

```typescript
const syncer = store1.sync(store2, {
  filter: (path, value) => {
    // 不同步密码、token 等敏感信息
    const sensitiveKeys = ['password', 'token', 'secret']
    return !sensitiveKeys.includes(path[path.length - 1])
  }
})
```

### 只同步特定路径

```typescript
const syncer = store1.sync(store2, {
  filter: (path, value) => {
    // 只同步 user 路径下的数据
    return path[0] === 'user'
  }
})
```

### 排除特定路径

```typescript
const syncer = store1.sync(store2, {
  filter: (path, value) => {
    // 排除 temporary 路径
    return !path.includes('temporary')
  }
})
```

### 基于值的过滤

```typescript
const syncer = store1.sync(store2, {
  filter: (path, value) => {
    // 只同步特定类型的数据
    if (path[0] === 'items') {
      return typeof value === 'string'  // 只同步字符串项
    }
    return true
  }
})
```

### 复杂过滤逻辑

```typescript
const syncer = store1.sync(store2, {
  filter: (path, value) => {
    // 组合多个条件
    const isSensitive = ['password', 'token'].includes(path[path.length - 1])
    const isTemporary = path.includes('temp')
    const isInternal = path[0] === '_internal'

    // 排除敏感、临时、内部数据
    return !isSensitive && !isTemporary && !isInternal
  }
})
```

## 与路径映射配合使用

```typescript
const syncer = store1.sync(store2, {
  local: 'user',
  remote: 'profile',
  filter: (path, value) => {
    // 在路径映射之后应用过滤
    // 这里的 path 是已经映射后的路径
    const allowedFields = ['name', 'age', 'email']
    return !path[0] || allowedFields.includes(path[0])
  },
  pathMap: {
    toLocal: (path) => path,
    toRemote: (path) => path
  }
})
```

## 性能考虑

过滤器函数会在每次状态操作时调用，请确保：

1. **快速执行**：避免复杂的计算
2. **简单判断**：使用简单的条件判断
3. **避免副作用**：不要在过滤器中修改状态

```typescript
// 好的做法
const syncer = store1.sync(store2, {
  filter: (path) => {
    return path[0] === 'allowed'
  }
})

// 避免的做法
const syncer = store1.sync(store2, {
  filter: (path, value) => {
    // 避免复杂的计算和异步操作
    const result = await someAsyncCheck(value)  // ❌ 错误
    return result
  }
})
```

## 调试过滤器

```typescript
const syncer = store1.sync(store2, {
  filter: (path, value) => {
    const shouldSync = path[0] === 'count'
    console.log('Filter:', path, '->', shouldSync)
    return shouldSync
  },
  debug: true  // 启用调试模式
})

// 监听过滤器日志
syncer.on('localOperate', (operate) => {
  console.log('Local operate:', operate)
})
```

## 使用场景

- **数据隐私**：过滤敏感信息
- **性能优化**：只同步必要的数据
- **权限控制**：根据用户权限过滤数据
- **数据脱敏**：过滤或转换敏感字段
- **选择性同步**：不同客户端同步不同数据

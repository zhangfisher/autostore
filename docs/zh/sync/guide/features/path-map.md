# 路径映射

路径映射功能允许你在同步时转换本地和远程的路径结构，实现不同状态结构之间的映射。

## 基本用法

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreSyncer } from '@autostorejs/syncer'

const store1 = new AutoStore({
  user: {
    profile: {
      name: 'Alice',
      age: 30
    }
  }
})

const store2 = new AutoStore({
  profile: {
    name: 'Bob',
    age: 25
  }
})

const syncer = store1.sync(store2, {
  local: 'user.profile',  // store1 中的路径
  remote: 'profile',      // store2 中的路径
  mode: 'both'
})

// 修改 store1.user.profile.name，store2.profile.name 会同步
store1.user.profile.name = 'Alice'
console.log(store2.profile.name) // 'Alice'
```

<demo react="syncer/features/pathMap.tsx" />

演示了嵌套结构与扁平化结构之间的双向映射：左侧 `Store1` 是嵌套的 `user.name` / `user.age`，右侧 `Store2` 是扁平化的 `'user.name'` / `'user.age'` 键值。任一侧修改，另一侧经过 `toRemote` / `toLocal` 路径转换后同步更新。

## 使用 pathMap 函数

当需要更复杂的路径转换时，可以使用 `pathMap` 选项：

```typescript
const store1 = new AutoStore({
  'user.profile': {
    name: 'Alice'
  }
})

const store2 = new AutoStore({
  profile: {
    name: 'Bob'
  }
})

const syncer = store1.sync(store2, {
  pathMap: {
    toLocal: (path, value) => {
      // 将远程的 ['profile', 'name'] 映射到本地的 ['user.profile', 'name']
      if (path[0] === 'profile') {
        return ['user.profile', ...path.slice(1)]
      }
      return path
    },
    toRemote: (path, value) => {
      // 将本地的 ['user.profile', 'name'] 映射到远程的 ['profile', 'name']
      if (path[0] === 'user.profile') {
        return ['profile', ...path.slice(1)]
      }
      return path
    }
  },
  mode: 'both'
})
```

## 扁平化与嵌套结构映射

```typescript
// store1 使用扁平化结构
const store1 = new AutoStore({
  'user.name': 'Alice',
  'user.age': 30,
  'user.city': 'Beijing'
})

// store2 使用嵌套结构
const store2 = new AutoStore({
  user: {
    name: 'Bob',
    age: 25,
    city: 'Shanghai'
  }
})

const syncer = store1.sync(store2, {
  pathMap: {
    toLocal: (path) => {
      // 远程 ['user', 'name'] -> 本地 ['user.name']
      if (path[0] === 'user') {
        return [`user.${path[1]}`]
      }
      return path
    },
    toRemote: (path) => {
      // 本地 ['user.name'] -> 远程 ['user', 'name']
      if (path[0].startsWith('user.')) {
        const key = path[0].substring(5)
        return ['user', key]
      }
      return path
    }
  }
})
```

## 不同属性名映射

```typescript
const store1 = new AutoStore({
  user: {
    firstName: 'Alice',
    lastName: 'Smith'
  }
})

const store2 = new AutoStore({
  person: {
    givenName: 'Bob',
    familyName: 'Jones'
  }
})

const syncer = store1.sync(store2, {
  pathMap: {
    toLocal: (path) => {
      if (path[0] === 'person') {
        if (path[1] === 'givenName') return ['user', 'firstName']
        if (path[1] === 'familyName') return ['user', 'lastName']
      }
      return path
    },
    toRemote: (path) => {
      if (path[0] === 'user') {
        if (path[1] === 'firstName') return ['person', 'givenName']
        if (path[1] === 'lastName') return ['person', 'familyName']
      }
      return path
    }
  }
})

store1.user.firstName = 'Alice'
console.log(store2.person.givenName) // 'Alice'
```

## 注意事项

1. **映射函数的入参是完整路径**：`toLocal` / `toRemote` 收到的都是**完整状态路径**（相对于 `local` / `remote` 前缀裁剪后再由同步器拼接，最终落到目标 store 的就是函数返回值 + 前缀）。当声明了 `local` / `remote` 前缀时，`toRemote` 的入参是去掉 `local` 前缀后的**相对路径**，而 `toLocal` 的入参是**完整远程路径**——两侧约定不一致，映射函数必须分别对齐，否则会出现路径错位（如嵌套结构被错误展开、字段落到根路径下）。做整体结构映射时建议**不声明** `local` / `remote`，让映射函数直接在完整路径上转换，最不易出错
2. **双向映射**：如果使用双向同步（`mode: 'both'`），需要同时指定 `toLocal` 和 `toRemote`，且两者必须是互逆变换
3. **返回值**：路径映射函数应返回新的路径数组，或返回 `undefined` 以阻止该路径的同步
4. **性能**：路径映射函数会在每次操作时调用，请确保函数执行高效
5. **测试**：复杂的路径映射建议编写测试用例验证正确性

# AutoStore

[![npm version](https://badge.fury.io/js/autostore.svg)](https://badge.fury.io/js/autostore)

[官网](https://zhangfisher.github.io/autostore)

Very easy and elegant state management library. It is based on proxy and provides functions such as signaling, computation, and watching to ensure fine-grained updates

## 特性

- 响应式核心：基于`Proxy`实现，数据变化自动触发视图更新
- 就地计算属性：独有的就地计算特性，可以在状态树中任意位置声明`computed`属性，计算结果原地写入。
- 依赖自动追踪：自动追踪`computed`属性的依赖，只有依赖变化时才会重新计算
- 异步计算：强大的异步计算控制能力，支持`超时、重试、取消、倒计时、进度`等高级功能。
- 状态变更监听：能监听`get/set/delete/insert/update`等状态对象和数组的操作监听。
- 信号组件：支持`signal`信号机制，可以实现细粒度的组件更新。
- 调试与诊断：支持`chrome`的`Redux DevTools Extension`调试工具，方便调试状态变化。
- 嵌套状态：支持任意深度的嵌套状态，无需担心状态管理的复杂性
- 表单绑定：强大而简洁的双向表单绑定，数据收集简单快速
- 循环依赖：能帮助检测循环依赖减少故障
- Typescript: 完全支持Typescript，提供完整的类型推断和提示
- 单元测试：提供完整的单元测试覆盖率，保证代码质量


## 安装

```bash
npm install @autostorejs/react
yarn add @autostorejs/react
pnpm add @autostorejs/react
```

## 快速入门


- **基本用法**

```ts

import { createStore } from '@autostorejs/react';

const { $, state,useState } = createStore({
  user: {
    firstName: 'zhang',
    lastName: 'fisher',
    fullName: (scope)=> { 
      return scope.firstName + scope.lastName;
    }
  }
});

// use in component
const Card = () => {
    const [ firstName,setFirstName ] = useState('user.firstName');
    const [ lastName,setLastName ] = useState('user.lastName');
    return <div>
      <div>FirstName:{firstName}</div>
      <div>LastName:{lastName}</div>
    </div>
}

```
- **信号组件**

```ts

import { createStore } from '@autostorejs/react';

const { $, state } = createStore({
  user: {
    firstName: 'zhang',
    lastName: 'fisher',
    fullName: (scope)=> { 
      return scope.firstName + scope.lastName;
    }
  }
});

// signal component, only update when user.firstName or user.lastName change
const Card = () => { 
    return <div>$('user.fullName')</div>
}

```

- **原地计算**

```ts

import { createStore,computed } from '@autostorejs/react';

const { $, state } = createStore({
  user: {
    firstName: 'zhang',
    lastName: 'fisher',
    fullName: computed(async (scope)=> { 
      return scope.firstName + scope.lastName;
    },["./firstName","./lastName"])
  }
});

// signal component, only update when user.firstName or user.lastName change
const Card = () => { 
    return <div>$('user.fullName')</div>
}

```

async computed with [loading](https://zhangfisher.github.io/autostore/guide/computed-async#%E5%8A%A0%E8%BD%BD%E7%8A%B6%E6%80%81),[timeout](https://zhangfisher.github.io/autostore/guide/computed-async#%E8%B6%85%E6%97%B6%E5%A4%84%E7%90%86), [retry](https://zhangfisher.github.io/autostore/guide/computed-async#%E9%87%8D%E8%AF%95), [cancel](https://zhangfisher.github.io/autostore/guide/computed-async#%E5%8F%96%E6%B6%88), [countdown](https://zhangfisher.github.io/autostore/guide/computed-async#%E5%80%92%E8%AE%A1%E6%97%B6), [progress](https://zhangfisher.github.io/autostore/guide/computed-async#%E6%89%A7%E8%A1%8C%E8%BF%9B%E5%BA%A6).


- **表单双向绑定**

Form two-way binding is very simple.

```ts

import { createStore,computed } from '@autostorejs/react';

const { $, state,useForm } = createStore({
  user: {
    firstName: 'zhang',
    lastName: 'fisher',
  }
});

// simple two-way form binding
const Card = () => { 
    const user = useForm()
    return <div {...user}>
      <input name="user.firstName" />
      <input name="user.lastName" />
    </div>
}

```

## License

[MIT](./LICENSE)


# AutoStore

[![npm version](https://badge.fury.io/js/autostore.svg)](https://badge.fury.io/js/autostore)

[Document](https://zhangfisher.github.io/autostore)

Very easy and elegant state management library. It is based on proxy and provides functions such as signaling, computation, and watching to ensure fine-grained updates

## Features

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



## get-started

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


const Card = () => { 
    return <div>$('user.fullName')</div>
}

```



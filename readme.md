# AutoStore

[![npm version](https://badge.fury.io/js/autostore.svg)](https://badge.fury.io/js/autostore)

Very easy and elegant state management library. It is based on proxy and provides functions such as signaling, computation, and watching to ensure fine-grained updates

## Features

- **Simple**: Very simple API, easy to learn and use
- **Elegant**: Based on proxy, it is very elegant and efficient
- **Powerful**: Provides a variety of functions such as 
- **computed**: 
- **watching**: 
- **signal**: 
- **devtools**: Support for chrome devtools extension

- 响应式核心：基于`Proxy`实现，无需手动调用`setState`，数据变化自动触发视图更新
- 计算属性： 在状态树中任意位置声明yfh 算属性，自动计算并缓存结果
- 强大的计算：能力


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



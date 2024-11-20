# AutoStore

[![npm version](https://badge.fury.io/js/autostore.svg)](https://badge.fury.io/js/autostore)

[Document](https://zhangfisher.github.io/autostore)

Very easy and elegant state management library. It is based on proxy and provides functions such as signaling, computation, and watching to ensure fine-grained updates

## Features

- **Reactive**: Implemented based on `Proxy`, automatically triggers view updates when data changes.
- **In-place Computed**: Unique in-place computation feature allows declaring `computed` properties anywhere in the state tree, with results written in place.
- **Automatic Dependency Tracking**: Automatically tracks dependencies of `computed` properties, only recalculates when dependencies change.
- **Asynchronous Computation**: Powerful asynchronous computation control, supports advanced features like `timeout, retry, cancel, countdown, progress`.
- **State watch**: Can listen to operations on state objects and arrays such as `get/set/delete/insert/update`.
- **Signal Components**: Supports `signal` mechanism, enabling fine-grained component updates.
- **DevTools**: Supports `Redux DevTools Extension` for `chrome`, making it easy to debug state changes.
- **Nested State**: Supports arbitrarily deep nested states, eliminating concerns about the complexity of state management.
- **Form Binding**: Powerful and simple two-way form binding, making data collection easy and fast.
- **Circular Dependency**: Helps detect circular dependencies to reduce faults.
- **TypeScript**: Fully supports TypeScript, providing complete type inference and hints.
- **Unit Testing**: Provides comprehensive unit test coverage to ensure code quality.

## Install

```bash
npm install @autostorejs/react
yarn add @autostorejs/react
pnpm add @autostorejs/react
```

## Get-started


- **Basic usage**

```ts

import { createStore } from '@autostorejs/react';

const { $, state,useReactive } = createStore({
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
    const [ firstName,setFirstName ] = useReactive('user.firstName');
    const [ lastName,setLastName ] = useReactive('user.lastName');
    return <div>
      <div>FirstName:{firstName}</div>
      <div>LastName:{lastName}</div>
    </div>
}

```
- **Signal Component**

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

- **InPlace async computed**

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


- **Form Two-way Binding**

Form two-way binding is very simple.

```ts

import { createStore,computed } from '@autostorejs/react';
 
// simple two-way form binding
const Card = () => { 
    const { Form } = useForm({
      user: {
        firstName: 'zhang',
        lastName: 'fisher',
      }
    })
    return <Form>
      <input data-field-name="user.firstName" />
      <input data-field-name="user.lastName" />
    </Form>
}

```

## License

[MIT](./LICENSE)


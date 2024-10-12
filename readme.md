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
- **Debugging**: Supports `Redux DevTools Extension` for `chrome`, making it easy to debug state changes.
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

- **Two-way Form Binding**

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




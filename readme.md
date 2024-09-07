# AutoStore

Very easy and elegant state management library. It is based on proxy and provides functions such as signaling, computation, and watching to ensure fine-grained updates

## get-started

```ts

import { createStore } from 'autostore';

const { watch, $, state } = createStore({
  firstName: 'zhang',
  lastName: 'fisher',
  fullName: (scope)=> { 
    return scope.firstName + scope.lastName;
  }
});

watch('fullName', (value)=> {
  console.log(value);
});

const Card = () => { 
    return <div>$(state.fullName)</div>
}

```
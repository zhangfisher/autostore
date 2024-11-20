# devtools

 `AutoStore` support [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools) come to debug `AutoStore` state.

## Use

### Install

First of all, you need to install `@autostorejs/devtools` and [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools).

:::code-group

```bash [npm]
npm install  @autostorejs/devtools
```

```bash [yarn]
yarn add @autostorejs/devtools
```

```bash [pnpm]
pnpm add @autostorejs/devtools
``` 
:::

### Introduce

Import at the beginning of your project `@autostorejs/devtools`.

```ts
//main.ts | app.ts | index.ts

import `@autostorejs/devtools` 

```

Then create `AutoStore` specify `debug=true` 

```tsx {12-13}
import { createStore,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components" 
const { state,$ } = createStore({
  firstName:"Zhang",
  lastName:"Fisher",
  age:18,
  fullName:(user)=>user.firstName+user.lastName,
  salary:computed(async (user)=>{
    return user.age * 10
  },['age'])
},{
  debug:true,  // 配置调试模式
  id:"user"   // 配置id便以在devTools中显示
})
  
``` 

<demo react ="debug/devTool.tsx"/>

- Open up `debug=true` back,`AutoStore` will connect automatically `Redux DevTools Extension`.
- Each `Store` both have one `id` if it is not introduced, it will be randomly generated. Use `Redux DevTools Extension` the suggestion is `store` take a meaningful name.

### use

Now, you can open `Redux DevTools Extension` check `AutoStore` the state is.

 ![devtools](./devtools.png) 


:::warning reminder
- Click in the above example `Age++` and `Change lastName` button, then view `Redux DevTools Extension` the state changes.
- You can also see more debugging information on the console.
:::
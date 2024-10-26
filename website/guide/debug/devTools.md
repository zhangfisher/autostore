---
group:
  title: 调试与诊断
  order: 6
order: 0 
title: devTools
demo:
  tocDepth: 5
toc: content
---

# devTools


`AutoStore`支持使用[Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)来调试`AutoStore`的状态。

## 使用方法

### 安装

首先需要安装`@autostorejs/devtools`和[Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)。

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



### 引入

在你的项目的最开始处导入`@autostorejs/devtools`。

```ts | pure
//main.ts | app.ts | index.ts

import `@autostorejs/devtools`

```

然后在创建`AutoStore`时,指定`debug=true`

```tsx
import { createStore,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"
const { state,useState,$ } = createStore({
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
 

export default () => {
  const [age,setAge] = useState('age') 
  const [salary,setSalary] = useState('salary') 
  const [lastName,setLastName] = useState((state)=>state.lastName,(name,user)=>user.lastName=name) 

  return <div>    
      <ColorBlock>Fullname :{state.firstName}{' '}{lastName}</ColorBlock>
      <ColorBlock>Age :{age}</ColorBlock>
      <ColorBlock>Salary: {$('salary')}</ColorBlock>
      <Button onClick={()=>setAge(age+1)}>Age++</Button> 
      <Button onClick={()=>setLastName(lastName+'.')}>Change lastName</Button>
    </div>
}

``` 

- 启用`debug=true`后，`AutoStore`会自动连接到`Redux DevTools Extension`。
- 每个`Store`均具有一个`id`，如果没有传入则会随机生成。在使用`Redux DevTools Extension`时，建议为`store`取个有意义的名称。

### 使用

现在，你可以打开`Redux DevTools Extension`查看`AutoStore`的状态了。

![devTools](./devtools.png)


:::success{title=提示}
- 单击以上示例中的`Age++`和`Change lastName`按钮，然后查看`Redux DevTools Extension`中的状态变化。
- 在控制台你还可以看到更多的调试信息。
:::

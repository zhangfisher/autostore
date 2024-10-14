---
group:
  title: 开始
  order: 0
order: 2   
demo:
  tocDepth: 5
toc: content
---

# 快速入门

`AutoStore`功能强大，易于使用。以下通过构建一个简单书店商城的例子来展示如何使用`AutoStore`，体验`AutoStore`极致优雅和强大的功能。

## 第1步: 安装

:::code-group

```bash [npm]
npm install  @autostorejs/react
npm install @autostorejs/devtools
```

```bash [yarn]
yarn add @autostorejs/react
yarn add @autostorejs/devtools
```

```bash [pnpm]
pnpm add @autostorejs/react
pnpm add @autostorejs/devtools
``` 
:::

安装`@autostorejs/devtools`可以让开发者使用`chrome`的[Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)来调试`AutoStore`的状态。

## 第2步: 创建Store

使用`createStore`来创建一个`Store`。

```ts | pure
import { createStore } from '@autostorejs/react';

const store = createStore({
  orders: [
    {
      book: 'AutoStore最佳实践',
      price: 39.9,
      count: 1 
    }
  ] 
});
```

- 通过`store.state`可以访问状态树，自动进行类型推断。


## 第3步: 创建计算属性

接下为，我们需要计算订单的`小结`和`总计`，只需要使用同步计算即可。

```ts | pure {9-10,13-14}
import { createStore } from '@autostorejs/react';

const store = createStore({
  orders: [
    {
      book: 'AutoStore最佳实践',
      price: 39.9,
      count: 1,
      // 小计
      total: (scope)=>scope.price*scope.count
    }
  ],
  // 总计
  total: (scope)=>scope.orders.reduce((acc,cur)=>acc+cur.total,0)

});
```


- `total`是一个计算属性，其值是`orders`的`total`的和，在创建时会自动收集依赖，当`price`或`count`变化时会自动重新计算。


**运行效果如下：**

```tsx  
import { createStore } from '@autostorejs/react';
import {  ColorBlock,Button,Divider,Layout,JsonView } from "x-react-components"

const {state,$,useState} = createStore({
  orders: [
    {
      book: 'AutoStore最佳实践',
      price: 39.9,
      count: 1,
      // 小计
      total: (scope)=>scope.price*scope.count
    }
  ],
  // 总计
  total: (scope)=>scope.orders.reduce((acc,cur)=>acc+cur.total,0)

});
export default ()=>{
  const [orders] = useState()
  return <Layout>
    <div>
      <ColorBlock name="书名">{$('orders.0.book')}</ColorBlock>
      <ColorBlock name="单价">{$('orders.0.price')}</ColorBlock>
      <ColorBlock name="数量">
        <Button onClick={()=>state.orders[0].count--}>-</Button>
        {$('orders.0.count')}
        <Button onClick={()=>state.orders[0].count++}>+</Button>
      </ColorBlock>
      <ColorBlock name="小计">{$('orders.0.total')}</ColorBlock>
      <Divider/>
      <ColorBlock name="总计">{$('total')}</ColorBlock>
    </div>
    <div>
      <JsonView data={orders}/>
    </div>
  </Layout>  
}

```

## 第4步: 创建异步计算属性

接下我们为订单增加一个`折扣(discount)`字段。

订单的折扣是动态的，其计算很复杂，由后台的业务逻辑决定，可能会根据订单的数量、种类、时间、用户是否是VIP等来决定，因此我们设计`折扣(discount)`字段为一个异步计算属性。

```ts | pure {13-20}
import { createStore } from '@autostorejs/react';

const store = createStore({
  orders: [
    {
      book: 'AutoStore最佳实践',
      price: 39.9,
      count: 1,
      // 小计
      total: (scope)=>scope.price*scope.count
    }
  ],
  //  折扣
  discount: async (scope)=>{
    // 模拟异步计算: 向后台请求折扣
    // 如await fetch(`/api/discount?userId=1&total=${scope.total}....`) 
    await new Promise(resolve=>setTimeout(resolve,1000))
    return 0.8
  },
  // 总计
  total: (scope)=>scope.orders.reduce((acc,cur)=>acc+cur.total,0) * scope.discount.value

});
```

注意： `discount`是一个异步计算属性，其计算函数是一个异步函数，其返回值会写入`store.state.discount`，这就是`AutoStore`与其他状态库最大不同之处，即原地计算。


**运行效果如下：**

```tsx  
import { createStore,delay } from '@autostorejs/react';
import {  ColorBlock,Button,Divider,Layout,JsonView } from "x-react-components"

const {state,$,useState} = createStore({
  orders: [
    {
      book: 'AutoStore最佳实践',
      price: 39.9,
      count: 1,
      // 小计
      total: (scope)=>scope.price*scope.count
    }
  ],
  //  折扣
  discount: async (scope)=>{
    // 模拟异步计算: 向后台请求折扣
    // 如await fetch(`/api/discount?userId=1&total=${scope.total}....`) 
    await delay()
    return 0.8
  },
  // 总计
  total: (scope)=>scope.orders.reduce((acc,cur)=>acc+cur.total,0)

});
export default ()=>{
  const [orders] = useState()
  return <Layout>
    <div>
      <ColorBlock name="书名">{$('orders.0.book')}</ColorBlock>
      <ColorBlock name="单价">{$('orders.0.price')}</ColorBlock>
      <ColorBlock name="数量">
        <Button onClick={()=>state.orders[0].count--}>-</Button>
        {$('orders.0.count')}
        <Button onClick={()=>state.orders[0].count++}>+</Button>
      </ColorBlock>
      <ColorBlock name="小计">{$('orders.0.total')}</ColorBlock>
      <Divider/>
      <ColorBlock name="折扣">{$('discount.value')}</ColorBlock>
      <ColorBlock name="总计">{$('total')}</ColorBlock>
    </div>
    <div>
      <JsonView data={orders}/>
    </div>
  </Layout>  
}

```



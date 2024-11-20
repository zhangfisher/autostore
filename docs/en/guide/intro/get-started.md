# Get started quickly
 `AutoStore` powerful and easy to use. The following is the example of building a simple bookstore mall to display how to use it `AutoStore`, Experience `AutoStore` extremely elegant and powerful functions.

## Step 1: Installation

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

Install `@autostorejs/devtools` can be used for developers `chrome` of [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools) come to debug `AutoStore` state.

## Step 2: Create Store

use `createStore` come to create a `Store`.

```ts
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

- pass `store.state` you can access the state tree and automatically infer.


## Step 3: Create calculation attributes

Next, we need to calculate the order `summary` and `total` just use synchronous calculations.

```ts {9-10,13-14}
import { createStore } from '@autostorejs/react';

const store = createStore({
  orders: [
    {
      book: 'AutoStore最佳实践',
      price: 39.9,
      count: 1,
      // 小计
      total: (order)=>order.price*order.count
    }
  ],
  // 总计
  total: (scope)=>scope.orders.reduce((acc,cur)=>acc+cur.total,0)

});
```


- `total` it is a calculation attribute, and its value is `orders` of `total` harmony, it will automatically collect dependencies when created.`price` or `count` the change will be automatically re -calculated.
- `total` the first parameter of the calculation attribute `scope` the default refers to the object where it is, so `(order)=>order.price*order.count` it may be calculated `total` value, then write `store.state.orders.[index].total`.

 **The running effect is as follows:** 

<demo react ="get-started/createComputed.tsx"/>
 

## Step 4: Create asynchronous computing attributes

Next we add one to the order `Discount (discount)` field.

The discount of orders is dynamic, and its calculation is complicated. It is determined by the business logic of the background. It may be determined based on the number of orders, types, time, and whether the user is VIP, etc. Therefore, we design `Discount (discount)` the field is an asynchronous computing attribute.

```ts
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
  //  折扣： 向后台请求折扣
  discount: computed(async (scope)=>{   // [!code ++]
    // 如await fetch(`/api/discount?userId=1&total=${scope.total}....`) // [!code ++]
    await delay(2000)// [!code ++]
    return  (0.5 + Math.random()).toFixed(2)// [!code ++]
  },['orders.*.total'],{async:true,initial:0.9}),// [!code ++]
  // 总计
  total: computed(async (scope)=>{ 
    return scope.orders.reduce((acc,cur)=>acc+cur.total,0)*scope.discount.value
  },['discount'],{async:true})  

});
```

 **Notice** the

- `discount` it is an asynchronous calculation attribute. The calculation function is an asynchronous function, and its return value will be written `store.state.discount` this is `AutoStore` the biggest difference from other status libraries is **In -site calculation**.


 **The running effect is as follows:** 

<demo react ="get-started/asyncDiscount.tsx"/>
 

In the above example, we declare two asynchronous computing attributes `discount` and `total` 

- `discount` rely `orders.*.total`, That is, dependence `orders` array `total` property. When the number of orders changes, trigger `discount` the calculation function, the calculation function will request discounts from the background, and then return the new discount value. (In the above example, we simulated the process of request discounts, and used it.`delay` functions, in actual projects, we may use `fetch` or `axios` wait for the request discount).
- `total` depend on `discount`, That is, dependence `discount` value. when `discount` during the change, trigger `total` calculating function, re -calculate the total.

 
:::warning Note
Asynchronous calculation in the above example `discount` need `2000ms` you can see `discount` and `total` changes. During the interface, there was no change in the interface. Obviously, this was unfriendly. Generally, it is best to display one when calculating the discount process `loading` state, tell users that they are asking for discounts. When the discount request is completed, the discount value is displayed.
therefore,`AutoStore` provide `loading`,`error`,`timeout`,`retry`,`cancel`,`progress` wait for advanced functions.
:::


## Step 5: Control asynchronous calculation

In the previous step, when we adjust the number of orders `count` need, need `2000ms` you can see `discount` and `total` changes. During the period, there was no change in the interface. Obviously this is unfriendly, we need to display a `loading` state, tell users that they are asking for discounts. When the discount request is completed, the discount value is displayed.

At this time, we can start introducing `Asynchronous calculation` various advanced functions.**Let's display it first when calculating`loading`state.** 

Compared with synchronous calculation attributes, creating asynchronous computing attributes `discount` when, it will be converted to one `AsyncComputedValue` objects back to `state.state.discount` at this time `state.state.discount` the value is as follows:

```ts
{
    loading : false,
    progress: 0,  
    timeout : 0,  
    error  : null,
    retry : 0,  
    value: 0.9,        // [!code warning]
    run:()=>{...}
}
```

In other words, there will be one asynchronous calculation attribute `loading` field, when the calculation function runs,`loading` for `true` when the calculation function is running,`loading` for `false`.

Therefore, in this example, we can pass `discount.loading` let's judge whether it is asking for discount, if so, display it `loading` state.

 **The running effect is as follows:** 

<demo
react ="get-started/asyncDiscountLoading.tsx" 
Title = "Please adjust the number of orders" 
/>

When adjusting the number of orders, you can see `discount` and `total` the change, it shows at the same time `loading` state. When the discount request is completed,`loading` the state disappears and shows the discount value.

Everything is as expected. Of course, the actual project is only displayed `loading` the state is not enough. Generally, we need to add the following functions:
- **Overtime**: The discount from the server may make an error.
- **Countdown**: Maybe we want to show a countdown and tell the user how long to request to complete.
- **Review mechanism**: If the request fails, we may take a look at the request.
- **Error treatment**: If the request fails, we need to display the error message.
- **Cancel**: If the user cancels the order, we need to cancel the request.
- **Processing progress**: Maybe we want to provide a request progress `0-100%`, Tell the user to request progress.

All these functions `AutoStore` you are ready for you, use the box and use it, simple and fast, see [Asynchronous calculation](/guide/computed/async) 

## Step 6: Add orders

We have only one order above, then we add multiple orders to see `AutoStore` how to handle multiple orders.

1. First use `useForm` create a form to collect user input.

```tsx
  const { state:newOrder, Form:NewOrderForm } = useForm({
      book:'精通AutoStore',
      price:10,
      count:1 
  })   
```

- `useForm` an interior also created one `AutoStore` it is used to save new orders.

2. use `store.state.orders.push` add new orders to `orders` in an array.

```tsx
  <Button onClick={()=>{
    store.state.orders.push({
      ...newOrder,
      total:calcOrderTotal
    })
  }}>Add</Button>
```


 **The running effect is as follows:** 

<demo react ="get-started/addOrder.tsx"/>


:::warning
 `AutoStore` provided very powerful forms of two -way binding capabilities. For details, please refer to [Form binding](/guide/form/about) view more content.
:::

## Step 7: Debugging and diagnosis

During the development and debugging process,`AutoStore` support [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools) come to debug `AutoStore` state.

You only need to import at the beginning of your project `@autostorejs/devtools`, Then configure `{debug:true}` just accept it.

```ts {3,6}
//main.ts | app.ts | index.ts

import `@autostorejs/devtools` 

// 创建store时，配置debug:true
const store = createStore({...},{
  debug:true,
  id:"user"   // 配置id便以在devTools中显示
})

```

The effect is as follows:

 ![devtools](../debug/devtools.png) 


## summary

- use `createStore` or `useStore` you can create an arbitrary nested response state object.
- Use in components `useReactive` you can access status data and automatically renders it when the state changes.
- use `$ ('Status path')` A signal component can be created, which limits the rendering update to a thinner range.
- use `computed` it can create a calculation attribute, which is calculated based on other states. When the dependency state changes, it will automatically re -calculate.
- Asynchronous computing support `loading`,`error`,`timeout`,`retry`,`cancel`,`progress` wait for advanced functions.
- `useForm` can put the table unit element and `store` two -way binding is very convenient.
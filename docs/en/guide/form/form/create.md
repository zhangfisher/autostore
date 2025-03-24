
# Create a form
use `useForm` used to create `AutoStore` forms can implement forms and `AutoStore` two -way binding between state.

## Create a form

Can pass `useForm` create a new form, as follows:

### Step 1: Introduction `useForm` 

```tsx
import { useForm } from "@autostorejs/react" 
const { Form } = useForm({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    age:18,
    vip:false 
  }  
}) 
```

:::warning reminder
 `useForm` create one inside `AutoStore` examples are used to store form data.
:::


### Step 2: Use `Form` component

```tsx
<Form  
  onSubmit={(e)=>{
    // 提交表单
  }}
>
    {/*  字段 */}
</Form>
```

### Step 3: Statement `Field` 

exist `Form` inside the component, you can use three ways to create `Field`.

```tsx
<Form>
  {/* 简单输入受控字段 */}
  <input name="user.firstName" />
  {/* 封装受控字段 */}
  <div data-field-name="user.lastName">
    <input/>
  </div>
  {/* 自定义字段 */}
  <Field name="user.age" render={({bind})=>{
    return <input {...bind}/>
  }}/>
</Form>
```

More `Field` please refer to the usage of components [Fieeld component](../../form/field/field-component.md).

### Step 4: Submit the form

It's so simple, easy to achieve `Form` and `store.state` the two -way binding between the between, the input data will automatically synchronize `state` in the instead, vice versa.

### summary

 **The following is a simple example:** 

<demo react ="form/form/base.tsx"/>


## Binding form

The data status bound by the form is from:

- Newly created `AutoStore` instance
- Bind to existing `AutoStore` instance

### New Store

use `useForm(<state>)` create a brand new form, and will create one internally `Store` example. all `AutoStore` aPIs can be used.

```ts
import { useForm } from "@autostorejs/react" 
const { 
  Form,
  state,
  useReactive,
  $,
  watch,
  batchUpdate
  signal,
  useState,    
  useAsyncState,     
  useAsyncReactive,
  useDeps,           
  useWatch,          
  bind,              
  useField,          
  useFields,         
  useObserverObject, 
  useComputedObject, 
  useComputed,       
  reset
} = useForm({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    age:18,
    vip:false 
  }  
}) 
```

### Bind the existing store

 `useForm` can also be based on existing `Store` create a form for example, as follows:

<demo react ="form/form/fromStore.tsx"/>


## Multi -form

Based on a complex data structure,`useForm` one `entry` parameters are used to point to a node in the status data and create forms based on the node.

```tsx {17-28}
const store = createStore({
    orders:[
        {
            name:"精通AutoStore",
            price:18,
            count:2,
        },
        {
            name:"AutoStore最佳实践",
            price:98,
            count:1,
        }
    ],
}) 

// 通过entry参数，可以创建多个表单
const { Form,reset } = useForm(store,{
  entry:`orders.0`        // 指向orders数组中的第一个元素
})
const { Form,reset } = useForm(store,{
  entry:`orders.1`       // 指向orders数组中的第二个元素
})
```

- Use `useForm` of `entry` when parameter, it will be based on `entry` create a form at the node.
- `entry` the value of the parameter is a state `path` string.

 **Example:** 

<demo react ="form/form/multiForm.tsx"/>

# 创建表单

使用`useForm`用于创建基于`AutoStore`的表单,可以实现表单与`AutoStore`状态之间的双向绑定。

## 创建表单

可以通过`useForm`创建一个全新的表单，如下：

### 第1步：引入`useForm`

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

:::warning 提示
`useForm`内部会创建一个`AutoStore`实例，用于存储表单数据。
::: 


### 第2步：使用`Form`组件

```tsx
<Form  
  onSubmit={(e)=>{
    // 提交表单
  }}
>
    {/*  字段 */}
</Form>
```

### 第3步：声明`Field`

在`Form`组件内部，可以使用三种方式来创建`Field`。

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

更多的`Field`组件的用法请参考[Field组件](/guide/form/field/field-component.md)。

### 第4步：提交表单

就这么简单，轻松实现`表单`与`store.state`之间的双向绑定了，输入的数据会自动同步到`state`中，反之亦然。

### 小结

**下面是一个简单的示例：**

<demo react="form/form/base.tsx"/>


## 绑定表单

表单绑定的数据状态来源于：

- 新创建的`AutoStore`实例
- 绑定到现有的`AutoStore`实例

### 新建Store

使用`useForm(<state>)`创建一个全新的表单，内部会创建一个`Store`实例。所有`AutoStore`的API都可以使用。

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

### 绑定现有Store

`useForm`还可以基于现有的`Store`实例创建表单，如下：

<demo react="form/form/fromStore.tsx" />


## 多表单

基于一个复杂的数据结构，`useForm`提供了一个`entry`参数，用来指向状态数据中的某个节点，并基于该节点创建表单。

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

- 当使用`useForm`的`entry`参数时，会基于`entry`指向的节点创建表单。
- `entry`参数的值是一个状态`path`字符串。

**示例：**

<demo react="form/form/multiForm.tsx" />
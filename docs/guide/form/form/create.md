
# 创建表单

使用`useForm`返回`Form`或`Field`等来创建组件。

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
<Form>
  <input name="user.firstName" />
  <input name="user.lastName" />
  <input name="user.age" />
  <input name="user.vip" />
</Form>
```

就这么简单，轻松实现`表单`与`store.state`之间的双向绑定了，输入的数据会自动同步到`state`中，反之亦然。

**下面是一个简单的示例：**

<demo react="form/form/base.tsx"/>



## 绑定表单

表单绑定的数据状态来源于：

- 全新创建的`Store`实例
- 绑定到现有的`Store`实例

### 新建Store

使用`useForm(state)`创建一个全新的表单，内部会创建一个`Store`实例。所有`AutoStore`的API都可以使用。

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

`useForm`提供了一个`entry`参数，允许截取`AutoStore`中的局部状态来创建表单。

<demo react="form/form/multiForm.tsx" />
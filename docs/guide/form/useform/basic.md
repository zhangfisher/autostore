
# 基本用法

`useForm`返回`Form`或`Field`等组件，该组件是对标准`form`元素的封装。

## 全新表单

可以通过`useForm`创建一个全新的表单，如下：

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
<Form>
  <input name="user.firstName" />
  <input name="user.lastName" />
  <input name="user.age" />
  <input name="user.vip" />
</Form>
```

就这么简单，轻松实现`表单`与`store.state`之间的双向绑定了，输入的数据会自动同步到`state`中，反之亦然。


**下面是一个简单的示例：**

demo react="form/formBase.tsx"

:::warning 提示
`useForm`内部会创建一个`Store`实例，用于存储表单数据。
::: 


## 基于现有Store

`useForm`还可以基于现有的`Store`实例创建表单，如下：

<demo react="form/formStore.tsx" />



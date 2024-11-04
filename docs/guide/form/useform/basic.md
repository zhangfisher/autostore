
# 基本用法

`useForm`返回一个`Form`组件，该组件是对标准`form`元素的封装。

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

<demo react="form/formBase.tsx"/>



:::info 提示
配置`input`元素的`name=<状态数据路径>`即可。
::: 

#  快速入门

## 第1步： 创建表单

首先，我们需要使用`useForm`创建一个表单。

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


- `useForm`内部调用`createStore`来创建一个`AutoStore`，所以其本质上`useForm`是一个`useStore`超集。所以`useForm`返回的对象中包含了`useStore`返回的对象。

  ```tsx
  const { useReactive,watch,$,.... } = useForm({...})
  ```
- `useForm`返回值中最主要的是`Form`组件，该组件是对标准`form`的封装。


## 第2步：声明字段

声明字段有几个方式：

- **简单字段**

只需要为`input`、`textarea`、`select`元素设置`name`属性，且`name`为一个`字符串路径`指向状态即可。

```tsx
<input name="user.firstName" />
```

- **封装字段**

当然，实际中的输入字段我们一般会进行封装，以便可以进行更多的控制。

我们也可以在封装元素上通过`data-field-name='<状态路径>'`标识这是一个表单字段。

```tsx {1,3}
<div data-field-name="user.name" >
  <label>First Name</label>
  <input/>  
  <span className="invalid"></span>
</div>
```

- 使用`data-field-name`标识表单字段可以让表单能进行更多的控制。

## 第3步：提交表单

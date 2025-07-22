
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

最简单的方式中 使用`data-field-name`标识表单字段。

```tsx 
const { Form } = useForm({...})

<Form>
  <label>First Name</label>
  <input data-field-name="user.firstName"/>  
  <label>Last Name</label>
  <input data-field-name="user.lastName"/>  
  <label>Age</label>
  <input data-field-name="user.age" type="number"/>  
  <label>VIP</label>
  <input data-field-name="user.vip" type="checkbox"/>
</Form>
 
```
只需要在`input/select/textarea`元素上添加`data-field-name`属性，值为字段的路径即可。

也可以在任意元素上添加`data-field-name`属性，如`div`、`span`等。

```tsx
const { Form } = useForm({...})

<Form>
  <div data-field-name="user.firstName">
    <label>First Name</label>
    <input/>
  </div>  
</Form>
```
表单会自动识别`div`元素下的`input`元素，然后自动绑定字段。
此方式有利于更好的组织表单的DOM结构，进行样式外观控制。

:::warning 提示
`AutoStore`还提供了`Field`组件，可以更加灵活的控制表单字段。详见后续章节。
:::

## 第3步：提交表单

```tsx
<Form 
    action="/adduser"
    onSubmit={async (state)=>{
        await delay(2000)
        console.log("表单数据=",state)
    }}
>
    <label>First Name</label>
    <input data-field-name="user.firstName"/>  
    <label>Last Name</label>
    <input data-field-name="user.lastName"/>  
    <label>Age</label>
    <input data-field-name="user.age" type="number"/>  
    <label>VIP</label>
    <input data-field-name="user.vip" type="checkbox"/>
    <button type="submit">Submit</button>
</Form>
```

## 小结

- 使用`useForm`创建表单。
- 使用`data-field-name`声明字段。
- 表单控件的数据会自动同步到`AutoStore`中。
- 提交表单时会触发`onSubmit`事件，可以在事件中获取表单数据。
- `AutoStore`还提供了`Field`组件，可以更加灵活的控制表单字段。

:::warning 提示
表单功能还支持更多的高级功能，如`脏检查`、`校验`、`提交`、`重置`等。详见后续章节。
:::
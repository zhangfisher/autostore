# useForm

`useField`和`useFields`适合于简单的表单场景，但是对于复杂的表单场景，我们需要更多的功能，比如表单校验，表单提交等。

则可以选用`useFrom`,其提供了更加完整的创建可绑定表单的完整解决方案,可以让更方便将`AutoStore`的状态和表单控件进行双向绑定，使得收集数据变得更简单。

## 基本原理

`useForm`的基本原理如下：

### 1. 创建`Form`组件

`useForm`返回一个`Form`组件，该组件是对标准`form`的封装。

### 2. 初始化表单

`useForm`内部的`useEffect`会自动初始化表单.

然后在初始化时，调用`querySelectorAll`获取到所有表单内部的`input`,`textarea`,`select`元素
,依次遍历这些元素，根据`name`属性，从`state`中获取对应的值，并设置绑定到表单元素上,完成表单字段的初始化。

### 3. 订阅变更事件

要实现双向绑定，我们需要：

- **监听表单元素的`change`事件**

由于表单事件`onchange`会冒泡，所以我们只需要在`form`元素上监听`change`事件即可。

所以通过`form.addEventListener('input',onChange)`就可以在表单元素变化时触发捕获到`onChange`事件。

然后在`onChange`事件中，我们可以通过`event.target`获取到表单元素.

最后将表单元素的值更新到`state[event.target.name]`。

- **监听`state`的变化**

使用`store.watch`监听`state`的变化，当`state`变化时，将数据更新到`name=<path>`的表单元素上即可。


## 快速入门

### 第1步： 创建表单

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


### 第2步：声明字段

声明字段有`3`种方式：

#### 简单字段

只需要为`input`、`textarea`、`select`元素设置`name`属性，且`name`为一个`字符串路径`指向状态即可。

```tsx
<input name="user.firstName" />
```

#### 封装字段

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

#### Field字段组件

使用`Field`字段组件可以实现更复杂的控制，如校验、字段联动等等

```tsx {1,3}
const { Form,Field } = useForm({...})

<Field 
  name="user.name"
  validate={(value)=>value.length>=3}
  render={({value,validate,onChange,name,error})=>{
    return <>
      <label>First Name</label>
      <input name={name} value={value} onChange={onChange}/>  
      <span className="invalid"></span>
      </>
  }}
>  
</Field>
```



### 第3步：提交表单




## 基本用法

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

<demo react="form/form/base.tsx"/>



:::info 提示
配置`input`元素的`name=<状态数据路径>`即可。
::: 



## 表单字段



## Field组件

`Field`组件是`useForm`提供的一个用于封装表单字段的高级组件，可以用于更加灵活的表单字段封装。

`Field`组件的基本用法如下：

```tsx

const { Field, Form } = useForm({...})

<Form onSubmit={}>
    <Field 
        name="user.firstName"     // 使用绑定的状态路径
        validate={validate}       // 自定义校验规则
        render={({value,timeout,....,bind})=>{
          // 在此渲染表单字段
          return <div>
              <label>First Name</label>
              <input {...bind} />
            </div>
        }} 
    />
</Form>
```





## 提交表单

`useForm`提供了`submit`方法，用于提交表单。

- `submit`方法会触发`submit`事件，可以通过`onSubmit`监听该事件。
- 然后在`onSubmit`事件中，使用`AJAX/fetch`将表单数据提交到服务器即可。
- `submiting`属性用于标识表单是否正在提交中，可以用于控制提交按钮的状态。

**示例如下：**

<demo react="form/form/formSubmit.tsx"/>


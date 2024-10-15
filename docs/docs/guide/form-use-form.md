---
group:
  title: 表单
  order: 5
order: 4
title: useForm
demo:
  tocDepth: 5
toc: content
---
 

# useForm

`useFrom`是创建可绑定表单的完整解决方案,可以让更方便将`AutoStore`的状态和表单控件进行双向绑定，使得收集数据变得更简单。

`useFrom`函数签名如下：

```ts | pure
type UseFormResult={
    ref: React.RefObject<HTMLFormElement>  
}
type UseFormOptions={}
interface UseFormType {
    (entry?: string | string[],options?:UseFormOptions): UseFormResult
}
```

## 基本用法

`useFrom`返回一个可以绑定到`form`元素的对象，然后只需要将之应用到`form`元素上即可。

```ts | pure
const { state, useForm } = useStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    age:18,
    vip:false 
  }  
})

const myform = useForm()
<form {...myform}>
  <input name="user.firstName" />
  <input name="user.lastName" />
  <input name="user.age" />
  <input name="user.vip" />
</form>
```

应用到`form`元素上后，就可以轻松实现`表单`与`State`之间的双向绑定了。


**以下是简单示例：**

```tsx   
import { useStore } from '@autostorejs/react';
import { TextArea,Layout,ColorBlock,Button,Input,Box,CheckBox,JsonView,Select } from "x-react-components"
 
export default ()=>{

  const { state, $, useForm,useState } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      age:18,
      vip:false,
      job:1,
      resume:"非著名开源软件开发者"
    }
  })

  const [ user ] = useState()

  const userform = useForm()

  return <Layout>
      <div>    
        <form {...userform}>
          <Input name="user.firstName" label="First Name"/>
          <Input name="user.lastName" label="lastName"/>
          <Input name="user.age" label="Age"/>
          <Select name="job" label="Job" items={[
              { title:"Engineer", value:1 },
              { title:"Doctor", value:2 },
              { title:"Teacher", value:3 }
          ]}/>
          <TextArea name="user.resume" label="Resume"/>
          <CheckBox name="user.vip" label="VIP"/>
        </form>
        <Button onClick={()=>{
          state.user.firstName= "Zhang"
          state.user.lastName = "Fisher"
          state.user.age = 18
          state.user.vip = false
        }}>Reset</Button>
      </div>
      <div>    
        <JsonView data={user} />
      </div>    
    </Layout>
}

```


## 工作原理

`useForm`的工作原理如下：

### 1. `ref`绑定

`useForm`返回一个`{ref,...}`对象，其中`ref`是一个`React.RefObject<HTMLFormElement>`对象。当我们在表单上使用`{...myform}`时，`ref`会自动绑定到`form`元素上。这是工作的基础。


### 2. 初始化表单

`useForm`内部的`useEffect`会自动初始化表单.

- 由于`ref`绑定到`form`元素上，通过`ref.current`可以访问到`form`元素
- 然后通过`ref.current.querySelectorAll('input,textarea,select')`获取到所有表单内部的`input`,`textarea`,`select`元素
- 依次遍历这些元素，根据`name`属性，从`state`中获取对应的值，并设置到表单元素上。

### 3. 订阅变更事件

要实现双向绑定，我们需要：

- **监听表单元素的`change`事件**

由于表单事件`onchange`进行进行冒泡，所以我们只需要在`form`元素上监听`change`事件即可。

所以通过`ref.current.addEventListener('input',onChange)`就可以在表单元素变化时触发捕获到`onChange`事件。

然后在`onChange`事件中，我们可以通过`event.target`获取到表单元素.

最后将表单元素的值更新到`state[event.target.name]`。

- **监听`state`的变化**

使用`store.watch`监听`state`的变化，当`state`变化时，将数据更新到`name=<path>`的表单元素上即可。

### 小结

以上就是`useForm`基本工作过程，其实现源码不到`50`行.

当然，双向绑定有一个潜在的问题，就是可能导致循环更新，但是`AutoStore`内部已经处理了这个问题，所以不用担心。















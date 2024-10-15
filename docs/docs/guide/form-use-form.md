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
type UseFormOptions={
    debounce?:number            // 启用防抖
    validate?:(path:string,value:any,input:HTMLElement)=>boolean | {result:boolean,message?:string,style?:string}  
}

interface UseFormType {
    (options?:UseFormOptions): UseFormResult
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


## 表单校验

可以绑定表单时指定`validate`参数，用来对输入进行校验，并在出错时应用样式。

`validate`函数的签名如下：
```ts | pure
    validate?:(path:string,value:any,input:HTMLElement)=>boolean | {
        value:boolean,      // 是否有效
        message?:string,       // 出错提示信息
        // 作用于输入控件的样式
        style?:string | ((path:string,value:any,input:HTMLElement)=>string) 
    } 
```

| 参数 | 说明 |
| --- | --- |
| path | 表单元素的`name`属性，即状态路径 |
| value | 表单元素的值 |
| input | 表单元素本身 |


### 默认校验

**在`validate`函数中返回`false`表示校验失败，返回`true`表示校验成功。**
当校验失败时，会自动在`input`元素的样式设置为:

- 添加一个`invalid`的类名,您可以自行控制样式.
- 添加`{borderColor:'red',color:'red'}`的内联样式

```tsx  
/**
 * title: 表单输入校验
 * description: 输入无效的数据看看会发生什么
 */
import { useStore } from '@autostorejs/react';
import { TextArea,Layout,ColorBlock,Button,Input,Box,CheckBox,JsonView,Select } from "x-react-components"
 
export default ()=>{

  const { state, $, useForm,useState } = useStore({
    user:{
      firstName:"Zh",
      lastName:"Fi",
      age:'18n',
      vip:false,
      job:1,
      resume:"非著名开源软件开发者"
    }
  })

  const [ user ] = useState()

  const userform = useForm({
    validate:(name,value)=>{
      if(name=="user.firstName"){
        return value.length>3
      }else if(name=="user.lastName"){
        return value.length>3
      }else if(name=="user.age"){
        return !isNaN(parseFloat(value)) && isFinite(value) && parseInt(value)>0
      }
    },
  })

  return <Layout>
      <div>    
        <form {...userform}>
          <Input name="user.firstName" label="First Name" 
                data-validate-message="长度必须大于3" />
          <Input name="user.lastName" label="lastName" 
                data-validate-message= "长度必须大于3" />
          <Input name="user.age" label="Age"  
                data-validate-message= "必须是大于0的数字" />
          <Select name="job" label="Job" items={[
              { title:"Engineer", value:1 },
              { title:"Doctor", value:2 },
              { title:"Teacher", value:3 }
          ]}/>
          <TextArea name="user.resume" label="Resume"
              data-validate-message="不能大于20个字符" />
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

### 自定义校验

如果默认的校验行为和样式不满足要求，可以在`validate`函数中返回`{value,message,style}`进行更多的校验控制.


| 参数 | 说明 |
| --- | --- |
| `value` | 校验结果，`true`表示校验成功，`false`表示校验失败 |
| `message` | 校验失败时的提示信息 |
| `style` | 校验失败时的样式，字符串或函数`(path:string,value:any,input:HTMLElement)=>string` |


可以返回`message`来控制校验失败时的提示信息。问题是，将**错误提示信息显示在哪里呢**？

显然，在不同应用场景中，提示信息的显示位置是不同的，这完全是由应用决定的。

- 默认情况下，错误提示信息显示在`input`元素的下一个兄弟节点元素中。


所以`useForm`并没有提供默认的提示信息显示位置。



```tsx  
/**
 * title: 表单输入校验
 * description: 输入无效的数据看看会发生什么
 */
import { useStore } from '@autostorejs/react';
import { TextArea,Layout,ColorBlock,Button,Input,Box,CheckBox,JsonView,Select } from "x-react-components"
 
export default ()=>{

  const { state, $, useForm,useState } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      age:'18n',
      vip:false,
      job:1,
      resume:"非著名开源软件开发者"
    }
  })

  const [ user ] = useState()

  const userform = useForm({
    validate:(name,value)=>{
      if(name=="user.firstName"){
        return value.length>3
      }else if(name=="user.lastName"){
        return value.length>3
      }else if(name=="user.age"){
        return !isNaN(parseFloat(value)) && isFinite(value) && parseInt(value)>0
      }
    },
  })

  return <Layout>
      <div>    
        <form {...userform}>
          <Input name="user.firstName" label="First Name" 
                data-validate-message = "长度必须大于3"/>
          <Input name="user.lastName" label="lastName" 
                data-validate-message = "长度必须大于3"/>
          <Input name="user.age" label="Age"  
                data-validate-message ="Age必须是大于0的数字"/>
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






### 小结

以上就是`useForm`基本工作过程，其实现源码不到`50`行.

当然，双向绑定有一个潜在的问题，就是可能导致循环更新，但是`AutoStore`内部已经处理了这个问题，所以不用担心。
















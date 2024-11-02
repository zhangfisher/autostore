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

<demo react="form/formBase.tsx"/>



:::info 提示
配置`input`元素的`name=<状态数据路径>`即可。
::: 

## 表单校验

### 标准校验

当指定`customReport=false`时使用标准的`HTML`表单校验功能，只需要在`input`元素上设置`maxLength`、`minLength`、`required`、`pattern`等属性即可。

<demo react="form/formDefaultValid.tsx"/>

- 当表单校验失败时，表单会提供伪类`:invalid`，可以通过`input:invalid`、`form:invalid`来设置样式。
- 关于更多的`HTML5`表单校验功能请参考：[HTML5 表单验证](https://developer.mozilla.org/zh-CN/docs/Learn/Forms/Form_validation)
- 关于`input`元素的属性请参考：[input](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input)


### 自定义校验显示

多数情况下，我们并不满足于默认的校验显示方式，我们希望自定义校验显示，比如在输入控件下方显示红色错误提示。

<demo react="form/formCustomValidError.tsx"/>

- `customReport=true`是默认情况
- 使用`data-field-name="xxxx"`指定字段名。
- **重点**：由`data-validate-field="<字段状态路径>"`指定该元素要显示哪个字段的校验错误信息。

:::warning 提示
- **❓** : 为什么`user.name`在初始化时不会显示校验错误？
- **🍨** : 上例中`user.name='x'`不满足`minLength=3`校验规则，但是在初始化时并没有显示错误。这是浏览器的默认行为，必须是有用户输入时才会校验。并且这种行为在不同的字段校验规则却是不一样的，`pattern`校验就会在初始化时生效。上例中的`phone`就会显示错误。这种不一致性主要是由浏览器决定的，不同的浏览器还不一样，要避免这种不致性，需要使用自定义校验规则。
:::
     	 

### 自定义校验规则

上述两个例子中，我们使用的是标准的`HTML5`表单校验规则功能（`pattern`、`minLength`等等），这存在几个问题

- 校验规则比较单一，无法满足复杂的校验需求。
- 不同浏览器的校验行为存在细微差异。  

为此，我们需要在使用`useForm`时，传入一个`validate`函数，该函数用于自定义校验规则,实现更复杂的校验逻辑。

`validate`函数的签名如下：

```ts | pure
{
  validate?:(path:string,value:any,part:string | null,fieldEle:HTMLElement)=>boolean | string
}
```

| 参数 | 说明 |
| --- | --- |
| path | 字段元素的`name`属性，即状态路径 |
| value | 字段值 |
| part | 将字段值分解为几部分时的标识，详见下文分解字段 |
| fieldEle | 字段元素 |


<demo react="form/formCustomValidate.tsx" />


- `validate`函数返回`true`代表校验成功，返回`false`代表校验失败。返回`string`代表校验失败时的提示信息。
- 当校验失败时，会在`field`元素，`input`元素以信`data-field-name`元素自动添加`invalid`类。

:::info 提示
对比上例浏览器的默认行为，`user.name`在初始化时会显示校验错误
:::

### 校验样式控制

## 拆分字段

在`input`元素上 `data-field-part`属性可以指定字段的分割方式,将一个状态值绑定到多个`input`上，实现双向绑定。


### 正则表达式拆分

当状态值是一个字符串时，可以指定`data-field-part="<正则表达式>"`进行拆分。

下例中`net.ip`是一个`ip`地址，我们希望将其拆分为`4`个`input`元素进行绑定。

```tsx {3,5,7,9}
<div data-field-name="net.ip">
    <div>                                
        <Input data-field-part="(\d{1,3})\.\d{1,3}\.\d{1,3}\.\d{1,3}" inline width={60} /> 
        <span>.</span>
        <Input data-field-part="\d{1,3}\.(\d{1,3})\.\d{1,3}\.\d{1,3}" inline width={60}/>
        <span>.</span>
        <Input data-field-part="\d{1,3}\.\d{1,3}\.(\d{1,3})\.\d{1,3}" inline width={60}/>
        <span>.</span>
        <Input data-field-part="\d{1,3}\.\d{1,3}\.\d{1,3}\.(\d{1,3})" inline width={60}/>
    </div>
</div>
```

<demo react="form/formSplitField.tsx"/>


- `data-field-part="<正则表达式>"`只适用于**指向的状态值是字符串**的情况。
- 由于状态与`input`是双向绑定的，而`<正则表达式>`不仅用于从状态中提取，也用于将输入`input`的值更新到状态的指定位置中。
- 我们约定，`<正则表达式>`中必须具有一个捕获组，如:`\d{1,3}\.(\d{1,3})\.\d{1,3}\.\d{1,3}`，其中`(\d{1,3})`就是非命名捕获组。在绑定时会读取该组的值，更新到`input`状态中，反之同理。
- 正则情况下，每一个`part`均具有不同位置的正则捕获组，所以`part`的值是不同的。如果没有正确的指定捕获组，则会导致字段拆分不能正常工作。

:::warning 提示
基于正则表达式的拆分是一种非常灵活的方式，适用于字符串内容，要求开发者设计可双向兼容的正则表达式。
:::

### 数组拆分

当状态值是一个数组时，可以指定`data-field-part="<索引>"`进行快速拆分。

<demo react="form/formSplitArrayField.tsx"/>

:::warning 提示
数组拆分是一种快速的拆分方式，适用于数组内容，拆分时会识别数据类型，自动转换为对应的数据类型。
:::

### 对象拆分

当状态值是一个`{...}`时，可以指定`data-field-part="<Key>"`进行快速拆分。

<demo react="form/formSplitObjField.tsx"/>

 

## 表单字段




## 提交表单


 


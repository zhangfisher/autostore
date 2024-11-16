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
 
 


## 表单字段








## 提交表单

`useForm`提供了`submit`方法，用于提交表单。

- `submit`方法会触发`submit`事件，可以通过`onSubmit`监听该事件。
- 然后在`onSubmit`事件中，使用`AJAX/fetch`将表单数据提交到服务器即可。
- `submiting`属性用于标识表单是否正在提交中，可以用于控制提交按钮的状态。

**示例如下：**

<demo react="form/form/formSubmit.tsx"/>


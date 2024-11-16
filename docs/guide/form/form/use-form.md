# useForm

下面我们简单介绍一下`useForm`。
`useForm`可以用来创建基于`AutoStore`的表单`AutoFormObject`，并实现表单与`AutoStore`状态之间的双向绑定功能。

## 基本原理

`useForm`的基本原理如下：

### 1. 创建`Form`组件

`useForm`会创建一个`AutoStore`实例，然后返回一个`Form`组件，该组件是对标准`form`的封装。

### 2. 初始化表单

`useForm`内部的`useEffect`会自动初始化表单.

然后在初始化时，调用`querySelectorAll`获取到所有表单内部的`input`,`textarea`,`select`元素
,依次遍历这些元素，根据`name`属性，从`state`中获取对应的值，并设置绑定到表单元素上。


### 3. 订阅变更事件

要实现双向绑定，我们需要：

- **监听表单元素的`change`事件**

由于表单事件`onchange`会冒泡，所以我们只需要在`form`元素上监听`change`事件即可。

所以通过`form.addEventListener('input',onChange)`就可以在表单元素变化时触发捕获到`onChange`事件。

然后在`onChange`事件中，我们可以通过`event.target`获取到表单元素.

最后将表单元素的值更新到`state[event.target.name]`。

- **监听`state`的变化**

使用`store.watch`监听`state`的变化，当`state`变化时，将数据更新到`name=<path>`的表单元素上即可。


:::warning 注意
以上仅是`useForm`的基本原理，实际实现中还有很多细节未能完全描述。
:::
 
## 函数签名

`useForm`支持两种函数签名如下：

```tsx
function useForm<State extends Dict>(
    state:State,
    options?:UseFormOptions<State>
): AutoFormObject<State>
function useForm<State extends Dict>(
    store:ReactAutoStore<any> | AutoStore<any>,
    options?:UseFormOptions<State>
):AutoFormObject<State>

```

`useForm`支持两种签名：

- `useForm(state,options)`：通过`state`创建一个`AutoStore`实例，然后创建一个`AutoFormObject`实例。
- `useForm(store,options)`：通过已有的`AutoStore`创建一个`AutoFormObject`实例。



## 选项

`useForm`的`options`支持以下选项：

因为`useForm`内部会创建一个`AutoStore`实例，所以`UseFormOptions`继承自`AutoStoreOptions`，用于创建`AutoStore`。参考[AutoStoreOptions](/guide/store/store#配置)。

除此之外，`UseFormOptions`还支持以下选项：

### ref

用来引手表单元素的`ref`

### entry

表单元素的入口路径，当创建多个表单时，可以指定不同的入口路径。


参考[创建多个表单](/guide/form/form/create.md#多表单)

    fromState?:(path:string,stateValue:any,part:string | undefined)=>any
    /**
     * 当表单输入控件变化时，调用本方法将数据转换后再写入状态
     * 
     * 例：将上例中的是/否转换为true/false
     * 
     */
    toState?:(this:HTMLInputElement,path:string,inputValue:any,stateValue:any,part:string | undefined)=>any

### customReport

当校验出错时，如何报告错误。

- `default`:  采用浏览器默认的校验错误提示方式
- `custom`:   自定义方式，校验信息将写入到`[data-validate-field=xxxx]`所在的元素

### validAtInit

在初始化时是否进行数据校验，默认为`true`。

### validate

自定义校验函数，用于校验表单数据。

```ts
(path:string,value:any,part:string | null,fieldEle:HTMLElement) => boolean | string
```

### fromState

当状态数据变化时，调用本方法将数据转换为表单输入控制使用的数据

```ts
(path:string,stateValue:any,part:string | undefined)=>any
```

### toState
当表单输入控件变化时，调用本方法将数据转换后再写入状态

```ts
(this:HTMLInputElement,path:string,inputValue:any,stateValue:any,part:string | undefined)=>any
```

# 表单校验

## 标准校验

当指定`customReport=false`时使用标准的`HTML`表单校验功能，只需要在`input`元素上设置`maxLength`、`minLength`、`required`、`pattern`等属性即可。

<demo react="form/validate/defaultValid.tsx"/>

- 当表单校验失败时，表单会提供伪类`:invalid`，可以通过`input:invalid`、`form:invalid`来设置样式。
- 关于更多的`HTML5`表单校验功能请参考：[HTML5 表单验证](https://developer.mozilla.org/zh-CN/docs/Learn/Forms/Form_validation)
- 关于`input`元素的属性请参考：[input](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input)


## 自定义校验显示

多数情况下，我们并不满足于默认的校验显示方式，我们希望自定义校验显示，比如在输入控件下方显示红色错误提示。

<demo react="form/validate/customValidError.tsx"/>

- `customReport=true`是默认情况
- 使用`data-field-name="xxxx"`指定字段名。
- **重点**：由`data-validate-field="<字段状态路径>"`指定该元素要显示哪个字段的校验错误信息。

:::warning 提示
- **❓** : 为什么`user.name`在初始化时不会显示校验错误？
- **🍨** : 上例中`user.name='x'`不满足`minLength=3`校验规则，但是在初始化时并没有显示错误。这是浏览器的默认行为，必须是有用户输入时才会校验。并且这种行为在不同的字段校验规则却是不一样的，`pattern`校验就会在初始化时生效。上例中的`phone`就会显示错误。这种不一致性主要是由浏览器决定的，不同的浏览器还不一样，要避免这种不致性，需要使用自定义校验规则。
:::
     	 

## 校验规则

上述两个例子中，我们使用的是标准的`HTML5`表单校验规则功能（`pattern`、`minLength`等等），这存在几个问题

- 校验规则比较单一，无法满足复杂的校验需求。
- 不同浏览器的校验行为存在细微差异。  

为此，我们可以在使用`useForm`时，传入一个`validate`函数，该函数用于自定义校验规则,实现更复杂的校验逻辑。

`validate`函数的签名如下：

```ts
validate?:(path:string,value:any,part:string | null,fieldEle:HTMLElement)=>boolean | string
```

| 参数 | 说明 |
| --- | --- |
| `path` | 字段元素的`name`属性，即状态路径 |
| `value` | 字段值 |
| `part` | 将字段值分解为几部分时的标识，详见字段拆分 |
| `fieldEle` | 字段元素，即指定`data-field-name`的元素或`input` |


<demo react="form/validate/customValidate.tsx" />


- `validate`函数返回`true`代表校验成功，返回`false`代表校验失败。返回`string`代表校验失败时的提示信息。
- 当校验失败时，会在`field`元素，`input`元素以及`data-field-name`元素自动添加`invalid`类。


:::info 提示
对比上述浏览器的默认校验行为，`user.name`在初始化时会显示校验错误
:::


## 校验信息容器

当采用自定义校验时时， `data-validate-field`属性用于指定校验信息容器，该属性的值为字段的状态路径。
当校验失败时，会将校验失败信息写入到该元素中。

```html {6}
      <div data-field-name="user.address">
        <label>Address</label>
        <div>
          <input type="text"/>
            <span 
              data-validate-field="user.address" >
            </span>
        </div>
      </div>
```## 校验样式控制

为了控制字段的样式,当校验失败时会为当前字段和`input`元素自动添加`invalid`类，可以通过`invalid`类来控制校验失败时的样式。


```html {2,7}
      <div data-field-name="user.address" 
        class="invalid"
      >
        <label>Address</label>
        <div>
          <input type="text" 
            class='invalid'
          />
            <span 
              data-validate-field="user.address" >
            </span>
        </div>
      </div>
```

## 自定义校验

当使用`Field`组件时，则可以完全控制校验规则和显示方式，详见字段组件。

## 校验状态

`useForm`会返回一个`valid`的状态，用于表示当前表单是否通过校验。

```ts {2}
		const { 
      valid
    } = useForm({
      // ...
    })
```

`valid`是一个响应式状态，当变化时会触发自动重新渲染。

# Custom

自定义字段

## 参数

```ts
type htmlTemplate = (strings: TemplateStringsArray, ...values: unknown[]) => any;

type SchemaCustomWidgetOptions = {
    dropdown?: boolean;
    inputSelectors?: string;
    renderSelection?: (values: any, html: htmlTemplate) => string;
    renderContent?: (values: any, html: htmlTemplate) => string;
};
```

<demo html="autoform/widgets/custom.html"/>

## 指南

### 工作原理

1. 首先要实现`renderContent`方法用于渲染自定义显示的内容，`renderContent`方法使用[lit 模板语法](https://lit.dev/docs/templates/overview/)。
2. `Custom`会监听`<input>`标签的`input,change`事件，当`<input>`标签的值发生改变时，会调用`toState`函数，用于将`input`元素的值转换为`state`的值，写入到`AutoStore`的状态中，
   由于`input`可能有多个，所以传入`toState(values)`函数的是一个数组。
3. 当监听到`state`的值发生改变时，会调用`toInput`方法，将状态值转换为适合`input`的值，然后调用`renderContent`方法重新渲染。
4. 当`dropdown=true`时，`renderSelection`方法用于渲染值。

### renderContent

`renderContent`方法用于渲染自定义组件内容。

`renderContent`方法接收两个参数，

-   第一个参数是当前字段数据
-   第二个参数是`lit html`模板方法，返回值是自定义组件内容。详见[lit html](https://lit.dev/docs/templates/overview/)

```ts
renderContent: (values, html) => {
    return html` <div style="padding:1em">
        <label
            >电子邮件:
            <input .value=${values[0]} />
            @<input .value=${values[1]} />
        </label>
    </div>`;
};
```

`values`是数组，依次绑定到`<input>`标签的`.value`属性即可。

### renderSelection

当`dropdown=true`时，`renderSelection`方法用于渲染选择值。

使用方法同`rebderContent`

### Dropdown

自定义内容通过下拉弹出方式呈现。

### inputSelectors

默认值：`input,textarea`

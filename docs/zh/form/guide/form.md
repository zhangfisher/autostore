# 表单

`AutoForm`并不是传统意义上的`HTML`表单，并没有`<form>`标签包裹，`auto-form`只是一个普通的`WebComponent`组件，用于收集数据到`AutoStore`中而已。

## 快速入门

创建一个`AutoForm`的基本方式如下：

### 第 1 步: 创建`AutoStore`实例

创建一个`AutoStore`实例，用于存储表单数据。`AutoStore`实例内部维护了一个经过`Proxy`代理的`JSON`对象，用于存储表单数据。

```ts
const store = new AutoStore({
    user: {
        username: 'NAME',
        password: 'PASSWORD',
    },
    order: {
        price: 100,
        count: 1,
        total: (order) => order.price * order.count,
    },
});
```

:::warning 提示
可以创建任意复杂的`AutoStore`。
:::

### 第 2 步: 声明字段

接下来，我们使用`configurable`函数来声明，`AutoStore`的状态树中的哪些字段中是可配置的。

```ts {4-5,8-9}
import { AutoStore, configurable } from 'autostore';
const store = new AutoStore({
    user: {
        username: configurable('NAME'),
        password: configurable('PASSWORD'),
    },
    order: {
        price: configurable(100),
        count: configurable(1),
        total: (order) => order.price * order.count,
    },
});
```

在一个嵌套的对象树中，我们可以使用`configurable`函数来声明哪些字段是可配置的。
在上面的例子中，我们声明了`user.username`、`user.password`、`order.price`、`order.count`四个字段是可配置的。

:::warning 提示
`configurable`函数用于告诉`AutoStore`状态树中的哪些字段是可配置的，`AutoStore`会自动收集这些字段。
`configurable`函数还有一个别名`schema`。
:::

### 第 3 步: 引入表单组件

接下来引入表单组件`auto-form`组件。

`auto-form`组件是一个标准的`Web Component`，所以你可以像使用其他`Web Component`一样使用它,包括在`Vue/React`等其他场景可。

**在`html`中，你可以直接从`CDN`中引入：**

```html
<!-- 引入 AutoForm 样式: 黑暗模式 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@autostorejs/form/dist/themes/dark.css" />
<!-- 引入 AutoForm 样式: 默认亮模式 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@autostorejs/form/dist/themes/light.css" />
<!-- 引入 AutoForm 代码 -->
<script src="https://cdn.jsdelivr.net/npm/@autostorejs/form/dist/index.global.js"></script>
<!-- 引入 AutoStore 代码 -->
<script src="https://cdn.jsdelivr.net/npm/autostore/dist/index.global.js"></script>
```

**也可以像普通代码一样，在你的`ts/js`文件中引入**

```ts
import { AutoStore } from 'autostore';
import '@autostorejs/form/dist/themes/light.css';

// 只需要导入即可
import '@autostorejs/form'; //   [!code ++]
```

`import '@autostorejs/form'`后就会自动注册`auto-form`组件以及所有内置的表单字段组件。

:::warning 提示
`auto-form`组件是一个标准的`Web Component`，只需要`import`即可使用。
:::

### 第 4 步: 创建表单

接下来，我们就可以使用`auto-form`组件来创建表单了。

在你的代码中创建`auto-form`组件，然后绑定`store`实例，就可以创建一个表单了。

在`html`中，可以直接使用`auto-form`组件来创建表单：

```html {11}
<script>
    const { AutoStore, configurable } = AutoStoreSpaces;
    const store = new AutoStore({
        // [!code ++]
        // 表单状态数据  // [!code ++]
    }); // [!code ++]
    const form = document.querySelector('#login');
    form.bind(store);
</script>

<auto-form id="login"></auto-form>
```

:::warning 提示
在`React/Vue`中应用，可以将`auto-form`组件像普通的`div`标签一样使用。
:::

### 第 5 步: 渲染效果

至此，一个简单的表单就渲染完成了，表单中包括了`user.username`、`user.password`、`order.price`、`order.count`四个字段。

渲染效果如下：

<demo html="autoform/form/create.html"/>

:::warning 提示
修改表单数据后，`store.state`数据会同步更新，两者双向绑定关系，即修改`store.state`也会同步到表单中。
:::

### 小结

可以看到，`AutoForm`完全不同于普通的表单解决方案，核心本质就是将数据收集到`AutoStore`中，然后通过`auto-form`组件来渲染表单。

:::warning 注意
在上例中，我们可以看到渲染出的表单的外观、样式、label 等并不理想。
实际场景中，一般需要进行更精细的控制，这就需要为`configurable`提供更多的控制参数，详见[表单字段](./createfield)章节。
:::

## 指南

### 绑定数据

`auto-form`组件提供了`bind`方法，用于绑定`AutoStore`实例。
`AutoStore`实例本质上是一个经过`proxy`封装的`JSON`对象，会在读写对象进触发事件，为表单提供响应式支持。

```html
<script>
    const { AutoStore, configurable } = AutoStoreSpaces;
    const store = new AutoStore({...});
    const form = document.querySelector('#login');
    form.bind(store); // [!code ++]
</script>

<auto-form id="login"></auto-form> // [!code ++]
```

当执行`bind`方法后，就在`AutoStore`和`AutoForm`之间创建起**双向同步**关系，

-   当`AutoStore`中的数据发生变化时，`AutoForm`会自动更新表单数据。
-   当`AutoForm`中的数据发生变化时，`AutoStore`会自动更新`AutoStore`中的数据。

### 暗黑模式

`AutoForm`默认使用亮色主题，如果需要使用暗色主题，可以引入`dark.css`文件。
并且指定属性`dark`就可以切换为暗色主题。

```tsx
// 引入暗色主题
<link rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@autostorejs/form/dist/themes/dark.css" />

<auto-form dark></auto-frm>     // [!code ++]
```

<demo html="autoform/form/dark.html"/>

### 尺寸

`AutoForm`默认支持`small`、`medium`、`large`三种尺寸。可以控制表单的字体、间距等尺寸。

<demo html="autoform/form/size.html"/>

### 标题位置

`AutoForm`的字段标题支持

-   默认支持`top`、`left`两种标题位置,可以控制字段标题的显示位置。
-   当标题位置为`left`时，可以控制标题的宽度。

<demo html="autoform/form/labelpos.html"/>

### 网格线

默认`AutoForm`会显示字段网格分割线，也可以控制不显示。
<demo html="autoform/form/border.html"/>

### 浏览模式

允许切换到数据浏览模式，只查看表单数据。

<demo html="autoform/form/view.html"/>

### 紧凑模式

紧凑模式，可以控制表单字段的间距。

<demo html="autoform/form/compact.html"/>

### CSS::Part

`auto-form`是一个`WebComponent`组件，内部组件被渲染在一个`shodow DOM`中，无法在外部进行样式控制。

`auto-form`暴露了一些`CSS::Part`，允许通过进行样式控制。

例如，我们要控制`字段label`样式，可以通过`::part(field-label)`来进行样式控制。

```html
auto-form::part(field-label) { color: red; }
```

<demo html="autoform/form/css-part.html"/>

`AutoForm`目前提供了以下`CSS::Part`：

| 名称        | 描述         |
| ----------- | ------------ |
| field       | 字段         |
| field-value | 字段值       |
| field-label | 字段标题     |
| field-help  | 字段帮助信息 |
| field-error | 字段错误信息 |

:::warning 提示

-   `CSS::Part`是`WebComponent`规范中定义的，详见[这里](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::part)。
-   使用`CSS::Part`进行样式控制时也有一定的限制，在字段中有更丰富的样式控制，详见[表单字段](./createfield)章节。

:::

### 分组

`AutoForm`支持分组，可以只显示指定组的字段。

-   `group`参数可仅仅指定一个组，也可以指定多个组，多个组之间用`,`分隔。
-   `group='' || group='*'`表示显示所有组。

```ts
const store = new AutoStore({
    user: {
        username: configurable('NAME', {
            label: '用户名',
            group: 'user', //  [!code ++]
        }),
        password: configurable('PASSWORD', {
            label: '密码',
            group: 'user', //  [!code ++]
        }),
    },
    order: {
        price: configurable(100, {
            label: '价格',
            group: 'price', //  [!code ++]
        }),
        count: configurable(1, {
            label: '数量',
            group: 'price', //  [!code ++]
        }),
        total: (order) => order.price * order.count,
    },
});
const form = document.querySelector('#login');
form.bind(store);
```

以上我们为配置字段指定了一个组名称，然后在渲染表单时，可以指定要渲染的组。

<demo html="autoform/form/group.html"/>

### 状态路径

可以通过`path`参数指定要显示某个路径下的字段。

```ts
const store = new AutoStore({
    user: {
        username: configurable('NAME', {
            label: '用户名'
        }),
        password: configurable('PASSWORD', {
            label: '密码'
        }),
    },
    order: {
        price: configurable(100, {
            label: '价格'
        }),
        count: configurable(1, {
            label: '数量'
        }),
        total: (order) => order.price * order.count,
    },
});
<auto-form path="user"></auto-form> // [!code ++]
<auto-form path="order"></auto-form> // [!code ++]
<auto-form path="user,order"></auto-form> // [!code ++]
```

<demo html="autoform/form/path.html"/>

### 字段排序

`AutoForm`可以通过`order`参数对字段进行排序，可以指定字段的顺序。按`order`参数值从小到大排列。

```ts
const store = new AutoStore({
    user: {
        username: configurable('NAME', {
            label: '用户名',
            order: 2, // [!code ++]
        }),
        password: configurable('PASSWORD', {
            label: '密码',
            order: 1, // [!code ++]
        }),
    },
});
```

<demo html="autoform/form/order.html"/>

### 布局类型

默认情况下，表单对内部的字段采用`inline-block`布局，可以控制表单的布局类型。

`layout`参数支持以下值：

-   `auto`: 采用默认`inline-block`布局
-   `row`: 采用`flex: row`布局
-   `col`: 采用`flex: column`布局

<demo html="autoform/form/layout.html"/>

### 高级字段

`advanced`参数用于标识这是一个高级选项字段，当`advanced`时才会显示字段。

```ts
const store = new AutoStore({
    user: {
        username: configurable('NAME', {
            label: '用户名',
            advanced: true
        }),
        password: configurable('PASSWORD', {
            label: '密码'
        }),
    }
});
// 默认显示所有字段，包括advanced字段
<auto-form ></auto-form> // [!code ++]
// 显示所有字段，但不显示advanced字段
<auto-form advanced></auto-form> // [!code ++]
```

:::warning 提示
`advanced`参数用于当创建配置表单时，有时需要指定一些配置项是高级选项，仅在高级选项打开时才显示。
:::

### 表单是否修改

当表单数据进行了更新后，会为表单增加一个`dirty`类，用于标识表单是否被修改过。

```ts
<auto-form class="dirty"></auto-form>
```

也可以通过读取`form.dirty`值来查看表单是否被修改过。

### 重置表单

可以通过`reset`方法重置表单。

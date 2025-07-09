# 字段

## 关于

`AutoForm`的所有字段组件均是以`auto-field-`开头的`WebComponent`，用于渲染表单字段。

字段组件的`DOM`结构如下：

![](./field.drawio.png)

字段的`DOM`结构由以下几部份组成：

| 名称             | 描述                     |
| ---------------- | ------------------------ |
| **字段标题**     | 支持显示在`左侧`或`顶部` |
| **字段输入元素** | 支持各种输入字段元素     |
| **帮助信息**     | 额外的帮助信息           |
| **错误信息**     | 当校验出错时显示信息     |

## 指南

### 声明字段

在`AutoStore`状态使用`configurable`方法声明字段，

```ts
const store = new AutoStore({
    user: {
        username: configurable('NAME', {
            label: '用户名'，
            widget: 'input'  // [!code ++]
        })
    },
});
```

使用`configurable`声明状态中的某个状态值可配置时，可通过`widget`参数指定要渲染的字段组件类型。

**支持的字段组件**：

`captcha`,`checkbox-group`,`checkbox`,`color-picker`,`combine`,`custom`,`date`,`email`,`input`,`ipaddress`,`list`,`number`,`parts`,`password`,`phone`,`qrcode`,`radio-button`,`radio`,`range`,`rating`,`search`,`select`,`switch`,`textarea`,`time`,`tree-dropdown`,`tree-select`,`upload`,`url`,`verifycode`

### 字段帮助

字段可以通过`help`参数指定额外的帮助信息。

```ts
const store = new AutoStore({
    user: {
        username: configurable('NAME', {
            label: '用户名'，
            help: '请输入用户名' // [!code ++]
        }),
        password:configurable('', {
            label: '密码'，
            widget: 'password'，
            // 启用超链接
            help: '密码至少6位(https://zhangfisher.github.io/voerka-i18n/)' //  [!code ++]
        })
    },
});
```

**帮助信息可以在未尾`(<url>)`启用超链接**

<demo html="autoform/field/helppos.html"/>

### 通用字段属性

字段组件支持以下通用属性：

```ts
export type SchemaWidgetShareOptions<Value, State> = {
    name?: string;
    datatype?: string;
    required?: boolean;
    visible?: boolean;
    enable?: boolean;
    description?: string;
    size?: string | number;
    icon?: string;
    // 用于验证
    invalidMessage?: string | ((e: Error, path: string, newValue: Value, oldValue: Value) => string);
    onValidate?: (newValue: Value, oldValue: Value, path: string) => boolean;
    onFail?: 'pass' | 'throw' | 'ignore' | 'throw-pass';
    // 提供一些元数据
    label?: string;
    labelPos?: string;
    // 帮助信息可以增加一个链接，如"至少需要增加(http://www.baidu.com)"
    help?: string;
    placeholder?: string;
    group?: string;
    advanced?: boolean;
    order?: number;
    width?: number | string;
    height?: number | string;
    divider?: boolean; // 是否在前面显示一条分割线
    viewAlign?: 'left' | 'center' | 'right'; // viewonly模式下显示方式
    tips?: string;
    select?: (SchemaWidgetSelectItem<Value> | string | number)[];
    // 转换数据
    toView?: (value: any) => any;
    toState?: (value: any) => any;
    toInput?: (value: any) => any;
    toRender?: (value: any) => any;
    actions?: SchemaWidgetAction<State>[];
    // 用于扩展widget样式，如{"<选择器>":"样式"}
    styles?: SchemaWidgetStyles;
    // 用于扩展widget类，如{"<选择器>":"类名"}
    classs?: SchemaWidgetClasss;
};
```

### 字段宽度

可以通过`width`参数指定字段宽度。

<demo html="autoform/field/width.html"/>

:::warning 提示
当在一行中显示多个字段时，需要指定`height`参数以确保字段高度一致。
:::

### 自定义浏览视图

`toView`方法用于自定义浏览视图。

```ts {5-7}
const store = new AutoStore({
    user: {
        age: configurable(18, {
            label: '年龄'，
            toView: (value) => {
                return `<span style="color:red;border:1px solid red;padding:4px;">${value}岁</span>`
            }
        })
    },
});
```

<demo html="autoform/field/toView.html"/>

### 状态数据转换

`toInput`和`toState`方法用于状态数据和输入之间的转换。

-   `toInput`: 用于将`AutoStore`中的状态数据转换为输入数据用于渲染和编辑
-   `toState`: 用于将输入元素的数据转换为`AutoStore`中的状态数据

**例如：** 在状态中，sex 字段为`0`或`1`，在输入时，需要渲染为`男`或`女`，则可以如下配置：

```ts
const store = new AutoStore({
    user: {
        sex: configurable(0, {
            label: '性别'，
            widget: 'input',
            toInput: (value) => {
                return value === 1 ? '男' : '女'
            },
            toState: (value) => {
                return value === '男' ? 1 : 0
            }
        })
    },
});
```

<demo html="autoform/field/toTransform.html"/>

### 样式控制

### 自定义渲染

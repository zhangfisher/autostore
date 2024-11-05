# Field组件

如果您想要对字段进行更精细的控制，则推荐使用`Field`组件。

`Field`组件是创建表单自定义字段组件的终极武器，允许您完全控制字段的渲染、校验、可视、使能等等，并且所有字段特性属性均可以使用计算属性声明，这使用`Field`组件具有超强的自定义能力，还可以很轻松地实现表单字段之间的联动。


## 基础用法

`Field`组件要求提供`name`和`render`属性。

- `name`: 指向的是状态树中的某个字段的路径，如`user.firstName`。
- `render`: 用于渲染`Field`组件，它接收一个`AutoFieldRenderProps`类型的参数，负责渲染`Field`组件。
                
<demo react="form/fieldBase.tsx" />


:::warning 提示
`Field`组件可以与`useField/useFields`混用。
:::

## 校验

`Field`组件支持通过`validate`参数进行校验。

`validate`参数是一个同步或异步计算属性，返回`boolean`，如果校验失败，则应抛出错误。

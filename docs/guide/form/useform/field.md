# Field组件

如果您想要对字段进行更精细的控制，则推荐使用`Field`组件。

`Field`组件是创建表单自定义字段组件的终极武器，允许您完全控制字段的渲染、校验、可视、使能等等，并且所有字段特性属性均可以使用计算属性声明，这使用`Field`组件具有超强的自定义能力，还可以很轻松地实现表单字段之间的联动。


## 快速上手

### 第1步：创建Form

使用`useForm`创建一个`Form`实例。

```ts
import { useForm } from 'autostore';
const { Form,Field } = useForm({
    user: {
      firstName: 'John',
      lastName: 'Doe'
    }
}
```

`useForm`内部会创建一个`AutoStore`实例，然后基于该实例构建一系列与表单相关的`API`及组件，其中最主要的就是`Form`组件和`Field`组件。


### 第2步：创建Field

使用`Field`组件创建一个字段。

```tsx
    <Field  
        name="user.firstName" 
        render={
            ({name, value, onChange }) => {
                return <input name={name} value={value} onChange={e => onChange(e.target.value)} />
            }
        }
    />
```

`Field`组件至少要求提供`name`和`render`两个属性。

- `name`: 指向的是状态树中的某个字段的路径，如`user.firstName`。
- `render`: 用于渲染`Field`组件，它接收一个`AutoFieldRenderProps`类型的参数，负责渲染`Field`组件。

### 第3步：配置字段校验

`Field`组件支持`validate`属性用于配置字段的校验规则。

```tsx
<Field
    validate={(value)=>{
        return assert(value.length>3,"长度必须大于3")
    }}
    //...
/>
```

- `validate`该属性的值用于创建一个**依赖于当前字段（name指向的状态）状态的计算或监听属性**，并且其`scope`也指向当前字段的值。
当字段值发生变化时，会重新计算该属性的值，从而会触发校验。
- `validate`计算函数返回`true/false`来代表校验是否通过。也可以`throw Error`，然后通过错误对象的`message`属性来获取错误信息并传递给`render`函数。

### 第4步：字段渲染

`Field`组件支持`render`属性用于渲染字段。

`render`属性的值是一个函数，该函数接收一个`AutoFieldRenderProps`类型的参数，负责渲染`Field`组件。

`AutoFieldRenderProps`类型包含以下属性：

 


 


:::warning 提示
`validate`异步计算属性的依赖可不用指定，其会自动指定为当前字段。
:::







<demo react="form/fieldBase.tsx" />


:::warning 提示
`Field`组件可以与`useField/useFields`混用。
:::

## 校验

`Field`组件支持通过`validate`参数进行校验。

`validate`参数是一个同步或异步计算属性，返回`boolean`，如果校验失败，则应抛出错误。


因为`validate`属性是用于创建计算属性，所以可以使用`computed`、`watch`等方法来动态声明`validate`属性。

## 字段计算属性

字段组件的属性支持如果下：



- **简单的同步计算校验**

```tsx
<Field
    validate={(value)=>{
        return assert(value.length>3,"长度必须大于3")
    }}
    //...
/>
```

- **简单的异步计算校验**

```tsx
<Field
    validate={async (value)=>{
        return assert(value.length>3,"长度必须大于3")
    }}
    //...    
/>
```

- **异步计算校验**

```tsx
import { computed } from "@autostorejs/react"
<Field
    validate={computed(async (value)=>{
        return assert(value.length>3,"长度必须大于3")
    },[])}
    // ...
/>
```

- **监听校验**

```tsx
import { watch } from "@autostorejs/react"
<Field
    validate={watch(async ({path,value})=>{
        return assert(value.length>3,"长度必须大于3")
    },()=>{...})}
    // ...
/>
```
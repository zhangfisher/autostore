# Field组件

如果您想要对字段进行更精细的控制，则推荐使用`Field`组件。**`Field`组件是创建表单自定义字段组件的终极武器**，允许您完全控制字段的渲染、校验、可视、使能等等，并且所有字段特性属性均可以使用计算属性声明，这使用`Field`组件具有超强的自定义能力，还可以很轻松地实现表单字段之间的联动。

## 创建字段

使用`Field`组件创建一个字段。

```tsx
    <Field  
        name="user.firstName" 
        render={
            ({name, value, bind }) => {
                return <input {...bind} />
            }
        }
    />
```

`Field`组件至少要求提供`name`和`render`两个属性。

- `name`: 指向的是状态树中的某个字段的路径，如`user.firstName`。
- `render`: 用于渲染`Field`组件，它接收一个`AutoFieldRenderProps`类型的参数，负责渲染`Field`组件。

**简单的`Field`组件示例：**

<demo react="form/field/fieldBase.tsx" />


## 字段校验

`Field`组件支持`validate`属性用于配置字段的校验规则。

### 基本校验

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
 

```tsx {8-9}
<Field
    validate={(value)=>{
        return assert(value.length>3,"长度必须大于3")
    }}
    render={
        ({  name, 
            value, 
            error,          // 校验错误信息
            validate,        // 校验结果true/false
            bind
        }) => {
            return (
                <div>
                    <input {...bind} />
                    {validate ? '校验合法' : '校验不合法'}
                    {error ? <span>{error.message}</span> : null}
                </div>
            )
        }
    }
/>
```

- `validate`是一个同步计算属性，依赖于当前字段的值，当字段值发生变化时，会重新计算该属性的值，从而会触发校验。

### 联动校验

正因为`validate`是一个同步计算属性，所以也可以依赖于其他字段的值，从而实现字段之间的联动校验。

<demo react="form/validate/linkageValidate.tsx" />

 


## 字段组件属性

字段组件的属性支持如果下：



:::warning 提示
`Field`组件可以与`useField/useFields`混用。
:::
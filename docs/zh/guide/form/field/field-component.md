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

<demo react="form/field/fieldBase.tsx"  />


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

在上例中，`count`的校验规则是`count>0 && order.price > 9`，由于其`validate`是同步计算属性，根据计算属性的依赖收集规则，其自动依赖于`order.price`和`count`的值，所以当`count`和`order.price`更新时会触发`validate`属性重新计算，从而触发校验。


:::warning 提示
`validate`属性是一个同步计算属性，具备依赖自动收集功能，当字段值发生变化时，会重新计算该属性的值，从而会触发校验。
:::


## 字段计算属性

除了`validate`属性，则字段组件还支持以下常用的计算属性：

| 属性 | 类型 | 默认值 |计算属性 |  说明 |
| --- | :---: | :---: | :---: | --- |
| `required` | `boolean` | false | 同步 |  是否必填 |
| `visible` |  `boolean` | true | 同步 | 是否可见 |
| `enable` |  `boolean` | true | 同步 | 是否可用 |
| `readonly` |  `boolean` | false | 同步 | 是否只读 |
| `label` |  `string` | - |同步 | 字段标签 |
| `placeholder` |  `string` | - | 同步 | 字段占位符 |
| `help` |  `string` | - | 同步 | 字段帮助信息 |
| `select` | `any[]` | - | 异步 | 字段选择项 |

以上这些属性都是同步计算属性，当字段值发生变化时，会重新计算该属性的值，从而会触发字段的重新渲染。同时也支持计算属性的相关特性。

以上这些属性会**在更新时触发字段的重新渲染,并传递给字段组件的`render`函数**。

```tsx {3-10,12}
<Field
    name="user.firstName"
    required={(state)=>{ ... }}
    visible={(state)=>{ ... }}
    enable={(state)=>{ ... }}
    readonly={(state)=>{ ... }}
    label={(state)=>{ ... }}
    placeholder={(state)=>{ ... }}
    help={(state)=>{ ... }}
    select={async (state)=>{ ... }}
    render={
        ({name, value, bind, required, visible, enable, readonly, label, placeholder, help, select }) => {
            return (
                <div>
                    {/* ... */}
                </div>
            )
        }
    }
/>
```

## 异步字段计算属性

以上的计算属性除了`select`外，其他均是同步计算属性，当字段值发生变化时，会重新计算该属性的值，从而会触发字段的重新渲染。

但是有时候我们需要的计算属性是异步的，如我们想进行异步校验时，则需要使用`useComputed`异步计算属性。

 
```tsx  
<Field
    name="user.firstName" 
    render={
        ({name, value, bind }) => {
            const valid = useComputed<boolean>(async (name:string)=>{
                await delay(1000) // 模拟异步验证
                return assert(name.length>3,"name长度必须大于3")
            },{
                depends:["user.name"],
                scope:'user.name',
                onError:()=>false
            })
            return (
                <div>
                    {/* ... */}
                </div>
            )
        }
    }
/>
```

- `useComputed`用于动态创建一个异步计算属性。
-  上例中，指定了`useComputed`的`depends=["user.name"]`和`scope:'user.name`,代表了其依赖于`user.name`的值，当`user.name`更新时，会重新计算该属性的值。并且`useComputed`的`scope`也指向`user.name`的值。
- 当校验失败时不是只返回`false`，而是触发错误,通过`error.message`来错误信息。
- 指定`onError:()=>false`的目的是当校验失败时，将计算值重置为`false`。

**实际示例如下：**

<demo react="form/validate/fieldAsyncValid.tsx" />

:::warning 配置`onError:()=>false`的原因？
计算属性具有一个`onError`回调函数，用于处理计算属性的错误，当计算属性发生错误时，会触发`onError`回调函数,`onError`的返回值会被作为计算结果写入。
:::

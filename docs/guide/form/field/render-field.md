# 渲染字段

字段渲染有`3`种方式：

## 简单字段

只需要为`input`、`textarea`、`select`元素设置`name`属性，且`name`为一个`字符串路径`指向状态即可。

```tsx
<input name="user.firstName" />
```

## 封装字段

当然，实际中的输入字段我们一般会进行封装，以便可以进行更多的控制。

我们也可以在封装元素上通过`data-field-name='<状态路径>'`标识这是一个表单字段。

```tsx {1,3}
<div data-field-name="user.name" >
  <label>First Name</label>
  <input/>  
  <span className="invalid"></span>
</div>
```

- 使用`data-field-name`标识表单字段可以让表单能进行更多的控制。
- `useForm`在初始化时会自动查找内部所有的`input`、`textarea`、`select`元素进行自动绑定处理，包括侦听事件等。


## Field字段组件

`Field`组件是`useForm`提供的一个用于封装表单字段的高级组件，可以用于更加灵活的表单字段封装。

使用`Field`字段组件可以实现更复杂的控制，如校验、字段联动等等

```tsx {1,3}
const { Form,Field } = useForm({...})

<Field 
  name="user.name"
  validate={(value)=>value.length>=3}
  render={({value,validate,onChange,name,error})=>{
    return <>
      <label>First Name</label>
      <input name={name} value={value} onChange={onChange}/>  
      <span className="invalid"></span>
      </>
  }}
>  
</Field>
```

# 脏检查

表单的`dirty`属性表示表单是否被修改过。如果表单中的任何一个字段被修改过，`dirty`属性就会变为`true`。

`useForm`会返回一个`dirty`的状态，用于表示当前表单是否通过校验。

```ts {2}
	const { 
      dirty
    } = useForm({
        // ...
    }）
```

- `dirty`是一个响应式状态，当变化时会触发自动重新渲染。
- `dirty`的值为`true`代表表单被修改过，`false`代表表单未被修改过。
- 调用`reset`方法可以重置表单的`dirty`状态。

```ts {3}   
	const { 
      dirty,
      reset
    } = useForm({
        // ...
    })
```

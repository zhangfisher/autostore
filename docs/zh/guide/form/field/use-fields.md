# useFields

当处理多个字段时，使用`useField`进行字段绑定存在较多的样板代码，显得有些繁琐，此时可以使用`UseFields`，它会自动为嵌套状态中的每个属性创建一个双向字段绑定。

## 基本用法


<demo react="form/field/useFieldsBase.tsx"/>


- 使用`UseFields`创建的嵌套绑定对象，可以支持嵌套成员,直接根据路径绑定到表单控件上即可。
- `UseFields`创建的绑定对象，会自动同步状态中的值到表单控件上。


##  配置字段

`useFields`相当于`useField`的封装，它支持`useField`的所有配置项。

配置方式如下：

```tsx
const fields = useFields({
    [状态路径]:{
        // useField配置项
    }
})
```

**示例代码如下：**

```tsx
  const { reset,useFields,useReactive } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      job:2,
      age:18,
      pets:"Dog",
      vip:false 
    }
  })

  const fields = useFields({
    "user.pets":{
      type:"radio",
      values:["Dog","Cat","Fish"]
    }
  })
```

以上我们配置`user.pets`字段为`radio`类型，值为`["Dog","Cat","Fish"]`。




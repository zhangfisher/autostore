# usefields
When processing multiple fields, use it `useField` there are more model code for field binding, which looks a bit cumbersome. At this time, it can be used `UseFields` it will automatically create a two -way field binding for each attribute in the nested state.

## Basic usage


<demo react ="form/field/useFieldsBase.tsx"/>


- use `UseFields` created nested binding objects can support nested members, which can be binded directly to the form control according to the path.
- `UseFields` the binding object created will automatically synchronize the value to the form control on the form control.


## Configuration field

 `useFields` equivalent to `useField` packaging, it supports `useField` all configuration items.

The configuration method is as follows:

```tsx
const fields = useFields({
    [状态路径]:{
        // useField配置项
    }
})
```

 **The example code is as follows:** 

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

Our configuration above `user.pets` field `radio` type, value is `["Dog","Cat","Fish"]`.



# bind
  
`bind`可以快速将`input`控件与状态数据进行快速的双向绑定。
 

<demo react="form/bindField.tsx"/>

- `bind(<状态路径>)`返回`input`的`onChange`方法，将之直接`{...bind("")}`解构到`input`元素上即可。

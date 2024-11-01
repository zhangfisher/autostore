# useFields

使用`useField`进行字段绑定有时显得有些繁琐，此时可以使用`UseFields`，它会自动为嵌套状态中的每个属性创建一个双向字段绑定。

## 基本用法


<demo react="form/useFieldsBase.tsx"/>


- 使用`UseFields`创建的嵌套绑定对象，可以支持嵌套成员,直接根据路径绑定到表单控件上即可。
- `UseFields`创建的绑定对象，会自动同步状态中的值到表单控件上。



# 简单字段


## 基本用法

创建表单字段的最简单方式是为`input/textarea/select`元素添加`data-field-name`属性，该属性的值为状态路径。

```tsx
export default ()=>{
    const { Form, useField } = useForm({
        user:{
            name:"fisher",
            age:12,
            job: 2,
            vip:true
        }
    })
    return <Form>
        <input data-field-name="user.name"/>
        <input data-field-name="user.age" type="number"/>
        <select data-field-name="user.job">
            <option value="1">程序员</option>
            <option value="2">教师</option>
            <option value="3">公务员</option>
            <option value="4">外卖员</option>
        </select>
        <input data-field-name="user.vip" type="checkbox"/>
    </Form>
```

- 在上面的代码中，我们没有为`input/select`控件指定`value`属性，也没有为`input`控件指定`onChange`事件处理函数,**只需要指定`data-field-name`属性用来指定状态路径**。
- `Form`组件在初始化时会自动为表单内部的具有`data-field-name`属性的`input/select`控件进行数据绑定和事件处理，实现状态与输入状态的双向绑定。

**实际效果如下：**

<demo react="form/field/simpleField.tsx"/>


## 封装字段

实际使用时，我们一般会对`input/textarea/select`元素进行封装，以便可以进行更多的外观控制。因此，我们也可以在封装元素上通过`data-field-name='<状态路径>'`标识这是一个表单字段。

```tsx {1,3}
<div data-field-name="user.name" >
  <label>First Name</label>
  <input/>  
  <span className="invalid"></span>
</div>
```
- 在上面的代码中，我们将`input`元素封装在一个`div`元素中。
- 使用`data-field-name`标识该`div`元素是一个表单字段，`Form`组件会将具有`data-field-name`属性的元素视为表单字段，查找其内部的`input/textarea/select`元素进行数据绑定和事件处理。


**实际效果如下：**

<demo react="form/field/simpleFieldWrapper.tsx"/>

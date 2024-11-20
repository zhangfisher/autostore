# Simple field

## Basic usage

The easiest way to create a table field is for `input/textarea/select` element add `data-field-name` the value of the attribute is the state path.

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

- In the code above, we didn’t do it `input/select` control specification `value` attributes, there is no reason `input` control specification `onChange` event processing function,**Just specify`data-field-name`Properties are used to specify the state path**.
- `Form` when initialization, the component will automatically be inside the form `data-field-name` attribute `input/select` controls for data binding and event processing to achieve two -way binding of the state and input state.

 **The actual effect is as follows:** 

<demo react ="form/field/simpleField.tsx"/>


## Encapsulation field

In actual use, we are generally right `input/textarea/select` elements are encapsulated so that more appearance control can be performed. Therefore, we can also pass the packaging element `data-field-name = '<State Path>'` identity is a table field.

```tsx {1,3}
<div data-field-name="user.name" >
  <label>First Name</label>
  <input/>  
  <span className="invalid"></span>
</div>
```
- In the code above, we will `input` element packaging in one `div` in elements.
- use `data-field-name` identify `div` the element is a table field,`Form` the component will have `data-field-name` the element of the attribute is deemed to be a table field, looking for its internal `input/textarea/select` elements are for data binding and event processing.


 **The actual effect is as follows:** 

<demo react ="form/field/simpleFieldWrapper.tsx"/>
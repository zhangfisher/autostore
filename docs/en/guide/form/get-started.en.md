
# Get started quickly
## Step 1: Create a form

First, we need to use `useForm` create a form.

```tsx
import { useForm } from "@autostorejs/react" 

const { Form } = useForm({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    age:18,
    vip:false 
  }  
})
```


- `useForm` internal call `createStore` come to create a `AutoStore` so it is essentially `useForm` one `useStore` super set. so `useForm` the return object contains `useStore` the object returned.

```tsx
  const { useReactive,watch,$,.... } = useForm({...})
  ```
- `useForm` the most important thing in the return value is `Form` component, this component is a counterfeit standard `form` packaging.


## Step 2: Declaration field


 

- use `data-field-name` the identification form section allows the form to make the form more control.

#### FIELD field component

use `Field` field components can achieve more complicated control, such as verification, field linkage, etc.

```tsx {3}
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
/>
```


## Step 3: Submit the form
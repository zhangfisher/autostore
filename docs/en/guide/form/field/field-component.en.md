# Fieeld component
If you want to control the field more finely, it is recommended to use it `Field` components.**`Field`The component is the ultimate weapon of the creation form to define the field component**, Allow you to fully control the rendering, verification, visibility, enable enables, etc. of the field, and all field characteristic attributes can be declared by calculating attributes. This is used `Field` components have super custom ability, and can also easily realize the linkage between table fields.

## Create field

use `Field` create a field.

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

 `Field` components are required to provide at least `name` and `render` two attributes.

- `name`: Point to the path of a field in the state tree, such as `user.firstName`.
- `render`: For rendering `Field` component, it receives one `AutoFieldRenderProps` type parameter, responsible for rendering `Field` components.

 **Simply`Field`Component example:** 

<demo react ="form/field/fieldBase.tsx"/>


## Field verification

 `Field` component support `validate` the attribute is used to configure the verification rules of the field.

### Basic verification

```tsx
<Field
    validate={(value)=>{
        return assert(value.length>3,"长度必须大于3")
    }}
    //...
/>
```

- `validate` the value of this attribute is used to create one **Calculation or listening attributes that depend on the current field (state pointing state) state** and it `scope` it also points to the value of the current field.
When the field value changes, the value of the attribute is re -calculated, which will trigger the verification.
- `validate` calculation function return `true/false` to represent the verification whether to pass. As well `throw Error`, Then through the wrong object `message` attribute to get error information and pass it to `render` function.
 

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

- `validate` it is a synchronous calculation attribute that depends on the value of the current field. When the field value changes, the value of the attribute will be re -calculated, which will trigger the verification.

### Linked verification

Because of `validate` it is a synchronous calculation attribute, so it can also depend on the values ​​of other fields, so as to implement the linkage verification between fields.

<demo react ="form/validate/linkageValidate.tsx"/>

In the above example,`count` the verification rules are `count>0 && order.price > 9` because of its `validate` it is a synchronous calculation attribute.`order.price` and `count` value, so `count` and `order.price` will trigger when update `validate` the attribute is re -calculated to trigger the verification.


:::warning reminder
 `validate` the attribute is a synchronous calculation attribute that has a relying on automatic collection function. When the field value changes, the value of the attribute will be re -calculated, which will trigger the verification.
:::


## Field calculation attribute

Apart from `validate` attributes, the field component also supports the following computing attributes:

|Attribute|type|default value|Calculation property|illustrate|
| --- |: ---:|: ---:|: ---:| --- |
|`required`|`boolean`|False|Sync|Whether it must be filled|
|`visible`|`boolean`|true|Sync|Whether it is visible|
|`enable`|`boolean`|true|Sync|Whether it is available|
|`readonly`|`boolean`|False|Sync|Whether to read only|
|`label`|`string`| - |Sync|Field tag|
|`placeholder`|`string`| - |Sync|Field occupation symbol|
|`help`|`string`| - |Sync|Field help information|
|`select`|`any[]`| - |Asynchronous|Field selection item|

The above attributes are synchronized calculation attributes. When the field value changes, the value of the attribute will be re -calculated, which will trigger the rendering of the field. It also supports the relevant characteristics of calculation attributes.

These attributes will **Trigger the re -rendering of the field at the update and pass it to the field component`render`function**.

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

## Asynchronous field calculation attribute

In addition to the above calculation attributes `select` in addition, others are synchronous calculation attributes. When the field value changes, the value of the attribute will be re -calculated, which will trigger the re -rendering of the field.

But sometimes the calculation attribute we need is asynchronous. If we want to conduct asynchronous verification, we need to use it `useComputed` asynchronous calculation attribute.

 
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

- `useComputed` used to dynamically create an asynchronous computing attribute.
- In the previous example, specified `useComputed` of `depends=["user.name"]` and `scope:'user.name` it represents it dependence on `user.name` value, should `user.name` when updated, the value of the attribute will be re -calculated. and `useComputed` of `scope` also point `user.name` value.
- When the verification fails, it is not only returned `false`, But trigger errors, pass `error.message` come wrong information.
- Specify `onError:()=>false` the purpose is to reset the calculation value to `false`.

 **The actual examples are as follows:** 

<demo react ="form/validate/fieldAsyncValid.tsx"/>

:::warning configuration `onError:()=>false` what is the reason?
There is a calculation attribute with one `onError` the callback function is used to handle the error of the calculation attribute. When the calculation attribute is error, it will be triggered `onError` return function,`onError` the return value will be written as the calculation result.
:::
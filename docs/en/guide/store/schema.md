# Schema

`AutoStore` supports specifying `Schema` data for state members, including validation behavior and other descriptive metadata.

## Usage

You can specify `Schema` for state members using the `schema` function:

```ts {1,5}
import { schema } from "autostore"

const store = new AutoStore({
    order:{
        price: schema(100,{  
            validate:(val)=>val>10
            errorTips:"Price must be greater than 10",
            title:"Price",
            required:true
            help:"Product price",
            tags:["price"]
        })
    }
});
```

The `Schema` function signature is as follows:

```ts
function schema<Value=any> (value:Value,options?:SchemaObjectArgs ): SchemaObject<Value>
function schema<Value=any> (value:Value,validate?:AutoStoreValidate<Value>,options?:SchemaObjectArgs):SchemaObject<Value>
function schema<Value=any> (value:Value,validate?:AutoStoreValidate<Value>,errorTips?:SchemaObjectArgs['errorTips']):SchemaObject<Value>
```

## Guide

### Built-in Schema Types

`AutoStore` includes the following built-in types:

- `s.number` Number validator
- `s.string` String validator
- `s.boolean` Boolean validator
- `s.array` Array validator
- `s.object` Object validator
- `s.date` Date validator
- `v.bigint` BigInt validator

**Declaration:**

```ts {1,3-9}
import { schemas } from "autostore"

schemas.number
schemas.string
schemas.boolean
schemas.array
schemas.object
schemas.date
schemas.bigint   
(
    // Initial value
    initial:number,                 
    // Validation function
    validate:AutoStoreValidate,     
    // Validation options
    options?:SchemaObjectArgs | SchemaObjectArgs['errorTips'] 
)

export type AutoStoreValidate<Value=any> = (
    newValue:Value,
    oldValue:Value,
    path:string
)=>boolean
```

**Examples:**

```ts
s.number(100,(val)=>val>10,"Price must be greater than 10")
s.number(100,(val)=>val>10,{
    errorTips:"Price must be greater than 10",
    title:"Price",
    required:true
    description:"Product price",
    tags:["price"]
})

s.string("1234",(val)=>val.length>3,"Password must be longer than 3 characters")
s.string("1234",{
    errorTips:"Password must be longer than 3 characters",
    title:"Password",
    required:true,
    placeholder:"Please enter password"
})
```

:::warning Note
`s` is shorthand for `schemas`, used to simplify code.
:::

### Validation Messages

Each schema supports specifying validation messages for display when validation fails.

Validation error messages can be provided in the following ways:

- **Through the 3rd parameter**

```ts
v.string("1234",
    (val)=>val.length>3,
    "Password must be longer than 3 characters"     // [!code++]
)
```

- **`options.errorTips`**

```ts
v.string("1234",{
    errorTips:"Password must be longer than 3 characters",   // [!code++]
    // ..
})
```

- All validation error messages can be read through `store.validators.errors`.

### Validation Behavior

When validation fails, three handling behaviors are supported:

- **Throw `ValidateError` exception**

Default behavior, will throw a `ValidateError` exception.

```ts 
import { v } from "autostore"

const store = new AutoStore({
    order:{
        // Only specify error message        
        price: v.number(100,(val)=>val>10,"Price must be greater than 10") 
    }
});

try{
    store.order.price = 9;
}catch(e){
    e instanceof ValidateError; // true
    console.log(e.message); // "Price must be greater than 10"
}
```

- **Silent ignore**

Does not throw an exception, only records error messages.

```ts 
import { v } from "autostore"
const store = new AutoStore({
    order:{
        price: v.number(100,(val)=>val>10,{
            errorTips:"Price must be greater than 10",
            behavior:"ignore"  // [!code++]
        }) 
    }
});
```

- **Pass through**

Does not throw an exception and executes the write operation, but error messages can be viewed in `store.validators.errors`.

```ts 
import { v } from "autostore"
const store = new AutoStore({
    order:{
        price: v.number(100,(val)=>val>10,{
            errorTips:"Price must be greater than 10",
            behavior:"pass"  // [!code++]
        }) 
    }
});
```

:::warning Note
All validation error messages can be read through `store.validators.errors`.
:::

### Custom Schema

```ts 
import { s,schema } from "autostore"
const store = new AutoStore({
    order:{
        price: schema<number>(100,(val)=>val>10,"Price must be greater than 10")
    }
});
```

- `schema` is used for custom validators. The first parameter is the validation value, the second parameter is the validation function, and the third parameter is the validation message or parameters.
- A generic type must be specified for `validator` to indicate the type of the validation value.

### Additional Information

Schemas support specifying additional information for use in error messages or UI rendering.

```ts
export type SchemaObject<Value=any> = {
    [VALUE_SCHEMA]    : true
    value?            : Value
    validate?         : AutoStoreValidate<Value>
    behavior?         : 'pass' | 'ignore' | 'throw'   
    required?         : boolean
    enable?           : boolean 
    path?             : string
    // Metadata
    title?            : string
    help?             : string
    placeholder?      : string
    select?           : string[] | number[] | boolean[] | ({
        label?        : string
        value         : Value
        default?      : boolean
        icon?         : string
    })[]
    widget?           : string          
    errorTips?        : string | ((this:SchemaObject<Value>,path:string,newValue:Value,oldValue:Value)=>string )
    tags?             : string[]            
} 
```

### Global Validation

Pass an `onValidate` callback function when building the `AutoStore` instance. When writing data to state, this function will be called for validation, returning `true` for success and `false` for failure.

```ts 
import { v,ValidateError } from "autostore"

const store = new AutoStore({
    order:{
        price: 100
    }
},{
    onValidate(path:string[],newValue:any,oldValue:any){
        // Return true/false
        return <true/false>;  // [!code ++]
        // Throw error
        throw new ValidateError("Error message");
    }
});
```

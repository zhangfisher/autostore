# Validation

`AutoStore` supports data validation when writing to state.

## Usage

### Method 1: Declare Validators

Declare validators directly in the state.

```ts 
import { v } from "autostore"

const store = new AutoStore({
    order:{
        // Only specify error message        
        price: v.number(100,(val)=>val>10,"Price must be greater than 10")
        // Specify validation options and additional data
        price: v.number(100,(val)=>val>10,{
            errorTips:"Price must be greater than 10",
            title:"Price",
            required:true
            description:"Product price",
            tags:["price"]
        })
    }
});
```

- `v` is a validator factory function provided by `AutoStore` for creating validators.
- `v.number` is a number validator provided by `AutoStore` for validating numbers. The first parameter is the default value, and the second parameter is the validation function.
- When writing data to state, the data will be validated.

### Method 2: Global Validation

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

:::warning Note
Validation is triggered when writing to state!
:::

## Guide

### Built-in Validators

`AutoStore` includes the following built-in validators:

- `v.number` Number validator
- `v.string` String validator
- `v.boolean` Boolean validator
- `v.array` Array validator
- `v.object` Object validator
- `v.date` Date validator
- `v.bigint` BigInt validator

**Validator parameter declaration:**

```ts 
v.<
    number|string|boolean|array|object|date|bigint  // [!code ++]
>(
    // Initial value
    initial:number,                 
    // Validation function
    validate:AutoStoreValidate,     
    // Validation options
    options?:ValidatorObjectArgs | ValidatorObjectArgs[errorTips] 
)
export type AutoStoreValidate<Value=any> = (
    newValue:Value,
    oldValue:Value,
    path:string
)=>boolean
```

Examples:

```ts
v.number(100,(val)=>val>10,"Price must be greater than 10")
v.number(100,(val)=>val>10,{
    errorTips:"Price must be greater than 10",
    title:"Price",
    required:true
    description:"Product price",
    tags:["price"]
})

v.string("1234",(val)=>val.length>3,"Password must be longer than 3 characters")
v.string("1234",{
    errorTips:"Password must be longer than 3 characters",
    title:"Password",
    required:true,
    placeholder:"Please enter password"
})
```

### Validation Messages

Each validator supports specifying validation messages for display when validation fails.

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

### Custom Validation

```ts 
import { v,validator } from "autostore"
const store = new AutoStore({
    order:{
        price: validator<number>(100,(val)=>val>10,"Price must be greater than 10")
    }
});
```

- `validator` is used for custom validators. The first parameter is the validation value, the second parameter is the validation function, and the third parameter is the validation message or parameters.
- A generic type must be specified for `validator` to indicate the type of the validation value.

### Additional Information

Validators support specifying additional information for use in error messages or UI rendering.

```ts
export type ValidatorObject<Value=any> = {
    [VALIDATOR_SCHEMA]: true
    value?            : Value
    validate?         : AutoStoreValidate<Value>
    required?         : boolean
    enable?           : boolean 
    path?             : string
    behavior?         : 'pass' | 'ignore' | 'throw'
    title?            : string
    descripotion?     : string
    placeholder?      : string
    widget?           : string          
    errorTips?        : string | ((this:ValidatorObject<Value>,path:string,newValue:Value,oldValue:Value)=>string )
    tags?             : string[]         
} 
```

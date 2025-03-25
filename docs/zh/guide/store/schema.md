# 校验

`AutoStore`支持为状态成员指定`Schema`数据，包括校验行为以及其他描述元数据。

## 使用方法

可以通过`schema`函数为状态成员指定`Schema`：

```ts {1,5}
import { schema } from "autostore"

const store = new AutoStore({
    order:{
        price: schema(100,{  
            validate:(val)=>val>10
            errorTips:"价格必须大于10",
            title:"价格",
            required:true
            help:"产品价格",
            tags:["价格"]
        })
    }
});
```

`Schema`函数签名如下：

```ts
function schema<Value=any> (value:Value,options?:SchemaObjectArgs ): SchemaObject<Value>
function schema<Value=any> (value:Value,validate?:AutoStoreValidate<Value>,options?:SchemaObjectArgs):SchemaObject<Value>
function schema<Value=any> (value:Value,validate?:AutoStoreValidate<Value>,errorTips?:SchemaObjectArgs['errorTips']):SchemaObject<Value>

```


## 指南

### 内置校验模式

`AutoStore`内置了以下：

- `s.number` 数字校验器
- `s.string` 字符串校验器
- `s.boolean` 布尔校验器
- `s.array` 数组校验器
- `s.object` 对象校验器
- `s.date` 日期校验器
- `v.bigint` 大整数校验器

**声明如下：**

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
    // 初始值
    initial:number,                 
    // 校验函数
    validate:AutoStoreValidate,     
    // 校验选项
    options?:SchemaObjectArgs | SchemaObjectArgs['errorTips'] 
)

export type AutoStoreValidate<Value=any> = (
    newValue:Value,
    oldValue:Value,
    path:string
)=>boolean
```

**示例：**

```ts
s.number(100,(val)=>val>10,"价格必须大于10")
s.number(100,(val)=>val>10,{
    errorTips:"价格必须大于10",
    title:"价格",
    required:true
    description:"产品价格",
    tags:["价格"]
})

s.string("1234",(val)=>val.length>3,"密码长度必须大于3")
s.string("1234",{
    errorTips:"密码长度必须大于3",
    title:"密码",
    required:true,
    placeholder:"请输入密码"
})
```

:::warning 提示
`s`是`schemas`的简写，用于简化代码。
:::

### 校验信息

每一个校验器均支持指定校验信息，用于在校验错误时显示。

支持以下方式提供校验错误信息：

- **通过第3个参数提供**

```ts
v.string("1234",
    (val)=>val.length>3,
    "密码长度必须大于3"     // [!code++]
)
```

- **`options.errorTips`**

```ts
v.string("1234",{
    errorTips:"密码长度必须大于3",   // [!code++]
    // ..
})
```

- 通过`store.validators.errors`可以读取所有的校验错误信息。

### 校验行为

当校验失败时，支持三种处理行为

- **抛出`ValidateError`异常**

默认行为，会抛出`ValidateError`异常。

```ts 
import { v } from "autostore"

const store = new AutoStore({
    order:{
        // 只指定错误信息        
        price: v.number(100,(val)=>val>10,"价格必须大于10") 
    }
});

try{
    store.order.price = 9;
}catch(e){
    e instanceof ValidateError; // true
    console.log(e.message); // "价格必须大于10"
}
```

- **静默忽略**

即不抛出异常，仅记录错误信息。

```ts 
import { v } from "autostore"
const store = new AutoStore({
    order:{
        price: v.number(100,(val)=>val>10,{
            errorTips:"价格必须大于10",
            behavior:"ignore"  // [!code++]
        }) 
    }
});
```

- **放行写入，即pass**

即不抛出异常，执行写入操作，但是可以在`store.validators.errors`中查看错误信息。

```ts 
import { v } from "autostore"
const store = new AutoStore({
    order:{
        price: v.number(100,(val)=>val>10,{
            errorTips:"价格必须大于10",
            behavior:"pass"  // [!code++]
        }) 
    }
});
```


:::warning 提示
可以通过`store.validators.errors`读取所有的校验错误信息。
:::

### 自定义模式

```ts 
import { s,schema } from "autostore"
const store = new AutoStore({
    order:{
        price: schema<number>(100,(val)=>val>10,"价格必须大于10")
    }
});
```

- `schema`用于自定义校验器，第一个参数为校验值，第二个参数为校验函数，第三个参数为校验信息或参数。
- 必须为`validator`指定一个泛型类型，用于指定校验值的类型。

### 额外信息

支持指定额外信息，用于在错误信息或者渲染UI时使用。

```ts
export type SchemaObject<Value=any> = {
    [VALUE_SCHEMA]    : true
    value?            : Value
    validate?         : AutoStoreValidate<Value>
    behavior?         : 'pass' | 'ignore' | 'throw'   
    required?         : boolean
    enable?           : boolean 
    path?             : string
    // 提供一些元数据
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


### 全局校验

在构建`AutoStore`实例时，传入`onValidate`回调函数,当写入数据到状态时，会调用此函数进行校验，成功返回`true`,失败返回`false`。

```ts 
import { v,ValidateError } from "autostore"

const store = new AutoStore({
    order:{
        price: 100
    }
},{
    onValidate(path:string[],newValue:any,oldValue:any){
        // 返回true/false
        return <true/false>;  // [!code ++]
        // 触发错误
        throw new ValidateError("错误信息");
    }
});
``` 

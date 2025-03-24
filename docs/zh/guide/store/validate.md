# 校验

`AutoStore`支持在写入状态时对数据进行校验。

## 使用方法

### 方法1： 声明校验器

直接在状态中声明校验器。

```ts 
import { v } from "autostore"

const store = new AutoStore({
    order:{
        // 只指定错误信息        
        price: v.number(100,(val)=>val>10,"价格必须大于10")
        // 指定校验选项等额外的数据
        price: v.number(100,(val)=>val>10,{
            errorTips:"价格必须大于10",
            title:"价格",
            required:true
            description:"产品价格",
            tags:["价格"]
        })
    }
});
```

- `v`是`AutoStore`提供的校验器工厂函数，用于创建校验器。
- `v.number`是`AutoStore`提供的数字校验器，用于校验数字，第一个参数是默认值，第二个参数是校验函数。
- 当写入数据到状态时，会对数据进行校验。


### 方法2： 全局校验

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

:::warning 提示
当写入状态时触发校验！
:::

## 指南

### 内置校验器

`AutoStore`内置了以下校验器：

- `v.number` 数字校验器
- `v.string` 字符串校验器
- `v.boolean` 布尔校验器
- `v.array` 数组校验器
- `v.object` 对象校验器
- `v.date` 日期校验器
- `v.bigint` 大整数校验器

**校验器的参数声明如下：**

```ts 
v.<
    number|string|boolean|array|object|date|bigint  // [!code ++]
>(
    // 初始值
    initial:number,                 
    // 校验函数
    validate:AutoStoreValidate,     
    // 校验选项
    options?:ValidatorObjectArgs | ValidatorObjectArgs[errorTips] 
)
export type AutoStoreValidate<Value=any> = (
    newValue:Value,
    oldValue:Value,
    path:string
)=>boolean
```

示例：

```ts
v.number(100,(val)=>val>10,"价格必须大于10")
v.number(100,(val)=>val>10,{
    errorTips:"价格必须大于10",
    title:"价格",
    required:true
    description:"产品价格",
    tags:["价格"]
})

v.string("1234",(val)=>val.length>3,"密码长度必须大于3")
v.string("1234",{
    errorTips:"密码长度必须大于3",
    title:"密码",
    required:true,
    placeholder:"请输入密码"
})
```

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

### 自定校验


```ts 
import { v,validator } from "autostore"
const store = new AutoStore({
    order:{
        price: validator<number>(100,(val)=>val>10,"价格必须大于10")
    }
});
```

- `validator`用于自定义校验器，第一个参数为校验值，第二个参数为校验函数，第三个参数为校验信息或参数。
- 必须为`validator`指定一个泛型类型，用于指定校验值的类型。

### 额外信息

校验器支持指定额外信息，用于在错误信息或者渲染UI时使用。

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

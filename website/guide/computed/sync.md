## 关于
  
同步计算属性直接声明在状态中，本质上是一个普通的函数，,当`State`中的数据变化时，会自动触发计算属性的重新计算，将计算结果赋值给`State`中的对应属性。

## 创建方式

### 快速创建

可以直接在`State`中声明普通同步计算函数。

```ts {6-8}
import { createStore } from '@autostorejs/react';
const state = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: (user)=>{
      return user.firstName+user.lastName
    } 
  }
})
```
- `fullName`是一个同步计算属性，依赖于`firstName`和`lastName`，当`firstName`或`lastName`变化时，会自动重新计算`fullName`的值。
- `fullName`的第一个参数(即`作用域`)是由`createStore`时指定的`scope`指定的,默认指定的`ObserverScopeRef.Current`。因此，`fullName`的第一个参数是`user`对象。
- 如果同步计算函数是一个普通函数而不是箭头函数，那么`this`指向是根据当前计算属性创建的`computedObject`对象，详见[计算对象](./objects)。
- 同步计算属性的依赖收集是自动的，无需手动指定依赖。


<demo react="computed/syncBase.tsx" /> 


### 使用`computed`

创建同步计算属性的标准方式是`computed(<getter>,<options>)`函数，通过为`computed`指定`options`来进行一些更灵活的控制计算属性的行为。


```ts {6,8}
const state = {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName:computed<string>((state)=>{
      return state.user.firstName+state.user.lastName
    },{ 
      scope:ObserverScopeRef.Root               // 计算函数的第一个参数
    }) 
  }
} 
```

由于可以指定`computedScope`,因此计算函数就可以实现相对计算。

<demo react="computed/syncBookOrder.tsx" />


- 在上面的例子，计算订单的小计只需要` {...,total:(book)=>book.price*book.count}`即可计算出小计，看起来非常简洁。


## 配置参数

使用`computed(<getter>,<options>)`创建同步计算属性时，可以指定以下参数：

| 参数 | 类型 | 默认值 |说明 | 
| --- | --- | --- | --- |
| `id` | `string` |  | 计算属性的唯一标识，用于在`computedObjects`中查找计算属性对象。 |
| `scope` | `ObserverScopeRef` | `ObserverScopeRef.Current` | 计算函数的第一个参数，即`作用域`。 |
| `group` | `string` |  | 用于计算属性对象进行分组，可以`computedObjects.runGroup(name)`来运行一组计算属性。 |
| `objectify` | `boolean` | `true` | 是否将计算属性对象保存在`store.computedObjects` |

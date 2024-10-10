---
title: 全局监视
group:
  title: 监视
  order: 3 
order: 1
demo:
  tocDepth: 5
toc: content
---

# 全局监视

使用`store.watch`方法用于全局监视`State`中的数据变化，当所监视的数据发生变化时，可以执行侦听器函数。

## 监听方法

`watch`方法的签名如下：

```ts | pure
// 监听全部
watch(listener:WatchListener,options?:WatchListenerOptions):Watcher
// 只监听指定路径
watch(paths:'*' | string | (string|string[])[],listener:WatchListener,options?:WatchListenerOptions):Watcher
```

返回`Watcher`类型，用于取消监听。

```ts
type Watcher = { off:()=>void }
```


### 监听函数

`WatchListener`是一个函数，用来处理监视到的数据变化，其签名如下：

```ts | pure
type WatchListener<Value=any,Parent=any> = (operate:StateOperate<Value,Parent>)=>void

type StateOperate<Value=any,Parent=any> = {
    type       : StateOperateType,
    path       : string[],
    value      : Value,
    indexs?    : number[],                
    oldValue?  : Value,
    parentPath?: string[],
    parent?    : Parent,    
    reply?     : boolean               
} 
```

- 当侦听到数据变化时，`watch`会调用`WatchListener`函数，并传入一个`StateOperate`对象。
- `StateOperate`对象包括了变化的类型`type`，`path`，`value`等信息。

`StateOperate`对象的属性如下：

| 属性       | 类型   | 说明                                                         |
| :----------: | :------: | ------------------------------------------------------------ |
| `type`       | `string` | 状态操作类型，取值`get`,`set`,`delete`,`insert`,`update`,`remove`,`batch`  |
| `path`       | `string[]` | 状态路径 |
| `value`      | `any`    | 值 |
| `indexs`     | `number[]` | 数组操作时的索引 |
| `oldValue`   | `any`    | 旧值 |
| `parentPath` | `string[]` | 父路径 |
| `parent`     | `any`    | 父值 |
| `reply`      | `boolean` | 批量操作时是否回放 |


- `watch`能状态的读写操作,包括`get`,`set`,`delete`,`insert`,`update`,`remove`,`batch`等操作进行监听。
- `get`,`set`,`delete`适于对象的值的读写
- `insert`,`update`,`remove`适于数组的操作
- `batch`适于批量操作,当使用`batchUpdate`会触发此类型的操作事件，详见[批量操作](./store-state)
- `reply`参数用于标识该操作是否是在批量更新时的事件回放。


:::warning{title=注意}
监听函数只能是一个同步函数
:::

### 监听选项

```ts | watch
type WatchListenerOptions = {
    once?    : boolean                                        
    operates?: '*' | 'read' | 'write' | StateOperateType[]     // 只侦听的操作类型
    filter?  : (args:StateOperate)=>boolean                // 过滤器
}
```

| 属性       | 类型   | 说明                                                         |
| :----------: | :------: | ------------------------------------------------------------ |
| `once`       | `boolean` | 是否只监听一次 |
| `operates`   | `'*'\| 'read' \| 'write' \| StateOperateType[]` | 只侦听的操作类型 |
| `filter`     | `(args:StateOperate)=>boolean` | 过滤器函数，返回`true`则执行监听函数，否则不执行 |

- 监听函数最重要的参数是`operates`，用来配置要监听的操作类型，可以是`'*'`，`'read'`，`'write'`，或者一个操作类型数组。
- 默认`operates='write'`，即监听所有写操作。
- `operates='get`代表监听所有读操作。
- `operates='*'`代表监听所有读写删除操作。
- `operates`也可以是一个操作类型数组，比如`['set','delete']`，代表监听`set`和`delete`操作。
- `once`属性用来配置是否只监听一次。
- `filter`函数用来过滤监听的操作，返回`true`则执行监听函数，否则不执行。

**示例：**

```tsx | pure
store.watch((operate)=>{
    ....
},{
  operates:'write'
})
```

## 全局临听

使用`watch(listener,options?)`方法用来全局监听`State`中的数据变化，对状态的任何操作均会执行监听函数。

```tsx
import { createStore, computed } from "@autostorejs/react"
import { Box,Button,ColorBlock,Col,Row } from "x-react-components"
import { useState,useEffect,useRef } from "react"
// React严格模式（Strict Mode）会在开发模式下执行两次
// 此时为了演示方便，我们做了包装只执行一次
import { useOneEffect } from "autostore-docs"

const { state,watch,$ } = createStore({
  order:{
    price:10,
    count:2,
    total:computed((order)=>{    
      return order.price*order.count
    })
  } 
})
export default ()=>{
  const ref = useRef()
  useEffect(()=>{
    const watcher = watch((operate)=>{      
        ref.current.insertAdjacentHTML("beforeend",`<p>${operate.type} ${operate.path.join('.')}</p>`)
      },{
        operates:'*'
      })
    return ()=>watcher.off()
  },[])  

  return (<Row>
    <Col>
      <ColorBlock name="Price">{$('order.price')}</ColorBlock>
      <ColorBlock name="Count">
        <Button onClick={()=>{
          state.order.count--
          ref.current.insertAdjacentHTML("beforeend",`----------`)
        }}>-</Button>
        {$('order.count')}
        <Button onClick={()=>{
            state.order.count++
            ref.current.insertAdjacentHTML("beforeend",`----------`)
        }}>+</Button>
      </ColorBlock>
      <ColorBlock name="Total">{$('order.total')}</ColorBlock>
    </Col>
    <Col> 
      <div ref={ref} style={{
        lineHeight:'100%',
        maxHeight:200,
        overflowY:'auto',        
      }}></div>
    </Col>
  </Row>)
}
```



## 局部临听



## 依赖收集









- **动态依赖**

`computed`计算函数的依赖一般是确定的，而`watch`函数的依赖是动态的。这比较适合一些需要动态侦听的场景，比如上例中，我们动态侦听`orders[].count`的变化来计算`total`。而`computed`函数的依赖是静态的，一旦声明就不会变化。

- **多字段复合计算**

当某个字段需要进行复合计算时，我们可以使用`watch`函数来实现。比如在`SpeedForm`实现表单的`validate`和`dirty`属性的计算时，就是使用`watch`实现。

比如这是表单`validate`检测的实现代码：

```tsx | pure
export function validate<T=any>(options?:ValidateOptions){
    const { entry  } = Object.assign({},options)
    return watch<boolean,boolean>((value,{ fromPath,selfPath,getCache})=>{        
        // 只侦听entry下的所有字段
        if(!isIncludePath(entry ? entry : selfPath,fromPath)) return   
        const selfCache = getCache()  // 得到的是一个Dict用来保存所有字段的validate属性值
        // validate属性是一个boolean
        if(typeof(value)=='boolean'){
            const srcKey = fromPath.join(OBJECT_PATH_DELIMITER)
            if(value){
                delete selfCache[srcKey]
            }else{
                selfCache[srcKey] = value
            }
        }
        // 由于cache里面只记录validate=false的值，所以如果cache不为空则代表有字段的validate=false
        return Object.keys(selfCache).length==0
    },(path)=>isValidateField(path),{
        initial:true
    })
}
 
```

**基本逻辑：*

- 以上`validate`传入一个入口参数`entry`,用来限定校验范围，然后创建一个`watch`对象。
- `(path)=>isValidateField(path)`用来判断发生变化的路径是否包含的`validate`字段，如果是否则会执行`watch`监听函数。
- 在`watch`监听函数内，
    -  `value`：变化的值
    - `fromPath`：指的是哪里发生变化的路径
    - `getCache`：用来获取当前`watch`的`cache`对象，用来保存校验值。
    - 在`cache`里面我们保存从校验范围内所有`value=false`，如果`Object.keys(selfCache).length==0`就代表在该校验范围内所有字段均有效。


    






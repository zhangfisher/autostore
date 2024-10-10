---
title: 状态内监视
group:
  title: 监视
  order: 3 
order: 2
demo:
  tocDepth: 5
toc: content
---

# 状态内监视

## 工作原理

`@autostorejs/react`提供了`watch`函数，用来在`state`中声明一个监听对象,然后监听函数的返回值写入声明所在路径。

![](./signal-watch.drawio.png)


`watch`函数的基本特性如下：

- 在状态中的任意位置，使用`watch(...)`来声明一个监听器对象。
- 在`createStore`执行后，会扫描状态数据，如果发现一个值是`watch(...)`,则会创建一个`WatchObject`对象，用来监听`State`中的数据变化。
- 创建的`WatchObject`对象会保存在`Store`对象的`watchObjects`对象中
- 当所监听的数据发生变化时，会调用`WatchObject`对象的`getter`函数，然后将返回结果写入到声明`watch(...)`的位置。



## 基本用法

`watch`函数签名如下：

```ts | pure
// 监听filter过滤后的
function watch<Value=any, DependValue=any>(
  getter:WatchGetter<Value,DependValue>,
  filter?:WatchDependFilter<DependValue>,
  options?:Omit<WatchOptions<Value>,'filter'>
):WatchDescriptorBuilder<Value>
// 监听全部
function watch<Value=any, DependValue=any>(
  getter:WatchGetter<Value,DependValue>,
  options?:Omit<WatchOptions<Value>,'filter'>
):WatchDescriptorBuilder<Value>
```
 
  

**`watch`函数基本使用如下：**

```tsx 
import { createStore,watch } from '@autostorejs/react';
import { Divider,Input,Button } from "x-react-components"

const { state,useState } = createStore({
  orders:[
    { name:"AutoStore实战指南",
      price:100,
      count:1,
      total:(book)=>book.price*book.count
    },
    { name:"深入浅出AutoStore",
      price:98,
      count:1,
      total:(book)=>book.price*book.count
    }
  ],    
  total: watch<true>((count)=>{
     return state.orders.reduce((total,book)=>total+book.count*book.price,0)
    },
    // 当price或count变化时，触发侦听器函数的执行
    (path:string[])=>{
        return path[path.length-1]==='count'
      },{    
      initial:198         // total的初始值
    })
})
 
export default ()=>{ 
  const [ bookshop ] = useState()
  return (<table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Count</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {bookshop.orders.map((book,index)=>
          <tr key={index}>
            <td>{book.name}</td>
            <td>{book.price}</td>
            <td>
              <Button onClick={()=>book.count--}>-</Button>
              <Input value={book.count} style={{display:"inline-flex"}}/>
              <Button onClick={()=>book.count++}>+</Button>
            </td>
            <td>{book.total}</td>
          </tr>
        )}
        <tr>
          <td colSpan={3}>Total</td>
          <td>{state.total}</td>
        </tr>
        </tbody>
    </table>)
}

```

在以上例子中：

- `watch`函数的第一个参数是`getter`函数，负责在依赖变化时计算新值。`getter`函数的返回值会写入`watch`函数所在的位置。
- `watch`函数的第二个参数是一个过滤函数，当状态变化时会调用此方法，如果返回`true`才会执行`getter`
- `initial`属性用来配置`watch`函数所在位置的`total`的初始值。

 
## 监听函数

`watch`的`getter`参数只能是一个**同步函数**，签名如下：

```typescript
type WatchGetter<Value=any,DependValue= any> = (
    // 传入发生变化的路径和值
    scope: {path:string[],value:DependValue},
    // 创建的watchObject对象
    watchObject : WatchObject<Value>
)=>Exclude<any,Promise<any>> | undefined

```

## 监听参数

`watch`支持以下参数

```ts | pure
interface WatchOptions<Value=any> extends ObserverOptions<Value>  { 
    async?  : false                        
    filter : WatchDependFilter<Value>     
}
```

- `initial`： 用来指定一个默认值
- `id`： 用来指定一个唯一的标识，同时作为创建的`WatchObject`的`key`，可以通过`store.watchObjects.get(<id>)`来访问。


## 动态依赖

`computed`计算函数的依赖一般是确定的，而`watch`函数的依赖可以是动态的。这比较适合一些需要动态侦听的场景。

比如上例中，我们动态侦听`orders[].count`的变化来计算`total`。而`computed`函数的依赖是静态的，一旦声明就不会变化。

以下是表单`validate`检测的简单示例：

```tsx | pure
const store = createStore({
      a:{
          validate:true
      },
      b:{
          validate:true
      },            
      c:{
          validate:true,
          c1:{
              validate:true
          }
      },
      validate:watch<boolean,boolean>(({path,value},watchObj)=>{   
          if(typeof(value) === 'boolean'){
              const srcKey = path.join('.')
              if(value){
                  delete watchObj.cache[srcKey]
              }else{
                  watchObj.cache[srcKey] = value
              }
          }
          // 由于cache里面只记录validate=false的值，所以如果cache不为空则代表有字段的validate=false
          return Object.keys(watchObj.cache).length==0

      },
      (path)=>path[path.length-1]=='validate', // 只侦听validate字段的值变化
      {initial:true,id:"x"})
  })  
```


**说明：**

- 上例中，我们需要实现一个`validate`字段来表单整个表单的有效，当状态中任意一个对象中的`validate`字段都为`false`时，则`validate=false`，否则为`true`。
- 现在问题是`validate`可能是在一个复杂的嵌套对象中，并且可能是动态的。这时候，我们无法使用`computed`来进行计算，因为`computed`的依赖是静态的。
- 此时就是使用`watch`函数的时候了，我们声明一个`watch`函数，用来监听所有路径中的`path[path.length-1]=='validate'`字段的变化即可。
- 关于`WatchObject`的介绍，可以参考[监听对象](./watch-objects.md)。

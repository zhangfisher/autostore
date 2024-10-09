---
group:
  title: 计算属性
  order: 2
title: 手动执行
order: 8 
demo:
  tocDepth: 5
toc: content
---

## 关于

一般情况下，计算属性的计算是自动进行的，当依赖变化时，计算属性会自动重新计算。

但是有时候我们需要手动执行计算，或者对计算进行分组，这时候就需要使用`ComputedObject`对象。

每一个计算函数均会创建一个`ComputedObject`实例，保存在`store.computedObjects`,该对象有以下属性和方法:


## 运行计算函数

使用`store.computedObjects.get(<id>).run()`来运行计算函数。

```tsx | pure {15,16} 
import { createStore,computed } from '@autostorejs/react';
const store = createStore({
  order:{
    price:100,
    count:4,
    total: computed(async (state)=>{
      return state.price*state.count
    },["./price","./count"]),
    total2: computed(async (state)=>{
      return state.price*state.count
    },["./price","./count"],{id:"x"})
  }
})
// 获取计算对象，然后运行计算函数
store.computedObjects.get("order.total").run()
store.computedObjects.get("x").run()

```

- 每一个计算属性对象均会创建一个对应的`ComputedObject`,`id`是计算属性所在路径名，如`user.fullName`。也可以通过`id`参数来指定唯一标识。
- 通过`store.computedObjects.get(<id>)`来获取计算对象，然后调用`run`方法来运行计算函数。


## run方法

通过`computedObject.run(args:RuntimeComputedOptions)`方法用来重新运行计算函数。

`run`函数的参数如下：

```ts | pure
export type RuntimeComputedOptions = ComputedOptions & {
    first?  : boolean            // 当第一次运行时为true
    changed?: StateOperate       // 变化的依赖信息
} 
```

- 当手动运行计算函数时，允许传入`RuntimeComputedOptions`参数，用来覆盖默认的计算参数。
- `first`参数用来标识是否为第一次运行计算函数。一般手工运行时不要指定
- `changed`参数用来指定变化的依赖信息，当计算属性的依赖值发生变化时，会传入此参数，此参数包含所依赖的状态信息。而当手工执行时，不需要指定此参数。
- `ComputedOptions`的配置参数可以参考[计算参数](./computed-options)。
 
## 运行分组

`ComputedObjects`提供了一个`runGroup`方法，用来执行分组计算。
当使用`computed`方法创建计算属性时，可以传入一个`group`参数，用来为计算属性分组，然后就可以通过`runGroup`方法，用来手动执行该分组计算函数。

```tsx 
import { createStore,computed,delay } from '@autostorejs/react';
import { Divider,ColorBlock,Button,Input } from "x-react-components" 

let count=0
const state = {
  book:{
    name:"Zhang",
    count:4,
    price: 100,
    total1: computed(async (book)=>{
      await delay()
      return book.count*book.price 
    },[],{async:true,group:"total"}),
    total2: computed(async (book)=>{
      await delay()
      return book.count*book.price 
    },[],{async:true,group:"total"}),
    total3: computed(async (book)=>{
      await delay()
      return book.count*book.price 
    },[],{async:true,group:"total"}),
    average1: computed(async (book)=>{
      await delay()
      return book.price/book.count
    },[],{async:true,group:"average"}),
    average2: computed(async (book)=>{
      await delay()
      return book.price/book.count
    },[],{async:true,group:"average"}),
    average3: computed(async (book)=>{
      await delay()
      return book.price/book.count
    },[],{async:true,group:"average"}) 
  }
} 

const store = createStore(state)

export default ()=>{
  const [state] = store.useState()

  return (<div> 
    <Divider title="Total Group"/>
    <ColorBlock name="Total1" 
      loading={state.book.total1.loading}>{state.book.total1.loading ? '计算中...' : state.book.total1.value}
    </ColorBlock> 
    <ColorBlock name="Total2" 
      loading={state.book.total2.loading}>{state.book.total2.loading ? '计算中...' : state.book.total2.value}
    </ColorBlock> 
    <ColorBlock name="Total3" 
      loading={state.book.total3.loading}>{state.book.total3.loading ? '计算中...' : state.book.total3.value}
    </ColorBlock> 
    <Button onClick={()=>store.computedObjects.runGroup("total")}>执行组total计算函数</Button> 
    <Divider title="Average Group"/>
    <ColorBlock name="Average1" loading={state.book.average1.loading } > {state.book.average1.loading ? '计算中...' : state.book.average1.value}</ColorBlock> 
    <ColorBlock name="Average2" loading={state.book.average2.loading } > {state.book.average2.loading ? '计算中...' : state.book.average2.value}</ColorBlock> 
    <ColorBlock name="Average3" loading={state.book.average3.loading } > {state.book.average3.loading ? '计算中...' : state.book.average3.value}</ColorBlock> 
    <Button onClick={()=>store.computedObjects.runGroup("average")}>执行组Average计算函数</Button> 
  </div>)
}
```


## 启用/禁用计算

`computed`提供了一个`enable`属性用来控制是否进行计算。当`enable=false`时，当依赖变化时不会进行计算，直至`enable=true`。

**我们可以通过以下方法来启用/禁用计算。**

- 可以在使用`computed`创建计算属性时，传入`enable`来指定计算属性的默认状态。
- 可以通过`ComputedObjects.get(<路径名称>)`来启用/禁用计算。
- 可以通过`ComputedObjects.enableGroup(<true/false>)`来启用/禁用某个组的计算。



```tsx 
import { createStore,computed,delay } from '@autostorejs/react';
import { Divider,ColorBlock,Button,Input } from "x-react-components"

let count=0
const state = {
  book:{
    name:"Zhang",
    count:4,
    price: 100,
    total1: computed(async (book)=>{
      await delay()
      return book.count*book.price 
    },['book.count','book.price'],{async:true,group:"total"}),
    total2: computed(async (book)=>{
      await delay()
      return book.count*book.price 
    },['book.count','book.price'],{async:true,group:"total",initial:100,enable:false}),
    total3: computed(async (book)=>{
      await delay()
      return book.count*book.price 
    },[],{async:true,group:"total"})
  }
} 

const {useState,computedObjects,bind } = createStore(state)

export default ()=>{
  const [state] = useState()
  
  return (<div> 
    <ColorBlock name="BookName">{state.book.name}</ColorBlock>
    <ColorBlock name="count">
      <div style={{display:"flex",alignItems:"center"}}>
        <Button onClick={()=>state.book.count--}>-</Button>
        <Input value={state.book.count} {...bind("book.count")}/>
        <Button onClick={()=>state.book.count++}>+</Button>
      </div>
    </ColorBlock>
    <ColorBlock name="price"> <Input value={state.book.price} {...bind("book.price")}/></ColorBlock>
    <Divider title="Total Group"/>
    <table className="table table-bordered">
      <tbody>
        <tr>
          <td>Total1 =</td>
          <td>{state.book.total1.loading ? '计算中...' : state.book.total1.value}</td>
          <td>默认自动计算</td>
        </tr>
        <tr>
          <td>Total2 =</td>
          <td>{state.book.total2.loading ? '计算中...' : state.book.total2.value}</td>
          <td>禁用计算，指定了默认值(<input type="checkbox" checked={computedObjects.get("book/total2")}/>)</td>
        </tr>        
        <tr>
          <td>Total3 =</td>
          <td>{state.book.total3.loading ? '计算中...' : state.book.total3.value}</td>
          <td>无依赖，需要手动计算</td>
        </tr>
      </tbody>
    </table> 
    <Button onClick={()=>computedObjects.runGroup("total")}>执行组total计算函数</Button> 
  </div>)
}


```




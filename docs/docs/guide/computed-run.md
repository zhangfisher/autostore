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

## 介绍

一般情况下，计算属性的计算是自动进行的，当依赖变化时，计算属性会自动重新计算。但是有时候我们需要手动执行计算，或者对计算进行分组，这时候就需要使用`ComputedObject`对象。


## 计算对象

每一个计算函数均会创建一个`ComputedObject`实例，保存在`store.computedObjects`,该对象有以下属性和方法:

```tsx | pure
export interface ComputedObject<T=Dict> {
  mutate:IMutateWitness<T> 
  run:(throwError?:boolean)=>Promise<any> | any
  async:boolean               // 是否是异步属性
  options:ComputedOptions     // 异步参数
}
export class ComputedObjects<T=Dict> extends Map<string,ComputedObject<T>>{  
  async runGroup(group:string)        // 手动运行指定组的计算函数
  enableGroup(value:boolean)          // 启用或禁用指定组的计算函数
}
```

- `ComputedObject`是一个普通的`{}`,里面保存了所有`ComputedOptions`，因此通过`ComputedObject`实例可以读取到计算函数的所有属性。
- `ComputedObject`提供了一个`run`方法用来手动执行计算函数。
- `ComputedObjects`是一个`Map`对象，其中的`key`是计算对象的`valuePath`，`value`是的`ComputedObject`。
- 在使用`computed(getter,deps,options)`创建计算属性时，`options`可以通过`ComputedObject.options`读取和修改，比如可以通过`ComputedObject.options.enable=false`来禁用计算。

## 计算分组



## 计算分组

`ComputedObjects`提供了一个`runGroup`方法，用来执行分组计算。
当使用`computed`方法创建计算属性时，可以传入一个`group`参数，用来为计算属性分组，然后就可以通过`runGroup`方法，用来手动执行该分组计算函数。

```tsx  | pure
import { createStore,computed } from '@autostorejs/react';
import { Divider,ColorBlock } from "x-react-components"
import { delay } from "autostore-docs"

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

    // Q: 为什么此处要指定async=true?
    // A: 因此本站使用webpack/babel进行转码，因此无法自动识别async函数，因此需要手动指定async=true
  }
} 

const store = createStore(state)

export default ()=>{
  const [state] = store.useState()

  return (<div>
    <div>BookName ={state.book.name}</div>
    <div>count = <input value={state.book.count} onChange={store.sync(["book","count"])}/></div>
    <div>price = <input value={state.book.price} onChange={store.sync(["book","price"])}/></div>
    <Divider title="Total Group"/>
    <div>Total1 ={state.book.total1.loading ? '计算中...' : state.book.total1.result}</div> 
    <div>Total2 ={state.book.total2.loading ? '计算中...' : state.book.total2.result}</div> 
    <div>Total3 ={state.book.total3.loading ? '计算中...' : state.book.total3.result}</div> 
    <button onClick={()=>store.computedObjects.runGroup("total")}>执行组total计算函数</button> 
    <Divider title="Average Group"/>
    <div>Average1 ={state.book.average1.loading ? '计算中...' : state.book.average1.result}</div> 
    <div>Average2 ={state.book.average2.loading ? '计算中...' : state.book.average2.result}</div> 
    <div>Average3 ={state.book.average3.loading ? '计算中...' : state.book.average3.result}</div> 
    <button onClick={()=>store.computedObjects.runGroup("average")}>执行组average计算函数</button> 
  </div>)
}


```

- 以上我们将所有计算函数的依赖均设为`[]`，也就是无依赖，因此当`book.price`,`book.count`的值变化时，`Total Group`和`Average Group`的计算属性并不会自动重新计算，此时就需要手动执行计算。

:::warning{title=提示} 
  **Q**: 为什么此处要指定`async=true`?<br/>
  **A**: 因此本站使用`webpack/babel`进行转码，异步函数会被转码为同步函数，导致无法自动识别`async`函数，因此需要手动指定`async=true`
:::


## 启用/禁用计算

`computed`提供了一个`enable`属性用来控制是否进行计算。当`enable=false`时，当依赖变化时不会进行计算，直至`enable=true`。

**我们可以通过以下方法来启用/禁用计算。**

- 可以在使用`computed`创建计算属性时，传入`enable`来指定计算属性的默认状态。
- 可以通过`ComputedObjects.get(<路径名称>)`来启用/禁用计算。
- 可以通过`ComputedObjects.enableGroup(<true/false>)`来启用/禁用某个组的计算。



```tsx | pure
import { createStore,computed } from '@autostorejs/react';
import { Divider,ColorBlock } from "x-react-components"
import { delay } from "autostore-docs"

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
    <div>BookName ={state.book.name}</div>
    <div>count = <input value={state.book.count} onChange={store.sync(["book","count"])}/></div>
    <div>price = <input value={state.book.price} onChange={store.sync(["book","price"])}/></div>
    <Divider title="Total Group"/>
    <table>
      <tbody>
        <tr>
          <td>Total1 =</td>
          <td>{state.book.total1.loading ? '计算中...' : state.book.total1.result}</td>
          <td>默认自动计算</td>
        </tr>
        <tr>
          <td>Total2 =</td>
          <td>{state.book.total2.loading ? '计算中...' : state.book.total2.result}</td>
          <td>禁用计算，指定了默认值(<input type="checkbox" checked={store.computedObjects.get("book/total2")} onChange={(e)=>{
            console.log("ff=,",e.target,store.computedObjects.get("book/total2"))
          }} />)</td>
        </tr>        
        <tr>
          <td>Total3 =</td>
          <td>{state.book.total3.loading ? '计算中...' : state.book.total3.result}</td>
          <td>无依赖，需要手动计算</td>
        </tr>
      </tbody>
    </table> 
    <button onClick={()=>store.computedObjects.runGroup("total")}>执行组total计算函数</button> 
    <Divider title="Average Group"/>
    <div>Average1 ={state.book.average1.loading ? '计算中...' : state.book.average1.result}</div> 
    <div>Average2 ={state.book.average2.loading ? '计算中...' : state.book.average2.result}</div> 
    <div>Average3 ={state.book.average3.loading ? '计算中...' : state.book.average3.result}</div> 
    <button onClick={()=>store.computedObjects.runGroup("average")}>执行组average计算函数</button> 
  </div>)
}


```







## 异步计算对象

当在状态中使用`computed`声明异步计算属性后，在执行`createStore`后，会根据声明：

- 创建一个`AsyncComputedObject`实例,默认会保存在`store.computedObjects`中。如果配置`options.objectify=false`则不会保存。
- 状态中的原位置会被替换成一个类型为`AsyncComputedValue`的对象

原地移花接木的过程如下：

![异步计算对象](./computed-async.drawio.png)

`AsyncComputedValue`对象类型声明如下：

```ts 
export type AsyncComputedValue<Result= any,ExtAttrs extends Dict = {}> ={
  // 是否正在计算
  loading? : boolean;               
  // 进度值    
  progress?: number;                
  // 超时时间，单位ms，当启用超时时进行倒计时
  timeout? : number ;               
  // 执行出错时的错误信息
  error?   : any;        
  // 重试次数，当执行重试操作时，会进行倒计时，每次重试-1，直到为0时停止重试           
  retry?   : number                 
  // 计算函数的返回值保存到此处
  value   : Result;                
  // 重新运行计算函数
  run  : (options?:RuntimeComputedOptions) => {};    
  // 中止正在执行的异步计算
  cancel  : ()=>void                                        
} & ExtAttrs                        // 额外的属性
```


以下是一个例子，`state.user.fullName`是一个`AsyncComputedValue`对象，通过该对象可以读取到异步计算的进度以及结果等。

```ts  | pure

const state = {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: async (user)=>{
      // await some async code
      return user.firstName+user.lastName
    } 
  }
}  
const store = createStore(state)

// 经createStore处理后的fullName是一个AsyncComputedValue对象
store.state.user.fullName=={
  loading:false,          // 是否正在计算
  error:null,             // 计算错误信息
  timout:0,               // 超时计算相关
  retry:0,                // 重试次数
  value:"ZhangFisher",    // 计算结果
  progress:0,             // 计算进度
  run:()=>{},             // 重新执行计算
  cancel: ()=>void 
}
```
 
<Divider></Divider>

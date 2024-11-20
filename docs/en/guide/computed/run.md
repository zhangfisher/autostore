# Run

## about

In general, the calculation of the calculation attribute is automatically carried out. When the dependencies change, the calculation attribute will automatically recalculate.

But sometimes we need to manually execute the calculation, or group the calculation. At this time, we need to use it `ComputedObject` object.

Each calculation function will create one `ComputedObject` example, preserve `store.computedObjects`, This object has the following attributes and methods:


## Run calculation function

use `store.computedObjects.get(<id>).run()` to run the calculation function.

```tsx {15,16} 
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

- Each calculation attribute object will create a corresponding `ComputedObject`,`id` it is the path name of the calculation attribute, such as `user.fullName` essence It can also pass `id` parameters to specify the unique identification.
- pass `store.computedObjects.get(<id>)` to get the calculation object, then call `run` method to run the calculation function.


## RUN method

pass `computedObject.run(args:RuntimeComputedOptions)` methods to re -run the calculation function.

 `run` the parameters of the function are as follows:

```ts
export type RuntimeComputedOptions = ComputedOptions & {
    first?  : boolean            // 当第一次运行时为true
    operate?: StateOperate       // 变化的依赖信息
} 
```

- When the calculation function is manually run, it is allowed to be passed in `RuntimeComputedOptions` parameters are used to cover the default calculation parameters.
- `first` the parameter is used to identify whether it is the first run calculation function. Do not specify when running manually
- `operate` the parameter is used to specify the dependency information of the change. When the dependence of the calculation attribute changes, this parameter will be passed in, which contains the state information that is dependent. This parameter does not need to be specified when manual execution.
- - `ComputedOptions` the configuration parameters can be referred to [Calculating parameters](./options).
 
## Runtime

 `ComputedObjects` one `runGroup` methods to perform group calculations.
Use `computed` methods when creating calculation attributes, you can pass one `group` parameters, which are used to calculate the attributes, and then pass through `runGroup` methods to manually execute the group calculation function.

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


## Enable/disable calculation

 `computed` one `enable` the attribute is used to control whether it is calculated. when `enable=false` at this time, it will not be calculated when the dependen `enable=true`.

 **We can use the following methods to enable/disable calculations.** 

- Can be used `computed` when creating calculation attributes, pass in `enable` to specify the default state of the calculation attribute.
- Can pass `ComputedObjects.get (<way name>)` let's enable/disable calculations.
- Can pass `ComputedObjects.enableGroup(<true/false>)` let's enable/disable the calculation of a group.```tsx 


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



---
group:
  title: 计算属性
  order: 2
order: 6  
title: 异步计算🔥
demo:
  tocDepth: 5
toc: content
---

# 异步计算
 
`AutoStore`的异步计算属性是非常强大。 

## computed

创建异步计算属性的基本方法是直接在`State`中任意位置使用`computed`进行声明。

```tsx | pure  {6-8}
import { computed } from "@autostorejs/react"
const store = createStore({
  order:{
    price:10,
    count:1,
    total:computed(async (scope)=>{
      return scope.price*scope.count
    },['./price','./count'])
  }
})
```

**`computed`是一个普通的函数，用于声明计算属性，异步计算属性的函数签名如下：**

```ts | pure
function computed<Value = any, Scope = any>(
  getter: AsyncComputedGetter<Value,Scope>,
  depends: ComputedDepends,
  options?: ComputedOptions<Value,Scope>
):ComputedDescriptorBuilder<Value,Scope>;
```

**参数说明：**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `getter` | `AsyncComputedGetter` | 异步计算函数 |
| `depends` | `ComputedDepends` | 声明依赖 |
| `options` | `ComputedOptions` | 异步计算属性相关参数 |


### 异步计算函数

`getter`参数（即异步计算函数）,其返回值将更新到状态中的`computed`声明的路径上，详见[介绍](./computed-getter.md)。

### 指定依赖

- `depends`：依赖收集，用来指定依赖的状态路径。如何指定依赖详见[依赖收集](./computed-deps.md)。
- `options`：异步计算属性的一些选项，详见[选项](./computed-options.md)。

### 配置参数

 
<Divider></Divider>

## 异步计算对象

当在状态中使用`computed`声明异步计算属性后，在执行`createStore`后，会根据声明：

- 创建一个`AsyncComputedObject`实例,保存在`store.computedObjects`中.
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


## 基本用法


```tsx  
/**
* title: 异步计算
* description: 输入框`firstName`和`lastName`的值变化时，`fullName`会延时自动重新计算。
*/
import { delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
import { Input,ColorBlock } from "x-react-components"

const { useAsyncState,useState,state, bind } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed(async (user)=>{
      await delay(1000)       // 模拟异步计算
      return user.firstName+' '+user.lastName  
    },["user.firstName","./lastName"],{ // 指定依赖
      initial:"ZhangFisher"
    }) 
  }
},{
  id:"async-base", 
  debug:true // 打开Redux devtools
})

export default ()=>{ 
  const [firstName] = useState("user.firstName") 
  const [lastName] = useState("user.lastName") 
  const fullName = useAsyncState("user.fullName")  
  return <>
    <Input label="firstName" value={firstName} {...bind('user.firstName')} />
    <Input label="lastName" value={lastName} {...bind('user.lastName')} />
    <ColorBlock name="FullName" loading={fullName.loading}>{fullName.value}</ColorBlock>
    </>
}
```

- 以上`fullName`是一个异步计算属性，手动指定其依赖于`user.firstName`和`./lastName`(相对路径)。
- 依赖可以使用绝对路径或相对路径，使用`.`作为路径分割符，`./`指的是当前对象，`../`指的是父对象,详见[依赖收集](./computed-deps.md)。
- 当在输入框架中修改`firstName`或`lastName`时，`fullName`会自动重新计算。
- 计算属性的结果保存在`state.user.fullName.value`中。
- 当计算属性正在计算时，`state.user.fullName.loading`为`true`。计算完成后，`state.user.fullName.loading`为`false`。
- 关于`...bind('user.firstName')`的用法详见[表单绑定](./form-bind.md)。

<Divider></Divider>


## 加载状态

异步计算属性的加载状态保存在`AsyncComputedValue`对象的`loading`属性中，当`loading`为`true`时，代表异步计算正在进行中。

以下是一个异步计算加载状态的例子：

```tsx  
import { useStore,computed,ObserverScopeRef,getSnap,delay } from '@autostorejs/react';
import { ColorBlock,Button,JsonView } from "x-react-components"
 

export default ()=>{
  const {state,$,useAsyncState } =  useStore({
      firstName:"Zhang",
      lastName:"Fisher",
      fullName: computed(async (user)=>{
        await delay() 
        // 模拟产生错误
        if(user.triggerError) throw new Error("计算FullName时出错")
        return user.firstName+' '+user.lastName  
      },["firstName","lastName"]), 
      triggerError:false
  })

  const fullName = useAsyncState("fullName") 

  return (<div>
    <ColorBlock name="FirstName">{$("firstName")}</ColorBlock>
    <ColorBlock name="FirstName">{$("lastName")}</ColorBlock> 
    <ColorBlock name="FullName" loading={fullName.loading}>
    {
        fullName.loading ? '正在计算...' : (
          fullName.error ? `ERROR:${fullName.error}`: 
            fullName.value
        )
    }
    </ColorBlock>      
    <div>
        <Button onClick={()=>{
          state.triggerError = false
          state.firstName=state.firstName+'🔥'
        }}>Change FirstName</Button>
        <Button onClick={()=>{
          state.triggerError = false
          state.lastName=state.lastName+'❤️'
        }}>Change LastName</Button>
    </div>
    <div>
        <Button onClick={()=>{
          state.firstName=state.firstName+'🔥'
        }}>Change FirstName with Error</Button>
        <Button onClick={()=>{
          state.triggerError = true
          state.lastName=state.lastName+'❤️'
        }}>Change LastName with Error</Button>
    </div>
    <div>
      state.fullName=
      <JsonView>{JSON.stringify(fullName)}</JsonView>
    </div>
  </div>
  )
}
```

- `useAsyncState`用来返回异步计算属性的状态数据。
- 当`fullName.loading`为`true`时，代表异步计算正在进行中。
- 当`fullName.error`不为`null`时，代表异步计算出错。
 
<Divider></Divider> 

## 执行进度

异步计算属性允许控制计算的进度，执行进度保存在`AsyncComputedObject`对象的`progress`属性中，当`progress`为`0-100`时，代表异步计算的进度。开发者可以根据进度值来展示进度条等。

**使用方法如下：**

```tsx  
import {delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
import { JsonView,Button,Input,Loading } from "x-react-components"

 
const { useState,state,$ ,bind,useAsyncState } = createStore({
  order:{
    bookName:"Proficient in AutoStore",
    price:100,
    count:1,
    total: computed(async ([count,price],{getProgressbar})=>{
      const progressbar = getProgressbar()
      return new Promise(async (resolve)=>{
        for(let i=1;i<=100;i++){
          await delay(20)
          progressbar.value(i)
        }
        progressbar.end()
        resolve(count*price)
      }) 
    },
    ["order.count","order.price"],
    {scope:ObserverScopeRef.Depends}) 
  }
}  )

export default ()=>{
  const [ count ] = useState("order.count")
  const total = useAsyncState("order.total")
  return (<div>
    <table className="table table-bordered table-striped">
      <tbody>
        <tr><td><b>书名</b></td><td>{state.order.bookName}</td></tr>
        <tr><td><b>价格</b></td><td>{state.order.price}</td></tr>
        <tr><td><b>数量</b></td>
          <td style={{display:"flex",alignItems:'center'}}>
          <Button onClick={()=>state.order.count--}>-</Button>
          <Input value={count} {...bind("order.count")} />
          <Button  onClick={()=>state.order.count++}>+</Button>
          调节数量
          </td>
        </tr>        
      </tbody>
      <tfoot>
        <tr><td><b>总价</b></td><td>
          {total.loading ? <Loading/> : null }
         {
        total.loading ? `正在计算......${total.progress}%`  
        : (
          total.error ? `ERROR:${total.error}`: total.value
        )}
        </td></tr>
        </tfoot>
      </table>
    
    <div>
      <JsonView>{JSON.stringify(state.order.total)}</JsonView>
    </div>
  </div>)
}
```

- 在计算函数中，可以通过`getProgressbar`函数获取一个进度条对象。
- 进度条对象有两个方法：`value`和`end`，`value`用来设置进度值，`end`用来结束进度条。


<Divider></Divider>

## 超时处理

在创建`computed`时可以指定超时参数(单位为`ms`)，实现**超时处理**和**倒计时**功能。基本过程是这样的。

1. 指定`options.timeout=超时时间`
2. 当异步计算开始时，会启动一个定时器时，并更新`AsyncComputedValue`对象的`timeout`属性。
3. 当超时触发时会触发`TIMEOUT`错误，将错误更新到`AsyncComputedValue.error`属性中。


```tsx  
import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
import { Input, Button,Loading,JsonView,RichLabel } from "x-react-components"
 
 
const { useState,state,$ ,bind,useAsyncState } = createStore({
  order:{
    bookName:"Proficient in AutoStore",
    price:100,
    count:1,
    total: computed(async ([count,price])=>{
        await delay(5000)    // 模拟长时间计算
        return count*price
    },
    ["order.count","order.price"], // 指定依赖
    {
      timeout:1000 ,   // 指定超时时间为1秒
      scope:ObserverScopeRef.Depends
    })
  }
}  )

export default ()=>{
   const [ count ] = useState("order.count")
  const total = useAsyncState("order.total")
  return (<div>
    <table className="table table-bordered table-striped">
      <tbody>
        <tr><td><b>书名</b></td><td>{state.order.bookName}</td></tr>
        <tr><td><b>价格</b></td><td>{state.order.price}</td></tr>
        <tr><td><b>数量</b></td>
          <td style={{display:"flex",alignItems:'center'}}>
          <Button onClick={()=>state.order.count--}>-</Button>
          <Input value={count} {...bind("order.count")} />
          <Button  onClick={()=>state.order.count++}>+</Button>
          调节数量
          </td>
        </tr>        
      </tbody>
      <tfoot>
        <tr><td><b>总价</b></td><td>
          {total.loading ? <Loading/> : null }
         {
        total.loading ? `正在计算......${total.timeout}ms`  
        : (
          total.error ? <RichLabel text={`ERROR: {${total.error}}`} color="red"/> : null
        )}
        </td></tr>
        </tfoot>
      </table>
    
    <div>
      <JsonView>{JSON.stringify(state.order.total)}</JsonView>
    </div>
  </div>)
}
```

<Divider></Divider>

## 倒计时

在`超时`功能中不会自动更新`timeout`属性，可以通过`timeout=[超时时间,间隔更新时长]`来启用倒计时功能。

基本过程如下：

1. 指定`options.timoeut=[超时时间,间隔更新时长]`
2. 当异步计算开始时，会启动一个定时器，更新`AsyncComputedValue`对象的`timeout`属性。
3. 然后每隔`间隔更新时长`就更新一次`AsyncComputedValue.timoeut`
4. 当超时触发时会触发`TIMEOUT`错误，将错误更新到`AsyncComputedValue.error`属性中。


**例如：`options.timoeut=[5*1000,5]`代表超时时间为5秒，每1000ms更新一次`timeout`属性，倒计时`5`次。**



```tsx  
import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
import { Input, Button,Loading,JsonView,RichLabel } from "x-react-components"
 
 
const { useState,state,$ ,bind,useAsyncState } = createStore({
  order:{
    bookName:"Proficient in AutoStore",
    price:100,
    count:1,
    total: computed(async ([count,price])=>{
        await delay(6000)    // 模拟长时间计算
        return count*price
    },
    ["order.count","order.price"], // 指定依赖
    {
      timeout:[5*1000,5] ,   // 指定超时时间为5秒，每秒更新一次
      scope:ObserverScopeRef.Depends
    })
  }
}  )

export default ()=>{
   const [ count ] = useState("order.count")
  const total = useAsyncState("order.total")
  return (<div>
    <table className="table table-bordered table-striped">
      <tbody>
        <tr><td><b>书名</b></td><td>{state.order.bookName}</td></tr>
        <tr><td><b>价格</b></td><td>{state.order.price}</td></tr>
        <tr><td><b>数量</b></td>
          <td style={{display:"flex",alignItems:'center'}}>
          <Button onClick={()=>state.order.count--}>-</Button>
          <Input value={count} {...bind("order.count")} />
          <Button  onClick={()=>state.order.count++}>+</Button>
          调节数量
          </td>
        </tr>        
      </tbody>
      <tfoot>
        <tr><td><b>总价</b></td>
        <td style={{display:"flex",alignItems:'center'}}>
          {total.loading ? <Loading/> : null }
         {
          total.loading ? <RichLabel text={`正在计算......倒计时{${total.timeout}}秒`} color="red"/> 
          : (
            total.error ? <RichLabel text={`ERROR: {${total.error}}`} color="red"/> : null
          )}
        </td></tr>
        </tfoot>
      </table>
    
    <div>
      <JsonView>{JSON.stringify(state.order.total)}</JsonView>
    </div>
  </div>)
}
```


<Divider></Divider>

## 重试

在创建`computed`时可以指定重试参数，实现**出错重试执行**的功能。基本过程是这样的。

- 指定`options.retry=[重试次数,重试间隔ms]`
- 当开始执行异步计算前，会更新`AsyncComputedValue.retry`属性。
- 当执行出错时，会同步更新`AsyncComputedValue.retry`属性为重试次数。


```tsx  
import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
import { Input, Button,Loading,JsonView,RichLabel } from "x-react-components"
 
 
const { useState,state,$ ,bind,useAsyncState } = createStore({
  order:{
    bookName:"Proficient in AutoStore",
    price:100,
    count:1,
    total: computed(async ([count,price])=>{        
        await delay()
        throw new Error("计算出错")
    },
    ["order.count","order.price"], // 指定依赖
    {
       retry:[5,1000] ,// 重试5次，每次间隔1秒
      scope:ObserverScopeRef.Depends
    })
  }
}  )

export default ()=>{
   const [ count ] = useState("order.count")
  const total = useAsyncState("order.total")
  return (<div>
    <table className="table table-bordered table-striped">
      <tbody>
        <tr><td><b>书名</b></td><td>{state.order.bookName}</td></tr>
        <tr><td><b>价格</b></td><td>{state.order.price}</td></tr>
        <tr><td><b>数量</b></td>
          <td style={{display:"flex",alignItems:'center'}}>
          <Button onClick={()=>state.order.count--}>-</Button>
          <Input value={count} {...bind("order.count")} />
          <Button  onClick={()=>state.order.count++}>+</Button>
          调节数量
          </td>
        </tr>        
      </tbody>
      <tfoot>
        <tr><td><b>总价</b></td>
        <td style={{display:"flex",alignItems:'center'}}>
          {total.loading ? <Loading/> : null }
         {
          total.loading ? <RichLabel text={`正在计算......`} color="red"/> 
          : (
            total.error && <RichLabel text={`出错: {${total.error}}`} color="red"/> 
          )}
          {total.retry >0 && <RichLabel text={`重试: {${total.retry}}`} color="red"/> }
        </td></tr>
        </tfoot>
      </table>
    
    <div>
      <JsonView>{JSON.stringify(state.order.total)}</JsonView>
    </div>
  </div>)
}

```

**说明**

- 重试次数为`0`时，不会再次重试。重试次数为`N`时，实际会执行`N+1`次。
- 重试期间`error`会更新为最后一次错误信息。

<Divider></Divider>

## 取消

在创建`computed`时可以传入一个`abortSignal`参数，该参数返回一个`AbortSignal`，用来取消计算操作。

基本操作方法是：

- 在`computed`中传入`abortSignal`参数，该参数是一个`AbortSignal`，可用来订阅`abort`信号或者传递给`fetch`或`axios`等。
- 取消时可以调用`AsyncComputedObject.cancel()`方法来触发一个`AbortSignal`信号。如下例中调用`state.order.total.cancel()`
  
 
```tsx   
import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
import { Input, Button,Loading,JsonView,RichLabel } from "x-react-components"
 
 
const { useState,state,$ ,bind,useAsyncState } = createStore({
  order:{
    bookName:"Proficient in AutoStore",
    price:100,
    count:1,
    total: computed(async ([count,price],{abortSignal})=>{        
        return new Promise<number>((resolve,reject)=>{
					const tmId = setTimeout(()=>{
						resolve(count*price)  // 模拟耗时干活
					},1000 *1000)
					abortSignal.addEventListener("abort",()=>{
            clearTimeout(tmId)
						reject("cancelled")
					})
				})	
    },
    ["order.count","order.price"], // 指定依赖
    {
      scope:ObserverScopeRef.Depends
    })
  }
}  )

export default ()=>{
   const [ count ] = useState("order.count")
  const total = useAsyncState("order.total")
  return (<div>
    <table className="table table-bordered table-striped">
      <tbody>
        <tr><td><b>书名</b></td><td>{state.order.bookName}</td></tr>
        <tr><td><b>价格</b></td><td>{state.order.price}</td></tr>
        <tr><td><b>数量</b></td>
          <td style={{display:"flex",alignItems:'center'}}>
          <Button onClick={()=>state.order.count--}>-</Button>
          <Input value={count} {...bind("order.count")} />
          <Button onClick={()=>state.order.count++}>+</Button>
          调节数量
          </td>
        </tr>        
      </tbody>
      <tfoot>
        <tr><td><b>总价</b></td>
        <td style={{display:"flex",alignItems:'center'}}>
          {total.loading ? <Loading/> : null }
         {
          total.loading ? <RichLabel text={`正在计算......`} color="red"/> 
          : (
            total.error && <RichLabel text={`出错: {${total.error}}`} color="red"/> 
          )}
          { total.loading && <Button onClick={()=>total.cancel()}>取消</Button>}
        </td></tr>
        </tfoot>
      </table>
    
    <div>
      <JsonView>{JSON.stringify(state.order.total)}</JsonView>
    </div>
  </div>)
}

```
**注意**：

- `abortSignal`参数是一个`AbortSignal`对象，可以用来订阅`abort`信号或者传递给`fetch`或`axios`等。
- **需要注意的**，如果想让计算函数是可取消的，则当调用`AsyncComputedObject.cancel()`时，计算函数应该在接收到`abortSignal`信号时，主动结束退出计算函数。如果计算函数没有订阅`abort`信号，调用`AsyncComputedObject.cancel()`是不会生效的。



<Divider></Divider>

## 不可重入

默认情况下，每当依赖发生变化时均会执行异步计算函数，在连续变化时就会重复执行异步计算函数。

在声明时，允许指定`options.noReentry=true`来防止重入，如果重入则只会在控制台显示一个警告。


<Divider></Divider>

## 简写异步计算

一般情况下，异步计算属性均应该使用`computed`进行声明，但是在某些情况下，也可以直接使用一个异步函数。

```ts | pure 
const order = {
    bookName:"ZhangFisher",
    price:100,
    count:3,
    total:async (order)=>{
      return order.price*order.count
    }
} 
```

上述简单的异步声明方式等效于以下方式：

```tsx | pure
import { createStore,computed} from "@autostorejs/react"

const store = createStore({
    bookName:"ZhangFisher",
    price:100,
    count:3,
    total:computed(async (order)=>{
      return order.price*order.count
    },[]) // 依赖是空的
}
 )

export default ()=>{
  const [state] = store.useState()
  return (<div>
    <div>书名:{state.bookName}</div>
    <div>价格:{state.price}</div>
    <div>数量:{state.count}</div>
    <div>总价:{state.total.result}</div>
  </div>)
}
```

当不使用`computed`进行异步计算属性声明时，需要注意以下几点：

- 默认`scope`指向的是`current`，即`total`所在的对象。
- 其依赖是空，所以不会自动收集依赖，也不会自动重新计算。也就是说上例中的`price`和`count`变化时，`total`不会自动重新计算。但是在会在第一次访问时自动计算一次。

:::warning
**特别注意**：由于在不同的构建环境下，比如使用babel转码时，可能会将异步函数转码为同步函数，导致无法识别为异步函数而出现问题。
:::

看看以下例子：

```tsx | pure
import { createStore} from "@autostorejs/react"

const store = createStore({
    bookName:"ZhangFisher",
    price:100,
    count:3,
    total:async (order)=>{
      return order.price*order.count
    }
}   
)

export default ()=>{
  const [state] = store.useState()
  return (<div>
    <div>书名:{state.bookName}</div>
    <div>价格:{state.price}</div>
    <div>数量:{state.count}</div>
    <div>总价:{state.total.result}</div>
    <div>state.total={String(state.total)}</div>
  </div>)
}
```

**为什么不能正常工作，正确计算出`total`的值？**

可以看到上述例子中`state.total`的值是`[object Promise]`。
这是因为在本站使用的构建工具`webpack`使用`babel`进行转码，以上的异步函数被转码为同步函数，类似这样的形式：

```js
total(_x15) {
  return _total.apply(this, arguments);
}
```

这导致`AutoStore`不能将其识别为异步函数，也就不能相应地创建异步`AsyncComputedObject`，而只是将其当作一个普通的同步计算属性。

解决方法是显式指定`computed(async ()=>{...},[...],{async:true})`，这样就可以正确识别为异步函数。

<Divider></Divider>

## 完整例子 

**下面是一个更加完整的例子：**

```tsx 
import { computed,createStore } from "@autostorejs/react"
import { Input,Box, Button,Loading,JsonView,RichLabel } from "x-react-components"
import { api } from "autostore-docs"
 
const {state,bind,$,useState,useAsyncState} = createStore({
  user:{
    repo:"https://api.github.com/users/zhangfisher/repos",
    projects:computed<Project[]>(async ([repoUrl],{abortSignal})=>{
        await new Promise((resolve,reject)=>{
          abortSignal.addEventListener("abort",()=>{
            reject("cancelled")
          })
          api.getProjects(repoUrl).then(projects=>{
            resolve(projects)
          }).catch(e=>{
            reject(e)
          })
        })        
     },
     ["./repo"],
     {
      scope:"depends" 
     })
  }
})

export default ()=>{
  const [ repo ] = useState("user.repo") 
  const projects = useAsyncState("user.projects") 
  return <div>
      <h3>修改仓库地址将触发重新加载该仓库项目列表</h3>
      <Input label="仓库地址：" value={repo} {...bind("user.repo")}/>
      <Button onClick={()=>state.user.projects.run()}>重试</Button> 
      <Button onClick={()=>state.user.repo = "https://api.github.com/users/zhangfisher/repos"}>恢复</Button>    
      <Box>
        <table className="projects-list">
            <thead><tr><td colSpan="3">以下是我的开源项目，感谢支持！</td></tr>
            <tr><td><b>项目名称</b></td><td><b>说明</b></td><td><b>星</b></td></tr></thead>                    
            <tbody>
            {
                projects.loading ? 
                (<tr><td colSpan={3}>正在加载...:</td></tr>)
                :
                (
                    projects.error? (<tr><td colSpan={2}>加载错误:{projects.error}</td></tr>)
                    : (
                      projects.value && projects.value.map((project,index)=>{
                            return <tr key={index}>
                              <td><a href={project.url} target="__blank">{project.name}</a></td>
                              <td>{project.description}</td>
                              <td>{project.stars}</td>
                              </tr>
                        })
                    )
                )
            }
            </tbody>
        </table>
      </Box>
  </div>

}

```

**说明**

- 使用`computed`函数声明异步计算属性，`computed`参数：
  - 第一个参数是一个异步函数，或者返回值是一个`Promise`对象,可以在此函数中编写业务逻辑，在本例中从`github`加载项目列表。
  - 第二个参数是一个字符串数组，用来指定依赖的状态路径。可以指定多个依赖路径。
  - 第三个参数是一个`ComputedOptions`对象，用来指定计算属性的一些选项。

:::info
**重点：经过`createStore`处理后，`state.user.projects`转换为一个`AsyncComputedObject`对象，通过该对象可以读取到异步计算的进度以及结果等信息。**
:::

**在上例中`state.user.projects`值为**

```js
  {
    "loading":false,  // 是否正在计算
    "timeout":0,
    "retry":0,
    "error":null,
    "progress":0,
    "result":/**此处就是异步计算函数的返回值**/
  }
```



## 注意事项

- **当异步计算函数返回一个`Promise`时的问题**

`computed`内部使用`isAsync`来判断传入的`getter`函数是否是一个异步函数，以采取不同的处理逻辑。
但是在某些情况下，这个判断可能不正确。
比如在进行`babel`将代码转译到`es5`等低版本代码时，异步函数可能会被转译为同步函数，此时需要也显式指定`options.async=true`。

```ts | pure {7}
const store = createStore({
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed(async (user)=>{
      return user.firstName+user.lastName
    },["user.firstName","user.lastName"],{
      async:true
    })
  })
```

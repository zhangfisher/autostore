# 全局监视

使用`store.watch`方法用于全局监视`State`中的数据变化，当所监视的数据发生变化时，可以执行侦听器函数。

## 监听方法

`watch`方法的签名如下：

```ts
// 监听全部
watch(listener:WatchListener,options?:WatchListenerOptions):Watcher
// 只监听指定路径
watch(paths:'*' | string | (string|string[])[],
    listener:WatchListener,options?:WatchListenerOptions
):Watcher
```

返回`Watcher`类型，用于取消监听。

```ts
type Watcher = { off:()=>void }
```


### 监听函数

`WatchListener`是一个函数，用来处理监视到的数据变化，其签名如下：

```ts
type WatchListener<Value=any,Parent=any> = 
        (operate:StateOperate<Value,Parent>)=>void

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
- `batch`适于批量操作,当使用`batchUpdate`会触发此类型的操作事件，详见[批量操作](../store/state)
- `reply`参数用于标识该操作是否是在批量更新时的事件回放。


:::warning 注意
监听函数只能是一个同步函数
:::

### 监听选项

```ts  
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

```tsx
store.watch((operate)=>{
    ....
},{
  operates:'write'
})
```

## 全局监听

使用`watch(listener,options?)`方法用来全局监听`State`中的数据变化，对状态的任何操作均会执行监听函数。

<demo react="watch/watchAll.tsx"/>


- 通过`watch`方法监听所有的数据变化，当数据发生变化时，会执行监听函数。
- `watch.options`支持指定要监听的哪些操作类型，比如`watch(listener,{operates:['set','delete']})`。


## 局部监听

除了全局监听外，还可以使用`watch(paths,listener,options?)`方法用来**只监听指定路径的状态数据变化**。

<demo react="watch/watchByPath.tsx"/>
 
- 可以一次监听多个路径，比如`watch(['order.price','order.count'],listener)`。
- 甚至可以监听路径中包含通配符，比如`watch('order.*'],listener)`。

## 数组监听

`watch`也可以支持数组的监听，比如`watch('order.books',listener)`，当`order.books`数组发生变化时，会执行监听函数。

区别于普通对的是监听事件#️⃣

- 数组的监听事件有`insert`,`update`,`remove`三种。
- 对数组成员的操作参数会多一个`indexs`属性，用来标识数组的索引。
- `get`操作事件也适用于数组


<demo react="watch/watchArray.tsx"/>
 
## 依赖收集

`AutoStore`的依赖收集功能就是基于`watch`功能实现。

以下是同步计算属性在初始化时的依赖收集的代码：

```ts
function collectDependencies(){
      let dependencies:string[][] = []       
      // 1. 侦听所有的get操作
      const watcher = this.store.watch((event)=>{      
          // 将依赖路径保存起来
          dependencies.push(event.path)            
      },{operates:['get']})   
      // 2. 运行一次同步计算的getter函数
      this.run({first:true})   
      // 3. 依赖收集完成后就结束监听
      watcher.off() 
      // .......
      return dependencies
}  
```

:::info
`store.watch`方法用于全局监视`State`中的数据变化，计算属性的实现也是基于`watch`方法。
:::


## 增量同步

当指定同步参数`immediate`为`true`时，会立即执行一次同步计算，然后执行监听函数。

如果`immediate`为`false`，则进行增量同步，仅在状态发生变化时进行同步。

:::warning 注意
增量同步时，有可能因为`AutoStore`结构不一致导致同步失败，所以增量同步时，需要尽可能保证`AutoStore`结构一致。
:::

## 通配符

`store.watch`支持通配符，比如`watch('order.*',listener)`，当`order`对象中的任意属性发生变化时，都会执行监听函数。

| 通配符 | 说明 |
| :----: | :----: |
| `*` | 匹配任意字符 |
| `**` | 用在路径的最后面，代表后续所有字符 |


```ts

// 匹配order对象中的任意属性
store.watch('order.*',listener)
// order.a   ✅
// order.b   ✅
// order.a.b ❌  
// order.a.b.c  ❌  

// 匹配order对象中的任意属性
store.watch('order.**',listener)
// order.a   ✅
// order.b   ✅
// order.a.b ✅ 
// order.a.b.c  ✅ 
```




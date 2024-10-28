# useWatch

`useWatch`函数用来侦听`store`对象的变化,当组件销毁自动取消订阅，本质上是对`store.watch`的封装。

`useWatch`函数签名如下：

```ts | pure
export interface UseWatchType {
    <Value>(selector: string,listener:WatchListener<Value>,options?:WatchListenerOptions): void
    <Value>(selector: string[],listener:WatchListener<Value>,options?:WatchListenerOptions): void  
}
```

使用方法与`store.watch`一致，只是`useWatch`函数会在组件销毁时自动取消订阅。

实质上`useWatch`函数是对`store.watch`的封装，其内部实现如下：

```ts | pure
()=>{        
      const deps = arguments[0]
      const listener = arguments[1]
      const options = arguments[2] as WatchListenerOptions
      useEffect(() => { 
          const watcher = store.watch(deps,listener,options)
          return ()=>watcher.off()
      },[])        
  } 
```




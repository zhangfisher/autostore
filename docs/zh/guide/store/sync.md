# 同步

`AutoStore`内置同步机制，可以方便的实现两个`AutoStore`之间的数据同步。

## 使用方法

```ts
const store1 = new AutoStore({
    order:{
        name:"fisher",
        price:2,
        count:3,
        total: computed((order)=>order.price*order.count)
    }            
})
const store2 = new AutoStore<typeof store1.state.order>()



```


<demo react="store/syncStore.tsx"/>
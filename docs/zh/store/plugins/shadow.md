# shadow

基于现有的`AutoStore`实例创建一个`Shadow AutoStore`实例，该`Shadow AutoStore`实例的所有`computed`和`watch`是基于原`AutoStore`实例进行计算。

```ts
const store = new AutoStore({
    order: {
        price: 10,
        count: 3,
        total: computed((scope: any) => scope.price * scope.count),
    },
});
const shadowStore = store.shadow({
    user: 'fisher',
    orderTotal: computed((scope: any) => {
        return scope.order.price * scope.order.count;
    }),
});
expect(shadowStore.state.orderTotal).toBe(30);
store.state.order.count = 4;
expect(shadowStore.state.orderTotal).toBe(40);
```

-   上例中创建了一个`shadowStore`，该`shadowStore`的`orderTotal`是基于`store.state`计算出来的，所以当`order.count`改变时，`orderTotal`也会改
    变。
-   创建的`shadowStore`实例也是一个普通的`AutoStore`实例，所以可以像使用普通`AutoStore`一样使用它。区别就在`computed`和`watch`是基于原`AutoStore`实例进行计算。

# 计算对象

## 关于

当使用`computed`创建好计算属性后，我们可以通过`store.computedObjects`来管理`store`内的所有计算属性，包括同步计算对象和异步计算对象。

通过`store.computedObjects`可以访问到所有的计算对象，`store.computedObjects`是一个`Map`对象。
 
<demo react="computed/computedObject.tsx" />

**说明**:

- 以上创建了一`fullName`和`fullName2`两个计算属性
- `store.computedObjects`是一个`Map`对象,可以通过`store.computedObjects.get("user.fullName")`来获取`fullName`的计算对象，该对象是一个`ComputedObject`实例。
- `ComputedObject`实例有一个`run`方法，可以手动执行计算函数。
- 对于异步计算即可以通过`store.computedObjects.get("user.fullName2").run()`来手动执行计算函数，也可以通过`store.state.user.fullName2.run()`手动执行计算函数。
- 而同步计算只能通过`store.computedObjects.get("user.fullName").run()`来手动执行计算函数。
- `ComputedObject`实例有一个`value`属性，可以获取计算函数的返回值。
- `ComputedObject`是一个类，查看API文档可以了解更多信息。
- 默认情况下，使用声明`computed`时所在的状态数据路径作为`ComputedObject`的`id`，也可以通过`options.id`参数来指定`id`，如上例中的`fullName3`的`id=='myname'`。
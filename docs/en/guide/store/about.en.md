# about
use `AutoStore` the starting style is to create one `AutoStore` object,`AutoStore` class is `AutoStore` the core object, all functions are based on `AutoStore` objects to achieve.

Use `AutoStore` we used to be simple before `AutoStore` basic principles and workflow.

## **Object structure** 

 `AutoStore` the basic working principle of the object is as follows:

 ![](./store.drawio.png) 

 `AutoStore` the core component of the object consists of the following parts:

- `state`: Status data `Proxy` acting objects, responsible for intercepting the read and writing operation of status data.
- `computedObjects`: The collection of the calculation attribute object is used to store all the calculation attribute objects.
- `watchObjects`: The collection of monitoring objects is used to store all monitoring objects.
- `operates`: Status Reading Event Trigger, which is equivalent to one internal `Event bus` used to subscribe to and publish changes in status data. when `a.b.c` when the value of the read and write operation is performed, it will trigger `operates.emit('a.b.c')` incidents, notify all subscribers. So we can pass `operates.on('a.b.c')` to subscribe to `a.b.c` reading and writing changes.

## **Work process** 

### **Preparation stage** 

1. Be created `AutoStore` when object, create one `Proxy` object, for proxy status data.
2. Create a name at the same time `operates` of `EventEmitter` it is an event distribution device, just like it `mitt`,`eventemitter2`.
3. When recursively traversing the state data, different objects will be created according to the data type (support settings `lazy=true`, Create only when reading):
    - 如果是 `{}` or `Array` will create one `Proxy` object, used to represent `{}` or `Array` the attributes and methods can realize the state data that supports arbitrary nested.
    - 如果是 `Calculation function` will create one `ComputedObject` object, at the same time `ComputedObject` the object will be saved `store.computedObjects` middle.
    - 如果是 `Monitoring function` will create one `WatchObject` save the object instance `store.watchObjects` middle.
4. Be created `ComputedObject` when an object instance, the initial value and collection dependencies will be calculated based on synchronization or asynchronous ways.
    - 如果是同步计算函数,则会执行一次来自动收集依赖.
    - 如果是异步计算函数,则需要手动指定依赖.
Then, call according to the target path of dependence `store.operates.on ('Dependent path')` to subscribe to change events


:: info
 `Calculation function` equal to `Vue` of `computed` when it depends on the changes in the data it depends, it is generally determined. and `Monitoring function` equal to `Vue` of `watch` used to monitor the changes in status data, you can monitor the dependence changes of the dynamic range.
:::


### **Update stage** 

Next, when the status data changes, the follow -up process is as follows:

1. when `store.state.count=100` when the state value is updated, the operation will be `Proxy` object `set` method to intercept, calculate the path of the updated state value `['count']`,
2. Then `store.operates` trigger `Emit ('<State Paths>', <ouperateParams>)` methods, notify all subscribers.
3. Corresponding `ComputedObject` after receiving the notice, the subscriber will execute `Calculation function getter`,
4. The final `Calculation function getter` the execution result is saved `store.state` on the original path.


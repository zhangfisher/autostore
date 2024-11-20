## about

according to `AutoStore` of [Basic principle](../store/about), It has a built -in state change event system for monitoring `State` the changes in the data in the state will trigger the corresponding event when the state data changes.
You can use it through listening events `watch` to monitor `State` data changes can execute the listener function when the monitored data occurs.

Provide three uses `watch` how to:

- Call `store.watch` function, used to listen to `State` data change.
- Directly `State` statement `watch` function, and then write the return value of the listener to the statement `watch` the position where the function is located.
- Called in the component `store.useWatch` function, used to listen to `store` the change of the object is automatically canceled when the component is destroyed.

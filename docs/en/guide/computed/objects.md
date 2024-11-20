# Calculation object
## about

Use `computed` after creating the calculation attribute, we can pass `store.computedObjects` to manage `store` all the computing properties, including synchronous calculation objects and asynchronous calculation objects.

pass `store.computedObjects` you can access all the calculation objects,`store.computedObjects` one `Map` object.
 
<demo react ="computed/computedObject.tsx"/>

 **illustrate** besides

- The above created one `fullName` and `fullName2` two calculation attributes
- `store.computedObjects` one `Map` object, you can pass `store.computedObjects.get("user.fullName")` to get `fullName` calculating object, the object is one `ComputedObject` example.
- `ComputedObject` there is one instance `run` methods can manually execute the calculation function.
- It can be passed for asynchronous calculations `store.computedObjects.get("user.fullName2").run()` come manually executing the calculation function, you can also pass `store.state.user.fullName2.run()` manually execute the calculation function.
- The synchronous calculation can only pass `store.computedObjects.get("user.fullName").run()` let's manually execute the calculation function.
- `ComputedObject` there is one instance `value` attributes, you can get the return value of the calculation function.
- `ComputedObject` it is a class that checks more information for the API documentation.
- By default, use a statement `computed` the state data path is used as the time `ComputedObject` of `id` you can also pass `options.id` parameter to specify `id` as in the above example `fullName3` of `id=='myname'`.
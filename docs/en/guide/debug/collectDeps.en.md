# Dependence
 `AutoStore` one `collectDependencies` the API is used to collect the dependence of the current state. Through this API, you can easily view the dependency of the current state to help developers better understand the relationship between state.
 
```ts
const deps = store.collectDependencies(()=>{
    state.a=1
    state.b=1
    state.c
})     
```

 **The actual operation effect is as follows:** 

<demo react ="debug/collectDeps.tsx"/>

- The API can only collect the dependence of synchronous operations.
- The default is inside the function `all` the operation is dependent. We are right in the above example `a`,`b` performed `write` operation, read `c`,so `a`,`b`,`c` all will be collected in dependence.
- pass `options` can be configured for only collection `read` operation, or only collect `write` operate.

```ts
const deps = store.collectDependencies(()=>{
    state.a=1
    state.b=1
    state.c
},{operates:"read"})     
```

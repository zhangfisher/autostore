# computed function
Use `computed(<getter>,[depends],<options>)` when creating the calculation attribute, whether it is synchronous calculation attribute or asynchronous computing attribute, you need to specify a `Getter` function, calculating logic for calculating attributes,**The return value of this function is the value of the calculation attribute**.

Synchronous calculation attributes and asynchronous calculations `Getter` the function signature is not the same, as follows:

## Function signature

- **The signature of the Getter function of the synchronous calculation attribute is as follows:** 

```ts
type ComputedGetter<Value = any, Scope = any> = (scope:Scope)=>Value
```

- **The Getter function signature of the asynchronous calculation attribute is as follows:** 

```ts
type AsyncComputedGetter<Value,Scope=any,P extends Dict = Dict> = (
    scope:Scope,
    args:Required<AsyncComputedGetterArgs> & P) => Promise<Value>
```

## Execute the calculation function

### Automatic execution

When the dependence of the calculation attribute changes,`AutoStore` the calculation function will be automatically executed `Getter`.

### Manually execute

Under normal circumstances, the computing function is not required, but in some special cases, the calculation function may be required manually. At this time, you can pass `computedObjects.get('<id>').run()` methods to manually execute the calculation function.

<demo react ="computed/runGetter.tsx"/>


:: info
More about `computedObjects` and manual execution, please refer to [computed object](./objects) chapter.
:::
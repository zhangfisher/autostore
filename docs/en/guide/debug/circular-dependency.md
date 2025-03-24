# Circular Dependency

In complex states, circular dependencies can sometimes occur unintentionally, which is a common issue in reactive state management.
`AutoStore` provides `circular dependency detection` and `debug tracking capabilities` to help developers discover and resolve circular dependency issues.

## Synchronous Circular Dependency Detection

When building an `AutoStore` with circular dependencies, an exception will be thrown, allowing developers to quickly locate the issue through the exception message.

The following example contains a circular dependency, and an exception will be thrown when building the `store`.

<demo react="debug/syncCycleDetect.tsx" /> 

## Asynchronous Circular Dependency Detection

Asynchronous circular dependencies are more complicated and cannot be automatically detected during construction like synchronous ones. This is because asynchronous computed properties have asynchronous computation functions, which can easily form complex circular call chains during multiple asynchronous calculations.

`AutoStore` provides the `cycleDetect` extension to help detect circular dependencies in asynchronous computed properties. However, since circular dependency detection incurs some overhead,
this functionality is provided as an extension that needs to be manually installed.
 
### Enable Detection

```ts
 import { installCycleDetectExtend }  from '@autostorejs/devtools'
 
installCycleDetectExtend({
  onDetected:(paths)=>{
    console.error("Circular dependency detected:",paths)
    return 'disable'
  }  
})

```

### Example

Due to the circular dependency between `a` and `b`, their calculations will be ignored internally, resulting in uncalculatable values for `a` and `b`.

<demo react="debug/cycleDetect.tsx" />

- In the console, you can find the message `Circular dependency detected: a->b->a.loading->a.timeout->a.retry->a.error->a.value->a.progress->b.loading->b.timeout->b.retry->b.error->b.value->b.progress->x`, which shows the path of the circular dependency.
- The `onDetected` callback function returning `disable` means that when a circular dependency is detected, the computed property will be disabled to avoid issues caused by the circular dependency.

### Basic Principles

Asynchronous circular dependency detection is complex, especially in asynchronous computed properties where complex circular call chains can easily form.

The basic principles of circular dependency detection are as follows:

- After installing the `cycleDetect` extension, the `run` function of each asynchronous computed property is wrapped.
- When a computed property runs for the first time, `store.watch` is executed to record all `get` read operation events. If there's a circular dependency, the computed property's `run` function will execute, allowing collection of numerous `get` events.
- When the specified `maxOperates` number of `get` events is detected, analysis begins to find circular dependency paths in the event list.
- Then the `onDetected` callback function is executed, letting developers decide how to handle it:
  - `return 'disable'`: Disables the computed property.
  - `return 'ignore'`: Ignores the circular dependency.
  - Other returns will trigger an error.

### Configuration Parameters

`installCycleDetectExtend` has the following configuration parameters:

| Parameter | Type | Default | Description |
| ----------- | -------- | ------ | --------------- |
| `maxOperates` | `number` | `200` | Maximum number of operations. Analysis begins after collecting this many operation events from the start of computation. |
| `onDetected` | `(paths:string)=>'disable' \| 'ignore' \| void` | - | Callback function when a circular dependency is detected. Returning `disable` disables the computed property, `ignore` ignores it, other returns trigger an error. |

# Rendering optimization
## introduction


 `@autostorejs/react` it is a `Proxy` the response state system provides `useReactive` and `signal` mechanisms to achieve thinner granular rendering.

How can we optimize the following `React` rendering, a few examples.

## **Context** 

Let's look at a traditional one first `Context` example of rendering.

<demo react ="store/useContextRender.tsx"/>

From the above example, you can see that when updating `Context.age` at the same time, all subclasses are used whether `Age` all will be rendered again, and this is unnecessary, because the sub -module is not used `Context` for this, we generally need to use it `React.memo` or some third -party libraries to optimize rendering.

:::warning reminder
 **The biggest problem is to update the root root`Context`At the same time, all subclasses will be re -rendered, which is unnecessary, because the sub -module does not use the root`Context`Data. We hope to achieve a finer granular rendering, and only when the data used by the sub -component changes can it be re -rendered.** 
:::

## useReactive

In order to optimize the logic of rendering, we generally use it `React.memo` optimize rendering.

<demo react ="store/useReactiveMemo.tsx"/>

- In the above example, update `Age` at that time, the root component alone will be re -rendered, and `FirstName` and `LastName` will not renders again, because they are not used `Age`.
- Update in the root component `FirstName` at that time, only `FirstName` will rendered. and `LastName` no in the component `FirstName`, So it will not renewable.

:::warning reminder
 **In large`React`In the face of complex state changes, how to decide when to use`React.memo`It is a big mental problem and the easiest to engage in the pit. Why is this?`React`Officially to push`Compiler`Reason** 

:::

## Signal component

The better way is to be more popular recently `signal` mechanism,`signal` the mechanism can **Rendering particle size is limited in the component range** only the component of the data can be rendered again.

based on `Signal`,**Rendering particles can be a fragment or reactnode in the component**, More fine and more efficient.

Learn more about about `Signal` content, you can read [In -depth analysis: signal components in React and fine particle size update](https://juejin.cn/post/7425580383013027850) 

<demo react ="store/useSignalRender.tsx"/>

- In the above example, a finer granularity update is provided. When the state changes, only `$(....)` internal rendering will be re -rendered, and other parts will not be re -rendered. Never need `React.memo` it's right.
- - 关于 `Signal` for more uses, you can refer to [Signal component](/guide/signal/about) ::: info prompt
Poly block components used in this document demonstration `ColorBlock` the number of components will be displayed on the far right. Each rendering is +1 to facilitate the rendering update of the component.
:::

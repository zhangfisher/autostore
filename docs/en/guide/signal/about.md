# About ✨
## What is a signal?


In the mainstream front -end development framework, whether it is `React`,`Vue` still `Svelte` the core is all around `UI` rendering.

In order to achieve high performance, the premise is always slower based on DOM. There are two cores to solve the problem:

- **Response update** 
- **Fine granularity update** 

In order to `Response update`,`Fine granularity update` to the extreme, the various frameworks are eight immortals cross the sea, each showing magical powers. The most popular `React` and `Vue` for example,

- First of all, both are introduced `Virtual DOM` the concept.
- `Vue` the static template compilation, through the static analysis of the compilation, optimizes `Fine granularity update` logic, as much as possible during the compilation stage, analyzes the DOM of the rendering.
- and `React` use `JSX` dynamic grammar is essentially a function that is difficult to perform static analysis, so `React` I can only find a way at runtime.
  - 因此 `React` there is `Fiber` concept, pass `Fiber` the scheduling to achieve optimization rendering logic, but `Fiber` the scheduling logic is very complicated, and the official has tossed this thing for a year.
  - 然后就是一堆的 `React.memo` optimized means, but when the application is complicated, there is also **A greater mental burden**.
  - 因此,官方又搞了个 `React Compiler`, Through the static analysis of the compilation, automatically add `React.memo` logic, but this stuff has been two years since it was proposed, and it is still in the experimental stage. It is estimated that it is not very good.

because `Virtual DOM` the characteristic, whether it is `React` still `Vue`, Essentially in `Virtual DOM` go on `diff` algorithm, then do it again `patch` operation, the difference is `diff` the implementation of the algorithm is different.

 **But no matter how it is reorganized, in`Virtual DOM`of`diff`Under the blessing of the algorithm,`Changes in state`It is always difficult to accurately with`DOM`Corresponding matching.** 

Popular speaking, it is `state.xxx` during the update, do not find it directly `state.xxx` of `DOM` precise update, but passing `Virtual DOM` of `diff` the algorithm is calculated to calculate the need to be updated `DOM` element, then do it again `patch` operate.

The problem is, this `diff` the algorithm is more complicated, and it needs to be optimized everywhere.`React` in the application `React.memo` use, or in `Vue` template optimization and so on.

:::warning Note
- Q:**Why is it used in large applications`React.memo`Is it a mental burden?** 
- A: Actually `React.memo` the logic itself is simple, both veterans or small white can be easily mastered. However, in large applications, on the one hand, the nested level of components is very deep, and the dependency relationship between components is very complicated. On the other hand, the number of components is thousands of. If you all use `React.memo` to optimize rendering, it is a great mental burden. If later optimization is used, the problem is more serious, and some performance analysis tools are often used to optimize. Simply put, when the application is complicated,`React.memo` only to become a burden.
:::


So the core problem of the framework is **Be able to`Changes in state`Quickly find that depend on this state`DOM`Re -rendering** the so -called `Fine granularity update`.


That for the sorted `Virtual DOM` of `diff` the algorithm has problems in solving fine particle size updates, so can it not be carried out `diff` algorithm, find it directly `state.xxx` corresponding `DOM` what about update?

The method is there, that is, the most popular front end `signal` the concept.

In fact `signal` the concept has been available very early, but it comes out `Svelte` frameworks like it, it does not use it `Virtual DOM`,unnecessary `diff` the algorithm is introduced `signal` concept, can be in **When the signal trigger is only updated, the real fine particle size update** and the performance is also very good.

Let's get it all at once `React` and `Vue` such as `Virtual DOM` players were covered, for a while `signal` become a new favorite of front -end development.
All front -end frameworks are `signal` closer to each other `Svelte` and `solidjs` become `signal` the representative of the genre, even `Vue` can't be free,`Vue Vapor` that is `Vue` of `signal` realization (not yet released).


 **So what is a signal?** 

Quote Teacher Card Song `signal` an article [Signal: More front -end framework options](https://juejin.cn/post/7203266679602151482?searchId=20240927133705309C92B350C93291DBBA).

Teacher Katong said `The essence of Signal is to separate the reference to the state and the acquisition of the state value.` 

The great god is the great god, just say in a word `signal` the essence of the essence is clear. But I also told me and ordinary people. This concept is too high and abstract, and it is really a great god.

Below we are based on the thinking of mortals `signal`, Build a set `signal` the basic process principle of the mechanism is as follows:

- **Step 1: Let status data be observed** 

Make status data into `Response` or `Observation` the method is to use `Proxy` or `Object.defineProperty` methods, turn status data into one `Observation` objects, not an ordinary data object.

 `Observation` the role of the object is **Intercept the access to the state** when the status changes in reading and writing, you can collect dependencies.

There are many ways to observe data observation, such as `mobx` not using it `Proxy` instead `Class` of `get` realization of attributes. You can even use your own set `API` to achieve. It's just commonly used now `Proxy` accomplish. The core principle is **Intercept the access to the state, so as to collect dependencies**.

:::warning Note
The purpose of allowing status data to observe is to perceive the changes in status data so that the next response can be performed. The thinner the granularity of perception, the more it can achieve fine particle size updates.
:::

- **Step 2: Signal release/subscription** 

Because it can pass **Intercept the access to the state** therefore, we can know when to read and write status, so we can post one when reading and writing `Signal`, Inform the subscriber, the status has changed.

Therefore, we need one `Signal release/subscription` the mechanism, what signal has changed, and who subscribed to this signal.

You can use similar `mitt`,`EventEmitter` library to build `Signal release/subscription` you can also write one by yourself.
 
 `Signal release/subscription` the core is actually a subscription table, which records who subscribes to what signal, which DOM rendering function at the front end, which signal (state change).

:::warning reminder
The purpose of establishing a release/subscription mechanism is to establish `Rendering function` and `Status data` the mapping relationship between meters, when the state data changes, query the data that depends on the status data based on this `Rendering function`, Then execute these `Rendering function`, So as to achieve `Fine granularity update`.
:::


- **Step 3: Rendering function** 

Next we write `DOM` the rendering function is as follows:

```js
  function render() {
      element.textContent = countSignal.value.toString();
  }
```

In this rendering function:

- We update directly `DOM` element, there is no any `diff` there is no algorithm `Virtual DOM`.
- Function uses access status data `count` come to update `DOM` element, because the state is **Observed** so as executed `countSignal.value` at that time, we can intercept the right `count` the interview, that is to say, we have collected it `DOM` element depends on `count` status data.
- With this `DOM Render` and `Status data` with the dependence, we can be in `signal` register this dependencies in the signal release/subscription mechanism.
 
:: info
The role of collecting dependencies is to establish the relationship between the rendering function and the state.
:::

- **Step 4: Registration rendering function** 

In the end we will `render` function registration `signal` in the list of subscribers, when `count` when the status data changes, we can notify `render` function, so as to update `DOM` element.

 
## Simple example

The following is a simple one `signal` example, we create one `signal` object `countSignal` and create one `DOM` element `countElement`,when `countSignal` when changing, we update `countElement` of `textContent`.

:::code-group

```js
        class Signal<T> {
          private _value: T;
          private _subscribers: Array<(value: T) => void> = [];
          constructor(initialValue: T) {
              this._value = initialValue;
          }
          get value(): T {
              return this._value;
          }
          set value(newValue: T) {
              if (this._value !== newValue) {
                  this._value = newValue;
                  this.notifySubscribers();
              }
          }
          subscribe(callback: (value: T) => void): () => void {
              this._subscribers.push(callback);
              return () => {
                  this._subscribers = this._subscribers.filter(subscriber => subscriber !== callback);
              };
          }

          private notifySubscribers() {
              this._subscribers.forEach(callback => callback(this._value));
          }
      }

      const countSignal = new Signal<number>(0);
      const countElement = document.getElementById('count')!;
      const incrementButton = document.getElementById('increment')!;

      function render() {
          countElement.textContent = countSignal.value.toString();
      }
      function increment() {
          countSignal.value += 1;
      }
      countSignal.subscribe(render);
      incrementButton.addEventListener('click', increment);
      render(); 
```

```html
<h1>计数器: <span id="count">0</span></h1>
<button id="increment">增加</button>
```
:::


## Signal component

 **So how do we be in`React`Use`signal`Woolen cloth?** 

We can know from above,`signal` the driver's front -end framework is completely unnecessary `Virtual DOM` of.

Essentially `React` not one `Signal` framework, its rendering scheduling is based on `Virtual DOM`,`fiber` and `diff` algorithm.

therefore,`React` not support `signal` the concept, except for the future `React` picture `Vue` upgrade `Vue Vapor mode` make a major upgrade, abandon `Virtual DOM` otherwise `React` can't really use it in the middle `solidjs` and `Svelte` of `signal` concept.

Whether `Virtual DOM` still `signal` the core is to solve `Fine granularity update` the problem, thereby improving the rendering performance.

Therefore, we can combine `React` of `React.memo` and `useMemo` wuling to simulate `signal` concept, implementation `Fine granularity update`.

So we have **Signal component** the concept, which is essentially used `React.memo` wrapped `ReactNode` components, the rendering update is limited to a thinner range.


 ![](./images/signal.drawio.png) 

- The core is a set of dependence collection and event distribution mechanisms to perceive the state change, and then changes through the event distribution.
- The signal component is essentially a React component, but it is used `React.memo(()=>{.....},()=>true)` packaged,`diff` always return `true` used to isolate `DOM` the scope of rendering.
- Then the state of the state will be subscribed to the state of the state, and the component will be re -redeemed when the state changes.
- because `diff` always return `true` therefore, re -rendering is restricted within the component, and it will not cause a chain reaction, which will achieve it.`Fine granularity update`.


The following is `AutoStore` medium `signal` A simple example:


<demo react ="signals/signalBase.tsx"/>

- In the previous example, should be updated `Age` at the time, rendering is restricted in `Signal component` inside, there will be no chain reaction.


:::warning Note
- Signal component is just analog `signal` achieve `Fine granularity update`, It is essentially used `React.memo` wrapped `ReactNode` components.
- create `$` when creating a signal component,`$` yes `signal` the fast name. So above `{$('age')}` equivalent `{signal("age")}`.
- - 更多的 `Signal component` for usage, please refer to [signal](../signal/component).
:::


## summary

because `React` the heavy historical burden, in the foreseeable future,`React` should not support the true sense `signal`.

Teacher Katsong`of [Signal: More front -end framework options](https://juejin.cn/post/7203266679602151482?searchId=20240927133705309C92B350C93291DBBA) mentile also mentioned,

 **The REACT team member's point of view is:** 

- May be introduced to similar `Signal` primitive
- `Signal` the performance is really good, but it is not very consistent `React` concept


and `AutoStore` support `Signal component` the concept can be regarded as simulation `signal` or similar `Signal` the original words so that we can be in `React` realization `Fine granularity update`, Don't have to tangled anymore `React.memo` use.


:: info
since `React 19` start,`React` official launch `Compiler`, Help users solve `React.memo` the problem to reduce the user's mental burden. But it is not for the problem of decideral granularity updates, but to optimize and improve `React` performance.
I am right `Compiler` the use of use is not very optimistic, it has to be studied further.
:::

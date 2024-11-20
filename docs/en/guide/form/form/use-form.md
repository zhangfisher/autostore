# useform
Let's briefly introduce `useForm`.
 `useForm` can be used to create `AutoStore` form `AutoFormObject` and implement the form and the form and `AutoStore` the two -way binding function between the state.

## Basic principle

 `useForm` the basic principles are as follows:

### 1. Create `Form` component

 `useForm` will create one `AutoStore` example, then return one `Form` component, this component is a counterfeit standard `form` packaging.

### 2. Initialize the form

 `useForm` internal `useEffect` it will automatically initialize the form.

Then when initialization, call `querySelectorAll` get all inside all forms `input`,`textarea`,`select` element
, Traverse these elements in turn, according to `name` attribute, from `state` get the corresponding value and set it to the table unit element.


### 3. Subscribe to change event

To achieve two -way binding, we need:

- **Monitoring table unit`change`event** 

Due to form events `onchange` will bubbling, so we only need to `form` element monitoring `change` in the event.

So through `form.addEventListener('input',onChange)` you can trigger the capture when the table elements change `onChange` event.

Then `onChange` in the event, we can pass `event.target` get the form element.

Finally, update the value of the table element to `state[event.target.name]`.

- **monitor`state`Change** 

use `store.watch` monitor `state` change, should `state` when changing, update the data to `name=<path>` just on the table element.


:::warning Note
The above is just `useForm` the basic principles, there are many details that have not been fully described in the actual implementation.
:::
 
## Function signature

 `useForm` the signatures of the two functions are supported as follows:

```tsx
function useForm<State extends Dict>(
    state:State,
    options?:UseFormOptions<State>
): AutoFormObject<State>
function useForm<State extends Dict>(
    store:ReactAutoStore<any> | AutoStore<any>,
    options?:UseFormOptions<State>
):AutoFormObject<State>

```

 `useForm` support two signs:

- `useForm(state,options)`:pass `state` create a `AutoStore` example, and then create a `AutoFormObject` example.
- `useForm(store,options)`: Pass the existing `AutoStore` create a `AutoFormObject` example.## Option

 `useForm` of `options` support the following options:

because `useForm` create one inside `AutoStore` example, so `UseFormOptions` inherit `AutoStoreOptions`, Used to create `AutoStore` essence refer to [AutostoreOptions](/guide/store/store#配置).

besides,`UseFormOptions` it also supports the following options:

### reF

Used to attract watch unit elements `ref` 

### entry

The entrance path of the table unit element can specify different entrance paths when creating multiple forms.


refer to [Create multiple forms](/guide/form/form/create.md#多表单) 

FromState?: (PATH: String, StateValue: Any, Part: String|UNDEFINED) => ANY
/ /**
* When the form input control changes, call this method to convert the data before writing
*
* Example: Convert the in the above example to True/False
*
*/
Tostate?: (this: htmlinputelement, path: string, inputValue: Any, stateValue: Any, part: string|UNDEFINED) => ANY

### CUSTOMREPORT

How to report errors when you check the error.

- `default`: Use the default verification error prompt method of the browser
- `custom`: Customized method, the verification information will be written `[data-validate-field=xxxx]` the element

### Validatinit

Whether the data verification is performed during initialization, the default `true`.

### Validate

Custom school test function is used to verify form data.

```ts
(path:string,value:any,part:string | null,fieldEle:HTMLElement) => boolean | string
```

### FromState

When the state data changes, call this method to convert the data into the data used in the form input control used

```ts
(path:string,stateValue:any,part:string | undefined)=>any
```

### tostate
When the form input control changes, call this method to convert the data before writing the state

```ts
(this:HTMLInputElement,path:string,inputValue:any,stateValue:any,part:string | undefined)=>any
```
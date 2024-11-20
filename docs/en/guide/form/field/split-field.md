# Split field
exist `input` on the element `data-field-part` the attribute can specify the segmentation method of the field, bind a state value to multiple `input` on the top, realize two -way binding.


## Regular expression disassembly

When the state value is a string, you can specify `Data-FIELD-PART = "<regular expression>" ""` disassemble.

Below `net.ip` one `ip` address, we want to split it into `4` indivual `input` elements are binding.

```tsx {3,5,7,9}
<div data-field-name="net.ip">
    <div>                                
        <Input data-field-part="(\d{1,3})\.\d{1,3}\.\d{1,3}\.\d{1,3}" inline width={60} /> 
        <span>.</span>
        <Input data-field-part="\d{1,3}\.(\d{1,3})\.\d{1,3}\.\d{1,3}" inline width={60}/>
        <span>.</span>
        <Input data-field-part="\d{1,3}\.\d{1,3}\.(\d{1,3})\.\d{1,3}" inline width={60}/>
        <span>.</span>
        <Input data-field-part="\d{1,3}\.\d{1,3}\.\d{1,3}\.(\d{1,3})" inline width={60}/>
    </div>
</div>
```

<demo react ="form/field/splitField.tsx"/>


- `Data-FIELD-PART = "<regular expression>" ""` only applied to **The state value of the direction is a string** the situation.
- Due to the state and `input` it's two -way binding, and `<Regular expression>` not only used to extract from the state, but also to enter the input `input` the value is updated to the specified position of the state.
- We agreed,`<Regular expression>` there must be a capture group, such as::`\d{1,3}\.(\d{1,3})\.\d{1,3}\.\d{1,3}`,in `(\d{1,3})` it is a non -name capture group. Read the value of the group when binding, update to `input` in the state, the other is the same.
- Under normal circumstances, every one `part` all of the regular capture groups with different positions, so `part` the value is different. If there is no proper specified capture group, it will cause field splitting to work properly.

:::warning reminder
Demolition based on regular expression is a very flexible way, suitable for string content, which requires developers to design a two -way compatible regular expression.
:::

## Array split

When the status value is an array, you can specify `Data-Field-PART = "<Index>" "` quickly split.

<demo react ="form/field/splitArrayField.tsx"/>

:::warning reminder
Array splitting is a fast way of splitting, suitable for array content. When splitting, the data type is recognized and automatically converted to the corresponding data type.
:::

## Object splitting

When the state value is a `{...}` when you can specify `data-field-part="<Key>"` quickly split.

<demo react ="form/field/splitObjField.tsx"/>

## Custom

If the above -mentioned split method cannot meet the needs, it can also be customized by custom `toState` and `fromState` these two configuration parameters are defined by defining splitting methods.

- `toState`: For the `input` the input value is converted to the state value.
- `fromState`: Used to convert the status value to `input` the input value.

<demo react ="form/field/splitCustomField.tsx"/>


:::warning Note
If specified `toState`,`fromState`, Need developers to handle the split logic of the array and objects by themselves.
:::
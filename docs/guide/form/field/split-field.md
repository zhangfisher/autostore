# 拆分字段

在`input`元素上 `data-field-part`属性可以指定字段的分割方式,将一个状态值绑定到多个`input`上，实现双向绑定。


## 正则表达式拆分

当状态值是一个字符串时，可以指定`data-field-part="<正则表达式>"`进行拆分。

下例中`net.ip`是一个`ip`地址，我们希望将其拆分为`4`个`input`元素进行绑定。

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

<demo react="form/field/splitField.tsx"/>


- `data-field-part="<正则表达式>"`只适用于**指向的状态值是字符串**的情况。
- 由于状态与`input`是双向绑定的，而`<正则表达式>`不仅用于从状态中提取，也用于将输入`input`的值更新到状态的指定位置中。
- 我们约定，`<正则表达式>`中必须具有一个捕获组，如:`\d{1,3}\.(\d{1,3})\.\d{1,3}\.\d{1,3}`，其中`(\d{1,3})`就是非命名捕获组。在绑定时会读取该组的值，更新到`input`状态中，反之同理。
- 正常情况下，每一个`part`均具有不同位置的正则捕获组，所以`part`的值是不同的。如果没有正确的指定捕获组，则会导致字段拆分不能正常工作。

:::warning 提示
基于正则表达式的拆分是一种非常灵活的方式，适用于字符串内容，要求开发者设计可双向兼容的正则表达式。
:::

## 数组拆分

当状态值是一个数组时，可以指定`data-field-part="<索引>"`进行快速拆分。

<demo react="form/field/splitArrayField.tsx"/>

:::warning 提示
数组拆分是一种快速的拆分方式，适用于数组内容，拆分时会识别数据类型，自动转换为对应的数据类型。
:::

## 对象拆分

当状态值是一个`{...}`时，可以指定`data-field-part="<Key>"`进行快速拆分。

<demo react="form/field/splitObjField.tsx"/>

## 自定义拆分

如果上述的拆分方式不能满足需求，也可以通过自定义`toState`和`fromState`这两个配置参数来自定义拆分方式。

- `toState`: 用于将`input`的输入值转换为状态值。
- `fromState`: 用于将状态值转换为`input`的输入值。

<demo react="form/field/splitCustomField.tsx"/>


:::warning 注意
如果指定了`toState`、`fromState`，则需要开发者自行处理数组和对象的拆分逻辑。
:::

# Parts

分段字符输入。

## 参数

```ts
type SchemaPartsWidgetOptions = {
    // 输入中的分割字符，不作为输入，仅显示，可以包括多个
    delimiter?: string;
    template?: string;
    // 限制能输入的字符,使用正则表达式，如只输入数字，则设置为[0-9]
    chars?: string;
    //输入值是否包含分割符，=false，则在最终结果中移除delimiter
    includeDelimiter?: boolean;
    upper?: boolean;
    // 限制大小写
    caseType?: 'upper' | 'lower' | 'both';
};
```

## 示例

<demo html="autoform/widgets/parts.html"/>

:::warning 提示
支持直接粘贴到输入框的内容，会自动分割
:::

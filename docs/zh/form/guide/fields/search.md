# Search

## 概述

`Search`搜索输入组件，继承自[Input](input.md)，底层`input type`固定为`search`，默认显示`search`前缀图标和`Search`占位文案，输入内容后右侧会出现一键清除按钮，常用于列表过滤、关键字检索等场景。

## 示例

声明一个搜索字段只需要指定`widget: 'search'`：

```ts
const form = document.querySelector('#form');
form.state = {
    keyword: configurable('', {
        label: '关键字',
        widget: 'search',
    }),
};
```

<demo html="autoform/widgets/search.html"/>

## 指南

### 清除按钮

`search`类型自带清除行为：输入内容后右侧显示清除按钮，点击即可清空，无需额外配置`clearable`：

```ts
form.state = {
    keyword: configurable('', {
        label: '关键字',
        widget: 'search',
        placeholder: '输入要搜索的内容',
    }),
};
```

## 属性

继承[Input](input.md)全部属性，无自有属性。

## 注意事项

-   组件默认`icon: 'search'`、`placeholder: 'Search'`，可通过`icon`/`placeholder`覆盖。
-   完整属性见[Input](input.md)；更多底层行为参考[MDN input/search](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/search)。

# Input

常规输入字段

## 参数

```ts
type SchemaInputWidgetOptions = {
    filled?: boolean;
    pill?: boolean;
    clearable?: boolean;
    readonly?: boolean;
    pattern?: string;
    noSpinButtons?: boolean;
    autocorrect?: 'on' | 'off';
    autocomplete?: string;
    autofocus?: boolean;
    maxLength?: number;
    minLength?: number;
    max?: number;
    min?: number;
    spellcheck?: boolean;
    inputType?: 'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url';
    prefix?: (SchemaWidgetAction | string)[];
    suffix?: (SchemaWidgetAction | string)[];
};
```

| 属性            |   类型    | 默认值  | 说明                                                                                                         |
| --------------- | :-------: | :-----: | ------------------------------------------------------------------------------------------------------------ |
| `filled`        | `boolean` | `false` | 是否填充背景                                                                                                 |
| `pill`          | `boolean` | `false` | 显示为椭圆形状的输入框                                                                                       |
| `clearable`     | `boolean` | `false` | 是否显示清除按钮                                                                                             |
| `readonly`      | `boolean` | `false` | 是否只读                                                                                                     |
| `pattern`       | `string`  |         | 正则表达式                                                                                                   |
| `noSpinButtons` | `boolean` | `false` | 当`inputType=number`时是否隐藏上下调节按钮                                                                   |
| `autocorrect`   | `string`  |         | 自动修正,见[这里](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/autocorrect) |
| `autocomplete`  | `string`  |         | 自动完成 ,[这里](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/autocomplete)        |
| `autofocus`     | `boolean` | `false` | 自动聚焦[这里](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/autofocus)      |
| `maxLength`     | `number`  |         | 最大长度                                                                                                     |
| `minLength`     | `number`  |         | 最小长度                                                                                                     |
| `max`           | `number`  |         | 最大值                                                                                                       |
| `min`           | `number`  |         | 最小值                                                                                                       |
| `spellcheck`    | `boolean` | `false` | 拼写检查                                                                                                     |
| `inputType`     | `string`  |         | 输入框类型,见[这里](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/inputmode) |
| `prefix`        | `string`  |         | 前缀                                                                                                         |
| `suffix`        | `string`  |         | 后缀                                                                                                         |

## 示例

<demo html="autoform/widgets/input.html"/>

## 指南

### 前后缀

前后缀用于为输入内容自动添加前缀或后缀,比如`货币符号`,`单位`,`http://`等。

```ts
configurable('http://www.voerkai18n.com', {
    label: '内容后缀',
    prefix: ['http://', 'https://'],
    suffix: [
        { label: '在新窗口打开', value: '?_blank' },
        { label: '在当前窗口打开', value: '?_self' },
        '-', // 分割线
        { label: '空白', value: '' },
    ],
});
```

### 动作

用于为输入框前后追加一些功能按钮等，支持：

-   `button`: 默认, 按钮
-   `dropdown`: 下拉菜单
-   `image`: 图片

```ts
configurable('voerkai18n', {
    label: '动作',
    actions: [
        {
            label: '默认值',
            type: 'button' // 默认 [!code ++]
            onClick: (value, { update }) => {
                update('voerkai18n');
            },
        },
        {
            label: '更新',
            icon: 'clipboard',
            type: 'dropdown', // [!code ++]
            items: [
                'a',
                'b',
                'c',
                '-',
                {
                    label: '删除',
                    icon: 'delete',
                    onClick: (value, ctx) => {
                        console.log(value, ctx);
                    },
                },
            ],
        },{
            type: 'image', // [!code ++]
            url: 'https://www.voerkai18n.com/images/xxx.jpg',
        }
    ]
}
```

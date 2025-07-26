# Collapse

折叠字段组

## 指南

```html
<auto-form-collapse active="general">
    <auto-form name="a" group="general" label="常规" icon="general"></auto-form>
    <auto-form name="b" group="network" label="网络" icon="network"></auto-form>
    <auto-form name="c" group="safe" label="安全" icon="security"></auto-form>
    <auto-form name="d" group="advanced" label="高级" icon="advanced"></auto-form>
</auto-form-collapse>
```

## 属性

-   **auto-form-tabs**

用于内嵌一个或多个`auto-form`元素。

| 名称     | 类型     | 说明                                   |
| -------- | -------- | -------------------------------------- |
| `active` | `String` | 活动页签的 `name`属性,未指定时为第一项 |

-   **auto-form**

`auto-form`元素可以指定以下属性，用以定义如何被`auto-form-tabs`使用。

| 名称           | 类型     | 说明                                                                                    |
| -------------- | -------- | --------------------------------------------------------------------------------------- |
| `name`         | `String` | 唯一标识`form`对象，`active`值为此时将显示                                              |
| `group`        | `String` | 用于过滤`auto-form`显示字段                                                             |
| `path`         | `String` | 用于过滤`auto-form`显示字段                                                             |
| `label`        | `String` | 页签标题文字                                                                            |
| `icon`         | `String` | 页签图标,参考[icon 属性](../icons)                                                      |
| `data-actions` | `String` | 在头部显示图标按钮,格式`<图标名称>:<提示信息>,...`,如`download:保存为模板,preview:预览` |

## 示例

<demo html="autoform/groups/collapse.html"/>

# Upload

## 概述

`Upload`文件上传组件，支持单文件/多文件上传、拖拽上传、上传进度显示、图片/视频预览与文件删除。上传通过与服务器约定的上传`API`完成，上传结果经解析后写入状态，默认只保留文件`url`。

## 示例

声明一个上传字段需要指定`widget: 'upload'`并通过`url`提供上传接口地址：

```ts
const form = document.querySelector('#form');
form.state = {
    file: configurable('', {
        label: '文件',
        widget: 'upload',
        url: 'api/upload',
    }),
};
```

<demo html="autoform/widgets/upload.html"/>

## 指南

### 文件上传 API

服务器需要部署一个接收文件的`API`（例如：`/api/upload`），用于接收上传的文件，并返回处理结果。

`url`用于指定该上传地址，例如`/api/upload`。

`fileFieldName`用于指定上传请求中文件的表单字段名称，默认是`files`。以`express`为例，当上传文件时，可以通过`req.body.files`读取到文件内容。

约定文件上传`API`应该返回：

```ts
type SchemaUploadWidgetFile = {
    url: string;
    id?: string;
    title?: string;
    size?: number;
};
```

-   `url`: 上传文件后的网址，可以用于预览。
-   `id`: 可选的文件唯一标识，如果您在数据库中保存文件上传记录，一般可以返回对应的 id。此值在删除时提供。
-   `title`: 可选的、友好名称，用于显示。
-   `size`: 可选的，实际上传大小。

### 删除文件

单击删除按钮时会调用`onRemove`回调，可以在此向服务器发起删除请求，返回`Promise`后文件才真正被移除：

```ts
form.state = {
    files: configurable([], {
        label: '文件',
        widget: 'upload',
        onRemove: async (file) => { // [!code ++]
            // 在此向服务器发起删除请求 // [!code ++]
            await fetch(`api/upload?id=${file.id}`, { method: 'DELETE' }); // [!code ++]
        }, // [!code ++]
    }),
};
```

### 上传数量

支持上传一个文件或多个文件：

```ts
form.state = {
    // 上传多个文件（默认）
    files: configurable([], {
        label: '文件',
        widget: 'upload',
        multiple: true,
    }),
    // 只上传单个文件
    file: configurable('', {
        label: '文件',
        widget: 'upload',
        multiple: false, // [!code ++]
    }),
};
```

### 解析上传响应

`onResolve`用于对上传文件`API`的响应进行解析。

一般情况下，我们约定服务器上部署的上传`API`应返回`SchemaUploadWidgetFile`。在旧项目或其他因素下，返回的不是`SchemaUploadWidgetFile`时，则需要使用`onResolve`将返回内容解析为`SchemaUploadWidgetFile`。

比如：当`POST http://myserver.com/upload`文件时，返回的是：

```ts
{
    file: 'images/a.png';
}
```

需要转换为`SchemaUploadWidgetFile`：

```ts
form.state = {
    files: configurable([], {
        label: '文件',
        widget: 'upload',
        onResolve: (response) => { // [!code ++]
            response.url = response.file; // [!code ++]
            return response; // [!code ++]
        }, // [!code ++]
    }),
};
```

### 限制文件类型

`fileTypes`参数用于限制上传的文件类型，可以接受 MIME 类型和文件扩展名，参考[accept](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/accept)参数：

```ts
form.state = {
    files: configurable([], {
        label: '文件',
        widget: 'upload',
        fileTypes: [ // [!code ++]
            '.jpg', // [!code ++]
            '.png', // [!code ++]
            'image/*', // [!code ++]
            'video/*', // [!code ++]
            'audio/*', // [!code ++]
        ], // [!code ++]
    }),
};
```

### 预览

`preview`用于控制是否显示文件预览，特别是上传图片时：

-   `true`: 显示默认的预览元素，一般只对图片和视频文件有效
-   `false`: 不预览，只显示文件标题或`url`

```ts
form.state = {
    files: configurable([], {
        label: '相片',
        widget: 'upload',
        preview: false, // [!code ++]
    }),
};
```

:::warning 提示

单击图片时可以放大预览显示。

:::

### 文件选择器

`selector`用于控制如何选择文件：

-   `auto`: 默认，单选时只显示上传按钮，多选时显示接收文件的矩形区域
-   `button`: 显示一个上传选择文件按钮，单击后选择文件
-   `rectangle`: 显示一个接收文件的矩形区域，单击后选择文件或拖动文件到此上传

```ts
form.state = {
    files: configurable([], {
        label: '文件',
        widget: 'upload',
        selector: 'button', // [!code ++]
    }),
};
```

### 保存上传数据

默认情况下，上传字段只保存上传文件的`url`：

-   当上传`abc.jpg`到`api/upload`时，服务器将文件保存在`upload/abc.jpg`，
-   然后服务器返回`{url:'upload/abc.jpg', size:12984, id:'da1412f3', title:'我的头像'}`（如果不是则应该使用`onResolve`进行解析转换），
-   再将`url`写入状态中。即此时`form.state.file === 'upload/abc.jpg'`。

**也就是说，在状态中只保留了上传文件的`url`。**

有时，我们需要在数据中保存更多的信息，包括文件大小、`id`、`title`等。这时可以配置`onlyFileUrl=false`，则将整个`SchemaUploadWidgetFile`写入状态，因此`form.state.file === {url:'upload/abc.jpg', size:12984, id:'da1412f3', title:'我的头像'}`：

```ts
form.state = {
    file: configurable(
        { url: '' },
        {
            label: '文件',
            widget: 'upload',
            onlyFileUrl: false, // [!code ++]
        },
    ),
};
```

## 属性

| 属性           |    类型    |        默认值        | 说明                                                                 |
| -------------- | :--------: | :------------------: | -------------------------------------------------------------------- |
| `url`          |  `string`  |         `''`         | 上传接口地址                                                         |
| `fileTypes`    |  `array`   |         `[]`         | 允许的文件类型（MIME 或扩展名，`"*"`通配）                           |
| `multiple`     | `boolean`  |        `true`        | 是否多文件上传                                                      |
| `fileFieldName`|  `string`  |       `"files"`      | 上传请求中文件的表单字段名                                          |
| `preview`      | `boolean`  |        `true`        | 是否显示文件预览                                                    |
| `tips`         |  `string`  | `拖动文件到此处或点击选择文件上传` | 上传区域提示文字                              |
| `selector`     |  `string`  |        `"auto"`      | 选择器形态：`auto` / `button` / `rectangle`                          |
| `onResolve`    | `function` |        内置          | 上传结果解析：从响应中解析出文件列表                                |
| `onFileLabel`  | `function` |        内置          | 文件显示名生成，默认取`title`或`url`末段文件名                       |
| `onRemove`     | `function` |                      | 删除文件回调，可在此调用服务器删除接口，返回`Promise`后才真正移除    |
| `onlyFileUrl`  | `boolean`  |        `true`        | 值只保留文件`url`；`false`时保留完整文件对象                         |

## 注意事项

-   上传是逐文件发起的`FormData`请求，文件字段名由`fileFieldName`决定，服务器需要按此字段读取文件。
-   默认的响应解析要求返回值为字符串（只含`url`）或含`url`字段的对象，不符合约定时必须提供`onResolve`。
-   单文件字段（`multiple=false`）建议初值用`''`或`{url:''}`；多文件字段初值用数组。
-   `onRemove`返回`Promise`后文件才会从列表中移除，可以在其中先完成服务器删除再`resolve`。

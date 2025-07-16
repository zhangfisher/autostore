# FileUpload

文件上传组件

## 参数

```ts
type SchemaUploadWidgetFile = {
    id?: string;
    url: string;
    title?: string;
    size?: number;
};

export type SchemaUploadWidgetOptions = {
    /**
     * 文件输入元素的accept属性可以接受MIME类型和文件扩展名
     * 例如: "image/jpeg, .jpg, .png"
     */
    fileTypes?: string[];
    /**
     * 接收上传的地址
     *
     * 例如：/upload
     *
     */
    url?: string;
    /**
     * 上传文件字段名称
     */
    fileFieldName?: string; // 上传文件字段名称，默认是files
    /**
     * 当删除文件时传入
     */
    onRemove?: (file: string | SchemaUploadWidgetFile) => Promise<void> | void;
    /**
     * 指定如何选取文件
     * button: 显示一个上传选择文件按钮
     * rectangle:  默认，显示一个矩形框架，可以拖动到了此
     * auto:  默认，多选时显示rectangle,单选时显示button
     */
    selector?: 'button' | 'rectangle' | 'auto';
    multiple?: boolean;
    // 上传提示信息
    tips?: string;
    /**
     * 用于解析上传文件的url
     *
     * response是/upload上传API返回的数据
     *
     * 如果没有提供，默认的解析逻辑
     *
     * - string          : 只返回上传文件的URL
     * - {url,title,id}  : 可以返回更复杂的内容
     *
     * 如果不符合以上逻辑，则需要自行处理
     *
     */
    onResolve?: (response: string | Record<string, any>) => SchemaUploadWidgetFile;
    /**
     * 用于显示文件名称，如果没有指定则只显示文件名称
     */
    onFileLabel?: (file: string | SchemaUploadWidgetFile) => string;
    /**
     * 显示预览的尺寸
     * true代表显示一个默认的预览，一般只对图片和视频文件有效
     * false代表不预览，只显示文件标题或url
     * “字符串”： 代表预览大小，如:"64px"，代表预览元素大小为64px;
     *
     */
    preview?: boolean | string | number;
    /**
     * 默认情况下，
     *
     * 上传字段只保存上传文件的url，比如
     *
     * {
     *   file:configurable("",{
     *      widget:"upload"
     *  })
     * }
     *
     * 当上传abc.jpg时，服务器保存在upload/abc.jpg，或者重命名为upload/abc_123232.jpg
     *
     * 此时state.file==`upload/abc_123232.jpg`
     *
     * 就是字段值=上传文件的URL
     *
     * 而有时我们想保存一些额外的文件数据，比如文件大小，用途，名称等等。
     */
    onlyFileUrl?: boolean;
};
```

## 示例

<demo html="autoform/widgets/upload.html"/>

## 指南

### 文件上传 API

服务器需要部署一个接收文件的`API`（例如：`/api/upload`），用于接收上传的文件，并返回处理结果。

#### url

需要指定上传地址，例如：`/api/upload`

#### fileFieldName

该参数用于指定上传文件的字段名称，默认是`files`。

以`express`为例，当上传文件时，可以通过`req.body.files`读取到文件内容。

#### 上传结果

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
-   `title`: 可选的,友好名称,用于显示
-   `size`: 可选的，实际上传大小。

### 删除文件

当单击删除文件时，调用`onRemove`

```ts
configurable([], {
    label: '文件',
    onRemove: (file: SchemaUploadWidgetFile) => {
        // 在此向服务器发起删除请求
    },
});
```

### 上传数量

支持上传一个文件或多个文件。

```ts
// 默认上传单个文件
configurable('', {
    label: '文件',
    widget: 'upload',
});
// 上传多个文件
configurable([], {
    label: '文件',
    widget: 'upload',
    multiple: true, //[!code ++]
});
```

### 解析上传响应数据

`onResolve`用于对上传文件`API`的结果进行解析。

一般情况下，我们约定，服务器上部署的上传文件 API 应返回`SchemaUploadWidgetFile`.

在旧项目或其他因素下，返回的不是`SchemaUploadWidgetFile`，则需要使用`onResolve`将返回内容解析为`SchemaUploadWidgetFile`.

比如：当`POST http://myserver.com/upload`文件时，返回的是:

```ts
{
    file: 'images/a.png';
}
```

需要转换为`SchemaUploadWidgetFile`.

```ts
configurable([], {
    label: '文件',
    widget: 'upload',
    onResolve: (response) => {
        response.url = response.file;
        return response;
    },
});
```

### 限制文件类型

`fileTypes`参数用于限制上传的文件类型，可以接受 MIME 类型和文件扩展名,参考[accept](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/accept)参数.

```ts
configurable([], {
    label: '文件',
    widget: 'upload',
    fileTypes: [
        '.jpg',
        '.png'，
        'image/*',
        'video/*',
        'audio/*'
    ],
});
```

### 预览

`preview`用于控制是否显示预览，特别是上传图片时。

-   `true`: 代表显示一个默认的预览元素，一般只对图片和视频文件有效
-   `false`: 代表不预览，只显示文件标题或 url
-   `字符串`： 代表预览元素大小，默认是"64px";

:::warning 提示
单击图片时可以放大预览显示。
:::

### 文件选择器

`selector`用于控制如何选择文件。

-   `auto`: 单选时只显示上传按钮，多选时显示接收文件矩形区域
-   `button`: 显示一个上传选择文件按钮，单击后选择文件。
-   `rectangle`: 显示一个接收文件矩形区域，单击后选择文件或者拖动文件到此上传。

### 保存上传数据

默认情况下，上传字段只保存上传文件的`URL`。

如下：

```ts
const store = new AutoStore({
    file:configurable('', {
    label: '文件',
    widget: 'upload'
});
}
```

-   当上传`abc.jpg`到`api/upload`时，服务器将文件保存在`upload/abc.jpg`，
-   然后服务器返回`{url:'upload/abc.jpg',size:12984,id:'da1412f3',title:'我的头像'}`（如果不是则应该使用`onResolve`进行解析转换）。
-   再将`url`写入状态中。即此时`store.state.file==='upload/abc.jpg'`

**也就是说，在`AutoStore`的状态中只保留了上传文件的`url`。**

有时，我们需要在数据中保存更多的信息，包括文件大小，id，title 等。

这时可以配置`onlyFileUrl=false`，则将整个`SchemaUploadWidgetFile`写入状态。
因此，此时`store.state.file==={url:'upload/abc.jpg',size:12984,id:'da1412f3',title:'我的头像'}`

### tips

配置上传提示信息， 默认是`拖动文件到此处或点击选择文件上传`

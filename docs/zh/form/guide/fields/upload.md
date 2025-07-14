# FileUpload

文件上传组件

## 属性

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
-   `title`: 可选的,友好名称
-   `size`: 可选的，实际上传大小。

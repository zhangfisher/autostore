/grill-with-docs

探索为AutoTemplateScope 和 AutoTemplateDirectiveBase 设计一套通用的错误处理机制

例： <div x-text="aa"></div>

每一个AutoTemplateScope元素可能会具有多个指令，编译模板、指令执行、响应事件等均可能产生错误。
我希望设计通用的错误处理机制，以便在出错时给出反馈。

反馈包括两个层面的：

- 面向开发者：通过API、日志输出、事件触发等能让开发者以发现和定位故障。
- 面向用户：在编译结果中，进行错误呈现（友好），提供挽救操作（如重试、忽略，回退、备用等）

基于以上反馈需求，我想法还没有很成熟，粗略的想法如下：

设计一个x-error指令，用于捕获该元素上的编译错误、指令执行错误，动作错误等
捕获错误来自： engine.on侦听action事件等，DOM冒泡事件等。
x-error支持配置项:

```
{
    className:"捕获到错误时在宿主上添加类，如error"
    behavior: // 捕获到错误时的行为
    // 错误可视化呈现方式，none-不显示，仅日志输出；icon-在宿主右下方显示红包错误图标，点击后展开错误详情overlay； overlay-错误详情,覆盖在宿主元素上。
    visable： 'none' | 'icon' | 'overlay'
    prevent:boolean // 是否阻止错误向上冒泡，默认true
}
```

当错误发生时，可能过通scope.errors读取到错误，清空错误可以清除x-error生成的副作用，如清除覆盖物等。

scope.errors=[weakRef<HTMLElement> error][]

<div x-text="a + b" x-error="{...错误选项....}></div>

- 在宿主元素上增加指示类，如<div class="error"></div>，这样可以为宿主元素提供视觉反馈。
- 注入错误信息覆盖

<div x-text="a + b" x-error="{message:'出错了'}"></div>

<div class="error">
    <div>出错了</div> // 这是自动注入的,覆盖宿主元素
</div>

错误有编译时错误和运行时错误

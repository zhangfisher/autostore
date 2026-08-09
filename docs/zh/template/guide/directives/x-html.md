# x-html HTML 插值

## 概述

`x-html` 把状态值作为**原始 HTML** 注入元素的 `innerHTML`——与 `x-text` 同构（响应式订阅、调度合并），差别只在工作时写 `innerHTML`（解析为 DOM）而非 `textContent`（转义文本）。

```html
<div x-html="richText"></div>
```

**默认消毒**（safe-by-default）：注入前先过 HTML 消毒器，剥除 `<script>`、`on*` 事件属性、危险协议 URL——避免 XSS。注入受信内容时用 `.raw` 退出消毒。

## 快速入门

<demo html="template/html/basic.html"/>

```html
<div x-html="content"></div>
```

```javascript
const engine = new AutoTemplateEngine(el, {
    content: "<p>初始 <strong>富文本</strong></p>",
});
```

## 指南

### 默认消毒（safe-by-default）

注入的 HTML 默认经消毒器处理，`<script>`、`onerror`/`onclick` 等事件属性、危险协议 URL 都被剥除：

<demo html="template/html/basic.html"/>

```javascript
// 含恶意脚本的 HTML：script 被剥、onerror 被剥，安全渲染
engine.state.content = '<p>注入</p><script>alert(1)<\/script><img src=x onerror=alert(1)>';
```

默认消毒器是内置极简实现（剥 `<script>` / `on*` / 危险协议）。高安全场景可注入工业级消毒器：

```javascript
new AutoTemplateEngine(el, state, { sanitizer: DOMPurify.sanitize });
```

### .raw 退出消毒

`.raw` 修饰符跳过消毒，把绑定值**原样**写入 `innerHTML`——仅用于受信内容（自家服务端富文本、本地静态片段）：

<demo html="template/html/raw.html"/>

```html
<div x-html.raw="trusted"></div>
```

### 注入内容不编译

注入的 HTML 是**静态快照**——引擎不会递归编译它、不建 scope、不注册 watcher。也就是说，注入的 `<span x-text="x">` 不会被当作指令，只作纯 HTML 显示。要让注入内容也响应式，改数据源触发 `x-html` 重新渲染整段。

### 空值占位与隐藏

`x-html` 与 `x-text` 共享同一套空值机制（`empty` / `emptyValues` / `.hide`），用法完全一致——区别仅 `empty` 占位串也会过消毒。详见 [x-text · 空值渲染](./x-text.md#空值渲染)。

## 配置

| 配置项 | 形式 | 说明 |
| --- | --- | --- |
| `.raw` | 修饰符 | 跳过消毒、原样写入 innerHTML（受信内容） |
| `empty` / `emptyValues` | `x-html-options` | 空值占位，同 x-text（占位串过消毒） |
| `.hide` | 修饰符 | 空值时隐藏宿主，同 x-text |
| `sanitizer` | `engine.options.sanitizer` | 自定义消毒器（如 DOMPurify），`.raw` 时整体跳过 |

| 元数据 | 值 | 说明 |
| --- | --- | --- |
| `priority` | `0` | 内容类指令 |
| `singleton` | `true` | 同元素同名取最后声明 |

::: info 关于指令配置体系
指令选项 / 修饰符 / 宿主选项 / 两层回退见[指令配置](../config.md)。
:::

## 注意事项

- **与 `x-text` 同元素时优先**：同一元素同时声明 `x-text` 与 `x-html` 时，`x-html` 胜出、`x-text` 静默不生效。
- **`<script>` 不会执行**：`innerHTML=` 本就不执行脚本（浏览器约束），默认消毒还会剥除——双重保险。
- **`.raw` 需自负其责**：`.raw` 跳过消毒，务必确保内容来源可信（自家服务端、本地静态），否则引入 XSS。
- **注入内容非响应式**：注入的 HTML 是静态快照，不会编译其中可能的指令。

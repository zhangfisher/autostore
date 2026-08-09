---
title: 模板
---

# AutoTemplate Engine

声明式模板渲染引擎——在 HTML 上书写 `x-*` 指令，把 [AutoStore](../store/guide/store/about.md) 的响应式状态绑定到 DOM。状态一变，界面自动更新。

```html
<div id="app">
    <p>你好，<span x-text="user.name"></span>！</p>
</div>

<script>
    const { AutoTemplateEngine } = AutoTemplateSpaces;
    new AutoTemplateEngine(document.getElementById("app"), { user: { name: "张三" } });
</script>
```

## 为什么选择它

- **最小声明语法** —— 用最少的 HTML 属性声明，换取完整的响应式 UI。
- **细粒度响应式更新** —— 复用 AutoStore 路径订阅 + 调度合并，状态变化只 patch 受影响节点。
- **文本 + 属性插值** —— 文本节点与属性值均可插值（如把状态动态拼进 class），皆自动响应式。
- **store | state 双向数据源** —— 构造器接收 AutoStore 实例（借用）或裸状态（自建），灵活集成。

## 从这里开始

- 第一次接触？看[关于](./intro/about.md)与[快速入门](./intro/get-started.md)
- 想了解能做什么？看[特征与优势](./intro/features.md)
- 上手开发？进入[指南](./guide/initial.md)
- 查具体用法？浏览[指令](./guide/directives/x-bind.md)

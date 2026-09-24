# viewer 动态图标：slot 自定义与 icon-url 批量拉取

autostore-viewer 此前仅有编译期内置图标表，`schema.icon`（core 已有字段）无处落地。本决策让节点图标可由开发者自定义，图标解析链为 **slot 自定义 > 内置 > icon-url 拉取**：

- **slot 自定义**：`<template slot="icons">` 内放 `<symbol>`（id 的 `asv-` 前缀可省略），slotchange 时提取注入本实例 sprite，**同名覆盖内置**（后注册者生效）。
- **批量拉取**：`schema.icon` 在已注册图标中不存在时，经 `icon-url` 模板（`{names}` 占位符替换为逗号分隔名单）批量拉取 iconify JSON，默认 `https://api.iconify.design/material-symbols-light.json?icons={names}`；置空禁用。

关键语义：

- **攒批合并**：渲染期缺失 key 不立即请求，微任务攒批——同帧多个缺失合并为一次请求；inflight/已注册/已负缓存跳过。
- **失败负缓存**：HTTP/网络错误与 `not_found` 一视同仁，会话内不再请求，节点回落类型推导图标（刷新页面重置）——用简单性换瞬态失败的体验（刷新即恢复），不引入冷却计时。
- **symbol 构造**：`createElementNS(svg) + innerHTML = body`，viewBox 取 per-icon > 包级 > 24；JSON body 经 SVG 命名空间解析进 symbol，脚本不激活。
- **aliases 忽略**：别名按未命中负缓存（第一批不支持 iconify 别名展开，YAGNI）。
- **门控**：`schema.icon` 为节点身份视觉，不受 `disable-schema` 开关影响（该开关只关文字元信息）；实例级缓存与 sprite 同生命周期。
- **icon-modify 风格后缀**：`icon-modify="outline"`（rounded/sharp/outline/outline-rounded/outline-sharp）仅作用于**远程请求名**——`home` 以 `home-outline` 请求，响应键按后缀映射回原名注册与负缓存，`schema.icon="home"` 引用名不变；空值（默认）不做任何处理。非空值不做白名单校验——拼写错误经 not_found 负缓存自然回落类型图标。

考虑过的替代方案：单个 SVG 文件模板（`{name}.svg` 逐个拉取）——被否：逐图标请求风暴，iconify 的批量 JSON API 天然一次多图标；模块级全局缓存——被否：sprite 按实例 shadow 注入，跨实例共享状态与生命周期不一致，重复网络由 HTTP 缓存吸收。

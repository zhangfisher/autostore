---
"@autostorejs/plugins": minor
---

cycleDetect 插件移除异步循环依赖检测功能：

- 异步计算属性不再参与循环依赖检测，重入由 core 的 `_running` 重入保护兜底（`observer/*/cancel` 事件），避免检测错误在事件总线链路上变成进程级未捕获异常
- 保留同步计算属性的构造期（嵌套创建链）与执行期（getter 重入）两阶段检测
- 同步循环检测错误不再中断 store 构造，改为记录在嵌套最深层 observer 的 `error` 属性上
- 文档与单元测试同步更新（11 个测试全部通过）

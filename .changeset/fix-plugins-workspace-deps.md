---
"@autostorejs/plugins": patch
---

修复发布包依赖中 `workspace:*` 协议未替换为实际版本号导致安装失败的问题，重新发布以修复 npm 上的依赖引用错误

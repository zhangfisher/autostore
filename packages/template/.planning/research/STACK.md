# 技术栈研究 - AutoStore Template

## 核心技术选择

### 响应式基础
- **@autostorejs/core** - AutoStore 核心库，提供 Proxy 响应式系统
  - 已有依赖追踪机制
  - 支持同步/异步计算属性
  - 细粒度更新能力

### 模板解析
- **DOMParser API** - 浏览器原生解析器
  - 零依赖，无需额外打包
  - 支持解析 HTML 字符串为 DOM 树
  - 现代浏览器全面支持

### DOM 操作
- **直接 DOM 操作** - 不使用虚拟 DOM
  - 研究表明：最快的虚拟 DOM 就是没有虚拟 DOM
  - 结合 AutoStore 的细粒度更新能力
  - 精准定位需要更新的元素

### 指令扫描
- **TreeWalker API** - 高效 DOM 遍历
  - 比 querySelectorAll 更高效的树遍历
  - 可以过滤节点类型，只处理元素节点
  - 支持自定义过滤逻辑

## 开发工具

### 构建系统
- **tsup** - 与 monorepo 其他包一致
  - 基于 esbuild 的快速构建
  - 支持 ESM/CJS/IIFE 多格式输出
  - TypeScript 声明文件自动生成

### 代码质量
- **Biome** - 代码检查和格式化
  - 与 monorepo 一致的工具链
  - 快速的 lint 和 format

### 测试
- **Vitest** - 单元测试
  - 与 monorepo 一致的测试框架
  - 快速测试执行
  - JSDOM 环境支持 DOM 测试

## 包结构

```
@autostorejs/template
├── src/
│   ├── core/           # 核心引擎
│   ├── directives/     # 指令实现
│   ├── parser/         # 模板解析
│   ├── utils/          # 工具函数
│   └── index.ts        # 入口
├── dist/               # 构建输出
└── test/               # 测试文件
```

## 不使用的技术

### Virtual DOM
**原因：**
- AutoStore 已提供细粒度的依赖追踪
- 直接 DOM 操作在这个场景下更高效
- 避免虚拟树的内存开销
- 避免差异算法的计算成本

### 模板编译器
**原因：**
- 增加构建复杂度
- 增加包体积
- 运行时解析在简单场景下足够快
- 保持与 Alpine.js 的 API 兼容性

### 复杂的依赖注入
**原因：**
- 保持简单，避免过度工程化
- 直接依赖 AutoStore store 实例
- 不引入额外的容器或注入系统

## 参考项目

- **[Alpine.js](https://alpinejs.dev/)** - 指令语法灵感来源
- **[Vue Reactivity](https://vuejs.org/guide/extras/reactivity-in-depth.html)** - 响应式系统参考
- **[Petite Vue](https://github.com/vuejs/petite-vue)** - 轻量级实现参考

## 置信度

| 技术 | 置信度 | 说明 |
|------|--------|------|
| DOMParser | 高 | 浏览器原生 API，成熟稳定 |
| 直接 DOM | 高 | 研究支持，适合细粒度更新 |
| TreeWalker | 中 | 需要验证性能表现 |
| AutoStore 集成 | 高 | 已有完善的响应式系统 |

---
*研究日期：2025-06-30*
*来源：Web 研究 + AutoStore 架构知识*

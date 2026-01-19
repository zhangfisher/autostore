# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

AutoStore 是一个基于 Proxy 的响应式状态管理库，支持细粒度更新、原位计算(Computed)、异步计算、状态监听和 React 组件集成。

## Monorepo 架构

项目使用 **Bun Workspaces** 管理多个包，使用 **Turbo** 进行构建编排：

### 核心包结构

-   **`packages/core`** - 核心状态管理库 (`autostore`)

    -   基于 Proxy 的响应式系统
    -   同步/异步计算属性
    -   状态监听(watch)和事件系统
    -   Schema 管理
    -   入口: `src/index.ts` -> `store/`, `computed/`, `watch/`, `observer/`, `events/`

-   **`packages/react`** - React 集成 (`@autostorejs/react`)

    -   ReactAutoStore 类继承 core 的 AutoStore
    -   Hooks: useState, useReactive, useWatch, useDeps, useComputed, useAsyncState
    -   Signal 组件 (`signal/`) 用于细粒度更新
    -   Form 表单集成 (`form/`)
    -   入口: `src/index.tsx` -> `store.tsx`

-   **`packages/form`** - Web Component 表单组件 (`@autostorejs/form`)

    -   基于 Lit 的原生 Web Component
    -   双向数据绑定
    -   主题系统支持

-   **`packages/syncer`** - 状态同步工具 (`@autostorejs/syncer`)

-   **`packages/devtools`** - 开发者工具集成 (`@autostorejs/devtools`)

-   **`packages/components`** - UI 组件库

### 文档站点

-   **`docs`** - VitePress 文档站点
    -   配置: `docs/.vitepress/config/index.ts`
    -   公开资源: `docs/public/` (构建后自动复制 core 包的 iife 构建产物)

## 常用命令

### 构建

```bash
# 构建所有包
bun run build

# 使用 turbo 构建(增量构建)
turbo build

# 构建特定包
cd packages/core && bun run build
cd packages/react && bun run build
cd packages/form && bun run build
```

### 测试

```bash
# 运行核心包测试
cd packages/core && bun run test

# 使用 vitest 运行测试
vitest
```

-   单元测试名称均使用中文

### 文档

```bash
# 开发文档站点
bun run docs:dev

# 构建文档
bun run docs:build

# 预览文档
bun run docs:preview
```

### 发布流程

```bash
# 1. 创建 changeset
bun run changeset

# 2. 版本更新和发布
bun run publish:all
# 等同于: turbo build && changeset version && changeset publish

# 3. 同步到 npm 镜像
bun run sync
```

## 核心概念

### 响应式系统架构

**Proxy 层**:

-   `store/reactive.ts` - 创建 Proxy 包装的响应式对象
-   `store/shadow.ts` - Shadow 状态用于计算属性

**计算属性系统**:

-   `computed/sync.ts` - 同步计算 (立即返回结果)
-   `computed/async.ts` - 异步计算 (支持 timeout/retry/cancel/progress)
-   计算属性写入状态树原位，通过 scope 访问依赖

**依赖追踪**:

-   自动追踪计算属性 getter 中访问的状态路径
-   支持显式声明依赖路径

**状态监听**:

-   `watch/` - watch API 监听路径或函数变化
-   `events/` - 事件系统监听状态操作 (get/set/delete/insert)
-   支持批量更新优化 (BATCH_UPDATE_EVENT)

### React 集成模式

**创建 Store**:

```typescript
const { $, state, useReactive } = createStore({
    user: {
        firstName: 'zhang',
        fullName: (scope) => scope.firstName + scope.lastName,
    },
});
```

**Signal 组件**:

-   `$('user.fullName')` 组件仅依赖变化时重新渲染
-   代码位置: `react/src/signal/`

**Hooks 工厂模式**:

-   所有 hooks 通过 `createUse{Xxx}(store)` 工厂函数创建
-   自动绑定 store 实例，见 `store.tsx` 构造函数

### 包依赖关系

```
react -> core (workspace:*)
form -> core + syncer (workspace:*)
devtools -> core (workspace:*)
```

## 构建配置

**构建工具**: tsup (基于 esbuild)

**输出格式**:

-   ESM (`dist/index.js`)
-   CommonJS (`dist/index.cjs`)
-   IIFE (`dist/index.global.js`) - 用于浏览器直接引入
-   TypeScript 声明文件 (`dist/index.d.ts`)

**核心包特殊处理**:

-   构建后自动复制 iife 文件到文档站点: `docs/public/autostore.js`
-   显示 gzip 后的文件大小

## 代码风格

**包管理器**: Bun (bun.lockb)

**代码检查**: Biome (`biome.json`)

**格式化**: Prettier (`.prettierrc.js`)

**TypeScript**: 全程严格模式

## Changesets 配置

-   固定版本包: `autostore`, `@autostorejs/react`, `@autostorejs/syncer`, `@autostorejs/form`, `@autostorejs/devtools`
-   这些包的版本号会同步更新
-   内部依赖更新时使用 patch 版本

## 重要注意事项

1. **代码注释语言**: 代码库使用中文注释，请保持一致

2. **包引用**:

    - 在 monorepo 内使用 `workspace:*` 协议
    - React 包必须显式依赖 `autostore: workspace:*`

3. **计算属性**:

    - 同步计算使用函数: `fullName: (scope) => scope.firstName + scope.lastName`
    - 异步计算使用 computed() 包装: `fullName: computed(async (scope) => ..., ["./firstName"])`

4. **类型安全**:

    - 核心包完整支持 TypeScript 类型推断
    - React hooks 提供基于路径的类型推导

5. **文档构建**:
    - 修改核心包代码后需重新构建以更新文档站点的 autostore.js
    - 文档使用 VitePress，配置位于 `docs/.vitepress/config/`
6. 禁用 spec-workflow 功能

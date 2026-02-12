# AutoStore 项目上下文指南

## 项目概述

AutoStore 是一个基于 Proxy 的响应式状态管理库，提供细粒度更新、原位计算、异步计算、状态监听和 React 组件集成功能。该项目采用 TypeScript 开发，支持完整的类型推断。

## 技术栈与架构

### 核心技术
- **语言**: TypeScript (严格模式)
- **包管理**: Bun + Bun Workspaces
- **构建工具**: Turbo (编排) + tsup (包构建)
- **测试**: Bun Test
- **文档**: VitePress
- **代码检查**: oxlint
- **格式化**: Prettier

### Monorepo 架构

项目使用 Bun Workspaces 管理，主要包含以下核心包：

#### 1. `packages/core` - 核心状态管理库 (`autostore`)
- **主要功能**:
  - 基于 Proxy 的响应式系统
  - 同步/异步计算属性 (Computed)
  - 状态监听 (Watch) 和事件系统
  - Schema 管理
  - 依赖追踪和循环依赖检测
- **入口文件**: `src/index.ts`
- **核心模块**: `store/`, `computed/`, `watch/`, `observer/`, `events/`

#### 2. `packages/react` - React 集成 (`@autostorejs/react`)
- **主要功能**:
  - ReactAutoStore 类继承 core 的 AutoStore
  - React Hooks: useState, useReactive, useWatch, useDeps, useComputed, useAsyncState
  - Signal 组件用于细粒度更新
  - Form 表单集成
- **入口文件**: `src/index.tsx`
- **依赖**: `autostore: workspace:*`

#### 3. `packages/syncer` - 状态同步工具 (`@autostorejs/syncer`)
- **主要功能**:
  - 状态同步机制
  - 可靠性同步工具
  - 多种传输协议支持
- **入口文件**: `src/index.ts`

#### 4. `packages/devtools` - 开发者工具 (`@autostorejs/devtools`)
- **主要功能**:
  - Redux DevTools 集成
  - 循环依赖检测扩展
- **入口文件**: `src/index.ts`

#### 5. `packages/components` - UI 组件库
- **主要功能**:
  - 基础 UI 组件
  - 表单组件集合

### 文档站点

- **技术**: VitePress + Vue
- **位置**: `docs/`
- **配置**: `docs/.vitepress/config/index.ts`
- **构建产物**: 核心包构建后自动复制 IIFE 文件到 `docs/public/autostore.js`

## 常用命令

### 构建命令
```bash
# 构建所有包
bun run build

# 使用 Turbo 增量构建
turbo build

# 构建特定包
cd packages/core && bun run build
cd packages/react && bun run build
```

### 测试命令
```bash
# 运行核心包测试
cd packages/core && bun run test

# 注意: 测试名称均使用中文
```

### 文档命令
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
bun run publish-packages
# 等同于: bun run build && bun run scripts/apply-publish-config.js && changeset version && changeset publish

# 3. 同步到 npm 镜像
bun run sync
```

### 代码质量
```bash
# 代码检查
bun run lint

# 自动修复
bun run lint:fix
```

## 核心概念

### 响应式系统架构

1. **Proxy 层**:
   - `store/reactive.ts` - 创建 Proxy 包装的响应式对象
   - `store/shadow.ts` - Shadow 状态用于计算属性

2. **计算属性系统**:
   - `computed/sync.ts` - 同步计算 (立即返回结果)
   - `computed/async.ts` - 异步计算 (支持 timeout/retry/cancel/progress)
   - 计算属性写入状态树原位，通过 scope 访问依赖

3. **依赖追踪**:
   - 自动追踪计算属性 getter 中访问的状态路径
   - 支持显式声明依赖路径

4. **状态监听**:
   - `watch/` - watch API 监听路径或函数变化
   - `events/` - 事件系统监听状态操作 (get/set/delete/insert)
   - 支持批量更新优化 (BATCH_UPDATE_EVENT)

### React 集成模式

1. **创建 Store**:
```typescript
const { $, state, useReactive } = createStore({
    user: {
        firstName: "zhang",
        fullName: (scope) => scope.firstName + scope.lastName,
    },
});
```

2. **Signal 组件**:
   - `$('user.fullName')` 组件仅依赖变化时重新渲染
   - 实现位置: `react/src/signal/`

3. **Hooks 工厂模式**:
   - 所有 hooks 通过 `createUse{Xxx}(store)` 工厂函数创建
   - 自动绑定 store 实例，见 `store.tsx` 构造函数

### 构建配置

- **构建工具**: tsup (基于 esbuild)
- **输出格式**:
  - ESM (`dist/index.js`)
  - CommonJS (`dist/index.cjs`)
  - IIFE (`dist/index.global.js`) - 用于浏览器直接引入
  - TypeScript 声明文件 (`dist/index.d.ts`)

- **核心包特殊处理**:
  - 构建后自动复制 iife 文件到文档站点: `docs/public/autostore.js`
  - 显示 gzip 后的文件大小

## 开发规范

### 代码风格
- **代码注释语言**: 使用中文注释，请保持一致
- **TypeScript**: 全程严格模式，完整支持类型推断
- **格式化**: 使用 Prettier，配置见 `.prettierrc.js`
- **检查**: 使用 oxlint，配置见 `.oxlintrc.json`

### 包依赖关系
```
react -> core (workspace:*)
form -> core + syncer (workspace:*)
devtools -> core (workspace:*)
```

### 包引用规范
- 在 monorepo 内使用 `workspace:*` 协议
- React 包必须显式依赖 `autostore: workspace:*`

### 计算属性规范
- 同步计算使用函数: `fullName: (scope) => scope.firstName + scope.lastName`
- 异步计算使用 computed() 包装: `fullName: computed(async (scope) => ..., ["./firstName"])`

## Changesets 配置

- **固定版本包**: `autostore`, `@autostorejs/react`, `@autostorejs/syncer`, `@autostorejs/form`, `@autostorejs/devtools`
- 这些包的版本号会同步更新
- 内部依赖更新时使用 patch 版本

## 重要注意事项

1. **文档构建**: 修改核心包代码后需重新构建以更新文档站点的 autostore.js
2. **类型安全**: 核心包完整支持 TypeScript 类型推断，React hooks 提供基于路径的类型推导
3. **测试**: 所有单元测试使用中文命名
4. **版本同步**: 使用 Changesets 管理版本发布，确保核心包版本同步
5. **性能**: 支持细粒度更新，批量操作优化性能
6. **调试**: 提供 DevTools 集成和完整的调试工具链

## 项目特点

- **响应式**: 基于 Proxy 实现的细粒度响应式系统
- **原位计算**: 独特的原位计算功能，计算结果直接写入状态树
- **异步支持**: 强大的异步计算控制，支持高级特性
- **TypeScript**: 完整的 TypeScript 支持和类型推导
- **React 集成**: 提供完整的 React Hooks 和组件支持
- **开发体验**: 优秀的开发工具支持和调试体验
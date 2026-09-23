import { defineConfig } from 'vite'

// IIFE 单文件构建：不走 lib 模式（其默认 external 掉 dependencies），改为普通构建 + rollup iife 输出，
// 将 lit/autostore 全量捆绑进产物，供浏览器 <script> 直引。
// 注意：捆绑的 autostore 副本拥有独立的全局 store 注册表，store-id 绑定仅能找到同副本注册的 store，
// 浏览器直引场景建议通过 store 属性传入实例（后续如需再参照 form 的 core-iife 桥接方案）
export default defineConfig({
  build: {
    outDir: 'dist',
    // 追加写入：不清空 ESM 构建产物；public/ 资源不进发布产物
    emptyOutDir: false,
    copyPublicDir: false,
    rollupOptions: {
      input: 'src/index.ts',
      output: {
        format: 'iife',
        name: 'AutoStoreViewer',
        entryFileNames: 'index.global.js',
        inlineDynamicImports: true,
      },
    },
  },
})

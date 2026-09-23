import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// ESM 库构建：lit/autostore 保持 external（dependencies 默认即 external），消费方自备以避免重复实例
// dev server 以包根为 root（保证 vite build 输出仍为 dist/），启动时直接打开 examples/index.html 演示页
export default defineConfig({
  server: {
    open: '/examples/index.html',
  },
  plugins: [dts()],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    // rolldown 内核下 lib 模式不自动 external dependencies，须显式声明（lit 子路径导入须一并命中）
    rollupOptions: {
      external: [/^lit(\/|$)/, /^autostore(\/|$)/, /^flex-tools(\/|$)/],
    },
    // public/ 静态资源仅供 dev server 使用，不进发布产物
    copyPublicDir: false,
  },
})

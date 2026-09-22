import { defineConfig } from 'vite'

// dev server 以包根为 root（保证 vite build 输出仍为 dist/），
// 启动时直接打开 examples/index.html 演示页
export default defineConfig({
  server: {
    open: '/examples/index.html',
  },
})

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	root: '.', // 设置根目录为当前目录
	plugins: [],
	build: {
		outDir: 'dist',
		emptyOutDir: false,
	},
	server: {
		port: 3000,
		open: true,
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, '../src'), // 指向form包的src目录
		},
	},
	// 开发服务器配置
	optimizeDeps: {
		include: ['@shoelace-style/shoelace'],
	},
});
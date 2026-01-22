import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // 使用 monorepo 中的包
            'autostore': resolve(__dirname, '../../../core/src'),
            '@autostorejs/syncer': resolve(__dirname, '../../src'),
            '@autostorejs/react': resolve(__dirname, '../../../react/src'),
        },
    },
    server: {
        port: 3000,
        // SharedWorker 需要 CORS 支持
        cors: true,
        // 文件监听
        watch: {
            usePolling: true,
        },
    },
    worker: {
        format: 'es',
    },
    optimizeDeps: {
        exclude: ['autostore', '@autostorejs/syncer', '@autostorejs/react'],
    },
});

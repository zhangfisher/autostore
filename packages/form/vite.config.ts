import { defineConfig } from 'vite'
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server'


// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            name: 'autoform',
            entry: 'src/index.ts',
        },
        rollupOptions: {
            // external: /^lit/,
        },
    },
    resolve: {
        alias: {
            '@': '/src',
        }
    },
    plugins: [
        mockDevServerPlugin({
            formidableOptions: {
                uploadDir: './public/uploads',
                multiples: true
            }
        }),
    ],
    server: {
        proxy: {
            '^/api': 'http://example.com/',
            '^/upload': 'http://example.com/upload'
        },
    },
})
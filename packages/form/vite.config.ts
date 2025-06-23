import { defineConfig } from 'vite'

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
    }
})
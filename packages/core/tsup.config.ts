import { defineConfig } from 'tsup'
// import copy from "esbuild-copy-files-plugin";


export default defineConfig(
    {
        entry: [
            'src/index.ts'
        ],
        format: ['esm', 'cjs', 'iife'],
        dts: true,
        splitting: true,
        sourcemap: true,
        globalName: 'AutoStoreSpaces',
        clean: true,
        treeshake: true,
        minify: true,
        noExternal: ['flex-tools']
    }
)

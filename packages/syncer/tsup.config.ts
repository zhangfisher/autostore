import { defineConfig } from "tsup";
import path from "node:path";
import fs from "node:fs";
// import copy from "esbuild-copy-files-plugin";

export default defineConfig([
    {
        entry: ["src/index.ts"],
        format: ["esm", "cjs", "iife"],
        globalName: "AutoStoreSyncer",
        dts: { resolve: true },
        splitting: true,
        sourcemap: true,
        clean: true,
        treeshake: true,
        minify: true,
        noExternal: ["flex-tools"],
        onSuccess: async () => {
            // iife 产物复制到文档站点，供 html demo 的 <script> 与 shared-worker.js 引用
            fs.copyFileSync(path.resolve("./dist/index.global.js"), path.resolve("../../docs/public/syncer.js"));
        },
    },
    {
        entry: ["src/index.lite.ts"],
        format: ["esm", "cjs", "iife"],
        globalName: "AutoStoreSyncer",
        outDir: "dist/lite",
        dts: { resolve: true },
        splitting: true,
        sourcemap: true,
        clean: true,
        treeshake: true,
        minify: true,
        noExternal: ["flex-tools"],
    },
]);

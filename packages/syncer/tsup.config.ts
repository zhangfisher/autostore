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
        // 注意：lite 的 outDir(dist/lite) 嵌套在本 config 的 dist 内，
        // 两 config 并发 clean 的 glob 范围重叠会竞态删文件（ENOENT/段错误）。
        // 目录预清空由 package.json 的 build 脚本（rm -rf dist）在 tsup 启动前串行完成
        clean: false,
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
        clean: false, // 同上：预清空由 build 脚本统一负责，避免与主 config 的 clean 竞态
        treeshake: true,
        minify: true,
        noExternal: ["flex-tools"],
    },
]);

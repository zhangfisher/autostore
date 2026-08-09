import { gzip } from "zlib";
import { promisify } from "node:util";
import { readFileSync } from "node:fs";
import { defineConfig } from "tsup";
import path from "node:path";
import fs from "node:fs";

const gzipPromise = promisify(gzip);

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm", "cjs", "iife"],
    dts: { resolve: true },
    splitting: true,
    sourcemap: true,
    // IIFE 全局变量名（与 AutoStoreSpaces / AutoStoreSyncer 同风格）
    // 暴露：window.AutoTemplateSpaces.AutoTemplateEngine
    globalName: "AutoTemplateSpaces",
    clean: true,
    treeshake: true,
    minify: true,
    // 自包含策略：将 autostore(core) 与 really-relaxed-json 打包进产物，
    // 使文档站点 demo 仅需引入一个 template.js 即可运行（与 autoform.js 自包含策略一致）。
    noExternal: ["autostore", "really-relaxed-json"],
    onSuccess: async () => {
        const cjsFile = readFileSync("dist/index.cjs");
        const esmFile = readFileSync("dist/index.js");
        const iifeFile = readFileSync("dist/index.global.js");
        const cjsCompressed = await gzipPromise(cjsFile);
        const esmCompressed = await gzipPromise(esmFile);
        const iifeCompressed = await gzipPromise(iifeFile);
        console.log(`\x1b[33mGzipped size: \x1b[0m`);
        console.log(`  - cjs: \x1b[32m${(cjsCompressed.length / 1024).toFixed(2)} kB\x1b[0m`);
        console.log(`  - esm: \x1b[32m${(esmCompressed.length / 1024).toFixed(2)} kB\x1b[0m`);
        console.log(`  - iife: \x1b[32m${(iifeCompressed.length / 1024).toFixed(2)} kB\x1b[0m`);
        // 复制 IIFE 产物到文档站点公共资源，供 <demo html> 引入
        fs.copyFileSync(
            path.resolve("./dist/index.global.js"),
            path.resolve("../../docs/public/template.js"),
        );
    },
});

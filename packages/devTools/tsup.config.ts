import { defineConfig } from "tsup";

// 注意：必须使用单一配置对象包含所有入口
// 多个配置对象会为每个配置启动独立的 DTS worker，
// 它们并发 clean 同一个 dist 目录会引发 ENOENT/段错误竞态崩溃
export default defineConfig({
    entry: {
        index: "src/index.ts",
        cycleDetect: "src/cycleDetect.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    splitting: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: true,
});

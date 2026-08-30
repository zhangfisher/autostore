import { defineConfig } from "tsup";

// 单 config + 对象 entry：多 config 并发时各自的 clean 钩子会竞态删除
// dist 下同一批 d.ts 文件（tsup 的 existsSync+unlinkSync 非原子），导致偶发 ENOENT 构建失败
export default defineConfig({
    // key 作为输出 basename：index.js / asyncpro.js / shadow.js / trace.js
    entry: {
        index: "src/index.ts",
        asyncpro: "src/asyncpro/index.ts",
        shadow: "src/shadow.ts",
        trace: "src/trace.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: true,
    noExternal: ["flex-tools", "type-fest"],
});

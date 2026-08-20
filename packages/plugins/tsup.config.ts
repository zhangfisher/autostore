import { defineConfig, Options } from "tsup";

// import copy from "esbuild-copy-files-plugin";

const commonConfig: Options = {
    format: ["esm", "cjs"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
    minify: true,
    noExternal: ["flex-tools", "type-fest"],
};

export default defineConfig([
    {
        entry: ["src/index.ts"],
        ...commonConfig,
    },
    {
        // 对象形式 entry：key 作为输出 basename，
        // esm -> asyncpro.js / cjs -> asyncpro.cjs / dts -> asyncpro.d.ts
        entry: { asyncpro: "src/asyncpro/index.ts" },
        ...commonConfig,
    },
    {
        entry: ["src/refState.ts"],
        ...commonConfig,
        // IIFE 全局产物（AutoStorePluginsSpaces.refState）供文档站 demo 直接引入；
        // onSuccess 拷贝到 docs/public/plugins.js（与 template 包拷 template.js 同策略）
        format: ["esm", "cjs", "iife"],
        globalName: "AutoStorePluginsSpaces",
    },
    {
        entry: ["src/shadow.ts"],
        ...commonConfig,
    },
    {
        entry: ["src/resetable.ts"],
        ...commonConfig,
    },
    {
        entry: ["src/trace.ts"],
        ...commonConfig,
    },
]);

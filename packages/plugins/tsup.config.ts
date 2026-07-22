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

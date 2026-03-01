import { defineConfig } from "tsup";
// import copy from "esbuild-copy-files-plugin";

export default defineConfig([
    {
        entry: ["src/index.tsx"],
        format: ["esm", "cjs"],
        dts: { resolve: true },
        splitting: true,
        sourcemap: true,
        clean: true,
        treeshake: true,
        minify: true,
        noExternal: ["autostore"],
    },
]);

/**
 * per-widget IIFE 构建（ADR-0005 决策 4）
 *
 * 为什么独立于 tsup config 数组：
 * tsup 数组项无法按 39 个入口分别参数化 globals 映射，而每个 widget IIFE
 * 都需要把自己的 lit 系导入映射到 window.AutoFormCore 命名空间下，
 * 只能逐入口调 esbuild。
 *
 * 产物：dist/iife/widgets/{name}.global.js，全局名 AutoFormWidgets.{Pascal}
 * 依赖：页面必须先加载 dist/iife/core.global.js（AutoFormCore 命名空间），
 *       缺失时启动即抛出明确错误，而不是 Lit is not defined。
 *
 * 外部化范围（全部由 core.global.js 提供，保证 lit 单例与基类同源）：
 * - lit 系模块 → AutoFormCore.{lit, litDecorators, litDirectivesXxx, litContext}
 * - 包内公共模块（@/field、@/utils/tag、@/controllers/asyncState 等）
 *   → AutoFormCore.internals（core.global.js 尾部注入，键与模块导出名一致）
 */
import { build } from "esbuild";
import { gzip } from "zlib";
import { promisify } from "node:util";
import { readFileSync, mkdirSync, readdirSync, existsSync, copyFileSync } from "node:fs";
import path from "node:path";

const gzipPromise = promisify(gzip);

/** widget 名 → Pascal 键（cron → Cron，checkbox-group → CheckboxGroup） */
const widgetGlobalKey = (name: string) =>
    name
        .split("-")
        .map((seg) => seg[0].toUpperCase() + seg.slice(1))
        .join("");

const widgetFiles = readdirSync("src/widgets")
    .filter((f) => f.endsWith(".ts") && f !== "index.ts")
    .map((f) => f.replace(/\.ts$/, ""));

/**
 * lit 系模块 → AutoFormCore 成员名。
 * 成员是「模块导出对象的运行时命名空间」，widget 侧经 esbuild 的
 * import-externally-to-global（inject/banner 注入的 nsLit 等）取用。
 */
const LIT_GLOBALS: Record<string, string> = {
    lit: "lit",
    "lit/decorators.js": "litDecorators",
    "lit/directives/class-map.js": "litDirectivesClassMap",
    "lit/directives/if-defined.js": "litDirectivesIfDefined",
    "lit/directives/repeat.js": "litDirectivesRepeat",
    "lit/directives/style-map.js": "litDirectivesStyleMap",
    "lit/directives/unsafe-html.js": "litDirectivesUnsafeHTML",
    "lit/directives/when.js": "litDirectivesWhen",
    "@lit/context": "litContext",
};

/**
 * 包内公共模块 → AutoFormCore 成员名（必须是命名空间成员，见 core-iife.ts）。
 * 这些模块已在 core chunk 内（core 入口图锚定），widget IIFE 不得重复打包，
 * 否则出现两份 AutoField 基类（不同的 LitElement 子类谱系，context 失联）。
 * 注意：成员是 core-iife.ts 的命名空间导出（module.exports = ns 经 interop
 * 属性复制后 named import 才可达），不能映射到裸类/函数。
 */
const INTERNAL_GLOBALS: Record<string, string> = {
    "@/field": "Field",
    "@/field/dropdown": "FieldDropdown",
    "@/utils/tag": "UtilsTag",
    "@/controllers/asyncState": "ControllersAsyncState",
    "@/controllers": "Controllers",
    "@/utils/renderWidget": "UtilsRenderWidget",
    "@/utils/getInputValue": "UtilsGetInputValue",
    "@/form/vars": "FormVars",
};

/**
 * autostore 运行时 → AutoFormCore.AutoStoreNS（core.global.js 捆绑副本，ADR-0006）。
 * 现状 widget 对 autostore 的直接导入全是 type-only（产物中无实体引用），
 * 此 shim 是防御性的：未来 widget 直接 import core 运行时值时不断链，
 * 且必须桥接到 core 的捆绑副本——若随 widget 打包会出现两份 AutoStore 实现。
 */
const RUNTIME_GLOBALS: Record<string, string> = {
    autostore: "AutoStoreNS",
};

/** 启动守卫：core 未先行加载时给出明确指引（ADR-0005：依赖契约显式化） */
const GUARD = `if(typeof window.AutoFormCore==='undefined'){throw new Error('[autoform] AutoFormCore 未初始化：请先加载 core.global.js，再加载 widget 产物（见 ADR-0005 IIFE 双 script 用法）');}`;

async function main() {
    mkdirSync("dist/iife/widgets", { recursive: true });
    const sizes: Array<[string, number]> = [];

    for (const name of widgetFiles) {
        const specToBare: Record<string, string> = {};
        const preambleLines = ["var __core = window.AutoFormCore;"];
        let i = 0;
        for (const [spec, member] of Object.entries({ ...LIT_GLOBALS, ...INTERNAL_GLOBALS, ...RUNTIME_GLOBALS })) {
            const bare = `__af_ns${i++}`;
            specToBare[spec] = bare;
            preambleLines.push(`var ${bare} = __core.${member};`);
        }

        await build({
            entryPoints: [`src/widgets/${name}.ts`],
            bundle: true,
            format: "iife",
            target: ["es2020"],
            outfile: `dist/iife/widgets/${name}.global.js`,
            globalName: `AutoFormWidgets.${widgetGlobalKey(name)}`,
            sourcemap: true,
            minify: true,
            treeShaking: true,
            legalComments: "none",
            // 源码内的 @/ 路径别名
            alias: { "@": path.resolve("src") },
            // shoelace 组件与全量产物同策略：external，由页面从 CDN/本地按需引入；
            // 全量 autoform.js 也是 external（副作用 import 保留在产物头部）。
            // autostore 不在 external：经 RUNTIME_GLOBALS shim 桥接到 core 捆绑副本（ADR-0006）
            external: ["@shoelace-style/shoelace/*", "flex-tools"],
            banner: { js: `${GUARD}\n${preambleLines.join("\n")}` },
            plugins: [
                {
                    name: "core-globals-shim",
                    setup(builder) {
                        // 拦截全部外部化模块（lit 系 + 包内公共模块），
                        // 改写为对 preamble 绑定的裸全局变量的 re-export。
                        // 成员访问经 esbuild 依赖分析静态展开，
                        // __af_nsN.xxx 中的 xxx 与模块导出名一致
                        const allShims = { ...LIT_GLOBALS, ...INTERNAL_GLOBALS, ...RUNTIME_GLOBALS };
                        const filterSrcs = Object.keys(allShims)
                            .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
                            .join("|");
                        builder.onResolve({ filter: new RegExp(`^(${filterSrcs})$`) }, (args) => ({
                            path: args.path,
                            namespace: "core-shim",
                        }));
                        builder.onLoad({ filter: /.*/, namespace: "core-shim" }, (args) => {
                            const bare = specToBare[args.path];
                            return {
                                // esbuild 会因 tree-shaking 只保留实际被 import 的成员；
                                // 直接返回命名空间对象会导致绑定为动态访问而非静态 re-export，
                                // 因此用 CommonJS 桥：module.exports = bare（esbuild 支持 cjs 互操作）
                                contents: `module.exports = ${bare};`,
                                loader: "js",
                                resolveDir: ".",
                            };
                        });
                    },
                },
            ],
        });
        const buf = readFileSync(`dist/iife/widgets/${name}.global.js`);
        const gz = await gzipPromise(buf);
        sizes.push([name, gz.length / 1024]);
    }

    console.log(`\x1b[33m[widget-iife] Gzipped size: \x1b[0m`);
    for (const [name, kb] of sizes.sort((a, b) => b[1] - a[1])) {
        const flag = kb > 8 ? "\x1b[31m" : "\x1b[32m";
        console.log(`  - ${name}: ${flag}${kb.toFixed(2)} kB\x1b[0m`);
    }

    // 复制到文档站点供 split demo 按需引用（core.global.js 已由 tsup onSuccess 复制）
    const publicDir = path.resolve("../../docs/public/autoform");
    mkdirSync(publicDir, { recursive: true });
    for (const name of widgetFiles) {
        const src = `dist/iife/widgets/${name}.global.js`;
        if (existsSync(src)) copyFileSync(src, path.join(publicDir, `${name}.global.js`));
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});

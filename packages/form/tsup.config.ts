import { gzip } from "zlib";
import { promisify } from "node:util";
import { readFileSync } from "node:fs";
import { defineConfig } from "tsup";
import path from "node:path";
import fs from "node:fs";

const gzipPromise = promisify(gzip);

// ------------------------------------------------------------------
// 入口清单（ADR-0005 双打包策略）
// ------------------------------------------------------------------

/** 全量入口：core 全部 API + 39 个 widget 副作用注册 */
const FULL_ENTRY = "src/index.ts";
/** core 入口：表单框架 + 公共部分 + 默认 widget（input） */
const CORE_ENTRY = "src/core.ts";

/** 全部 widget 入口（排除聚合桶 index.ts） */
const widgetFiles = fs
    .readdirSync("src/widgets")
    .filter((f) => f.endsWith(".ts") && f !== "index.ts")
    .map((f) => f.replace(/\.ts$/, ""));

/** widget 名 → IIFE 全局命名空间下的 Pascal 键（cron → Cron，checkbox-group → CheckboxGroup） */
const widgetGlobalKey = (name: string) =>
    name
        .split("-")
        .map((seg) => seg[0].toUpperCase() + seg.slice(1))
        .join("");

/**
 * split ESM 入口表：{ core: ..., 'widgets/cron': ... }
 * 同一次构建 + splitting 使公共模块（基类/utils/lit）物理归入 core chunk
 */
const splitEntries: Record<string, string> = {
    core: CORE_ENTRY,
    ...Object.fromEntries(widgetFiles.map((name) => [`widgets/${name}`, `src/widgets/${name}.ts`])),
};

// ------------------------------------------------------------------
// IIFE：AutoFormCore 单一命名空间承载 lit 单例（ADR-0005 决策 4）
// ------------------------------------------------------------------

/**
 * core.global.js 的尾部引导脚本：把产物 exports（含 lit 系命名空间，
 * 由 src/core-iife.ts re-export）与公开 API 汇集到 window.AutoFormCore。
 * widget IIFE 的 preamble 绑定 __core.lit / __core.litDirectives['repeat'] 等
 * 成员路径，与 scripts/build-widget-iife.ts 的 LIT_GLOBALS 表一一对应。
 *
 * 两个必须注意的点（esbuild 把 footer 注入到 IIFE 闭包内部末尾）：
 * 1. 前导分号：上一语句若以 '}' 结尾（函数声明），无分号时
 *    '}(function(){...})()' 会被解析为对上一个函数的调用（ASI 陷阱），
 *    运行时抛 TypeError 且 footer 永不执行。
 * 2. 引用闭包参数 exports 而非外层全局名 AutoFormCoreExports：
 *    footer 位于闭包 return 之前，外层 var 此时尚未被赋值（闭包没执行完），
 *    读它只会拿到 undefined；闭包参数 exports 在此已填充完毕。
 */
const CORE_IIFE_FOOTER = `;void(function(){
    window.AutoFormCore = exports;
})();
`;

export default defineConfig([
    // ==============================================================
    // 1a. 全量 ESM（主入口 ./）：autostore 与 @autostorejs/plugins 保持
    //     external，re-export 解析到消费者自装的同一份单例（ADR-0006）
    // ==============================================================
    {
        entry: { index: FULL_ENTRY },
        format: ["esm"],
        dts: { resolve: true },
        splitting: true,
        sourcemap: true,
        // 注意：多 config 共享同一 dist 时禁用 tsup 的 clean——
        // 各 config 并发启动，clean 的 existsSync+unlinkSync 非原子会互相竞态删文件（ENOENT/段错误）。
        // 目录预清空由 package.json 的 build 脚本（rm -rf dist）在 tsup 启动前串行完成
        clean: false,
        treeshake: true,
        minify: true,
        noExternal: ["flex-tools", "lit", "@lit/context"],
        onSuccess: async () => {
            const esmFile = readFileSync("dist/index.js");
            const esmCompressed = await gzipPromise(esmFile);
            console.log(`\x1b[33m[full-esm] Gzipped size: \x1b[32m${(esmCompressed.length / 1024).toFixed(2)} kB\x1b[0m`);
        },
    },

    // ==============================================================
    // 1b. 全量 IIFE（./browser）：捆绑 autostore + 全量重导出（ADR-0006）
    //     单 script 即拿到 form + widget + autostore 完整生态；
    //     noExternal 显式声明捆绑意图，不依赖平台的 format 级默认行为。
    //     导出清单 = form 全量 ∪ autostore 全量（回归红线，快照见 ADR-0006）
    // ==============================================================
    {
        entry: { index: FULL_ENTRY },
        format: ["iife"],
        sourcemap: true,
        globalName: "AutoForm",
        clean: false,
        treeshake: true,
        minify: true,
        noExternal: ["flex-tools", "lit", "@lit/context", "autostore", "@autostorejs/plugins"],
        onSuccess: async () => {
            const iifeFile = readFileSync("dist/index.global.js");
            const iifeCompressed = await gzipPromise(iifeFile);
            console.log(`\x1b[33m[full-iife] Gzipped size: \x1b[32m${(iifeCompressed.length / 1024).toFixed(2)} kB\x1b[0m`);

            // 复制文件到文档站点（44 个 demo 依赖此链路）
            fs.copyFileSync(path.resolve("./dist/index.global.js"), path.resolve("../../docs/public/autoform.js"));
        },
    },

    // ==============================================================
    // 2. split ESM：core + 39 widget 入口共享 chunk（./widgets/* 出口）
    // ==============================================================
    {
        entry: splitEntries,
        format: ["esm"],
        dts: { resolve: true },
        splitting: true,
        sourcemap: true,
        treeshake: true,
        minify: true,
        noExternal: ["flex-tools", "lit", "@lit/context"],
        onSuccess: async () => {
            const coreFile = readFileSync("dist/core.js");
            const coreCompressed = await gzipPromise(coreFile);
            console.log(`\x1b[33m[split-esm] Gzipped size: \x1b[0m`);
            console.log(`  - core: \x1b[32m${(coreCompressed.length / 1024).toFixed(2)} kB\x1b[0m`);
            // 逐 widget 输出，超阈值(8KB)的标红提示（大户单列例外，见 ADR-0005）
            for (const name of widgetFiles) {
                try {
                    const buf = readFileSync(`dist/widgets/${name}.js`);
                    const gz = await gzipPromise(buf);
                    const kb = gz.length / 1024;
                    const flag = kb > 8 ? "\x1b[31m" : "\x1b[32m";
                    console.log(`  - ${name}: ${flag}${kb.toFixed(2)} kB\x1b[0m`);
                } catch {
                    // 文件不存在时跳过（如聚合入口无产物）
                }
            }
        },
    },

    // ==============================================================
    // 3. split IIFE：core.global.js（lit 宿主 + AutoFormCore 命名空间）
    //    入口用 core-iife.ts：额外 re-export lit 系命名空间到 exports，
    //    尾部脚本把 exports 挂为 window.AutoFormCore（widget IIFE 消费）。
    //    ADR-0006：autostore 随包捆绑（平铺 API + AutoStoreNS 命名空间），
    //    split 场景同样单（双）script 化，去掉 autostore.js 前置标签
    // ==============================================================
    {
        entry: { core: "src/core-iife.ts" },
        format: ["iife"],
        outDir: "dist/iife",
        globalName: "AutoFormCoreExports",
        sourcemap: true,
        treeshake: true,
        minify: true,
        noExternal: ["flex-tools", "lit", "@lit/context", "@autostorejs/plugins", "autostore"],
        esbuildOptions(options) {
            options.footer = { js: CORE_IIFE_FOOTER };
        },
        onSuccess: async () => {
            const coreFile = readFileSync("dist/iife/core.global.js");
            const coreCompressed = await gzipPromise(coreFile);
            console.log(`\x1b[33m[split-iife] core Gzipped: \x1b[32m${(coreCompressed.length / 1024).toFixed(2)} kB\x1b[0m`);

            // 复制到文档站点供 split demo 消费
            // （widget 产物由 scripts/build-widget-iife.ts 产出后自行复制，晚于 tsup）
            fs.mkdirSync(path.resolve("../../docs/public/autoform"), { recursive: true });
            fs.copyFileSync(path.resolve("./dist/iife/core.global.js"), path.resolve("../../docs/public/autoform/core.global.js"));
        },
    },
]);

// ==============================================================
// 4. per-widget IIFE：tsup 数组内无法按 39 入口参数化 globals 映射，
//    由独立构建步骤（scripts/build-widget-iife.ts）以 esbuild 直出，
//    输出 dist/iife/widgets/*.global.js，全局名 AutoFormWidgets.{Pascal}
// ==============================================================
export { widgetFiles, widgetGlobalKey, CORE_ENTRY };

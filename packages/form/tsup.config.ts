import { gzip } from "zlib";
import { promisify } from "node:util";
import { readFileSync } from "node:fs";
import { defineConfig } from "tsup";
import path from "node:path";
import fs from "node:fs";

const gzipPromise = promisify(gzip);
// import Sonda from 'sonda/esbuild';

const themeproPath = path.join(import.meta.dirname, `node_modules/themepro/dist`);
console.log("themeproPath=", themeproPath);
export default defineConfig([
	{
		entry: ["src/index.ts"],
		format: ["esm", "cjs", "iife"],
		dts: { resolve: true },
		splitting: true,
		sourcemap: true,
		globalName: "AutoForm",
		clean: true,
		treeshake: true,
		minify: true,
		noExternal: ["flex-tools", "lit", "@lit/context"],
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

			fs.copyFileSync(path.join(themeproPath, "index.css"), path.resolve("./dist/index.css"));
			fs.copyFileSync(path.join(themeproPath, "light.css"), path.resolve("./dist/light.css"));
			fs.copyFileSync(path.join(themeproPath, "red.css"), path.resolve("./dist/red.css"));
			fs.copyFileSync(path.join(themeproPath, "blue.css"), path.resolve("./dist/blue.css"));
			fs.copyFileSync(path.join(themeproPath, "dark.css"), path.resolve("./dist/dark.css"));

			fs.copyFileSync(path.resolve("./dist/index.global.js"), path.resolve("../../docs/public/autoform.js"));
			fs.copyFileSync(path.join(themeproPath, "index.css"), path.resolve("../../docs/public/autoform.css"));
		},
	},
]);

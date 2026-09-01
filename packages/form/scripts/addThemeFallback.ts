/**
 * 为 themeMap.ts 中重定向到 ThemePro 的 --t-* 变量补充 shoelace 官方默认值回退
 *
 * 背景：themeMap 把全部 --sl-* 令牌重映射到 ThemePro 的 --t-* 变量。
 * 当宿主页面未安装 ThemePro 时，var(--t-*) 无回退 → 自定义属性变为
 * guaranteed-invalid → shoelace 组件所有颜色/尺寸令牌失效（组件裸奔）。
 *
 * 转换：--sl-X: var(--t-Y);  →  --sl-X: var(--t-Y, <官方--sl-X值>);
 * ThemePro 存在时优先生效，不存在时回落 shoelace 官方 light 主题值。
 */
import { readFileSync, writeFileSync } from "fs";

const SL = "E:/Work/Code/autostore/packages/form/node_modules/@shoelace-style/shoelace/dist/themes/light.css";
const THEME_MAP = "E:/Work/Code/autostore/packages/form/src/styles/themeMap.ts";

// 1. 解析官方 light.css 的令牌值
const officialCss = readFileSync(SL, "utf-8");
const official = new Map<string, string>();
for (const m of officialCss.matchAll(/(--sl-[a-z0-9-]+):\s*([^;]+);/g)) {
	official.set(m[1], m[2].trim());
}

// 2. 重写 themeMap.ts 中形如 --sl-X: var(--t-Y); 的行
let src = readFileSync(THEME_MAP, "utf-8");
let patched = 0;
const missed: string[] = [];
src = src.replace(/(--sl-[a-z0-9-]+):\s*var\((--t-[a-z0-9-]+)\);/g, (full, slName: string, tName: string) => {
	const fallback = official.get(slName);
	if (!fallback) {
		missed.push(`${slName} -> ${tName}`);
		return full;
	}
	patched++;
	return `${slName}: var(${tName}, ${fallback});`;
});

writeFileSync(THEME_MAP, src);
console.log(`已回退 ${patched} 个令牌`);
console.log(`未找到官方值 ${missed.length} 个:`);
missed.forEach((m) => console.log("  " + m));

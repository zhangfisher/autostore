/**
 * CSS 颜色解析工具
 *
 * ## 为何手写、不依赖原生
 *
 * 需求是"把任意合法 CSS 颜色按指定 alpha 合成"（如遮罩底色 = bgColor 的 alpha 通道）。
 * 两条原生路径在**测试环境（happy-dom）**都不可用，故自包含解析以保证 **生产浏览器与
 * happy-dom 测试行为一致**：
 *
 * - `getComputedStyle(el).color`：happy-dom **不规范化**——`"red"` 读回仍是 `"red"`、
 *   `"hsl(...)"` 仍是 hsl、`"oklch(...)"` 被静默吞成 `"white"`，无法当解析器；
 * - CSS `color-mix()`：happy-dom 视为非法值**直接丢弃**（`style.background` 变空串），
 *   连渲染都做不到。
 *
 * 故本模块手写 hex / rgb() / hsl() / 常用颜色名 的解析，返回三通道数组，供调用方合成。
 * 不支持的现代语法（oklch / color() / lab 等）返回 null，调用方回退默认色。
 */

/** RGB 三通道类型别名 */
export type RGB = readonly [number, number, number];

/**
 * 常用 CSS 颜色名表（CSS Level 1-3 常用子集）。
 *
 * 生僻名走 hex/rgb/hsl 分支，仍不可识别则由调用方回退默认色。
 * 导出供需要颜色名查找的场景复用。
 */
export const NAMED_COLORS: Record<string, RGB> = {
    black: [0, 0, 0],
    white: [255, 255, 255],
    red: [255, 0, 0],
    green: [0, 128, 0],
    blue: [0, 0, 255],
    yellow: [255, 255, 0],
    cyan: [0, 255, 255],
    magenta: [255, 0, 255],
    gray: [128, 128, 128],
    grey: [128, 128, 128],
    orange: [255, 165, 0],
    pink: [255, 192, 203],
    purple: [128, 0, 128],
    brown: [165, 42, 42],
    lime: [0, 255, 0],
    navy: [0, 0, 128],
    teal: [0, 128, 128],
    gold: [255, 215, 0],
    silver: [192, 192, 192],
    maroon: [128, 0, 0],
    olive: [128, 128, 0],
    indigo: [75, 0, 130],
    tomato: [255, 99, 71],
    coral: [255, 127, 80],
};

/** hex（#rgb / #rgba / #rrggbb / #rrggbbaa）→ [r,g,b]，丢弃 alpha 通道；非法返回 null */
export function hexToRgb(hex: string): RGB | null {
    let h = hex.replace("#", "").trim();
    // 短格式展开：#rgb → #rrggbb、#rgba → #rrggbbaa
    if (h.length === 3 || h.length === 4) {
        h = h
            .split("")
            .map((c) => c + c)
            .join("");
    }
    if (h.length < 6) return null;
    h = h.slice(0, 6); // #rrggbbaa 仅取前 6 位（丢弃 alpha）
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
    return [r, g, b];
}

/** hsl(h,s%,l%) → [r,g,b]（入参 h 为 0~360，s/l 为 0~100，内部归一化） */
export function hslToRgb(h: number, s: number, l: number): RGB {
    const sat = s / 100;
    const light = l / 100;
    const k = (n: number): number => (n + h / 30) % 12;
    const a = sat * Math.min(light, 1 - light);
    const f = (n: number): number =>
        light - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

/**
 * 解析任意合法 CSS 颜色为 [r,g,b]。
 *
 * 支持：hex（全形态）/ rgb() / rgba() / hsl() / hsla() / 常用颜色名。
 * 不支持（返回 null）：oklch / color() / lab 等现代语法——调用方回退默认色。
 *
 * @returns 三通道数组；不可识别返回 null
 */
export function parseColor(input: string): RGB | null {
    if (typeof input !== "string") return null;
    const s = input.trim().toLowerCase();
    if (!s) return null;
    if (s.startsWith("#")) return hexToRgb(s);
    // rgb()/rgba()：支持逗号或空格分隔（含现代 `/ alpha` 语法仅取前三通道）
    const rgbMatch = s.match(/^rgba?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*[, ]\s*([\d.]+)/);
    if (rgbMatch) {
        const r = Number(rgbMatch[1]);
        const g = Number(rgbMatch[2]);
        const b = Number(rgbMatch[3]);
        if ([r, g, b].some(Number.isNaN)) return null;
        return [r, g, b];
    }
    // hsl()/hsla()
    const hslMatch = s.match(/^hsla?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)%\s*[, ]\s*([\d.]+)%/);
    if (hslMatch) {
        const h = Number(hslMatch[1]);
        const sat = Number(hslMatch[2]);
        const l = Number(hslMatch[3]);
        if ([h, sat, l].some(Number.isNaN)) return null;
        return hslToRgb(h, sat, l);
    }
    if (NAMED_COLORS[s]) return [...NAMED_COLORS[s]];
    return null;
}

/**
 * 合成 `rgba(color, alpha)`：color 经 parseColor 解析为三通道，alpha 经 clamp 到 [0,1]。
 *
 * parseColor 失败（不可识别颜色）时回退黑色——这是"alpha 合成"场景的合理默认
 * （典型用途如 loading 遮罩底色默认即黑）。
 *
 * @param color 任意合法 CSS 颜色字符串
 * @param alpha 不透明度，超出 [0,1] 会被 clamp
 */
export function rgba(color: string, alpha: number): string {
    const rgb = parseColor(color) ?? [0, 0, 0];
    const a = Math.max(0, Math.min(1, alpha));
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`;
}

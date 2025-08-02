/**
 * 将十六进制颜色转换为HSL格式
 * @param hex 十六进制颜色字符串
 * @returns HSL颜色对象 {h, s, l}
 */
function hexToHSL(hex: string): { h: number; s: number; l: number } {
    // 移除可能的 # 前缀
    hex = hex.replace(/^#/, '');

    // 解析十六进制值
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    // 找出最大和最小RGB分量
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    };
}

/**
 * 将HSL颜色转换为十六进制格式
 * @param h 色相 (0-360)
 * @param s 饱和度 (0-100)
 * @param l 亮度 (0-100)
 * @returns 十六进制颜色字符串
 */
function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0;
    let g = 0;
    let b = 0;

    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    const toHex = (value: number) => {
        const hex = value.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * 生成主题色梯度
 * @param color 基准颜色 (--sl-pricolor-primary-500)
 * @returns 包含从50到950的颜色梯度的对象
 */
export function generatePrimaryColors(color: string) {
    // 将基准颜色转换为HSL
    const baseHSL = hexToHSL(color);
    // 基于示例中的梯度模式，定义各级别的HSL调整
    const adjustments = {
        '50': { hDiff: 3.3, sFactor: 0.74, lFactor: 0.44 },
        '100': { hDiff: 3.7, sFactor: 0.82, lFactor: 0.59 },
        '200': { hDiff: 3.0, sFactor: 0.88, lFactor: 0.65 },
        '300': { hDiff: 3.4, sFactor: 0.94, lFactor: 0.76 },
        '400': { hDiff: 2.4, sFactor: 0.94, lFactor: 0.93 },
        '500': { hDiff: 0.0, sFactor: 1.0, lFactor: 1.0 }, // 基准色
        '600': { hDiff: -1.0, sFactor: 1.14, lFactor: 1.2 },
        '700': { hDiff: -1.0, sFactor: 1.16, lFactor: 1.48 },
        '800': { hDiff: -0.9, sFactor: 1.16, lFactor: 1.73 },
        '900': { hDiff: -1.2, sFactor: 1.16, lFactor: 1.89 },
        '950': { hDiff: -13.7, sFactor: 1.16, lFactor: 2.0 },
    };
    const result: Record<string, string> = {};
    // 生成每个级别的颜色
    for (const [level, adjustment] of Object.entries(adjustments)) {
        const h = Math.max(0, Math.min(360, baseHSL.h + adjustment.hDiff));
        const s = Math.max(0, Math.min(100, baseHSL.s * adjustment.sFactor));
        const l = Math.max(0, Math.min(100, baseHSL.l * adjustment.lFactor));

        result[`--sl-color-primary-${level}`] = hslToHex(h, s, l);
    }
    return result;
}

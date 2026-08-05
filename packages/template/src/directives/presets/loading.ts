import { AutoTemplateDirectiveBase } from "../base";
import { toJson } from "really-relaxed-json";

/**
 * x-loading：在宿主元素上覆盖一个「加载中」层。
 *
 * 两态绑定：
 * - **快速绑定** `x-loading="order.isSubmit"` / `x-loading="isLoading"`：整值即 visible 表达式，
 *   其余配置全默认。配合 x-data 的局部变量或 store 路径均可（`scope.watch` 自动识别路径/表达式，
 *   自动注入 localScope / dataScope）。
 * - **配置绑定** `x-loading="{ visible:'isLoading', message:'正在加载', bgColor:'white',
 *   color:'red', opacity:0.5, delay:300 }"`：字段化配置，visible 必填。
 *
 * **值类型判定**：`this.value` 去空白后以 `{` 开头 → 配置绑定（really-relaxed-json 解析），
 * 否则 → 快速绑定（整值作 visible 表达式）。
 *
 * **显隐**：visible 求值为 truthy → 挂载覆盖层；falsy → 移除覆盖层 DOM（重建式，非 display 隐藏）。
 *
 * **修饰符**：`.screen` → 覆盖层 `position:fixed;inset:0` 撑满视口（留在宿主子树，不 teleport）。
 *
 * 详见 `docs/x-loading.md`。
 *
 * @example 快速绑定
 * <div x-loading="order.isSubmit"></div>
 * // state.order.isSubmit=true → 挂载覆盖层；=false → 移除
 *
 * @example 配置绑定（白色半透明遮罩 + 红色 loader + 防闪烁）
 * <div x-loading="{ visible:'isLoading', bgColor:'white', color:'red', delay:300 }"></div>
 *
 * @example 全屏 loading
 * <div x-loading.screen="{ visible:'pageLoading', message:'加载中…' }"></div>
 */

/** 全局样式 <style> 的 id（首次实例化时注入一次，常驻不回收） */
const STYLES_ID = "x-loading-styles";
/** 覆盖层根节点 class */
const OVERLAY_CLASS = "x-loading-overlay";
/** 全屏修饰符追加 class（覆盖 position 为 fixed） */
const SCREEN_CLASS = "x-loading-screen";
/** 居中盒子 class（纵向排列 loader + message） */
const BOX_CLASS = "x-loading-box";
/** 旋转圆环 class（颜色经 currentColor 注入） */
const LOADER_CLASS = "x-loading-loader";
/** 可选文本 class */
const MESSAGE_CLASS = "x-loading-message";
/** 旋转动画名（独立命名空间，避免与宿主页面 keyframes 冲突） */
const SPIN_KEY = "x-loading-spin";

/** 默认配置（与 docs/x-loading.md 规格一致） */
const DEFAULTS = {
    bgColor: "black",
    color: "#888",
    opacity: 0.5,
    delay: 0,
    zIndex: 9999,
} as const;

/** 配置绑定字段（visible 必填，其余可选） */
interface LoadingConfig {
    /** visible 表达式（路径或表达式），配置绑定下必填，缺失则 warn 不生效 */
    visible: string;
    message?: string;
    bgColor?: string;
    color?: string;
    opacity?: number;
    delay?: number;
}

/** 模块级样式注入标志：进程内只注入一次 */
let stylesInjected = false;

/**
 * 注入全局样式（首次实例化调用，幂等）。
 *
 * loader 颜色用 `currentColor`（替换给定 CSS 里硬编码的 `#ffa516`），
 * 由 loader 元素的 `style.color` 注入；`-webkit-mask`/`mask` 不含色调，原样保留。
 */
function injectStyles(): void {
    if (stylesInjected) return;
    if (typeof document === "undefined" || !document.head) return;
    if (document.getElementById(STYLES_ID)) {
        stylesInjected = true;
        return;
    }
    const style = document.createElement("style");
    style.id = STYLES_ID;
    style.textContent = `
.${OVERLAY_CLASS} {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${DEFAULTS.zIndex};
}
.${OVERLAY_CLASS}.${SCREEN_CLASS} {
  position: fixed;
}
.${BOX_CLASS} {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.${LOADER_CLASS} {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, currentColor 94%, #0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%, currentColor);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
          mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: ${SPIN_KEY} 1s infinite linear;
}
@keyframes ${SPIN_KEY} {
  100% { transform: rotate(1turn); }
}
.${MESSAGE_CLASS} {
  color: #fff;
  font-size: 14px;
  line-height: 1.4;
}`;
    document.head.appendChild(style);
    stylesInjected = true;
}

/**
 * 常用 CSS 颜色名表（CSS Level 1-3 常用子集）。
 *
 * 自包含、不依赖 getComputedStyle/canvas——happy-dom 颜色规范化与生产环境不一致，
 * 自建表保证测试与生产行为一致。生僻名走 hex/rgb/hsl 分支，仍不可识别则回退黑色。
 */
const NAMED_COLORS: Record<string, readonly [number, number, number]> = {
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
function hexToRgb(hex: string): [number, number, number] | null {
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
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
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
 * 不可识别返回 null（调用方回退默认色）。
 *
 * 导出供测试直接验证解析正确性。
 */
export function parseColor(input: string): [number, number, number] | null {
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
 * 合成 `rgba(bgColor, alpha)`：bgColor 经 parseColor 解析为三通道，alpha 经 clamp 到 [0,1]。
 * parseColor 失败时回退黑色（与 DEFAULTS.bgColor 一致）。
 */
function rgba(color: string, alpha: number): string {
    const rgb = parseColor(color) ?? [0, 0, 0];
    const a = Math.max(0, Math.min(1, alpha));
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`;
}

export class LoadingDirective extends AutoTemplateDirectiveBase {
    static override readonly priority = 0;
    static override readonly singleton = true;

    /** 当前已挂载的覆盖层（未挂载时为 null）；delay 窗口期内仍为 null */
    private overlay: HTMLElement | null = null;
    /** delay 定时器句柄（延迟挂载未触发时存在） */
    private delayTimer: ReturnType<typeof setTimeout> | null = null;
    /** 解析后的配置（created 中赋值，definite assignment） */
    private config!: LoadingConfig;

    override created(): void {
        injectStyles();
        this.config = this.parseConfig();
        // 配置绑定缺 visible / 快速绑定为空值 → 不订阅、不生效（仅 warn）
        if (!this.config.visible) {
            this.engine.logger.warn(
                `x-loading: 缺少 visible 表达式（值="${this.value}"），指令不生效`,
            );
            return;
        }
        // watch 返回当前值做首渲；后续变化经 scheduler flush 回调 toggle
        const initial = this.binding.watch(this.config.visible, ({ value }) => {
            this.toggle(!!value);
        });
        this.toggle(!!initial);
    }

    /** 解析指令值：对象语法 → 配置绑定；否则 → 快速绑定（整值即 visible） */
    private parseConfig(): LoadingConfig {
        const raw = String(this.value ?? "").trim();
        if (raw.startsWith("{")) return this.parseObject(raw);
        return { visible: raw };
    }

    /** 解析对象配置（really-relaxed-json）；非对象/抛错 → warn + 空 visible */
    private parseObject(raw: string): LoadingConfig {
        try {
            const parsed: unknown = JSON.parse(toJson(raw));
            if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
                this.engine.logger.warn(`x-loading: 对象配置必须解析为对象，得到 ${JSON.stringify(parsed)}`);
                return { visible: "" };
            }
            const obj = parsed as Record<string, any>;
            return {
                visible: typeof obj.visible === "string" ? obj.visible : "",
                message: typeof obj.message === "string" ? obj.message : undefined,
                bgColor: typeof obj.bgColor === "string" ? obj.bgColor : undefined,
                color: typeof obj.color === "string" ? obj.color : undefined,
                opacity: typeof obj.opacity === "number" ? obj.opacity : undefined,
                delay: typeof obj.delay === "number" ? obj.delay : undefined,
            };
        } catch (e: any) {
            this.engine.logger.warn(`x-loading: 对象配置解析失败: ${e?.message ?? e}`);
            return { visible: "" };
        }
    }

    /** 显隐总入口 */
    private toggle(show: boolean): void {
        show ? this.show() : this.hide();
    }

    /**
     * 显示覆盖层。
     *
     * 已挂载（overlay 非空）或延迟窗口期内（delayTimer 非空）直接返回，防重复。
     * delay>0 时 setTimeout 延迟挂载；否则立即挂载。
     */
    private show(): void {
        if (this.overlay || this.delayTimer) return;
        const delay = this.config.delay ?? DEFAULTS.delay;
        if (delay > 0) {
            this.delayTimer = setTimeout(() => {
                this.delayTimer = null;
                this.mountOverlay();
            }, delay);
            return;
        }
        this.mountOverlay();
    }

    /**
     * 隐藏：取消未触发的延迟挂载；移除已挂载的覆盖层。
     *
     * delay 窗口内回 false → 定时器取消、覆盖层从未挂载（防闪烁）。
     */
    private hide(): void {
        if (this.delayTimer) {
            clearTimeout(this.delayTimer);
            this.delayTimer = null;
        }
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
        }
    }

    /** 构建并挂载覆盖层到宿主；幂等（已挂载直接返回） */
    private mountOverlay(): void {
        if (this.overlay) return;
        const el = this.el;
        if (!el) return;

        const bgColor = this.config.bgColor ?? DEFAULTS.bgColor;
        const opacity = this.config.opacity ?? DEFAULTS.opacity;
        const color = this.config.color ?? DEFAULTS.color;
        const screen = this.modifiers?.includes("screen");

        const overlay = document.createElement("div");
        overlay.className = OVERLAY_CLASS + (screen ? ` ${SCREEN_CLASS}` : "");
        // 遮罩底色 + alpha：映射为 bgColor 的 alpha 通道（非元素 opacity，保证 loader/文字清晰）
        overlay.style.background = rgba(bgColor, opacity);

        const box = document.createElement("div");
        box.className = BOX_CLASS;

        const loader = document.createElement("div");
        loader.className = LOADER_CLASS;
        // loader 动画色：currentColor 取此 color，gradient 两处随之变色
        loader.style.color = color;
        box.appendChild(loader);

        // message 可选：不传则不渲染文本节点（默认无文字）
        if (this.config.message) {
            const msg = document.createElement("div");
            msg.className = MESSAGE_CLASS;
            msg.textContent = this.config.message;
            box.appendChild(msg);
        }

        overlay.appendChild(box);
        el.appendChild(overlay);
        this.overlay = overlay;
    }

    /** 销毁：清延迟定时器 + 移除覆盖层 DOM（watcher 由 scope 统一 off） */
    override destroy(): void {
        if (this.delayTimer) {
            clearTimeout(this.delayTimer);
            this.delayTimer = null;
        }
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
        }
    }
}

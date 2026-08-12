import { AutoTemplateDirectiveBase, DirectiveKind, type RuntimeDirective } from "../base";
import type { AutoTemplateEngine } from "../../engine";
import { isSimpleStatePath } from "../../scope";
import { getVal, type Watcher } from "autostore";
import { rgba } from "../../utils/colors";
import { toJson } from "really-relaxed-json";

/**
 * x-loading：在宿主元素上覆盖一个「加载中」层。（**运行时指令**，走 observer 通道）
 *
 * **运行时语义**（详见 docs/adr/0001-directive-kind-system.md、0003-engine-event-bus.md）：
 * - 编译器致盲——`x-loading` 属性**保留**在结果 DOM 上，允许通过 DOM API
 *   （`setAttribute` / `removeAttribute`）改值或删除，运行时动态生效。
 * - observer 通道由 **engine 级 RuntimeObserverDispatcher** 统一管理（ADR-0003 决策 7）：
 *   engine.el 上单一共享 MutationObserver 监听所有 runtime 指令的增/删/属性变化，
 *   add→`mounted`、remove→`unmounted`、值变→`attrChanged`，并广播 `directive/loading/**`。
 *   指令**不再自建 observer**——只实现三个生命周期钩子。
 * - 反应式来源为 **`engine.store`（全局绝对路径/表达式）**——运行时无 scope，不支持
 *   x-data 局部变量 / x-for item 等 scope 相对表达式。
 *
 * 两态绑定：
 * - **快速绑定** `x-loading="order.isSubmit"` / `x-loading="isLoading"`：整值即 visible 表达式，
 *   其余配置全默认。visible 经 `engine.store` 求值。
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
 * **已知限制**：修饰符形式 `x-loading.screen` 的运行时**值变化**不触发 attrChanged
 * （共享 observer 的 attributeFilter 仅含裸 `x-loading`）；其增/删仍生效。
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

/** 全局样式 <style> 的 id（首次 initialize 时注入一次，常驻不回收） */
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
    /** visible 表达式（全局路径或表达式），配置绑定下必填，缺失则 warn 不生效 */
    visible: string;
    message?: string;
    bgColor?: string;
    color?: string;
    opacity?: number;
    delay?: number;
    /**
     * 覆盖层挂载目标选择器（默认挂宿主）：
     * - 普通值（如 `'#target'`）→ `宿主.querySelector(selector)`，在宿主后代上显示；
     * - 以 `@` 开头（如 `'@#modal'`）→ `document.querySelector(去掉@的部分)`，在宿主外/全局元素上显示；
     * - 选择器未命中或非法 → 回退到宿主元素显示。
     */
    selector?: string;
}

/** 模块级样式注入标志：进程内只注入一次 */
let stylesInjected = false;

/**
 * 注入全局样式（initialize 首次调用，幂等）。
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

export class LoadingDirective extends AutoTemplateDirectiveBase implements RuntimeDirective {
    /** 运行时指令：走 observer 通道（由 engine 级 RuntimeObserverDispatcher 驱动，见 ADR-0003 决策 7） */
    static override readonly kind = DirectiveKind.Runtime;

    /**
     * 类级初始化：注入全局样式。
     *
     * observer 通道（observer + 实例表 + 初始扫描）已移交 engine 级 RuntimeObserverDispatcher，
     * 指令不再自建。样式注入须在 dispatcher 初始扫描（触发首次 mounted → mountOverlay）**之前**完成
     * ——FOUC 防御；initializeAll 在 dispatcher.start() 之前调用，顺序保证。幂等（stylesInjected）。
     */
    static override initialize(_engine: AutoTemplateEngine): void {
        injectStyles();
    }

    /** 当前已挂载的覆盖层（未挂载时为 null）；delay 窗口期内仍为 null */
    private overlay: HTMLElement | null = null;
    /** delay 定时器句柄（延迟挂载未触发时存在） */
    private delayTimer: ReturnType<typeof setTimeout> | null = null;
    /** 解析后的配置（mounted 中赋值，definite assignment） */
    private config!: LoadingConfig;
    /** visible 当前值的读取函数（路径支路 getVal / 表达式支路 with(state) 求值） */
    private _read!: () => any;

    /** 元素挂载（dispatcher 检测到 add / 初始扫描）：解析配置 + 字面量/反应式分流 + 首渲 */
    override mounted(): void {
        this.config = this.parseConfig();
        // 字面量模式：裸 x-loading ≡ "true"、显式 "true"/"false" 为特殊布尔值（非状态路径）→ 静态显隐，无订阅
        const literal = this.resolveLiteral(this.config.visible);
        if (literal !== null) {
            this.toggle(literal);
            return;
        }
        // 反应式模式：visible 为全局 store 路径/表达式
        this._bindVisible();
        this.toggle(!!this._read());
    }

    /**
     * 判定 visible 是否为字面量布尔。
     *
     * - 空（裸 `x-loading` / 未指定 visible）≡ `true`：符合"加了就显示"的直觉；
     * - `true` / `false`（大小写不敏感）为特殊布尔字面量，**非**状态路径——便于静态快速控制显隐；
     * - 其余返回 null → 走反应式（`engine.store` 全局路径/表达式）。
     *
     * @returns true/false 表示字面量静态显隐；null 表示走反应式订阅
     */
    private resolveLiteral(visible: string): boolean | null {
        const v = (visible ?? "").trim();
        if (v === "") return true; // 裸属性 / 缺省 ≡ true
        const lv = v.toLowerCase();
        if (lv === "true") return true;
        if (lv === "false") return false;
        return null;
    }

    /** 元素移除（dispatcher 检测到 remove）：清理订阅 / 定时器 / 覆盖层 DOM */
    override unmounted(): void {
        this._teardown();
    }

    /** 属性值变化（dispatcher 检测到 setAttribute）：拆旧绑定后重新挂载（保留 el / 修饰符） */
    attrChanged(newVal: string, _oldVal?: string): void {
        this._teardown();
        this.value = newVal;
        if (this.info) this.info.value = newVal;
        this.mounted();
    }

    /**
     * 建立 visible 订阅（engine.store 全局，无 scope）。
     *
     * - 路径支路（isSimpleStatePath）→ `store.watch(path)` 精准订阅，`getVal` 读当前值；
     * - 表达式支路（如 `a && !b`）→ `collectDependencies` 收集读依赖后订阅（仅全局 state，
     *   不支持 scope 局部变量）。回调经 toggle 显隐。
     */
    private _bindVisible(): void {
        const store = this.engine.store;
        const expr = this.config.visible;
        const onChange = () => this.toggle(!!this._read());
        if (isSimpleStatePath(expr)) {
            this._read = () => getVal(store.state, expr);
            this.watchers.push(store.watch(expr, onChange));
        } else {
            const getter = new Function("scope", `with(scope){ return (${expr}); }`) as (scope: any) => any;
            this._read = () => {
                try {
                    return getter(store.state);
                } catch (e: any) {
                    this.engine.logger.warn(`x-loading: eval "${expr}" failed: ${e?.message ?? e}`);
                    return undefined;
                }
            };
            const deps = store.collectDependencies(() => {
                this._read();
            }, "read");
            this.watchers.push(store.watch(deps, onChange));
        }
    }

    /** 清理本实例全部资源：off watcher + 清 delay 定时器 + 移除覆盖层 DOM */
    private _teardown(): void {
        for (const w of this.watchers) {
            try {
                (w as Watcher).off?.();
            } catch {
                /* 忽略已 off 的 watcher */
            }
        }
        this.watchers.length = 0;
        if (this.delayTimer) {
            clearTimeout(this.delayTimer);
            this.delayTimer = null;
        }
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
        }
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
                selector: typeof obj.selector === "string" ? obj.selector : undefined,
            };
        } catch (e: any) {
            this.engine.logger.warn(`x-loading: 对象配置解析失败: ${e?.message ?? e}`);
            return { visible: "" };
        }
    }

    /** 显隐总入口 */
    private toggle(show: boolean): void {
        if (show) this.show();
        else this.hide();
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

    /** 构建并挂载覆盖层到目标元素（selector 命中或宿主）；幂等（已挂载直接返回） */
    private mountOverlay(): void {
        if (this.overlay) return;
        const target = this.resolveTarget();
        if (!target) return;

        const bgColor = this.config.bgColor ?? DEFAULTS.bgColor;
        const opacity = this.config.opacity ?? DEFAULTS.opacity;
        const color = this.config.color ?? DEFAULTS.color;
        const screen = this.modifiers?.includes("screen");

        const overlay = document.createElement("div");
        overlay.className = OVERLAY_CLASS + (screen ? ` ${SCREEN_CLASS}` : "");
        // 遮罩底色 + alpha：映射为 bgColor 的 alpha 通道（非元素 opacity，保证 loader/文字清晰）
        overlay.style.background = rgba(bgColor, opacity);

        // 内容：优先消费 loading 块（ADR-0021 跨指令供体协议），未命中回退内置 loader。
        const content = this._buildContent(color);
        overlay.appendChild(content);

        target.appendChild(overlay);
        this.overlay = overlay;
    }

    /**
     * 构建覆盖层内容：loading 块（自定义）优先，未命中回退内置 loader（块兜底，ADR-0021）。
     *
     * 块消费协议：经 `engine.lookupBlock(el, 'loading')` 沿宿主 scope 的 parent 链就近查找。
     * 命中 → 深克隆块快照 → 经 `compiler.compileChild` 编译挂载（块根的 x-scope 确保其建 scope、
     * 块内 x-text 等指令随编译生效，parentScope 为宿主 scope 使块继承宿主数据上下文）。
     * 未命中 / 宿主无 scope → 内置旋转 loader + 可选 message。
     *
     * 块模式下遮罩底色仍由 overlay 承担（x-loading 的视觉壳），块仅替换「 loader + message」内容。
     *
     * @param color 内置 loader 的动画色（块模式下忽略，块自定义其视觉）
     * @returns 已编译的块根元素，或内置 box 元素
     */
    private _buildContent(color: string): HTMLElement {
        // 块消费：宿主须建过 scope 才能经 engine.lookupBlock 反查（Runtime 指令无 binding）。
        const snapshot = this.el ? this.engine.lookupBlock(this.el, "loading") : undefined;
        if (snapshot) {
            // 块快照含指令属性（x-scope + 用户写的 x-text 等），深克隆后编译。
            // compileChild：把块根当 itemTemplate 编译、挂宿主 scope 为 parent（继承上下文）。
            const scope = this.engine.findScopeByEl(this.el!);
            if (scope) {
                const clone = snapshot.cloneNode(true) as HTMLElement;
                const { el: compiled } = this.engine.compiler.compileChild(clone, scope, {});
                return compiled;
            }
            // 宿主无 scope（理论上 lookupBlock 命中即有 scope，兜底降级内置）
        }
        return this._buildBuiltinContent(color);
    }

    /** 内置覆盖层内容：旋转 loader + 可选 message（块兜底的缺省形态） */
    private _buildBuiltinContent(color: string): HTMLElement {
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
        return box;
    }

    /**
     * 解析覆盖层挂载目标元素。
     *
     * - 无 selector → 宿主元素 `this.el`；
     * - selector 以 `@` 开头 → `document.querySelector(去@)`，支持挂到宿主外/全局元素；
     * - 其余 → `宿主.querySelector(selector)`，挂到宿主后代；
     * - 未命中 / 非法选择器 → 回退宿主（命中失败不抛错、记 warn）。
     */
    private resolveTarget(): HTMLElement | null {
        const host = this.el;
        if (!host) return null;
        const sel = this.config.selector;
        if (!sel) return host;
        const isGlobal = sel.startsWith("@");
        const query = isGlobal ? sel.slice(1) : sel;
        if (!query) return host; // 空 selector（如裸 "@"）→ 宿主
        try {
            const root: ParentNode = isGlobal ? document : host;
            const found = root.querySelector(query);
            return found instanceof HTMLElement ? found : host; // 未命中 → 回退宿主
        } catch (e: any) {
            // 非法选择器（querySelector 抛 SyntaxError）→ 回退宿主，避免中断
            this.engine.logger.warn(`x-loading: 非法 selector "${sel}"，回退到宿主元素: ${e?.message ?? e}`);
            return host;
        }
    }
}

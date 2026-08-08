import type { WrapperModifierDesc } from "../types";

/**
 * `.feedback`：async action 执行反馈（ADR-0008）。
 *
 * `@click.feedback="save"` 启用后，捕获 business handler 的返回值（action 返回的 Promise），
 * 自动在目标元素加 `pending`/`resolved`/`rejected` 类，可选叠加 x-loading overlay。
 *
 * **信号源 = 返回值捕获**（非订阅全局 `actions/<name>/*` 事件）：
 * - 全局事件按 name 广播，致同名 action 多元素串扰（点其一、订阅者全亮）；
 * - 返回值捕获精确到本次触发，统一同步/异步的「开始」语义。
 *
 * **同步/异步统一**（ADR-0013）：同步成功 settle resolved、同步抛错 settle rejected、
 * async enter(pending 常驻) + 终态。**终态一致**（减少心智负担），pending 仅 async（同步无加载窗口，
 * 强加 pending 会瞬时闪烁）。同步抛错经 eval.ts action catch rethrow 冒泡至此（eval 已 logger），
 * settle rejected 后吞掉不 rethrow——无 .feedback 时由 OnDirective/debounce 兜底防 uncaught。
 *
 * **`order: Infinity`** 固定 wrapper 链最内层（最靠近 business），确保拿到原始返回值；
 * 若居 debounce 等异步 wrapper 外层，`next(event)` 拿到的是异步 wrapper 返回的 undefined。
 *
 * **状态机**：pending 常驻 → resolved/rejected 终态 → `timeout` 后清终态类（`timeout:0` 终态常驻）。
 * pending 类**不受 timeout 清除**（action 在跑就显，清除会制造"没在跑"假象）。
 *
 * **重入**（pending 中再触发）：`gen` 单调递增，Promise 回调校验 `my === gen` 才生效，
 * 旧 Promise 的 resolve/reject 被忽略（旧 Promise 不取消，仅元素侧忽略）。
 *
 * **配置**经 `x-on-options="{feedback:{...}}"` 或宿主 `x-options`（两层回退，ADR-0007）：
 * `{ at, timeout, pendingClass, resolvedClass, rejectedClass, loading }`。`.feedback` 裸修饰符 = 全默认。
 */
export default {
    name: "feedback",
    type: "wrapper",
    order: Infinity,
    apply: (next, rt, cleanup) => {
        const cfg = resolveFeedbackConfig(rt.options?.feedback);
        const el = rt.el;
        const termClasses = [cfg.resolvedClass, cfg.rejectedClass];

        let gen = 0;
        let termTimer: ReturnType<typeof setTimeout> | null = null;
        /** loading 防闪烁：缓存当前 set 的 x-loading 属性值，相同则不重复 set（避免 attrChanged 触发 overlay teardown+remount 闪烁） */
        let currentLoadingAttr: string | null = null;

        const clearTermTimer = () => {
            if (termTimer) {
                clearTimeout(termTimer);
                termTimer = null;
            }
        };
        /** 写 x-loading 属性（命令式 overlay 模式，ADR-0008 决策 8）；相同值跳过防闪烁 */
        const applyLoading = (target: HTMLElement) => {
            if (cfg.loading === false || cfg.loading === undefined) return;
            const attr = cfg.loading === true ? "true" : JSON.stringify(cfg.loading);
            if (currentLoadingAttr === attr) return;
            target.setAttribute("x-loading", attr);
            currentLoadingAttr = attr;
        };
        const removeLoading = (target: HTMLElement) => {
            if (currentLoadingAttr === null) return;
            target.removeAttribute("x-loading");
            currentLoadingAttr = null;
        };

        // pending 进入：清终态类与终态计时器 → 加 pending 类 → 叠加 overlay
        const enter = () => {
            clearTermTimer();
            const t = resolveTarget(el, cfg.at);
            t.classList.remove(...termClasses);
            t.classList.add(cfg.pendingClass);
            applyLoading(t);
        };
        // 终态（resolved/rejected）：清 pending → 加终态类 → 移除 overlay → 若 timeout>0 启计时清终态
        const settle = (cls: string) => {
            clearTermTimer();
            const t = resolveTarget(el, cfg.at);
            t.classList.remove(cfg.pendingClass);
            t.classList.add(cls);
            removeLoading(t);
            if (cfg.timeout > 0) {
                termTimer = setTimeout(() => {
                    t.classList.remove(cls);
                    termTimer = null;
                }, cfg.timeout);
            }
        };
        // destroy 清理：清计时器 + 移除全部 feedback 类 + 移除 overlay
        const stripAll = () => {
            clearTermTimer();
            const t = resolveTarget(el, cfg.at);
            t.classList.remove(cfg.pendingClass, ...termClasses);
            removeLoading(t);
        };

        cleanup.cancel = stripAll;

        return (event: Event) => {
            // 同步/异步统一（ADR-0013）：同步成功 settle resolved、同步抛错 settle rejected；
            // async enter(pending 常驻) + 终态。同步抛错经 eval.ts rethrow 冒泡至此（eval 已 logger），
            // settle rejected 后吞掉不 rethrow——避免 uncaught（无 .feedback 时由 OnDirective/debounce 兜底）。
            let ret: any;
            try {
                ret = next(event);
            } catch {
                settle(cfg.rejectedClass);
                return;
            }
            if (ret && typeof ret.then === "function") {
                const my = ++gen;
                enter();
                // 在同一 Promise 上挂 then（buildAction 已挂 then 广播，互不干扰；onRejected 消费 reject 不产生 unhandled）
                ret.then(
                    () => my === gen && settle(cfg.resolvedClass),
                    () => my === gen && settle(cfg.rejectedClass),
                );
                return ret;
            }
            // 同步成功：直接终态（无 pending 常驻——同步瞬时，pending 无加载态意义）
            settle(cfg.resolvedClass);
            return ret;
        };
    },
} as WrapperModifierDesc;

/** 默认反馈配置（与 ADR-0008 一致） */
const DEFAULTS = {
    timeout: 0,
    pendingClass: "pending",
    resolvedClass: "resolved",
    rejectedClass: "rejected",
} as const;

/** 归一化后的反馈配置 */
interface ResolvedFeedbackConfig {
    /** 目标元素选择器：省略=宿主；普通=宿主.closest；@开头=document.querySelector */
    at?: string;
    /** 终态类延时清除(ms)，0=不清(常驻)；pending 类不受影响 */
    timeout: number;
    pendingClass: string;
    resolvedClass: string;
    rejectedClass: string;
    /** false(默认)=仅类名；true=默认 overlay；对象=带配置 overlay（命令式 x-loading） */
    loading?: false | true | Record<string, any>;
}

/**
 * 归一化 feedback 配置。
 *
 * `options.feedback` 来自 ADR-0007 的修饰符注入 / x-on-options / x-options 两层回退：
 * - `.feedback` 裸修饰符 → `options.feedback === true` → 全默认；
 * - `x-on-options="{feedback:{...}}"` → 对象 → 合并默认值。
 */
function resolveFeedbackConfig(raw: any): ResolvedFeedbackConfig {
    const cfg: ResolvedFeedbackConfig = { ...DEFAULTS };
    if (raw && typeof raw === "object") {
        if (typeof raw.at === "string") cfg.at = raw.at;
        if (typeof raw.timeout === "number") cfg.timeout = raw.timeout;
        if (typeof raw.pendingClass === "string") cfg.pendingClass = raw.pendingClass;
        if (typeof raw.resolvedClass === "string") cfg.resolvedClass = raw.resolvedClass;
        if (typeof raw.rejectedClass === "string") cfg.rejectedClass = raw.rejectedClass;
        if (raw.loading !== undefined) cfg.loading = raw.loading;
    }
    return cfg;
}

/**
 * 解析目标元素（ADR-0008 决策 6）。
 *
 * - 省略 → 宿主 `el`；
 * - `@` 开头 → `document.querySelector(去@)`，挂到宿主外/全局元素（与 x-loading 的 `@` 前缀对齐）；
 * - 其余 → `el.closest(串)`，从宿主（含自身）向上找祖先（适合给祖先容器加类）；
 * - 未命中 / 非法选择器 → 静默回退 `el`（健壮不中断，与 x-loading selector 回退语义一致）。
 */
function resolveTarget(el: HTMLElement, at: string | undefined): HTMLElement {
    if (!at) return el;
    try {
        if (at.startsWith("@")) {
            const found = document.querySelector(at.slice(1));
            return found instanceof HTMLElement ? found : el;
        }
        const found = el.closest(at);
        return found instanceof HTMLElement ? found : el;
    } catch {
        return el; // 非法选择器（closest/querySelector 抛 SyntaxError）静默回退宿主
    }
}

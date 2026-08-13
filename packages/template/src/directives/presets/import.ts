import { AutoTemplateDirectiveBase } from "../base";

/**
 * 判定 x-import 值是否为**字面量 url**（不经表达式求值，ADR-0022 决策六）。
 *
 * 典型 url 形态：以 `/` `./` `../` 开头（相对/绝对路径）、`http:` `https:` 协议、或纯域名路径。
 * 这类值直接作 url 加载，避免被表达式求值误解析（`/cmp.html` 当正则、`http://` 当注释等）。
 * 含空白/花括号/运算符的值视为表达式（响应式 url，watch 求值）。
 */
function isLiteralUrl(raw: string): boolean {
    if (/\s/.test(raw)) return false; // 含空白 → 表达式
    if (raw.startsWith("/") || raw.startsWith("./") || raw.startsWith("../")) return true;
    if (/^https?:\/\//i.test(raw) || /^file:\/\//i.test(raw)) return true;
    // 纯标识符段 + .html 等（如 localhost/c.html、a.html）→ 字面量
    return /^[\w.:@-]+(?:[/?#][\w.:@-]*)*$/.test(raw) && !/[{}()=]/.test(raw);
}

/**
 * x-import：远程组件加载指令（ADR-0022 决策六）。
 *
 * fetch 远程 url 加载组件定义（fetched HTML 内可含 1-N 个 `<div x-component>`），注册到当前 engine：
 *
 * - **作用域组件**（默认 `<div x-import="url">`）：注册到最近祖先 scope.components，仅本作用域可见；
 * - **全局组件**（`.global` 修饰符 `<div x-import.global="url">`）：注册到 engine.options.components，
 *   全引擎复用。
 *
 * url 支持**响应式**（经 `scope.watch` 求值，支持路径/表达式/x-data 局部）；url 变化 → 重新加载。
 * 加载经 `engine.importComponentsFromUrl`（url 缓存 + 循环 import 检测 + `<script setup>`/`<style>` 提取），
 * 注册后广播 `component/registered`，供 pending 的 x-use 重新实例化（异步占位 R6=B）。
 *
 * **声明性指令**：x-import 本身不渲染（无 DOM 输出），仅副作用（加载注册）。`name` 属性可选——
 * 若声明则加载完成后校验该名组件已注册（未注册 warn）。
 *
 * **fetch 失败容错**（决策六-6）：网络错误/HTTP 非 2xx → warn + 该 url 组件视为未注册（不阻断其余）。
 *
 * @example 作用域组件加载
 * <div x-import="/components.html"></div>
 * @example 全局组件加载
 * <div x-import.global="/global-components.html"></div>
 */
export class ImportDirective extends AutoTemplateDirectiveBase {
    /** 优先级与 x-use 协同（70）：import 须在编译期尽早发起，但不占子树 */
    static override readonly priority = 75;
    static override readonly singleton = true;

    /** 当前在途加载的 AbortController（url 变化 / scope 销毁时 abort 丢弃过期结果） */
    private abortCtrl?: AbortController;
    /** 当前加载的 url（去重 + 变化检测） */
    private currentUrl: string | null = null;

    /** .global 修饰符（经解析期注入为 options.global，ADR-0007） */
    private get globalMode(): boolean {
        return !!this.getOption("global");
    }

    override created() {
        const raw = this.value == null ? "" : String(this.value).trim();
        if (raw === "") {
            this.engine.logger.warn(`x-import: 缺少 url，已跳过。`);
            return;
        }
        // 值解析双轨（同 x-use，ADR-0022 决策六）：
        // - 字面量 url（如 `/cmp.html`、`./a.html`、`http://x/c.html`）→ 直接加载，不经表达式求值
        //   （避免 `/cmp.html` 被当正则字面量、`http://...` 被当注释）；
        // - 含表达式特征（空白、花括号、状态变量等）→ watch 求值得 url（响应式）。
        if (isLiteralUrl(raw)) {
            this._load(raw);
            return;
        }
        // 表达式：watch 求值得 url（响应式，url 变化重载）
        const initialUrl = this.binding.watch(this.value, ({ value: url }) => {
            this._load(url);
        });
        this._load(initialUrl);
    }

    /**
     * 加载 url：abort 旧请求 → 调 engine.importComponentsFromUrl 注册组件。
     *
     * url 假/空 → 跳过；有效 url → 异步加载注册（url 缓存 + 循环检测由 engine 负责）。
     */
    private async _load(url: any): Promise<void> {
        const urlStr = url == null ? "" : String(url).trim();
        if (urlStr === "" || urlStr === this.currentUrl) return;
        // abort 旧请求（虽 engine 内部有 url 缓存与循环检测，但保留 abort 以防 future 扩展）
        this.abortCtrl?.abort();
        const myCtrl = (this.abortCtrl = new AbortController());
        this.currentUrl = urlStr;
        try {
            // 作用域组件注册到最近祖先 scope（this.binding.parent），使同层兄弟 x-use 可见；
            // 全局组件忽略 ownerScope（注册到 engine.options.components）。
            await this.engine.importComponentsFromUrl(
                urlStr,
                this.globalMode ? null : this.binding.parent,
                this.globalMode,
            );
            // 校验 name 属性声明的组件是否注册成功（可选诊断）
            const expectedName = this.el.getAttribute("name");
            if (expectedName) {
                const found = this.binding.getComponent(expectedName);
                if (!found) {
                    this.engine.logger.warn(
                        `x-import: url "${urlStr}" 加载完成，但未找到 name 属性声明的组件 "${expectedName}"。`,
                    );
                }
            }
        } catch (e: any) {
            if (myCtrl.signal.aborted) return;
            this.engine.logger.warn(`x-import: 加载 "${urlStr}" 失败: ${e?.message ?? e}`);
        } finally {
            if (this.abortCtrl === myCtrl) this.abortCtrl = undefined;
        }
    }

    override destroy(): void {
        this.abortCtrl?.abort();
        this.abortCtrl = undefined;
    }
}

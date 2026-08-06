import { AutoTemplateDirectiveBase } from "../base";
import { sanitizeHtml } from "../../utils/sanitize";

/**
 * x-html：将状态值作为原始 HTML 注入元素的 innerHTML。（**默认消毒**，见 ADR-0005）
 *
 * 与 x-text 同构：`created` 经 `scope.watch` 订阅（纯路径走精准 watch，表达式走
 * collectDependencies），用返回的当前值首渲；后续变化由 scheduler 微任务合并后 patch。
 * 差别仅 patch 写 `innerHTML`（解析为 DOM），而非 x-text 的 `textContent`（转义文本）。
 *
 * **安全姿态（safe-by-default）**：默认经 `engine.options.sanitizer`（缺省 = 内置极简
 * `sanitizeHtml`，剥 `<script>`、`on*` 事件属性、危险协议 URL）消毒后再写 innerHTML——与本引擎 `{{}}`
 * 插值默认 XSS 安全（ADR-0004 决策 6）的哲学一致。注入**受信内容**时用 `.raw` 修饰符
 * 退出消毒、原样写入：`<div x-html.raw="trustedHtml"></div>`。
 *
 * **不编译注入内容**：注入 HTML 为静态快照，不递归走转换器/不建 scope/不注册 watcher。
 *
 * **与 x-text 同元素**：x-html 确定性胜出（x-text 让步 no-op，见 ADR-0005 决策 6）。
 *
 * **`<script>` 不执行**：`innerHTML=` 本就不执行脚本（浏览器约束），默认消毒还会剥除。
 */
export class HtmlDirective extends AutoTemplateDirectiveBase {
    static override readonly priority = 0;
    static override readonly singleton = true;

    override created() {
        if (this.value == null || this.value === "") return;
        // .raw 退出消毒（原样写入）；否则用 engine 注入的 sanitizer，缺省回退内置极简
        const sanitize = this.modifiers?.includes("raw") ? null : this.engine.options.sanitizer ?? sanitizeHtml;
        const write = (value: any) => {
            if (!this.el) return;
            const text = value == null ? "" : String(value);
            this.el.innerHTML = sanitize ? sanitize(text) : text;
        };
        const initial = this.binding.watch(this.value, ({ value }) => write(value));
        write(initial);
    }
}

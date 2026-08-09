import { AutoTemplateDirectiveBase } from "../base";
import { sanitizeHtml } from "../../utils/sanitize";
import { createEmptyRenderer } from "../utils/emptyPlaceholder";

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
 * **空值占位（ADR-0014）**：与 x-text 同构——`emptyValues`（默认 `[null, undefined, NaN]`）内的值
 * 渲染 `empty` 占位（默认空串，**也过 sanitize**）；`.hide` 修饰符空值隐藏宿主。空值/隐藏逻辑与
 * x-text 共享 `createEmptyRenderer`，差别仅写内容走 `innerHTML`（± sanitize）。
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
        // .raw 退出消毒（原样写入）；否则用 engine 注入的 sanitizer，缺省回退内置极简。
        // 统一经 getOption 读取（ADR-0007 决策 1，消旧式 modifiers.includes 技术债）。
        const sanitize = this.getOption("raw") ? null : this.engine.options.sanitizer ?? sanitizeHtml;
        const apply = createEmptyRenderer(
            this.el,
            this.getOption("emptyValues"),
            String(this.getOption("empty") ?? ""),
            !!this.getOption("hide"),
            (text) => {
                if (this.el) this.el.innerHTML = sanitize ? sanitize(text) : text;
            },
        );
        const initial = this.binding.watch(this.value, ({ value }) => apply(value));
        apply(initial);
    }
}

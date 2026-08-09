import { AutoTemplateDirectiveBase } from "../base";
import { createEmptyRenderer } from "../utils/emptyPlaceholder";

/**
 * x-text：将状态值绑定为元素的 textContent。
 *
 * `created` 时经 `scope.watch` 订阅（纯路径走精准 watch，表达式走 collectDependencies），
 * 并用返回的当前值做首次渲染；后续变化由 scheduler 微任务合并后 patch。
 *
 * **空值占位（ADR-0014）**：绑定求值结果落在 `emptyValues`（默认 `[null, undefined, NaN]`）内时，
 * 渲染 `empty` 指定的占位内容（默认空串），可经 `x-text-options="{empty:'没有数据'}"` 配置；
 * `emptyValues` 可自定义判空集（如纳入 `0`）。`.hide` 修饰符启用时，空值改为隐藏宿主
 * （`display:none`，恢复时还原原内联 display）；二者并存 `.hide` 优先。空值/隐藏逻辑与 x-html
 * 共享 `createEmptyRenderer`（DRY）。动态 fallback 用主表达式 `x ?? msg`（empty 不响应式）。
 */
export class TextDirective extends AutoTemplateDirectiveBase {
    static override readonly priority = 0;
    static override readonly singleton = true;

    override created() {
        // x-html 确定性胜出：同元素并存 x-html 时 x-text 让步 no-op（ADR-0005 决策 6），
        // 避免二者 per-tick 竞争写内容（last-writer-wins）导致非确定行为。
        if (this.binding.directives.some((d) => d.info.name === "html")) return;
        if (this.value == null || this.value === "") return;
        const apply = createEmptyRenderer(
            this.el,
            this.getOption("emptyValues"),
            String(this.getOption("empty") ?? ""),
            !!this.getOption("hide"),
            (text) => {
                if (this.el) this.el.textContent = text;
            },
        );
        const initial = this.binding.watch(this.value, ({ value }) => apply(value));
        apply(initial);
    }
}

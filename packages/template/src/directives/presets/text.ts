import { AutoTemplateDirectiveBase } from "../base";

/**
 * x-text：将状态值绑定为元素的 textContent。
 *
 * `created` 时经 `scope.watch` 订阅（纯路径走精准 watch，表达式走 collectDependencies），
 * 并用返回的当前值做首次渲染；后续变化由 scheduler 微任务合并后 patch。
 */
export class TextDirective extends AutoTemplateDirectiveBase {
    static override readonly priority = 0;
    static override readonly singleton = true;

    override created() {
        // x-html 确定性胜出：同元素并存 x-html 时 x-text 让步 no-op（ADR-0005 决策 6），
        // 避免二者 per-tick 竞争写内容（last-writer-wins）导致非确定行为。
        if (this.binding.directives.some((d) => d.info.name === "html")) return;
        if (this.value == null || this.value === "") return;
        const initial = this.binding.watch(this.value, ({ value }) => {
            if (this.el) this.el.textContent = value == null ? "" : String(value);
        });
        if (this.el) this.el.textContent = initial == null ? "" : String(initial);
    }
}

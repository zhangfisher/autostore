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
        if (this.value == null || this.value === "") return;
        const initial = this.binding.watch(this.value, ({ value }) => {
            if (this.el) this.el.textContent = value == null ? "" : String(value);
        });
        if (this.el) this.el.textContent = initial == null ? "" : String(initial);
    }
}

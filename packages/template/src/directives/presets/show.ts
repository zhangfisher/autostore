import { AutoTemplateDirectiveBase } from "../base";

/**
 * x-show：条件可见性。控制宿主**是否可见**，宿主**永留 DOM**。
 *
 * 假时 `display:none`——仍占 `:nth-child` 计数位、仍被表单提交、`querySelector` 仍命中——
 * 子树与 watcher 全保留、最轻量。与 x-if 的**条件存在性**（假时摘宿主 detach、离开 DOM）
 * 正交：x-show 切「可见性」，x-if 切「存在性」。
 *
 * **独立指令**——历史上 x-show 曾是 `x-if.keep` 的解析期别名（`getDirectives` 归一化为
 * `if` + `keep` 修饰符），把存在性（detach）与可见性（display:none）两个正交概念合并成
 * 一指令两态，造成 `.keep` 语义反复。现拆分：x-show 独立为可见性指令（display:none），
 * `x-if.keep` 升级为存在性指令（detach 保活）。详见 ADR-0016。
 *
 * 不占子树（ownsChildren=false），可与 x-for 同元素共存（x-for 占子树，本指令只切容器 display）。
 */
export class ShowDirective extends AutoTemplateDirectiveBase {
    static override readonly priority = 80;
    static override readonly singleton = true;

    override created() {
        if (this.value == null) return;
        const initial = this.binding.watch(this.value, ({ value }) => {
            this.toggle(!!value);
        });
        this.toggle(!!initial);
    }

    /** 仅切 display，宿主、子树、watcher 全保留 */
    private toggle(show: boolean) {
        if (this.el) this.el.style.display = show ? "" : "none";
    }
}

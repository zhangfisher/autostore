// oxlint-disable no-unused-expressions
import { AutoTemplateDirectiveBase } from "../base";
import type { AutoDirectiveInfo } from "../types";
import type { AutoTemplateScope } from "../../scope";

/**
 * x-if：条件渲染。元素本身永远作为锚点留在 DOM，仅切换其**子树**与显隐。
 *
 * 两态（由 `.keep` 修饰符切换；`x-show` 是 `x-if.keep` 的解析期别名）：
 *
 * - **eager（默认 `x-if="expr"`）**——结构指令（ownsChildren）。
 *   - true → 编译并挂载子树（经 `compiler.compileSubtree`）；
 *   - false → `display:none` + 移除子树 DOM + 销毁子 scope（子树 watcher 一并 off）。
 *   - 控制订阅留在自身 scope（永活），仅 destroy/recreate **子** scope，避免"自杀"；
 *   - 仅精确移除自身编译挂载的节点，不误删兄弟指令（如 x-text 写入的 textContent）；
 *   - 与 x-for 同元素禁止（语义冲突，compiler 抛错），改用 `x-show`/`x-if.keep` 或外层包裹。
 *
 * - **keep（`x-if.keep` 或别名 `x-show`）**——仅切 `display`，子树与 watcher 全保留（v1 行为）。
 *   不占 ownsChildren，可与 x-for 共存（x-for 独占子树，本指令只切容器 display）。
 *
 * 注意：叶子元素（无子树，如 `<hr x-if>`、`<input x-if>`）两态等价——均退化为 `display:none`。
 */
export class IfDirective extends AutoTemplateDirectiveBase {
    static override readonly priority = 80;
    static override readonly singleton = true;

    /** eager 模式才占有子树；`.keep`/`x-show`/`x-if-options="{keep:true}"` 不占有（仅切 display） */
    static override ownsChildren(info: AutoDirectiveInfo): boolean {
        // keep 经解析期注入为 info.options.keep（modifier 与指令选项等价，ADR-0007）。
        // 静态方法早于 scope 实例，仅读指令级 options，不支持 x-options 宿主回退（编译期局限）。
        return info.options?.keep !== true;
    }

    /** eager 模式下本指令编译挂载的子树节点，false 时按此精确移除 */
    private subtreeNodes: Node[] = [];

    private get keepMode(): boolean {
        // `.keep` modifier 与 x-if-options="{keep:true}" 经 getOption 等价（ADR-0007）
        return !!this.getOption("keep");
    }

    override created() {
        if (this.value == null) return;
        const initial = this.binding.watch(this.value, ({ value }) => {
            this.toggle(!!value);
        });
        this.toggle(!!initial);
    }

    private toggle(show: boolean) {
        this.keepMode ? this.toggleDisplay(show) : this.toggleEager(show);
    }

    /** keep 模式（x-if.keep / x-show）：仅切 display，子树与 watcher 不动（v1 行为） */
    private toggleDisplay(show: boolean) {
        if (this.el) this.el.style.display = show ? "" : "none";
    }

    /**
     * eager 模式：true→编译挂载子树；false→移除子树 DOM + 销毁子 scope。
     * 仅操作自身挂载的 subtreeNodes，不触碰兄弟指令写入的内容（如 x-text 的 textContent）。
     */
    private toggleEager(show: boolean) {
        const el = this.el;
        const tpl = this.template;
        if (!el || !tpl) return;
        if (show) {
            // 子树未挂载时才编译（防止重复 true 的二次编译）
            if (this.subtreeNodes.length === 0) {
                this.subtreeNodes = this.engine.compiler.compileSubtree(el, tpl, this.binding);
            }
            el.style.display = "";
        } else {
            // 先销毁子 scope（子树 watcher 批量 off），再精确移除自身挂载的节点
            this.destroyChildren();
            // @ts-ignore
            for (const node of this.subtreeNodes) node.remove();
            this.subtreeNodes = [];
            el.style.display = "none";
        }
    }

    /**
     * 销毁当前作用域的全部子作用域（仅子树），不动自身控制 watcher。
     * ownsChildren 保证本 scope 的 children 恰为编译出的子树 scope 集合。
     */
    private destroyChildren() {
        const children: Set<AutoTemplateScope> = this.binding.children;
        for (const child of children) child.destroy();
        children.clear();
    }
}

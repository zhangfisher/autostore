// oxlint-disable no-unused-expressions
import { AutoTemplateDirectiveBase } from "../base";
import type { AutoDirectiveInfo } from "../types";
import type { AutoTemplateScope } from "../../scope";

/**
 * x-if：条件存在性。元素本身随条件**离开/回到 DOM**（detach/reattach），非 display:none。
 *
 * 两态（由 `.keepalive` 修饰符切换）均**摘除宿主 + 锚点注释占位**，区别在子树保活与否：
 *
 * - **eager（默认 `x-if="expr"`）**——结构指令（ownsChildren）。
 *   - true → 编译并挂载子树（经 `compiler.compileSubtree`）；
 *   - false → 摘除宿主（el.remove）+ 锚点注释占位 + 销毁子 scope（子树 watcher 一并 off）。
 *   - 控制订阅留在自身 scope（永活），仅 destroy/recreate **子** scope，避免"自杀"；
 *   - 与 x-for 同元素禁止（语义冲突，compiler 抛错），改用 `x-show`/`x-if.keepalive`（均不占子树）或外层包裹。
 *
 * - **keepalive（`x-if.keepalive`）**——摘宿主但**保活子树与 watcher**，true 时原宿主 reattach（状态保留）。
 *   不占 ownsChildren，可与 x-for 共存（x-for 独占子树，本指令只切容器存在性）。
 *
 * **宿主 scope 兼任锚点**：控制 watcher 留 `this.binding`，detach 期间由 `parent.children` 强引用
 * 保活、照常触发——无需独立锚点 scope 类型。锚点注释由本指令持有，作 reattach 的 DOM 书签
 * （`parentNode` 恒为当前父，重插位稳定）。详见 ADR-0016。
 *
 * 注意：首次 toggle 须 defer 到 microtask——`created` 在 compileElement 内同步执行，此时宿主
 * 尚未挂进父树（transformElement 的 appendChild 还没发生），detach 需要 parentNode。
 *
 * 与 x-show 的区别：x-if 切**存在性**（detach，宿主离开 DOM，不被表单提交/`:nth-child` 计数/
 * `querySelector` 命中）；x-show 切**可见性**（display:none，宿主永留 DOM）。x-show 是独立指令，
 * 不再是 `x-if.keep` 的别名。
 */
export class IfDirective extends AutoTemplateDirectiveBase {
    static override readonly priority = 80;
    static override readonly singleton = true;

    /** eager 模式才占有子树；`.keepalive`/`x-if-options="{keepalive:true}"` 不占有（保活子树，不重编译） */
    static override ownsChildren(info: AutoDirectiveInfo): boolean {
        // keepalive 经解析期注入为 info.options.keepalive（modifier 与指令选项等价，ADR-0007）。
        // 静态方法早于 scope 实例，仅读指令级 options，不支持 x-options 宿主回退（编译期局限）。
        return info.options?.keepalive !== true;
    }

    /** eager 模式下本指令编译挂载的子树节点，false 时按此精确移除 */
    private subtreeNodes: Node[] = [];
    /** 锚点注释：false 时替代宿主留在 DOM，作 reattach 的 DOM 书签（常驻，紧邻宿主前） */
    private anchorComment: Comment | null = null;

    private get keepAliveMode(): boolean {
        // `.keepalive` modifier 与 x-if-options="{keepalive:true}" 经 getOption 等价（ADR-0007）
        return !!this.getOption("keepalive");
    }

    override created() {
        if (this.value == null) return;
        const initial = this.binding.watch(this.value, ({ value }) => {
            this.toggle(!!value);
        });
        // 首次 toggle defer 到 microtask：created 在 compileElement 内同步跑，宿主尚未挂进父树
        // （transformElement 的 appendChild 还没发生），detach 需要 parentNode。同 x-for 首渲 defer。
        this.engine.scheduler.schedule(() => this.toggle(!!initial));
    }

    override destroy() {
        // 清理锚点注释（宿主的兄弟节点，不会被 el.remove 带走，须显式移除避免残留）
        this.anchorComment?.remove();
        this.anchorComment = null;
    }

    private toggle(show: boolean) {
        this.keepAliveMode ? this.toggleKeepAlive(show) : this.toggleEager(show);
    }

    /**
     * 确保锚点注释存在并定位在宿主前（懒创建）。
     * 宿主此时应在 DOM（ensureAnchor 在 detach 前 / reattach 时调用，el.parentNode 有效）。
     */
    private ensureAnchor() {
        const el = this.el;
        if (!el || this.anchorComment) return;
        // 用 parentNode（而非 isConnected）判定挂载状态：测试与部分宿主中 root 可能脱离
        // document，此时 isConnected 恒 false 会误判。parentNode 非空即代表已在某父节点下。
        if (!el.parentNode) return;
        this.anchorComment = document.createComment("x-if");
        el.parentNode.insertBefore(this.anchorComment, el);
    }

    /** 摘除宿主：确保锚点（留在原位）后 el.remove()。宿主由本指令 this.el 强引用保活，不 GC。 */
    private detachHost() {
        const el = this.el;
        if (!el) return;
        this.ensureAnchor();
        if (el.parentNode) el.remove();
    }

    /** 重挂宿主：若 el 已 detach（无父），插回锚点注释前。锚点常驻作书签。 */
    private reattachHost() {
        const el = this.el;
        if (!el) return;
        this.ensureAnchor();
        const anchor = this.anchorComment;
        if (!el.parentNode && anchor?.parentNode) {
            anchor.parentNode.insertBefore(el, anchor);
        }
    }

    /** keepalive 模式（x-if.keepalive）：摘宿主但保活子树与 watcher，true 时原宿主 reattach（状态保留） */
    private toggleKeepAlive(show: boolean) {
        if (show) this.reattachHost();
        else this.detachHost();
    }

    /**
     * eager 模式：true→reattach 宿主 + 编译挂载子树；false→销毁子 scope + 移除子树 + 摘宿主。
     * 仅操作自身挂载的 subtreeNodes，子树 scope 经 binding.children 由 scope.destroy 递归清理。
     */
    private toggleEager(show: boolean) {
        const el = this.el;
        const tpl = this.template;
        if (!el || !tpl) return;
        if (show) {
            this.reattachHost();
            // 子树未挂载时才编译（防止重复 true 的二次编译）
            if (this.subtreeNodes.length === 0) {
                this.subtreeNodes = this.engine.compiler.compileSubtree(el, tpl, this.binding);
            }
        } else {
            // 先销毁子 scope（子树 watcher 批量 off），再精确移除自身挂载的节点，最后摘宿主
            this.destroyChildren();
            for (const node of this.subtreeNodes) node.remove();
            this.subtreeNodes = [];
            this.detachHost();
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

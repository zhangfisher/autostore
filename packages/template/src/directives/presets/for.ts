import { AutoTemplateDirectiveBase } from "../base";
import type { AutoDirectiveInfo } from "../types";
import type { AutoTemplateScope } from "../../scope";

/**
 * x-for：列表渲染（B 容器语义，直写普通元素）。
 *
 * 语法：
 * ```html
 * <ul x-for="item of items" :key="item.id">
 *   <li x-text="item.name"></li>
 * </ul>
 * ```
 *
 * **B 语义**：带 x-for 的元素渲染一次作容器，其**全部元素子节点**作为一个**复合项模板**被整体重复 N 次、
 * 按文档顺序插入到该容器下。单子节点即单元素项；多子节点（如 `<dl>` 下的 dt/dd、卡片头/体）作为一组一起循环。
 * `:key` 可选（缺省用 index），按"项"计——一个 key 对应一组 DOM 节点。
 *
 * **契约：容器内不支持"只渲染一次"的静态内容**——容器下所有元素子节点都视为复合项的一部分随每项重复。
 * 若需静态内容（分隔线、表头、汇总行），请将其放到 x-for 容器之外（外层包裹元素的兄弟节点）。
 *
 * **为何需要 ownsChildren**：普通元素的子节点属于 childNodes，transformElement 默认会递归编译；
 * x-for 作为结构指令声明占有子树（compiler 对其返回 ownsChildren 信号），让通用 walk 跳过其子节点，
 * 由 x-for 在 `compileChild` 中逐项编译——避免"项模板被编译一次 + x-for 又克隆渲染"的重复冲突。
 *
 * v1 策略：监听 items（支持纯路径 `items` 或表达式 `items.filter(...)`），items 变化时**全量重建**——销毁旧项 scope、移除旧项 DOM、
 * 对新 items 每项克隆**全部**成员模板并 `compileChild` 编译插入。`:key` 提供时用于重复 key 检测；
 * 节点级复用/移动（保留 DOM 与输入焦点）留待 v2。
 *
 * 项内局部变量（item/index）经 `compileChild` 的 localScope 注入；同一项的多个成员**共享同一 localScope 引用**，
 * 各成员表达式 `item.name` 经各自 `scope.getScopeContext()` 解析（localScope 优先、parent 链回退到根 state）。
 *
 * **循环派生变量**（$ 前缀，固定可用、不占用户自定义命名空间）：每项 localScope 还注入
 * `$index`(0-based 序号)、`$length`(本次渲染项数，filter/map 后即筛选后长度)、
 * `$begin`(首项)、`$end`(末项)、`$odd`(第 1,3,5... 行，对齐 CSS `:nth-child(odd)`)、
 * `$even`(第 2,4,6... 行)。典型用法：行间分隔线 `<hr x-if="!$end"/>`、末项汇总提示。
 *
 * 注意：
 * - **嵌套遮蔽**——内层 `$index` 等命中自身 localScope、遮蔽外层同名变量；跨层引用外层序号请用自定义 index 名（如 `cell, cidx of ...` 后用 `cidx`）。
 * - **依赖全量重建**——`$end/$begin/$length` 随 items 增删而变，v1 每次 render 重算保证正确；v2 若引入节点复用/diff，需把派生变量纳入重求值。
 * - **x-if 默认 eager（销毁子树）**——`<div x-if="$end">` 为假时移除其子树并销毁 watcher；叶子元素（hr/线，无子树）退化为 `display:none`。
 *   若需"假时仅隐藏、保留子树 watcher"（如隐藏期间继续累积最新值），用 `x-if.keep` / `x-show`。
 */
export class ForDirective extends AutoTemplateDirectiveBase {
    static override readonly priority = 100;
    static override readonly singleton = true;
    /** x-for 永远占有子树：其子节点是项模板，由本指令逐项克隆编译，通用 walk 不得递归 */
    static override ownsChildren(_info: AutoDirectiveInfo): boolean {
        return true;
    }

    private itemName = "item";
    private indexName = "index";
    private itemsPath = "";
    private keyExpr: string | null = null;
    /** 复合项模板：容器下全部元素子节点（单子节点时长度为 1） */
    private itemTemplates: HTMLElement[] = [];
    /** 每项每成员的 scope（外层=项、内层=该项的各成员），destroy 时按组递归清理 */
    private itemScopes: AutoTemplateScope[][] = [];
    /** 每项每成员的渲染节点，与 itemScopes 同构，用于精确移除 */
    private itemNodes: HTMLElement[][] = [];

    override created() {
        this.parse();
        if (!this.itemsPath || this.itemTemplates.length === 0) return;
        // 监听 items 路径，变化时全量重建（回调经 scheduler 合并）
        this.binding.watch(this.itemsPath, () => this.render());
        // 首次渲染延迟到 microtask：created 在 compileElement 内同步执行，
        // 此时容器尚未挂载到文档；经 engine.compile 的 flushAll 在容器挂载后执行 render，
        // 以 container.appendChild 把各项插入容器。
        this.engine.scheduler.schedule(() => this.render());
    }

    /** 解析 "item of items" / "item,index of items" 与 :key（可选），并采集复合项模板 */
    private parse() {
        const raw = String(this.value ?? "").trim();
        const m = raw.match(/^([\w$]+)(?:\s*,\s*([\w$]+))?\s+of\s+(.+)$/);
        if (!m) {
            this.engine.logger.error(`x-for: invalid expression "${raw}"`);
            return;
        }
        const [, item, idx, path] = m;
        if (!item || !path) {
            this.engine.logger.error(`x-for: invalid expression "${raw}"`);
            return;
        }
        this.itemName = item;
        if (idx) this.indexName = idx;
        this.itemsPath = path.trim();
        // B 语义：x-for 元素自身是容器，其全部元素子节点作为复合项模板（按文档顺序）。
        // tpl.children 仅含 Element 节点，空白/注释/文本节点天然排除。
        const tpl = this.template;
        if (tpl) {
            this.itemTemplates = Array.from(tpl.children).filter(
                (c): c is HTMLElement => c instanceof HTMLElement,
            );
        }
        if (this.itemTemplates.length === 0) {
            this.engine.logger.error(`x-for: 缺少项模板（容器无元素子节点，path="${this.itemsPath}"）`);
        }
        // :key 可选：未提供时 evalKey 回退用 index
        this.keyExpr = tpl?.getAttribute(":key") ?? tpl?.getAttribute("x-bind:key") ?? null;
    }

    private readItems(): any[] {
        // 经 scope.read 双轨求值：纯路径走 getVal，表达式（如 items.filter(...)）走 with(scope)。
        // 与 binding.watch 的求值方式一致，确保 watch 触发的重建读到同一份经筛选/映射的数据。
        const items = this.binding.read(this.itemsPath);
        return Array.isArray(items) ? items : [];
    }

    private render() {
        const container = this.el;
        const tpls = this.itemTemplates;
        if (!container || tpls.length === 0) return;
        // 1. 销毁旧项 scope + 移除旧项 DOM（按项分组，逐成员清理）
        this.clearItems();
        // 2. 对新 items 每项编译全部成员模板，按原顺序 append 到容器
        const items = this.readItems();
        const seen = new Set<unknown>();
        const length = items.length;
        items.forEach((item, index) => {
            // 同一项的所有成员共享同一 localScope 引用（item/index/$* 相同）
            const localScope: Record<string, any> = {
                [this.itemName]: item,
                [this.indexName]: index,
                // 循环派生变量（$ 前缀固定可用，不占用户自定义命名空间）
                $index: index,
                $length: length,
                $begin: index === 0,
                $end: index === length - 1,
                // 对齐 CSS :nth-child —— 第 1,3,5 行（$index 为偶数）为 $odd
                $odd: index % 2 === 0,
                $even: index % 2 === 1,
            };
            const scopeGroup: AutoTemplateScope[] = [];
            const nodeGroup: HTMLElement[] = [];
            for (const tpl of tpls) {
                const { el, scope } = this.engine.compiler.compileChild(tpl, this.binding, localScope);
                scopeGroup.push(scope);
                nodeGroup.push(el);
                container.appendChild(el);
            }
            this.itemScopes.push(scopeGroup);
            this.itemNodes.push(nodeGroup);
            if (this.keyExpr) {
                const key = this.evalKey(item, index);
                if (seen.has(key)) {
                    this.engine.logger.error(`x-for: duplicate key "${String(key)}"`);
                }
                seen.add(key);
            }
        });
    }

    /**
     * 销毁全部项 scope 并移除其 DOM。
     * render 全量重建前与 destroy 时共用（DRY）：按项分组逐成员清理，保证复合项的每个成员 scope/watcher 都被释放。
     */
    private clearItems() {
        for (const group of this.itemScopes) {
            for (const s of group) s.destroy();
        }
        this.itemScopes = [];
        for (const group of this.itemNodes) {
            for (const n of group) n.remove();
        }
        this.itemNodes = [];
    }

    /** 求值 :key（如 item.id）。形参用项变量名，使嵌套场景自定义变量名（cell/row 等）的 :key 也能正确解析 */
    private evalKey(item: any, index: number): any {
        if (!this.keyExpr) return index;
        try {
            const fn = new Function(this.itemName, this.indexName, `return (${this.keyExpr});`) as (
                item: any,
                index: number,
            ) => any;
            return fn(item, index);
        } catch {
            return index;
        }
    }

    override destroy() {
        this.clearItems();
    }
}

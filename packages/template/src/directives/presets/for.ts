import { AutoTemplateDirectiveBase } from "../base";
import type { AutoDirectiveInfo } from "../types";
import { isSimpleStatePath, type AutoTemplateScope } from "../../scope";

/** x-for 单个列表项的运行时实体（v2 key-based 复用） */
type ForItemEntry = {
    /** 项数据对象（复用时若引用变，原地更新 localScope 后 refresh） */
    item: any;
    /** 项在当前列表中的位置序号（index 变 → 项内订阅路径含旧 index 失效 → 重建） */
    index: number;
    /** 该项各成员的 scope（复合项 >1，与 nodes 同序） */
    scopes: AutoTemplateScope[];
    /** 该项各成员的渲染节点（与 scopes 同构、同序） */
    nodes: HTMLElement[];
    /** 该项共享的局部作用域（复用时 Object.assign 原地更新，禁止替换引用） */
    localScope: Record<string, any>;
};

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
 * **B 语义**：带 x-for 的元素渲染一次作容器，其元素子节点二分：
 *  - 命中 special 描述符（当前 `x-empty`，见 SPECIAL_CHILDREN）的子节点 → **渲染一次的特例**（不随项重复）；
 *  - 其余元素子节点 → 作为一个**复合项模板**被整体重复 N 次、按文档顺序插入到该容器下。
 *  单子节点即单元素项；多子节点（如 `<dl>` 下的 dt/dd、卡片头/体）作为一组一起循环。
 *  `:key` 可选（缺省用 index），按"项"计——一个 key 对应一组 DOM 节点。
 *
 * **x-empty 空状态子节点**：items 为空数组时，容器内带 `x-empty` 的子节点渲染一次（多个则全显、按文档序）；
 * items 非空时拆除。空元素对**父作用域**求值（无 item/$index——空状态下它们无意义），与"把空元素挪到
 * x-for 外当兄弟"语义一致，但省去兄弟方案所需的外层包裹——空 `<li>` 天然继承容器 `ul>li` 的共享 CSS：
 * ```html
 * <ul x-for="item of items">
 *   <li x-text="item.name"></li>
 *   <li x-empty>没有数据</li>      <!-- items 为空时渲染此项 -->
 * </ul>
 * ```
 * **注意：空元素标签须匹配容器内容模型**（`<ul>→<li x-empty>`、`<select>→<option x-empty>`、
 * `<tbody>→<tr x-empty>`），与项模板同标签为佳；否则（如 `<div x-empty>` 在 `<ul>` 内非法）浏览器解析期
 * 可能挪动节点、破坏 CSS 共享。
 *
 * **契约变更**：原"容器内不支持只渲染一次的静态内容"现改为"命中 special 描述符的子节点是渲染一次的特例"。
 * 仍需放在列表之外的静态内容（分隔线、表头、汇总行——这些**不论 items 空否都要显示**）依旧放到 x-for 容器之外。
 * SPECIAL_CHILDREN 描述符表是类别的真接缝：未来 x-loading 等同类空状态只需加表项、按 priority 与 x-empty
 * 互斥（when 收原始 items 值，x-empty 只认空数组、把 undefined 留给 x-loading），不碰 render()。
 *
 * **为何需要 ownsChildren**：普通元素的子节点属于 childNodes，transformElement 默认会递归编译；
 * x-for 作为结构指令声明占有子树（compiler 对其返回 ownsChildren 信号），让通用 walk 跳过其子节点，
 * 由 x-for 在 `compileChild` 中逐项编译——避免"项模板被编译一次 + x-for 又克隆渲染"的重复冲突。
 *
 * **渲染策略（key-based 复用）**：监听 items（支持纯路径 `items` 或表达式 `items.filter(...)`），
 * 结构变化时按 `:key` 做 4-pass diff，**复用未变项**（保留 DOM/scope/订阅 → 焦点/输入态不丢），仅增删/重订阅差异项：
 * - 同 key + index 不变 → 复用：原地 `Object.assign(localScope)` 更新 item + 全部 `$*`，再 `scope.refresh()` 重跑项内绑定。
 *   （项内订阅路径含 index、index 不变则订阅仍有效；引用变的内容差异由 refresh patch。）
 *   脏标记短路（P2）：item 引用未变 && length 未变 → 跳过 refresh（$* 随 assign 重算但值不变）。
 * - 同 key + index 变（移动）→ 重订阅（P1）：旧订阅路径含旧 index 已失效，**复用项根 DOM**（rebindItem），
 *   仅销毁旧 scope 重新 `compileChild`——保住项根本身焦点/属性；子树 DOM 清空重建
 *   （子节点焦点彻底保留需 core 对象身份订阅，见 v3 路线）。
 * - 新 key → 新建；消失 key → 销毁。
 * - DOM 重排（P2）：顺序已就位则跳过全量 `insertBefore`；否则从后向前、组内正序插入。
 * push/pop 等末尾增删不改其他项 index → 旧项零成本复用；unshift/中间 splice 致后续项 index 变 → 那些项重订阅。
 * `:key` 缺省时用 index；`:key` 提供时还用于重复 key 检测。
 *
 * **更新颗粒度（双轨 + 项级补盲）**：
 * - 字段级：`items[i].field=` 由项内 watcher 精准 patch，**不进 render**（细粒度）。
 * - 列表级：push/splice/整体赋值由 `watch(itemsPath)` 触发 render（结构 diff）。
 * - 项级补盲（P0）：纯路径 itemsPath 时补 `items.*`，捕获 `items[i]={...}` 整体替换单项
 *   （core 发 items.{i} update，watch(itemsPath) 精确匹配收不到 → 旧版静默不更新）。
 * - 颗粒度差异：纯路径 `items` 仅结构变触发 render（字段级细粒度保留）；表达式 `items.filter(...)`
 *   经 collectDependencies 订阅所有项被读字段 → 字段变更也触发 render（退化为列表级粗粒度）。
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
 * - **派生变量靠 refresh 重算**——`$end/$begin/$length` 随 items 增删而变，且这些 `$*` 是 localScope 普通字段、非响应式（store 不会自动触发订阅为空的 watcher）。v2 对复用项原地重算全部 `$*` 并经 `scope.refresh()` 重跑项内绑定 patch，保证派生变量始终正确。
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

    /**
     * "容器内渲染一次的特例子节点"描述符表。
     *
     * 每条描述一个命名空状态：用 `match` 属性在容器子节点中识别其模板、用 `when(raw)` 判定
     * 何时激活、多个同时激活时按 `priority` 取最高。**加新特例（如 x-loading）只改此表，不碰 render()。**
     *
     * `when` 收**原始** items 值（未经 Array.isArray 归一化），使 `undefined`（未加载）与 `[]`（真空）
     * 可被不同描述符分别认领——例如未来 x-loading 以更高 priority 认领 `undefined`，x-empty 只认空数组。
     */
    private static readonly SPECIAL_CHILDREN: ReadonlyArray<{
        name: string;
        /** 子节点上用于识别该特例模板的属性名（如 "x-empty"） */
        match: string;
        /** 是否激活。入参为原始 items 值（未归一化） */
        when: (rawItems: any) => boolean;
        /** 多个特例同时激活时的优先级，大者胜出 */
        priority: number;
    }> = [
        {
            name: "empty",
            match: "x-empty",
            // 只认"真数组且长度为 0"——把 undefined/null/非数组留给未来 x-loading（priority 更高者认领），
            // 避免"加载中（items 尚为 undefined）"被误判为"无数据"。
            when: (raw) => Array.isArray(raw) && raw.length === 0,
            priority: 10,
        },
    ];

    private itemName = "item";
    private indexName = "index";
    private itemsPath = "";
    private keyExpr: string | null = null;
    /** 复合项模板：容器下【非 special】的元素子节点（单子节点时长度为 1）。
     *  命中 SPECIAL_CHILDREN.match（如 x-empty）的子节点已分入 specialTemplates，不在此列。 */
    private itemTemplates: HTMLElement[] = [];
    /** special 子节点模板：name → 模板数组（文档序）。如 x-empty 子节点。
     *  与 itemTemplates 同源（均取自 this.template.children，clone 重建已保证脱离 live DOM）。 */
    private specialTemplates = new Map<string, HTMLElement[]>();
    /** 当前激活的 special 名（null=无 special、显示 items）。作幂等锚点：同名则跳过重挂载。 */
    private activeSpecial: string | null = null;
    /** 已挂载 special 的 scope 与 DOM 节点——精确清理用。
     *  ⚠️ 不能 clear 整个 binding.children：它与 item scope 共享同一 Set（compileChild 都 addChild 到 binding）。 */
    private specialScopes: AutoTemplateScope[] = [];
    private specialNodes: HTMLElement[] = [];
    /** 列表项运行时实体索引：key → ForItemEntry。
     *  v2 按 key 复用/增删/重建；无 :key 时 key=index（evalKey 回退）。 */
    private itemMap = new Map<unknown, ForItemEntry>();
    /** 上次 render 的 items 长度：P2 脏标记——length 未变且 item 引用未变时跳过该项 refresh。
     *  -1 哨兵：首次 render 必 lengthChanged（但首次均走 create 分支，不进复用，无副作用）。 */
    private _lastRenderLength = -1;

    override created() {
        this.parse();
        // 既无项模板也无 special 模板才放弃：允许"仅有 x-empty、无项模板"的容器继续（仅渲染空状态）
        if (!this.itemsPath || (this.itemTemplates.length === 0 && this.specialTemplates.size === 0)) return;
        // 监听 items 路径，变化时全量重建（回调经 scheduler 合并）
        this.binding.watch(this.itemsPath, () => this.render());
        // 项级监听（P0）：纯路径 itemsPath 时补 `items.*`，捕获 `items[i]={...}` 整体替换单项。
        // core 对单项替换发 path=items.{i}（type=update），watch(itemsPath) 精确匹配收不到 → 旧版静默不更新。
        // `items.*` 单层通配精确命中项级、不误伤字段级 `items.{i}.field`（`**` 才会误伤 → 退粗粒度）。
        // 表达式 itemsPath（如 items.filter）已由 watchExpression 的 collectDependencies 覆盖，无需补。
        // 走 watchPath 直通：scope.watch 对含 `*` 的路径会误判为表达式走 with 求值（语法错）。
        if (isSimpleStatePath(this.itemsPath)) {
            this.binding.watchPath(`${this.itemsPath}.*`, () => this.render());
        }
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
        // B 语义：x-for 元素自身是容器。其元素子节点二分为：
        //  - 命中 SPECIAL_CHILDREN.match（如 x-empty）→ specialTemplates（渲染一次的特例，不随项重复）
        //  - 其余 → itemTemplates（复合项模板，随每项重复）
        // tpl.children 仅含 Element 节点，空白/注释/文本节点天然排除。
        const tpl = this.template;
        if (tpl) {
            for (const child of Array.from(tpl.children)) {
                if (!(child instanceof HTMLElement)) continue;
                const matched = ForDirective.SPECIAL_CHILDREN.find((s) => child.hasAttribute(s.match));
                if (matched) {
                    const arr = this.specialTemplates.get(matched.name) ?? [];
                    arr.push(child);
                    this.specialTemplates.set(matched.name, arr);
                } else {
                    this.itemTemplates.push(child);
                }
            }
        }
        if (this.itemTemplates.length === 0 && this.specialTemplates.size === 0) {
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

    /**
     * key-based 渲染：4-pass diff（复用未变项、仅增删/重订阅差异项）。
     *
     * Pass 1 决策：同 key + index 不变 → 复用（原地更新 localScope）；同 key + index 变 → 移动
     *   （旧订阅路径含旧 index 已失效，P1 复用项根 DOM 仅重订阅）；新 key → 新建。
     * Pass 2 清理：新列表中消失的旧 key → 销毁。
     * Pass 3 重排：DOM 已就位则跳过（P2）；否则从后向前、组内正序 insertBefore。
     * Pass 4 刷新：脏标记筛选后的复用项 refresh（P2：item 引用未变 && length 未变则跳过）。
     */
    private render() {
        const container = this.el;
        if (!container || (this.itemTemplates.length === 0 && this.specialTemplates.size === 0)) return;

        // === special 决策：取 priority 最高、且有模板、且 when(raw) 为真的描述符 ===
        const raw = this.binding.read(this.itemsPath);
        const activeSpecial = ForDirective.SPECIAL_CHILDREN.filter(
            (s) => this.specialTemplates.has(s.name) && s.when(raw),
        ).sort((a, b) => b.priority - a.priority)[0];

        if (activeSpecial) {
            // special 激活（如 x-empty：items 必为空数组）→ 挂载空状态、短路，跳过 4-pass diff。
            if (this.activeSpecial !== activeSpecial.name) {
                if (this.activeSpecial) {
                    this.destroySpecial(); // empty(S)→empty(T)：拆旧 special（items 已空，无需 clearItems）
                } else {
                    this.clearItems(); // items→empty：拆项
                }
                this.mountSpecial(activeSpecial);
                this.activeSpecial = activeSpecial.name;
            }
            // empty(S)→empty(S)：幂等 no-op（C2，避免 items.* 反复触发重编译空节点）
            this._lastRenderLength = Array.isArray(raw) ? raw.length : 0;
            return; // C1：special 节点只在此分支进 container，跳过比较 container.children 的 Pass 3
        }

        // 无 special 激活 → 显示 items。若此前挂着 special（empty→items），先拆除。
        if (this.activeSpecial) {
            this.destroySpecial();
            this.activeSpecial = null;
        }

        const items = this.readItems();
        const length = items.length;
        // P2 脏标记：length 变 → $length/$end/$begin 等派生变量变 → 复用项需 refresh
        const lengthChanged = this._lastRenderLength !== length;
        this._lastRenderLength = length;
        const seen = new Set<unknown>();
        // 本轮渲染的有序 entry 列表（含复用/重建/新建），供 Pass 3 重排
        const ordered: ForItemEntry[] = [];
        // 复用项集合，供 Pass 4 refresh
        const reuseEntries: ForItemEntry[] = [];

        // === Pass 1：对新 items 逐项决策 reuse / recreate / create ===
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            const key = this.evalKey(item, index);
            if (this.keyExpr && seen.has(key)) {
                this.engine.logger.error(`x-for: duplicate key "${String(key)}"`);
            }
            seen.add(key);
            const old = this.itemMap.get(key);
            let entry: ForItemEntry;
            if (old && old.index === index) {
                // (A) 同 key + index 不变 → 复用 DOM/scope/订阅：原地更新 localScope（item + 全部 $*）。
                //    订阅路径含 index、index 不变则订阅仍有效；引用变的内容差异由 Pass 4 refresh patch。
                //    铁律：Object.assign 原地改，禁止换 localScope 对象（_scopeView Proxy 闭包绑定引用）。
                entry = old;
                const itemChanged = old.item !== item; // P2 脏标记
                entry.item = item;
                Object.assign(entry.localScope, this.buildLocalScope(item, index, length));
                // P2 短路：item 引用未变 && length 未变 → localScope 内容未变，跳过 refresh
                // （$* 随 Object.assign 重算但值不变；项内字段变更已由字段级 watcher 精准 patch，未进 render）。
                if (itemChanged || lengthChanged) reuseEntries.push(entry);
            } else if (old) {
                // (B) 同 key + index 变（移动）→ 旧订阅路径含旧 index 已失效。
                //    P1：复用项根 DOM（old.nodes）仅销毁旧 scope 重订阅——保住项根本身焦点/属性；
                //    子树 DOM 由 compileChild(reuseEl) 清空重建（子节点焦点彻底保留需 core 对象身份订阅）。
                entry = this.rebindItem(old, item, index, length);
                this.itemMap.set(key, entry);
            } else {
                // (C) 新 key → compileChild 新建 scope+订阅+DOM（首次渲染取最新值）
                entry = this.createItem(item, index, length);
                this.itemMap.set(key, entry);
            }
            ordered.push(entry);
        }

        // === Pass 2：消失的旧 key → 销毁 ===
        for (const key of this.itemMap.keys()) {
            if (!seen.has(key)) {
                this.destroyItem(key);
            }
        }

        // === Pass 3：DOM 重排（P2：DOM 已就位则跳过，避免无结构变更的全量 insertBefore）===
        const flatNodes = ordered.flatMap((e) => e.nodes);
        let needsReorder = flatNodes.length !== container.children.length;
        if (!needsReorder) {
            for (let i = 0; i < flatNodes.length; i++) {
                if (flatNodes[i] !== container.children[i]) {
                    needsReorder = true;
                    break;
                }
            }
        }
        if (needsReorder) {
            // insertBefore(node, anchor) 把 node 放到 anchor 之前；anchor=null 表示插到末尾。
            // 从后向前：末项先落位（anchor=null 到尾部），anchor 推进到本组首节点，
            // 前一项整组插到它之前。组内正序插入保证复合项成员文档顺序（0..n-1 自上而下）。
            let anchor: Node | null = null;
            for (let j = ordered.length - 1; j >= 0; j--) {
                const nodes = ordered[j]!.nodes;
                for (let k = 0; k < nodes.length; k++) {
                    container.insertBefore(nodes[k]!, anchor);
                }
                anchor = nodes[0]!;
            }
        }

        // === Pass 4：复用项 refresh（localScope 已原地更新，驱动项内绑定重求值 patch）===
        // 仅 reuse 项需要：recreate/create 已在 createItem/compileChild 首次渲染。
        // refresh 重算 $length/$end/$begin 等依赖全局长度的派生变量 + 引用变化项的内容。
        for (const entry of reuseEntries) {
            for (const scope of entry.scopes) scope.refresh();
        }
    }

    /** 构造项的 localScope（item/index + 全部循环派生变量 $*）。
     *  v2 复用时通过 Object.assign 原地写回同一对象——禁止替换引用，因 watchExpression 的
     *  _scopeView Proxy 闭包绑定了 localScope 对象引用，换对象会使 refresh 取不到新值。 */
    private buildLocalScope(item: any, index: number, length: number): Record<string, any> {
        return {
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
    }

    /** 新建单个列表项：编译全部成员模板，返回 entry。
     *  不插入 DOM、不登记 itemMap、不做重复 key 检测（均由 render 负责）。 */
    private createItem(item: any, index: number, length: number): ForItemEntry {
        const localScope = this.buildLocalScope(item, index, length);
        const scopes: AutoTemplateScope[] = [];
        const nodes: HTMLElement[] = [];
        for (const tpl of this.itemTemplates) {
            const { el, scope } = this.engine.compiler.compileChild(tpl, this.binding, localScope);
            scopes.push(scope);
            nodes.push(el);
        }
        return { item, index, scopes, nodes, localScope };
    }

    /**
     * 移动复用（P1）：同 key 但 index 变时，复用项根 DOM 节点，仅销毁旧 scope 重新编译订阅。
     *
     * 旧订阅路径含旧 index 已失效（core 路径驱动响应式的固有限制），必须重建订阅；但项根 DOM
     * 节点（old.nodes）保留——避免移动导致的 DOM 创建/销毁，保住项根本身的焦点/属性。子树 DOM
     * 由 compileChild(reuseEl) 清空重建（compileChild 会 removeChild 旧子节点）。
     *
     * 注：子节点级焦点彻底保留需 core 提供「对象身份订阅」（订阅与 index 解耦），见 v3 路线。
     */
    private rebindItem(old: ForItemEntry, item: any, index: number, length: number): ForItemEntry {
        // 销毁旧 scope（off watcher + 清 children），但不 remove DOM——nodes 由 render Pass 3 管理
        for (const s of old.scopes) s.destroy();
        // 用新 localScope（新 index）逐成员重新编译，复用 old.nodes 的项根 DOM（reuseEl）。
        // old.nodes 与 itemTemplates 同长（createItem 按模板顺序建 nodes），索引配对安全。
        const localScope = this.buildLocalScope(item, index, length);
        const scopes: AutoTemplateScope[] = [];
        for (let i = 0; i < this.itemTemplates.length; i++) {
            const { scope } = this.engine.compiler.compileChild(
                this.itemTemplates[i]!,
                this.binding,
                localScope,
                old.nodes[i]!,
            );
            scopes.push(scope);
        }
        return { item, index, scopes, nodes: old.nodes, localScope };
    }

    /** 销毁单个列表项：destroy 全部成员 scope（递归清理子树 watcher + 自移除父级 children）+
     *  remove 全部成员节点 + 从 itemMap 移除。 */
    private destroyItem(key: unknown): void {
        const entry = this.itemMap.get(key);
        if (!entry) return;
        for (const s of entry.scopes) s.destroy();
        for (const n of entry.nodes) n.remove();
        this.itemMap.delete(key);
    }

    /**
     * 销毁全部项 scope 并移除其 DOM。
     * render 全量重建前与 destroy 时共用（DRY）：按项分组逐成员清理，保证复合项的每个成员 scope/watcher 都被释放。
     */
    private clearItems() {
        for (const key of this.itemMap.keys()) {
            this.destroyItem(key);
        }
        this.itemMap.clear();
    }

    /**
     * 挂载当前激活的 special（如 x-empty）：逐模板 compileChild 克隆编译后按文档序 append 进容器。
     *
     * localScope 传**空对象 {}**——不注入 item/$index（空状态下它们无意义），空元素上的绑定
     * （x-text/:class 等）经 scope.getScopeContext() 回退到父作用域求值，与"把空元素挪到 x-for 外当兄弟"语义一致。
     * compileChild 内部 removeDirectives 会剥离 x-empty 属性，输出 DOM 无 x-empty 残留。
     * 多个 x-empty 全部渲染、按文档序占位。
     */
    private mountSpecial(desc: { name: string }) {
        const container = this.el;
        const templates = this.specialTemplates.get(desc.name);
        if (!container || !templates) return;
        for (const tpl of templates) {
            const { el, scope } = this.engine.compiler.compileChild(tpl, this.binding, {});
            container.appendChild(el);
            this.specialNodes.push(el);
            this.specialScopes.push(scope);
        }
    }

    /**
     * 拆除当前已挂载的 special：destroy 全部 scope（递归 off watcher + 移出 parent.children）+ remove 节点。
     *
     * ⚠️ 不能 clear 整个 binding.children——它与 item scope 共享同一 Set（compileChild 都 addChild 到 binding），
     * 全清会误杀 item。故用显式 specialScopes/specialNodes 数组精确清理（与 if.ts 的 destroyChildren 区别所在）。
     */
    private destroySpecial() {
        for (const s of this.specialScopes) s.destroy();
        for (const n of this.specialNodes) n.remove();
        this.specialScopes = [];
        this.specialNodes = [];
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
        if (this.activeSpecial) this.destroySpecial();
    }
}

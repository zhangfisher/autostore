import { AutoTemplateDirectiveBase } from "../base";
import { sanitizeHtml } from "../../utils/sanitize";
import { createEmptyRenderer, resolveEmptyValues } from "../utils/emptyPlaceholder";
import { recompileSubtree } from "../../utils/recompileSubtree";

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
 * **默认不编译注入内容**：注入 HTML 为静态快照，不递归走转换器/不建 scope/不注册 watcher。
 *
 * **`.compile` 修饰符（ADR-0017）**：反转上述定位——把绑定值作为**子模板编译执行**。
 * 注入内容写回 `scope.template` 后调 `recompileSubtree`，建 scope/watcher、继承宿主作用域
 * （localScope/dataScope 经 `_linkParent` 自动传递），支持嵌套 x-data/x-for/x-if，与正常模板一致。
 * - **隐式强制跳过消毒**（sanitize 会剥 x-* 指令属性致模板失效），安全等级**高于 `.raw`**：
 *   `.raw` 的 `<script>` 经 innerHTML 不执行，`.compile` 注入的 `x-on` 会真实绑定执行——须确保来源可信。
 * - 每次值变全量销毁旧子树 + 重编译（无 diff）；空值销毁子树 + 清空宿主、忽略 `empty` 文案
 *   （结构空状态无文案占位语义），`.hide` 仍生效。
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
        // .compile 修饰符走子模板编译分支；否则走默认 innerHTML 注入（± sanitize + 空值占位）
        if (this.getOption("compile")) {
            this._createdCompile();
        } else {
            this._createdDefault();
        }
    }

    /**
     * 默认模式：把绑定值作为原始 HTML 写入 innerHTML（± sanitize + 空值占位）。
     *
     * `.raw` 退出消毒；否则用 engine 注入的 sanitizer，缺省回退内置极简 `sanitizeHtml`。
     * 空值/隐藏逻辑与 x-text 共享 `createEmptyRenderer`（ADR-0007 决策 1，统一经 getOption 读取）。
     */
    private _createdDefault() {
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

    /**
     * `.compile` 模式：把绑定值作为子模板编译进宿主子树（ADR-0017）。
     *
     * 与默认模式的差异：
     * - **不消毒**：compile 隐式强制跳过 sanitize（sanitize 会剥 x-* 指令属性致模板失效）。
     * - **作为子模板编译**：写回 `this.template.innerHTML` 后调 `recompileSubtree`，建 scope +
     *   watcher + 绑定（反转 x-html「不编译注入内容」的原定位）。
     * - **空值**：清空 template → recompileSubtree 销毁旧子树 + 清空 el，忽略 `empty` 文案
     *   （结构空状态无文案占位语义）。
     * - **`.hide`**：仍生效（控宿主可见性，与内容来源正交）。
     *
     * `template` 是共享模板树元素，写回即污染（设计要求，ADR-0017）：编译器的 `_linkParent` 靠
     * 模板树位置继承作用域，离树编译会断链。
     */
    private _createdCompile() {
        const el = this.el;
        const tpl = this.template;
        if (!el || !tpl) return;
        const emptyValues = resolveEmptyValues(this.getOption("emptyValues"));
        const hide = !!this.getOption("hide");
        // 惰性缓存原内联 display：仅首次隐藏时读、恢复时还原（不读 getComputedStyle，避免固化 CSS 类计算值）。
        let prevDisplay: string | undefined;

        const apply = (value: any) => {
            const isEmpty = emptyValues.includes(value);
            // .hide：控宿主可见性，与内容来源正交
            if (hide) {
                if (isEmpty) {
                    if (prevDisplay === undefined) prevDisplay = el.style.display;
                    el.style.display = "none";
                } else if (prevDisplay !== undefined) {
                    el.style.display = prevDisplay;
                }
            }
            // 内容写回 template（空值清空、非空写入）+ 重编译子树。
            // 模板树污染是设计要求（ADR-0017）：_linkParent 靠模板树位置继承作用域。
            tpl.innerHTML = isEmpty ? "" : String(value);
            try {
                recompileSubtree(this.binding, el);
            } catch (e: any) {
                // 抛错时 recompileSubtree 已 destroy 旧子树 + 清空 el → el 保持清空（与 engine.patch 姿态一致）
                this.engine.logger.error(`x-html.compile: 编译注入内容失败: ${e?.message ?? e}`);
            }
        };
        const initial = this.binding.watch(this.value, ({ value }) => apply(value));
        // 首次 apply defer 到 microtask：created 在 compileElement 内同步跑，此时 transformElement
        // 尚未完成对宿主子节点的递归——若同步注入会污染 template 致注入内容被编译两次
        //（recompileSubtree 一次 + transformElement 递归一次）。defer 后递归已结束，注入仅由
        // recompileSubtree 编译一次。同 x-if 首渲 defer（if.ts）。engine.compile() 末尾 flushAll 同步消化。
        this.engine.scheduler.schedule(() => apply(initial));
    }
}

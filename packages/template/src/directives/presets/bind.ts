import { AutoTemplateDirectiveBase } from "../base";
import { normalizeClass } from "../utils/normalizeClass";

/**
 * 属性绑定指令（singleton=false，priority=50）。
 *
 * `x-bind:attr` / `:attr` 绑定任意属性；`x-class` / `x-style` 作为其特化别名——
 * 经 `getDirectives` 解析期归一化为 `bind+class` / `bind+style`，**无独立指令类、零运行时实体**。
 * 因此 `x-class` / `:class` / `x-bind:class` 三种写法完全等价。
 *
 * **求值**：整值表达式，经 `scope.watch` 订阅（纯路径走精准订阅，表达式走 `collectDependencies`，
 * 自动注入 x-for 的 localScope），首渲用 watch 返回的当前值；后续变化经 `scheduler` 微任务合并后 patch。
 *
 * **patch 按 attr 分派**（顺序敏感，`checked` 同属 property 与 boolean → property 优先）：
 * - `class` → `normalizeClass` + `classList` diff（有 `lastApplied` 状态，**绝不用 `className=`**，
 *   原生 `class` 属性的 token 永不被碰；静态类走原生 `class`、动态类走 x-class，dirty tracking 合并）
 * - `style` → 字符串 `cssText` 整体替换 / 对象按 key 增删 diff（`lastAppliedStyle` 清残留，避免 `Object.assign` 合并泄漏）
 * - property 型（`value` / `checked`）→ `el[attr] = value`（**单向 state→DOM，非 x-model 双向**）
 * - boolean 型（`disabled` / `readonly` / `hidden` / `selected` / `multiple`）→ truthy `setAttribute` / falsy `removeAttribute`
 * - 普通 attribute → null/undefined/false `removeAttribute`，否则 `setAttribute(attr, String(value))`
 *
 * **求值抛错**：`scope.watch` 宽松求值返回 `undefined` → patch 普通 attr 分支 `removeAttribute`，不中断。
 *
 * **多实例**：singleton=false，同元素多个 `:attr` 各自独立；多个 `:class` 各维护 `lastApplied`，
 * 同名类不做引用计数，destroy 可能误删共有类（接受，文档不保证）。
 *
 * @example 普通属性（`:title` 与 `x-bind:title` 完全等价，后者为缩写）
 * <span :title="user.name"></span>
 * // state: { user:{name:'a'} } → store.user.name='b' → <span title="b">
 *
 * @example class 三写法等价：`x-class` / `:class` / `x-bind:class`（解析期归一化为 bind+class）
 * <div x-class="variant"></div>
 * // state: { variant:'primary' } → class="primary"；variant='secondary' → class="secondary"
 *
 * @example class 全形态：字符串空格拆分 / 对象多条件开关 / 三元表达式
 * <div x-class="v"></div>                                        // state:{v:'foo bar'} → class="foo bar"
 * <div x-class="{active:isActive, disabled:isDisabled}"></div>
 * // state:{isActive:true,isDisabled:false} → class="active"；isDisabled=true → class="active disabled"
 * <div x-class="paid ? 'on' : 'off'"></div>                      // state:{paid:true} → class="on"；paid=false → "off"
 *
 * @example 原生 class 与 x-class 共存（静态 token 永不被碰、不被覆盖）
 * <div class="btn" x-class="{primary:isPrimary}"></div>
 * // state:{isPrimary:true} → class="btn primary"；isPrimary=false → class="btn"
 *
 * @example x-style：字符串走 `cssText` 整体替换 / 对象按 key diff（切换时清除上次多余 key，不残留）
 * <div x-style="styleStr"></div>                                 // state:{styleStr:'color:red'} → style="color:red"
 * <div x-style="styleObj"></div>                                 // state:{styleObj:{color:'red',fontSize:'12px'}} → 写入 el.style
 * // 求值为 null/undefined/false/'' → 移除 style 属性
 *
 * @example x-style.transition：注入 CSS `transition` 属性，使内联样式变化被浏览器过渡动画
 * <div x-style.transition="s"></div>                             // state:{s:{color:'red'}} → 首渲即带 transition:all 0.3s ease-in
 * // 默认值 'all 0.3s ease-in'；x-options/x-bind-options 传字符串可覆盖；对象自带 transition key 显式优先；详见 ADR-0015
 *
 * @example `:value` / `:checked` 走 property，单向 state→DOM（非 x-model 双向，不监听 input 事件）
 * <input :value="text">
 * // state:{text:'a'} → store.text='b' → input.value='b'（回写 state 须另用 x-model）
 *
 * @example `:disabled` 等 boolean 型：truthy setAttribute / falsy removeAttribute
 * <button :disabled="locked">提交</button>
 * // state:{locked:true} → 禁用；locked=false → 解除（同此理：readonly / hidden / selected / multiple）
 */

/** property 型属性：state→DOM 单向写入（`el[attr] = value`），不监听事件 = 不是 x-model */
const PROPERTY_ATTRS = new Set(["value", "checked"]);
/** boolean 型属性：truthy 时 setAttribute（存在即生效），falsy 时 removeAttribute */
const BOOLEAN_ATTRS = new Set([
    "disabled",
    "checked",
    "readonly",
    "hidden",
    "selected",
    "multiple",
]);

export class BindDirective extends AutoTemplateDirectiveBase {
    static override readonly singleton = false;
    static override readonly priority = 50;

    /** class 分支脏追踪：上次本指令产出的类名集合，用于 diff 增删（原生 class 的 token 不在此集，永不被碰） */
    private lastApplied = new Set<string>();
    /** style 分支脏追踪：上次对象写入的 style key 集合，用于切换时清除「上次有、本次无」的残留 key */
    private lastAppliedStyle = new Set<string>();

    override created() {
        if (this.value == null || this.value === "") return;
        // watch 返回当前值做首渲；后续变化经 scheduler flush 回调 patch
        const initial = this.binding.watch(this.value, ({ value }) => this.patch(value));
        this.patch(initial);
    }

    /**
     * 按 attr 分派写入。求值为 undefined（宽松求值兜底）时走普通 attr 分支 removeAttribute。
     */
    private patch(value: any) {
        const el = this.el;
        const attr = this.attr;
        if (!el || attr == null) return;

        if (attr === "class") return this.patchClass(value);
        if (attr === "style") return this.patchStyle(value);
        // property 优先于 boolean（checked 同属两者）
        if (PROPERTY_ATTRS.has(attr)) {
            (el as any)[attr] = value;
            return;
        }
        if (BOOLEAN_ATTRS.has(attr)) {
            if (value) el.setAttribute(attr, "");
            else el.removeAttribute(attr);
            return;
        }
        // 普通 attribute：falsy 移除，否则设为字符串（true → "true"）
        if (value == null || value === false) el.removeAttribute(attr);
        else el.setAttribute(attr, String(value));
    }

    /**
     * class 分支：normalizeClass → classList 增删 diff。
     *
     * 只动 `lastApplied` 与本次 `current` 的差集；原生 `class` 属性的 token 从不进 `lastApplied`，
     * 故永不被 remove——静态类（`class="btn"`）与动态类（`x-class`）安全共存。
     */
    private patchClass(value: any) {
        const el = this.el;
        if (!el) return;
        const current = normalizeClass(value, this.engine.logger);
        for (const c of this.lastApplied) if (!current.has(c)) el.classList.remove(c);
        for (const c of current) if (!this.lastApplied.has(c)) el.classList.add(c);
        this.lastApplied = current;
    }

    /**
     * 解析 `.transition` 配置层有效值（三级优先中的 ②③ 层，详见 ADR-0015）。
     *
     * - `getOption('transition') === true`（`.transition` 修饰符解析期注入）→ 默认 `'all 0.3s ease-in'`
     * - 字符串（`x-options` / `x-bind-options` 覆盖）→ 该字符串
     * - `false` / `undefined` → 不注入（显式 `false` 关闭，与 ADR-0007「显式 false 生效」一致）
     *
     * ① 层（用户 style 对象自带的 `transition` key）由 `patchStyle` 对象分支结构处理，不在此。
     */
    private resolveTransitionOption(): string | undefined {
        const opt = this.getOption("transition");
        if (opt === true) return "all 0.3s ease-in";
        if (typeof opt === "string") return opt;
        return undefined;
    }

    /**
     * style 分支：字符串 → `cssText` 整体替换；对象 → 按 key 增删 diff（`lastAppliedStyle`
     * 清除「上次有、本次无」的残留 key，避免 `Object.assign` 合并造成的样式泄漏）；falsy → 移除 style 属性。
     *
     * **`.transition` 注入**（仅 style）：每次 patch 内部把有效 `transition` 合并进去——对象模式并入写入对象
     * （用户自带 `transition` key 显式优先），字符串模式前置注入（用户串内已声明的 `transition` 因 CSS
     * 「后声明优先」仍胜出）。**不在 `created()` 设一次**：字符串模式 `cssText` 整替会擦除一次性写入。
     * 注入项纳入 `lastAppliedStyle` 追踪，持续生效；falsy 清空时随 `removeAttribute('style')` 一并清除。
     */
    private patchStyle(value: any) {
        const el = this.el;
        if (!el) return;
        if (value == null || value === false || value === "") {
            el.removeAttribute("style");
            this.lastAppliedStyle.clear();
            return;
        }
        // .transition 配置层有效值（②③ 层）；无 .transition 时为 undefined，行为同前
        const transition = this.resolveTransitionOption();
        if (typeof value === "object") {
            // 用户对象自带 transition key 即显式优先（①）；否则注入配置层默认/覆盖（②③）
            const merged =
                transition && !Object.prototype.hasOwnProperty.call(value, "transition")
                    ? { ...value, transition }
                    : value;
            const next = new Set(Object.keys(merged));
            // 清掉上次写过、本次对象里没有的 key，防止残留（如 warn→normal 后 fontWeight 仍停留）
            for (const k of this.lastAppliedStyle) if (!next.has(k)) (el.style as any)[k] = "";
            // 写本次对象里的 key（驼峰 key 经 CSSStyleDeclaration 的 camelCase 访问器生效）
            for (const k of next) (el.style as any)[k] = (merged as Record<string, any>)[k];
            this.lastAppliedStyle = next;
            return;
        }
        // 字符串模式：前置注入（用户串里若已声明 transition，CSS 后声明优先 → 显式仍胜出）
        el.style.cssText = transition ? `transition:${transition};${String(value)}` : String(value);
        this.lastAppliedStyle.clear();
    }
}

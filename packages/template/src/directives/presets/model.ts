import { AutoTemplateDirectiveBase } from "../base";
import { isSimpleStatePath, type AutoTemplateScope } from "../../scope";
import { setVal } from "autostore";
import type { AutoTemplateActionContext } from "./on/types";
import { createDirectiveOptions } from "../utils/createDirectiveOptions";
import { resolveEmptyValues } from "../utils/emptyPlaceholder";
import type { AutoDirectiveInfo } from "../types";
import type { AutoTemplateEngine } from "../../engine";

/**
 * 匹配「裸标识符」或「标识符(参数)」，用于 get/set 字符串的 **action 名分派**（复用 x-on 的 ACTION_RE）：
 * - `splitIp`        → name="splitIp", argsSrc=undefined（无括号）
 * - `splitIp(1)`     → name="splitIp", argsSrc="1"
 * - `value.split('.')[0]` / `user.first=$value` → 不匹配（含运算符/点），走表达式分支
 */
const ACTION_RE = /^([A-Za-z_$][\w$]*)\s*(?:\(([\s\S]*)\))?$/;

/**
 * 控件类别（ControlKind）：x-model 内部对表单控件的分型，决定读源/写目标/事件语义。
 *
 * - `text`：`<input>`（除 checkbox/radio 外所有 type）+ `<textarea>`，读写 `el.value`；
 * - `checkbox`：`<input type="checkbox">`，读写 `el.checked`（布尔），ADR-0023 决策 2；
 * - `radio`：`<input type="radio">`，读 `el.checked = (state === el.value)`，写 `state = el.value`；
 * - `select`：`<select>`，单选读写 `el.value`、多选读写 selectedOptions（`string[]`），
 *   默认事件 `change`（ADR-0026 决策 6），选项子树见 choices 三源（ADR-0026 决策 1）。
 */
export type ControlKind = "text" | "checkbox" | "radio" | "select";

/**
 * 根据元素判定控件类别（ControlKind）。
 *
 * `<input type="checkbox">` → `checkbox`；`<input type="radio">` → `radio`；
 * `<select>` → `select`；其余（input 非 checkbox/radio、textarea）→ `text`。
 */
function detectControlKind(el: HTMLElement): ControlKind {
    if (el instanceof HTMLInputElement) {
        if (el.type === "checkbox") return "checkbox";
        if (el.type === "radio") return "radio";
    }
    if (el instanceof HTMLSelectElement) return "select";
    return "text";
}

/** choices 项形态（ADR-0026 决策 5）：label/value 均可缺省，附加字段可作 group 分组键 */
type ChoiceItem = { label?: string; value?: any; [k: string]: any };

/**
 * 判定 select 是否为静态选项模式（ADR-0026 决策 1）：
 * 存在任一 `<option>`/`<optgroup>` 子元素即静态——两处 choices 整体忽略。
 * 查 template（原模板，含手写子节点）；compile 期 el 是浅克隆、子节点未挂入，查 el 会漏判。
 */
function hasStaticOptions(template: HTMLElement | undefined): boolean {
    if (!template) return false;
    for (const child of template.children) {
        if (child.tagName === "OPTION" || child.tagName === "OPTGROUP") return true;
    }
    return false;
}

/**
 * 拼接 configManager 的 fullKey（复刻 configManager.add 的 joinPath）：
 * `configKey` 前缀（空串不加）+ 状态路径段。供 synthesizeSchemaBindings（静态）与
 * `_fullConfigKey`（实例）共用——fullKey 拼接规则只此一处真相源。
 */
function toFullConfigKey(store: any, statePath: string): string {
    const segs = statePath.split(".");
    return (store.configKey ? [store.configKey, ...segs] : segs).join(".");
}

/**
 * `new Function` 编译产物缓存（性能审查发现 3）：键 = 完整源码串，值 = 编译函数。
 *
 * get/set/args 表达式在**每次输入事件**求值——无缓存时每敲一键编译一次（new Function
 * 走解析+代码生成，成本高）。表达式字符串在实例生命周期内不变，且同表达式跨实例共享
 * （同一模板克隆出的多个 x-for 项），故用**模块级** Map（引擎生命周期内单调增长、
 * 以源码串为键天然去重；表达式来自开发者模板，数量有界，无泄漏之虞）。
 */
const compiledFnCache = new Map<string, Function>();

/** 取编译产物（源码串为键），未命中则编译并缓存 */
function compileFn(params: string, body: string): Function {
    const key = `${params}||${body}`;
    let fn = compiledFnCache.get(key);
    if (!fn) {
        fn = new Function(params, body);
        compiledFnCache.set(key, fn);
    }
    return fn;
}

/**
 * .boolean 修饰符的严格字符串集转换（ADR-0024 决策 3）。
 *
 * 仅认 `"true"/"false"/""` 三个字符串字面量，其余输入（"0"/"abc"/" True "）保留原值
 * 不转换——镜像 .number 的 NaN 回退「不破坏」原则。空串 → false（空=否定，避免空串污染 state）。
 */
function toBooleanStrict(v: any): any {
    if (v === "true") return true;
    if (v === "false") return false;
    if (v === "") return false;
    return v;
}

/**
 * x-model：输入控件与状态的双向绑定（**Hybrid 指令**）。
 *
 * 双通道职责正交（ADR-0018）：
 * - **scope 通道**（`created`/`compile`）：`scope.watch` 订阅读方向（state→DOM），支持相对表达式
 *   （x-for item / x-data 局部变量），watcher 进 `scope._updates` 随 `scope.refresh` 重跑；
 * - **observer 通道**（`mounted`/`unmounted`）：挂/移 `input`(或 `change`)事件，承接写方向（DOM→state）。
 *
 * ## 控件范围
 * - text-like：`<input>`（除 checkbox/radio 外所有 type）+ `<textarea>`，统一读写 `el.value`。
 * - checkbox：`<input type="checkbox">`，读写 `el.checked`（布尔），ADR-0023 决策 2。
 * - radio：`<input type="radio">`，读 `el.checked = (state === el.value)`，写 `state = el.value`。
 * - select：`<select>`，单选 `string` / 多选（`.multiple`）`string[]`，默认事件 `change`；
 *   选项子树三级优先：静态 `<option>` > `x-model-options.choices` > schema.choices（响应式
 *   全量重建），`group` 选项按键分组到 `<optgroup>`。详见 ADR-0026。
 *
 * ## 读写方向（术语钉死）
 * - **getter（get）= state→DOM 变换**：把状态值加工成 DOM 显示值（如 `value.split('.')[0]`）。
 * - **setter（set）= DOM→state 变换**：把输入值拆解写回一个或多个状态字段（如 `user.first=$value`）。
 *
 * ## get/set 配置
 * 仅经 `x-model-options="{get:'...',set:'...'}"` 声明（**砍快捷属性** x-model-get/x-model-set，
 * 不扩展 getDirectives 的 `-options` 后缀白名单）。
 *
 * **值形态：字符串 only**。relaxed-json 不支持函数字面量——`{get:(v)=>...}` 会被解析成字符串且求值错乱、
 * 语句块箭头函数直接解析失败（详见 ADR-0018）。**箭头函数字面量禁用**，给两条正道：
 * - **表达式**：固定形参 `value`(get)/`$value`(set)，`new Function(...,"with(scope){...}")`，
 *   `scope = binding.getContext()`（localData+data+state 聚合视图）。
 * - **action 名**：`ACTION_RE` 分派（`splitIp(1)` 等）。**当前值自动作首参**，括号内为追加参数；
 *   `this` = `AutoTemplateActionContext`（el/data/scope/store/state/engine/$options + value/$value）。
 *
 * ## 绑定值语义
 * - **简单路径**（`order.price`）：无 get/set 时读 `scope.watch(path)`、写 `setVal` 直通（快路径）。
 * - **表达式**（`user.first+','+user.last`）：读求值；写**必须**有 set。
 * - **计算属性**（`order.total`）：天然无 set → 只读降级。
 * - **无 setter 的表达式/computed**：`logger.warn`（一次）+ 只读（state→DOM 仍工作，DOM→state 静默），
 *   **不抛错、不魔法猜左值**。
 *
 * ## 事件与修饰符
 * 默认监听 `input`（select 为 `change`，ADR-0026 决策 6）；修饰符：
 * - `.change` → 改监听 `change`（失焦触发；select 上与默认同效，幂等）；
 * - `.trim` → 写前 `trim()`；
 * - `.number` → 写前 `Number()`，`NaN` 回退原字符串（不破坏）。
 * - `.boolean` → 写前严格集转换：`"true"→true`、`"false"→false`、`""→false`，其余保留原值
 *   （不破坏）。作用于读 `el.value` 的控件（text-like + radio）；checkbox 写方向恒布尔，冗余空转。
 * - `.multiple` → select 多选（等价 `multiple` 属性；显式声明优先于 schema.multiple，ADR-0026 决策 2）。
 * 写回管道顺序：`el.value` →(.trim)→ (.number)→(.boolean)→ `$value` → set/直写。
 * 多选（select multiple）数组**逐项**过管道（`["1","2"]`+.number → `[1,2]`，ADR-0026 决策 8）。
 * number/boolean 均为类型终态声明，**按书写序顺序执行**（`Object.keys(options)` 键序=书写序），
 * 同写两个的冲突后果开发者自担（`.boolean.number` 可能得 `1`），不短路、不 warn。
 *
 * ## 防循环
 * 双向绑定的循环风险：onInput 写 state → read 回调写回 DOM。虽然程序设 `el.value` 不触发 input 事件
 * （故无同步栈溢出），但 read 回调若把值经 getter 写回，会**立即覆盖用户刚输入的内容**（UX 灾难），
 * 也是冗余写。故须识别「自己触发的 read 回调」并跳过。
 *
 * - 写入经 `store.update(fn,{flags:-this.seq})` 承载 flags（与 syncer 范式一致，供 syncer/未来指令识别）；
 * - 但 `scope.watch` 的 scheduler 合并模型不把 `operate` 透传给 listener（flush 时重新读当前值），
 *   read 回调拿不到 `operate.flags`——故防循环用**实例级 `_selfWriting` 标志**：
 *   onInput 置 `true` → read 回调检查命中则重置并 `return`（跳过自己触发的回写）。
 *   语义与 flags 等价（只跳过自己，其他 x-model 实例 / 外部写入正常更新显示）。
 * - `seq` = 类级静态自增（`++ModelDirective._seq`，仿 `AutoStoreSyncer.seq`），同 engine 内各实例唯一。
 *
 * ## 冲突（控件感知）
 * - text-like：`:value`/`x-bind:value` 与 `x-model` 同元素 → 编译期报错（竞写 `el.value`）；
 * - checkbox / radio：`:checked`/`x-bind:checked` 与 `x-model` 同元素 → 编译期报错（竞写 `el.checked`）；
 *   `:value` **放行**（设选项值，必需）。详见 ADR-0023 决策 4。
 *
 * ## 初始
 * mount 时 state→DOM 单向（state 作真相源）；state 路径不存在 → warn + 不动 DOM（不回填）。
 *
 * @example 基础双向
 * <input x-model="order.price"/>
 * // state.order.price=99 → input.value="99"；用户输入 "100" → state.order.price="100"
 *
 * @example 数字字段（.number 避免字符串污染计算属性）
 * <input type="number" x-model.number="order.count"/>
 * // 用户输入 "23" → state.order.count=23（数字，非字符串），order.total=price*count 正确
 *
 * @example 组合字段（表达式 + set 反向拆分）
 * <input x-model="user.first + ',' + user.last" x-model-options="{set:'user.first=$value.split(\',\')[0];user.last=$value.split(\',\')[1]'}"/>
 *
 * @example action 复用（set 外置到 <script type="actions">）
 * <input x-model="user.ip" x-model-options="{get:'splitIp(0)',set:'joinIp'}"/>
 */
export class ModelDirective extends AutoTemplateDirectiveBase {
    /** Compile 通道：created/compile/destroy（挂 input 事件在 compile——el 已存在即可，无需 observer 通道） */
    /** 与 x-bind/x-on 同级（50），早于 x-text/x-html(0) */
    static override readonly priority = 50;
    /** 同元素仅一个 x-model */
    static override readonly singleton = true;

    /** 实例唯一 seq（类级自增）；写入 state 时作 flags 标识（-seq），仿 AutoStoreSyncer.seq */
    private static _seq = 0;
    private readonly seq = ++ModelDirective._seq;

    // ── 元数据自动注入（ADR-0020）──────────────────────────────────────
    //
    // x-model 元素自动从 configManager schema 注入 input 原生属性。注入白名单按 input type
    // 精准匹配（通用集 + type 扩展）。仅注入 schema 有的属性（动态交集）。enable→disabled 经
    // `.invert` 修饰符反向（ADR-0025）。name 特殊（无则路径、表达式跳过）。显式绑定优先抑制合成。

    /**
     * 通用注入白名单（所有 text-like input + textarea）。enable 经 `.invert` 注入 disabled。
     * 这是 text-like 的完整白名单；checkbox 使用裁剪版 CHECKBOX_INJECT_ATTRS。
     */
    private static readonly COMMON_INJECT_ATTRS = [
        "placeholder",
        "title",
        "required",
        "readonly",
        "enable", // → disabled 反向（.invert 修饰符，ADR-0025）
        "pattern",
        "minlength",
        "maxlength",
    ] as const;

    /**
     * checkbox / radio 注入白名单（ADR-0023 决策 5）：裁剪文本约束属性（placeholder/pattern/
     * minlength/maxlength/readonly 对选择类控件无意义），保留 title/required/enable。
     */
    private static readonly CHECKBOX_INJECT_ATTRS = [
        "title",
        "required",
        "enable", // → disabled 反向（.invert 修饰符，ADR-0025）
    ] as const;

    /**
     * select 注入白名单（ADR-0026 决策 7）：title/required/enable + size
     * （AutoWidgetSelect 既有字段）。choices 不走属性注入，走选项子渲染（决策 1）；
     * **multiple 不在此**——它是初始化期语义收敛（值形态 string↔string[] 随之切换），
     * 由 `_initSelect` 唯一管理（决策 2），属性注入会与其双写竞争。
     */
    private static readonly SELECT_INJECT_ATTRS = [
        "title",
        "required",
        "enable", // → disabled 反向（.invert 修饰符，ADR-0025）
        "size",
    ] as const;

    /** 含 min/max/step 的 input type（number/range/date 类），扩展注入这三个数值约束属性。 */
    private static readonly NUMERIC_TYPES = new Set([
        "number",
        "range",
        "date",
        "time",
        "datetime-local",
        "month",
        "week",
    ]);

    /**
     * 元数据自动注入（ADR-0020）：为含 x-model 的元素从 configManager schema 合成隐式 `@` 绑定。
     *
     * 由 compiler 在 scope.compile() 后调用（与 `_compileAttrInterpolation` 并列）。合成实体是
     * 标准 BindDirective 实例（构造合成 AutoDirectiveInfo 喂给 createDirectives），复用 ADR-0019
     * 全部能力。合成知识内聚于此（compiler 只管调用时机）。
     *
     * - configManager 不存在 → 整体跳过（静默，决策 12）；
     * - 注入白名单 = 通用集 + type 扩展（决策 4）；仅注入 schema 有的属性（决策 5）；
     * - enable → disabled 反向映射（决策 7，ADR-0025 修订为合成 `:disabled.invert`）；name 特殊处理（决策 8）；
     * - 显式绑定优先抑制合成（决策 9）；无条件合成 + 三层降级兜底（决策 10）。
     */
    static synthesizeSchemaBindings(
        engine: AutoTemplateEngine,
        scope: AutoTemplateScope,
        el: HTMLElement,
        modelInfo: AutoDirectiveInfo,
    ): void {
        const store = engine.store as any;
        const cm = store.configManager;
        // configManager 不存在 → 整体跳过（静默）
        if (!cm) return;
        const BindCls = engine.directives.get("bind");
        if (!BindCls) return;
        // x-model 绑定值（左配置状态路径用）
        const modelValue = String(modelInfo.value ?? "");
        // 表达式场景（非简单路径）：schema 按状态路径注册，表达式路径无对应 schema，
        // 不合成任何属性（含 @ 绑定与 name 路径——name 走 _injectName 的 isSimpleStatePath 判断跳过）。
        if (!isSimpleStatePath(modelValue)) return;
        const configStatePath = modelValue;

        // fullKey 复刻 configManager.add（与 ADR-0019 _bindConfig 同构）
        const fullKey = toFullConfigKey(store, configStatePath);
        const cmState = cm.state as Record<string, any>;
        const schema = cmState[fullKey];
        // schema 未注册 → 跳过 @ 属性合成（仅保留 name 简单路径注入）。
        // 取舍（修订决策 10）：原无条件全合成会为每个白名单属性产 schema 不存在 WARN，噪音过大；
        // schema 后注册罕见，牺牲该动态性换静默。name 不依赖 schema（简单路径即注入），故仍执行。
        const schemaPresent = schema != null;
        if (!schemaPresent) {
            ModelDirective._injectName(engine, el, scope, modelValue, undefined);
            return;
        }
        const schemaKeys: Set<string> = new Set(Object.keys(schema));

        const hasValue = (attr: string): boolean => schemaKeys.has(attr) && schema[attr] != null;

        // 同元素已有 bind 指令的 attr 集合（显式绑定优先抑制合成）
        const explicitAttrs = new Set<string>();
        for (const d of scope.directives) {
            if (d.info.name === "bind" && d.info.attr) explicitAttrs.add(d.info.attr);
        }

        // input type（决定注入白名单 + 是否扩展 min/max/step）；select 走专属白名单（ADR-0026 决策 7）
        const isSelect = el instanceof HTMLSelectElement;
        const inputType = isSelect ? "" : ((el as HTMLInputElement).type ?? "text");
        const isCheckbox = inputType === "checkbox";
        const isRadio = inputType === "radio";

        /** 合成一个 bind 指令实例（@ 配置引用）并 created，push 进 scope.directives */
        const synth = (attr: string, schemaAttr: string, opts?: Record<string, any>) => {
            if (explicitAttrs.has(attr)) return; // 显式绑定优先
            const info: AutoDirectiveInfo = {
                name: "bind",
                attr,
                value: `${configStatePath}@${schemaAttr}`,
                ...(opts ? { options: opts } : {}),
            };
            const bind = new BindCls(engine, scope, info);
            bind.created();
            scope.directives.push(bind);
        };

        // 1. 通用白名单：仅注入 schema 有的属性（enable 反向经 .invert，ADR-0025）
        // checkbox / radio 裁剪文本约束属性（ADR-0023 决策 5）；select 补 multiple/size（ADR-0026 决策 7）
        const injectAttrs =
            el instanceof HTMLSelectElement
                ? ModelDirective.SELECT_INJECT_ATTRS
                : isCheckbox || isRadio
                  ? ModelDirective.CHECKBOX_INJECT_ATTRS
                  : ModelDirective.COMMON_INJECT_ATTRS;
        for (const schemaAttr of injectAttrs) {
            if (!hasValue(schemaAttr as string)) continue;
            if (schemaAttr === "enable") {
                // enable → disabled 反向映射（决策 7，ADR-0025 修订为复用绑定）：
                // 合成 `:disabled.invert="path@enable"`——取反由 BindDirective 的 .invert 修饰符承担
                synth("disabled", "enable", { invert: true });
            } else {
                synth(schemaAttr as string, schemaAttr as string);
            }
        }

        // 2. type 扩展：min/max/step（仅 numeric input type；select 的 inputType 为 "" 天然不含）
        if (ModelDirective.NUMERIC_TYPES.has(inputType)) {
            for (const extra of ["min", "max", "step"]) {
                if (hasValue(extra)) synth(extra, extra);
            }
        }

        // 3. name 特殊处理（决策 8）：静态写，不走 @ 绑定
        ModelDirective._injectName(
            engine,
            el,
            scope,
            modelValue,
            schemaPresent ? schema : undefined,
        );
    }

    /**
     * name 注入（ADR-0020 决策 8）：静态写，不走响应式绑定。
     *
     * - schema 有 name 元数据 → name = schema.name；
     * - schema 无 name + x-model 绑定值是简单路径 → name = 路径；
     * - x-model 绑定值是表达式 → 跳过（用户应显式写 name）。
     * - 元素已有显式 name 属性 → 跳过（显式优先）。
     */
    private static _injectName(
        engine: AutoTemplateEngine,
        el: HTMLElement,
        scope: AutoTemplateScope,
        modelValue: string,
        schema: any,
    ): void {
        if (el.hasAttribute("name")) return; // 显式优先
        const logger = engine.logger;
        // schema 有 name 元数据 → 用之
        if (schema && schema.name != null) {
            el.setAttribute("name", String(schema.name));
            return;
        }
        // 简单路径 → name = 路径；表达式（含运算符/空格）→ 跳过
        if (isSimpleStatePath(modelValue)) {
            el.setAttribute("name", modelValue);
        }
        // 表达式场景静默跳过（不 warn，表达式作 name 语义混乱，用户应显式）
    }

    /** 控件类别（created 时据 el.type 判定，决定读写语义） */
    private _controlKind: ControlKind = "text";
    /** 防循环标志：onInput 触发的写入会让随之而来的 read 回调跳过回写（见类注释「防循环」） */
    private _selfWriting = false;
    /** 当前监听的事件类型（_attachEvent 时决定：text-like/checkbox/radio 默认 "input"、select "change"） */
    private _eventType?: "input" | "change";
    /** created 时 read 的初始值（compile 首渲用；undefined 表示未读到/无值） */
    private _initialValue: any = undefined;
    /** 只读降级 warn 去重（表达式/computed 无 set 时仅 warn 一次） */
    private _readonlyWarned = false;
    /** radio 值不在 .boolean 严格集 warn 去重（仅 warn 一次，值保留原样写回） */
    private _radioBooleanWarned = false;
    /** select 类型不匹配 warn 去重（数组配单选/字符串配多选，仅 warn 一次后自然退化，ADR-0026 决策 3） */
    private _selectMismatchWarned = false;
    /** select choices 模式标志（_initSelect 判定；静态模式为 false，不做选项管理） */
    private _selectChoices = false;
    /** 空值回填判定集（ADR-0027）：默认集 + 用户附加，created 期经 resolveEmptyValues 解析缓存 */
    private _emptyValues: any[] = [undefined, null, NaN];
    /** schema.default 元数据（ADR-0027 决策 3 的第二级；created 期静态读取，模板 default 优先） */
    private _schemaDefault: any = undefined;
    /** schema.autoSelect 元数据（ADR-0028 决策 2 第二级；undefined=未声明走默认 true） */
    private _schemaAutoSelect: boolean | undefined = undefined;
    /**
     * choices 渲染时记录的「default:true 第一项」的 option value（ADR-0028 选取依据）。
     * 静态模式无 choices 项标记，恒 undefined（回退首项规则）。
     */
    private _defaultTrueValue: string | undefined = undefined;
    /** DOM→state 回调（箭头函数绑定 this，供 add/removeEventListener 同引用） */
    private readonly onInput = () => this._handleInput();

    // ── scope 通道（读方向：state→DOM）──────────────────────────────

    override created() {
        // 判定控件类别（ADR-0023 ControlKind 分派）
        this._controlKind = detectControlKind(this.el);
        // 冲突检测（控件感知，ADR-0023 决策 4 / CONTEXT「控件感知冲突」）：
        // - text-like / select：`:value` / `x-bind:value` 与 x-model 同元素 → 竞写 el.value，报错；
        // - checkbox / radio：`:checked` / `x-bind:checked` 与 x-model 同元素 → 竞写 el.checked，报错；
        //   `:value` 放行（设选项值，必需）。
        if (this._controlKind === "checkbox" || this._controlKind === "radio") {
            const checkedConflict = this.binding.directives.some(
                (d) => d.info.name === "bind" && (d as any).attr === "checked",
            );
            if (checkedConflict) {
                throw new Error(
                    `x-model 与 :checked/x-bind:checked 不能同时作用于同一 ${this._controlKind} 元素（两者竞写 el.checked）`,
                );
            }
            // radio 必须有 value 属性（否则默认 "on"，意外写入无意义值）
            if (this._controlKind === "radio") {
                const radioValue = (this.el as HTMLInputElement)?.value;
                if (!radioValue || radioValue === "on") {
                    this.engine.logger.warn(
                        `x-model: <input type="radio"> 缺少 value 属性（默认 "on"），x-model 不生效。请为 radio 添加 value 属性。`,
                    );
                    return; // 跳过绑定
                }
            }
        } else {
            const valueConflict = this.binding.directives.some(
                (d) => d.info.name === "bind" && (d as any).attr === "value",
            );
            if (valueConflict) {
                throw new Error(
                    "x-model 与 :value/x-bind:value 不能同时作用于同一元素（两者竞写 input.value）",
                );
            }
        }
        const expr = String(this.value ?? "");
        if (!expr.trim()) return;
        // 空值回填（ADR-0027）：判定集（默认集+附加）与 schema.default 在订阅前解析缓存
        this._emptyValues = resolveEmptyValues(this.getOption("emptyValues"));
        this._schemaDefault = this._readSchemaDefault();
        // 自动选中（ADR-0028）：schema.autoSelect 第二级（模板显式声明优先），默认 true
        this._schemaAutoSelect = this._readSchemaAutoSelect();
        // select：选项子树先就绪（choices 渲染/静态直用），再建立读方向订阅——
        // 否则首渲 writeToDom 时 option 尚不存在，选中无处落（ADR-0026 实现时序）
        if (this._controlKind === "select") {
            this._initSelect(this.el as HTMLSelectElement);
        }
        // scope.watch：纯路径走精准订阅、表达式走 collectDependencies，自动注入 localData/data。
        // 返回当前值供 compile 首渲；后续变化经 scheduler 微任务合并后回调 writeToDom。
        this._initialValue = this.binding.watch(expr, ({ value }) => this.writeToDom(value));
    }

    override compile() {
        // 首次 state→DOM 写入（state 作真相源）。undefined（路径不存在/求值失败/状态字面 undefined）
        // 经空值回填判定（ADR-0027）：有 default 回填显示；无 default 走 writeToDom 的控件空值
        // 显示（text-like 空串 / select 首项）。仅当「无 default 且非 select」时保持 DOM 原值 + warn
        if (this._initialValue !== undefined || this._resolveDefault() !== undefined || this._controlKind === "select") {
            this.writeToDom(this._initialValue);
        } else if (this.el) {
            // state 路径不存在且无回填：不动 DOM（不回填，避免 DOM 污染 state 真相源），仅 warn
            this.engine.logger.warn(
                `x-model: 绑定 "${this.value}" 初始值为 undefined（路径不存在或求值失败），保持 DOM 原值`,
            );
        }
        // select：编译期 el 是浅克隆（静态 option 由 transformElement 随后挂入），且编译产物
        // 还会被 engine.compile 的 replaceChildren 搬运挂载——DOM 移动会重置 select 的选中
        // 状态（happy-dom 实测；浏览器同险）。选中态应用统一推迟到挂载后的 microtask 重放
        //（scheduler Set 去重，同 tick 多次只跑一次）。
        if (this._controlKind === "select") {
            this._scheduleSelectReplay();
        }
        // 挂 input/change 事件（compile 期 el 已存在；元素插入 DOM 后用户输入触发）
        this._attachEvent();
    }

    // ── compile：首次写 DOM + 挂 input 事件（写方向入口）─────────────

    override destroy() {
        // 移除事件（watcher 由 scope.destroy 统一 off）
        this._detachEvent();
    }

    private _attachEvent() {
        if (!this.el) return;
        // select 默认 change（ADR-0026 决策 6，无打字中间态）；其余默认 input（实时）；
        // .change 修饰符显式切换（select 上与默认同效，幂等）
        const defaultEvent = this._controlKind === "select" ? "change" : "input";
        this._eventType = this.getOption("change") ? "change" : defaultEvent;
        this.el.addEventListener(this._eventType, this.onInput);
    }

    private _detachEvent() {
        if (this.el && this._eventType) {
            this.el.removeEventListener(this._eventType, this.onInput);
        }
        this._eventType = undefined;
    }

    // ── select：选项子管理（ADR-0026）───────────────────────────────

    /**
     * select 初始化（created 期调用，先于读方向订阅）：
     *
     * 1. **multiple 收敛**（决策 2）：显式（静态属性 ≡ `.multiple` 修饰符 ≡ 指令/宿主选项，
     *    任一为真即真）> schema.multiple（合成注入，静态属性已存在则跳过）。运行时唯一
     *    真相源是 `el.multiple`，值语义（string / string[]）一律派生自它。
     * 2. **选项源三级优先**（决策 1）：静态 `<option>`/`<optgroup>` > 模板 choices
     *    （x-model-options/宿主选项）> schema.choices（响应式全量重建）。三源皆空 →
     *    warn 一次，不生成。
     */
    /**
     * x-model 绑定值对应的 configManager fullKey（`toFullConfigKey` 的实例便捷封装）。
     * 绑定值非简单路径（表达式）或 configManager 缺席时返回 undefined。
     */
    private _fullConfigKey(): string | undefined {
        const expr = String(this.value ?? "");
        if (!isSimpleStatePath(expr)) return undefined;
        const store = this.engine.store as any;
        if (!store.configManager) return undefined;
        return toFullConfigKey(store, expr);
    }

    private _initSelect(el: HTMLSelectElement): void {
        const store = this.engine.store as any;
        const cm = store.configManager;
        const fullKey = this._fullConfigKey();

        // multiple：显式任一为真即真——静态属性已在 el.multiple 上，修饰符/指令选项须落位
        if (this.getOption("multiple") === true) el.multiple = true;
        if (!el.multiple && cm && fullKey) {
            // schema.multiple 收敛（静态属性不存在时才考虑；初始化期一次性读取——
            // multiple 切换意味着值语义 string↔string[] 变更，运行时切换属罕见，YAGNI）
            const schema = (cm.state as Record<string, any>)[fullKey];
            if (schema?.multiple === true) el.multiple = true;
        }

        // 静态模式：模板手写 option/optgroup，两处 choices 整体忽略（含 schema 响应式）。
        // 须查 binding.template（原模板）——compile 期 el 是浅克隆，静态子节点尚未挂入
        if (hasStaticOptions(this.binding.template)) return;

        // 模板 choices（x-model-options / 宿主选项）
        const templateChoices = this.getOption("choices");
        if (Array.isArray(templateChoices)) {
            this._selectChoices = true;
            this._renderChoices(el, templateChoices);
            return;
        }

        // schema choices：configManager 响应式订阅，任何变更全量重建 + 重放选中（决策 1）
        if (cm && fullKey) {
            const cmState = cm.state as Record<string, any>;
            const schema = cmState[fullKey];
            if (schema != null) {
                this._selectChoices = true;
                // collectDependencies 深读 choices 的全部渲染字段（label/value/group）——
                // 仅读数组引用收集不到项字段路径，单项 label 变更不会触发重建（实测）；
                // 深读后收集 app.car.choices.0.label 等路径，任何字段变更触发全量重建（决策 1）
                let first: any;
                const deps = cm.collectDependencies(() => {
                    first = (schema as any).choices;
                    if (Array.isArray(first)) {
                        const gKey = this.getOption("group");
                        for (const item of first) {
                            if (item == null || typeof item !== "object") continue;
                            void item.label;
                            void item.value;
                            if (gKey) void item[gKey];
                        }
                    }
                }, "read");
                this._renderChoices(el, Array.isArray(first) ? first : []);
                const rerender = () =>
                    this._renderChoices(el, Array.isArray(schema.choices) ? schema.choices : []);
                this.watchers.push(cm.watch(deps, () => this.engine.scheduler.schedule(rerender)));
                return;
            }
        }

        // 三源皆空：warn 一次，不生成
        this.engine.logger.warn(
            `x-model: <select x-model="${this.value}"> 无可选项（无静态 <option>、无 choices 配置、schema 无 choices），选项子树不生成`,
        );
    }

    /**
     * 全量重建 options 子树（无 diff，决策 1）并重放选中态。
     *
     * **group 分组**（决策 4）：`getOption("group")` 为字段名时按项的该字段值聚合到
     * `<optgroup label>`——顺序遍历，无该字段的项渲染为顶层 `<option>`（可与组交错），
     * 组按首次出现追加。group 仅作用于 choices 路径，静态手写不适用。
     *
     * choice 形态（决策 5）：缺 value → 省略属性走 HTML 原生回退（label 即 el.value）；
     * 缺 label → 回退 `String(value)`；附加字段（如 aa:"x"）合法，作 group 键取值来源。
     *
     * 重建后经 `_scheduleSelectReplay` 推迟重放当前选中：编译期的「选项就绪晚于首渲」与
     * 响应式变更场景共用同一条推迟路径（见 `_selectReplayFn` 注释）。
     */
    private _renderChoices(el: HTMLSelectElement, choices: ChoiceItem[]): void {
        // 清空旧子树（含静态残留的空白文本）
        while (el.firstChild) el.removeChild(el.firstChild);
        const groupKey: string | undefined = this.getOption("group");
        // 组按首次出现追加；顶层项直接 append（顺序遍历，可与组交错）
        const groupEls = new Map<string, HTMLOptGroupElement>();
        // 记录 default:true 第一项的 value（ADR-0028 选取依据；仅 choices 项可标记）
        this._defaultTrueValue = undefined;
        for (const item of choices) {
            if (item == null || typeof item !== "object") continue;
            const option = document.createElement("option");
            // value 缺省 → 不设属性（HTML 原生回退：el.value === textContent）
            if (item.value !== undefined && item.value !== null) {
                option.value = String(item.value);
            }
            if (this._defaultTrueValue === undefined && item.default === true) {
                this._defaultTrueValue = option.value;
            }
            option.textContent = item.label !== undefined && item.label !== null
                ? String(item.label)
                : String(item.value ?? "");
            if (groupKey && item[groupKey] !== undefined && item[groupKey] !== null) {
                const label = String(item[groupKey]);
                let og = groupEls.get(label);
                if (!og) {
                    og = document.createElement("optgroup");
                    og.label = label;
                    groupEls.set(label, og);
                    el.appendChild(og);
                }
                og.appendChild(option);
            } else {
                el.appendChild(option);
            }
        }
        // 重放选中：值在集内 → 勾中；不在集内 → autoSelect 判定（ADR-0028 修订决策 3）。
        // 统一走推迟重放：响应式变更时 el 已挂载，但复用同一路径保持行为一致
        this._scheduleSelectReplay();
    }

    /** 读方向最近一次的显示值缓存（choices 重建后重放选中用；writeToDom 时更新） */
    private _lastDisplayValue: any = undefined;

    /**
     * 推迟应用 select 选中态：缓存值不变，microtask 重放。
     *
     * 两类时序都必须推迟：① 编译期 el 是浅克隆（静态 option 随后才挂入）；② 编译产物经
     * `engine.compile` 的 replaceChildren 搬运挂载，DOM 移动会重置 select 选中状态
     * （happy-dom 实测，浏览器同险）。scheduler Set 按闭包引用去重——本方法固定复用
     * 同一 `this._selectReplayFn`，同 tick 多次调度只跑一次，且总是取最新缓存值。
     */
    private _selectReplayFn = () => {
        this._applySelectSelection(this._lastDisplayValue);
    };

    private _scheduleSelectReplay(): void {
        this.engine.scheduler.schedule(this._selectReplayFn);
    }

    /**
     * 应用 select 选中态（读方向写目标，严格 `===` 匹配，ADR-0026 决策 3 / Q11-a）。
     *
     * - 单选：`typeof display === "string"` 才写 `el.value`（option.value 恒字符串，字符串间
     *   `===` 即浏览器原生匹配）；非字符串（数字/数组等）**不勾中任何项**（`selectedIndex=-1`），
     *   warn 一次后自然退化——类型错误应出声，不参与自动选中（ADR-0028 决策 3）。
     * - 多选：数组逐 option `selected = state.includes(option.value)`（严格 includes，非字符串
     *   项恒不勾中）；非数组状态 warn 一次后恒不勾选。
     * - **空值回填（ADR-0027 决策 5）**：display 为 undefined（空值且无 default）时单选回退
     *   **首项默认**（渲染后第一个 option，含 optgroup 内首个）；多选回退 `[]`（全不勾）。
     * - **自动选中（ADR-0028，默认开启）**：display 是字符串但不在渲染后的 options 值集内 →
     *   选中 `default:true` 第一项（无则首项）并**回写 state**（与用户手选同一条 `_writeToState`
     *   管道 + `_selfWriting` 置位，回写触发下游级联）；多选是**过滤式**（剔除数组中过期项回写）。
     *   `autoSelect:false` 退回旧行为（不勾中不回写）。空选项集静默（无可选）。
     */
    private _applySelectSelection(display: any): void {
        const el = this.el as HTMLSelectElement;
        const autoSelect = this._resolveAutoSelect();
        if (el.multiple) {
            if (display != null && !Array.isArray(display) && !this._selectMismatchWarned) {
                this._selectMismatchWarned = true;
                this.engine.logger.warn(
                    `x-model: <select multiple> 绑定 "${this.value}" 的状态为非数组（${typeof display}），勾选不生效。multiple 须配 string[] 状态。`,
                );
            }
            const arr = Array.isArray(display) ? display : [];
            // 收集渲染后的值集（autoSelect 过滤判定依据）
            const optionValues = new Set<string>();
            for (const option of el.options) optionValues.add(option.value);
            const filtered = arr.filter((v) => typeof v === "string" && optionValues.has(v));
            // 过滤式自动选中（ADR-0028 决策 4）：剔除过期项后回写；无变化不写
            if (autoSelect && filtered.length !== arr.length) {
                this._selfWriting = true;
                this._writeToState(filtered);
            }
            for (const option of el.options) {
                option.selected = filtered.includes(option.value);
            }
        } else {
            if (typeof display !== "string" && !this._selectMismatchWarned && display !== undefined && display !== null) {
                this._selectMismatchWarned = true;
                this.engine.logger.warn(
                    `x-model: 单选 <select> 绑定 "${this.value}" 的状态为非字符串（${Array.isArray(display) ? "array" : typeof display}），不勾中任何项。${Array.isArray(display) ? "多选请声明 .multiple 或 schema.multiple。" : "须配 string 状态或用 get 转换。"}`,
                );
            }
            if (typeof display === "string") {
                // 值在集内？
                let inSet = false;
                for (const option of el.options) {
                    if (option.value === display) {
                        inSet = true;
                        break;
                    }
                }
                if (inSet) {
                    el.value = display;
                } else if (autoSelect) {
                    // 自动选中（ADR-0028 决策 1）：default:true 第一项 > 首项；选中并回写 state
                    const pick = this._defaultTrueValue ?? el.options[0]?.value;
                    if (pick !== undefined) {
                        el.value = pick;
                        this._selfWriting = true;
                        this._writeToState(pick);
                    }
                    // 空选项集：pick undefined → 无可选，静默不动（决策 3）
                } else {
                    // autoSelect:false 旧行为（ADR-0026 决策 3 原样）：不勾中、不回写
                    el.value = "";
                }
            } else if (display === undefined || display === null) {
                // 空值回填·首项默认（ADR-0027 决策 5）：无 default 时空值勾中第一个 option
                //（含 optgroup 内首个）——仅显示层，state 不回写
                el.value = el.options[0]?.value ?? "";
            } else {
                // 严格匹配：非字符串（数字/数组等）→ -1（不勾中）
                el.value = "";
            }
        }
    }

    /**
     * input/change 事件处理：读 DOM 值 → 修饰符管道 → 写 state（flags 标识 + 防循环置位）。
     *
     * 按 ControlKind 分派读源（ADR-0023 决策 1 / ADR-0026 决策 3）：
     * - text-like：读 `el.value`，走 trim/number/boolean 修饰符管道；
     * - checkbox：读 `el.checked`（恒写布尔），修饰符管道空转（类型转换对布尔无意义）；
     * - radio：仅勾选时读 `el.value`（字符串），取消时不写（另一个 radio 会接管）；
     *   值同样走修饰符管道（.boolean 对 radio 布尔对是主场景）；
     * - select：单选读 `el.value`；多选读 selectedOptions 收集 `string[]`，数组逐项过管道
     *   （ADR-0026 决策 8）。
     */
    private _handleInput() {
        if (!this.el) return;
        let v: any;
        let usePipe = false; // text-like / radio / select 读字符串值的才走管道
        if (this._controlKind === "checkbox") {
            // checkbox：读 el.checked，恒写布尔（ADR-0023 决策 2）
            v = (this.el as HTMLInputElement).checked;
        } else if (this._controlKind === "radio") {
            // radio：仅勾选时写 el.value（字符串），取消时不写（另一个 radio 会接管）
            if (!(this.el as HTMLInputElement).checked) return; // 取消态不写入
            v = (this.el as HTMLInputElement).value;
            usePipe = true;
        } else if (this._controlKind === "select") {
            const el = this.el as HTMLSelectElement;
            if (el.multiple) {
                // 多选：收集 selectedOptions 的 value 数组（决策 3）
                v = Array.from(el.selectedOptions).map((o) => o.value);
                // 数组逐项过管道（决策 8）
                v = (v as string[]).map((item) => this._applyModifiers(item));
                this._selfWriting = true;
                this._writeToState(v);
                return;
            }
            v = el.value;
            usePipe = true;
        } else {
            // text-like：读 el.value，走修饰符管道
            v = (this.el as HTMLInputElement).value;
            usePipe = true;
        }
        if (usePipe) v = this._applyModifiers(v);
        // 防循环置位：本次写入触发的 read 回调将跳过回写
        this._selfWriting = true;
        this._writeToState(v);
    }

    /**
     * 写方向修饰符管道：`el.value` →(.trim)→ (.number)→(.boolean)→ 写回。
     *
     * number/boolean 按书写序顺序执行（键序=书写序），不短路、不 warn——同写两个的冲突
     * 后果开发者自担。.boolean 严格集未识别值在 radio 场景 warn 一次（模板静态声明的
     * value 不在 {"true","false"} 集内是模板 bug，值得出声）；text 场景静默保留（用户输入不预设）。
     *
     * 键序来源：指令选项键在前（书写序）+ 宿主选项键在后（缺失才回退，ADR-0007 两层
     * fallback 的顺序投影）——`getOption` 逐键查不到顺序，此处自聚合键序表。
     * 键序表在实例生命周期内不变（指令/宿主选项编译期定格），缓存于 `_modifierKeys`，
     * 免去每次输入事件的重聚合（性能审查发现 2）。
     */
    private _modifierKeys: string[] | null = null;

    private _applyModifiers(v: any): any {
        if (this.getOption("trim") && typeof v === "string") v = v.trim();
        if (this._modifierKeys === null) {
            const opts = this.options as Record<string, any> | undefined;
            const host = this.binding?.hostOptions;
            // 指令键（书写序）在前，宿主键（指令层缺失才回退）在后，去重
            this._modifierKeys = [...Object.keys(opts ?? {}), ...Object.keys(host ?? {})].filter(
                (k, i, arr) => arr.indexOf(k) === i,
            );
        }
        for (const key of this._modifierKeys) {
            if (!this.getOption(key)) continue; // 值统一经 getOption（两层回退）
            if (key === "number") {
                const n = Number(v);
                v = Number.isNaN(n) ? v : n; // NaN 回退原值，不破坏
            } else if (key === "boolean") {
                const converted = toBooleanStrict(v);
                if (
                    converted === v &&
                    this._controlKind === "radio" &&
                    !this._radioBooleanWarned
                ) {
                    this._radioBooleanWarned = true;
                    this.engine.logger.warn(
                        `x-model: radio value "${v}" 不在 .boolean 严格集 {"true","false",""} 内，保留原值写回`,
                    );
                }
                v = converted;
            }
        }
        return v;
    }

    /**
     * 写 state（DOM→state 方向）。
     *
     * - 有 set（`x-model-options="{set:'...'}"`）→ 经 set 表达式/action 反向变换（拆分到多字段等）；
     * - 无 set + 简单路径 → `setVal` 直写（快路径，绝大多数场景）；
     * - 无 set + 表达式/computed → 只读降级（warn 一次，不写）。
     *
     * 经 `store.update({flags:-seq})` 承载 flags 标识（与 syncer 范式一致），供 syncer/未来指令识别。
     * set 在 fn 内执行——其 `with(scope)`/action 写入经 Proxy 落盘，处于 store.update 上下文故 flags 生效。
     */
    private _writeToState($value: any) {
        const expr = String(this.value ?? "");
        const setExpr = this.getOption("set");
        this.engine.store.update(
            (state) => {
                if (typeof setExpr === "string" && setExpr.trim() !== "") {
                    this._evalSet(setExpr, $value);
                } else if (isSimpleStatePath(expr)) {
                    setVal(state, expr.split(this.engine.store.delimiter), $value);
                } else {
                    // 表达式/computed 无 set → 只读降级
                    if (!this._readonlyWarned) {
                        this._readonlyWarned = true;
                        this.engine.logger.warn(
                            `x-model: 绑定 "${expr}" 为表达式/computed 且无 set，降级为只读（DOM→state 不回写）`,
                        );
                    }
                }
            },
            { flags: -this.seq },
        );
    }

    /**
     * 写 DOM（state→DOM 方向），含 get 变换、空值回填与防循环跳过。
     *
     * 按 ControlKind 分派写目标（ADR-0023 决策 1 / ADR-0026 决策 3）：
     * - text-like：写 `el.value`；
     * - checkbox：写 `el.checked`（Boolean() coerce，ADR-0023 决策 2）；
     * - radio：写 `el.checked = (display === el.value)`（值匹配，ADR 决策）；
     * - select：经 `_applySelectSelection`（单选 String 写 el.value、多选逐 option 严格
     *   `===` includes 勾选；类型不匹配 warn 一次后自然退化）。
     *
     * **空值回填（ADR-0027）**：get 变换后 display 落在 emptyValues 集内 → 显示 default
     * 回填值（仅 text-like + select 参与；checkbox/radio 不参与）。每次读方向都判（无条件语义）。
     * select 无 default 时回退首项默认（见 `_applySelectSelection`）。不回写 state。
     *
     * 防循环：`_selfWriting=true` 表示本次值变化由 onInput 触发 → 跳过回写（避免 getter 立即覆盖
     * 用户输入、避免冗余 DOM 写），重置标志后返回。其他场景（外部改 state、其他 x-model 实例写入）
     * `_selfWriting=false`，正常更新显示。
     */
    private writeToDom(stateValue: any) {
        if (this._selfWriting) {
            this._selfWriting = false;
            // select：防循环跳过 DOM 回写，但**须刷新显示值缓存**——choices 重建后的
            // 重放取 `_lastDisplayValue`，若不刷新会重放「自写之前的旧值」，与 state 分叉
            //（实测：级联联动 + 自写 + 再联动的三段序列）。DOM 本身已是用户所选，无需重放。
            if (this._controlKind === "select") this._lastDisplayValue = stateValue;
            return;
        }
        const getExpr = this.getOption("get");
        let display = stateValue;
        if (typeof getExpr === "string" && getExpr.trim() !== "") {
            display = this._evalGet(getExpr, stateValue);
        }
        // 空值回填（ADR-0027 决策 1/3/4）：仅 text-like + select 参与；判定在 get 之后
        //（get 的产物是显示值）；default 取模板 > schema 两级，缓存判定后的显示值供重放
        if (
            (this._controlKind === "text" || this._controlKind === "select") &&
            this._emptyValues.includes(display)
        ) {
            display = this._resolveDefault();
        }
        const el = this.el as HTMLInputElement | null;
        if (!el) return;
        if (this._controlKind === "checkbox") {
            // checkbox：写 el.checked（Boolean() coerce，非布尔 state 宽容转换）
            el.checked = Boolean(display);
        } else if (this._controlKind === "radio") {
            // radio：值匹配（state 值与 radio 的 value 属性比较）
            el.checked = display === el.value;
        } else if (this._controlKind === "select") {
            // select：缓存显示值（空值回填后的 default/undefined 标记），选中态推迟重放
            this._lastDisplayValue = display;
            this._scheduleSelectReplay();
        } else {
            // text-like：写 el.value（display 已过空值回填，undefined 即空串语义）
            el.value = display == null ? "" : String(display);
        }
    }

    /**
     * 解析空值回填的 default（ADR-0027 决策 3）：模板 > schema 两级，静态值 only。
     *
     * - 模板：`getOption("default")`（`x-model-options="{default:...}"` / `x-options` 回退）；
     * - schema：`configurable(v, {default: y})` 的 `default` 元数据（created 期静态读取缓存）；
     * - 均无 → `undefined`（调用方按控件空值显示处理——text-like 空串、select 首项）。
     */
    private _resolveDefault(): any {
        const tpl = this.getOption("default");
        if (tpl !== undefined) return tpl;
        return this._schemaDefault;
    }

    /** 静态读取 schema.default 元数据（configManager 缺席/表达式绑定/无 default 时 undefined） */
    private _readSchemaDefault(): any {
        const fullKey = this._fullConfigKey();
        if (!fullKey) return undefined;
        const cm = (this.engine.store as any).configManager;
        const schema = (cm.state as Record<string, any>)[fullKey];
        return schema?.default;
    }

    /** schema.autoSelect 元数据（ADR-0028 决策 2 第二级；undefined=未声明，由 _resolveAutoSelect 兜底） */
    private _readSchemaAutoSelect(): boolean | undefined {
        const fullKey = this._fullConfigKey();
        if (!fullKey) return undefined;
        const cm = (this.engine.store as any).configManager;
        const schema = (cm.state as Record<string, any>)[fullKey];
        const v = schema?.autoSelect;
        return typeof v === "boolean" ? v : undefined;
    }

    /**
     * 解析 autoSelect（ADR-0028 决策 2）：模板显式声明 > schema 元数据 > 默认 true。
     * 模板侧 getOption 未声明时返回 undefined（两层回退穿透），与 boolean false 区分。
     */
    private _resolveAutoSelect(): boolean {
        const tpl = this.getOption("autoSelect");
        if (typeof tpl === "boolean") return tpl;
        if (this._schemaAutoSelect !== undefined) return this._schemaAutoSelect;
        return true;
    }

    /**
     * 求值 get（state→DOM 变换）。
     *
     * ACTION_RE 分派：匹配 `name(args)?` → 调 action（当前值作首参 + 括号追加参数，`this`=ctx）；
     * 否则 → 表达式（形参 `value`=当前 state 值，`with(scope)` 注入状态）。
     */
    private _evalGet(getExpr: string, value: any): any {
        const scopeCtx = this.binding.getContext();
        const m = getExpr.trim().match(ACTION_RE);
        const name = m?.[1];
        if (name) {
            const action = this.binding.getAction(name);
            if (typeof action === "function") {
                const args = this._evalArgs(m?.[2], "value", value, scopeCtx);
                return action.call(this._makeCtx({ value }), value, ...args);
            }
        }
        try {
            return compileFn("value,scope", `with(scope){ return (${getExpr}); }`)(
                value,
                scopeCtx,
            );
        } catch (e: any) {
            this.engine.logger.warn(`x-model get "${getExpr}" 求值失败: ${e?.message ?? e}`);
            return value; // 求值失败回退原值
        }
    }

    /**
     * 求值 set（DOM→state 变换）。
     *
     * ACTION_RE 分派：匹配 `name(args)?` → 调 action（DOM 值作首参 + 括号追加参数）；
     * 否则 → 表达式（形参 `$value`=DOM 输入值，`with(scope)` 注入；语句体执行赋值，可写多字段）。
     */
    private _evalSet(setExpr: string, $value: any): void {
        const scopeCtx = this.binding.getContext();
        const m = setExpr.trim().match(ACTION_RE);
        const name = m?.[1];
        if (name) {
            const action = this.binding.getAction(name);
            if (typeof action === "function") {
                const args = this._evalArgs(m?.[2], "$value", $value, scopeCtx);
                action.call(this._makeCtx({ $value }), $value, ...args);
                return;
            }
        }
        try {
            compileFn("$value,scope", `with(scope){ ${setExpr} }`)($value, scopeCtx);
        } catch (e: any) {
            this.engine.logger.warn(`x-model set "${setExpr}" 执行失败: ${e?.message ?? e}`);
        }
    }

    /**
     * 求 action 调用括号内的追加参数。
     *
     * 首参（get 的 value / set 的 $value）由框架自动注入，括号内仅声明**额外**参数
     * （如 `splitIp(1)` 的 `1`，经 `with(data)` 求值，可引用 scope 内其他字段）。
     */
    private _evalArgs(
        argsSrc: string | undefined,
        injectName: string,
        injectVal: any,
        scopeCtx: any,
    ): any[] {
        if (argsSrc == null || argsSrc.trim() === "") return [];
        try {
            return compileFn(`${injectName},data`, `with(data){return [${argsSrc}];}`)(
                injectVal,
                scopeCtx,
            ) as any[];
        } catch (e: any) {
            this.engine.logger.warn(`x-model 参数 "${argsSrc}" 求值失败: ${e?.message ?? e}`);
            return [];
        }
    }

    /**
     * 构造 action 调用上下文：复用 x-on 的 `AutoTemplateActionContext`（el/data/scope/store/state/
     * engine/$options），附加 get 的 `value` 或 set 的 `$value`。`$event` 无意义（x-model 非事件驱动）。
     */
    private _makeCtx(extra: { value?: any; $value?: any }): AutoTemplateActionContext & {
        value?: any;
        $value?: any;
    } {
        const engine = this.engine;
        return {
            el: this.el,
            $event: undefined as any,
            data: this.binding.getContext(),
            scope: this.binding,
            store: engine.store,
            state: engine.store.state,
            engine,
            $options: createDirectiveOptions(this.options, this.binding.hostOptions),
            ...extra,
        };
    }
}

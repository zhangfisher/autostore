import { AutoTemplateDirectiveBase } from "../base";
import { isSimpleStatePath, type AutoTemplateScope } from "../../scope";
import { setVal } from "autostore";
import type { AutoTemplateActionContext } from "./on/types";
import { createDirectiveOptions } from "../utils/createDirectiveOptions";
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
 * x-model：输入控件与状态的双向绑定（**Hybrid 指令**）。
 *
 * 双通道职责正交（ADR-0018）：
 * - **scope 通道**（`created`/`compile`）：`scope.watch` 订阅读方向（state→DOM），支持相对表达式
 *   （x-for item / x-data 局部变量），watcher 进 `scope._updates` 随 `scope.refresh` 重跑；
 * - **observer 通道**（`mounted`/`unmounted`）：挂/移 `input`(或 `change`)事件，承接写方向（DOM→state）。
 *
 * ## 控件范围（首版）
 * text-like：`<input>`（除 checkbox/radio 外所有 type）+ `<textarea>`，统一读写 `el.value`。
 * checkbox/radio/select（数组收集/checked 语义）延后。
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
 *   `scope = binding.getScopeContext()`（localScope+dataScope+state 聚合视图）。
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
 * 默认监听 `input`；修饰符：
 * - `.change` → 改监听 `change`（失焦触发）；
 * - `.trim` → 写前 `trim()`；
 * - `.number` → 写前 `Number()`，`NaN` 回退原字符串（不破坏）。
 * 写回管道顺序：`el.value` →(.trim)→ (.number)→ `$value` → set/直写。
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
 * ## 冲突
 * `:value`/`x-bind:value` 与 `x-model` 同元素 → **编译期报错**（`created` 内抛错，两者竞写 value 属性）。
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
    // 精准匹配（通用集 + type 扩展）。仅注入 schema 有的属性（动态交集）。enable→disabled 反向。
    // name 特殊（无则路径、表达式跳过）。显式绑定优先抑制合成。

    /** 通用注入白名单（所有 text-like input + textarea）。enable 经反向映射注入 disabled（特判）。 */
    private static readonly COMMON_INJECT_ATTRS = [
        "placeholder",
        "title",
        "required",
        "readonly",
        "enable", // → disabled 反向映射（特判）
        "pattern",
        "minlength",
        "maxlength",
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
     * - enable → disabled 反向映射（决策 7）；name 特殊处理（决策 8）；
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
        const leftSegs = configStatePath.split(".");
        const configKey = store.configKey;
        const fullKey = (configKey ? [configKey, ...leftSegs] : leftSegs).join(".");
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

        // input type（决定是否扩展 min/max/step）
        const inputType = (el as HTMLInputElement).type ?? "text";

        /** 合成一个 bind 指令实例（@ 配置引用）并 created，push 进 scope.directives */
        const synth = (attr: string, schemaAttr: string) => {
            if (explicitAttrs.has(attr)) return; // 显式绑定优先
            const info: AutoDirectiveInfo = {
                name: "bind",
                attr,
                value: `${configStatePath}@${schemaAttr}`,
            };
            const bind = new BindCls(engine, scope, info);
            bind.created();
            scope.directives.push(bind);
        };

        // 1. 通用白名单：仅注入 schema 有的属性（enable 经反向特判）
        for (const schemaAttr of ModelDirective.COMMON_INJECT_ATTRS) {
            if (!hasValue(schemaAttr as string)) continue;
            if (schemaAttr === "enable") {
                // enable → disabled 反向映射（决策 7）：值取反。不走 BindDirective（直传语义），
                // 用专用 patch + 自建 watcher，watcher 进 scope.watchers 由 scope.destroy 回收。
                if (!explicitAttrs.has("disabled")) {
                    ModelDirective._injectEnableInvert(engine, scope, el, configStatePath);
                }
            } else {
                synth(schemaAttr as string, schemaAttr as string);
            }
        }

        // 2. type 扩展：min/max/step（仅 numeric type）
        if (ModelDirective.NUMERIC_TYPES.has(inputType)) {
            for (const extra of ["min", "max", "step"]) {
                if (hasValue(extra)) synth(extra, extra);
            }
        }

        // 3. name 特殊处理（决策 8）：静态写，不走 @ 绑定
        ModelDirective._injectName(engine, el, scope, modelValue, schemaPresent ? schema : undefined);
    }

    /**
     * enable→disabled 反向映射注入（ADR-0020 决策 7）。
     *
     * schema.enable 是 boolean（true=可用），DOM disabled 语义反向。读 schema.enable 取反 patch 到
     * disabled，并 watch configManager 的该依赖路径，变化时重新取反 patch。watcher 进 scope.watchers
     * 由 scope.destroy 统一回收。
     */
    private static _injectEnableInvert(
        engine: AutoTemplateEngine,
        scope: AutoTemplateScope,
        el: HTMLElement,
        configStatePath: string,
    ): void {
        const store = engine.store as any;
        const cm = store.configManager;
        const configKey = store.configKey;
        const leftSegs = configStatePath.split(".");
        const fullKey = (configKey ? [configKey, ...leftSegs] : leftSegs).join(".");
        const cmState = cm.state as Record<string, any>;
        const readInvert = (): boolean | undefined => {
            const schema = cmState[fullKey];
            if (schema == null) return undefined;
            const enable = schema.enable;
            return enable == null ? undefined : !enable;
        };
        // collectDependencies 自动追踪 schema.enable 依赖
        let first: boolean | undefined;
        const deps = cm.collectDependencies(() => {
            first = readInvert();
        }, "read");
        // patch 取反值（disabled 属性：truthy setAttribute / falsy removeAttribute）
        const patchDisabled = (val: boolean | undefined) => {
            if (val) el.setAttribute("disabled", "");
            else el.removeAttribute("disabled");
        };
        patchDisabled(first);
        // watcher 订阅 enable 变化，回调经 scheduler 合并后取反 patch
        scope.watchers.push(
            cm.watch(deps, () => engine.scheduler.schedule(() => patchDisabled(readInvert()))),
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

    /** 防循环标志：onInput 触发的写入会让随之而来的 read 回调跳过回写（见类注释「防循环」） */
    private _selfWriting = false;
    /** 当前监听的事件类型（mounted 时据 .change 修饰符决定："input" | "change"） */
    private _eventType?: "input" | "change";
    /** created 时 read 的初始值（compile 首渲用；undefined 表示未读到/无值） */
    private _initialValue: any = undefined;
    /** 只读降级 warn 去重（表达式/computed 无 set 时仅 warn 一次） */
    private _readonlyWarned = false;
    /** DOM→state 回调（箭头函数绑定 this，供 add/removeEventListener 同引用） */
    private readonly onInput = () => this._handleInput();

    // ── scope 通道（读方向：state→DOM）──────────────────────────────

    override created() {
        // :value / x-bind:value 与 x-model 同元素 → 编译期报错（两者竞写 value 属性）
        const conflict = this.binding.directives.some(
            (d) => d.info.name === "bind" && (d as any).attr === "value",
        );
        if (conflict) {
            throw new Error(
                "x-model 与 :value/x-bind:value 不能同时作用于同一元素（两者竞写 input.value）",
            );
        }
        const expr = String(this.value ?? "");
        if (!expr.trim()) return;
        // scope.watch：纯路径走精准订阅、表达式走 collectDependencies，自动注入 localScope/dataScope。
        // 返回当前值供 compile 首渲；后续变化经 scheduler 微任务合并后回调 writeToDom。
        this._initialValue = this.binding.watch(expr, ({ value }) => this.writeToDom(value));
    }

    override compile() {
        // 首次 state→DOM 写入（state 作真相源）；undefined（路径不存在/求值失败）则跳过
        if (this._initialValue !== undefined) this.writeToDom(this._initialValue);
        else if (this.el) {
            // state 路径不存在：不动 DOM（不回填，避免 DOM 污染 state 真相源），仅 warn
            this.engine.logger.warn(
                `x-model: 绑定 "${this.value}" 初始值为 undefined（路径不存在或求值失败），保持 DOM 原值`,
            );
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
        // .change 修饰符 → 监听 change（失焦触发）；默认 input（实时）
        this._eventType = this.getOption("change") ? "change" : "input";
        this.el.addEventListener(this._eventType, this.onInput);
    }

    private _detachEvent() {
        if (this.el && this._eventType) {
            this.el.removeEventListener(this._eventType, this.onInput);
        }
        this._eventType = undefined;
    }

    /** input/change 事件处理：读 el.value → 修饰符管道 → 写 state（flags 标识 + 防循环置位） */
    private _handleInput() {
        if (!this.el) return;
        let v: any = (this.el as HTMLInputElement).value;
        // 写回管道：trim → number（顺序敏感）
        if (this.getOption("trim") && typeof v === "string") v = v.trim();
        if (this.getOption("number")) {
            const n = Number(v);
            v = Number.isNaN(n) ? v : n; // NaN 回退原字符串，不破坏
        }
        // 防循环置位：本次写入触发的 read 回调将跳过回写
        this._selfWriting = true;
        this._writeToState(v);
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
     * 写 DOM（state→DOM 方向），含 get 变换与防循环跳过。
     *
     * 防循环：`_selfWriting=true` 表示本次值变化由 onInput 触发 → 跳过回写（避免 getter 立即覆盖
     * 用户输入、避免冗余 DOM 写），重置标志后返回。其他场景（外部改 state、其他 x-model 实例写入）
     * `_selfWriting=false`，正常更新显示。
     */
    private writeToDom(stateValue: any) {
        if (this._selfWriting) {
            this._selfWriting = false;
            return;
        }
        const getExpr = this.getOption("get");
        let display = stateValue;
        if (typeof getExpr === "string" && getExpr.trim() !== "") {
            display = this._evalGet(getExpr, stateValue);
        }
        const el = this.el as HTMLInputElement | null;
        if (el) el.value = display == null ? "" : String(display);
    }

    /**
     * 求值 get（state→DOM 变换）。
     *
     * ACTION_RE 分派：匹配 `name(args)?` → 调 action（当前值作首参 + 括号追加参数，`this`=ctx）；
     * 否则 → 表达式（形参 `value`=当前 state 值，`with(scope)` 注入状态）。
     */
    private _evalGet(getExpr: string, value: any): any {
        const scopeCtx = this.binding.getScopeContext();
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
            return new Function("value", "scope", `with(scope){ return (${getExpr}); }`)(
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
        const scopeCtx = this.binding.getScopeContext();
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
            new Function("$value", "scope", `with(scope){ ${setExpr} }`)($value, scopeCtx);
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
            return new Function(injectName, "data", `with(data){return [${argsSrc}];}`)(
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
            data: this.binding.getScopeContext(),
            scope: this.binding,
            store: engine.store,
            state: engine.store.state,
            engine,
            $options: createDirectiveOptions(this.options, this.binding.hostOptions),
            ...extra,
        };
    }
}

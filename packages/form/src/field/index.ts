/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 *
 *
 */

import { LitElement, html } from "lit";
import { property, query, queryAssignedElements, state } from "lit/decorators.js";
import type { AsyncComputedValue, Watcher, AutoStoreStateSchema, StateOperate } from "autostore";
import {
    createAsyncComptuedValue,
    isAsyncComputedValue,
    getVal,
    setVal,
    toggleWrapper,
} from "@/utils";
import { consume } from "@lit/context";
import { type AutoFormContext, context } from "../context";
import styles from "./styles";
import { toSchemaValue } from "@/utils/toSchemaValue";
import { repeat } from "lit/directives/repeat.js";
import { ContextController } from "@/controllers/context";
// import type { RequiredKeys } from "flex-tools/types"; // 暂时未使用
import { styleMap } from "lit/directives/style-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { when } from "lit/directives/when.js";
import { HostClasses } from "@/controllers/hostClasss";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { applyCustomStyles } from "@/utils/applyCustomStyles";
import { applyClass } from "@/utils/applyClass";

function getDefaultFieldOptions() {
    return {
        widget: "input",
        name: "",
        path: [],
        visible: true,
        enable: true,
        required: false,
        order: 0,
        advanced: false,
        actions: [],
    };
}

/**
 * 联动函数属性的豁免名单（与 core Computedable 规则一致）：
 * validate 与 on、to、render 前缀的属性是业务回调，不参与联动求值
 */
const DYNAMIC_EXEMPT_KEY = /^(validate|on.+|to.+|render.+)$/;

export type FieldOptions<Options = unknown> = any & Options;

export class AutoField<Options = unknown> extends LitElement {
    static styles = styles;
    theme = new ContextController(this);
    classs = new HostClasses(this);

    @property({ type: Object })
    schema?: AutoStoreStateSchema & Options;

    // 根据schmea生成options
    options: FieldOptions<Options> = getDefaultFieldOptions() as unknown as FieldOptions<Options>;
    // 父字段，当嵌套时
    parent?: AutoField;

    @state()
    value: any = "";

    name: string = "";
    path: string = "";

    @state()
    errorMessage?: string;

    @state()
    labelPos: string = "top";

    @state()
    dirty: boolean = false;

    /**
     * 是否启用响应式
     * 默认情况下，当字段更新时会自动更新state,并且在state变化时也会同步更新value
     *
     * =false时则不会监听状态变更
     */
    @property({ type: Boolean, reflect: true })
    noreactive?: boolean = false;

    @property({ type: Boolean, reflect: true })
    compact?: boolean;

    beforeActions: any[] = [];
    afterActions: any[] = [];

    @queryAssignedElements({ slot: "value", flatten: true })
    _field!: Array<HTMLElement>;

    _subscribers: Watcher[] = [];

    @query(
        ".value sl-input,sl-radio-group,sl-checkbox,sl-switch,sl-range,sl-textarea,sl-rating,sl-select,sl-color-picker",
    )
    input!: HTMLInputElement;

    // subscribe: true 使字段持续订阅 context 变更（如运行时切换 validAt）
    // 非订阅模式下消费者仅在首次连接时收到一次值，后续 form 更新 context 的引用不可达
    @consume({ context, subscribe: true })
    @property({ attribute: false })
    public context!: AutoFormContext;

    get shadow() {
        return this.shadowRoot!;
    }

    /**
     * 转换为AsyncComputedValue
     */
    getFieldOptions(): FieldOptions<Options> {
        const schema = this.schema || {};
        // let result: Record<string, any> = Object.assign(
        //     {},
        //     getDefaultFieldOptions(),
        //     this.getInitialOptions(),
        // );
        // for (const [key, value] of Object.entries(schema)) {
        //     if (isAsyncComputedValue(value)) {
        //         result[key] = value.value;
        //     } else {
        //         result[key] = value;
        //     }
        // }
        // return result;
        return Object.entries(schema).reduce(
            (result: any, [key, value]) => {
                if (isAsyncComputedValue(value)) {
                    result[key] = value.value;
                } else {
                    result[key] = value;
                }
                return result;
            },
            Object.assign({}, getDefaultFieldOptions(), this.getInitialOptions()),
        ) as FieldOptions<Options>;
    }

    getPrefix() {}
    getSuffix() {}
    renderActions(slot: boolean = true) {
        return html`${this.renderBeforeActions(slot)} ${this.renderAfterActions(slot)}`;
    }
    _onClickAction(action: any, callback?: (e: any) => void) {
        return (e: any) => {
            if (typeof callback === "function") {
                callback(e);
            }
            if (action.onClick && typeof action.onClick === "function") {
                action.onClick?.call(this, this.getInputValue(), {
                    action,
                    options: this.options as AutoStoreStateSchema,
                    event: e,
                    update: (value: any) => {
                        setVal(this.context.store?.state, this.options.path as string[], value);
                    },
                });
            }
        };
    }
    renderBeforeActions(slot?: boolean) {
        if (Array.isArray(this.beforeActions) && this.beforeActions.length > 0) {
            return html`<div
                class="actions before"
                part="before-actions"
                slot="${ifDefined(slot ? "prefix" : undefined)}"
            >
                ${repeat(this.beforeActions, (action) => {
                    return this.renderActionWidget(action);
                })}
            </div>`;
        }
    }
    renderAfterActions(slot?: boolean) {
        if (Array.isArray(this.afterActions) && this.afterActions.length > 0) {
            return html`<div
                class="actions after"
                part="after-actions"
                slot="${ifDefined(slot ? "suffix" : undefined)}"
            >
                ${repeat(this.afterActions, (action) => {
                    return this.renderActionWidget(action);
                })}
            </div>`;
        }
    }
    _renderDropdownAction(action: any) {
        return html`
            <sl-dropdown
                class="action-widget"
                hoist
                title=${ifDefined(action.tips)}
                placement=${(action as any).pos === "before" ? "bottom-start" : "bottom-end"}
            >
                <sl-button slot="trigger" ?caret=${action.caret}>
                    ${when(
                        action.icon,
                        () => html`<sl-icon name=${ifDefined(action.icon)}></sl-icon>`,
                    )}
                    ${action.label}
                </sl-button>
                <sl-menu>
                    ${repeat(action.items || [], (item: any) => {
                        if (item === "-") {
                            return html`<sl-divider></sl-divider>`;
                        }
                        if (typeof item === "string") item = { label: item };
                        return html`<sl-menu-item
                            @click=${this._onClickAction.call(this, item, () => {
                                if (action.syncMenu) {
                                    action.label = item.label;
                                    action.icon = item.icon;
                                    action.tips = item.tips;
                                    this.requestUpdate();
                                }
                            })}
                        >
                            ${when(
                                item.icon,
                                () =>
                                    html`<sl-icon
                                        name=${ifDefined(item.icon)}
                                        slot="prefix"
                                    ></sl-icon>`,
                            )}
                            ${item.label}</sl-menu-item
                        >`;
                    })}
                </sl-menu>
            </sl-dropdown>
        `;
    }
    _renderButtonAction(action: any) {
        return html`
            <sl-button
                class="action-widget"
                title=${ifDefined(action.tips)}
                variant=${ifDefined(action.variant)}
                size=${action.size || this.context.size}
                @click=${this._onClickAction.call(this, action)}
            >
                ${when(action.icon, () => html`<sl-icon name=${ifDefined(action.icon)}></sl-icon>`)}
                ${action.label}
            </sl-button>
        `;
    }
    _renderImageAction(action: any) {
        return html`
            <sl-button
                title="${ifDefined(action.tips)}"
                variant="text"
                class="action-widget image"
                @click=${this._onClickAction.call(this, action)}
            >
                <img src="${ifDefined(action.url)}" />
            </sl-button>
        `;
    }
    renderActionWidget(action: any) {
        if (typeof action !== "object") return;
        const type = action.type || "button";
        if (type === "dropdown") {
            return this._renderDropdownAction(action);
        } else if (type === "button") {
            return this._renderButtonAction(action);
        } else if (type === "image") {
            return this._renderImageAction(action);
        } else {
        }
    }
    renderOption(name: string, render?: (value: any) => any) {
        const option = (this.schema as any)[name];
        if (!option) return;
        if (option.loading) {
            return html`<sl-spinner></sl-spinner>`;
        } else {
            return html`${render ? render(this.options.required) : this.options.required}</div>`;
        }
    }
    getLabel() {
        return this.getSchema().label || this.name;
    }

    getSchema() {
        return this.schema!;
    }

    toView(value: any) {
        if (this.options.toView && typeof this.options.toView === "function") {
            return this.options.toView.call(this, value);
        }
        return value;
    }
    toState(value: any) {
        if (this.options.toState && typeof this.options.toState === "function") {
            return this.options.toState.call(this, value);
        }
        return value;
    }

    toInput(value: any) {
        if (this.options.toInput && typeof this.options.toInput === "function") {
            return this.options.toInput.call(this, value);
        }
        return value;
    }
    getOptionValue(name: string, defaultValue?: any): any {
        if (this.schema && name in this.schema) {
            // @ts-ignore
            const value = this.schema[name];
            if (value === undefined) {
                return defaultValue;
            } else if (isAsyncComputedValue(value)) {
                return value.value;
            } else {
                return value;
            }
        } else {
            return defaultValue;
        }
    }

    getOption<T extends keyof typeof this.options>(
        name: T,
    ): AsyncComputedValue<(typeof this.options)[T]> | undefined {
        if (this.schema && name in this.schema) {
            // @ts-ignore
            const value = this.schema[name];
            if (isAsyncComputedValue(value)) {
                return value;
            } else {
                return createAsyncComptuedValue(value) as AsyncComputedValue<
                    (typeof this.options)[T]
                >;
            }
        }
    }

    getInputValue(): any {
        if (!this.input) return "";
        let value: any = this.input.value;
        if (typeof this.options.toState !== "function") {
            const datatype = this.options.datatype || "string";
            if (datatype === "number") {
                value = Number(value);
            } else if (datatype === "boolean") {
                value = Boolean(value);
            }
        }
        return value;
    }

    _renderRequiredOption() {
        return this.renderOption("required", (val) => {
            return val ? html`<span style="color:red;">*</span>` : "";
        });
    }

    renderHelp(onlyIcon: boolean = false) {
        const helpText = this.options.help;
        if (!helpText) return;
        const urlMatches = helpText.match(/\(([^)]+)\)[^)]*$/);
        const url = urlMatches ? urlMatches[1] : null;
        const help = url ? helpText.replace(`(${url})`, "") : helpText;

        return html`<span
            class="help"
            part="field-help"
            title="${ifDefined(onlyIcon ? help : undefined)}"
        >
            ${toggleWrapper(
                !!url,
                html`
                    <sl-icon name="help"></sl-icon>
                    ${when(!onlyIcon, () => html`${help}`)}
                `,
                (content: any) => html`<a target="_blank" href="${url!}">${content}</a>`,
            )}
        </span>`;
    }

    renderLabel() {
        const ctx = this.context;
        const labelPos = this.options.labelPos || ctx.labelPos;
        if (labelPos === "none") {
            return html``;
        } else {
            const style: Record<string, any> = {};
            if ((ctx.labelWidth && labelPos === "left") || ctx.viewonly) {
                style.width = ctx.labelWidth;
            }
            return html`<div class="label" part="field-label" style="${ifDefined(styleMap(style))}">
                <span class="title">
                    ${this.getLabel()}
                    ${when(ctx.viewonly, () => this.renderHelp(true))}
                    ${this._renderRequiredOption()}
                </span>
                ${when(labelPos === "top" && !ctx.viewonly, () => this.renderHelp())}
            </div>`;
        }
    }
    renderInput() {
        return html``;
    }
    /**
     * 输入过程中清除错误显示
     *
     * validAt=lost-focus 时输入事件不触发校验，旧错误会一直滞留到失焦，
     * 用户已按提示修正输入，应在重新输入时立即清除错误提示
     */
    clearError() {
        if (!this.errorMessage) return;
        this.errorMessage = undefined;
        this._updateFormClasss();
    }
    isShowError() {
        if (this.context.validAtInit) {
            return !!this.errorMessage;
        } else {
            // 不显示
            return this.dirty ? !!this.errorMessage : false;
        }
    }
    renderError() {
        return this.isShowError() ? html`<div class="error">${this.errorMessage}</div>` : html``;
    }
    onFieldChange = () => this._updateFieldValue();
    // 输入即校验（validAt=input）走 _updateFieldValue；失焦校验模式下输入不
    // 触发校验，只清除旧错误，待失焦时再校验
    onFieldInput = () =>
        this.context.validAt === "input"
            ? this._updateFieldValue()
            : this.clearError();

    /**
     * 当schmeaOption发生变化时
     */
    _handleSchemaChange() {
        const ctx = this.context;
        if (ctx?.store && this.schema) {
            const path = this.getPath();
            if (!path || !Array.isArray(path) || path.length === 0) return;
            const pathKeys = path.join("_$_");
            // 监听schema变化,schema什么会变化，当schema成员是一个计算函数时，会在所依赖的状态变化时重新计算而导致变化
            this._subscribers.push(
                ctx.store.watch(
                    `${pathKeys}.**`,
                    (operate: any) => {
                        const { reply, type, value, flags } = operate;
                        if (reply) return;
                        //
                        if (ctx.form.seq === flags) return;
                        const ops = type === "batch" ? value : [operate];
                        ops.forEach((op: StateOperate) => {
                            const tPath = op.path.slice(1);
                            setVal(this.schema, tPath, op.value);
                            (this.options as any)[tPath[0]] = op.value;
                        });
                        // 重新渲染
                        this.requestUpdate();
                    },
                    {
                        operates: "write",
                    },
                ),
            );
        }
    }
    /**
     * 对 schema 中的联动函数属性（enable/visible/choices 等）求值
     *
     * 约束：与 core 的 Computedable 规则一致——validate 及 on、to、render 前缀
     * 的属性是业务回调，name/value/path 等是系统保留键，均不参与联动求值。
     * 求值在主 store 的 state 上进行，函数内读取的路径由 collectDependencies
     * 收集，随后 watch 这些依赖，变化时重新求值并刷新字段。
     */
    private _evalDynamicOptions() {
        const ctx = this.context;
        const store = ctx?.store;
        if (!store || !this.schema) return;
        const schema: any = this.schema;
        for (const key of Object.keys(schema)) {
            const value = schema[key];
            if (typeof value !== "function" || DYNAMIC_EXEMPT_KEY.test(key)) continue;
            // collectDependencies 执行函数并收集其在 store.state 上读取的路径
            const deps = store.collectDependencies(() => {
                try {
                    (this.options as any)[key] = value.call(this, store.state);
                } catch (e: any) {
                    console.error(`Error while evaluating schema <${key}>: ${e.message}`);
                }
            });
            if (deps.length === 0) continue;
            this._subscribers.push(
                store.watch(deps, () => {
                    try {
                        (this.options as any)[key] = value.call(this, store.state);
                    } catch (e: any) {
                        console.error(`Error while evaluating schema <${key}>: ${e.message}`);
                    }
                    this.requestUpdate();
                }),
            );
        }
    }
    renderView() {
        let viewData = this.value;
        if (this.options.toView && this.options.toView) {
            try {
                viewData = this.options.toView.call(this, this.value);
            } catch (e: any) {
                console.error(`Error while toView<${this.path}>: ${e.message}`);
            }
        }
        return html`${unsafeHTML(String(viewData))}`;
    }
    /**
     * 当状态数据发生变化时
     */
    _handleStateChange() {
        // noreactive 字段（如 combine 的子字段）不订阅状态变化：
        // 聚合值回写 store 后若回流子字段会触发重渲染，输入框丢失焦点
        // 导致无法连续输入（combine 聚合场景）
        if (this.noreactive) return;
        const ctx = this.context;
        if (ctx?.store && this.schema) {
            const path = this.getPath();
            if (!path || !Array.isArray(path) || path.length === 0) return;
            this._subscribers.push(
                ctx.store.watch(
                    path.join("."),
                    (operate: any) => {
                        // 当表单change/input时更新时设置flags=form.seq
                        // 此时应不需要更新到value，否则会导致死循环
                        //if (ctx.form.seq === operate.flags) return
                        this.value = this.toInput(operate.value);
                        // 外部写入（如填充有效数据/reset）后校验状态可能已变化，需同步
                        // errorMessage，否则旧错误会一直显示。
                        // 以 configManager.errors 为准（校验失败写入、通过即删除），
                        // 不能读 schema.errorMessage——未校验时它是原始配置字符串
                        this.errorMessage = this.getFieldError();
                    },
                    { operates: "write" },
                ),
            );
        }
    }
    getStateValue() {
        const path = this.getPath();
        if (!path || !Array.isArray(path) || path.length === 0) {
            return this.value;
        }
        return this.toInput(getVal(this.context.store?.state, path));
    }
    connectedCallback(): void {
        super.connectedCallback();
        this.updateOptions();
    }
    updateOptions() {
        const ctx = this.context;
        if (ctx?.store && this.schema) {
            this.options = this.getFieldOptions();
            this.value = this.getStateValue();
            this._handleSchemaChange();
            this._handleStateChange();
            this._evalDynamicOptions();
            const path = this.getPath();
            if (path && Array.isArray(path) && path.length > 0) {
                this.path = path.join(".");
            } else {
                this.path = "";
            }
            this.name = this.options.name || this.path;
            const fieldError = this.getFieldError();
            if (fieldError !== undefined) {
                this.errorMessage = fieldError;
            }
            if (Array.isArray(this.options.actions)) {
                this.beforeActions = this.options.actions.filter(
                    (action: any) => (action as any).pos === "before",
                );
                this.afterActions = this.options.actions.filter(
                    (action: any) => (action as any).pos !== "before",
                );
            }
        }
    }
    getInitialOptions(): Record<string, any> {
        return {};
    }
    disconnectedCallback(): void {
        super.disconnectedCallback();
        this._subscribers.forEach((subscriber) => {
            subscriber.off();
        });
        // 必须清空：字段重连（如 Lit 复用/移动 DOM）时会再次 updateOptions，
        // 残留已失效的订阅句柄会导致泄漏与重复回调
        this._subscribers = [];
    }
    getLabelPos() {
        return (this.options as any).labelPos || this.context.labelPos;
    }
    /**
     * 读取本字段在 configManager.errors 中的校验错误
     *
     * core 写入 errors 的键带 configKey 前缀（configKey 非空时为
     * `<configKey>.<相对路径>`），而 this.path 是相对路径，不能直读，
     * 否则外部创建 store（configKey 默认取 store.id）时永远读不到，
     * 回退到未插值的异常 message（如"{label}不能为空"模板原样显示）
     */
    getFieldError(): string | undefined {
        const store = this.context?.store;
        if (!store?.configManager) return undefined;
        const configKey = store.options.configKey?.trim();
        const fullKey = configKey ? `${configKey}.${this.path}` : this.path;
        return store.configManager.errors[fullKey];
    }
    /**
     * 当字段更新时，同步更新表单的类或样
     */
    _updateFormClasss() {
        if (!this.context.form) return;
        applyClass(this.context.form, "dirty", this.dirty);
        applyClass(this.context.form, "invalid", !!this.errorMessage);
    }
    /**
     * 当输入框值改变时更新状态
     * @returns
     */
    _updateFieldValue() {
        if (!this.schema) return;
        const path = this.getPath();
        const value = this.toState(this.getInputValue());
        const ctx = this.context;
        ctx.dirty = true;
        this.dirty = true;
        try {
            const store = this.context.store;
            if (!this.noreactive) {
                store?.update(
                    (state) => {
                        const newVal = toSchemaValue(value, this.schema);
                        setVal(state, path, newVal);
                    },
                    {
                        flags: ctx.form.seq,
                    },
                );
                // 写入成功后主动同步校验状态：校验失败被拒的值不会写入状态（如
                // checkbox 取消勾选被 validate 拒绝），用户修正后重新写入的值与
                // 旧值相同时 watch 不触发（值未变化不派发 operate），
                // configManager.errors 已清除而本字段 errorMessage 仍滞留旧错误
                this.errorMessage = this.getFieldError();
            }
            this.dispatchEvent(
                new CustomEvent("field-change", {
                    detail: {
                        value,
                        options: this.options,
                    },
                    composed: true,
                    bubbles: true,
                }),
            );
        } catch (e: any) {
            // core 在抛错前已将渲染后的错误信息写入 configManager.errors（如 required
            // 默认渲染为"{label}不能为空"）。不能读 schema.errorMessage——未指定时它
            // 是 core 填充的原始模板"{error}"，会把模板原样显示出来
            this.errorMessage = this.getFieldError() ?? e.message;
        } finally {
            this._updateFormClasss();
        }
    }
    renderValue() {
        const labelPos = this.options.labelPos || this.context.labelPos;
        return html`
            ${this.renderInput()} ${when(this.context.viewonly || labelPos === "left", () => this.renderHelp())}
            ${this.renderError()}
        `;
    }
    getPath(): string[] {
        return this.options.path && (this.options.path as any[]).length === 0
            ? (this.parent?.getPath() as string[])
            : (this.options.path as string[]);
    }
    updated(changedProperties: Map<string, any>) {
        // schema 属性变化时重新生成 options/value（.schema 属性在
        // connectedCallback 之后才提交，必须在此补偿初始化）
        if (changedProperties.has("schema") && this.schema) {
            this.updateOptions();
        }
        if (this.options.styles) {
            applyCustomStyles(this.shadow as unknown as HTMLElement, this.options.styles);
        }
    }
    render() {
        const ctx = this.context;
        const labelPos = (this.options as any).labelPos
            ? (this.options as any).labelPos
            : ctx.labelPos;
        this.classs.use(ctx.size, {
            [`${ctx.border}-border`]: true,
            error: this.isShowError(),
            "left-label": labelPos === "left" || ctx.viewonly,
            "top-label": labelPos === "top" && !ctx.viewonly,
            disable: this.options.enable === false,
            readonly: ctx.readonly,
            viewonly: ctx.viewonly,
            compact: this.compact === undefined ? ctx.compact : this.compact,
            required: this.options.required === true,
            hidden: !this.options.visible,
            [`view-${ctx.viewAlign}`]: true,
            [`${ctx.layout}-layout`]: true,
        });
        // 字段宽度：写到宿主元素 inline style 才能覆盖表单 .fields > * 的 width:100%，
        // 未设置 width 时清空，避免字段切换 schema 后残留旧宽度
        if (this.options.width) {
            this.style.width = this.options.width;
        } else if (this.style.width) {
            this.style.width = "";
        }
        return html`
            <div class="autofield">
                ${this.options.divider ? html`<sl-divider></sl-divider>` : null}
                ${this.renderLabel()}
                <div class="value" part="field-value">
                    ${when(
                        ctx.viewonly,
                        () => this.renderView(),
                        () => this.renderValue(),
                    )}
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "auto-field": AutoField;
    }
}

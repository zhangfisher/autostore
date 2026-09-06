/**
 * 自定义字段组件示例
 * 演示 custom 组件（完全自定义渲染）的各种用法：
 * 下拉/内联展示、多输入值收集、renderSelection/renderContent、
 * toState/toInput 双向转换、inputSelectors、验证与字段联动
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html, css } from "lit";
import { configurable, computed } from "autostore";
import "../../../src";

// 邮箱「用户名@域名(订阅状态)」字符串 与 输入值数组 互转
// state 形如 "admin@autostore.com(已订阅)"
function emailToInput(value: string): any[] {
    const matched = value.match(/\(([^)]+)\)[^)]*$/);
    const mail = matched ? value.substring(0, value.length - matched[0].length) : value;
    const subscribeText = matched ? matched[1] : "没有订阅";
    return [...mail.split("@"), subscribeText === "已订阅"];
}
function emailToState(values: any[]): string {
    return `${values[0]}@${values[1]}(${values[2] ? "已订阅" : "没有订阅"})`;
}

@customElement("example-widget-custom")
class WidgetCustomExample extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
        /* custom 组件渲染原生控件，这里补齐基础外观以贴合表单风格 */
        .custom-input {
            border: none;
            outline: none;
            font-size: var(--auto-font-size, 0.875rem);
            color: var(--auto-text-color, inherit);
            background: transparent;
            padding: 2px 4px;
            min-width: 4em;
        }
        .custom-input:focus {
            border-bottom: 1px solid var(--auto-theme-color, #4f46e5);
        }
        .custom-row {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            padding: 0.25rem 0;
        }
        .custom-panel {
            padding: 0.75rem 1rem;
            line-height: 2;
        }
        .custom-price {
            font-weight: 600;
            color: #d97706;
        }
        .custom-stars {
            color: #f59e0b;
            letter-spacing: 0.25rem;
            cursor: pointer;
            user-select: none;
            font-size: 1.1rem;
        }
        .custom-stars span {
            opacity: 0.35;
        }
        .custom-stars span.on {
            opacity: 1;
        }
    `;

    state = {
        form: {
            // 1. 基础下拉用法：多个 input 拼成一个 state 字符串
            email: configurable("admin@autostore.com(已订阅)", {
                label: "电子邮件",
                widget: "custom",
                dropdown: true,
                placeholder: "请输入邮箱",
                inputSelectors: "input",
                renderSelection: (values: any[], html: any) => {
                    const subscribeText = values[2] === true ? "已订阅" : "没有订阅";
                    return html`<span
                        style="color:#dc2626;border:1px solid #fca5a5;padding:2px 6px;border-radius:4px;"
                    >
                        ${values[0]}@${values[1]}（${subscribeText}）
                    </span>`;
                },
                renderContent: (values: any[], html: any) => {
                    return html`<div class="custom-panel" style="padding:1em">
                        <div class="custom-row">
                            邮箱：
                            <input class="custom-input" .value=${values[0]} />
                            @<input class="custom-input" .value=${values[1]} />
                        </div>
                        <label class="custom-row">
                            <input type="checkbox" .checked=${values[2]} /> 订阅产品动态
                        </label>
                    </div>`;
                },
                toState: (values: any[]) => emailToState(values),
                toInput: (value: string) => emailToInput(value),
                help: "dropdown=true，renderContent 渲染下拉面板，renderSelection 渲染触发器",
            }),
            // 2. 内联展示：dropdown=false 时自定义内容直接平铺在字段区
            inlineEmail: configurable("tom@qq.com(没有订阅)", {
                label: "内联编辑",
                widget: "custom",
                dropdown: false,
                inputSelectors: "input",
                renderContent: (values: any[], html: any) => {
                    return html`<div class="custom-panel" style="padding:1em">
                        <div class="custom-row">
                            <input class="custom-input" .value=${values[0]} />
                            @<input class="custom-input" .value=${values[1]} />
                            <label> <input type="checkbox" .checked=${values[2]} /> 订阅 </label>
                        </div>
                    </div>`;
                },
                toState: (values: any[]) => emailToState(values),
                toInput: (value: string) => emailToInput(value),
                help: "dropdown=false，无触发器，内容常驻显示",
            }),
            // 3. 价格 = 数值 + 单位 + 折扣：演示 toState 聚合成对象
            price: configurable(
                { amount: 199, unit: "CNY", discount: 9 },
                {
                    label: "商品价格",
                    widget: "custom",
                    dropdown: true,
                    inputSelectors: "input,select",
                    // renderSelection 接收的是 toInput 转换后的数组（同 renderContent 的 values）
                    // 货币符号跟随选中的币种（values[1]）
                    renderSelection: (values: any[], _html: any) => {
                        const symbols: Record<string, string> = {
                            CNY: "¥",
                            USD: "$",
                            EUR: "€",
                        };
                        const symbol = symbols[values[1]] || values[1];
                        return html`<span class="custom-price">
                            ${symbol}${(Number(values[0]) * Number(values[2])) / 10}（${values[2]}折）
                        </span>`;
                    },
                    renderContent: (values: any[], html: any) => {
                        return html`<div class="custom-panel" style="padding:1em">
                            <div class="custom-row">
                                原价：
                                <input class="custom-input" type="number" .value=${values[0]} />
                                <select class="custom-input">
                                    <option value="CNY" ?selected=${values[1] === "CNY"}>
                                        CNY
                                    </option>
                                    <option value="USD" ?selected=${values[1] === "USD"}>
                                        USD
                                    </option>
                                    <option value="EUR" ?selected=${values[1] === "EUR"}>
                                        EUR
                                    </option>
                                </select>
                            </div>
                            <div class="custom-row">
                                折扣：
                                <input
                                    class="custom-input"
                                    type="range"
                                    min="1"
                                    max="10"
                                    .value=${String(values[2])}
                                />
                                <span>${values[2]} 折</span>
                            </div>
                        </div>`;
                    },
                    toState: (values: any[]) => ({
                        amount: Number(values[0]) || 0,
                        unit: values[1],
                        discount: Number(values[2]) || 10,
                    }),
                    toInput: (value: any) => [value.amount, value.unit, value.discount],
                    help: "多个原生控件聚合成一个对象状态，inputSelectors 收集 input 与 select",
                },
            ),
            // 4. 纯展示型联动：星级随「价格」折扣联动，computed 作为初值驱动
            level: computed((state: any) => (state.form.price.discount < 5 ? 5 : 3)),
            levelView: configurable(3, {
                label: "推荐星级",
                widget: "custom",
                dropdown: false,
                inputSelectors: "",
                renderContent: (values: any[], html: any) => {
                    const level = values[0];
                    return html`<div class="custom-stars" style="padding:1em">
                        ${[1, 2, 3, 4, 5].map(
                            (n) => html`<span class=${n <= level ? "on" : ""}>★</span>`,
                        )}
                        <span style="opacity:1;margin-left:0.5rem;">${level} 星</span>
                    </div>`;
                },
                help: "星级由上方折扣联动计算，custom 也可纯展示",
            }),
            // 5. 带验证的自定义输入：required + validate
            verifyCode: configurable("", {
                label: "客服工号",
                widget: "custom",
                dropdown: false,
                inputSelectors: "input",
                required: true,
                renderContent: (values: any[], html: any) => {
                    return html`<div class="custom-panel custom-row" style="padding:1em">
                        GF-
                        <input class="custom-input" .value=${values[0]} placeholder="4位数字" />
                    </div>`;
                },
                toState: (values: any[]) => `GF-${values[0]}`,
                toInput: (value: string) => [String(value || "").replace(/^GF-/, "")],
                validate: (value: string) => /^GF-\d{4}$/.test(value),
                errorMessage: "工号须为 GF- 开头的 4 位数字",
                help: "required + validate 校验自定义聚合值",
            }),
        },
    };

    //@ts-ignore
    @query("auto-form")
    formRef?: any;

    get store(): any {
        return this.formRef?.activeStore;
    }

    render() {
        return html`
            <div>
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">
                    自定义字段(custom)
                </h3>
                <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    演示 renderContent 自定义渲染、多输入值聚合、下拉/内联展示、验证与联动
                </p>
                <auto-form
                    .state="${this.state}"
                    data-label="自定义字段演示"
                    style="min-height: 600px;"
                ></auto-form>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-custom": WidgetCustomExample;
    }
}

export default WidgetCustomExample;

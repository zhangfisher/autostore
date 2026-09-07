/**
 * 日期时间选择组件示例
 * 演示日期时间选择器的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-datetime")
class WidgetDatetimeExample extends LitElement {
    state = {
        form: {
            // 基础日期时间
            datetime: configurable("2025-03-15T14:30", {
                label: "日期时间",
                widget: "datetime",
                placeholder: "请选择日期时间",
            }),
            // 带默认值
            appointment: configurable("2025-06-01T09:00", {
                label: "预约时间",
                widget: "datetime",
                help: "请选择预约的日期和时间",
            }),
            // 必填
            deadline: configurable("", {
                label: "截止时间",
                widget: "datetime",
                required: true,
                placeholder: "请选择截止日期时间",
                help: "必填项",
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">日期时间选择组件</h3>
                <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    演示日期时间选择器的各种参数配置
                </p>
                <auto-form .state="${this.state}" data-label="日期时间演示"></auto-form>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-datetime": WidgetDatetimeExample;
    }
}

export default WidgetDatetimeExample;

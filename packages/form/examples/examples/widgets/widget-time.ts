/**
 * 时间选择组件示例
 * 演示时间选择器的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-time")
class WidgetTimeExample extends LitElement {
    state = {
        form: {
            // 基础时间
            time: configurable("14:30", {
                label: "时间",
                widget: "time",
                placeholder: "请选择时间",
            }),
            // 上班时间
            startTime: configurable("09:00", {
                label: "上班时间",
                widget: "time",
                help: "默认 09:00",
            }),
            // 下班时间
            endTime: configurable("18:00", {
                label: "下班时间",
                widget: "time",
                help: "默认 18:00",
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">时间选择组件</h3>
                <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    演示时间选择器的各种参数配置
                </p>
                <auto-form
                    .state="${this.state}"
                    data-label="时间演示"
                    style="min-height: 400px;"
                ></auto-form>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-time": WidgetTimeExample;
    }
}

export default WidgetTimeExample;

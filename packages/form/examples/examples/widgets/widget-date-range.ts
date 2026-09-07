/**
 * 日期范围选择组件示例
 * 演示日期范围选择器的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-date-range")
class WidgetDateRangeExample extends LitElement {
    state = {
        form: {
            // 基础日期范围
            dateRange: configurable("2025-01-01,2025-12-31", {
                label: "日期范围",
                widget: "date-range",
                delimiter: ",",
            }),
            // 带时间的日期范围
            datetimeRange: configurable("2025-01-01T09:00,2025-01-01T18:00", {
                label: "日期时间范围",
                widget: "date-range",
                includeTime: true,
                delimiter: ",",
            }),
            // 自定义分隔符
            customDelimiter: configurable("2025-03-01 ~ 2025-03-31", {
                label: "自定义分隔符",
                widget: "date-range",
                delimiter: "~",
                help: "使用 ~ 作为分隔符",
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">日期范围选择组件</h3>
                <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    演示日期范围选择器的各种参数配置
                </p>
                <auto-form .state="${this.state}" data-label="日期范围演示"></auto-form>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-date-range": WidgetDateRangeExample;
    }
}

export default WidgetDateRangeExample;

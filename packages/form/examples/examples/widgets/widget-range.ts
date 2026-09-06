/**
 * 范围滑块组件示例
 * 演示范围滑块的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-range")
class WidgetRangeExample extends LitElement {
    state = {
        form: {
            // 基础滑块
            volume: configurable(50, {
                label: "音量",
                widget: "range",
                min: 0,
                max: 100,
                step: 1,
            }),
            // 带步长
            brightness: configurable(70, {
                label: "亮度",
                widget: "range",
                min: 0,
                max: 100,
                step: 10,
                help: "步长: 10",
            }),
            // 小范围
            rating: configurable(3, {
                label: "评分",
                widget: "range",
                min: 1,
                max: 5,
                step: 1,
                help: "范围: 1-5",
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">范围滑块组件</h3>
                <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    演示范围滑块的各种参数配置
                </p>
                <auto-form
                    .state="${this.state}"
                    data-label="范围滑块演示"
                    style="min-height: 400px;"
                ></auto-form>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-range": WidgetRangeExample;
    }
}

export default WidgetRangeExample;

/**
 * 颜色选择器组件示例
 * 演示颜色选择器的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-color-picker")
class WidgetColorPickerExample extends LitElement {
    state = {
        form: {
            // 基础颜色选择
            color: configurable("#1890ff", {
                label: "主题色",
                widget: "colorpicker",
            }),
            // 带预设颜色
            presetColor: configurable("#52c41a", {
                label: "状态色",
                widget: "colorpicker",
                presets: ["#52c41a", "#1890ff", "#faad14", "#f5222d", "#722ed1"],
            }),
            // 支持透明度
            bgColor: configurable("rgba(24, 144, 255, 0.8)", {
                label: "背景色",
                widget: "colorpicker",
                opacity: true,
                help: "支持透明度调节",
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">颜色选择器组件</h3>
                <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    演示颜色选择器的各种参数配置
                </p>
                <auto-form
                    .state="${this.state}"
                    data-label="颜色选择器演示"
                    style="min-height: 400px;"
                ></auto-form>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-color-picker": WidgetColorPickerExample;
    }
}

export default WidgetColorPickerExample;

/**
 * 单选按钮组组件示例
 * 演示单选按钮组的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-radio-button")
class WidgetRadioButtonExample extends LitElement {
    state = {
        form: {
            // 基础单选按钮组
            size: configurable("medium", {
                label: "尺寸",
                widget: "radio-button",
                choices: ["small", "medium", "large"],
            }),
            // 带图标
            status: configurable("active", {
                label: "状态",
                widget: "radio-button",
                choices: [
                    { label: "启用", value: "active", icon: "check-circle" },
                    { label: "禁用", value: "disabled", icon: "x-circle" },
                    { label: "待审", value: "pending", icon: "clock" },
                ],
            }),
            // 必填
            requiredField: configurable("", {
                label: "必填项",
                widget: "radio-button",
                required: true,
                choices: ["选项A", "选项B", "选项C"],
                placeholder: "请选择",
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
            <div >
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">
                        单选按钮组组件
                    </h3>
                    <p
                        style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;"
                    >
                        演示单选按钮组的各种参数配置
                    </p>
                    <auto-form
                        .state="${this.state}"
                        data-label="单选按钮组演示"
                        
                    ></auto-form>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-radio-button": WidgetRadioButtonExample;
    }
}

export default WidgetRadioButtonExample;

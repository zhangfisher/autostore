/**
 * 开关组件示例
 * 演示开关切换组件的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-switch")
class WidgetSwitchExample extends LitElement {
    state = {
        form: {
            // 基础用法
            enableFeature: configurable(false, {
                label: "启用功能",
                widget: "switch",
            }),
            // 默认开启
            darkMode: configurable(true, {
                label: "深色模式",
                widget: "switch",
                help: "默认开启",
            }),
            // 必填
            agreeTerms: configurable(false, {
                label: "同意服务条款",
                widget: "switch",
                required: true,
                validate: (value: any) => value === true,
                errorMessage: "必须同意服务条款",
                help: "必填，需开启才能提交",
            }),
            // 联动控制（配合其他字段）
            dhcp: configurable(false, {
                label: "自动获取IP",
                widget: "switch",
                help: "开启后禁用IP/网关输入",
            }),
            // choices 双值选项：切换时取各项 value，开关旁显示当前项 label
            notify: configurable("email", {
                label: "通知方式",
                widget: "switch",
                choices: [
                    { label: "邮件通知", value: "email" },
                    { label: "短信通知", value: "sms" },
                ],
                help: "choices 模式，值在 email/sms 间切换",
            }),
            // choices 无 label：仅切换值，开关旁不显示文字
            protocol: configurable("https", {
                label: "通信协议",
                widget: "switch",
                choices: [{ value: "https" }, { value: "http" }],
                help: "choices 项无 label，开关旁不显示文字",
            }),
            // 只读
            readonlySwitch: configurable(true, {
                label: "系统通知",
                widget: "switch",
                readOnly: true,
                help: "只读模式，不可修改",
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">开关组件</h3>
                <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                    演示开关切换组件的各种参数配置
                </p>

                <auto-form
                    .state="${this.state}"
                    data-label="开关参数演示"
                    style="min-height: 400px;"
                >
                </auto-form>

                <div
                    style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;"
                >
                    <h4 style="margin: 0 0 1rem 0;">📋 参数说明</h4>
                    <div
                        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.875rem;"
                    >
                        <div><code>widget: 'switch'</code> 开关组件类型</div>
                        <div>值类型: <code>boolean</code>（true/false）</div>
                        <div><code>choices</code> 双值选项（优先于 switchValues）</div>
                        <div><code>choices</code> 项 <code>label</code> 缺省时不显示</div>
                        <div><code>required</code> 必填标记（需为true）</div>
                        <div><code>validate</code> 自定义验证</div>
                        <div><code>readOnly</code> 只读模式</div>
                        <div>常用于联动控制其他字段</div>
                    </div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-switch": WidgetSwitchExample;
    }
}

export default WidgetSwitchExample;

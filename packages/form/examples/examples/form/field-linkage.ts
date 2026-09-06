/**
 * 字段联动示例
 * 演示字段间的各种联动关系
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-field-linkage")
class FieldLinkageExample extends LitElement {
    state = {
        form: {
            dhcp: configurable(false, {
                label: "自动获取IP",
                widget: "switch",
            }),
            ip: configurable("192.168.1.100", {
                label: "IP地址",
                widget: "ipaddress",
                enable: (state: any) => !state.form.dhcp,
                help: "DHCP关闭时可编辑",
            }),
            gateway: configurable("192.168.1.1", {
                label: "默认网关",
                widget: "ipaddress",
                enable: (state: any) => !state.form.dhcp,
                help: "DHCP关闭时可编辑",
            }),
            showAdvanced: configurable(false, {
                label: "显示高级选项",
                widget: "switch",
            }),
            apiKey: configurable("", {
                label: "API Key",
                placeholder: "请输入API Key",
                visible: (state: any) => state.form.showAdvanced,
                help: "仅在高级模式下显示",
            }),
            secretKey: configurable("", {
                label: "Secret Key",
                widget: "password",
                placeholder: "请输入Secret Key",
                visible: (state: any) => state.form.showAdvanced,
                help: "仅在高级模式下显示",
            }),
            country: configurable("中国", {
                label: "国家",
                widget: "select",
                choices: ["中国", "美国", "日本"],
            }),
            province: configurable("", {
                label: "省份",
                widget: "select",
                choices: (state: any) => {
                    const map: Record<string, string[]> = {
                        中国: ["广东省", "福建省", "浙江省", "北京市"],
                        美国: ["California", "New York", "Texas"],
                        日本: ["東京都", "大阪府", "北海道"],
                    };
                    return map[state.form.country] || [];
                },
                help: "根据国家动态加载省份列表",
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">字段联动</h3>
                <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    演示字段间的各种联动关系：启用/禁用、显示/隐藏、值联动
                </p>
                <auto-form
                    .state="${this.state}"
                    data-label="字段联动演示"
                    style="min-height: 500px;"
                ></auto-form>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-field-linkage": FieldLinkageExample;
    }
}

export default FieldLinkageExample;

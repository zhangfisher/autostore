/**
 * 字段联动示例
 * 演示字段间的各种联动关系
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";
import "../../shared/form-props-panel";

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
                        "中国": ["广东省", "福建省", "浙江省", "北京市"],
                        "美国": ["California", "New York", "Texas"],
                        "日本": ["東京都", "大阪府", "北海道"],
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

    @query("#state-viewer")
    stateViewer?: any;

    get store(): any {
        return this.formRef?.activeStore;
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.updateComplete.then(() => {
            if (this.store) {
                this.store.watch(() => {
                    if (this.stateViewer) {
                        this.stateViewer.value = JSON.stringify(this.store.state, null, 2);
                    }
                });
                this._syncInitialState();
            }
            const propsPanel = this.shadowRoot?.querySelector("#props-panel") as any;
            const form = this.shadowRoot?.querySelector("auto-form");
            if (propsPanel && form) propsPanel.setTarget(form);
        });
    }

    render() {
        return html`
            <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 1.5rem; height: 100%;">
                <div style="min-width: 0;">
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">字段联动</h3>
                    <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                        演示字段间的各种联动关系：启用/禁用、显示/隐藏、值联动
                    </p>
                    <auto-form .state="${this.state}" data-label="字段联动演示" style="min-height: 500px;"></auto-form>
                </div>
                <div style="display: flex; flex-direction: column; gap: 1rem; min-width: 0;">
                    <form-props-panel id="props-panel"></form-props-panel>
                    <div style="flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; display: flex; flex-direction: column; min-height: 0;">
                        <h4 style="margin: 0 0 0.5rem 0; color: #475569; font-size: 0.875rem;">📋 实时状态</h4>
                        <textarea id="state-viewer" readonly style="flex: 1; min-height: 0; background: #ffffff; color: #334155; border: 1px solid #e2e8f0; border: none; padding: 0.5rem; font-family: monospace; font-size: 0.75rem; resize: none; overflow: auto;"></textarea>
                    </div>
                </div>
            </div>
        `;
    }

    private _syncInitialState() {
        if (this.store && this.stateViewer) {
            this.stateViewer.value = JSON.stringify(this.store.state, null, 2);
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-field-linkage": FieldLinkageExample;
    }
}

export default FieldLinkageExample;

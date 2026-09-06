/**
 * IP地址输入组件示例
 * 演示IP地址输入框的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-ipaddress")
class WidgetIpAddressExample extends LitElement {
    state = {
        form: {
            // 基础IP地址
            ip: configurable("192.168.1.1", {
                label: "IP地址",
                widget: "ipaddress",
                placeholder: "请输入IP地址",
            }),
            // 服务器IP
            serverIp: configurable("10.0.0.1", {
                label: "服务器IP",
                widget: "ipaddress",
                help: "请输入服务器IP地址",
            }),
            // 网关
            gateway: configurable("192.168.1.254", {
                label: "网关",
                widget: "ipaddress",
                placeholder: "请输入网关地址",
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
                        IP地址输入组件
                    </h3>
                    <p
                        style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;"
                    >
                        演示IP地址输入框的各种参数配置
                    </p>
                    <auto-form
                        .state="${this.state}"
                        data-label="IP地址演示"
                        style="min-height: 400px;"
                    ></auto-form>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-ipaddress": WidgetIpAddressExample;
    }
}

export default WidgetIpAddressExample;

/**
 * 网络配置示例
 * 演示IP地址、子网掩码、网关等网络配置功能
 *
 * 功能说明：
 * - 使用 switch 组件控制 DHCP 模式
 * - 根据 DHCP 状态动态启用/禁用其他字段
 * - 使用 ipaddress 组件配置网络地址
 * - 数据转换：连接超时需要转换（秒 <-> 毫秒）
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, PropertyValues, html } from "lit";
import { AutoStore, configurable } from "autostore";
import "../../../src";

@customElement("example-network-config")
class NetworkConfigExample extends LitElement {
    // 网络配置状态定义
    networkState = {
        network: {
            dhcp: configurable(false, {
                label: "自动获取IP地址",
                widget: "switch",
            }),
            ip: configurable("192.168.1.100", {
                label: "IP地址",
                widget: "ipaddress",
                // 当DHCP启用时禁用IP输入
                enable: (state: any) => !state.network.dhcp,
            }),
            mask: configurable("255.255.255.0", {
                label: "子网掩码",
                widget: "ipaddress",
                // DHCP模式下隐藏子网掩码
                visible: (state: any) => !state.network.dhcp,
            }),
            gateway: configurable("192.168.1.1", {
                label: "默认网关",
                widget: "ipaddress",
                enable: (state: any) => !state.network.dhcp,
            }),
            timeout: configurable(100000, {
                label: "连接超时(秒)",
                group: "api",
                widget: "number",
                // 数据转换：UI显示秒数，存储为毫秒数
                toState: (value: any) => {
                    return value * 1000;
                },
                toInput: (value: any) => {
                    return value / 1000;
                },
            }),
        },
    };

    connectedCallback(): void {
        super.connectedCallback();

        // 等待表单组件渲染完成，然后监听内部 store 状态变化
        this.updateComplete.then(() => {
            const form = this.shadowRoot?.querySelector("auto-form");
            if (form && (form as any).activeStore) {
                const store = (form as any).activeStore;
                store.watch(() => {
                    if (this.viewer) {
                        this.viewer.innerText = JSON.stringify(store.state, null, 2);
                    }
                });
                // 首次渲染后立即输出状态
                if (this.viewer) {
                    this.viewer.innerText = JSON.stringify(store.state, null, 2);
                }
            }
        });
    }

    /**
     * 内部 store（由 <auto-form .state> 创建，经 activeStore 代理访问）
     */
    get store(): any {
        return this.formRef?.activeStore;
    }

    //@ts-ignore
    @query("auto-form")
    formRef?: any;

    @query("#viewjson")
    viewer?: any;

    render() {
        return html`
            <div style="display: flex; gap: 2rem; padding: 1rem;">
                <!-- 表单区域 -->
                <div style="flex: 1; min-width: 0;">
                    <div style="margin-bottom: 1rem;">
                        <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">
                            网络配置示例
                        </h3>
                        <p
                            style="margin: 0 0 1rem 0; color: var(--auto-text-light); font-size: 0.9rem;"
                        >
                            演示IP地址配置、DHCP模式切换和数据转换功能
                        </p>
                    </div>

                    <auto-form
                        .state="${this.networkState}"
                        path="network"
                        style="min-height: 300px;"
                    >
                    </auto-form>

                    <!-- 操作按钮 -->
                    <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                        <sl-button @click="${this._resetForm}">重置</sl-button>
                        <sl-button @click="${this._logState}" variant="neutral">查看状态</sl-button>
                    </div>
                </div>

                <!-- 状态预览 -->
                <div
                    style="flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; display: flex; flex-direction: column; min-height: 0;"
                >
                    <h4 style="margin: 0 0 0.5rem 0; color: #475569; font-size: 0.875rem;">📋 实时状态</h4>
                    <textarea id="state-viewer" readonly style="flex: 1; min-height: 0; background: #ffffff; color: #334155; border: 1px solid #e2e8f0; border-radius: 4px; padding: 0.5rem; font-family: monospace; font-size: 0.75rem; resize: none; overflow: auto;"></textarea>
                    ></pre>
                </div>
            </div>
        `;
    }

    private _resetForm() {
        this.store.update((state: any) => {
            state.network.dhcp = false;
            state.network.ip = "192.168.1.100";
            state.network.mask = "255.255.255.0";
            state.network.gateway = "192.168.1.1";
            state.network.timeout = 100000;
        });
    }

    private _logState() {
        console.log("当前状态:", this.store.state);
        console.log("网络配置:", this.store.state.network);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-network-config": NetworkConfigExample;
    }
}

export default NetworkConfigExample;

/**
 * 数据同步示例
 * 演示表单数据同步和状态管理功能
 *
 * 功能说明：
 * - 使用 @autostorejs/syncer 进行跨表单数据同步
 * - 网络配置的实时同步
 * - 路径映射功能
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, PropertyValues, html } from "lit";
import { AutoStore, configurable, delay } from "autostore";
import { AutoStoreSyncer } from "@autostorejs/syncer";
import "../../../src";

@customElement("example-data-sync")
class DataSyncExample extends LitElement {
    // 主状态
    state = {
        network: {
            dhcp: configurable(false, {
                label: "自动获取IP地址",
                widget: "switch",
            }),
            ip: configurable("192.168.1.100", {
                label: "IP地址",
                widget: "ipaddress",
                enable: (state: any) => !state.network.dhcp,
            }),
            mask: configurable("255.255.255.0", {
                label: "子网掩码",
                widget: "ipaddress",
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
                toState: (value: any) => {
                    return value * 1000;
                },
                toInput: (value: any) => {
                    return value / 1000;
                },
            }),
        },
    };

    // 同步 Store - 模拟远程配置
    syncState = {
        network: {
            dhcp: true,
            ip: "10.0.0.100",
            mask: "255.255.255.0",
            gateway: "10.0.0.1",
            timeout: 30000,
        },
    };

    // 远端模拟 store（普通 AutoStore，无 ConfigManager）
    syncStore = new AutoStore(structuredClone(this.syncState));

    syncer: AutoStoreSyncer | null = null;

    /**
     * 内部 store（由 <auto-form> 创建，经 activeStore 代理访问）
     */
    get store(): any {
        return this.formRef?.activeStore;
    }

    connectedCallback(): void {
        super.connectedCallback();

        // 等待表单渲染拿到内部 store 后再监听
        this.updateComplete.then(() => {
            this.store?.watch(() => {
                if (this.viewer) {
                    this.viewer.innerText = JSON.stringify(this.store.state, null, 2);
                }
            });
        });

        this.syncStore.watch(() => {
            if (this.syncViewer) {
                this.syncViewer.innerText = JSON.stringify(this.syncStore.state, null, 2);
            }
        });

        // 延迟初始化同步器，确保组件已渲染
        setTimeout(() => this._initSyncer(), 100);
    }

    //@ts-ignore
    @query("auto-form")
    formRef?: any;

    //@ts-ignore
    @query("#viewjson")
    viewer?: any;

    //@ts-ignore
    @query("#syncjson")
    syncViewer?: any;

    private _initSyncer() {
        try {
            // 创建同步器
            this.syncer = this.store.sync(this.syncStore, {
                local: "network",
                remote: "network",
                mode: "both",
                autostart: true,
            });

            console.log("数据同步器已初始化");
            this._showSyncStatus("✅ 数据同步已启用");
        } catch (error) {
            console.error("初始化同步器失败:", error);
            this._showSyncStatus("❌ 同步器初始化失败");
        }
    }

    private _showSyncStatus(message: string) {
        const statusEl = document.querySelector("#sync-status");
        if (statusEl) {
            statusEl.textContent = message;
        }
    }

    render() {
        return html`
            <div style="padding: 1rem;">
                <div style="margin-bottom: 1rem;">
                    <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">数据同步示例</h3>
                    <p
                        style="margin: 0 0 1rem 0; color: var(--auto-text-light); font-size: 0.9rem;"
                    >
                        演示使用 @autostorejs/syncer 进行跨表单数据同步
                    </p>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <!-- 主表单 -->
                    <div
                        style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"
                    >
                        <h4 style="margin: 0 0 1rem 0;">本地配置</h4>
                        <auto-form
                            .state="${this.state}"
                            data-label="网络设置"
                            data-icon="settings"
                        >
                        </auto-form>

                        <div
                            id="sync-status"
                            style="margin-top: 1rem; padding: 0.5rem; background: #f0f9ff; border-radius: 4px; font-size: 0.875rem;"
                        >
                            ⏳ 初始化同步器...
                        </div>

                        <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                            <sl-button @click="${this._testSync}" variant="primary"
                                >测试同步</sl-button
                            >
                            <sl-button @click="${this._resetLocal}" variant="neutral"
                                >重置本地</sl-button
                            >
                        </div>

                        <div style="margin-top: 1rem;">
                            <h5 style="margin: 0 0 0.5rem 0;">本地状态:</h5>
                            <pre
                                id="viewjson"
                                style="background: #1e293b; color: #e2e8f0; padding: 0.5rem; border-radius: 4px; font-size: 0.75rem; overflow-x: auto; white-space: pre-wrap;"
                            ></pre>
                        </div>
                    </div>

                    <!-- 同步表单 -->
                    <div
                        style="background: white; padding: 1rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"
                    >
                        <h4 style="margin: 0 0 1rem 0;">远程配置</h4>

                        <div
                            style="padding: 1rem; background: #fef3c7; border-radius: 4px; margin-bottom: 1rem;"
                        >
                            <p style="margin: 0; font-size: 0.875rem;">
                                💡 这是模拟的远程配置，与本地配置进行双向同步
                            </p>
                        </div>

                        <div style="margin-top: 1rem;">
                            <h5 style="margin: 0 0 0.5rem 0;">远程状态:</h5>
                            <pre
                                id="syncjson"
                                style="background: #1e293b; color: #e2e8f0; padding: 0.5rem; border-radius: 4px; font-size: 0.75rem; overflow-x: auto; white-space: pre-wrap;"
                            ></pre>
                        </div>

                        <div style="margin-top: 1rem;">
                            <sl-button @click="${this._resetRemote}" variant="neutral" size="small"
                                >重置远程</sl-button
                            >
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    private _testSync() {
        // 模拟同步测试
        this._showSyncStatus("🔄 正在测试同步...");

        setTimeout(async () => {
            // 模拟网络延迟
            await delay(500);

            // 更新远程配置
            this.syncStore.update((state: any) => {
                state.network.dhcp = !state.network.dhcp;
                state.network.ip = state.network.dhcp ? "10.0.0.50" : "192.168.1.200";
            });

            this._showSyncStatus("✅ 同步测试完成 - 远程配置已更新");
        }, 100);
    }

    private _resetLocal() {
        this.store.update((state: any) => {
            state.network.dhcp = false;
            state.network.ip = "192.168.1.100";
            state.network.mask = "255.255.255.0";
            state.network.gateway = "192.168.1.1";
            state.network.timeout = 100000;
        });
    }

    private _resetRemote() {
        this.syncStore.update((state: any) => {
            state.network.dhcp = true;
            state.network.ip = "10.0.0.100";
            state.network.mask = "255.255.255.0";
            state.network.gateway = "10.0.0.1";
            state.network.timeout = 30000;
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-data-sync": DataSyncExample;
    }
}

export default DataSyncExample;

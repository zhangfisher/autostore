/**
 * 选择组件示例
 * 演示各种选择组件：单选、多选、下拉框等
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { AutoStore, configurable } from "autostore";
import { layoutOptions, tcpFlags } from "../../shared/mock-data";
import "../../../src";
@customElement("example-selection-widgets")
class SelectionWidgetsExample extends LitElement {
    state = {
        preferences: {
            layout: configurable("经典式", {
                label: "页面布局",
                widget: "radio",
                itemWidth: "33.33%",
                card: true,
                choices: layoutOptions,
            }),
            themes: configurable(["light"], {
                label: "主题偏好",
                widget: "checkbox-group",
                itemWidth: "33.33%",
                valueKey: "label",
                card: true,
                choices: [
                    { label: "浅色", icon: "sun" },
                    { label: "深色", icon: "moon" },
                    { label: "自动", icon: "monitor" },
                ],
            }),
            language: configurable("zh-CN", {
                label: "语言",
                widget: "select",
                clearable: false,
                choices: [
                    { label: "简体中文", value: "zh-CN" },
                    { label: "English", value: "en-US" },
                    { label: "日本語", value: "ja-JP" },
                    { label: "한국어", value: "ko-KR" },
                ],
            }),
            notification: configurable("enabled", {
                label: "通知设置",
                widget: "select",
                choices: [
                    { label: "启用所有通知", value: "enabled" },
                    { label: "仅重要通知", value: "important" },
                    { label: "静默模式", value: "silent" },
                ],
            }),
            tcpFlags: configurable(3, {
                label: "TCP标志位",
                widget: "checkbox-group",
                choices: tcpFlags,
                toInput: (value: any) => {
                    const vals: number[] = [];
                    if ((value & 1) > 0) vals.push(1);
                    if ((value & 2) > 0) vals.push(2);
                    if ((value & 4) > 0) vals.push(4);
                    if ((value & 8) > 0) vals.push(8);
                    if ((value & 16) > 0) vals.push(16);
                    if ((value & 32) > 0) vals.push(32);
                    if ((value & 64) > 0) vals.push(64);
                    return vals;
                },
                toState: (vals: any[]) => {
                    let value = 0;
                    if (vals.includes(1)) value += 1;
                    if (vals.includes(2)) value += 2;
                    if (vals.includes(4)) value += 4;
                    if (vals.includes(8)) value += 8;
                    if (vals.includes(16)) value += 16;
                    if (vals.includes(32)) value += 32;
                    if (vals.includes(64)) value += 64;
                    return value;
                },
            }),
        },
    };

    //@ts-ignore
    @query("auto-form")
    formRef?: any;

    /**
     * 内部 store（由 <auto-form> 创建，经 activeStore 代理访问）
     */
    get store(): any {
        return this.formRef?.activeStore;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.updateComplete.then(() => {
            this.store?.watch(() => {
                console.log("用户偏好设置:", this.store.state);
            });
        });
    }

    render() {
        return html`
            <div style="max-width: 800px; margin: 0 auto; padding: 1rem;">
                <h3 style="margin: 0 0 1rem 0; color: var(--auto-primary);">选择组件示例</h3>
                <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                    演示各种选择组件：单选按钮、多选框、下拉框、树形选择等
                </p>

                <auto-form
                    .state="${this.state}"
                    data-label="用户偏好设置"
                    data-icon="settings"
                    style="min-height: 600px;"
                >
                </auto-form>

                <div
                    style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;"
                >
                    <h4 style="margin: 0 0 1rem 0;">🎯 选择组件说明</h4>
                    <div
                        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;"
                    >
                        <div>
                            <strong>Radio（单选）</strong>
                            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">
                                使用 <code>widget: 'radio'</code>，支持卡片样式和自定义宽度
                            </p>
                        </div>
                        <div>
                            <strong>Checkbox Group（多选）</strong>
                            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">
                                使用 <code>widget: 'checkbox-group'</code>，支持多选项选择
                            </p>
                        </div>
                        <div>
                            <strong>Select（下拉框）</strong>
                            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">
                                使用 <code>widget: 'select'</code>，支持搜索和清空
                            </p>
                        </div>
                        <div>
                            <strong>数据转换</strong>
                            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">
                                TCP标志位演示了toState/toInput数据转换
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-selection-widgets": SelectionWidgetsExample;
    }
}

export default SelectionWidgetsExample;

/**
 * 字段操作按钮示例
 * 演示 beforeActions（前置按钮）和 afterActions（后置按钮）的使用
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-actions")
class WidgetActionsExample extends LitElement {
    state = {
        form: {
            // 示例1：后置操作按钮 - 清空和复制
            name: configurable("", {
                label: "用户名",
                placeholder: "请输入用户名",
                actions: [
                    {
                        label: "清空",
                        icon: "x",
                        onClick: (value: any, { update }: any) => {
                            update("");
                        },
                    },
                    {
                        label: "复制",
                        icon: "clipboard",
                        onClick: (value: any) => {
                            navigator.clipboard.writeText(value);
                            alert("已复制: " + value);
                        },
                    },
                ],
            }),

            // 示例2：前置操作按钮 - 选择预设值
            email: configurable("", {
                label: "邮箱",
                placeholder: "请输入邮箱",
                actions: [
                    {
                        label: "常用邮箱",
                        icon: "envelope",
                        pos: "before",
                        type: "dropdown",
                        syncMenu: true,
                        items: [
                            {
                                label: "@qq.com",
                                onClick: (value: any, { update }: any) => {
                                    update(value.split("@")[0] + "@qq.com");
                                },
                            },
                            {
                                label: "@163.com",
                                onClick: (value: any, { update }: any) => {
                                    update(value.split("@")[0] + "@163.com");
                                },
                            },
                            {
                                label: "@gmail.com",
                                onClick: (value: any, { update }: any) => {
                                    update(value.split("@")[0] + "@gmail.com");
                                },
                            },
                            "-",
                            {
                                label: "自定义",
                                onClick: () => {
                                    console.log("自定义邮箱");
                                },
                            },
                        ],
                    },
                ],
            }),

            // 示例3：前后都有操作按钮
            phone: configurable("", {
                label: "手机号码",
                placeholder: "请输入手机号码",
                prefix: "+86",
                actions: [
                    {
                        label: "+86",
                        pos: "before",
                        type: "dropdown",
                        syncMenu: true,
                        items: [
                            { label: "+86 (中国)" },
                            { label: "+1 (美国)" },
                            { label: "+44 (英国)" },
                            { label: "+81 (日本)" },
                        ],
                    },
                    {
                        label: "格式化",
                        icon: "phone",
                        onClick: (value: any, { update }: any) => {
                            const v = value.replace(/\D/g, "");
                            if (v.length === 11) {
                                update(`${v.slice(0, 3)}-${v.slice(3, 7)}-${v.slice(7)}`);
                            }
                        },
                    },
                ],
            }),

            // 示例4：验证码示例（verifycode widget 已有内置 afterActions）
            code: configurable("", {
                label: "验证码",
                placeholder: "请输入验证码",
                widget: "verifycode",
                sendTips: "发送验证码",
                timeout: 60000,
                template: "{timeout}秒后重发",
                onRequest: () => {
                    console.log("发送验证码请求");
                    alert("验证码已发送！");
                },
            }),

            // 示例5：带图标的操作按钮
            search: configurable("", {
                label: "搜索内容",
                placeholder: "输入搜索关键词",
                actions: [
                    {
                        icon: "search",
                        onClick: (value: any) => {
                            alert("搜索: " + value);
                        },
                    },
                    {
                        icon: "qr-code",
                        onClick: () => {
                            alert("打开扫描功能");
                        },
                    },
                ],
            }),

            // 示例6：只读字段带复制按钮
            readonlyField: configurable("这是一段不可编辑的文本内容", {
                label: "只读内容",
                readOnly: true,
                actions: [
                    {
                        label: "复制",
                        icon: "clipboard",
                        variant: "primary",
                        onClick: (value: any) => {
                            navigator.clipboard.writeText(value);
                            alert("已复制到剪贴板");
                        },
                    },
                ],
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">字段操作按钮</h3>
                <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    演示 beforeActions（前置按钮）和 afterActions（后置按钮）的各种用法
                </p>
                <auto-form .state="${this.state}" data-label="操作按钮演示"></auto-form>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-actions": WidgetActionsExample;
    }
}

export default WidgetActionsExample;

/**
 * cron 表达式编辑组件示例
 * 演示 cron widget 的全部配置用法
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-cron")
class WidgetCronExample extends LitElement {
    state = {
        form: {
            // 基础用法：6 字段（分 时 日 月 周 年），默认不显示年 tab
            basic: configurable("", {
                label: "执行周期",
                widget: "cron",
                placeholder: "请选择执行周期",
                help: "基础 6 字段模式，默认不显示年 tab（showYear: false）",
            }),
            // 显示年 tab
            withYear: configurable("", {
                label: "含年周期",
                widget: "cron",
                showYear: true,
                help: "showYear: true，年 tab 可选指定年份",
            }),
            // 默认值：defaultCron 挂载即写入
            withDefault: configurable("", {
                label: "默认周期",
                widget: "cron",
                defaultCron: "0 8 1 * * 2027",
                help: "defaultCron: '0 8 1 * * 2027'（年 tab 未显示时年值不参与序列化）",
            }),
            // 启用秒：7 字段
            withSeconds: configurable("", {
                label: "含秒周期",
                widget: "cron",
                enableSeconds: true,
                help: "enableSeconds: true，秒 tab 追加在末尾",
            }),
            // 自定义年份范围与步长预设
            custom: configurable("", {
                label: "自定义周期",
                widget: "cron",
                yearRange: [2026, 2030],
                stepOptions: {
                    minute: [1, 5, 15, 30],
                    hour: [1, 6, 12],
                },
                panelMinWidth: 680,
                help: "yearRange: [2026, 2030]、stepOptions 覆盖分钟/小时步长（默认用字段全值域）、panelMinWidth: 680",
            }),
            // 高级语法回退：外部塞入 UI 无法表达的合法表达式
            advanced: configurable("0 0 L * * *", {
                label: "高级语法",
                widget: "cron",
                help: "外部值 '0 0 L * * *'（每月最后一天），日 tab 显示原始片段",
            }),
            // 不可解析值回退
            unparseable: configurable("这不是cron", {
                label: "无法解析",
                widget: "cron",
                help: "值无法解析：触发器原样显示 + 警告，编辑从全 * 开始",
            }),
            // i18n 覆盖
            i18nField: configurable("", {
                label: "自定义文案",
                widget: "cron",
                i18n: {
                    patternAny: "任意",
                    patternInterval: "循环",
                    patternPick: "勾选",
                    pickAll: "全选",
                    pickInvert: "反转",
                    pickClear: "清空",
                },
                help: "i18n 覆盖模式名与辅助按钮文案",
            }),
            // 只读
            readonlyCron: configurable("0 8 1 * * 2027", {
                label: "只读周期",
                widget: "cron",
                readOnly: true,
                help: "只读模式：显示中文描述 + 原始表达式",
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">cron 表达式编辑组件</h3>
                <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                    演示 cron 表达式编辑器的全部配置用法
                </p>

                <auto-form
                    .state="${this.state}"
                    data-label="cron 组件参数演示"
                    style="min-height: 500px;"
                >
                </auto-form>

                <div
                    style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;"
                >
                    <h4 style="margin: 0 0 1rem 0;">📋 参数说明</h4>
                    <div
                        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.875rem;"
                    >
                        <div><code>widget: 'cron'</code> cron 表达式编辑类型</div>
                        <div><code>enableSeconds</code> 启用秒字段（7 字段）</div>
                        <div><code>showYear</code> 显示年 tab（默认不显示）</div>
                        <div><code>yearRange</code> 年可选范围</div>
                        <div><code>stepOptions</code> 覆盖间隔步长预设</div>
                        <div><code>defaultCron</code> 默认表达式（挂载即写入）</div>
                        <div><code>panelMinWidth</code> 面板最小宽度</div>
                        <div><code>i18n</code> 覆盖 UI 文案与描述模板</div>
                        <div><code>readOnly</code> 只读模式</div>
                    </div>
                    <div style="margin-top: 0.75rem; font-size: 0.875rem;">
                        字段模式：不限（<code>*</code>）/ 间隔（<code>X/N</code>，年无此模式）/ 指定（多选，连续数字压缩为
                        <code>a-b</code>）；周编码 1=周一…7=周日（兼容 0）
                    </div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-cron": WidgetCronExample;
    }
}

export default WidgetCronExample;

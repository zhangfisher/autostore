/**
 * 下拉选择组件示例
 * 演示下拉选择框的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";
import "../../shared/form-props-panel";

@customElement("example-widget-select")
class WidgetSelectExample extends LitElement {
    state = {
        form: {
            // 基础用法
            city: configurable("", {
                label: "城市",
                widget: "select",
                choices: ["北京", "上海", "广州", "深圳", "杭州"],
                placeholder: "请选择城市",
            }),
            // 对象数组 + 默认值
            language: configurable("zh-CN", {
                label: "语言",
                widget: "select",
                choices: [
                    { label: "简体中文", value: "zh-CN" },
                    { label: "English", value: "en-US" },
                    { label: "日本語", value: "ja-JP" },
                    { label: "한국어", value: "ko-KR" },
                ],
                help: "默认值: 简体中文",
            }),
            // 必填
            requiredSelect: configurable("", {
                label: "部门",
                widget: "select",
                required: true,
                choices: [
                    { label: "研发部", value: "dev" },
                    { label: "产品部", value: "product" },
                    { label: "设计部", value: "design" },
                    { label: "市场部", value: "marketing" },
                ],
                placeholder: "请选择部门",
                help: "必填，请选择所属部门",
            }),
            // 不可清空
            fixedSelect: configurable("option1", {
                label: "固定选项",
                widget: "select",
                clearable: false,
                choices: [
                    { label: "选项一", value: "option1" },
                    { label: "选项二", value: "option2" },
                    { label: "选项三", value: "option3" },
                ],
                help: "clearable: false，不可清空",
            }),
            // 自定义验证
            level: configurable("", {
                label: "职级",
                widget: "select",
                required: true,
                choices: [
                    { label: "P5 初级", value: "P5" },
                    { label: "P6 中级", value: "P6" },
                    { label: "P7 高级", value: "P7" },
                    { label: "P8 专家", value: "P8" },
                    { label: "P9 资深专家", value: "P9" },
                ],
                validate: (value: any) => value !== "",
                errorMessage: "请选择职级",
            }),
            // 只读
            readonlySelect: configurable("已选项A", {
                label: "只读选择",
                widget: "select",
                choices: ["已选项A", "已选项B", "已选项C"],
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

    @query("#state-viewer")
    stateViewer?: any;

    connectedCallback(): void {
        super.connectedCallback();
        this.updateComplete.then(() => {
            this.store?.watch(() => { if (this.stateViewer) this.stateViewer.value = JSON.stringify(this.store.state, null, 2); }); this._syncInitialState();
            const propsPanel = this.shadowRoot?.querySelector("#props-panel") as any;
            const form = this.shadowRoot?.querySelector("auto-form");
            if (propsPanel && form) propsPanel.setTarget(form);
        });
    }

    render() {
        return html`
            <div style="display: grid; grid-template-columns: 3fr 2fr; gap: 1.5rem; height: 100%;">
                <div style="min-width: 0;">
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">下拉选择组件</h3>
                <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                    演示下拉选择框的各种参数配置
                </p>

                <auto-form .state="${this.state}" data-label="下拉选择参数演示" style="min-height: 500px;">
                </auto-form>

                <div style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;">
                    <h4 style="margin: 0 0 1rem 0;">📋 参数说明</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.875rem;">
                        <div><code>widget: 'select'</code> 下拉选择类型</div>
                        <div><code>choices</code> 选项数组（字符串或对象）</div>
                        <div><code>placeholder</code> 占位提示文本</div>
                        <div><code>clearable</code> 是否可清空（默认true）</div>
                        <div><code>required</code> 必填标记</div>
                        <div><code>validate</code> 自定义验证</div>
                        <div><code>readOnly</code> 只读模式</div>
                        <div>支持搜索过滤选项</div>
                    </div>
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
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-select": WidgetSelectExample;
    }
}

    private _syncInitialState() {
        if (this.store && this.stateViewer) {
            this.stateViewer.value = JSON.stringify(this.store.state, null, 2);
        }
    }
}

declare global { interface HTMLElementTagNameMap { "example-widget-select": WidgetSelectExample; } }
export default WidgetSelectExample;

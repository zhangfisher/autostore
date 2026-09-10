/**
 * 步进器组件示例
 * 演示步进输入框的各种参数配置
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable } from "autostore";
import "../../../src";

@customElement("example-widget-stepper")
class WidgetStepperExample extends LitElement {
    state = {
        form: {
            // 基础用法
            basicCount: configurable(0, {
                label: "基础步进",
                widget: "stepper",
            }),
            // 范围限制：到达边界按钮禁用
            age: configurable(25, {
                label: "年龄",
                widget: "stepper",
                min: 1,
                max: 120,
                help: "范围: 1-120，到达边界时按钮禁用",
            }),
            // 小数精度：step 的小数位数自动推导
            price: configurable(9.99, {
                label: "价格",
                widget: "stepper",
                min: 0,
                step: 0.01,
                help: "支持小数，步长0.01，自动保留2位小数",
            }),
            // 单位前后缀：纯展示，state 存 number
            weight: configurable(50, {
                label: "重量",
                widget: "stepper",
                min: 0,
                max: 200,
                step: 5,
                prefix: "≈",
                suffix: "kg",
                help: "单位仅展示，状态值始终是数字",
            }),
            budget: configurable(1000, {
                label: "预算",
                widget: "stepper",
                min: 0,
                step: 100,
                prefix: "¥",
                help: "货币前缀展示",
            }),
            // 必填 + 验证
            quantity: configurable(1, {
                label: "数量",
                widget: "stepper",
                required: true,
                min: 1,
                max: 999,
                validate: (value: any) => value >= 1 && value <= 999,
                errorMessage: "数量必须在1-999之间",
            }),
            // 只读
            readonlyCount: configurable(42, {
                label: "只读数量",
                widget: "stepper",
                readOnly: true,
                help: "此字段不可编辑",
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
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">步进器组件</h3>
                <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                    演示步进输入框的各种参数配置
                </p>

                <auto-form .state="${this.state}" data-label="步进器参数演示"> </auto-form>

                <div
                    style="margin-top: 2rem; padding: 1rem; background: #f0f9ff; border-radius: 8px;"
                >
                    <h4 style="margin: 0 0 1rem 0;">📋 参数说明</h4>
                    <div
                        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.875rem;"
                    >
                        <div><code>widget: 'stepper'</code> 步进组件类型</div>
                        <div><code>min / max</code> 数值范围限制，到达边界按钮禁用</div>
                        <div><code>step</code> 步长（+/- 递增量，支持小数）</div>
                        <div><code>precision</code> 小数精度（缺省取 step 的小数位数）</div>
                        <div><code>prefix / suffix</code> 单位前后缀（纯展示）</div>
                        <div><code>required</code> 必填标记</div>
                        <div><code>validate</code> 自定义验证函数</div>
                        <div><code>readOnly</code> 只读模式</div>
                    </div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-widget-stepper": WidgetStepperExample;
    }
}

export default WidgetStepperExample;

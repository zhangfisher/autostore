/**
 * 计算属性示例
 * 演示自动计算字段和依赖关系
 */

import { customElement, query } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { configurable, computed } from "autostore";
import "../../../src";

@customElement("example-computed-fields")
class ComputedFieldsExample extends LitElement {
    state = {
        order: {
            price: configurable(100, {
                label: "单价",
                widget: "number",
                min: 0,
                step: 10,
                help: "商品单价（元）",
            }),
            quantity: configurable(1, {
                label: "数量",
                widget: "number",
                min: 1,
                help: "购买数量",
            }),
            discount: configurable(0, {
                label: "折扣",
                widget: "number",
                min: 0,
                max: 100,
                step: 5,
                help: "折扣百分比（%）",
            }),
            // 计算属性：小计
            subtotal: computed((state) => state.order.price * state.order.quantity),
            // 计算属性：折扣金额
            discountAmount: computed(
                (state) => state.order.price * state.order.quantity * (state.order.discount / 100),
            ),
            // 计算属性：总计
            total: computed(
                (state) =>
                    state.order.price * state.order.quantity -
                    state.order.price * state.order.quantity * (state.order.discount / 100),
            ),
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

        // 等待表单渲染拿到内部 store 后再监听
        this.updateComplete.then(() => {
            this.store?.watch(() => {
                this._updateDisplay();
            });
            this._updateDisplay();
        });
    }

    private _updateDisplay() {
        // 这里可以添加额外的UI更新逻辑
        console.log("订单状态:", this.store.state);
    }

    render() {
        return html`
            <div style="max-width: 700px; margin: 0 auto; padding: 1rem;">
                <h3 style="margin: 0 0 1rem 0; color: var(--auto-primary);">计算属性示例</h3>
                <p style="margin: 0 0 2rem 0; color: var(--auto-text-light);">
                    演示自动计算字段、依赖关系和实时更新
                </p>

                <div
                    style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;"
                >
                    <!-- 表单区域 -->
                    <div>
                        <auto-form
                            .state="${this.state}"
                            data-label="订单信息"
                            data-icon="shopping-cart"
                            style="min-height: 400px;"
                        >
                        </auto-form>

                        <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                            <sl-button @click="${this._reset}" variant="neutral" size="small">
                                <sl-icon name="refresh" slot="prefix"></sl-icon>
                                重置
                            </sl-button>
                            <sl-button
                                @click="${this._applyDiscount}"
                                variant="success"
                                size="small"
                            >
                                <sl-icon name="tag" slot="prefix"></sl-icon>
                                应用20%折扣
                            </sl-button>
                        </div>
                    </div>

                    <!-- 计算结果显示 -->
                    <div>
                        <div
                            style="background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"
                        >
                            <h4 style="margin: 0 0 1rem 0; color: var(--auto-primary);">
                                💰 实时计算结果
                            </h4>

                            <div
                                style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--auto-border);"
                            >
                                <div
                                    style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;"
                                >
                                    <span>单价:</span>
                                    <strong>¥${this.store.state.order.price}</strong>
                                </div>
                                <div
                                    style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;"
                                >
                                    <span>数量:</span>
                                    <strong>${this.store.state.order.quantity}</strong>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <span>小计:</span>
                                    <strong style="color: var(--auto-primary);"
                                        >¥${this.store.state.order.subtotal}</strong
                                    >
                                </div>
                            </div>

                            <div
                                style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--auto-border);"
                            >
                                <div
                                    style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;"
                                >
                                    <span>折扣:</span>
                                    <strong>${this.store.state.order.discount}%</strong>
                                </div>
                                <div style="display: flex; justify-content: space-between;">
                                    <span>折扣金额:</span>
                                    <strong style="color: #e11d48;"
                                        >-¥${this.store.state.order.discountAmount}</strong
                                    >
                                </div>
                            </div>

                            <div
                                style="padding: 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px;"
                            >
                                <div
                                    style="display: flex; justify-content: space-between; align-items: center;"
                                >
                                    <span style="font-size: 1.1rem;">总计:</span>
                                    <strong style="font-size: 1.5rem;"
                                        >¥${this.store.state.order.total}</strong
                                    >
                                </div>
                            </div>

                            <div
                                style="margin-top: 1rem; font-size: 0.875rem; color: var(--auto-text-light);"
                            >
                                <p style="margin: 0.5rem 0;">
                                    💡 所有计算字段都会自动实时更新，无需手动计算
                                </p>
                                <p style="margin: 0;">
                                    📝 当修改单价、数量或折扣时，相关字段会自动重新计算
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    private _reset() {
        this.store.update((state) => {
            state.order.price = 100;
            state.order.quantity = 1;
            state.order.discount = 0;
        });
    }

    private _applyDiscount() {
        this.store.update((state) => {
            state.order.discount = 20;
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "example-computed-fields": ComputedFieldsExample;
    }
}

export default ComputedFieldsExample;

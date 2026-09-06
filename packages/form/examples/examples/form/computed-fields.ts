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
            subtotal: computed((state) => state.order.price * state.order.quantity),
            discountAmount: computed(
                (state) => state.order.price * state.order.quantity * (state.order.discount / 100),
            ),
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

    get store(): any {
        return this.formRef?.activeStore;
    }

    render() {
        return html`
            <div>
                <h3 style="margin: 0 0 0.5rem 0; color: var(--auto-primary);">计算属性示例</h3>
                <p style="margin: 0 0 1.5rem 0; color: var(--auto-text-light); font-size: 0.9rem;">
                    演示自动计算字段、依赖关系和实时更新
                </p>
                <auto-form
                    .state="${this.state}"
                    data-label="订单信息"
                    data-icon="shopping-cart"
                    style="min-height: 400px;"
                ></auto-form>
                <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                    <sl-button @click="${this._reset}" variant="neutral" size="small"
                        >重置</sl-button
                    >
                    <sl-button @click="${this._applyDiscount}" variant="success" size="small"
                        >应用20%折扣</sl-button
                    >
                </div>
            </div>
        `;
    }

    private _reset() {
        if (!this.store) return;
        this.store.update((state: any) => {
            state.order.price = 100;
            state.order.quantity = 1;
            state.order.discount = 0;
        });
    }

    private _applyDiscount() {
        if (!this.store) return;
        this.store.update((state: any) => {
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

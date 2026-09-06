import { AutoDropdownField, type AutoDropdownFieldOptions } from "@/field/dropdown";
import { renderWidget } from "@/utils/renderWidget";
import { tag } from "@/utils/tag";
// 类型已内联
import { css, html, nothing, render } from "lit";
import { query } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import type { AutoStateSchemaBase } from "autostore";
/**
 * combine 组合 widget 的配置类型
 */
export interface AutoFieldCombineOptions {
    /**
     * 子字段 schema 数组，每个子字段可以是任意 widget，
     * 各子字段的值经 toState 聚合为一个状态值。
     * 子项是「部分 schema」：不要求 value（初值由父字段的 toInput 拆分而来），
     * 且各子 widget 的特有配置（min/choices/switchValues…）任意，
     * 因此放宽为 Partial + 可索引对象
     */
    children: (Partial<AutoStateSchemaBase> & Record<string, any>)[];
}

@tag("auto-field-combine")
export class AutoFieldCombine extends AutoDropdownField<
    AutoFieldCombineOptions & AutoDropdownFieldOptions
> {
    static styles = [
        AutoDropdownField.styles,
        css`
            .value .children {
                display: flex;
                flex-wrap: wrap;
            }
        `,
    ] as any;
    @query(".selection>.select-value")
    selection: any;
    getInitialOptions() {
        return Object.assign({}, super.getInitialOptions(), {
            children: [],
        });
    }
    connectedCallback(): void {
        super.connectedCallback();
        this._onChildrenChange();
    }
    disconnectedCallback(): void {
        this.shadow.removeEventListener("sl-change", this._handleChildrenChange);
        this.shadow.removeEventListener("sl-input", this._handleChildrenChange);
    }
    // 使用箭头函数绑定 this
    private _handleChildrenChange = () => {
        // 基类 _updateFieldValue 会置 @state 的 dirty，触发 combine 自身
        // requestUpdate → children 整列重建 → 正在输入的子字段失焦。
        // combine 是纯容器（_handleStateChange 已空实现），dirty 同步到
        // context/form 即可，不需要驱动自身重渲染
        Object.defineProperty(this, "dirty", {
            configurable: true,
            get: () => this._combineDirty,
            set: (v: boolean) => {
                this._combineDirty = v;
            },
        });
        this.onFieldChange();
        this._updateSelection();
    };
    _combineDirty: boolean = false;
    _isFirst: boolean = true;
    _updateSelection() {
        if (!this.selection) return;
        setTimeout(() => {
            const values = this.toState(this.getInputValue());
            const selection = super.renderSelection(values);
            if (this._isFirst) {
                // this.selection.innerHTML = ''
                render(nothing, this.selection);
                this._isFirst = false;
            }
            render(nothing, this.selection, { isConnected: true });
            render(selection, this.selection, { isConnected: true });
        });
    }
    _onChildrenChange() {
        if (this.options.children.length > 0) {
            // Shoelace 控件派发的是 sl-change/sl-input（bubbles+composed），
            // 原生 change 事件不会从子字段冒泡到这里
            this.shadow.addEventListener("sl-change", this._handleChildrenChange);
            this.shadow.addEventListener("sl-input", this._handleChildrenChange);
        }
    }
    renderSelection() {
        setTimeout(() => this._updateSelection());
        return html``;
    }
    getInputValue() {
        const children = Array.from(this.shadowRoot?.querySelectorAll(".children > *") || []);
        const values: any = [];
        children.forEach((child) => {
            // 仅收集字段元素：Lit 注释节点(!)与空白文本节点不是 HTMLElement，
            // 混入会导致 getInputValue 抛错（child.getInputValue is not a function）
            if (child instanceof HTMLElement && child.tagName.startsWith("AUTO-FIELD-")) {
                const field = child as HTMLElement & {
                    getInputValue?: () => any;
                    value?: any;
                };
                let val = typeof field.getInputValue === "function" ? field.getInputValue() : field.value;
                if (val === "") val = field.value;
                values.push(val);
            }
        });
        return values;
    }
    renderDropdown() {
        return html`
            <div class="children">
                ${repeat(
                    this.options.children,
                    // 用 name 作 key：无 key 时 repeat 按索引复用，
                    // options.children 引用变化（如 schema 联动回写）会整列重建，
                    // 正在输入的子字段失焦导致无法连续输入
                    (field: Partial<AutoStateSchemaBase> & Record<string, any>, index: number) =>
                        String(field.name ?? index),
                    (field) => {
                        return html`${renderWidget(field, {
                            parent: this,
                            attrs: {
                                noreactive: true,
                                compact: true,
                            },
                        })}`;
                    },
                )}
            </div>
        `;
    }
    /**
     * 不响应状态变化
     * combine字段只是一个容器，内部widget才需要响应状态变化
     *
     * 为什么不响应变化？
     *
     * 因为当children更新时，如果不阻止状态变化，会导致combine重新渲染
     * combine重新渲染会导致children也重新渲染，这会导致children失去焦点
     * 这样如果children中包括input就会因为失去焦点而无法进行连续输入
     *
     *
     */
    _handleStateChange() {}
}
declare global {
    interface HTMLElementTagNameMap {
        "auto-field-combine": AutoFieldCombine;
    }
}
declare module "autostore" {
    interface AutoStoreWidgets {
        combine: AutoFieldCombineOptions;
    }
}

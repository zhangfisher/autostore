import { AutoField } from "@/field"
import { renderWidget } from "@/utils/renderWidget"
import type { SchemaCombineWidgetOptions } from "autostore"
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"
import { repeat } from "lit/directives/repeat.js"

export type AutoFieldCombineOptions = Required<SchemaCombineWidgetOptions>


@customElement('auto-field-combine')
export class AutoFieldCombine extends AutoField<AutoFieldCombineOptions> {
    static styles = [
        AutoField.styles,
        css`
            .value > .children{
                display: flex;
                flex-wrap: wrap;
            }
        `

    ] as any
    getInitialOptions() {
        return {
            children: []
        }
    }
    connectedCallback(): void {
        super.connectedCallback()
        this._onChildrenChange()
    }
    disconnectedCallback(): void {
        this.shadow.removeEventListener('field-change', this._handleChildrenChange)

    }
    // 使用箭头函数绑定 this
    private _handleChildrenChange = () => {
        this.onFieldChange()
    };

    /**
     * 
     */
    _onChildrenChange() {
        if (this.options.children.length > 0) {
            this.shadow.addEventListener('field-change', this._handleChildrenChange)
        }
    }

    getInputValue() {
        const children = Array.from(this.shadowRoot?.querySelectorAll('.children > *') || [])
        const values: any = []
        children.forEach((child: any) => {
            if (child.tagName.startsWith('AUTO-FIELD-')) {
                let val = child.getInputValue()
                if (val === '') val = child.value
                values.push(val)
            }
        })
        return values

    }

    renderInput() {
        return html`
            <div class="children">
                ${repeat(this.options.children, (field) => {
            return html`${renderWidget(field, {
                parent: this,
                attrs: {
                    noreactive: true,
                    compact: true
                }
            })}`
        })}
            </div>
        `
    }
    /**
     * 不响应状态变化
     * combine字段只是一个容器，内部widget才需要响应状态变化
     * 
     */
    _handleStateChange() {

    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-combine': AutoFieldCombine
    }
}

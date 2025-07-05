import { AutoField } from "@/field"
import { renderWidget } from "@/utils/renderWidget"
import type { SchemaCombineWidgetOptions } from "autostore"
import { html } from "lit"
import { customElement } from "lit/decorators.js"
import { repeat } from "lit/directives/repeat.js"


export type AutoFieldCombineOptions = Required<SchemaCombineWidgetOptions>


@customElement('auto-field-combine')
export class AutoFieldCombine extends AutoField<AutoFieldCombineOptions> {
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
        this.shadow.removeEventListener('field-change', this._handleFieldChange)

    }
    // 使用箭头函数绑定 this
    private _handleFieldChange = (event: Event) => {
        // 处理 field-change 事件的逻辑
        console.log('Field change event:', event);
        // 确保 this 指向组件实例
        console.log('Current component:', this);
    };
    /**
     * 
     */
    _onChildrenChange() {
        if (this.options.children.length > 0) {
            this.shadow.addEventListener('field-change', this._handleFieldChange)
        }
    }


    renderInput() {
        return html`
            <div class="fields">
                ${repeat(this.options.children, (field) => {
            return html`${renderWidget(field, this)}`
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

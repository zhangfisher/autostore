import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js"


@customElement('auto-field-radio')
export class AutoFieldRadio extends AutoField {
    static styles = [
        AutoField.styles,
        css`
        sl-radio-group::part(form-control-input) {
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            padding: 0.2em;
        }
        sl-radio{
            margin-right: 1em;
            padding: 0.2em;
        }
    `] as any

    renderValue() {
        const items = this.getOptionValue('select', []).map((item: any, index: number) => {
            const selectItem: any = {}
            if (typeof (item) === 'object') {
                Object.assign(selectItem, item)
            } else {
                Object.assign(selectItem, ({ label: item }))
            }
            return selectItem
        })
        return html`              
        <sl-radio-group 
            name=${this.name} 
            value="${this.value}"            
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        >
        ${items.map((item: any) => html`<sl-radio 
            value="${item.value || item.label}"
            ${ifDefined(this.getOptionValue('disabled'))}
        >${item.label}</sl-radio>`)}
        </sl-radio-group> 
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-radio': AutoFieldRadio
    }
}

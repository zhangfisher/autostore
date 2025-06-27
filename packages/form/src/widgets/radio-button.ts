import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"
import '@shoelace-style/shoelace/dist/components/radio-button/radio-button.js';
import type { SchemaRadioButtonWidgetOptions } from "autostore";


export type AutoFieldRadioButtonOptions = Required<SchemaRadioButtonWidgetOptions>


@customElement('auto-field-radio-button')
export class AutoFieldRadioButton extends AutoField<AutoFieldRadioButtonOptions> {
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

    renderInput() {
        const items = this.getOptionValue('select', []).map((item: any, index: number) => {
            const selectItem: any = {}
            if (typeof (item) === 'object') {
                Object.assign(selectItem, item)
            } else {
                Object.assign(selectItem, ({ label: item, value: index + 1 }))
            }
            return selectItem
        })
        return html`              
        <sl-radio-group 
            name=${this.name} 
            data-path=${this.path} 
            value="${this.value}"            
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        >
        ${items.map((item: any) => html`<sl-radio-button
            value="${item.value}"
            ?disabled =${this.options.enable}
        >${item.label}</sl-radio-button>`)}
        </sl-radio-group> 
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-radio-button': AutoFieldRadioButton
    }
}

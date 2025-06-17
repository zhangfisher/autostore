import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"
import { AutoFormContext } from '@/context';


@customElement('auto-field-checkbox')
export class AutoFieldCheckbox extends AutoField {

    renderValue() {
        return html`              
        <sl-checkbox 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}
            .value="${this.value}" 
            .checked=${this.value} 
            placeholder="${ifDefined(this.getFieldOption("placeholder"))}"
            helpText="${ifDefined(this.getFieldOption("help"))}"
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        > ${this.schema!.label}</sl-checkbox> 
        `
    }
    renderLabel(ctx: AutoFormContext) {
        if (ctx.labelPos === 'left') {
            return super.renderLabel(ctx)
        } else {
            return html``
        }

    }
    getLabel() {
        return ''
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-checkbox': AutoFieldCheckbox
    }
}

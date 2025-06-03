import { AutoField } from "@/field"
import { isAsyncComputedValue } from "autostore"
import { html } from "lit"
import { customElement } from "lit/decorators.js"


@customElement('auto-field-input')
export class AutoFieldInput extends AutoField {

    renderValue() {
        const schema = this.schema!
        return html`
            <sl-input 
                slot="value" 
                .value=${this.value} 
                name=${schema.name || schema.path.join('.')} 
                data-path = ${schema.path} 
                .defaultValue=${this.getSchmeaItemValue('defaultValue')} 
                size=${this.getSchmeaItemValue('size', 'medium')}
                ?filled=${this.getSchmeaItemValue('filled')}
                ?pill=${this.getSchmeaItemValue('pill', false)}
                ?clearable=${this.getSchmeaItemValue('clearable', false)}
                ?disabled=${this.getSchmeaItemValue('disabled', false)}
                .helpText=${this.getSchmeaItemValue('help')}
                ?required=${this.getSchmeaItemValue('required', false)}                
                .placeholder=${this.getSchmeaItemValue('placeholder')}
                .pattern=${this.getSchmeaItemValue('pattern')}
                .minlength=${this.getSchmeaItemValue('minlength')}
                .maxlength=${this.getSchmeaItemValue('maxlength')}
                .max=${this.getSchmeaItemValue('max')}
                .min=${this.getSchmeaItemValue('min')}
                .step=${this.getSchmeaItemValue('step')}
                .autocapitalize=${this.getSchmeaItemValue('autocapitalize')}
                .utocorrect=${this.getSchmeaItemValue('autocorrect')}
                .autocomplete=${this.getSchmeaItemValue('autocomplete')}
                ?autofocus=${this.getSchmeaItemValue('autofocus')}
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            ></sl-input>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-input': AutoFieldInput
    }
}

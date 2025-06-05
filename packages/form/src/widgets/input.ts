import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"

export type InputType = 'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url'
@customElement('auto-field-input')
export class AutoFieldInput extends AutoField {
    getInputType(): InputType {
        return this.schema?.type || "text"
    }
    renderValue() {
        const schema = this.schema!
        return html`
            <sl-input 
                slot="value" 
                type="${this.getInputType()}"
                .value=${this.value} 
                name=${this.name} 
                data-path = ${schema.path} 
                .defaultValue=${this.getSchemaItemValue('defaultValue')}                 
                ?filled=${this.getSchemaItemValue('filled')}
                ?pill=${this.getSchemaItemValue('pill', false)}
                ?clearable=${this.getSchemaItemValue('clearable', false)}
                ?disabled=${this.getSchemaItemValue('disabled', false)}                
                ?required=${this.getSchemaItemValue('required', false)}                
                size=${ifDefined(this.getSchemaItemValue('size', 'medium'))}
                placeholder=${ifDefined(this.getSchemaItemValue('placeholder'))}
                pattern=${ifDefined(this.getSchemaItemValue('pattern'))}
                helpText=${ifDefined(this.getSchemaItemValue('help'))}
                minLength=${ifDefined(this.getSchemaItemValue('minLength'))}
                maxLength=${ifDefined(this.getSchemaItemValue('maxLength'))}
                .max=${this.getSchemaItemValue('max')}
                .min=${this.getSchemaItemValue('min')}
                .step=${this.getSchemaItemValue('step')}
                .passwordToggle=${this.getSchemaItemValue('passwordToggle')}
                .utocorrect=${this.getSchemaItemValue('autocorrect')}
                .autocomplete=${this.getSchemaItemValue('autocomplete')}
                ?autofocus=${this.getSchemaItemValue('autofocus')}
                @sl-input=${this.onFieldInput.bind(this)}
                spellcheck=${ifDefined(this.getSchemaItemValue('spellcheck', "false"))}
            ></sl-input>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-input': AutoFieldInput
    }
}

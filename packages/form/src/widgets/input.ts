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
    connectedCallback(): void {
        super.connectedCallback()
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
                .defaultValue=${this.getOptionValue('defaultValue')}                 
                ?filled=${this.getOptionValue('filled')}
                ?pill=${this.getOptionValue('pill', false)}
                ?clearable=${this.getOptionValue('clearable', false)}
                ?disabled=${this.getOptionValue('disabled', false)}                
                ?required=${this.getOptionValue('required', false)}                
                size=${ifDefined(this.getOptionValue('size', 'medium'))}
                placeholder=${ifDefined(this.getOptionValue('placeholder'))}
                pattern=${ifDefined(this.getOptionValue('pattern'))}
                helpText=${ifDefined(this.getOptionValue('help'))}
                minLength=${ifDefined(this.getOptionValue('minLength'))}
                maxLength=${ifDefined(this.getOptionValue('maxLength'))}
                .max=${this.getOptionValue('max')}
                .min=${this.getOptionValue('min')}
                .step=${this.getOptionValue('step')}
                .passwordToggle=${this.getOptionValue('passwordToggle')}
                .utocorrect=${this.getOptionValue('autocorrect')}
                .autocomplete=${this.getOptionValue('autocomplete')}
                ?autofocus=${this.getOptionValue('autofocus')}
                @sl-input=${this.onFieldInput.bind(this)}
                spellcheck=${ifDefined(this.getOptionValue('spellcheck', "false"))}
            ></sl-input>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-input': AutoFieldInput
    }
}

import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"

export type InputType = 'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url'
@customElement('auto-field-input')
export class AutoFieldInput extends AutoField {
    static styles = [
        AutoField.styles,
        css`
        .actions{
            margin-right:0px;
            display:flex;
            flex-direction:row;
            align-items:center;
        }
        .actions > sl-button{
            margin:0px;

            
        }
        .actions > sl-button::part(base){
            border-right:none;
            border-radius: 0px;
        }
    `] as any

    getInputType(): any {
        return this.schema?.inputType || "input"
    }

    getPrefix() {

    }
    getSuffix() {

    }
    renderActions(pos: 'prefix' | 'suffix' = 'suffix') {
        return html`<div class="actions" slot=${pos}>
            <sl-button>增加</sl-button>
            <sl-button>删除</sl-button>
    </div>`
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
            >${this.getPrefix()}${this.getSuffix()}${this.renderActions()}</sl-input>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-input': AutoFieldInput
    }
}

import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"
import type { SchemaInputWidgetOptions } from 'autostore';

export type InputType = "number" | "date" | "time" | "url" | "password" | "email" | "search" | "text" | "datetime-local" | "tel"

export type AutoFieldInputOptions = Required<SchemaInputWidgetOptions>

@customElement('auto-field-input')
export class AutoFieldInput<Options = AutoFieldInputOptions> extends AutoField<AutoFieldInputOptions & Options> {
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
            .actions.after > sl-button::part(base){
                border-right:none;
                border-radius: 0px;

            }
            .actions.before{
                margin-left: 0px;
            }
            .actions.before > sl-button::part(base){
                border-left:none;
                border-radius: 0px;
            } 
    `] as any

    getInputType(): InputType {
        return this.options.inputType || "input"
    }

    getInitialOptions(): Record<string, any> {
        return {
            inputType: 'input'
        }
    }
    getPrefix() {
        if (this.options.icon) {
            return html`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`
        }
    }
    renderInput() {
        return html`
            <sl-input 
                slot="value" 
                type="${this.getInputType()}"
                .value=${this.value} 
                name=${this.name} 
                data-path = ${this.path}
                ?filled=${this.options.filled}
                ?pill=${this.options.pill}
                ?clearable=${this.options.clearable}
                ?required=${this.options.required}                
                size=${this.context.size} 
                placeholder=${ifDefined(this.options.placeholder)}
                pattern=${ifDefined(this.options.pattern)}
                minLength=${ifDefined(this.options.minLength)}
                maxLength=${ifDefined(this.options.maxLength)}
                ?disabled=${!this.options.enable}                
                .autocorrect=${this.options.autocorrect}
                .autocomplete=${this.options.autocomplete}
                ?autofocus=${this.options.autofocus}
                @sl-input=${this.onFieldInput.bind(this)}
                spellcheck=${ifDefined(this.options.spellcheck)}
            >
            ${this.getPrefix()}${this.getSuffix()}${this.renderActions()}</sl-input>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-input': AutoFieldInput
    }
}

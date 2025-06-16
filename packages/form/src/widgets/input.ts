import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"
import { SchemaWidgetAction, setVal } from 'autostore';

export type InputType = 'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'phone'
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

    getInputType(): any {
        return this.schema?.inputType || "input"
    }
    renderAction(action: SchemaWidgetAction) {
        const onClick = (action: SchemaWidgetAction) => (e: any) => action.onClick(this.value, {
            action,
            schema: this.schema!,
            event: e,
            update: (value: any) => {
                setVal(this.context!.store!.state, this.schema!.path, value)
            }
        })
        return html`
        <sl-button @click=${onClick(action)}>${action.label}</sl-button>
    `
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
                data-path = ${schema.path.join('.')}
                .defaultValue=${this.getReactiveOption('defaultValue')}                 
                ?filled=${this.getReactiveOption('filled')}
                ?pill=${this.getReactiveOption('pill', false)}
                ?clearable=${this.getReactiveOption('clearable', false)}
                ?disabled=${this.getReactiveOption('disabled', false)}                
                ?required=${this.getReactiveOption('required', false)}                
                size=${ifDefined(this.getReactiveOption('size'))}
                placeholder=${ifDefined(this.getReactiveOption('placeholder'))}
                pattern=${ifDefined(this.getReactiveOption('pattern'))}
                help-text=${ifDefined(this.getReactiveOption('help'))}
                minLength=${ifDefined(this.getReactiveOption('minLength'))}
                maxLength=${ifDefined(this.getReactiveOption('maxLength'))}
                .max=${this.getReactiveOption('max')}
                .min=${this.getReactiveOption('min')}
                .step=${this.getReactiveOption('step')}
                .passwordToggle=${this.getReactiveOption('passwordToggle')}
                .utocorrect=${this.getReactiveOption('autocorrect')}
                .autocomplete=${this.getReactiveOption('autocomplete')}
                ?autofocus=${this.getReactiveOption('autofocus')}
                @sl-input=${this.onFieldInput.bind(this)}
                spellcheck=${ifDefined(this.getReactiveOption('spellcheck', "false"))}
            >${this.getPrefix()}${this.getSuffix()}${this.renderActions()}</sl-input>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-input': AutoFieldInput
    }
}

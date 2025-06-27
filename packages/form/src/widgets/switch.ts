import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"
import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import type { SchemaSwitchWidgetOptions } from 'autostore';

export type AutoFieldSwitchOptions = Required<SchemaSwitchWidgetOptions>

@customElement('auto-field-switch')
export class AutoFieldSwitch extends AutoField<AutoFieldSwitchOptions> {

    renderInput() {
        return html`              
        <sl-switch 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}
            value="${this.options.switchValues[0]}"   
            .checked =${this._isChecked()}    
            size="${ifDefined(this.context.size)}"    
            placeholder="${ifDefined(this.options.placeholder)}"
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        > ${this.options.checkLabel}</sl-switch> 
        `
    }
    getInitialOptions() {
        return {
            switchValues: [true, false]
        }
    }
    _isChecked() {
        return this.value === this.options.switchValues[0]
    }
    getInputValue() {
        return this.input.checked ? this.options.switchValues[0] : this.options.switchValues[1]
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-switch': AutoFieldSwitch
    }
}

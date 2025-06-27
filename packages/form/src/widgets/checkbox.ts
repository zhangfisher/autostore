import { html } from "lit"
import { customElement } from "lit/decorators.js"
import { ifDefined } from 'lit/directives/if-defined.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import { AutoField } from "@/field"
import type { SchemaCheckboxWidgetOptions } from "autostore";


export type AutoFieldCheckboxOptions = Required<SchemaCheckboxWidgetOptions>

@customElement('auto-field-checkbox')
export class AutoFieldCheckbox extends AutoField<AutoFieldCheckboxOptions> {
    switchValues: any[] = []
    renderInput() {
        return html`        
        <sl-checkbox 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}            
            class="auto-input"
            ?disabled=${!this.options.enable}
            .value="${this.options.switchValues[0]}" 
            .checked=${this._isChecked()} 
            placeholder="${ifDefined(this.options.placeholder)}"
            @sl-change=${this.onFieldChange.bind(this)}
        > ${this.options.checkLabel}</sl-checkbox> 
        `
    }
    getInitialOptions() {
        return {
            switchValues: [true, false]
        }
    }
    _isChecked() {
        return this.value === this.switchValues[0]
    }
    getInputValue() {
        return this.input.checked ? this.options.switchValues[0] : this.options.switchValues[1]
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-checkbox': AutoFieldCheckbox
    }
}

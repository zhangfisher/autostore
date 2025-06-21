import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"
import '@shoelace-style/shoelace/dist/components/switch/switch.js';


@customElement('auto-field-switch')
export class AutoFieldSwitch extends AutoField {
    switchValues: any[] = []

    renderInput() {
        return html`              
        <sl-switch 
            slot="value" 
            name="${this.name}"
            data-path = ${this.path}
            value="${this.switchValues[0]}"   
            .checked =${this._isChecked()}    
            size="${this.context.size}"    
            ${ifDefined(this.getFieldOption("placeholder"))}
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        > ${this.schema!.checkLabel}</sl-switch> 
        `
    }

    _isChecked() {
        return this.value == this.switchValues[0]
    }
    connectedCallback(): void {
        super.connectedCallback()
        if (this.schema?.switchValues) {
            this.switchValues = this.field.switchValues?.value
        } else {// 没有指定switchValues，就默认为[true,false]
            if (typeof (this.value) === 'boolean') {
                this.switchValues = [true, false]
            } else if (this.value == undefined) {
                this.switchValues = [true, false]
            } else {
                this.switchValues = [this.value, undefined]
            }
        }
    }
    getInputValue() {
        return this.input!.checked ? this.switchValues[0] : this.switchValues[1]
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-switch': AutoFieldSwitch
    }
}

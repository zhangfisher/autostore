import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"


@customElement('auto-field-ipaddress')
export class AutoFieldIpAddress extends AutoField {
    static styles = [
        AutoField.styles,
        css`
        .value{
            display: flex;
            flex-direction: row;
        }
        .value > span.dot{
            width:1em;                     
            text-align: center;   
            font-weight: bold;
            margin-top: 1em;
        }
        sl-input{
            width: 4em;
            
        }
        sl-input::part(input){
            text-align: center;   
            padding-right: 2px;
        }
    `] as any
    _getIpBits(): [number, number, number, number] {
        const bits = this.value?.split(".")
        return [
            parseInt(bits![0] || "0"),
            parseInt(bits![1] || "0"),
            parseInt(bits![2] || "0"),
            parseInt(bits![3] || "0")
        ]
    }
    _onIpChange(index: number, e: Event) {
        this.onFieldChange()
    }
    getValue() {
        const inputs = Array.from(this.shadowRoot!.querySelectorAll('sl-input'))
        return inputs.map(input => input.value).join(".")
    }
    renderValue() {

        const schema = this.schema!
        return html`
                ${this._getIpBits().map((bit, index) => html`
                    <sl-input 
                        slot="value" 
                        type="number"
                        value="${bit}" 
                        name=${this.name} 
                        data-path = ${schema.path} 
                        defaultValue='0' 
                        max="255"
                        min="0"
                        @sl-input=${(e: Event) => this._onIpChange(index, e)}
                        @sl-change=${(e: Event) => this._onIpChange(index, e)} 
                    ></sl-input>
                    ${index < 3 ? html`<span class="dot">.</span>` : ''}                    
                `)} 
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-ipaddress': AutoFieldIpAddress
    }
}

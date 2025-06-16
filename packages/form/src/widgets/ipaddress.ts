import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"


@customElement('auto-field-ipaddress')
export class AutoFieldIpAddress extends AutoField {
    static styles = [
        AutoField.styles,
        css`
            :host{
                
            }
            .value{
                display: flex;
                flex-direction: row;
                border: 1px solid var(--sl-color-gray-500);
                border-radius: var(--sl-border-radius-medium);
                background-color: var(--sl-input-background-color);
                border: solid var(--sl-input-border-width) var(--sl-input-border-color);
                width: 15rem;
            }
            .value > span.dot{
                width:1em;                     
                text-align: center;   
                font-weight: bold;
                margin-top: 1em;
                
            }
            sl-input::part(base){
                border: none;
            }
            sl-input{
                width: 3rem;
            }
            sl-input::part(input){
                text-align: center; 
                padding: 0px 4px ;
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
                        value="${bit}" 
                        name=${this.name} 
                        data-path = ${schema.path.join('.')}
                        defaultValue='0' 
                        maxLength="3"
                        minLength="1"
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

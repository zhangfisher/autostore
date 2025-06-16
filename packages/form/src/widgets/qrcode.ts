import { AutoField } from "@/field"
import { html } from "lit"
import { customElement } from "lit/decorators.js"


@customElement('auto-field-qrcode')
export class AutoFieldQRCode extends AutoField {

    renderValue() {
        return html`              
        <sl-qr-code 
            slot="value" 
            name=${this.schema!.name || this.schema!.path.join('.')} 
            data-path = ${this.schema!.path}
            value=${this.value} 
            placeholder=${this.getReactiveOption('placeholder')}
            title=${this.getReactiveOption('title')}
            fill=${this.getReactiveOption('fill', 'black')}
            background=${this.getReactiveOption('background', 'white')}
            radius=${this.getReactiveOption('radius')}
            error-correction=${this.getReactiveOption('errorCorrection', 'L')}
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
            size=${this.getReactiveOption('size', 64)}
        ></sl-qr-code > 
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-qrcode': AutoFieldQRCode
    }
}

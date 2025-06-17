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
            placeholder=${this.getFieldOption('placeholder')}
            title=${this.getFieldOption('title')}
            fill=${this.getFieldOption('fill', 'black')}
            background=${this.getFieldOption('background', 'white')}
            radius=${this.getFieldOption('radius')}
            error-correction=${this.getFieldOption('errorCorrection', 'L')}
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
            size=${this.getFieldOption('size', 64)}
        ></sl-qr-code > 
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-qrcode': AutoFieldQRCode
    }
}

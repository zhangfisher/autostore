import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from '@/field';
import { html } from 'lit';
import '@shoelace-style/shoelace/dist/components/qr-code/qr-code.js';
import type { SchemaQrCodeWidgetOptions } from 'autostore';

export type AutoFieldQRCodeOptions = Required<SchemaQrCodeWidgetOptions>;

export class AutoFieldQRCode extends AutoField<AutoFieldQRCodeOptions> {
    getInitialOptions(): Record<string, any> {
        return {
            fill: 'black',
            background: 'white',
            radius: 0,
            errorCorrection: 'L',
            size: 64,
        };
    }
    renderInput() {
        return html`
            <sl-qr-code
                slot="value"
                name=${this.name}
                data-path=${this.path}
                value=${this.value}
                .placeholder=${this.options.placeholder}
                title="${ifDefined(this.options.tips)}"
                fill=${this.options.fill}
                background=${this.options.background}
                radius=${this.options.radius}
                error-correction=${this.options.errorCorrection}
                size=${parseInt(String(this.options.size))}
            ></sl-qr-code>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-qrcode': AutoFieldQRCode;
    }
}

if (!customElements.get('auto-field-qrcode')) {
    customElements.define('auto-field-qrcode', AutoFieldQRCode);
}

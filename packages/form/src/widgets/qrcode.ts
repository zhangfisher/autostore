import { ifDefined } from 'lit/directives/if-defined.js';
import { AutoField } from '@/field';
import { html } from 'lit';
import '@shoelace-style/shoelace/dist/components/qr-code/qr-code.js';
import { tag } from '@/utils/tag';
/**
 * qrcode 二维码 widget 的配置类型
 */
export interface AutoFieldQRCodeOptions {
    /**
     * 前景色（码点颜色），默认 "black"
     */
    fill?: string;
    /**
     * 背景色，默认 "white"
     */
    background?: string;
    /**
     * 圆角半径，默认 0
     */
    radius?: number;
    /**
     * 纠错级别，默认 "L"
     */
    errorCorrection?: "L" | "M" | "Q" | "H";
    /**
     * 尺寸（px），默认 64
     */
    size?: number;
    /**
     * 悬停提示文字
     */
    tips?: string;
}
@tag('auto-field-qrcode')
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
declare module "autostore" {
    interface AutoStoreWidgets {
        qrcode: AutoFieldQRCodeOptions;
    }
}

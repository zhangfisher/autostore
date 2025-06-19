
import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"
import '@shoelace-style/shoelace/dist/components/color-picker/color-picker.js';

const defaultColors = `
    #ffffff;#f1f1f1;#bfbfbf;#262626;
    #f5222d; #fa541c; #fa8c16;
    #faad14; #fadb14; #a0d911;
    #52c41a; #13c2c2;#1890ff;
    #2f54eb;#722ed1;#eb2f96;
`

@customElement('auto-field-colorpicker')
export class AutoFieldColorPicker extends AutoField {
    static styles = [
        AutoField.styles, css`
        sl-color-picker::part(trigger){
            border-radius: 4px;
        }
    `] as any
    renderInput() {
        return html`
            <sl-color-picker 
                slot="value"  
                data-path = ${this.schema!.path}
                class="auto-input"
                name=${this.name} 
                value=${this.value} 
                format=${this.getFieldOption('format', 'hex')}
                ?opacity=${this.getFieldOption('opacity', false)}
                ?inline=${this.getFieldOption('inline', false)}
                ?required=${this.getFieldOption('required', false)}
                ?disabled=${this.getFieldOption('disabled', false)}
                placeholder=${this.schema!.placeholder || ''}
                swatches=${this.getFieldOption('presets', defaultColors)}
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            ></sl-color-picker>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-colorpicker': AutoFieldColorPicker
    }
}

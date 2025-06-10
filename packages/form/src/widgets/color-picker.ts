
import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"

const defaultColors = `
    #d0021b; #f5a623; #f8e71c; #8b572a; #7ed321; #417505; #bd10e0; #9013fe;
    #4a90e2; #50e3c2; #b8e986; #000; #444; #888; #ccc; #fff;
  `

@customElement('auto-field-colorpicker')
export class AutoFieldColorPicker extends AutoField {
    static styles = [
        AutoField.styles, css`
        sl-color-picker::part(trigger){
            border-radius: 4px;
        }
    `] as any
    renderValue() {
        return html`
            <sl-color-picker 
                slot="value"  
                data-path = ${this.schema!.path}
                name=${this.name} 
                value=${this.value} 
                format=${this.getOptionValue('format', 'hex')}
                ?opacity=${this.getOptionValue('opacity', false)}
                ?inline=${this.getOptionValue('inline', false)}
                ?required=${this.getOptionValue('required', false)}
                ?disabled=${this.getOptionValue('disabled', false)}
                placeholder=${this.schema!.placeholder || ''}
                swatches=${this.getOptionValue('presets', defaultColors)}
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

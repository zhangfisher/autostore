
import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"
import '@shoelace-style/shoelace/dist/components/color-picker/color-picker.js';
import type { SchemaColorPickerWidgetOptions } from "autostore";

const defaultColors = [
    '#ffffff', '#f1f1f1', '#bfbfbf',
    '#262626', '#f5222d', '#fa541c',
    '#fa8c16', '#faad14', '#fadb14',
    '#a0d911', '#52c41a', '#13c2c2',
    '#1890ff', '#2f54eb', '#722ed1',
    '#eb2f96',
]

export type AutoFieldColorPickerOptions = Required<SchemaColorPickerWidgetOptions>

@customElement('auto-field-colorpicker')
export class AutoFieldColorPicker extends AutoField<AutoFieldColorPickerOptions> {
    static styles = [
        AutoField.styles, css`
        sl-color-picker::part(trigger){
            border-radius: 4px;
        }
        .color{
            border: 2px solid white;            
            border-radius: 4px;
            width: 1rem;
            height: 1rem;
            outline: 1px solid #aaa; 
            margin-right: 0.5rem;
        }        
        :host(.viewonly){
            .value > span{
                display: flex;
                flex-direction: row;
                align-items: center;
            }
        }
    `] as any
    getInitialOptions() {
        return {
            format: 'hex',
            opacity: false,
            inline: false,
            presets: defaultColors
        }
    }
    renderInput() {
        return html`
            <sl-color-picker  
                name=${this.name} 
                data-path = ${this.path}
                class="auto-input"                
                value=${this.value} 
                .format=${this.options.format}
                ?opacity=${this.options.opacity}
                ?inline=${this.options.inline}
                ?required=${this.options.required}
                ?disabled=${!this.options.enable}
                .placeholder=${this.options.placeholder}
                .swatches=${this.options.presets.join(';')}
                @sl-input=${this.onFieldInput.bind(this)}
                @sl-change=${this.onFieldChange.bind(this)}
            ></sl-color-picker>
        `
    }
    renderView() {
        return html`<span><span class="color" style="background-color:${this.value};"></span>${this.value}</span>`
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-colorpicker': AutoFieldColorPicker
    }
}

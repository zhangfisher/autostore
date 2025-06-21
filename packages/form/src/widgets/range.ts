import { reactive } from 'vue';
import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"
import '@shoelace-style/shoelace/dist/components/range/range.js';


@customElement('auto-field-range')
export class AutoFieldRabge extends AutoField {
    static styles = [
        AutoField.styles,
        css`
            .scale{
                position: relative;
                display: flex;
                flex-direction: row;
            }
            .box{
                background-color: var(--auto-bgcolor);
                border: var(--auto-border);
                padding: 0.5rem;
                border-radius: var(--auto-border-radius);
                box-shadow: var(--auto-shadow);
            }
            sl-range:part(tooltip){
                display: block!important;
            }
        `
    ] as any
    renderInput() {
        return html`       
        <div class="scale">

        </div>       
        <sl-range 
            slot="value" 
            name="${this.name}"
            data-path = ${this.schema!.path}
            value=${this.value} 
            .placeholder=${this.getFieldOption("placeholder")}
            .defaultValue=${this.getFieldOption("defaultValue", this.value)}
            ?disabled=${this.getFieldOption("disabled")}
            .max=${this.getFieldOption("max")}
            .min=${this.getFieldOption("min")}
            .step=${this.getFieldOption("step")}
            .tooltip=${this.getFieldOption("tooltip", "top")}
            .tooltipFormatter=${this.getFieldOption("tooltipFormatter")}
            @sl-input=${this.onFieldInput.bind(this)}
            @sl-change=${this.onFieldChange.bind(this)}
        > ${this.schema!.label}</sl-range>
        <sl-popup placement="top" arrow arrow-placement="anchor" distance="8" skidding="0" active>
    <span slot="anchor"></span>
    <div class="box">
                dssssssssssssssssssssssssssss
    </div>
  </sl-popup>
  
        `
    }
    renderScales() {
        return html`
            <span class="begin"></span>
            <span class="value"></span>
            <span class="end"></span>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-range': AutoFieldRabge
    }
}

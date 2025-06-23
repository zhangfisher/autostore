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
            sl-range{
                 
                box-sizing: border-box;
            }
            .value > div{
                display: flex;
                align-items: center;
                & :first-child{
                    padding: 1rem;
                    padding-left:0.1rem;
                }
                & :last-child{
                    flex-grow: 1;
                }
            }
        `
    ] as any
    _formatValue() {
        if (this.field.format?.value) {
            return this.field.format.value.replace(/\{\s*value\s*\}/g, () => this.value)
        }
        return this.value
    }
    renderInput() {
        return html`       
        <div>
            <span>${this.toView(this.value)}</span>
            <sl-range 
                slot="value" 
                name="${this.name}"
                data-path = ${this.schema!.path.join('.')}
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
            >
        </sl-range>
        </div> 
       
  
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

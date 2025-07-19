import { customElement, queryAll } from "lit/decorators.js"
import type { SchemaDateWidgetOptions } from "autostore"
import { AutoField } from "@/field"
import { css, html } from "lit"


export type AutoFieldDateRangeOptions = Required<SchemaDateWidgetOptions>
@customElement('auto-field-date-range')
export class AutoFieldDateRange extends AutoField<AutoFieldDateRangeOptions> {
    static styles = [
        AutoField.styles,
        css`
            .dates{
                display: flex;
                align-items: center;
                flex-direction: row;
                &>sl-input{
                    flex-grow: 1;
                }
                &>.sp{
                    padding: 0.5em;
                }
            }
        `
    ] as any
    getInitialOptions() {
        return {
            icon: 'date'
        }
    }

    @queryAll('sl-input')
    inputs?: any[]

    _onInputChange(e: Event) {
        const event = e.type
        if (this.context.validAt === 'input' && event.includes('input')) {
            this.onFieldInput()
        } else if (event.includes('change')) {
            this.onFieldChange()
        }
    }

    _getDate(index: number) {
        const values = Array.isArray(this.value)
            ? this.value : this.value.split(",")
        return values[index]
    }

    _renderIcon() {
        if (this.options.icon) {
            return html`<sl-icon name="${this.options.icon}" slot="prefix"></sl-icon>`
        }
    }

    _renderDate(index: number) {
        return html`<sl-input 
            type="date" 
            .value=${this._getDate(index)}
            size=${this.context.size} 
            ?disabled=${!this.options.enable}
            @sl-input=${this._onInputChange.bind(this)}
            @sl-change=${this._onInputChange.bind(this)}
            ?filled=${this.options.filled}
            ?pill=${this.options.pill}
            ?clearable=${this.options.clearable}
            ?required=${this.options.required}    
        >${this._renderIcon()}</sl-input>`
    }
    renderInput() {
        return html`
            <div class="dates">
                ${this._renderDate(0)} 
                <span class="sp">-</span>
                ${this._renderDate(1)} 
            </div>
        `
    }
    getInputValue() {
        const values = (Array.from(this.inputs || [])).map(input => {
            return input.value
        })
        return values
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-date-range': AutoFieldDateRange
    }
}

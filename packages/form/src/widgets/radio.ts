import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { styleMap } from "lit/directives/style-map.js"

export type AutoFieldRadioOptions = {
    card: boolean
}

@customElement('auto-field-radio')
export class AutoFieldRadio extends AutoField<AutoFieldRadioOptions> {
    static styles = [
        AutoField.styles,
        css`
        sl-radio-group::part(form-control-input) {
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            padding: 0.2em;
        }
        sl-radio{            
            padding: 0.2em;
        }
        sl-radio::part(label){
            margin-right: 1em;
            & .help{
                color: var(--sl-input-border-color);
                font-size: 0.6rem;
            }
        }
        .card{
            box-sizing: border-box;
            padding: 0.3rem;
            &>sl-radio{
                box-sizing: border-box;
                border: 1px solid var(--sl-input-border-color);
                padding: var(--sl-spacing-small);
                border-radius: var(--sl-border-radius-medium);
                box-shadow: var(--sl-shadow-medium);
            }            
        }
    `] as any
    renderOptionItemWithCard(option: any) {
        if (this.field.card) {
            return html`<div class="card"
            style=${styleMap({
                width: this.field.itemWidth?.value
            })}
            >
                ${option}
        </div>`
        } else {
            return option
        }

    }
    renderOptionItem(item: any) {
        return html`<sl-radio 
            value="${item.value || item.label}"
            style=${styleMap({
            width: this.field.card == undefined && this.field.itemWidth?.value
        })}
            ${ifDefined(this.getFieldOption('disabled'))}
        >${item.label}<br/><span class="help">${item.help}</span></sl-radio>`
    }
    renderValue() {
        const items = this.getFieldOption('select', []).map((item: any) => {
            const selectItem: any = {}
            if (typeof (item) === 'object') {
                Object.assign(selectItem, item)
            } else {
                Object.assign(selectItem, ({ label: item }))
            }
            return selectItem
        })
        return html`              
            <sl-radio-group 
                name=${this.name} 
                value="${this.value}"            
                @sl-change=${this.onFieldChange.bind(this)}
            >
            ${items.map((item: any) => {
            return this.renderOptionItemWithCard(this.renderOptionItem(item))
        })}
            </sl-radio-group> 
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-radio': AutoFieldRadio
    }
}

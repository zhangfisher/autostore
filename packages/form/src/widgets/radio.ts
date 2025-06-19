import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { styleMap } from "lit/directives/style-map.js"
import '@shoelace-style/shoelace/dist/components/radio/radio.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';

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
            position: relative;
            & .memo{
                color: var(--sl-color-gray-500);
                font-size: 0.8rem;
                max-height: 2.2rem;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }            
            
        }
        sl-radio::part(label){
            margin-right: 1em;            
        }
        .card{      
            padding: 0.5rem;
            box-sizing: border-box;            
            &>.body{
                display: flex;
                flex-direction: row;
                border: 1px solid var(--sl-input-border-color);
                border-radius: var(--sl-border-radius-medium);
                box-shadow: var(--sl-shadow-medium);
                padding: 1rem;
                box-sizing: border-box; 
                position: relative;                          
                &:hover{
                    outline: 1px solid var(--sl-color-primary-500);
                } 
                & > sl-radio{
                    flex-grow: 1;
                }
                & sl-radio::part(control){                    
                    display: none;
                }
                & sl-radio::part(label){                    
                    padding-right: 0px;
                    margin-right: 0px;
                }
                &.selected{
                    border: 1px solid var(--sl-color-primary-500);
                    background-color: var(--sl-color-primary-50);
                }
                &.selected:before{
                    content: ' ';
                    position: absolute;
                    left: calc(100% - 24px);
                    top:0px;
                    width: 24px;
                    height:24px;
                    box-sizing: border-box;
                    border: 12px solid transparent;
                    border-top-color: var(--sl-color-primary-500);
                    border-right-color: var(--sl-color-primary-500);
                }     
                &.selected:after{
                    content: ' ';
                    position: absolute;
                    left: calc(100% - 12px);
                    top:2px;
                    width: 10px;
                    height:6px;
                    box-sizing: border-box;
                    border: 2px solid transparent;
                    border-left-color: white;
                    border-bottom-color: white;
                    transform: rotate(-45deg);
                }  
                sl-icon.icon{
                    flex-shrink: 0;
                    color: var(--sl-color-gray-500);
                    padding: 0.5rem;
                    padding-top: 0px;
                    padding-left: 0px;
                    font-size: 2rem;
                }
            }             
        }
    `] as any
    renderOptionItemWithCard(option: any, item: any) {
        if (this.field.card) {
            const value = item.value || item.label
            const isSelected = this.value == value
            return html`<div class="card"
                style=${styleMap({
                width: this.field.itemWidth?.value
            })}
                >
                    <div class="body ${isSelected ? 'selected' : ''}">
                        <sl-icon  class="icon" name="settings"></sl-icon>
                        ${option}                    
                    </div>
            </div>`
        } else {
            return option
        }
    }
    onRadioChange(e: any) {
        this.onFieldChange(e)
        if (this.field.card) this.requestUpdate()
    }
    renderOptionItem(item: any) {
        const value = item.value || item.label
        return html`<sl-radio 
            value="${value}"
            style=${styleMap({
            width: this.field.card == undefined ? this.field.itemWidth?.value : undefined
        })}
            ${ifDefined(this.getFieldOption('disabled'))}
        >${item.label}<br/><span class="memo">${item.memo}</span></sl-radio>`
    }
    renderInput() {
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
                class="value"
                name=${this.name} 
                value="${this.value}"            
                @sl-change=${this.onRadioChange.bind(this)}
            >
            ${items.map((item: any) => {
            return this.renderOptionItemWithCard(this.renderOptionItem(item), item)
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

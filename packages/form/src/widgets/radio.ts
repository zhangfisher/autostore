import { AutoField } from "@/field"
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"
import { styleMap } from "lit/directives/style-map.js"
import '@shoelace-style/shoelace/dist/components/radio/radio.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import type { SchemaRadioWidgetOptions } from "autostore"

export type AutoFieldRadioOptions = Required<SchemaRadioWidgetOptions>

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
                font-size: 0.8em;
                max-height: 2.2em; 
                overflow: hidden;
                display: -webkit-box;
                margin-top:2px;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }            
            
        }
        sl-radio::part(label){
            margin-right: 1em;            
        }
        .card{      
            padding: calc(var(--auto-spacing) * 0.3);
            box-sizing: border-box;                                    
            &>.body{
                display: flex;
                flex-direction: row;
                border: var(--auto-border);
                border-radius: var(--auto-border-radius);
                box-shadow: var(--auto-shadow);
                padding: var(--auto-spacing);
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
                    padding-top: 0px;
                    padding-left: 0px;                    
                    font-size: calc(2 * var(--auto-font-size));
                }
            }             
        }
    `] as any
    getInitialOptions(): Record<string, any> {
        return {
            card: false,
            select: []
        }
    }
    renderOptionItemWithCard(option: any, item: any) {
        if (this.options.card) {
            const value = item.value || item.label
            const isSelected = this.value === value
            return html`<div class="card"
                style=${styleMap({
                width: this.options.itemWidth
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
    onRadioChange() {
        this.onFieldChange()
        if (this.options.card) this.requestUpdate()
    }
    renderOptionItem(item: any) {
        const value = item.value || item.label
        return html`<sl-radio 
            value="${value}"
            style=${styleMap({
            width: this.options.card === undefined ? this.options.itemWidth : undefined
        })}
            ?disabled=${!this.options.enable}
        >${item.label}<br/><span class="memo">${item.memo}</span></sl-radio>`
    }
    renderInput() {
        const items = this.options.select.map((item: any) => {
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
                size="${this.context.size}"            
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

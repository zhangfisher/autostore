import { AutoField } from "@/field"
import type { SchemaCheckboxGroupWidgetOptions } from "autostore";
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';


type SelectItem = {
    id: any
    value: any
    label: any
} & Record<string, any>

export type AutoFieldCheckboxGroupOptions = Required<SchemaCheckboxGroupWidgetOptions>

@customElement('auto-field-checkbox-group')
export class AutoFieldCheckboxGroup extends AutoField<AutoFieldCheckboxGroupOptions> {
    static styles = [
        AutoField.styles,
        css`
        .items{
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            padding: 0.2em;
            sl-checkbox{
                padding: 0.5rem;
            }        
            sl-checkbox::part(form-control-help-text){
                max-height: 2.4rem; 
                overflow: hidden;
            }            
            sl-checkbox::part(base){
                font-size: var(--auto-font-size);
            }
        }         
        sl-icon::part(svg){
            stroke-width: 1; 
        }
        .card{      
            padding: calc(var(--auto-spacing) * 0.3);
            box-sizing: border-box;             
            cursor: pointer;
                
            sl-checkbox{
                padding: 0rem;
            }    
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
                sl-icon.icon{
                    flex-shrink: 0;
                    color: var(--sl-color-gray-500);
                    padding: 0.5em;
                    padding-top: 0px;
                    padding-left: 0px; 
                    font-size: calc(2 * var(--auto-font-size));
                }
                sl-checkbox::part(label){
                    margin-left: 0px;                    
                    font-size: var(--auto-font-size);
                }
                sl-checkbox::part(form-control-help-text){
                    max-height: 2.5em; 
                    line-height:120%;
                    overflow: hidden;
                }
                sl-checkbox::part(control){
                    display: none;
                } 
            }   
            &.card.selected{
                &>.body{
                    border: 1px solid var(--sl-color-primary-500);
                    background-color: var(--sl-color-primary-50);
                    &:hover{
                        outline: 1px solid var(--sl-color-primary-500);
                    }  
                    &:before{
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
                    &:after{
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
                }  
            }          
        }
    `] as any
    valueKey: string = 'value'
    selection: any[] = []
    items: SelectItem[] = []
    isShowIcon: boolean = false

    getInitialOptions() {
        return {
            valueKey: 'value',
            card: false
        }
    }


    connectedCallback(): void {
        super.connectedCallback()
        this.valueKey = this.options.valueKey
        this.items = this.options.select.map((item: any, index: number) => {
            const selectItem: any = {}
            if (typeof (item) === 'object') {
                Object.assign(selectItem, item)
            } else {
                Object.assign(selectItem, ({
                    id: item,
                    label: item,
                    value: item
                }))
            }
            if (selectItem.icon) this.isShowIcon = true
            selectItem.$index = index
            return selectItem
        })
        this.selection = this.value
    }
    renderInput() {
        return html`
            <div class="items">        
                ${this.items.map((item: any) => {
            return this.renderCheckItemWithCard(this.renderCheckboxItem(item), item)
        })} </div>
        `
    }

    renderCheckboxItem(item: any) {
        return html`              
            <sl-checkbox      
                data-index="${item.$index}"
                data-value="${item[this.valueKey]}"
                .value="${item[this.valueKey]}" 
                .checked=${this.value.includes(item[this.valueKey])} 
                help-text="${item.tips}"
                @sl-change=${this._onCheckChange.bind(this)}
            > ${item.label}</sl-checkbox> 
        `
    }

    _onCheckChange(e: any) {
        const ele = e.target.closest('.card') || e.target
        const index = Number(ele.dataset.index)
        const checked = ele.checked ?? !ele.classList.contains('selected')
        const item = this.items[index]
        if (item) {
            if (checked) {
                if (!this.selection.includes(item[this.valueKey])) {
                    this.selection.push(item[this.valueKey])
                }
            } else {
                const index = this.selection.findIndex((selItem: any) => selItem === item[this.valueKey])
                if (index > -1) {
                    this.selection.splice(index, 1)
                }
            }
            this.onFieldChange()
        }
    }


    getInputValue() {
        return this.selection//.map((item) => item[this.valueKey])
    }

    renderCheckItemWithCard(option: any, item: any) {
        if (this.options.card) {
            const isSelected = this.selection.includes(item[this.valueKey])
            return html`<div class="card ${isSelected ? 'selected' : ''}"
                data-index ="${item.$index}"
                style=${styleMap({
                width: this.options.itemWidth
            })}
                @click=${this._onCheckChange.bind(this)}
            >
                <div class="body">
                    ${when(this.isShowIcon, () => html`<sl-icon  class="icon" name="${item.icon || ''}"></sl-icon>`)}                    
                    ${option}                    
                </div>
            </div>`
        } else {
            return option
        }
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-checkbox-group': AutoFieldCheckboxGroup
    }
}

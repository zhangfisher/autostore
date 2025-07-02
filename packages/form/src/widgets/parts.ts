import { css, html } from "lit"
import { customElement } from "lit/decorators.js"
import { repeat } from "lit/directives/repeat.js"
import { when } from "lit/directives/when.js"
import { AutoField } from "@/field"
import type { SchemaPartsWidgetOptions } from "autostore"


export type AutoFieldPartsOptions = Required<SchemaPartsWidgetOptions>
@customElement('auto-field-parts')
export class AutoFieldParts extends AutoField<AutoFieldPartsOptions> {
    static styles = [
        AutoField.styles,
        css`
            :host > .autofield{
                &>.value{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                } 
            }
            sl-input{
                width: 3rem;
                height: 3rem;
                line-height: 3rem;
                text-align: center;                
            }
            sl-input::part(input)::selection{
                background: none;
            }
            sl-input::part(input):focus{
                background-color: var(--sl-color-gray-100);
            }
        `] as any
    delimiter: string = ""
    template: string = '0000'
    parts: string[] = []
    result: string = ''

    getInitialOptions(): Record<string, any> {
        return {
            template: '0000',
            delimiter: ''
        }
    }

    _onPartChange(e: any) {
        const inputs = Array.from(this.shadow.querySelectorAll('sl-input'))
        const chars = inputs.reduce((prev, input) => {
            prev += input.value
            return prev
        }, '')
        let i: number = 0
        this.result = Array.from(this.template).map((char: string) => {
            if (char === this.delimiter) {
                return char
            } else {
                return chars[i++]
            }
        }).join('')
        this.onFieldChange()
        this._isLastInput(e)
    }
    getInputValue() {
        return this.result
    }
    _isLastInput(e: Event) {
        const input = e.target as HTMLInputElement;
        // 检查输入值长度是否为3
        if (input.value.length >= 1) {
            input.blur();
            //@ts-ignore
            const nextInput = (input.nextElementSibling || input.nextElementSibling?.nextElementSibling) as HTMLInputElement;
            if (nextInput) {
                nextInput.focus();
                nextInput.select();
            }
        }
    }
    _onPaste(e: ClipboardEvent) {
        e.preventDefault(); // 阻止默认粘贴行为 
        const clipboardData = e.clipboardData?.getData('text/plain') || '';
        const parts = clipboardData.split('')

        const getNextInput = (input: Element | undefined | null) => {
            if (!input) return
            while (true) {
                inputEle = inputEle!.nextElementSibling
                if (inputEle) {
                    if (inputEle.tagName === 'SL-INPUT') {
                        return inputEle
                    }
                } else {
                    break
                }
            }
        }
        let inputEle: Element | null | undefined = this.shadow.querySelector('sl-input');
        if (inputEle) {
            for (const part of parts) {
                if (part === this.options.delimiter) continue
                // @ts-ignore  
                inputEle.value = part
                inputEle = getNextInput(inputEle)
                if (!inputEle) break
            }
        }
    }
    connectedCallback(): void {
        super.connectedCallback()
        this.delimiter = this.options.delimiter
        this.template = this.options.template
        this.parts = this.template.split(this.delimiter)
        this.value.split(this.delimiter).forEach((char: string, i: number) => {
            this.parts[i] = char
        })
    }
    _onPartFocus(e: any) {
        const input = e.target as HTMLInputElement;
        input.select();
    }
    renderPart(part: string) {
        const chars = part.split('')
        return html`            
        ${repeat(chars, (char) => {
            return html`<sl-input        
                maxLength = "1"
                .value=${char} 
                noSpinButtons
                autocorrect="off"
                autocomplete="off"
                spellcheck="false"
                @paste=${(e: ClipboardEvent) => this._onPaste(e)}
                @sl-focus=${this._onPartFocus.bind(this)}
                @sl-input=${this._onPartChange.bind(this)}></sl-input>`

        })}`
    }
    renderInput() {
        return html`
            <magic-flex grow="none" align="center" gap="0.5em">
                ${repeat(this.parts, (part: string, index: number) => {
            return html`                    
                        ${this.renderPart(part)}
                        ${when(index < this.parts.length - 1, () => html`${this.delimiter}`)}
                        `
        })}
            </magic-flex>
        `
    }


}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-parts': AutoFieldParts
    }
}

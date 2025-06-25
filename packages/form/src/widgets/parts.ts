import { css, html } from "lit"
import { customElement } from "lit/decorators.js"
import { repeat } from "lit/directives/repeat.js"
import { when } from "lit/directives/when.js"
import { AutoField } from "@/field"

export type AutoFieldPartsOptions = {
    template: string
    /**
     * 每一组之间的分割符
     */
    delimiter: string
}

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
    split: boolean = true

    result: string = ''

    _onPartChange(e: any) {
        const inputs = Array.from(this.shadowRoot!.querySelectorAll('sl-input'))
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

        const input = e.target as HTMLInputElement;
        const clipboardData = e.clipboardData?.getData('text/plain') || '';

        // 验证是否为有效的IP地址格式
        const ipRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
        const match = clipboardData.match(ipRegex);

        if (!match) return; // 如果不是IP格式则忽略

        // 获取当前输入框和后续的输入框
        const inputs: HTMLInputElement[] = [];
        let currentElement: Element | null | undefined = input;

        // 收集当前及后续的3个输入框
        for (let i = 0; i < 4 && currentElement; i++) {
            if (currentElement.tagName === 'SL-INPUT') {
                inputs.push(currentElement as HTMLInputElement);
            }
            // 移动到下一个兄弟元素（跳过中间的文本节点或分隔符）
            currentElement = currentElement.nextElementSibling?.nextElementSibling;
        }

        // 将IP的四个部分填充到对应的输入框中
        for (let i = 0; i < Math.min(4, inputs.length); i++) {
            inputs[i].value = match[i + 1]; // match[1]-[4]是IP的四个部分
            inputs[i].dispatchEvent(new Event('input', { bubbles: true }));
        }

        // 自动聚焦到最后一个被填充的输入框
        if (inputs.length > 0) {
            const lastInput = inputs[Math.min(3, inputs.length - 1)];
            lastInput.focus();
            lastInput.select();
        }
    }
    connectedCallback(): void {
        super.connectedCallback()
        this.delimiter = this.getFieldOption('delimiter', '')
        this.template = this.getFieldOption('template', '    ')
        this.split = this.getFieldOption('split', true)
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
        const chars = this.split ? part.split('') : part
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
            ${repeat(this.parts, (part: string, index: number) => {
            return html`                    
                    ${this.renderPart(part)}
                    ${when(index < this.parts.length - 1, () => html`${this.delimiter}`)}
                       `
        })}
        `
    }


}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-parts': AutoFieldParts
    }
}

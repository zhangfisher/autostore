import { AutoField } from "@/field"
import type { SchemaIpAddressWidgetOptions } from "autostore"
import { css, html } from "lit"
import { customElement } from "lit/decorators.js"

export type AutoFieldIPAddressOptions = Required<SchemaIpAddressWidgetOptions>

@customElement('auto-field-ipaddress')
export class AutoFieldIpAddress extends AutoField<AutoFieldIPAddressOptions> {
    static styles = [
        AutoField.styles,
        css` 
            span.dot{
                width:1em;                     
                text-align: center;   
                font-weight: bold;
                margin-top: 0.8rem;                
            }
            sl-input::part(base){
                border: none;
            }
            auto-box{
                width:15rem;
                justify-content: space-around;
            }
            sl-input{
                width: 3rem;
            }
            sl-input::part(input){
                text-align: center; 
                padding: 0px 2px ;
                padding-inline: 0px;
                letter-spacing: var(--sl-letter-spacing-denser);
            }
    `] as any
    getInitialOptions(): Record<string, any> {
        return {
            size: 'medium'
        }
    }
    _getIpBits(): [number, number, number, number] {
        const bits = this.value?.split(".")
        return [
            parseInt(bits[0] || "0"),
            parseInt(bits[1] || "0"),
            parseInt(bits[2] || "0"),
            parseInt(bits[3] || "0")
        ]
    }
    _onIpChange(_: number, e: Event) {
        this.onFieldChange()
        this._isLastInput(e)
    }
    getInputValue() {
        const inputs = Array.from(this.shadow.querySelectorAll('sl-input'))
        return inputs.map(input => input.value).join(".")
    }

    _isLastInput(e: Event) {
        const input = e.target as HTMLInputElement;
        // 检查输入值长度是否为3
        if (input.value.length >= 3) {
            input.blur();
            // 可选：自动跳转到下一个输入框（如果有的话）
            const nextInput = input.nextElementSibling?.nextElementSibling as HTMLInputElement;
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


    renderInput() {
        return html`
            <auto-box flex="row" size="small" no-padding>
                ${this._getIpBits().map((bit, index) => html`
                    <sl-input 
                        value="${bit}" 
                        name=${this.name} 
                        data-path = ${this.path}
                        defaultValue='0' 
                        size=${this.context.size}
                        maxLength="3"
                        minLength="1"
                        max="255"
                        min="0"
                        @sl-input=${(e: Event) => this._onIpChange(index, e)}
                        @sl-change=${(e: Event) => this._onIpChange(index, e)} 
                        @paste=${(e: ClipboardEvent) => this._onPaste(e)}
                    ></sl-input>
                    ${index < 3 ? html`<span class="dot">.</span>` : ''}                    
                `)} 
            </auto-box>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-ipaddress': AutoFieldIpAddress
    }
}

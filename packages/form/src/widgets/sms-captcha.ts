import { customElement, query, state } from "lit/decorators.js"
import { AutoFieldInput } from "./input"
import { css } from "lit"

// 短信验证码

@customElement('auto-field-sms-captcha')
export class AutoFieldSmsCaptcha extends AutoFieldInput {
    static styles = [
        AutoFieldInput.styles,
        css`
            
        `
    ]
    @query('img')
    img?: HTMLImageElement

    @state()
    countdowning: boolean = false

    sendRequest() {

    }
    connectedCallback() {
        super.connectedCallback()
        if (!this.afterActions) {
            this.afterActions = []
        }
        this.afterActions!.unshift({
            id: "send",
            tips: '发送验证码',
            onClick: this.sendRequest.bind(this)
        })

    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-sms-captcha': AutoFieldSmsCaptcha
    }
}

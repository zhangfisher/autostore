import { customElement } from "lit/decorators.js"
import { AutoFieldInput } from "./input"

@customElement('auto-field-captcha')
export class AutoFieldCaptcha extends AutoFieldInput {

}


declare global {
    interface HTMLElementTagNameMap {
        'auto-field-captcha': AutoFieldCaptcha
    }
}

import { css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('auto-box')
export class AutoBox extends LitElement {
    static styles = css`
         
    `

}



declare global {
    interface HTMLElementTagNameMap {
        'auto-box': AutoBox;
    }
}
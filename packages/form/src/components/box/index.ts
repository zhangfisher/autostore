import { css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('auto-box')
export class AutoBox extends LitElement {
    static styles = css`
        :host{
            border: 1px solid var(--sl-input-border-color);
        }
    `

}



declare global {
    interface HTMLElementTagNameMap {
        'auto-box': AutoBox;
    }
}
import { HostClasses } from "@/controllers/hostClasss";
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('auto-box')
export class AutoBox extends LitElement {
    static styles = css`
        :host{
            position: relative;
            box-sizing: border-box;
            display: block;                    
            font-size: var(--sl-font-size-medium); 
        }
        :host([padding]){
            padding: var(--sl-spacing-medium);
        }
        :host([shadow]){
            box-shadow: var(--sl-shadow-medium);
        } 
        :host([radius]){
            border-radius: var(--sl-border-radius-medium);
        }
        :host([border]){
            border: 1px solid var(--sl-input-border-color);    
        }
        /* 小 */
        :host([size=small]){
            font-size: var(--sl-font-size-small);
        }
        :host([padding][size=small]){
                padding: var(--sl-spacing-small);
        }
        :host([shadow][size=small]){
            box-shadow: var(--sl-shadow-small);
        }        
        :host([radius][size=small]){
            border-radius: var(--sl-border-radius-small);
        }
        /* 大 */
        :host([size=large]){
            font-size: var(--sl-font-size-large);
        }
        :host([padding][size=large]){
                padding: var(--sl-spacing-large);
        }
        :host([shadow][size=large]){
            box-shadow: var(--sl-shadow-large);
        }        
        :host([radius][size=large]){
            border-radius: var(--sl-border-radius-large);
        }
    `
    @property({ type: String })
    size: 'small' | 'medium' | 'large' = 'medium';

    @property({ type: Boolean, reflect: true })
    padding: boolean = true;

    @property({ type: Boolean, reflect: true })
    shadow: boolean = true;

    @property({ type: Boolean, reflect: true })
    radius: boolean = true;

    @property({ type: Boolean, reflect: true })
    border: boolean = true;

    render() {
        return html`
            <slot></slot>
        `
    }
}



declare global {
    interface HTMLElementTagNameMap {
        'auto-box': AutoBox;
    }
}
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 *
 *
 */

import { LitElement, css, html } from 'lit';
import { tag } from '@/utils/tag';
import { property } from 'lit/decorators.js';

@tag('auto-loading')
export class AutoLoading extends LitElement {
    static styles = css`    
        :host{
            display: flex;
            flex-direction: column;
            gap:0.5em;
            align-items: center;
            justify-content: center;
            height: 6em;
        }        
    `;

    @property({type:String})
    tips:string = 'Loading'    

    @property({type:Boolean})
    hide:boolean = false

    @property({type:String})
    size:string = '2em'


    render() {
        if(this.hide) return html``
        return html`  
            <sl-spinner style="font-size:${this.size};"></sl-spinner>
            <div>${this.tips}</div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-loading': AutoLoading;
    }
}

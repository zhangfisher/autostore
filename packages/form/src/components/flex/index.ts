/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 *
 *
 *  <maic-flex>
 *
 *  </magic-flex>
 *
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { HostClasses } from '@/controllers/hostClasss';
import styles from './styles';

export class MagicFlex extends LitElement {
    static styles = styles;

    classes = new HostClasses(this);

    @property({ type: String })
    direction: 'row' | 'column' | 'column-reverse' | 'row-reverse' = 'row';

    @property({ type: String })
    gap: string = '0';

    @property({ type: Boolean })
    wrap?: boolean;

    @property({ type: String })
    align: string = 'center';

    @property({ type: String })
    justify?: string = 'center';

    // none: 没有, inline: 仅单元格内部, full: 包括外边框
    @property({ type: String })
    border: string = 'inline';

    @property({ type: String })
    grow?: string;

    @property({ type: String })
    shrink?: string;

    @property({ type: Boolean, reflect: true })
    fit: boolean = false;

    updateStyles() {
        const gap = String(parseInt(this.gap)) === String(this.gap) ? `${this.gap}px` : this.gap;
        this.style.gap = gap;
        if (this.grow) {
            Array.from<HTMLElement>(this.querySelectorAll(this.grow)).forEach((ele) => {
                ele.style.flexGrow = '1';
            });
        }
        if (this.shrink) {
            Array.from<HTMLElement>(this.querySelectorAll(this.shrink)).forEach((ele) => {
                ele.style.flexShrink = '1';
            });
        }
        if (this.border === 'inline') {
            this.classList.add('inline-border');
        } else if (this.border === 'full') {
            this.classList.add('border');
        }
    }
    connectedCallback(): void {
        super.connectedCallback();
        if (!this.grow) {
            this.grow = this.direction === 'row' ? ':first-child' : ':last-child';
        }
        this.updateStyles();
    }
    attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
        super.attributeChangedCallback(name, _old, value);
        this.updateStyles();
    }

    render() {
        return html` <slot></slot> `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'magic-flex': MagicFlex;
    }
}

if (!customElements.get('magic-flex')) {
    customElements.define('magic-flex', MagicFlex);
}

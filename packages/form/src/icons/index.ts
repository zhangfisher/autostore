import { css, LitElement, html } from "lit";
import stypes from "./styles";
import icons, { AutoIconName } from "./icons"
import { customElement, property } from "lit/decorators.js";

@customElement('auto-icon')
export class AutoIcon extends LitElement {
    static styles = css`
        ${stypes}
    `

    @property({ type: String })
    name: string = 'user';

    @property({ type: String })
    size: string = '32px';

    @property({ type: Boolean })
    ripple: boolean = false;

    @property({ type: String, attribute: 'ripple-color' })
    rippleColor?: string;

    @property({ type: String, attribute: 'ripple-speed' })
    rippleSpeed: string = '1.5s';

    @property({ type: String })
    mode: 'compose' | 'toggle' | 'button' = 'compose';

    @property({ type: Boolean })
    disabled: boolean = false;
    /**
     * 显示一个圆形背景
     */
    @property({ type: Boolean })
    circle: boolean = false;

    @property({ type: String })
    variant: 'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger' = 'default'

    @property({ type: Number })
    rotate: number = 0;

    private currentIndex = 0;

    private parseIconName(name: string) {
        const match = name.match(/^([^(]+)(?:\((.*)\))?$/);
        const iconName: AutoIconName = (match?.[1]?.trim() || '') as AutoIconName
        const extraStyle = match?.[2] || '';
        return { iconName, extraStyle };
    }

    private parseSize(size: string): string {
        if (!size) return '';
        // 处理纯数字情况（自动添加px单位）
        if (/^\d+$/.test(size)) {
            const num = parseInt(size);
            return this.circle ? `${num * 2}px` : `${num}px`;
        }

        // 处理带单位的情况
        const match = size.match(/^(\d+)([^\d]*)$/);
        if (match) {
            const num = parseInt(match[1]);
            const unit = match[2] || 'px';
            return this.circle ? `${num * 2}${unit}` : size;
        }

        return size;
    }

    render() {
        if (!this.name) return null;

        const iconNames = this.name.split(',');
        const filteredNames = this.mode === 'toggle'
            ? [iconNames[this.currentIndex % iconNames.length]]
            : iconNames;

        const iconElements = filteredNames.map(name => {
            const { iconName, extraStyle } = this.parseIconName(name);
            if (!iconName || !icons[iconName as AutoIconName]) return null;
            const defaultTitle = icons[iconName].title
            const parsedSize = this.parseSize(this.size);
            const sizeStyle = parsedSize ? `
                width: ${parsedSize};
                height: ${parsedSize};
            ` : '';
            const iconStyle = `
                ${sizeStyle}
                ${extraStyle ? extraStyle + ';' : ''}
                ${this.rippleColor ? `--ripple-color: ${this.rippleColor};` : ''}
                --ripple-speed: ${this.rippleSpeed};
                position: relative;
                transform: rotate(${this.rotate}deg);
            `;

            return html`
                <div 
                    class="icon-container ${this.ripple ? 'has-ripple' : ''}" 
                    style=${`
                        ${iconStyle}
                        ${this.mode === 'compose' ? 'position: absolute; top: 0; left: 0;' : ''}
                    `}
                    title=${this.title || defaultTitle}
                    .innerHTML=${icons[iconName].data}
                >
                </div>
            `;
        }).filter(Boolean);

        if (iconElements.length === 0) return null;

        const parsedSize = this.parseSize(this.size);
        const containerStyle = parsedSize ? `
            width: ${parsedSize}; 
            height: ${parsedSize};
            position: relative;
            ${this.circle ? `--icon-size: ${parsedSize};` : ''}
        ` : '';
        return html`
            <div 
                style=${containerStyle} 
                @click=${this._handleClick}
                class="icons-wrapper"
            >
                ${iconElements}
            </div>
        `;
    }

    private _handleClick(e: MouseEvent) {
        if (this.disabled) return;
        if (this.mode === 'toggle' && this.name) {
            const iconNames = this.name.split(',');
            if (iconNames.length > 1) {
                this.currentIndex = (this.currentIndex + 1) % iconNames.length;
                this.requestUpdate();

                // 触发change事件
                const currentIcon = this.parseIconName(iconNames[this.currentIndex]).iconName;
                this.dispatchEvent(new CustomEvent('change', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        value: currentIcon,
                        index: this.currentIndex
                    }
                }));
            }
        }
    }
}




declare global {
    interface HTMLElementTagNameMap {
        'auto-icon': AutoIcon;
    }
}
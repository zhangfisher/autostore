import { html } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import { AutoField } from "@/field";
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';

@customElement('auto-field-autocomplete')
export class AutoFieldAutocomplete extends AutoField {
    @state()
    private suggestions: string[] = [];

    @state()
    private dropdownOpen: boolean = false;

    @state()
    private currentPath: string[] = [];

    @state()
    private cursorPosition: { x: number, y: number } | null = null;

    private data: Record<string, any> = {};

    // 获取当前路径下的对象成员
    private getMembersAtPath(path: string[]): string[] {
        let current = this.data;
        for (const segment of path) {
            if (current && typeof current === 'object') {
                current = current[segment];
            } else {
                return [];
            }
        }
        return current && typeof current === 'object'
            ? Object.keys(current)
            : [];
    }

    // 处理输入变化
    private handleInput(e: InputEvent) {
        const input = e.target as HTMLInputElement;
        const value = input.value;

        // 更新当前路径
        this.currentPath = value.split('.');
        const lastSegment = this.currentPath.pop() || '';

        // 计算光标位置
        this.calculateCursorPosition(input);

        // 如果输入以点结束，显示所有可用的成员
        if (value.endsWith('.')) {
            this.suggestions = this.getMembersAtPath(this.currentPath);
            this.dropdownOpen = this.suggestions.length > 0;
        }
        // 否则，显示匹配的成员
        else if (this.currentPath.length > 0) {
            const members = this.getMembersAtPath(this.currentPath);
            this.suggestions = members.filter(member =>
                member.toLowerCase().startsWith(lastSegment.toLowerCase())
            );
            this.dropdownOpen = this.suggestions.length > 0;
        } else {
            this.suggestions = [];
            this.dropdownOpen = false;
        }

        this.onFieldInput(e);
    }

    // 计算光标位置
    private calculateCursorPosition(input: HTMLInputElement) {
        if (!input.selectionStart && input.selectionStart !== 0) {
            return;
        }

        // 获取输入框的位置信息
        const inputRect = input.getBoundingClientRect();

        // 创建一个 span 元素用于测量文本宽度
        const span = document.createElement('span');
        const computedStyle = window.getComputedStyle(input);

        // 复制输入框的关键样式到 span
        span.style.font = computedStyle.font;
        span.style.fontSize = computedStyle.fontSize;
        span.style.fontFamily = computedStyle.fontFamily;
        span.style.padding = '0';
        span.style.margin = '0';
        span.style.border = 'none';
        span.style.whiteSpace = 'pre';
        span.style.position = 'absolute';
        span.style.top = '0';
        span.style.left = '0';
        span.style.visibility = 'hidden';

        // 获取光标之前的文本
        const textBeforeCursor = input.value.substring(0, input.selectionStart);
        span.textContent = textBeforeCursor;

        // 将 span 添加到文档中以获取其尺寸
        document.body.appendChild(span);

        // 计算光标位置
        const textWidth = span.offsetWidth;

        // 清理
        document.body.removeChild(span);

        // 计算实际的光标坐标
        const paddingLeft = parseFloat(computedStyle.paddingLeft);
        const borderLeft = parseFloat(computedStyle.borderLeftWidth);

        // 计算光标的绝对位置
        const cursorX = inputRect.left + paddingLeft + borderLeft + textWidth;

        // 获取sl-input元素的底部位置
        const slInput = input.closest('sl-input');
        const slInputRect = slInput ? slInput.getBoundingClientRect() : inputRect;
        const cursorY = slInputRect.bottom;

        // 更新光标位置
        this.cursorPosition = { x: cursorX, y: cursorY };
    }

    // 处理建议选择
    private handleSuggestionSelect(suggestion: string) {
        const newPath = [...this.currentPath, suggestion].join('.');
        const input = this.input as HTMLInputElement;
        if (input) {
            input.value = newPath + '.';
            this.value = newPath + '.';
            this.dropdownOpen = false;

            // 触发输入事件以更新建议
            input.dispatchEvent(new InputEvent('input', {
                bubbles: true,
                composed: true
            }));

            // 重新计算光标位置
            setTimeout(() => {
                this.calculateCursorPosition(input);
                this.requestUpdate();
            }, 0);

            // 聚焦输入框
            input.focus();
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.data = this.schema?.data || {}
        // 添加窗口大小改变事件监听器
        window.addEventListener('resize', this.handleResize);
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        // 移除窗口大小改变事件监听器
        window.removeEventListener('resize', this.handleResize);
    }

    // 处理窗口大小改变
    private handleResize = () => {
        const input = this.input as HTMLInputElement;
        if (input && this.dropdownOpen) {
            this.calculateCursorPosition(input);
            this.requestUpdate();
        }
    }

    // 处理点击事件
    private handleClick(e: MouseEvent) {
        const input = e.target as HTMLInputElement;
        if (input && this.dropdownOpen) {
            this.calculateCursorPosition(input);
            this.requestUpdate();
        }
    }

    // 处理键盘事件
    private handleKeyUp(e: KeyboardEvent) {
        const input = e.target as HTMLInputElement;
        // 只处理光标移动相关的键
        if (input && this.dropdownOpen &&
            (e.key === 'ArrowLeft' || e.key === 'ArrowRight' ||
                e.key === 'Home' || e.key === 'End')) {
            this.calculateCursorPosition(input);
            this.requestUpdate();
        }
    }

    renderInput() {
        return html`
            <div class="autocomplete-container" style="position: relative;">
                <sl-input
                    type="text"
                    name="${this.name}"
                    data-path="${this.path}"
                    value="${this.value}"
                    ?disabled=${this.getFieldOption('disabled')}
                    ?required=${this.getFieldOption('required')}
                    placeholder=${this.getFieldOption('placeholder', 'Type and use . to explore object members')}
                    @input=${this.handleInput}
                    @change=${this.onFieldChange}
                    @click=${this.handleClick}
                    @keyup=${this.handleKeyUp}
                    autocomplete="off"
                    autocorrect="off"
                >
                    ${this.renderBeforeActions()}
                    ${this.renderAfterActions()}
                </sl-input>
                
                <sl-dropdown 
                    ?open=${this.dropdownOpen}
                    placement="bottom-start"
                    style=${this.cursorPosition ?
                `position: fixed; left: ${this.cursorPosition.x}px; top: ${this.cursorPosition.y}px; min-width: 150px; z-index: 1000;` :
                'width: 100%;'
            }
                >
                    <sl-menu>
                        ${this.suggestions.map(suggestion => html`
                            <sl-menu-item @click=${() => this.handleSuggestionSelect(suggestion)}>
                                ${suggestion}
                            </sl-menu-item>
                        `)}
                    </sl-menu>
                </sl-dropdown>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-field-autocomplete': AutoFieldAutocomplete;
    }
}
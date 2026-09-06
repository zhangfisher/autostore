import { query } from 'lit/decorators.js';
// 类型已内联
import { html } from 'lit';
import { getInputValue } from '@/utils/getInputValue';
import { AutoDropdownField } from '@/field/dropdown';
import { tag } from '@/utils/tag';
/**
 * custom widget 的配置类型
 * renderContent/renderSelection 使用 lit 模板语法，values 为 inputSelectors
 * 收集到的输入值数组（与 toInput 返回值同构）
 */
export interface AutoFieldCustomOptions {
    /**
     * 是否以下拉面板展示自定义内容，默认 true；false 时内联展示
     */
    dropdown?: boolean;
    /**
     * 参与值收集的控件 CSS 选择器，默认 "input,textarea"
     */
    inputSelectors?: string;
    /**
     * 自定义渲染下拉触发器中的值显示（dropdown=true 时生效）
     */
    renderSelection?: (values: any, html: any) => any;
    /**
     * 自定义渲染输入内容
     */
    renderContent?: (values: any, html: any) => any;
}
@tag('auto-field-custom')
export class AutoFieldCustom extends AutoDropdownField<AutoFieldCustomOptions & Required<any>> {
    static styles = [AutoDropdownField.styles] as any;
    selection: any[] = [];
    /**
     * 输入事件后置位、下一帧复位：标记"用户正在输入"的窗口期，
     * 期间 renderDropdown 跳过程序性回写（避免覆盖正在输入的控件）
     */
    private _skipSync = false;
    /** 上一次成功渲染的下拉面板模板（跳过窗口期内复用它，保持 DOM 稳定） */
    private _lastRendered: any = undefined;
    @query('.container')
    container?: any;
    getInitialOptions() {
        return Object.assign({}, super.getInitialOptions(), {
            placeholder: '请选择',
            dropdown: true,
            inputSelectors: 'input,textarea',
        });
    }
    connectedCallback(): void {
        super.connectedCallback();
        this._onFieldInput();
    }
    _onFieldInput() {
        this._subscribers.push({
            off: () => {
                this.removeEventListener('input', this._onNativeInput);
                this.removeEventListener('change', this._onNativeInput);
            },
        } as any);
        // input/change 都立即收集 DOM 控件值写入 store：
        // custom 的值事实源是原生控件，无中间受控状态，必须实时收集。
        // 校验时机仍由 validAt 控制（onFieldChange 内部走 _updateFieldValue，
        // 错误显示与否由 isShowError 的 dirty/validAtInit 逻辑决定）
        this.addEventListener('input', this._onNativeInput);
        this.addEventListener('change', this._onNativeInput);
    }
    /**
     * 原生 input 到达：收集值写入 store。
     * custom 的值只存在于 DOM 控件中（不像 sl-input 有受控状态），
     * 不实时收集就会丢失——值同步与校验时机（validAt）是两回事：
     * 值立即写入 store，错误提示仍由 validAt 控制（lost-focus 时
     * 输入仅清错，失焦才显现校验结果）
     */
    _onNativeInput = () => {
        this._skipSync = true;
        requestAnimationFrame(() => {
            this._skipSync = false;
        });
        this.onFieldChange();
    }
    getInputValue() {
        const inputs = Array.from(this.shadowRoot!.querySelectorAll(this.options.inputSelectors)) as HTMLInputElement[];
        const values = inputs.map((input: HTMLInputElement) => {
            return getInputValue(input);
        });
        return values;
    }
    renderDropdown() {
        // toInput 后的值可能是任意类型（对象字段初始值、'' 等）
        // renderContent 约定接收数组，这里归一化
        const values = Array.isArray(this.value) ? this.value : [this.value];
        // 用户正在输入的控件不回写：输入 → toState → watch → 重渲染的回环中，
        // 聚焦控件的 DOM 值就是最新事实源，程序性覆盖会重置光标、
        // 吞掉正在输入的字符（视觉上表现为"不实时更新/输入错乱"）。
        // live() 不能经数组跨模板传递（lit 限制），在此手工实现其语义：
        // 输入事件后的一帧内跳过程序性覆盖
        if (this._skipSync) {
            return this._lastRendered ?? html`<div class="container"></div>`;
        }
        this._lastRendered = html`<div class="container">${this.options.renderContent(values, html)}</div>`;
        return this._lastRendered;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'auto-field-custom': AutoFieldCustom;
    }
}
declare module "autostore" {
    interface AutoStoreWidgets {
        custom: AutoFieldCustomOptions;
    }
}

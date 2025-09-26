import { css, html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { AutoStore, configurable } from 'autostore';
import { orgTree } from './data';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const store = new AutoStore({
    depts: configurable(['产品部'], {
        label: '部门',
        widget: 'tree-select',
        multiple: true,
        valueKey: 'label', // 默认选择的是id
        onlySelectLeaf: false, // 只选择叶子节点
        items: async () => {
            await delay(3000);
            return orgTree
        }
        // onSelectionChange: (selection) => {}
    }),
    country2: configurable('France', {
        label: '国家',
        showResults: true,
        widget: 'list',
        select: async () => {
            await delay(3000);
            return [
                { label: '中国', value: 'China' },
                { label: '美国', value: 'America' },
                { label: '泰国', value: 'Thailand' },
                { label: '印度', value: 'India' },
                { label: '墨西哥', value: 'Mexico' },
                { label: '南非', value: 'SouthAfrica' },
                { label: '法国', value: 'France' },
                { label: '荷兰', value: 'Netherlands' },
                { label: '德国', value: 'Germany' },
            ]
        },
    }),
    country: configurable('China', {
        label: '国家',
        widget: 'select',
        select: async () => {
            await delay(3000);
            return [
                { label: '中国', value: 'China' },
                { label: '美国', value: 'America' },
                { label: '泰国', value: 'Thailand' },
                { label: '印度', value: 'India' },
                { label: '墨西哥', value: 'Mexico' },
                { label: '南非', value: 'SouthAfrica' },
                { label: '法国', value: 'France' },
                { label: '荷兰', value: 'Netherlands' },
                { label: '德国', value: 'Germany' },
            ]
        },
    }),    
    
});
@customElement('auto-form-lazy-select')
class AutoFormLazySelect extends LitElement {
    //@ts-expect-error
    @query('auto-form')
    from?: any;

    updated() {
        this.from?.bind(store);
    }
    static styles = css``;
    render() {
        return html`<div
            style="padding: 1em; border: var(--auto-border);margin: 1em; position: relative"
        >
            <auto-form labelpos="left"></auto-form>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-form-lazy-select': AutoFormLazySelect;
    }
}

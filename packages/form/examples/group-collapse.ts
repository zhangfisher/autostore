import { customElement, query } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import type { AutoStore } from 'autostore';

@customElement('auto-form-example-collapse')
class AutoFormExampleCollapse extends LitElement {
    //@ts-ignore
    @query('auto-form-collapse')
    collapse?: any;

    updated() {
        this.collapse?.bind(store);
    }

    render() {
        return html`<div style="padding: 1em; border: 1px solid #ccc; margin: 1em; position: relative">
            <auto-form-collapse style="border: 1px solid #ccc;height:500px;">
                <auto-form group="general" label="常规" icon="settings"> </auto-form>
                <auto-form group="car" label="汽车"> </auto-form>
                <auto-form group="network" label="网络"> </auto-form>
                <auto-form group="admin" label="管理" icon="apple"> </auto-form>
                <auto-form group="safe" label="安全" icon="lock"> </auto-form>
            </auto-form-collapse>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-form-example-collapse': AutoFormExampleCollapse;
    }
    var store: AutoStore<any>;
}

// <auto-form group="general" title="常规"> </auto-form>
// <auto-form group="car" title="汽车"> </auto-form>
// <auto-form group="network" title="网络"> </auto-form>
// <auto-form group="admin" title="管理"> </auto-form>
// <auto-form group="safe" title="安全"> </auto-form>

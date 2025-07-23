import { customElement, query } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import type { AutoStore } from 'autostore';

@customElement('auto-form-example-tabs')
class AutoFormExampleTabs extends LitElement {
    //@ts-ignore
    @query('auto-form-tabs')
    tabs?: any;

    updated() {
        this.tabs?.bind(store);
    }

    render() {
        return html`<div style="padding: 1em; border: 1px solid #ccc; margin: 1em; position: relative">
            <auto-form-tabs direction="right" style="border: 1px solid #ccc;">
                <auto-form group="general" icon="settings"> </auto-form>
                <auto-form group="car"> </auto-form>
                <auto-form group="network"> </auto-form>
                <auto-form group="admin" icon="apple"> </auto-form>
                <auto-form group="safe" icon="lock"> </auto-form>
            </auto-form-tabs>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-form-example-tabs': AutoFormExampleTabs;
    }
    var store: AutoStore<any>;
}

// <auto-form group="general" title="常规"> </auto-form>
// <auto-form group="car" title="汽车"> </auto-form>
// <auto-form group="network" title="网络"> </auto-form>
// <auto-form group="admin" title="管理"> </auto-form>
// <auto-form group="safe" title="安全"> </auto-form>

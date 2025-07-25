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
        return html`<div
            style="padding: 1em; border: 1px solid #ccc; margin: 1em; position: relative"
        >
            <auto-form-collapse style="border: 1px solid #ccc;height:500px;" active="network">
                <auto-form
                    data-name="general"
                    group="general"
                    data-label="常规"
                    data-icon="settings"
                    data-actions="settings"
                >
                </auto-form>
                <auto-form data-name="car" group="car" data-label="汽车" data-icon="car">
                </auto-form>
                <auto-form
                    data-name="network"
                    group="network"
                    data-label="网络"
                    data-icon="network"
                >
                </auto-form>
                <auto-form data-name="admin" group="admin" data-label="管理" data-icon="apple">
                </auto-form>
                <auto-form data-name="safe" group="safe" data-label="安全" data-icon="lock">
                </auto-form>
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

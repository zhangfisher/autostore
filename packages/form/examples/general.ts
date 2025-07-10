import { customElement, query } from 'lit/decorators.js';
import { LitElement, css, html } from 'lit';
import type { AutoStore } from 'autostore';
import type { AutoForm } from '../src/form';


@customElement("auto-form-example-general")
class AutoFormExampleGeneral extends LitElement {

    //@ts-ignore
    @query("auto-form")
    form?: AutoForm

    //@ts-ignore
    @query("#viewer")
    viewer?: any

    firstUpdated() {
        store.watch(() => this.updateState());
        store.on('validate', () => {
            const ele = document.querySelector('#errors');
            ele!.innerHTML = JSON.stringify(store.schemas.errors);
        });
        this.updateState()
    }
    updateState() {
        // @ts-ignore
        this.viewer.value = JSON.stringify(store.state);
    };

    updated() {
        this.form?.bind(store)
    }

    render() {
        return html`<div style="padding: 1em; border: 1px solid #ccc; margin: 1em; position: relative">
        <div class="actions">
            <auto-form-debuger></auto-form-debuger>
            <auto-form path="user"> </auto-form>
        </div>
        <textarea id="viewer" rows="10" style="box-sizing: border-box; border: 1px solid #ccc; width: 100%"></textarea>
        <div id="errors" style="border: 1px solid #ccc; color: red"></div>
    </div>`
    }
}


declare global {
    interface HTMLElementTagNameMap {
        'auto-form-example-general': AutoFormExampleGeneral
    }
    var store: AutoStore<any>
}

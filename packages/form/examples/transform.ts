import { css, html, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";
import type { AutoForm } from "../src/form";
import type { AutoStore } from "autostore";

@customElement("auto-form-example-transform")
class AutoFormExampleTransform extends LitElement {
    static styles = css`
        `
    //@ts-ignore
    @query("#viewer")
    viewer?: any
    //@ts-ignore
    @query("auto-form")
    form?: AutoForm


    firstUpdated() {
        store.watch(() => this.updateState());
        store.on('validate', () => {
            this.viewer.innerHTML = JSON.stringify(store.state.transform);
        });
        this.updateState()
    }
    updateState() {
        // @ts-ignore
        this.viewer.innerHTML = JSON.stringify(store.state.transform);
    };
    updated() {
        this.form?.bind(store)
    }
    render() {
        return html`<div style="display: flex;padding:1em;border: 1px solid #ccc;margin:1em;" >
            <auto-form path="transform"  validat="input" ></auto-form>
            <div id = "viewer" style = "border: 1px solid #ccc;border-left: none;width:20%;padding: 1em" ></div>
        </div>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'auto-form-example-transform': AutoFormExampleTransform
    }
    var store: AutoStore<any>
}

